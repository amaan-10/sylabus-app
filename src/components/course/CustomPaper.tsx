// src/app/custom-paper/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { BOARDS } from "@/lib/boards";
import { MEDIUMS } from "@/lib/mediums";
import {
  getSubjectsFor,
  BoardSlug,
  MediumSlug,
  ClassKey,
} from "@/lib/subjects";
import {
  Chapter,
  getChaptersFor,
  getClassLabel,
  getClassLabelforPaper,
  PaperMode,
  prettifyType,
  Question,
  QuestionSource,
  questionTypeToSlug,
  resolveBoardSlug,
  ScienceSubjectKey,
  SectionedSelection,
  UserData,
} from "@/lib/utility/helper";
import { onAuthStateChanged } from "firebase/auth";
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
import { SchoolNameDialog } from "@/components/course/SchoolNameDialog";
import LoaderWrapper from "@/components/PageLoader";
import { useLeaveGuard } from "@/hook/useLeaveGuard";
import { auth } from "../../../firebase";
import { SaveDraftDialog } from "./SaveDraftDialog";
import { DraftNameDialog } from "./DraftNameDialog";
import { SubjectWorkspace } from "./SubjectWorkspace";
import { QuestionTypePanel } from "./QuestionTypePanel";
import { PaperBuilder } from "./PaperBuilder";
import { PDFPreviewModal } from "./PDFPreviewModal";
import { NotFoundBlock } from "./NotFoundBlock";

const ChapterSkeleton = () => (
  <div className="space-y-3">
    {Array.from({ length: 5 }).map((_, i) => (
      <div key={i} className="h-14 rounded-xl bg-slate-200 animate-pulse" />
    ))}
  </div>
);

const BOARD_MEDIUM_MAP = {
  CBSE: ["English", "Hindi"],
  MSBSHSE: ["English", "Semi-English", "Marathi"],
  ICSE: ["English"],
} as const;

const BOARD_CLASS_MAP = {
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
} as const;

type PaperSelection = {
  board: string | null;
  medium: string | null;
  classLevel: string | null;
  subject: string | null;
};

type DialogData = {
  schoolName: string;
  className: string;
  subjectName: string;
  testName: string;
  examDate: string;
  time: number;
  includeInstructions: boolean;
  logo?: string;
  watermark: string;
};

/* ---------------------- Main Page Component ---------------------- */
const CustomPaper: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const boardParam = searchParams.get("board");
  const mediumParam = searchParams.get("medium");
  const classParam = searchParams.get("class");
  const subjectParam = searchParams.get("subject");

  const isSelectionComplete =
    !!boardParam && !!mediumParam && !!classParam && !!subjectParam;

  // 🔒 Phase 1: Selection dialog ONLY
  if (!isSelectionComplete) {
    return (
      <SelectionGate
        boardParam={boardParam}
        mediumParam={mediumParam}
        classParam={classParam}
        subjectParam={subjectParam}
      />
    );
  }

  // 🔓 Phase 2: real app mounts ONLY after selection
  return (
    <CustomPaperBuilder
      boardParam={boardParam}
      mediumParam={mediumParam}
      classParam={classParam}
      subjectParam={subjectParam}
    />
  );
};

/* ---------------------- Custom Paper Builder Component ---------------------- */

type BuilderProps = {
  boardParam: string;
  mediumParam: string;
  classParam: string;
  subjectParam: string;
};

