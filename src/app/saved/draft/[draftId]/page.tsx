"use client";

import Sidebar from "@/components/Sidebar";
import React, { useEffect, useState } from "react";
import LoaderWrapper from "@/components/PageLoader";
import {
  ChevronRight,
  FileText,
  GripVertical,
  Home,
  Maximize2,
  Minimize2,
  Minus,
  Trash2,
  X,
} from "lucide-react";
import {
  BoardSlug,
  ClassKey,
  getSubjectsFor,
  MediumSlug,
  Subject,
} from "@/lib/subjects";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../../../firebase";
import { useParams } from "next/navigation";
import { BOARDS } from "@/lib/boards";
import { MEDIUMS } from "@/lib/mediums";
import { EXAM_PATTERN_12_SCIENCE, ScienceSubjectKey } from "@/lib/examPattern";
import {
  easeIn,
  easeOut,
  Variants,
  motion,
  AnimatePresence,
} from "framer-motion";
import { closestCenter, DndContext } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { SchoolNameDialog } from "@/components/course/SchoolNameDialog";
import { BlobProvider, PDFDownloadLink } from "@react-pdf/renderer";
import { QuestionPaperPDF } from "@/components/course/QuestionPaperPDF";
import { useLeaveGuard } from "@/hook/useLeaveGuard";
import {
  Chapter,
  getChaptersFor,
  PaperMode,
  prettifyType,
  Question,
  QuestionSource,
  questionTypeToSlug,
  SectionedSelection,
  UserData,
} from "@/lib/utility/helper";
import { SaveDraftDialog } from "@/components/course/SaveDraftDialog";
import { DraftNameDialog } from "@/components/course/DraftNameDialog";
import { SubjectWorkspace } from "@/components/course/SubjectWorkspace";
import { QuestionTypePanel } from "@/components/course/QuestionTypePanel";
import { PaperBuilder } from "@/components/course/PaperBuilder";
import { PDFPreviewModal } from "@/components/course/PDFPreviewModal";

type SavedPaperDrafts = {
  _id: string;
  userId: string;
  draftName: string;
  boardSlug: BoardSlug;
  classKey: ClassKey;
  mediumSlug: MediumSlug;
  subjectSlug: string;
  paperMode: string;
  draft: {
    selected: any[];
    sectionedSelected: Record<string, any>;
  };
  lastUpdated: string;
  createdAt: string;
  updatedAt: string;
};

