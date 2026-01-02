"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  BoardSlug,
  ClassKey,
  MediumSlug,
  getSubjectsFor,
} from "@/lib/subjects";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";

type FiltersState = {
  featured: boolean;
  subject: string | null;
  chapter: string | null;
  board: string | null;
  medium: string | null;
  classLevel: string | null;
};

type UserData = {
  firebaseUid: string;
  name: string;
  phone: string;
  gender: string;
  role: string;
  board: string;
  medium: string;
  classLevel: string;
  userTier: string;
};

type SubjectData = {
  id: string;
  imgSrc: string;
  imgAlt: string;
  title: string;
  board: string;
  medium: string;
  classLevel: string;
  chapterCount: number;
  questionCount: number;
  // details: string[];
  link: string;
};

interface Chapter {
  id: string;
  chapterNumber: number;
  title: string;
  slug: string;
  description?: string;
  topics?: string[];
  learningObjectives?: string[];
  questions: Question[];
}

type QuestionSource = "balbharati" | "pyq";

type Question = {
  id: string;
  type: string;
  difficulty: string | "easy" | "medium" | "hard";
  marks: number;
  text: string;
  options?: string[];
  answer?: string;
  explanation?: string;
  tags?: string[];
  source?: QuestionSource;
};

const boardMediumMap = {
  CBSE: ["English", "Hindi"],
  MSBSHSE: ["English", "Semi-English", "Marathi"],
  ICSE: ["English"],
};

const boardClassMap = {
  CBSE: [
    "8th",
    "9th",
    "10th",
    "11th Humanities",
    "11th Commerce",
    "11th Science",
    "12th Humanities",
    "12th Commerce",
    "12th Science",
  ],
  MSBSHSE: [
    "8th",
    "9th",
    "10th",
    "11th Arts",
    "11th Commerce",
    "11th Science",
    "12th Arts",
    "12th Commerce",
    "12th Science",
  ],
  ICSE: ["8th", "9th", "10th"],
};