const CustomPaperBuilder: React.FC<BuilderProps> = ({
  boardParam,
  mediumParam,
  classParam,
  subjectParam,
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [selection, setSelection] = useState<PaperSelection>({
    board: boardParam,
    medium: mediumParam,
    classLevel: classParam,
    subject: subjectParam,
  });

  const updateSelection = (patch: Partial<PaperSelection>) =>
    setSelection((prev) => ({ ...prev, ...patch }));

  const [selectionOpen, setSelectionOpen] = useState(false);

  const [selectedBoard, setSelectedBoard] = useState<string | null>(
    boardParam || null,
  );
  const [selectedMedium, setSelectedMedium] = useState<string | null>(
    mediumParam || null,
  );
  const [selectedClass, setSelectedClass] = useState<string | null>(
    classParam || null,
  );
  const [selectedSubject, setSelectedSubject] = useState<string | null>(
    subjectParam || null,
  );

  // Chapters state
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [chaptersLoading, setChaptersLoading] = useState(true);
  const [chaptersError, setChaptersError] = useState<string | null>(null);
  const [openChapterId, setOpenChapterId] = useState<string | null>(null);
  const [questionSource, setQuestionSource] =
    useState<QuestionSource>("balbharati");
  const [previewOpen, setPreviewOpen] = useState(false);
  // const [schoolName, setSchoolName] = useState("");
  const [paperMode, setPaperMode] = useState<PaperMode>("custom");
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserData>();
  const [openDraftNameDialog, setOpenDraftNameDialog] = useState(false);
  const [draftName, setDraftName] = useState("");
  const [saving, setSaving] = useState(false);
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

  const [sectionedSelected, setSectionedSelected] =
    useState<SectionedSelection>({});

  const [schoolDialogOpen, setSchoolDialogOpen] = useState(false);

  // panel open state for question-type slide-over (same as before)
  const [openQuestionType, setOpenQuestionType] = useState<{
    questionTypeLabel: string;
    marks: number;
    questionTypeSlug: string;
    chapterSlug: string;
    chapterTitle?: string;
    chapterNumber?: number;
    source: QuestionSource;
  } | null>(null);

  const [examPatternTotalMarks, setExamPatternTotalMarks] = useState(0);

  const today = new Date().toISOString().split("T")[0];
  const [paperInfo, setPaperInfo] = useState<DialogData>({
    schoolName: "",
    className: "",
    subjectName: "",
    testName: "",
    examDate: today,
    includeInstructions: true,
    logo: "",
    watermark: "",
    time: 0,
  });

  const formattedBoard = selectedBoard?.toLowerCase() as BoardSlug;

  const formattedMedium = `${selectedMedium
    ?.toLowerCase()
    .replace(/\s+/g, "-")}` as MediumSlug;

  const formattedClassLevel = selectedClass
    ?.toLowerCase()
    .replace("th", "")
    .replace(" ", "-") as ClassKey;

  const subjects = React.useMemo(() => {
    if (!formattedBoard || !formattedMedium || !formattedClassLevel) return [];

    return getSubjectsFor(formattedBoard, formattedMedium, formattedClassLevel);
  }, [formattedBoard, formattedMedium, formattedClassLevel]);

  // ---------- Set Account Data ----------
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      // Firebase user exists but session may be gone
      if (!user) {
        setUserData(undefined);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("/api/account/me");

        // Session expired or logged out
        if (res.status === 401) {
          await auth.signOut(); // force cleanup
          setUserData(undefined);
          return;
        }

        const data = await res.json();

        setUserData({
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

  const shouldBlock = previewOpen ? false : selected.length > 0;

  const {
    showDialog: showLeaveDialog,
    confirmLeave,
    cancelLeave,
    allowRoute,
  } = useLeaveGuard(shouldBlock);

  const applySelection = () => {
    if (!selectedBoard || !selectedMedium || !selectedClass || !selectedSubject)
      return;

    const formattedMediumParam = `${formattedMedium}-medium`;

    const params = new URLSearchParams({
      board: formattedBoard,
      medium: formattedMediumParam,
      class: formattedClassLevel,
      subject: selectedSubject,
    });

    router.replace(`/custom-paper?${params.toString()}`);
    setSelectionOpen(false);
  };

  useEffect(() => {
    if (!boardParam || !mediumParam || !classParam || !subjectParam) {
      setSelectionOpen(true);
    }
  }, [boardParam, mediumParam, classParam, subjectParam]);

  const board = BOARDS.find((b) =>
    b.abbreviation.toLowerCase().includes(boardParam),
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

  let mediumSlug: string = mediumParam.toLowerCase();
  mediumSlug = mediumSlug.replace(/-?medium$/, "").replace(/[^a-z-]/g, "");
  const medium =
    MEDIUMS.find(
      (m) =>
        m.slug === mediumSlug &&
        m.used_in_boards.some(
          (abbr) => abbr.toLowerCase() === board.abbreviation.toLowerCase(),
        ),
    ) || null;

  const mediumSlugForSubjects = (mediumSlug || "english") as MediumSlug;
  const mediumLabel = medium?.medium_name || "All Mediums";

  const rawClassKey = classParam.replace(/^class-/, "");
  const classKey = rawClassKey as ClassKey;

  const subjectsForCombo = getSubjectsFor(
    boardSlug,
    mediumSlugForSubjects,
    classKey,
  );

  const subject =
    subjectsForCombo.find(
      (s) => s.slug.toLowerCase() === subjectParam.toLowerCase(),
    ) || null;

  if (!subject) {
    return (
      <NotFoundBlock
        title="Subject not found"
        message={`We couldn't find subject "${subjectParam}" for ${board.abbreviation.toUpperCase()} - ${mediumLabel} - ${getClassLabel(
          classKey,
        )}.`}
        href={`/courses/${boardParam}/${mediumParam}`}
        cta="Back to courses"
      />
    );
  }

  const saveDraftToDB = async (draftName: string) => {
    const raw = localStorage.getItem("paper:draft");
    if (!raw || !userData?.firebaseUid) return;

    await fetch("/api/paper-drafts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: userData.firebaseUid,
        draftName,
        draft: JSON.parse(raw),
      }),
    });

    localStorage.removeItem("paper:draft");
  };

  const discardDraft = () => {
    localStorage.removeItem("paper:draft");
  };

  // ---------- Paper Builder state (selected questions) ----------
  // Store selection as array of question objects (unique by id)

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

  // persist selected to localStorage
  useEffect(() => {
    if (selected.length === 0) return;

    const draft = {
      boardSlug: boardSlug,
      mediumSlug: mediumSlugForSubjects,
      classKey: classKey,
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
    pattern?: ExamPattern,
  ): ExamSection | undefined => {
    if (!pattern || !Array.isArray(pattern.sections)) {
      return undefined;
    }

    return pattern.sections.find(
      (sec) =>
        prettifyType(q.examSectionType) === sec.type && q.marks === sec.marks,
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
          subjectSlug,
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

  const examQuestionTypes = React.useMemo(() => {
    if (paperMode !== "exam" || !openChapterId) return [];

    const chapter = chapters.find((c) => c.id === openChapterId);
    if (!chapter || !chapter.questions) return [];

    const map = new Map<
      string,
      {
        key: string;
        label: string;
        marks: number;
        sectionTitle?: string;
      }
    >();

    for (const q of chapter.questions) {
      if (q.source !== questionSource) continue;
      if (!q.examSectionType || typeof q.marks !== "number") continue;

      const key = `${q.examSectionType}-${q.marks}`;

      if (!map.has(key)) {
        map.set(key, {
          key,
          label: q.examSectionType,
          marks: q.marks,
          sectionTitle: q.examSectionType,
        });
      }
    }

    return Array.from(map.values());
  }, [paperMode, chapters, openChapterId, questionSource]);

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

    const map = new Map<string, { label: string; marks: number }>();

    for (const q of chapter.questions) {
      if (q.source && q.source !== questionSource) continue;

      const label = prettifyType(q.type || "").trim();
      if (!label || typeof q.marks !== "number") continue;

      const key = `${label}-${q.marks}`;

      if (!map.has(key)) {
        map.set(key, { label, marks: q.marks });
      }
    }

    return Array.from(map.entries()).map(([key, value]) => ({
      key,
      label: value.label,
      marks: value.marks,
    }));
  }, [chapters, openChapterId, questionSource]);

  const questionTypes =
    paperMode === "exam"
      ? [...examQuestionTypes].sort((a, b) => a.marks - b.marks)
      : [...questionTypesFromOpenChapter].sort((a, b) => a.marks - b.marks);

  const addQuestionsToPaper = (qs: Question[]) => {
    if (paperMode === "custom") {
      setSelected((prev) => {
        const map = new Map(prev.map((p) => [p.id, p]));
        qs.forEach((q) => map.set(q.id, q));
        return Array.from(map.values());
      });
      return;
    }
  };

  const removeFromPaper = (id: string) => {
    setSelected((prev) => prev.filter((p) => p.id !== id));
    setSectionedSelected((prev) => {
      const next: SectionedSelection = {};
      for (const secKey in prev) {
        next[secKey] = prev[secKey].filter((q) => q.id !== id);
      }
      return next;
    });
  };

  const clearPaper = () => {
    if (!confirm("Clear all selected questions?")) return;
    setSelected([]);
    setSectionedSelected({});
    localStorage.removeItem("paper:draft");
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
      2,
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
    marks: number,
    chapterSlug: string,
    chapterTitle?: string,
    chapterNumber?: number,
  ) => {
    setOpenQuestionType({
      questionTypeLabel: label,
      marks,
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

  // -------- EXAM MODE --------
  const examKey = subject.slug.toLowerCase() as ScienceSubjectKey;
  const pattern = EXAM_PATTERN_12_SCIENCE[examKey];

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
      href: `/courses/${boardParam}/${mediumParam}`,
    },
    {
      label: getClassLabel(classKey),
      href: `/courses/${boardParam}/${mediumParam}/${classParam}`,
    },
    {
      label: subject.name,
      href: `/courses/${boardParam}/${mediumParam}/${classParam}/${subject.slug}`,
      active: true,
    },
  ];

  return (
    <>
      {selectionOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-[420px] space-y-4">
            {/* Board */}
            <select
              value={selectedBoard ?? ""}
              onChange={(e) => {
                setSelectedBoard(e.target.value);
                setSelectedMedium(null);
                setSelectedClass(null);
                setSelectedSubject(null);
              }}
            >
              <option value="">Select Board</option>
              {Object.keys(BOARD_MEDIUM_MAP).map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>

            {/* Medium */}
            {selectedBoard && (
              <select
                value={selectedMedium ?? ""}
                onChange={(e) => setSelectedMedium(e.target.value)}
              >
                <option value="">Select Medium</option>
                {BOARD_MEDIUM_MAP[
                  selectedBoard as keyof typeof BOARD_MEDIUM_MAP
                ].map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>
            )}

            {/* Class */}
            {selectedBoard && (
              <select
                value={selectedClass ?? ""}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                <option value="">Select Class</option>
                {BOARD_CLASS_MAP[
                  selectedBoard as keyof typeof BOARD_CLASS_MAP
                ].map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            )}

            {/* Subject */}
            {subjects.length > 0 && (
              <select
                value={selectedSubject ?? ""}
                onChange={(e) => setSelectedSubject(e.target.value)}
              >
                <option value="">Select Subject</option>
                {subjects.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.name}
                  </option>
                ))}
              </select>
            )}

            <button
              onClick={applySelection}
              className="w-full bg-emerald-600 text-white py-2 rounded-lg"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {showLeaveDialog && (
        <SaveDraftDialog
          confirmLeave={confirmLeave}
          setOpenDraftNameDialog={setOpenDraftNameDialog}
        />
      )}
      {openDraftNameDialog && (
        <DraftNameDialog
          confirmLeave={confirmLeave}
          setOpenDraftNameDialog={setOpenDraftNameDialog}
          draftName={draftName}
          setDraftName={setDraftName}
          saving={saving}
          setSaving={setSaving}
          saveDraftToDB={saveDraftToDB}
        />
      )}

      {/* <LoaderWrapper isLoading={chaptersLoading}>
        <SubjectWorkspace
          items={items}
          board={board}
          classKey={classKey}
          mediumLabel={mediumLabel}
          subject={subject}
          questionSource={questionSource}
          setQuestionSource={setQuestionSource}
          chapters={chapters}
          openChapterId={openChapterId}
          chaptersLoading={chaptersLoading}
          handleToggleChapter={handleToggleChapter}
          questionTypes={questionTypes}
          handleOpenQuestionType={handleOpenQuestionType}
        />
      </LoaderWrapper> */}

      {/* ----------------- Slide-over QuestionTypePanel ----------------- */}
      {/* {openQuestionType && (
        <QuestionTypePanel
          boardSlug={boardSlug}
          mediumSlug={mediumSlugForSubjects}
          classKey={classKey}
          subject={subject}
          paperMode={paperMode}
          sectionedSelected={sectionedSelected}
          chapters={chapters}
          openSpec={openQuestionType}
          onClose={() => setOpenQuestionType(null)}
          onAddToPaper={(qs) => addQuestionsToPaper(qs)}
          selectedIds={new Set(selected.map((s) => s.id))}
          selectedGlobal={selected}
          setSelectedGlobal={setSelected}
          setSectionedSelected={setSectionedSelected}
          questionTypes={questionTypes}
        />
      )} */}

      {/* ----------------- Paper Builder Panel (Right dock) ----------------- */}
      {/* <PaperBuilder
        selected={selected}
        setSelected={setSelected}
        removeFromPaper={removeFromPaper}
        clearPaper={clearPaper}
        exportPrintable={exportPrintable}
        exportJSON={exportJSON}
        paperMode={paperMode}
        sectionedSelected={sectionedSelected}
        setSectionedSelected={setSectionedSelected}
        subject={subject}
        setPaperMode={setPaperMode}
        handleOpenQuestionType={handleOpenQuestionType}
        chapters={chapters}
        setExamPatternTotalMarks={setExamPatternTotalMarks}
        board={boardSlug}
      /> */}

      <SchoolNameDialog
        open={schoolDialogOpen}
        initialValue={{
          schoolName: "",
          className: getClassLabelforPaper(classKey),
          subjectName: subject.name,
          testName: "",
          examDate: today,
          time: pattern.time,
          includeInstructions: true,
          logo: "",
          watermark: "",
        }}
        onClose={() => setSchoolDialogOpen(false)}
        continueWithoutInfo={() => {
          setPaperInfo({
            schoolName: "",
            className: getClassLabelforPaper(classKey),
            subjectName: subject.name,
            testName: "",
            examDate: today,
            time: pattern.time,
            includeInstructions: true,
            logo: "",
            watermark: "",
          });
          setSchoolDialogOpen(false);
          setPreviewOpen(true);
        }}
        onSave={(value) => {
          setPaperInfo(value);
          setSchoolDialogOpen(false);
          setPreviewOpen(true);
        }}
      />

      {previewOpen && (
        <PDFPreviewModal
          open={previewOpen}
          onClose={() => setPreviewOpen(false)}
          paperInfo={paperInfo}
          subject={subject}
          selected={selected}
          paperMode={paperMode}
          sectionedSelected={sectionedSelected}
          boardParam={boardParam}
          mediumSlug={mediumSlug}
          classKey={classKey}
          firebaseUid={userData?.firebaseUid}
          allowRoute={allowRoute}
          examPatternTotalMarks={examPatternTotalMarks}
        />
      )}
    </>
  );
};

/* ---------------------- Selection Gate Component ---------------------- */

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const dialogVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.25, ease: easeOut },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: { duration: 0.2, ease: easeIn },
  },
};

const stepVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: easeOut },
  },
};

