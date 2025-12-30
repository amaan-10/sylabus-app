/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
// src/app/courses/[board]/[medium]/[class]/[subject]/page.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import { BOARDS } from "@/lib/boards";
import { MEDIUMS } from "@/lib/mediums";
import {
  getSubjectsFor,
  BoardSlug,
  MediumSlug,
  ClassKey,
  Subject,
} from "@/lib/subjects";
import Sidebar from "@/components/Sidebar";
import { ChevronRight, Home, X, Trash2, FileText, Minus } from "lucide-react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../../../../../firebase";

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

type PaperMode = "exam" | "custom";

type SectionedSelection = Record<string, Question[]>;
// key = section.key (A1, A2, B, C, D)

type ScienceSubjectKey = "physics" | "chemistry" | "biology";

const ChapterSkeleton = () => (
  <div className="space-y-3">
    {Array.from({ length: 5 }).map((_, i) => (
      <div key={i} className="h-14 rounded-xl bg-slate-200 animate-pulse" />
    ))}
  </div>
);

/* ---------------------- Main Page Component ---------------------- */

const SubjectChaptersPage: React.FC = () => {
  const params = useParams();

  const boardParam = String(params?.board || "").toLowerCase();
  const mediumSegment = String(params?.medium || "");
  const classSegment = String(params?.class || "").toLowerCase();
  const subjectSegment = String(params?.subject || "").toLowerCase();

  const board = BOARDS.find((b) =>
    b.abbreviation.toLowerCase().includes(boardParam)
  );

  if (!board) {
    return (
      <NotFoundBlock
        title="Board not found"
        message={`We couldn't find any board for "${boardParam}".`}
        href="/"
        cta="Go back home"
      />
    );
  }

  const boardSlug = resolveBoardSlug(board.abbreviation);
  if (!boardSlug) {
    return (
      <NotFoundBlock
        title="Unsupported board"
        message={`"${board.board_name}" is not yet configured in the subjects/chapters library.`}
        href="/"
        cta="Go back home"
      />
    );
  }

  let mediumSlug: string = mediumSegment.toLowerCase();
  mediumSlug = mediumSlug.replace(/-?medium$/, "").replace(/[^a-z-]/g, "");
  const medium =
    MEDIUMS.find(
      (m) =>
        m.slug === mediumSlug &&
        m.used_in_boards.some(
          (abbr) => abbr.toLowerCase() === board.abbreviation.toLowerCase()
        )
    ) || null;

  const mediumSlugForSubjects = (mediumSlug || "english") as MediumSlug;
  const mediumLabel = medium?.medium_name || "All Mediums";

  const rawClassKey = classSegment.replace(/^class-/, "");
  const classKey = rawClassKey as ClassKey;

  const subjectsForCombo = getSubjectsFor(
    boardSlug,
    mediumSlugForSubjects,
    classKey
  );

  const subject =
    subjectsForCombo.find(
      (s) => s.slug.toLowerCase() === subjectSegment.toLowerCase()
    ) || null;

  if (!subject) {
    return (
      <NotFoundBlock
        title="Subject not found"
        message={`We couldn't find subject "${subjectSegment}" for ${board.abbreviation.toUpperCase()} — ${mediumLabel} — ${getClassLabel(
          classKey
        )}.`}
        href={`/courses/${boardParam}/${mediumSegment}`}
        cta="Back to courses"
      />
    );
  }

  // Chapters state
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [chaptersLoading, setChaptersLoading] = useState(true);
  const [chaptersError, setChaptersError] = useState<string | null>(null);
  const [openChapterId, setOpenChapterId] = useState<string | null>(null);
  const [questionSource, setQuestionSource] =
    useState<QuestionSource>("balbharati");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [schoolName, setSchoolName] = useState("");
  const [paperMode, setPaperMode] = useState<PaperMode>("custom");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<UserData>();
  const [openDraftNameDailog, setOpenDraftNameDailog] = useState(false);
  const [draftName, setDraftName] = useState("");
  const [saving, setSaving] = useState(false);

  // useEffect(() => {
  //   const handler = (e: BeforeUnloadEvent) => {
  //     if (!localStorage.getItem("paper:draft")) return;

  //     e.preventDefault();
  //     e.returnValue = ""; // browser dialog (cannot customize)
  //   };

  //   window.addEventListener("beforeunload", handler);
  //   return () => window.removeEventListener("beforeunload", handler);
  // }, []);

  const blockedRef = useRef(false);

  // useEffect(() => {
  //   const onPopState = () => {
  //     if (!localStorage.getItem("paper:draft")) return;

  //     if (!blockedRef.current) {
  //       blockedRef.current = true;
  //       setShowLeaveDialog(true);

  //       // cancel navigation
  //       window.history.pushState(null, "", window.location.href);
  //     }
  //   };

  //   window.addEventListener("popstate", onPopState);
  //   return () => window.removeEventListener("popstate", onPopState);
  // }, []);

  // console.log(showLeaveDialog);

  const saveDraftToDB = async (draftName: string) => {
    const raw = localStorage.getItem("paper:draft");
    if (!raw || !data?.firebaseUid) return;

    await fetch("/api/paper-drafts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: data.firebaseUid,
        draftName,
        draft: JSON.parse(raw),
      }),
    });

    localStorage.removeItem("paper:draft");
  };

  const discardDraft = () => {
    localStorage.removeItem("paper:draft");
  };

  // ---------- Set Account Data ----------

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

  // ---------- Paper Builder state (selected questions) ----------
  // Store selection as array of question objects (unique by id)
  const [selected, setSelected] = useState<Question[]>(() => {
    try {
      if (typeof window === "undefined") return [];

      const raw = localStorage.getItem("paper:draft");
      if (!raw) return [];

      const draft = JSON.parse(raw);

      // ✅ Extract only the selected questions array
      return Array.isArray(draft?.selected) ? draft.selected : [];
    } catch (err) {
      console.error("Failed to parse paper:draft", err);
      return [];
    }
  });

  // const [selected, setSelected] = useState<Question[]>(() => {
  //   try {
  //     const raw =
  //       typeof window !== "undefined" && localStorage.getItem("paper:selected");
  //     return raw ? JSON.parse(raw) : [];
  //   } catch {
  //     return [];
  //   }
  // });

  const [sectionedSelected, setSectionedSelected] =
    useState<SectionedSelection>({});

  const [schoolDialogOpen, setSchoolDialogOpen] = useState(false);

  const shouldBlock = previewOpen ? false : selected.length > 0;

  const {
    showDialog: showLeaveDialog,
    confirmLeave,
    cancelLeave,
    allowRoute,
  } = useLeaveGuard(shouldBlock);

  useEffect(() => {
    // -------- EXAM MODE --------
    const examKey = subject.slug.toLowerCase() as ScienceSubjectKey;
    const pattern = EXAM_PATTERN_12_SCIENCE[examKey];

    setSectionedSelected((prev) => {
      const next = { ...prev };

      selected.forEach((q) => {
        const sec = findExamSection(q, pattern);
        if (!sec) return;

        const limit = sec.total;
        const current = next[sec.key] ?? [];

        // already exists
        if (current.some((x) => x.id === q.id)) return;

        // section full
        if (current.length >= limit) return;

        next[sec.key] = [...current, q];
      });

      return next;
    });
  }, [selected]);

  // panel open state for question-type slide-over (same as before)
  const [openQuestionType, setOpenQuestionType] = useState<{
    questionTypeLabel: string;
    questionTypeSlug: string;
    chapterSlug: string;
    chapterTitle?: string;
    chapterNumber?: number;
    source: QuestionSource;
  } | null>(null);

  // persist selected to localStorage
  useEffect(() => {
    if (selected.length === 0) return;

    const draft = {
      subjectSlug: subject.slug,
      paperMode,
      selected,
      sectionedSelected,
      lastUpdated: Date.now(),
    };

    localStorage.setItem("paper:draft", JSON.stringify(draft));
  }, [selected, sectionedSelected, paperMode]);

  const findExamSection = (
    q: Question,
    pattern?: ExamPattern
  ): ExamSection | undefined => {
    if (!pattern || !Array.isArray(pattern.sections)) {
      return undefined;
    }

    return pattern.sections.find(
      (sec) => prettifyType(q.type) === sec.type && q.marks === sec.marks
    );
  };

  useEffect(() => {
    let cancelled = false;
    const safeBoardSlug = boardSlug as BoardSlug;
    const subjectSlug = subject.slug;

    async function loadChapters() {
      try {
        setChaptersLoading(true);
        setChaptersError(null);

        const data = await getChaptersFor(
          safeBoardSlug,
          mediumSlugForSubjects,
          classKey,
          subjectSlug
        );

        if (!cancelled) {
          setChapters(data);
          if (data.length > 0) {
            setOpenChapterId(data[0].id);
          }
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
  }, [boardSlug, mediumSlugForSubjects, classKey, subject]);

  // derive question types
  const prettifyType = (t: string) => {
    if (!t) return "";
    const map: Record<string, string> = {
      mcq: "MCQ",
      "true-false": "True or False",
      "true or false": "True or False",
      short: "Short answer",
      "very-short": "Very short answer",
      "very short": "Very short answer",
      long: "Long answer",
      fill: "Fill in the blanks",
      "fill in the blanks": "Fill in the blanks",
      numerical: "Numerical problems",
      diagram: "Diagram based questions",
      "give reason": "Give reason",
      activity: "Activity Based Questions",
    };
    const key = String(t).toLowerCase();
    return (
      map[key] ||
      key.replace(/[_-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    );
  };

  const questionTypesFromData = React.useMemo(() => {
    const set = new Set<string>();

    for (const ch of chapters) {
      if (!ch.questions) continue;

      for (const q of ch.questions) {
        if (q.source && q.source !== questionSource) continue;

        const candidate = prettifyType(q.type) || "";

        if (candidate) set.add(candidate.trim());
      }
    }

    return Array.from(set);
  }, [chapters, questionSource]);

  const questionTypesFromOpenChapter = React.useMemo(() => {
    if (!openChapterId) return [];

    const chapter = chapters.find((c) => c.id === openChapterId);
    if (!chapter || !chapter.questions) return [];

    const set = new Set<string>();

    for (const q of chapter.questions) {
      if (q.source && q.source !== questionSource) continue;

      const candidate = prettifyType(q.type || "");
      if (candidate) set.add(candidate.trim());
    }

    return Array.from(set);
  }, [chapters, openChapterId, questionSource]);

  const questionTypes =
    questionTypesFromOpenChapter.length > 0
      ? questionTypesFromOpenChapter
      : questionTypesFromData.length > 0
      ? questionTypesFromData
      : getQuestionTypesForSubject(subject, questionSource);

  const addQuestionsToPaper = (qs: Question[]) => {
    console.log("qs", qs);

    if (paperMode === "custom") {
      setSelected((prev) => {
        const map = new Map(prev.map((p) => [p.id, p]));
        qs.forEach((q) => map.set(q.id, q));
        return Array.from(map.values());
      });
      return;
    }

    // -------- EXAM MODE --------
    const examKey = subject.slug.toLowerCase() as ScienceSubjectKey;
    const pattern = EXAM_PATTERN_12_SCIENCE[examKey];
  };

  const removeFromPaper = (id: string) => {
    setSelected((prev) => prev.filter((p) => p.id !== id));
  };

  const clearPaper = () => {
    if (!confirm("Clear all selected questions?")) return;
    setSelected([]);
  };

  const moveUp = (index: number) => {
    if (index <= 0) return;
    setSelected((prev) => {
      const arr = [...prev];
      const el = arr.splice(index, 1)[0];
      arr.splice(index - 1, 0, el);
      return arr;
    });
  };

  const moveDown = (index: number) => {
    setSelected((prev) => {
      if (index >= prev.length - 1) return prev;
      const arr = [...prev];
      const el = arr.splice(index, 1)[0];
      arr.splice(index + 1, 0, el);
      return arr;
    });
  };

  // export selected to JSON file
  const exportJSON = () => {
    const data = JSON.stringify(
      { meta: { board: boardParam, medium: mediumSlug, classKey }, selected },
      null,
      2
    );
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${subject.slug}-paper-selection.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // export printable HTML (new window)

  const exportPrintable = () => {
    setSchoolDialogOpen(true);
    // setPreviewOpen(true);
  };

  const handleOpenQuestionType = (
    label: string,
    chapterSlug: string,
    chapterTitle?: string,
    chapterNumber?: number
  ) => {
    setOpenQuestionType({
      questionTypeLabel: label,
      questionTypeSlug: questionTypeToSlug(label),
      chapterSlug,
      chapterTitle,
      chapterNumber,
      source: questionSource,
    });
  };

  const handleToggleChapter = (id: string) => {
    setOpenChapterId((prev) => (prev === id ? null : id));
  };

  const items = [
    { label: "Courses", href: "/courses" },
    {
      label: `${boardParam.toUpperCase()}`,
      href: `/courses/${boardParam}`,
    },
    {
      label: `${
        mediumSlug.charAt(0).toUpperCase() + mediumSlug.slice(1)
      } Medium`,
      href: `/courses/${boardParam}/${mediumSegment}`,
    },
    {
      label: getClassLabel(classKey),
      href: `/courses/${boardParam}/${mediumSegment}/${classSegment}`,
    },
    {
      label: subject.name,
      href: `/courses/${boardParam}/${mediumSegment}/${classSegment}/${subject.slug}`,
      active: true,
    },
  ];

  return (
    <div className="flex place-content-start items-start bg-slate-50 md:bg-white flex-row gap-2 h-min overflow-hidden py-2 px-2 pl-2 md:pl-[104px] relative min-h-screen w-auto font-poppins">
      <Sidebar />
      {showLeaveDialog && (
        <div className="fixed inset-0 z-9999 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-[360px]">
            <h3 className="text-lg font-semibold">Save paper draft?</h3>
            <p className="text-sm text-slate-600 mt-2">
              You have unsaved changes.
            </p>

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => {
                  localStorage.removeItem("paper:draft");
                  confirmLeave();
                }}
                className="px-4 py-2 border rounded-lg cursor-pointer"
              >
                Discard
              </button>

              <button
                onClick={() => {
                  setOpenDraftNameDailog(true);
                }}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg cursor-pointer"
              >
                Save Draft
              </button>
            </div>
          </div>
        </div>
      )}
      {openDraftNameDailog && (
        <div className="fixed inset-0 z-9999 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-[380px] shadow-xl">
            <div className="flex justify-between">
              <h3 className="text-lg font-semibold">Save paper draft</h3>
              <button
                type="button"
                onClick={() => setOpenDraftNameDailog(false)}
                className="relative bottom-2 left-2 rounded-full p-2 hover:bg-slate-100 cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-slate-600 mt-1">
              Give your draft a name to save it.
            </p>

            {/* Draft name input */}
            <input
              type="text"
              placeholder="e.g. Unit Test – Physics Ch 1"
              value={draftName}
              onChange={(e) => setDraftName(e.target.value)}
              className="mt-4 w-full px-4 py-2 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-emerald-600"
              autoFocus
            />

            <div className="flex justify-end gap-3 mt-6">
              <button
                disabled={!draftName.trim() || saving}
                onClick={async () => {
                  try {
                    setSaving(true);
                    await saveDraftToDB(draftName.trim());
                    setDraftName("");
                    confirmLeave();
                  } finally {
                    setSaving(false);
                  }
                }}
                className={`px-4 py-2 rounded-lg text-white ${
                  !draftName.trim()
                    ? "bg-emerald-600/50 cursor-not-allowed"
                    : "bg-emerald-600 hover:bg-emerald-700 cursor-pointer"
                }`}
              >
                {saving ? "Saving..." : "Save Draft"}
              </button>
            </div>
          </div>
        </div>
      )}

      <LoaderWrapper isLoading={chaptersLoading}>
        <section className="relative flex flex-row flex-nowrap flex-[1_0_0] items-start content-start justify-center gap-14 w-px min-h-screen h-min rounded-2xl bg-slate-50 md:border border-[rgba(0,0,0,0.08)] overflow-hidden p-[56px_8px_120px] md:p-[56px_32px_32px] will-change-transform">
          <div className="w-full">
            {/* Breadcrumb */}
            <nav className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
              <Home className="w-4 h-4" />
              {items.map((item, index) => (
                <span key={index} className="flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5" />
                  <a
                    href={item.href}
                    className={`hover:text-foreground transition-colors ${
                      item.active ? "text-foreground font-medium" : ""
                    }`}
                  >
                    {item.label}
                  </a>
                </span>
              ))}
            </nav>

            {/* Header */}
            <div className="min-h-screen py-10">
              <div className="px-0 md:px-8 space-y-8">
                <header className="space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center rounded-full bg-slate-900 px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-50">
                      {board.abbreviation}
                    </span>
                    <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700">
                      {board.type}
                    </span>
                    <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700">
                      {mediumLabel}
                    </span>
                    <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700">
                      {getClassLabel(classKey)}
                    </span>
                    <span className="inline-flex items-center rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800">
                      {subject.name}
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900">
                    {subject.name} — {board.board_name} (
                    {getClassLabel(classKey)})
                  </h1>

                  <p className="max-w-3xl text-sm text-slate-600">
                    Explore chapters and open question-type lists. While viewing
                    questions you can select ones you want and assemble a
                    question paper using the Paper Builder (panel on the right).
                  </p>
                </header>

                {/* Tabs */}
                <div className="inline-flex rounded-full bg-slate-200 p-1 text-xs font-medium cursor-pointer">
                  <button
                    type="button"
                    onClick={() => setQuestionSource("balbharati")}
                    className={`px-3 py-1 rounded-full transition cursor-pointer ${
                      questionSource === "balbharati"
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Balbharati / Textbook
                  </button>
                  <button
                    type="button"
                    onClick={() => setQuestionSource("pyq")}
                    className={`px-3 py-1 rounded-full transition cursor-pointer ${
                      questionSource === "pyq"
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    PYQ
                  </button>
                </div>

                {/* <div className="inline-flex rounded-full bg-slate-200 ml-2 p-1 text-xs font-medium cursor-pointer">
                <button
                  onClick={() => setPaperMode("exam")}
                  className={`px-3 py-1 rounded-full cursor-pointer ${
                    paperMode === "exam" ? "bg-white shadow" : ""
                  }`}
                >
                  Exam Pattern
                </button>

                <button
                  onClick={() => setPaperMode("custom")}
                  className={`px-3 py-1 rounded-full cursor-pointer ${
                    paperMode === "custom" ? "bg-white shadow" : ""
                  }`}
                >
                  Custom
                </button>
              </div> */}

                {/* Chapters Accordion */}
                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <h2 className="text-base font-semibold text-slate-900">
                      Chapters
                    </h2>
                    <p className="text-xs text-slate-500">
                      Select questions to add them to the paper.
                    </p>
                  </div>

                  <div className="mt-4 space-y-3">
                    {chaptersLoading ? (
                      <ChapterSkeleton />
                    ) : (
                      <>
                        {chapters.map((chapter) => {
                          const isOpen = chapter.id === openChapterId;
                          return (
                            <div key={chapter.id}>
                              {chapter.id === "ms-12-maths1-ch1" && (
                                <div className="text-sm font-medium pl-3 pb-2">
                                  Mathematics & Statistics 1
                                </div>
                              )}
                              {chapter.id === "ms-12-maths2-ch1" && (
                                <div className="text-sm font-medium pl-3 py-2">
                                  Mathematics & Statistics 2
                                </div>
                              )}
                              <div className="rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden">
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleToggleChapter(chapter.id)
                                  }
                                  className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-slate-800 hover:bg-slate-100 transition"
                                >
                                  <div className="flex flex-col gap-0.5">
                                    <span className="text-[11px] uppercase tracking-wide text-slate-500">
                                      Chapter {chapter.chapterNumber}
                                    </span>
                                    <span>{chapter.title}</span>
                                  </div>
                                  <span
                                    className={`inline-flex h-6 w-6 items-center justify-center rounded-full border border-slate-300 bg-white text-xs transition-transform ${
                                      isOpen ? "rotate-90" : ""
                                    }`}
                                  >
                                    ▸
                                  </span>
                                </button>

                                {isOpen && (
                                  <div className="border-t border-slate-200 bg-white px-4 py-4 text-sm text-slate-700 space-y-4">
                                    {(chapter.description ||
                                      chapter.topics ||
                                      chapter.learningObjectives) && (
                                      <div className="space-y-2">
                                        {chapter.description && (
                                          <p className="text-xs text-slate-600">
                                            {chapter.description}
                                          </p>
                                        )}
                                        {chapter.topics &&
                                          chapter.topics.length > 0 && (
                                            <div>
                                              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                                                Topics
                                              </p>
                                              <div className="mt-1 flex flex-wrap gap-1.5">
                                                {chapter.topics.map((topic) => (
                                                  <span
                                                    key={topic}
                                                    className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-700"
                                                  >
                                                    {topic}
                                                  </span>
                                                ))}
                                              </div>
                                            </div>
                                          )}

                                        {chapter.learningObjectives &&
                                          chapter.learningObjectives.length >
                                            0 && (
                                            <div>
                                              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                                                Learning Objectives
                                              </p>
                                              <ul className="mt-1 list-disc pl-5 text-xs text-slate-600 space-y-1">
                                                {chapter.learningObjectives.map(
                                                  (obj) => (
                                                    <li key={obj}>{obj}</li>
                                                  )
                                                )}
                                              </ul>
                                            </div>
                                          )}
                                      </div>
                                    )}

                                    {/* Question types for this chapter: BUTTONS open panel */}
                                    <div className="space-y-2">
                                      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                                        Practice by Question Type (
                                        {questionSource === "balbharati"
                                          ? "Textbook"
                                          : "PYQ"}
                                        )
                                      </p>
                                      <div className="space-y-2 mt-1">
                                        {questionTypes.map((type) => (
                                          <button
                                            key={type}
                                            onClick={() =>
                                              handleOpenQuestionType(
                                                type,
                                                chapter.slug,
                                                chapter.title,
                                                chapter.chapterNumber
                                              )
                                            }
                                            className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs sm:text-sm text-slate-800 hover:bg-emerald-50 hover:border-emerald-300 transition"
                                          >
                                            <span>{type}</span>
                                            <span className="text-[10px] text-slate-500">
                                              Open →
                                            </span>
                                          </button>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </>
                    )}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </section>
      </LoaderWrapper>

      {/* ----------------- Slide-over QuestionTypePanel ----------------- */}
      {openQuestionType && (
        <QuestionTypePanel
          boardSlug={boardSlug}
          mediumSlug={mediumSlugForSubjects}
          classKey={classKey}
          subject={subject}
          paperMode={paperMode}
          sectionedSelected={sectionedSelected}
          openSpec={openQuestionType}
          onClose={() => setOpenQuestionType(null)}
          onAddToPaper={(qs) => addQuestionsToPaper(qs)}
          selectedIds={new Set(selected.map((s) => s.id))}
          selectedGlobal={selected}
          setSelectedGlobal={setSelected}
          setSectionedSelected={setSectionedSelected}
        />
      )}

      {/* ----------------- Paper Builder Panel (Right dock) ----------------- */}
      <PaperBuilder
        selected={selected}
        setSelected={setSelected}
        removeFromPaper={paperMode === "custom" ? removeFromPaper : () => {}}
        clearPaper={clearPaper}
        exportPrintable={exportPrintable}
        exportJSON={exportJSON}
        schoolName={schoolName}
        setSchoolName={setSchoolName}
        paperMode={paperMode}
        sectionedSelected={sectionedSelected}
        setSectionedSelected={setSectionedSelected}
        subject={subject}
        setPaperMode={setPaperMode}
      />

      <SchoolNameDialog
        open={schoolDialogOpen}
        initialValue={schoolName}
        onClose={() => setSchoolDialogOpen(false)}
        continueWithoutInfo={(value) => {
          setSchoolName(value);
          setSchoolDialogOpen(false);
          setPreviewOpen(true);
        }}
        onSave={(value) => {
          setSchoolName(value);
          setSchoolDialogOpen(false);
          setPreviewOpen(true);
        }}
      />

      {previewOpen && (
        <PDFPreviewModal
          open={previewOpen}
          onClose={() => setPreviewOpen(false)}
          schoolName={schoolName}
          subject={subject}
          selected={selected}
          paperMode={paperMode}
          sectionedSelected={sectionedSelected}
          boardParam={boardParam}
          mediumSlug={mediumSlug}
          classKey={classKey}
          firebaseUid={data?.firebaseUid}
          allowRoute={allowRoute}
        />
      )}
    </div>
  );
};

export default SubjectChaptersPage;

/* ------------------ QuestionTypePanel (with selection support) ------------------ */

const QuestionTypePanel: React.FC<{
  boardSlug: BoardSlug | null;
  mediumSlug: MediumSlug;
  classKey: ClassKey;
  subject: Subject;
  openSpec: {
    questionTypeLabel: string;
    questionTypeSlug: string;
    chapterSlug: string;
    chapterTitle?: string;
    chapterNumber?: number;
    source: QuestionSource;
  };
  onClose: () => void;
  onAddToPaper: (qs: Question[]) => void;
  // let panel show which are already selected globally (checkbox checked)
  selectedIds: Set<string>;
  selectedGlobal: Question[];
  setSelectedGlobal: React.Dispatch<React.SetStateAction<Question[]>>;
  paperMode: PaperMode;
  sectionedSelected: Record<string, Question[]>;
  setSectionedSelected: React.Dispatch<
    React.SetStateAction<SectionedSelection>
  >;
}> = ({
  boardSlug,
  mediumSlug,
  classKey,
  subject,
  openSpec,
  onClose,
  onAddToPaper,
  selectedIds,
  selectedGlobal,
  setSelectedGlobal,
  paperMode,
  sectionedSelected,
  setSectionedSelected,
}) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [chapterTitle, setChapterTitle] = useState<string>(
    openSpec.chapterTitle || ""
  );
  const [chapterNumber, setChapterNumber] = useState<number>(
    openSpec.chapterNumber || 0
  );
  const [totalMarks, setTotalMarks] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // local selection within panel (for faster checkboxes)
  const [localSelectedIds, setLocalSelectedIds] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams({
          board: boardSlug ?? "",
          medium: mediumSlug ?? "",
          classKey: classKey ?? "",
          subjectSlug: subject ? subject.slug : "",
          questionTypeLabel: openSpec.questionTypeLabel ?? "",
          source: openSpec.source ?? "",
        });

        if (openSpec.chapterSlug)
          params.set("chapterSlug", openSpec.chapterSlug);

        const res = await fetch(`/api/question-bank?${params.toString()}`, {
          signal: controller.signal,
        });

        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.error || `Request failed with ${res.status}`);
        }

        const data = await res.json();
        setQuestions(data.questions || []);
        setChapterTitle(data.chapterTitle || openSpec.chapterTitle || "");
        setChapterNumber(data.chapterNumber || openSpec.chapterNumber || 0);
        setTotalMarks(data.totalMarks || 0);

        // pre-check already globally selected
        const startSet = new Set<string>();
        (data.questions || []).forEach((q: Question) => {
          if (selectedIds.has(q.id)) startSet.add(q.id);
        });
        setLocalSelectedIds(startSet);
      } catch (err: any) {
        if (err.name === "AbortError") return;
        console.error("Question bank fetch error:", err);
        setError(err.message ?? "Failed to load questions");
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    boardSlug,
    mediumSlug,
    classKey,
    subject,
    openSpec.chapterSlug,
    openSpec.questionTypeLabel,
    openSpec.source,
  ]);

  const isExamMode = paperMode === "exam";

  // toggle selection for a question in this panel
  const toggleSelect = (q: Question) => {
    // ================= CUSTOM MODE =================
    if (!isExamMode) {
      setLocalSelectedIds((prev) => {
        const copy = new Set(prev);
        const exists = copy.has(q.id);

        if (exists) {
          copy.delete(q.id);
          setSelectedGlobal((g) => g.filter((x) => x.id !== q.id));
        } else {
          copy.add(q.id);
          setSelectedGlobal((g) => {
            if (g.some((x) => x.id === q.id)) return g;
            return [...g, q];
          });
        }

        return copy;
      });
      return;
    }

    // ================= EXAM MODE =================
    const sec = getSectionForQuestion(q);
    if (!sec) return;

    setSectionedSelected((prev) => {
      const current = prev[sec.key] ?? [];

      // remove
      if (current.some((x) => x.id === q.id)) {
        setSelectedGlobal((g) => g.filter((x) => x.id !== q.id));
        return {
          ...prev,
          [sec.key]: current.filter((x) => x.id !== q.id),
        };
      }

      // add (only if space)
      const limit = sec.total;
      if (current.length >= limit) return prev;

      setSelectedGlobal((g) => {
        if (g.some((x) => x.id === q.id)) return g;
        return [...g, q];
      });

      return {
        ...prev,
        [sec.key]: [...current, q],
      };
    });
  };

  // add all local selected to paper (ensure unique)
  const handleAddSelectedToPaper = () => {
    const toAdd = questions.filter((q) => localSelectedIds.has(q.id));
    if (toAdd.length === 0) {
      // if none selected locally, add all displayed
      if (
        !confirm("No local selection. Add all visible questions to the paper?")
      )
        return;
      onAddToPaper(questions);
    } else {
      onAddToPaper(toAdd);
    }
  };

  const isSelectedGlobal = (id: string) =>
    selectedGlobal.some((s) => s.id === id);

  const getSectionForQuestion = (q: Question) => {
    if (!isExamMode) return null;

    const examKey = subject.slug.toLowerCase() as ScienceSubjectKey;
    const pattern = EXAM_PATTERN_12_SCIENCE[examKey];

    return pattern.sections.find(
      (s) => prettifyType(q.type) === s.type && q.marks === s.marks
    );
  };

  const isSectionFull = (q: Question): boolean => {
    if (!isExamMode) return false;

    const sec = getSectionForQuestion(q);
    if (!sec) return true;

    const limit = sec.total;
    const current = sectionedSelected[sec.key] ?? [];

    return current.length >= limit;
  };

  const capitalize = (s: string) =>
    s ? s.charAt(0).toUpperCase() + s.slice(1) : s;

  return (
    <div
      className="fixed right-0 top-0 h-full w-[min(920px,90vw)] bg-white shadow-2xl z-50 overflow-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="p-6 border-b border-slate-200 flex items-start justify-between gap-4">
        <div>
          <div className="inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-[11px] font-medium text-sky-900">
            {subject.name}
          </div>
          <h2 className="mt-2 text-lg font-semibold text-slate-900">
            {openSpec.questionTypeLabel} — {chapterTitle || "Chapter"}
          </h2>
          <p className="text-xs text-slate-500">
            Select questions and click{" "}
            <span className="font-medium">Add to paper</span>.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-xs text-slate-500 mr-2">
            {loading
              ? "Loading…"
              : `${questions.length} q • ${totalMarks} marks`}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 hover:bg-slate-100 cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {loading && (
          <p className="text-sm text-slate-500">Loading questions…</p>
        )}

        {!loading && error && (
          <p className="text-sm text-red-500">Failed to load: {error}</p>
        )}

        {!loading && !error && questions.length === 0 && (
          <p className="text-sm text-slate-500">
            No questions for this combination yet.
          </p>
        )}

        {!loading && !error && questions.length > 0 && (
          <>
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleAddSelectedToPaper}
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-3 py-1 text-sm font-medium text-white hover:opacity-95"
                >
                  Add to paper
                </button>
                <button
                  onClick={() => {
                    // toggle select all / none locally
                    const allIds = new Set(questions.map((q) => q.id));
                    const allSelected = questions.every((q) =>
                      localSelectedIds.has(q.id)
                    );
                    if (allSelected) {
                      // clear local selected and remove these from global
                      setLocalSelectedIds(new Set());
                      setSelectedGlobal((g) =>
                        g.filter((p) => !allIds.has(p.id))
                      );
                    } else {
                      setLocalSelectedIds(allIds);
                      // add all to global
                      setSelectedGlobal((g) => {
                        const map = new Map(g.map((p) => [p.id, p]));
                        for (const q of questions)
                          if (!map.has(q.id)) map.set(q.id, q);
                        return Array.from(map.values());
                      });
                    }
                  }}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-sm text-slate-700 hover:bg-slate-50"
                >
                  Toggle select all
                </button>
              </div>

              <div className="text-xs text-slate-500">
                Selected in paper:{" "}
                <span className="font-medium">{selectedGlobal.length}</span>
              </div>
            </div>

            <div className="space-y-3">
              {questions.map((q, idx) => {
                const checked = isExamMode
                  ? Object.values(sectionedSelected)
                      .flat()
                      .some((x) => x.id === q.id)
                  : localSelectedIds.has(q.id);

                const disabled = isExamMode && !checked && isSectionFull(q);

                return (
                  <div
                    key={q.id}
                    className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700 flex items-start gap-3"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      disabled={disabled}
                      onChange={() => toggleSelect(q)}
                      className="mt-1"
                      aria-label={`Select question ${idx + 1}`}
                    />

                    <div className="flex-1">
                      <p className="font-medium">
                        Q{idx + 1}. {q.text}
                      </p>
                      <p className="mt-1 text-[12px] text-slate-500">
                        Type: <span className="font-medium">{q.type}</span> •
                        Marks: <span className="font-medium">{q.marks}</span> •
                        Difficulty:{" "}
                        <span className="font-medium">
                          {capitalize(String(q.difficulty))}
                        </span>
                      </p>

                      {q.options && q.options.length > 0 && (
                        <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
                          {q.options.map((opt, i) => (
                            <li key={i}>{opt}</li>
                          ))}
                        </ul>
                      )}

                      {q.answer && (
                        <p className="mt-2 text-sm">
                          <strong>Answer:</strong> {q.answer}
                        </p>
                      )}

                      {q.explanation && (
                        <p className="mt-1 text-sm text-slate-500">
                          <strong>Explanation:</strong> {q.explanation}
                        </p>
                      )}
                    </div>
                    {isExamMode && isSectionFull(q) && !checked && (
                      <p className="text-[11px] text-red-500 mt-1">
                        Section full
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

/* ------------------ Paper Builder (UI + Drag & Drop) ------------------ */

import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

/* ---------- Sortable Item ---------- */

const SortableQuestionItem = ({
  q,
  index,
  onRemove,
}: {
  q: Question;
  index: number;
  onRemove: (id: string) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: q.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="rounded-xl border border-slate-200 bg-slate-50 p-3 flex gap-3 items-start"
    >
      {/* Drag handle */}
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab text-slate-400 hover:text-slate-700 pt-1"
        title="Drag to reorder"
      >
        <GripVertical className="w-4 h-4" />
      </button>

      {/* Content */}
      <div className="flex-1">
        <p className="text-sm font-medium text-slate-900">
          {index + 1}. {truncate(q.text, 70)}
        </p>
        <p className="text-xs text-slate-500 mt-0.5">
          {q.type} • {q.marks} marks
        </p>
      </div>

      {/* Remove */}
      <button
        onClick={() => onRemove(q.id)}
        className="cursor-pointer text-red-600"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};

const SortableExamQuestionItem = ({
  q,
  index,
}: {
  q: Question;
  index: number;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: q.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="rounded border bg-slate-50 p-2 flex gap-2 items-start text-xs"
    >
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab text-slate-400"
      >
        <GripVertical className="w-3 h-3" />
      </button>

      <div className="flex-1">
        {index + 1}. {truncate(q.text, 70)} ({q.marks})
      </div>
    </div>
  );
};

let examPatternTotalMarks = 0;

/* ---------- Main Builder ---------- */

import { Maximize2, Minimize2 } from "lucide-react";

const PaperBuilder: React.FC<{
  selected: Question[];
  removeFromPaper: (id: string) => void;
  clearPaper: () => void;
  setSelected: React.Dispatch<React.SetStateAction<Question[]>>;
  exportJSON: () => void;
  exportPrintable: () => void;
  schoolName: string;
  setSchoolName: (v: string) => void;
  paperMode: PaperMode;
  sectionedSelected: SectionedSelection;
  setSectionedSelected: React.Dispatch<
    React.SetStateAction<SectionedSelection>
  >;
  subject: Subject;
  setPaperMode: React.Dispatch<React.SetStateAction<PaperMode>>;
}> = ({
  selected,
  removeFromPaper,
  clearPaper,
  setSelected,
  exportJSON,
  exportPrintable,
  schoolName,
  setSchoolName,
  paperMode,
  sectionedSelected,
  subject,
  setSectionedSelected,
  setPaperMode,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const panelVariants: Variants = {
    hidden: {
      x: 420,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.25,
        ease: easeOut,
      },
    },
    exit: {
      x: 420,
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: easeIn,
      },
    },
  };

  const getTotalMarks = (selected: Question[]): number => {
    return selected.reduce((sum, q) => sum + (q.marks || 0), 0);
  };

  const totalMarks = getTotalMarks(selected);

  const examSectionTotalMarks = React.useMemo(() => {
    if (!subject) return 0;

    const examKey = subject.slug as ScienceSubjectKey;
    const pattern = EXAM_PATTERN_12_SCIENCE[examKey];

    if (!pattern?.sections) return 0;

    return pattern.sections.reduce((sum, sec) => {
      const selected = sectionedSelected[sec.key] ?? [];
      const count = Math.min(selected.length, sec.attemptAny);
      return sum + count * sec.marks;
    }, 0);
  }, [subject, sectionedSelected]);

  examPatternTotalMarks = examSectionTotalMarks;

  return (
    <>
      {isMinimized && (
        <>
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsMinimized(false)}
            className="fixed bottom-24 md:bottom-4 right-4 z-60 h-12 md:h-14 w-12 md:w-14 rounded-full bg-[#193625] shadow-xl flex items-center justify-center hover:bg-[#13261b] cursor-pointer"
            title="Open Paper Builder"
          >
            {selected.length > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-white text-[#193625] text-xs font-bold flex items-center justify-center">
                {selected.length}
              </span>
            )}
            <FileText className="w-6 h-6 text-white" />
          </motion.button>
        </>
      )}

      <AnimatePresence>
        {!isMinimized && (
          <motion.aside
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`fixed z-50 ${
              isFullscreen
                ? "inset-0 w-full h-full"
                : "right-2 bottom-24 md:bottom-2 max-w-[380px] max-h-[80vh]"
            }`}
          >
            {isFullscreen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/30 backdrop-blur-sm -z-10"
              />
            )}

            <motion.div
              animate={{
                borderRadius: isFullscreen ? 0 : 16,
              }}
              transition={{
                duration: 0.25,
                ease: "easeInOut",
              }}
              className={`bg-white shadow-2xl border border-slate-200 flex flex-col overflow-hidden ${
                isFullscreen ? "h-full" : ""
              }`}
            >
              {/* ---------------- HEADER ---------------- */}
              <div className="sticky top-0 z-10 bg-white border-slate-400 backdrop-blur border-b px-4 py-3">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 tracking-tight">
                      Paper Builder
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Organize & reorder selected questions
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Minimize to icon */}
                    <motion.button
                      whileTap={{ scale: 0.92 }}
                      onClick={() => {
                        setIsFullscreen(false);
                        setIsMinimized(true);
                      }}
                      className="rounded-lg border border-slate-400 bg-slate-50 p-1.5 hover:bg-slate-200/70 cursor-pointer"
                      title="Minimize"
                    >
                      <Minus className="w-4 h-4 text-slate-700" />
                    </motion.button>

                    {/* Fullscreen */}
                    <motion.button
                      whileTap={{ scale: 0.92 }}
                      onClick={() => setIsFullscreen((v) => !v)}
                      className="rounded-lg border border-slate-400 bg-slate-50 p-1.5 hover:bg-slate-200/70 cursor-pointer"
                      title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
                    >
                      {isFullscreen ? (
                        <Minimize2 className="w-4 h-4 text-slate-700" />
                      ) : (
                        <Maximize2 className="w-4 h-4 text-slate-700" />
                      )}
                    </motion.button>
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs pt-3">
                  <div className="inline-flex rounded-full bg-slate-200 p-1 text-xs font-medium cursor-pointer">
                    <button
                      onClick={() => setPaperMode("exam")}
                      className={`px-3 py-1 rounded-full cursor-pointer ${
                        paperMode === "exam" ? "bg-white shadow" : ""
                      }`}
                    >
                      Exam Pattern
                    </button>

                    <button
                      onClick={() => setPaperMode("custom")}
                      className={`px-3 py-1 rounded-full cursor-pointer ${
                        paperMode === "custom" ? "bg-white shadow" : ""
                      }`}
                    >
                      Custom
                    </button>
                  </div>

                  <span className="inline-flex items-center rounded-full border border-emerald-300 bg-emerald-50 px-3.5 py-1 text-xs font-semibold text-emerald-800">
                    {paperMode === "exam"
                      ? `${examSectionTotalMarks} Marks`
                      : `${totalMarks} Marks`}
                  </span>
                </div>
              </div>

              {/* ---------------- META ---------------- */}
              {/* <div className="px-4 py-3 border-b border-slate-400 space-y-2 bg-white">
            <input
              type="text"
              placeholder="School / College name"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              className="w-full rounded-lg border border-slate-400 px-3 py-1.5 text-sm focus:ring-2 focus:ring-emerald-500"
            />

            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500">
                {paperMode === "exam" ? "Exam mode" : "Custom mode"}
              </span>

              <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 font-semibold text-emerald-700">
                {paperMode === "exam"
                  ? `${examSectionTotalMarks} Marks`
                  : `${totalMarks} Marks`}
              </span>
            </div>
          </div> */}

              {/* ---------------- LIST ---------------- */}
              <motion.div
                layout
                className={`px-3 py-4 space-y-4 overflow-y-auto bg-slate-50 ${
                  isFullscreen ? "flex-1" : "max-h-[40vh]"
                } scrollbar-thin scrollbar-thumb-slate-300`}
              >
                {paperMode === "custom" ? (
                  <DndContext
                    collisionDetection={closestCenter}
                    onDragEnd={(e) => {
                      if (!e.over || e.active.id === e.over.id) return;

                      setSelected((items) => {
                        const oldIndex = items.findIndex(
                          (i) => i.id === e.active.id
                        );
                        const newIndex = items.findIndex(
                          (i) => i.id === e.over!.id
                        );
                        return arrayMove(items, oldIndex, newIndex);
                      });
                    }}
                  >
                    <div className="text-xs font-semibold text-slate-600 text-right">
                      {selected.length} Questions
                    </div>
                    <SortableContext
                      items={selected.map((q) => q.id)}
                      strategy={verticalListSortingStrategy}
                    >
                      {selected.map((q, i) => (
                        <motion.div
                          key={q.id}
                          layout
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <SortableQuestionItem
                            q={q}
                            index={i}
                            onRemove={removeFromPaper}
                          />
                        </motion.div>
                      ))}
                    </SortableContext>
                  </DndContext>
                ) : (
                  Object.entries(
                    EXAM_PATTERN_12_SCIENCE[subject.slug as ScienceSubjectKey]
                      .sections
                  ).map(([_, sec]) => {
                    const qs = sectionedSelected[sec.key] || [];

                    return (
                      <motion.div
                        key={sec.key}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-xl border-2 border-slate-200 bg-white p-3 space-y-2"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm font-semibold text-slate-800">
                              {sec.title}
                            </p>
                            <p className="text-[11px] text-slate-500">
                              {sec.type}
                            </p>
                          </div>

                          <span className="text-xs font-semibold text-slate-600">
                            {qs.length} Q •{" "}
                            {qs.reduce((s, q) => s + q.marks, 0)} M
                          </span>
                        </div>

                        {qs.length === 0 ? (
                          <p className="text-xs text-slate-400 italic">
                            No questions added in this section
                          </p>
                        ) : (
                          qs.map((q, i) => (
                            <SortableQuestionItem
                              key={q.id}
                              q={q}
                              index={i}
                              onRemove={removeFromPaper}
                            />
                          ))
                        )}
                      </motion.div>
                    );
                  })
                )}
              </motion.div>

              {/* ---------------- FOOTER ---------------- */}
              <div className="border-t border-slate-400 bg-white px-4 py-3 flex justify-between items-center">
                <button
                  onClick={clearPaper}
                  className="text-xs font-medium text-red-600 hover:text-red-700 bg-transparent hover:bg-red-600/20 px-4 py-1.5 rounded-lg cursor-pointer"
                >
                  Clear all
                </button>

                <div className="flex gap-2">
                  {/* <button
                onClick={exportJSON}
                className="rounded-lg border-slate-400 border px-3 py-1.5 text-xs hover:bg-slate-50"
              >
                <Download className="w-3 h-3 inline mr-1" />
                JSON
              </button> */}

                  <button
                    onClick={exportPrintable}
                    className="rounded-lg bg-emerald-600 px-4 py-1.5 text-xs font-medium text-white hover:bg-emerald-700 cursor-pointer"
                  >
                    Preview / PDF
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

/* ------------------ Question Paper Preview ------------------ */

import { PDFViewer, PDFDownloadLink, BlobProvider } from "@react-pdf/renderer";
import { QuestionPaperPDF } from "@/components/QuestionPaperPDF";
import {
  EXAM_PATTERN_12_SCIENCE,
  ExamPattern,
  ExamSection,
} from "@/lib/examPattern";
import {
  AnimatePresence,
  easeIn,
  easeOut,
  motion,
  Variants,
} from "framer-motion";
import { SchoolNameDialog } from "@/components/SchoolNameDialog";
import LoaderWrapper from "@/components/PageLoader";
import { useLeaveGuard } from "@/hook/useLeaveGuard";

const PDFPreviewModal = ({
  open,
  onClose,
  schoolName,
  subject,
  selected,
  paperMode,
  sectionedSelected,
  boardParam,
  mediumSlug,
  classKey,
  firebaseUid,
  allowRoute,
}: any) => {
  if (!open) return null;

  const selectedForPDF =
    paperMode === "exam" ? Object.values(sectionedSelected).flat() : selected;

  const savePaperToDB = async () => {
    const payload = {
      userId: firebaseUid,
      meta: {
        board: boardParam,
        medium: mediumSlug,
        classKey,
        subjectSlug: subject.slug,
        subjectName: subject.name,
      },
      schoolName,
      paperMode,
      questions:
        paperMode === "exam"
          ? Object.values(sectionedSelected).flat()
          : selected,
      examSections: paperMode === "exam" ? sectionedSelected : null,
      totalMarks:
        paperMode === "exam"
          ? examPatternTotalMarks
          : selected.reduce((s: any, q: any) => s + q.marks, 0),
    };

    const res = await fetch("/api/question-papers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      alert("Failed to save paper");
      return;
    }

    const data = await res.json();
    alert("Paper saved successfully ✅");
  };

  return (
    <div className="fixed inset-0 z-100 bg-black/50 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white w-[92vw] h-[92vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* ---------------- HEADER ---------------- */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-400 bg-slate-50">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Question Paper Preview
            </h3>
            <p className="text-[11px] text-slate-500">
              Review before downloading the final PDF
            </p>
          </div>

          <div className="flex items-center gap-2">
            <PDFDownloadLink
              document={
                <QuestionPaperPDF
                  schoolName={schoolName}
                  subject={subject}
                  selected={selectedForPDF}
                  paperMode={paperMode}
                  examPatternTotalMarks={examPatternTotalMarks}
                />
              }
              fileName={`${subject.slug}-question-paper.pdf`}
            >
              {({ loading }) => (
                <button
                  className="rounded-lg bg-emerald-600 px-4 py-1.5 text-xs font-medium text-white hover:bg-emerald-700 disabled:opacity-60 cursor-pointer"
                  onClick={() => {
                    allowRoute(() => {
                      savePaperToDB(); // ✅ routing allowed
                    });
                  }}
                  disabled={loading}
                >
                  {loading ? "Preparing PDF…" : "Download PDF"}
                </button>
              )}
            </PDFDownloadLink>

            <button
              onClick={onClose}
              className="rounded-lg border border-slate-400 px-3 py-1.5 text-xs hover:bg-slate-100 cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>

        {/* ---------------- VIEWER ---------------- */}
        <div className="flex-1 bg-slate-100 p-3">
          <div className="h-full w-full rounded-xl overflow-hidden border border-slate-400 bg-white">
            <BlobProvider
              document={
                <QuestionPaperPDF
                  schoolName={schoolName}
                  subject={subject}
                  selected={selected}
                  paperMode={paperMode}
                  examPatternTotalMarks={examPatternTotalMarks}
                />
              }
            >
              {({ url, loading }) =>
                loading ? (
                  <div className="flex justify-center items-center h-[80vh]">
                    Generating preview…
                  </div>
                ) : (
                  <iframe
                    src={`${url}#toolbar=0&navpanes=0&scrollbar=0`}
                    className="w-full h-[80vh] rounded-xl border"
                  />
                )
              }
            </BlobProvider>
          </div>
        </div>

        {/* ---------------- FOOTER ---------------- */}
        <div className="border-t border-slate-400 px-4 py-2 text-[11px] text-slate-500 flex justify-between">
          <span>
            Subject: <span className="font-medium">{subject.name}</span>
          </span>
          <span>
            Total Marks:{" "}
            <span className="font-medium">{examPatternTotalMarks}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

/* ------------------ Helpers & utilities ------------------ */

const truncate = (s: string, n = 60) =>
  s.length > n ? s.slice(0, n - 1).trim() + "…" : s;

const escapeHtml = (unsafe: string) =>
  unsafe
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

/* ------------------ Utility / Helper components (copied) ------------------ */

const NotFoundBlock: React.FC<{
  title: string;
  message: string;
  href: string;
  cta: string;
}> = ({ title, message, href, cta }) => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
    <div className="max-w-md text-center space-y-4">
      <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
      <p className="text-sm text-slate-600">{message}</p>
      <Link
        href={href}
        className="inline-flex mt-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-slate-50 hover:bg-slate-800"
      >
        {cta}
      </Link>
    </div>
  </div>
);

const questionTypeToSlug = (label: string): string => {
  const shortMap: Record<string, string> = {
    mcq: "mcq",
    "very short answer": "very-short",
    "short answer": "short",
    "long answer": "long",
    "numerical problems": "numerical",
    "diagram based questions": "diagram",
    "give reason": "reason",
    "fill in the blanks": "fill",
    "activity based questions": "activity",
  };

  const key = label.toLowerCase();
  return shortMap[key] || label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
};

const getQuestionTypesForSubject = (
  subject: Subject,
  source: QuestionSource
): string[] => {
  const slug = subject.slug.toLowerCase();

  if (slug === "mathematics" || slug === "maths") {
    if (source === "balbharati") {
      return [
        "MCQ",
        "True or False",
        "Answer in short",
        "Solve the following",
        "Do as directed",
        "Word problems",
      ];
    }
    return [
      "1-mark MCQ",
      "1-mark Very short",
      "2-mark Short answer",
      "3-mark Solve the following",
      "4-mark Word problems",
    ];
  }

  if (slug === "biology") {
    if (source === "balbharati") {
      return [
        "MCQ",
        "Fill in the blanks",
        "Answer the followings",
        "Answer the followings in detail",
        "Match the following",
        "Complete the table",
        "Diagram based questions",
        "Short notes",
        "Label the diagram",
      ];
    }
    return [
      "1-mark MCQ",
      "1-mark Fill in the blanks",
      "2-mark Short notes",
      "3-mark Diagram based",
      "4-mark Long answer (Explain in detail)",
    ];
  }

  if (
    slug === "science" ||
    slug === "science-technology" ||
    slug === "physics" ||
    slug === "chemistry"
  ) {
    if (source === "balbharati") {
      return [
        "MCQ",
        "Very short answer",
        "Short answer",
        "Long answer",
        "Numerical problems",
        "Diagram based questions",
        "Give reason",
      ];
    }
    return [
      "1-mark MCQ",
      "1-mark Very short",
      "2-mark Short answer",
      "3-mark Numerical",
      "4-mark Long answer",
      "Case-study based questions",
    ];
  }

  if (
    slug.includes("english") ||
    slug.includes("marathi") ||
    slug.includes("hindi")
  ) {
    if (source === "balbharati") {
      return [
        "Reading comprehension",
        "Grammar (Do as directed)",
        "Answer in short",
        "Answer in detail",
        "Essay / Writing skills",
        "Letter / Application",
      ];
    }
    return [
      "Seen passage (Comprehension)",
      "Unseen passage (Comprehension)",
      "Grammar PYQ",
      "Long answer (Prose/Poetry)",
      "Writing skills PYQ (Essay / Letter)",
    ];
  }

  if (
    slug === "accountancy" ||
    slug === "accounts" ||
    slug === "economics" ||
    slug === "business-studies" ||
    slug === "organization-of-commerce-management"
  ) {
    if (source === "balbharati") {
      return [
        "MCQ",
        "Very short answer",
        "Short answer",
        "Long answer",
        "Practical problems (numericals)",
        "Case-study based questions",
      ];
    }
    return [
      "1-mark Objective",
      "2-mark Short theory",
      "3-mark Practical / Numerical",
      "4-mark Long theory",
      "Case-study PYQ",
    ];
  }

  if (source === "balbharati") {
    return [
      "MCQ",
      "Very short answer",
      "Short answer",
      "Long answer",
      "Application-based questions",
    ];
  }

  return [
    "1-mark Objective",
    "2-mark Short answer",
    "3-mark Long answer",
    "Case-study / Application PYQ",
  ];
};

const resolveBoardSlug = (abbreviation: string): BoardSlug | null => {
  const abbr = abbreviation.toLowerCase();
  if (abbr.includes("cbse")) return "cbse";
  if (abbr.includes("msbshse") || abbr.includes("maharashtra"))
    return "msbshse";
  if (abbr.includes("icse") || abbr.includes("cisce")) return "icse";
  return null;
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
  return `${stdLabel} — ${streamLabel}`;
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

/* ----------------------- Inline getChaptersFor (API) ----------------------- */

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

const prettifyType = (t?: string): string => {
  if (!t) return "";

  const map: Record<string, string> = {
    // MCQ
    mcq: "MCQ",
    "multiple choice": "MCQ",
    "multiple choice questions": "MCQ",

    // Very short
    "very short": "Very short answer",
    "very-short": "Very short answer",
    "very short answer": "Very short answer",
    "one mark": "Very short answer",

    // Short
    short: "Short answer",
    "short answer": "Short answer",
    "two mark": "Short answer",

    // Long
    long: "Long answer",
    "long answer": "Long answer",
    "four mark": "Long answer",

    // Numericals
    numerical: "Numerical problems",
    numericals: "Numerical problems",

    // Diagram
    diagram: "Diagram based questions",
    "diagram based": "Diagram based questions",

    // Reason
    "give reason": "Give reason",
    reasoning: "Give reason",

    // Biology specific
    "fill in the blanks": "Fill in the blanks",
    "match the following": "Match the following",
    "complete the table": "Complete the table",
    "short notes": "Short notes",
    "label the diagram": "Label the diagram",
  };

  const key = t.toLowerCase().trim();

  return (
    map[key] ||
    key.replace(/[_-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
  );
};