export default function QuestionBankPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<UserData>();
  const [subjectStats, setSubjectStats] = useState<
    Record<string, { chapterCount: number; questionCount: number }>
  >({});
  const [subject, setSubject] = useState({ name: "", slug: "" });
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [selectedChapter, setSelectedChapter] = useState<Chapter>();

  const [chaptersLoading, setChaptersLoading] = useState(true);
  const [chaptersError, setChaptersError] = useState<string | null>(null);

  const formattedBoard = data?.board.toLowerCase();
  const formattedMedium = normalizeMedium(data?.medium);
  const formattedClassLevel = normalizeClassLevel(data?.classLevel);

  const subjects = getSubjectsFor(
    formattedBoard as BoardSlug,
    formattedMedium as MediumSlug,
    formattedClassLevel as ClassKey
  );

  const SUBJECT_IMAGE_MAP: Record<string, string> = {
    eng: "/subjects/eng-img.png",
    mar: "/subjects/mar-img.png",
    hin: "/subjects/hin-img.png",
    maths: "/subjects/math-img.png",
    science: "/subjects/sci-img.png",
    hist: "/subjects/hist-img.png",
    geo: "/subjects/geo-img.png",
    phy: "/subjects/phy-img.png",
    chem: "/subjects/chem-img.png",
    "maths-1": "/subjects/maths1-img.png",
    "maths-2": "/subjects/maths2-img.png",
    "science-1": "/subjects/sci1-img.png",
    "science-2": "/subjects/sci2-img.png",
    bio: "/subjects/bio-img.png",
    it: "/subjects/it-img.png",
    cs: "/subjects/cs-img.png",
    "pol-sci": "/subjects/pol-sci-img.png",
    psy: "/subjects/psy-img.png",
    soc: "/subjects/soc-img.png",
    acct: "/subjects/acc-img.png",
    eco: "/subjects/eco-img.png",
    ocm: "/subjects/ocm-img.png",
    logic: "/subjects/logic-img.png",
  };
  const DEFAULT_SUBJECT_IMAGE = "/subject-default.png";
  const FULL_NAME_SUBJECTS = [
    "Algebra",
    "Geometry",
    "Physics & Chemistry",
    "Biology & Environment",
    "Pol Science",
    "B. Studies",
    "History",
    "Science",
  ];

  useEffect(() => {
    if (!subjects.length || !data) return;

    const loadStats = async () => {
      const entries = await Promise.all(
        subjects.map(async (s) => {
          const res = await fetch(
            `/api/subject-stats?board=${formattedBoard}&medium=${formattedMedium}&classKey=${formattedClassLevel}&subjectSlug=${s.slug}`
          );

          const stats = await res.json();
          return [s.slug, stats];
        })
      );

      setSubjectStats(Object.fromEntries(entries));
    };

    loadStats();
  }, [subjects, data]);

  const subjectsData: SubjectData[] = subjects.map((subject, index) => {
    const subjectSlug = subject.slug.toLowerCase();
    const stats = subjectStats[subject.slug] ?? {
      chapterCount: 0,
      questionCount: 0,
    };

    return {
      id:
        `${formattedBoard?.slice(0, 2)}-${formattedMedium?.slice(
          0,
          3
        )}-${classToSlug(data?.classLevel)}-${subject.code}` || "",

      imgSrc: SUBJECT_IMAGE_MAP[subject.code] ?? DEFAULT_SUBJECT_IMAGE,

      imgAlt: subject.code ?? "subject",

      title: FULL_NAME_SUBJECTS.includes(subject.shortName ?? "")
        ? subject.name ?? subject.shortName ?? "Unknown Subject"
        : subject.shortName ?? subject.name ?? "Unknown Subject",

      board: data?.board?.toUpperCase() ?? "",

      medium: data?.medium ? `${data.medium.replace("-", " ")} Medium` : "",

      chapterCount: stats.chapterCount,
      questionCount: stats.questionCount,

      classLevel: data?.classLevel?.replace("-", " ") ?? "",

      // details: [
      //   `${Array.isArray(subject)
      //     ? subject.chapters.length
      //     : subject.chapters ?? 0} Chapters`,
      //   `${Array.isArray(subject.questions)
      //     ? subject.questions.length
      //     : subject.questions ?? 0} Questions`,
      // ],

      link: `./courses/${formattedBoard}/${formattedMedium}-medium/class-${formattedClassLevel}/${subjectSlug}`,
    };
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("/api/account/me", {
          headers: {
            "x-user-uid": user.uid,
          },
        });

        if (!res.ok) throw new Error("Failed to load user");

        const data = await res.json();

        setData({
          firebaseUid: data.firebaseUid ?? "",
          name: data.name ?? "",
          phone: data.phone ?? "",
          gender: data.gender ?? "",
          role: data.role ?? "",
          board: data.board ?? "",
          medium: data.medium ?? "",
          classLevel: data.classLevel ?? "",
          userTier: data.userTier ?? "",
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const getChaptersFor = async (
    board: BoardSlug,
    medium: MediumSlug,
    classKey: ClassKey,
    subjectSlug: string
  ): Promise<Chapter[]> => {
    const params = new URLSearchParams({
      board,
      medium,
      classKey,
      subjectSlug,
    });

    try {
      const res = await fetch(`/api/chapters?${params.toString()}`);

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        console.error("getChaptersFor error:", res.status, body);
        return [];
      }

      const data = await res.json();
      return (data.chapters as Chapter[]) || [];
    } catch (err) {
      console.error("getChaptersFor fetch error:", err);
      return [];
    }
  };

  console.log(
    formattedBoard,
    formattedMedium,
    formattedClassLevel,
    subject.slug
  );

  useEffect(() => {
    if (
      !subject.slug ||
      !formattedBoard ||
      !formattedMedium ||
      !formattedClassLevel
    )
      return;

    let cancelled = false;

    async function loadChapters() {
      try {
        setChaptersLoading(true);
        setChaptersError(null);

        const data = await getChaptersFor(
          formattedBoard as BoardSlug,
          formattedMedium as MediumSlug,
          formattedClassLevel as ClassKey,
          subject.slug
        );

        if (!cancelled) {
          setChapters(data);
          // setOpenChapterId(data[0]?.id ?? null);
        }
      } catch (err: any) {
        if (!cancelled) {
          setChaptersError(err.message ?? "Failed to load chapters");
        }
      } finally {
        if (!cancelled) setChaptersLoading(false);
      }
    }

    loadChapters();

    return () => {
      cancelled = true;
    };
  }, [formattedBoard, formattedMedium, formattedClassLevel, subject.slug]);

  const [filters, setFilters] = useState<FiltersState>({
    featured: false,
    subject: null,
    chapter: null,
    board: null,
    medium: null,
    classLevel: null,
  });

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      subject: subject?.name || null,
      board: data?.board || null,
      medium: data?.medium || null,
      classLevel: data?.classLevel || null,
      chapter: selectedChapter?.title || null,
    }));
  }, [
    subject?.name,
    data?.board,
    data?.medium,
    data?.classLevel,
    selectedChapter?.title,
  ]);

  const toggleInArray = (arr: string[], value: string) =>
    arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];

  const handleToggleBoard = (board: string) => {
    setFilters((prev) => ({
      ...prev,
      board: prev.board === board ? null : board,
      medium: null,
      classLevel: null,
    }));
    setData({
      firebaseUid: data?.firebaseUid ?? "",
      name: data?.name ?? "",
      phone: data?.phone ?? "",
      gender: data?.gender ?? "",
      role: data?.role ?? "",
      board: board,
      medium: "",
      classLevel: "",
      userTier: data?.userTier ?? "",
    });
  };

  const handleToggleFeatured = () => {
    setFilters((prev) => ({
      ...prev,
      featured: !prev.featured,
    }));
  };

  const handleToggleSchoolMedium = (medium: string) => {
    setFilters((prev) => ({
      ...prev,
      medium: prev.medium === medium ? null : medium,
      classLevel: null,
    }));
    setData({
      firebaseUid: data?.firebaseUid ?? "",
      name: data?.name ?? "",
      phone: data?.phone ?? "",
      gender: data?.gender ?? "",
      role: data?.role ?? "",
      board: data?.board ?? "",
      medium: medium,
      classLevel: data?.classLevel ?? "",
      userTier: data?.userTier ?? "",
    });
  };

  const handleToggleClass = (cls: string) => {
    setFilters((prev) => ({
      ...prev,
      classLevel: prev.classLevel === cls ? null : cls,
    }));
    setData({
      firebaseUid: data?.firebaseUid ?? "",
      name: data?.name ?? "",
      phone: data?.phone ?? "",
      gender: data?.gender ?? "",
      role: data?.role ?? "",
      board: data?.board ?? "",
      medium: data?.medium ?? "",
      classLevel: cls,
      userTier: data?.userTier ?? "",
    });
  };

  const handleToggleSubject = (subject: { name: string; slug: string }) => {
    setFilters((prev) => ({
      ...prev,
      subject: prev.subject === subject.name ? null : subject.name,
    }));
    setSubject({
      name: subject.name,
      slug: subject.slug,
    });
  };

  const handleToggleChapter = (chapter: { title: string; slug: string }) => {
    setFilters((prev) => ({
      ...prev,
      chapter: prev.chapter === chapter.title ? null : chapter.title,
    }));
    setSelectedChapter({
      ...chapters.find((c) => c.title === chapter.title)!,
    });
  };

  const handleResetFilters = () => {
    setFilters({
      featured: false,
      board: "",
      classLevel: "",
      subject: "",
      chapter: "",
      medium: "",
    });
    setSubject({ name: "", slug: "" });
    setSelectedChapter(undefined);
  };

  const groupQuestionsByType = (
    questions: Question[],
    source: QuestionSource
  ) => {
    return questions
      .filter((q) => q.source === source)
      .reduce<Record<string, Question[]>>((acc, q) => {
        const type = q.type || "Other";
        acc[type] = acc[type] ? [...acc[type], q] : [q];
        return acc;
      }, {});
  };

  const [activeSource, setActiveSource] =
    useState<QuestionSource>("balbharati");

  console.log("selectedChapter: ", selectedChapter);

  return (
    <div className="hidden md:flex place-content-start items-start justify-center flex-[1_0_0] flex-row gap-2 h-[97.5vh] overflow-hidden p-0 relative w-px">
      <Filters
        subjects={subjects.map((s) => ({ name: s.name, slug: s.slug }))}
        chapters={chapters}
        boards={Object.keys(boardMediumMap).map((b) => ({
          board: b,
          slug: b.toLowerCase(),
        }))}
        schoolMediums={
          filters.board
            ? boardMediumMap[filters.board as keyof typeof boardMediumMap]?.map(
                (m) => ({
                  medium: m,
                  slug: m.toLowerCase().replace(/\s+/g, "-"),
                })
              ) ?? []
            : []
        }
        classLevels={
          filters.board
            ? boardClassMap[filters.board as keyof typeof boardClassMap]?.map(
                (c) => ({
                  classLevel: c,
                  slug: classToSlug(c),
                })
              ) ?? []
            : []
        }
        filters={filters}
        onToggleFeatured={handleToggleFeatured}
        onToggleSubject={handleToggleSubject}
        onToggleChapter={handleToggleChapter}
        onToggleBoard={handleToggleBoard}
        onToggleClass={handleToggleClass}
        onToggleSchoolMedium={handleToggleSchoolMedium}
        onReset={handleResetFilters}
      />
      <section className="border border-[rgba(25,26,32,0.08)] rounded-2xl bg-white flex content-center items-center flex-[1_0_0] flex-col gap-0 h-[97.5vh] justify-center overflow-visible p-px relative w-px">
        {/* ---------------- QUESTIONS ---------------- */}
        <main className="flex-1 overflow-y-auto w-full ">
          <div className="p-6 max-w-5xl mx-auto">
            {/* Header */}
            <header className="flex items-start justify-between mb-6">
              <div className="flex flex-col gap-4 items-start justify-between">
                <div className="flex flex-wrap items-center gap-3">
                  {filters.board && (
                    <span className="inline-flex items-center rounded-full bg-slate-900 px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-50">
                      {filters.board}
                    </span>
                  )}
                  {filters.medium && (
                    <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700">
                      {filters.medium?.replace("-", " ")} Medium
                    </span>
                  )}
                  {filters.classLevel && (
                    <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700">
                      {getClassLabel((filters.classLevel || "") as ClassKey)}
                    </span>
                  )}
                  {filters.subject && (
                    <span className="inline-flex items-center rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800">
                      {selectedChapter?.id.includes("ms-12-maths1")
                        ? "Mathematics & Statistics 1"
                        : selectedChapter?.id.includes("ms-12-maths2")
                        ? "Mathematics & Statistics 2"
                        : filters.subject}
                    </span>
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-[#193625]">
                    {selectedChapter
                      ? `Chapter ${selectedChapter.chapterNumber}: ${selectedChapter.title}`
                      : subject
                      ? `${subject.name} Questions`
                      : "Select filters to view questions"}
                  </h2>
                  <p className="text-xs font-medium text-gray-500 mt-1">
                    Total {selectedChapter?.questions.length ?? 0} Questions
                  </p>
                  <p className="text-xs font-medium text-gray-500 mt-1">
                    {activeSource === "balbharati" ? "Textbook" : "PYQ"}{" "}
                    {selectedChapter?.questions.filter(
                      (q) => q.source === activeSource
                    ).length ?? 0}{" "}
                    Questions
                  </p>
                </div>
              </div>

              {/* Source Tabs */}
              <div className="inline-flex rounded-full bg-slate-100 p-1 text-xs font-medium cursor-pointer">
                {(["balbharati", "pyq"] as QuestionSource[]).map((src) => (
                  <button
                    key={src}
                    onClick={() => setActiveSource(src)}
                    className={`px-3 py-1 rounded-full transition cursor-pointer ${
                      activeSource === src
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {src === "balbharati" ? "Textbook" : "PYQ"}
                  </button>
                ))}
              </div>
            </header>

            {/* Content */}
            {loading ? (
              <div className="py-24 text-center text-gray-400">
                Loading questions…
              </div>
            ) : !subject.name ? (
              <div className="py-24 text-center text-gray-400">
                Select a subject & chapter to view questions
              </div>
            ) : !selectedChapter ? (
              <div className="py-24 text-center text-gray-400">
                Select a chapter to view questions
              </div>
            ) : (
              (() => {
                const grouped = groupQuestionsByType(
                  selectedChapter.questions,
                  activeSource
                );

                if (Object.keys(grouped).length === 0) {
                  return (
                    <div className="py-24 text-center text-gray-400">
                      No questions available
                    </div>
                  );
                }

                return (
                  <div className="space-y-4">
                    {Object.entries(grouped).map(([type, qs]) => (
                      <details
                        key={type}
                        className="rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden cursor-pointer group"
                      >
                        <summary className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-slate-800 hover:bg-slate-100 transition">
                          <div className="flex flex-col gap-0.5">
                            <p>{questionTypeSlugToLabel(type)}</p>
                            <p className="text-[11px] uppercase tracking-wide text-slate-500">
                              {qs.length} Questions
                            </p>
                          </div>
                          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-slate-300 bg-white text-xs transition-transform group-open:rotate-90">
                            ▸
                          </span>
                        </summary>

                        <div className="border-t border-slate-200 bg-white px-4 py-4 text-sm text-slate-700 space-y-4">
                          {qs.map((q, i) => (
                            <div
                              key={q.id}
                              className="flex w-full flex-col items-start justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs sm:text-sm text-slate-800 hover:bg-emerald-50 hover:border-emerald-300 transition"
                            >
                              <div className="flex justify-between items-start w-full">
                                <p className="leading-relaxed text-sm font-medium">
                                  Q{i + 1}. {q.text}
                                </p>
                                <span className="shrink-0 text-[11px] bg-gray-200/75 px-2.5 py-1 rounded-lg">
                                  {q.marks} Marks
                                </span>
                              </div>

                              {/* MCQ Options */}
                              {q.options && (
                                <ul className="mt-2 pl-4 space-y-1 text-sm text-gray-600">
                                  {q.options.map((opt, idx) => (
                                    <li key={idx}>
                                      {String.fromCharCode(65 + idx)}. {opt}
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          ))}
                        </div>
                      </details>
                    ))}
                  </div>
                );
              })()
            )}
          </div>
        </main>
      </section>
    </div>
  );
}

type FiltersProps = {
  subjects: { name: string; slug: string }[];
  chapters: Chapter[];
  boards: { board: string; slug: string }[];
  schoolMediums: { medium: string; slug: string }[];
  classLevels: { classLevel: string; slug: string }[];
  filters: FiltersState;
  onToggleFeatured: () => void;
  onToggleSubject: (subject: { name: string; slug: string }) => void;
  onToggleChapter: (chapter: { title: string; slug: string }) => void;
  onToggleBoard: (board: string) => void;
  onToggleClass: (cls: string) => void;
  onToggleSchoolMedium: (medium: string) => void;
  onReset: () => void;
};

const Filters: React.FC<FiltersProps> = ({
  subjects,
  chapters,
  boards,
  schoolMediums,
  classLevels,
  filters,
  onToggleFeatured,
  onToggleSubject,
  onToggleChapter,
  onToggleBoard,
  onToggleClass,
  onToggleSchoolMedium,
  onReset,
}) => {
  console.log(subjects);
  return (
    <div className="flex-none h-[97.5vh] relative w-[371px]">
      <div className="border border-[rgba(25,26,32,0.08)] bg-white rounded-2xl opacity-100 flex place-content-start items-start flex-col gap-0 h-full overflow-visible p-0 relative w-full">
        {/* Header */}
        <div className="flex place-content-center justify-between items-center flex-none flex-row h-min overflow-visible py-5 px-6 relative w-full border-b border-[rgba(25,26,32,0.12)] opacity-100">
          <h4 className="text-2xl text-[#193625] tracking-tight">Filters</h4>
        </div>

        {/* Body */}
        <div className="flex place-content-start items-start flex-[1_0_0] flex-col gap-6 h-px overflow-auto p-0 relative w-full">
          <div className="flex content-start items-start flex-[1_0_0] flex-col gap-8 h-px justify-start overflow-auto py-4 px-4 pb-14 relative w-full">
            {/* Saved Courses */}
            {/* <div className="flex place-content-start items-start flex-none flex-col gap-3 h-min overflow-visible p-0 relative w-full">
              <p className="text-xs text-[#191a20]">Saved Courses</p>
              <button
                type="button"
                onClick={onToggleFeatured}
                className={`flex-none h-[30px] relative w-[61px] rounded-2xl cursor-pointer transition-colors ${
                  filters.featured ? "bg-[#193625]" : "bg-[#ededed]"
                }`}
              >
                <div
                  className={`flex-none h-6 w-[25px] absolute top-[calc(50%-12px)] bg-white rounded-2xl shadow-[0_4px_4px_rgba(0,0,0,0.08)] transition-all ${
                    filters.featured ? "right-[3px]" : "left-[3px]"
                  }`}
                />
              </button>
            </div> */}

            {/* BOARD */}
            <div className="flex items-start content-start flex-none flex-col gap-3 h-min justify-start overflow-visible p-0 relative w-full">
              <p className="text-xs text-[#191a20]">BOARD</p>
              <div className="grid flex-none gap-2 auto-rows-fr grid-cols-[repeat(3,minmax(50px,1fr))] h-min justify-center overflow-visible p-0 relative w-full">
                {boards.map((item, index) => {
                  const isActive = filters.board === item.board;
                  return (
                    <button
                      type="button"
                      key={index}
                      onClick={() => onToggleBoard(item.board)}
                      className="place-self-start flex-none h-full w-full"
                    >
                      <div
                        className={`flex place-content-start justify-center items-start cursor-pointer flex-col gap-6 h-min overflow-visible p-3 relative w-full border rounded-lg transition-colors
                        ${
                          isActive
                            ? "border-[#193625] bg-[#193625]"
                            : "border-[rgba(25,26,32,0.12)] bg-transparent"
                        }`}
                      >
                        <p
                          className={`text-sm ${
                            isActive ? "text-white" : "text-[#5e6b64]"
                          }`}
                        >
                          {item.board}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* MEDIUM */}
            <div className="flex items-start content-start flex-none flex-col gap-3 h-min justify-start overflow-visible p-0 relative w-full">
              <p className="text-xs text-[#191a20]">MEDIUM</p>
              <div className="grid flex-none gap-2 auto-rows-fr grid-cols-[repeat(3,minmax(50px,1fr))] h-min justify-center overflow-visible p-0 relative w-full">
                {schoolMediums.map((item, index) => {
                  const isActive = filters.medium === item.medium;
                  return (
                    <button
                      type="button"
                      key={index}
                      onClick={() => onToggleSchoolMedium(item.medium)}
                      className="place-self-start flex-none h-full w-full"
                    >
                      <div
                        className={`flex place-content-start justify-center items-start cursor-pointer flex-col gap-6 h-min overflow-visible p-3 relative w-full border rounded-lg transition-colors
                        ${
                          isActive
                            ? "border-[#193625] bg-[#193625]"
                            : "border-[rgba(25,26,32,0.12)] bg-transparent"
                        }`}
                      >
                        <p
                          className={`text-sm ${
                            isActive ? "text-white" : "text-[#5e6b64]"
                          }`}
                        >
                          {item.medium === "Semi-English"
                            ? "Semi-Eng"
                            : item.medium}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CLASS LEVEL */}
            <div className="flex items-start content-start flex-none flex-col gap-3 h-min justify-start overflow-visible p-0 relative w-full">
              <p className="text-xs text-[#191a20]">CLASS LEVEL</p>
              <div className="grid flex-none gap-2 auto-rows-fr grid-cols-[repeat(3,minmax(50px,1fr))] grid-rows-2 h-min justify-center overflow-visible p-0 relative w-full">
                {classLevels.map((item, index) => {
                  const isActive = filters.classLevel === item.classLevel;
                  return (
                    <button
                      type="button"
                      key={index}
                      onClick={() => onToggleClass(item.classLevel)}
                      className="place-self-start flex-none h-full w-full"
                    >
                      <div
                        className={`flex place-content-start justify-center items-start cursor-pointer flex-col gap-6 h-min overflow-visible p-3 relative w-full border rounded-lg transition-colors
                        ${
                          isActive
                            ? "border-[#193625] bg-[#193625]"
                            : "border-[rgba(25,26,32,0.12)] bg-transparent"
                        }`}
                      >
                        <p
                          className={`text-sm ${
                            isActive ? "text-white" : "text-[#5e6b64]"
                          }`}
                        >
                          {item.classLevel.includes("Science")
                            ? item.classLevel.replace("Science", "Sci")
                            : item.classLevel.includes("Commerce")
                            ? item.classLevel.replace("Commerce", "Com")
                            : item.classLevel.includes("Humanities")
                            ? item.classLevel.replace("Humanities", "Hum")
                            : item.classLevel}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* SUBJECTS */}
            <SelectField
              label="Subject"
              value={filters.subject || ""}
              onChange={(v) => {
                onToggleSubject({
                  name: v,
                  slug: subjects.find((s) => s.name === v)?.slug || "",
                });
              }}
              options={subjects.map((s) => s.name)}
            />

            {/* Chapters */}
            {chapters.length > 0 && (
              <SelectField
                label="Chapter"
                value={filters.chapter || ""}
                onChange={(v) =>
                  onToggleChapter({
                    title: v,
                    slug: chapters.find((c) => c.title === v)?.slug || "",
                  })
                }
                options={chapters.map((c) => c.title)}
              />
            )}
          </div>
        </div>

        {/* Footer - Reset */}
        <div className="flex place-content-center items-center flex-none flex-row gap-2.5 h-min overflow-hidden p-6 relative w-full border-t border-[rgba(25,26,32,0.12)] opacity-100">
          <button
            type="button"
            onClick={onReset}
            className="flex-[1_0_0] h-12 relative w-px"
          >
            <div className="border border-black bg-transparent w-full h-12 rounded-lg opacity-100 flex place-content-center items-center cursor-pointer flex-row gap-2.5 overflow-hidden py-6 px-4 relative">
              <p className="text-sm text-[#191a20] text-center">
                Reset Filters
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

/* ---------------- UI HELPERS ---------------- */

function Section({ title, children }: any) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold text-gray-600">{title}</p>
      {children}
    </div>
  );
}

const SelectField = ({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) => (
  <div className="flex flex-col gap-3 relative w-full">
    <span className="text-xs text-[#191a20]">{label.toUpperCase()}</span>

    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
        w-full p-4 pr-12 rounded-lg bg-white
        shadow-[inset_0_0_0_1px_rgba(25,26,32,0.2)]
        outline-none text-[16px]
        focus:ring-2 focus:ring-[#193625]/20
        appearance-none
      "
      >
        <option value="">Select {label}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>

      {/* Custom Chevron */}
      <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[#193625]"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </div>
  </div>
);

const normalizeMedium = (value?: string) => {
  if (!value) return null;

  return value.toLowerCase().trim().replace(/\s+/g, "-") as
    | "english"
    | "marathi"
    | "hindi"
    | "semi-english"
    | "all";
};

const normalizeClassLevel = (value?: string) => {
  if (!value) return null;

  return value
    .toLowerCase()
    .trim()
    .replace(/th|st|nd|rd/g, "") // remove 12th → 12
    .replace(/\s+/g, "-") as
    | "8"
    | "9"
    | "10"
    | "11-arts"
    | "11-commerce"
    | "11-science"
    | "11-humanities"
    | "12-arts"
    | "12-commerce"
    | "12-science"
    | "12-humanities";
};

const classToSlug = (value?: string): string => {
  if (!value) return "";

  const v = value.toLowerCase().trim();

  // extract class number (8, 9, 10, 11, 12)
  const match = v.match(/\d+/);
  if (!match) return "";

  const cls = match[0];

  if (v.includes("science")) return `${cls}-sci`;
  if (v.includes("commerce")) return `${cls}-com`;
  if (v.includes("humanities") || v.includes("arts")) return `${cls}-hum`;

  // plain classes (8, 9, 10)
  return cls;
};

const getClassLabel = (classKey: ClassKey): string => {
  if (classKey === "8" || classKey === "9" || classKey === "10") {
    return `Class ${classKey}`;
  }
  const [std, stream] = classKey.split("-");
  const stdLabel = `Class ${std}`;
  const streamLabel = getStreamLabel(
    stream as "science" | "commerce" | "arts" | "humanities" | "all"
  );
  return `${stdLabel}`;
};

const getStreamLabel = (
  stream: "science" | "commerce" | "arts" | "humanities" | "all"
): string => {
  switch (stream) {
    case "science":
      return "Science";
    case "commerce":
      return "Commerce";
    case "arts":
      return "Arts";
    case "humanities":
      return "Humanities";
    default:
      return "All Streams";
  }
};

const questionTypeSlugToLabel = (label: string): string => {
  const shortMap: Record<string, string> = {
    mcq: "MCQ",
    "very-short": "Very Short Answer",
    short: "Short Answer",
    long: "Long Answer",
    numerical: "Numerical Problems",
    diagram: "Diagram Based Questions",
    reason: "Give Reason",
    fill: "Fill in the Blanks",
    activity: "Activity Based Questions",
  };

  const key = label.toLowerCase();
  return shortMap[key] || label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
};