const SelectionGate = ({
  boardParam,
  mediumParam,
  classParam,
  subjectParam,
}: {
  boardParam: string | null;
  mediumParam: string | null;
  classParam: string | null;
  subjectParam: string | null;
}) => {
  const router = useRouter();

  // ---------------- State ----------------
  const [selectionOpen, setSelectionOpen] = useState(true);

  const [selectedBoard, setSelectedBoard] = useState<string | null>(
    boardParam ?? null,
  );
  const [selectedMedium, setSelectedMedium] = useState<string | null>(
    mediumParam ?? null,
  );
  const [selectedClass, setSelectedClass] = useState<string | null>(
    classParam ?? null,
  );
  const [selectedSubject, setSelectedSubject] = useState<string | null>(
    subjectParam ?? null,
  );

  // ---------------- Derived ----------------
  const formattedBoard = selectedBoard?.toLowerCase() as BoardSlug;

  const formattedMedium = selectedMedium
    ? (`${selectedMedium.toLowerCase().replace(/\s+/g, "-")}` as MediumSlug)
    : null;

  const formattedClassLevel = selectedClass
    ? (selectedClass
        .toLowerCase()
        .replace("th", "")
        .replace(" ", "-") as ClassKey)
    : null;

  const subjects = React.useMemo(() => {
    if (!formattedBoard || !formattedMedium || !formattedClassLevel) return [];
    return getSubjectsFor(formattedBoard, formattedMedium, formattedClassLevel);
  }, [formattedBoard, formattedMedium, formattedClassLevel]);

  // ---------------- Actions ----------------
  const applySelection = () => {
    if (
      !formattedBoard ||
      !formattedMedium ||
      !formattedClassLevel ||
      !selectedSubject
    )
      return;

    const params = new URLSearchParams({
      board: formattedBoard,
      medium: `${formattedMedium}-medium`,
      class: formattedClassLevel,
      subject: selectedSubject,
    });

    router.replace(`/custom-paper?${params.toString()}`);
    setSelectionOpen(false);
  };

  // ---------------- UI ----------------
  return (
    <>
      <div className="min-h-screen bg-slate-50" />

      <AnimatePresence>
        {selectionOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-5"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className="w-full max-w-[440px] rounded-2xl bg-white shadow-2xl overflow-hidden"
              variants={dialogVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* ---------- Header ---------- */}
              <div className="px-6 py-4 border-b border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900">
                  Start building your paper
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  Choose details step by step
                </p>

                {/* Progress */}
                <div className="flex gap-2 mt-4">
                  {[
                    selectedBoard,
                    selectedMedium,
                    selectedClass,
                    selectedSubject,
                  ].map((v, i) => (
                    <motion.div
                      key={i}
                      layout
                      className={`h-1 flex-1 rounded-full ${
                        v ? "bg-emerald-500" : "bg-slate-200"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* ---------- Body ---------- */}
              <div className="px-6 py-6 space-y-6">
                <AnimatePresence mode="wait">
                  {!selectedBoard && (
                    <motion.div
                      key="board"
                      variants={stepVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                    >
                      <StepBlock title="Select Board">
                        {Object.keys(BOARD_MEDIUM_MAP).map((b) => (
                          <motion.div key={b} whileTap={{ scale: 0.97 }}>
                            <StepOption
                              label={b}
                              onClick={() => {
                                setSelectedBoard(b);
                                setSelectedMedium(null);
                                setSelectedClass(null);
                                setSelectedSubject(null);
                              }}
                            />
                          </motion.div>
                        ))}
                      </StepBlock>
                    </motion.div>
                  )}

                  {selectedBoard && !selectedMedium && (
                    <motion.div
                      key="medium"
                      variants={stepVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                    >
                      <StepBlock title="Select Medium">
                        {BOARD_MEDIUM_MAP[
                          selectedBoard as keyof typeof BOARD_MEDIUM_MAP
                        ].map((m) => (
                          <motion.div key={m} whileTap={{ scale: 0.97 }}>
                            <StepOption
                              label={m}
                              onClick={() => setSelectedMedium(m)}
                            />
                          </motion.div>
                        ))}
                      </StepBlock>
                    </motion.div>
                  )}

                  {selectedMedium && !selectedClass && (
                    <motion.div
                      key="class"
                      variants={stepVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                    >
                      <StepBlock title="Select Class">
                        <div className="relative">
                          <select
                            value={selectedClass ?? ""}
                            onChange={(e) => setSelectedClass(e.target.value)}
                            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 pr-10 text-sm cursor-pointer appearance-none focus:ring-2 focus:ring-emerald-500"
                          >
                            <option value="">Choose Class Level</option>
                            {BOARD_CLASS_MAP[
                              selectedBoard as keyof typeof BOARD_CLASS_MAP
                            ].map((c) => (
                              <option key={c}>{c}</option>
                            ))}
                          </select>

                          <svg
                            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 9l6 6 6-6"
                            />
                          </svg>
                        </div>
                      </StepBlock>
                    </motion.div>
                  )}

                  {selectedClass && !selectedSubject && subjects.length > 0 && (
                    <motion.div
                      key="subject"
                      variants={stepVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                    >
                      <StepBlock title="Select Subject">
                        <div className="relative">
                          <select
                            value={selectedSubject ?? ""}
                            onChange={(e) => setSelectedSubject(e.target.value)}
                            className="
      w-full rounded-xl border border-slate-300 bg-white
      px-4 py-2.5 pr-10 text-sm cursor-pointer
      appearance-none
      focus:outline-none focus:ring-2 focus:ring-emerald-500
    "
                          >
                            <option value="">Choose subject</option>
                            {subjects.map((s) => (
                              <option key={s.slug} value={s.slug}>
                                {s.name}
                              </option>
                            ))}
                          </select>

                          {/* Custom arrow */}
                          <svg
                            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 9l6 6 6-6"
                            />
                          </svg>
                        </div>
                      </StepBlock>
                    </motion.div>
                  )}

                  {selectedSubject && (
                    <motion.div
                      key="confirm"
                      variants={stepVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="space-y-4"
                    >
                      <StepBlock title="Review Selection">
                        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Board</span>
                            <span className="font-medium text-slate-800">
                              {selectedBoard}
                            </span>
                          </div>

                          <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Medium</span>
                            <span className="font-medium text-slate-800">
                              {selectedMedium}
                            </span>
                          </div>

                          <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Class</span>
                            <span className="font-medium text-slate-800">
                              {selectedClass}
                            </span>
                          </div>

                          <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Subject</span>
                            <span className="font-semibold text-emerald-700">
                              {
                                subjects.find((s) => s.slug === selectedSubject)
                                  ?.name
                              }
                            </span>
                          </div>
                        </div>
                      </StepBlock>

                      {/* CTA */}
                      <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={applySelection}
                        className="w-full rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white hover:bg-emerald-700 transition cursor-pointer"
                      >
                        Start building paper →
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* ---------- Footer ---------- */}
              <div className="px-6 py-4 border-t border-slate-200 flex justify-between">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedBoard(null);
                    setSelectedMedium(null);
                    setSelectedClass(null);
                    setSelectedSubject(null);
                  }}
                  className="text-sm text-slate-500 cursor-pointer"
                >
                  Reset
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const StepBlock = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div>
    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-3">
      {title}
    </p>
    <div className="grid grid-cols-1 gap-2">{children}</div>
  </div>
);

const StepOption = ({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="w-full text-left rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-800 hover:border-emerald-400 hover:bg-emerald-50 transition cursor-pointer"
  >
    {label}
  </button>
);

export default CustomPaper;