const SavedPage = () => {
  const params = useParams();

  const draftId = String(params?.draftId || "").toLowerCase();
  const [userData, setUserData] = useState<UserData>();
  const [savedPaperDraft, setSavedPaperDraft] =
    useState<SavedPaperDrafts | null>(null);

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
  const [openDraftNameDialog, setOpenDraftNameDialog] = useState(false);
  const [draftName, setDraftName] = useState("");
  const [saving, setSaving] = useState(false);
  const [openQuestionType, setOpenQuestionType] = useState<{
    questionTypeLabel: string;
    marks: number;
    questionTypeSlug: string;
    chapterSlug: string;
    chapterTitle?: string;
    chapterNumber?: number;
    source: QuestionSource;
  } | null>(null);
  const [sectionedSelected, setSectionedSelected] =
    useState<SectionedSelection>({});
  const [selected, setSelected] = useState<Question[]>([]);

  const [schoolDialogOpen, setSchoolDialogOpen] = useState(false);

  const [examPatternTotalMarks, setExamPatternTotalMarks] = useState(0);

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

  useEffect(() => {
    if (!userData?.firebaseUid) {
      setLoading(false);
      return;
    }
    const loadSaved = async () => {
      try {
        const res = await fetch(
          `/api/paper-drafts?userId=${userData.firebaseUid}&draftId=${draftId}`
        );

        const data = await res.json();
        setSavedPaperDraft(data.draft);
        setSelected(
          data.draft?.draft?.selected
            ? (data.draft.draft.selected as Question[])
            : []
        );
        setDraftName(data.draft?.draftName || "");

        if (data.draft?.paperMode === "exam") {
          setPaperMode("exam");
          setSectionedSelected(data.draft?.draft?.sectionedSelected || {});
        }
        // setSavedPaperDraftsIds(data.drafts.map((s: any) => s._id));
      } catch (err) {
        console.error("Failed to load saved subjects", err);
      } finally {
        setLoading(false);
      }
    };

    loadSaved();
  }, [userData?.firebaseUid]);

  useEffect(() => {
    if (!savedPaperDraft) return;

    const draft = savedPaperDraft; // ✅ snapshot (now non-null)

    let cancelled = false;

    async function loadChapters() {
      try {
        setChaptersLoading(true);
        setChaptersError(null);

        const data = await getChaptersFor(
          draft.boardSlug,
          draft.mediumSlug,
          draft.classKey,
          draft.subjectSlug
        );

        if (!cancelled) {
          setChapters(data);
          setOpenChapterId(data[0]?.id ?? null);
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
  }, [savedPaperDraft]);

  const handleOpenQuestionType = (
    label: string,
    marks: number,
    chapterSlug: string,
    chapterTitle?: string,
    chapterNumber?: number
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

  const subjectsForCombo = savedPaperDraft
    ? getSubjectsFor(
        savedPaperDraft.boardSlug,
        savedPaperDraft.mediumSlug,
        savedPaperDraft.classKey
      )
    : [];

  const subject =
    subjectsForCombo.find(
      (s) => s.slug.toLowerCase() === savedPaperDraft?.subjectSlug.toLowerCase()
    ) || null;

  const board = savedPaperDraft
    ? BOARDS.find((b) =>
        b.abbreviation
          .toLowerCase()
          .includes(savedPaperDraft.boardSlug.toLowerCase())
      )
    : undefined;

  const medium =
    MEDIUMS.find(
      (m) =>
        m.slug === savedPaperDraft?.mediumSlug &&
        m.used_in_boards.some(
          (abbr) => abbr.toLowerCase() === board?.abbreviation.toLowerCase()
        )
    ) || null;

  const mediumLabel = medium?.medium_name || "All Mediums";

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
    const examKey = subject?.slug.toLowerCase() as ScienceSubjectKey;
    const pattern = EXAM_PATTERN_12_SCIENCE[examKey];
  };

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
  //   questionTypesFromOpenChapter.length > 0
  //     ? questionTypesFromOpenChapter
  //     : questionTypesFromData.length > 0
  //     ? questionTypesFromData
  //     : subject
  //     ? getQuestionTypesForSubject(subject.slug, questionSource)
  //     : [];

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

  // export selected to JSON file
  const exportJSON = () => {
    const data = JSON.stringify(
      {
        meta: {
          board: savedPaperDraft?.boardSlug,
          medium: savedPaperDraft?.mediumSlug,
          classKey: savedPaperDraft?.classKey,
        },
        selected,
      },
      null,
      2
    );
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${subject?.slug}-paper-selection.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // export printable HTML (new window)

  const exportPrintable = () => {
    setSchoolDialogOpen(true);
    // setPreviewOpen(true);
  };

  useEffect(() => {
    if (savedPaperDraft && subject && selected.length === 0) return;

    const draft = {
      boardSlug: savedPaperDraft?.boardSlug,
      mediumSlug: savedPaperDraft?.mediumSlug,
      classKey: savedPaperDraft?.classKey,
      subjectSlug: subject?.slug,
      paperMode,
      selected,
      sectionedSelected,
      lastUpdated: Date.now(),
    };

    localStorage.setItem("paper:draft", JSON.stringify(draft));
  }, [selected, sectionedSelected, paperMode]);

  const shouldBlock = previewOpen ? false : selected.length > 0;

  const {
    showDialog: showLeaveDialog,
    confirmLeave,
    cancelLeave,
    allowRoute,
  } = useLeaveGuard(shouldBlock);

  const saveDraftToDB = async (
    draftName: string,
    userId: string,
    draftId: string
  ) => {
    const raw = localStorage.getItem("paper:draft");
    if (!raw || !userId || !draftId) return;
    await fetch("/api/paper-drafts", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        draftId,
        draftName,
        draft: JSON.parse(raw),
      }),
    });

    localStorage.removeItem("paper:draft");
  };

  return (
    <div className="flex place-content-start items-start bg-white flex-row gap-2 h-min overflow-hidden py-2 px-2 pl-2 md:pl-[104px] relative min-h-screen w-auto font-poppins">
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
          draftName={savedPaperDraft?.draftName}
          board={board}
          classKey={savedPaperDraft?.classKey}
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
      {savedPaperDraft && subject && openQuestionType && (
        <QuestionTypePanel
          boardSlug={savedPaperDraft?.boardSlug}
          mediumSlug={savedPaperDraft?.mediumSlug}
          classKey={savedPaperDraft?.classKey}
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
      {subject && savedPaperDraft && (
        <PaperBuilder
          selected={selected}
          setSelected={setSelected}
          removeFromPaper={removeFromPaper}
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
          handleOpenQuestionType={handleOpenQuestionType}
          chapters={chapters}
          setExamPatternTotalMarks={setExamPatternTotalMarks}
          board={savedPaperDraft?.boardSlug}
        />
      )}

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
          boardParam={savedPaperDraft?.boardSlug}
          mediumSlug={savedPaperDraft?.mediumSlug}
          classKey={savedPaperDraft?.classKey}
          firebaseUid={userData?.firebaseUid}
          allowRoute={allowRoute}
          examPatternTotalMarks={examPatternTotalMarks}
        />
      )}
    </div>
  );
};

export default SavedPage;
