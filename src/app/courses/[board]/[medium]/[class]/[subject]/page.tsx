/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
// src/app/courses/[board]/[medium]/[class]/[subject]/page.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { BOARDS } from "@/lib/boards";
import { MEDIUMS } from "@/lib/mediums";
import {
  getSubjectsFor,
  BoardSlug,
  MediumSlug,
  ClassKey,
} from "@/lib/subjects";
import Sidebar from "@/components/Sidebar";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../../../../../firebase";
import {
  EXAM_PATTERN_12_SCIENCE,
  ExamPattern,
  ExamSection,
} from "@/lib/examPattern";
import { SchoolNameDialog } from "@/components/course/SchoolNameDialog";
import LoaderWrapper from "@/components/PageLoader";
import { useLeaveGuard } from "@/hook/useLeaveGuard";
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
import { SubjectWorkspace } from "@/components/course/SubjectWorkspace";
import { SaveDraftDialog } from "@/components/course/SaveDraftDialog";
import { DraftNameDialog } from "@/components/course/DraftNameDialog";
import { QuestionTypePanel } from "@/components/course/QuestionTypePanel";
import { NotFoundBlock } from "@/components/course/NotFoundBlock";
import { PaperBuilder } from "@/components/course/PaperBuilder";
import { PDFPreviewModal } from "@/components/course/PDFPreviewModal";

/* ---------------------- Main Page Component ---------------------- */
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

const SubjectChaptersPage: React.FC = () => {
  const params = useParams();

  const boardParam = String(params?.board || "").toLowerCase();
  const mediumSegment = String(params?.medium || "");
  const classSegment = String(params?.class || "").toLowerCase();
  const subjectSegment = String(params?.subject || "").toLowerCase();

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

  let mediumSlug: string = mediumSegment.toLowerCase();
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

  const rawClassKey = classSegment.replace(/^class-/, "");
  const classKey = rawClassKey as ClassKey;

  const subjectsForCombo = getSubjectsFor(
    boardSlug,
    mediumSlugForSubjects,
    classKey,
  );

  const subject =
    subjectsForCombo.find(
      (s) => s.slug.toLowerCase() === subjectSegment.toLowerCase(),
    ) || null;

  if (!subject) {
    return (
      <NotFoundBlock
        title="Subject not found"
        message={`We couldn't find subject "${subjectSegment}" for ${board.abbreviation.toUpperCase()} - ${mediumLabel} - ${getClassLabel(
          classKey,
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
  // const [schoolName, setSchoolName] = useState("");
  const [paperMode, setPaperMode] = useState<PaperMode>("custom");
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserData>();
  const [openDraftNameDialog, setOpenDraftNameDialog] = useState(false);
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

  // persist selected to localStorage
  useEffect(() => {
    if (selected.length === 0) {
      localStorage.removeItem("paper:draft");
      return;
    }
    if (sectionedSelected && Object.keys(sectionedSelected).length === 0) {
      localStorage.removeItem("paper:draft");
      return;
    }

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

  // const questionTypes =
  //   questionTypesFromOpenChapter.length > 0 ? questionTypesFromOpenChapter : [];
  // : questionTypesFromData.length > 0
  // ? questionTypesFromData
  // : getQuestionTypesForSubject(subject, questionSource);

  const addQuestionsToPaper = (qs: Question[]) => {
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

  // -------- EXAM MODE --------
  const examKey = subject.slug.toLowerCase() as ScienceSubjectKey;
  const pattern = EXAM_PATTERN_12_SCIENCE[examKey];

  return (
    <div className="flex place-content-start items-start bg-slate-50 md:bg-white flex-row gap-2 h-min overflow-hidden py-2 px-2 pl-2 md:pl-[104px] relative min-h-screen w-auto font-poppins">
      <Sidebar />
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

      <LoaderWrapper isLoading={chaptersLoading}>
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
      )}

      {/* ----------------- Paper Builder Panel (Right dock) ----------------- */}
      <PaperBuilder
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
      />

      <SchoolNameDialog
        open={schoolDialogOpen}
        initialValue={{
          schoolName: "",
          className: getClassLabelforPaper(classKey),
          subjectName: subject?.name,
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
            subjectName: subject?.name || "",
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
          console.log("value", value);
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
    </div>
  );
};

export default SubjectChaptersPage;
