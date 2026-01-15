"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  FileText,
  GripVertical,
  Maximize2,
  Minimize2,
  Minus,
  Trash2,
} from "lucide-react";
import { QuestionPaperPDF } from "@/components/course/QuestionPaperPDF";
import { PDFViewer, PDFDownloadLink, BlobProvider } from "@react-pdf/renderer";
import {
  motion,
  AnimatePresence,
  easeIn,
  easeOut,
  Variants,
} from "framer-motion";
import { EXAM_PATTERN_12_SCIENCE, ScienceSubjectKey } from "@/lib/examPattern";
import { closestCenter, DndContext } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Subject } from "@/lib/subjects";
import { CSS } from "@dnd-kit/utilities";
import Sidebar from "@/components/Sidebar";
import LoaderWrapper from "@/components/PageLoader";

type Question = any;
type PaperMode = "exam" | "custom";
type SectionedSelection = Record<string, Question[]>;

const SavedPaperDetailPage = () => {
  const { paperId } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [paper, setPaper] = useState<any>(null);
  const [subject, setSubject] = useState<any>(null);
  const [selected, setSelected] = useState<Question[]>([]);
  const [paperMode, setPaperMode] = useState<PaperMode>("custom");
  const [sectionedSelected, setSectionedSelected] =
    useState<SectionedSelection>({});
  const [schoolName, setSchoolName] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);

  useEffect(() => {
    if (!paperId) return;
    const loadPaper = async () => {
      try {
        const res = await fetch(`/api/question-papers/${paperId}`);
        if (!res.ok) {
          alert("Failed to load paper");
          router.push("/generated-papers");
          return;
        }

        const data = await res.json();
        const p = data.paper;

        setPaper(p);
        setSubject({
          slug: p.meta.subjectSlug,
          name: p.meta.subjectName,
        });
        setPaperMode(p.paperMode);
        setSchoolName(p.schoolName || "");
        setSelected(p.questions || []);
        setSectionedSelected(p.examSections || {});
      } catch (err) {
        console.error("Failed to load generated paper", err);
      } finally {
        setLoading(false);
      }
    };

    loadPaper();
  }, [paperId, router]);

  // const subject = {
  //   slug: paper.meta.subjectSlug,
  //   name: paper.meta.subjectName,
  // };

  const selectedForPDF =
    paperMode === "exam" ? Object.values(sectionedSelected).flat() : selected;

  return (
    <div className="flex place-content-start items-start bg-white flex-row gap-2 h-min overflow-hidden py-2 px-2 pl-[104px] relative min-h-screen w-auto font-poppins">
      <Sidebar />
      <LoaderWrapper isLoading={loading}>
        <section className="border border-[rgba(0,0,0,0.08)] bg-white rounded-2xl flex place-content-between justify-center items-center flex-[1_0_0] flex-col h-[97.5vh] overflow-hidden pt-14 px-8 pb-8 relative w-full gap-5">
          <div className="min-h-screen w-full px-4 py-6">
            <div className="max-w-7xl mx-auto space-y-4">
              {/* ---------- Header ---------- */}
              {/* <div className="flex items-center justify-between">
              <button
                onClick={() => router.push("/generated-papers")}
                className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to saved papers
              </button>

              <PDFDownloadLink
                document={
                  <QuestionPaperPDF
                    schoolName={schoolName}
                    subject={subject}
                    selected={selectedForPDF}
                    paperMode={paperMode}
                    examPatternTotalMarks={paper.totalMarks}
                  />
                }
                fileName={`${paper.meta.subjectSlug}-question-paper.pdf`}
              >
                {({ loading }) => (
                  <button
                    disabled={loading}
                    className="rounded-lg bg-emerald-600 px-4 py-1.5 text-xs font-medium text-white hover:bg-emerald-700"
                  >
                    {loading ? "Preparing PDF…" : "Download PDF"}
                  </button>
                )}
              </PDFDownloadLink>
            </div> */}

              {/* ---------- Meta ---------- */}
              {/* <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm">
              <h1 className="text-lg font-semibold text-slate-900">
                {paper.meta.subjectName}
              </h1>
              <p className="text-xs text-slate-500">
                {paper.meta.board.toUpperCase()} • {paper.meta.medium} •{" "}
                {paper.meta.classKey}
              </p>

              <p className="mt-2 text-xs text-slate-600">
                Mode:{" "}
                <span className="font-medium capitalize">{paperMode}</span> •{" "}
                {paper.totalMarks} Marks
              </p>
            </div> */}

              {/* ---------- Paper Builder ---------- */}
              {/* <PaperBuilder
              selected={selected}
              setSelected={setSelected}
              removeFromPaper={(id: any) =>
                setSelected((prev) => prev.filter((q) => q.id !== id))
              }
              clearPaper={() => setSelected([])}
              exportPrintable={() => setPreviewOpen(true)}
              exportJSON={() => {}}
              schoolName={schoolName}
              setSchoolName={setSchoolName}
              paperMode={paperMode}
              sectionedSelected={sectionedSelected}
              setSectionedSelected={setSectionedSelected}
              subject={{ slug: paper.meta.subjectSlug }}
              setPaperMode={setPaperMode}
            /> */}

              {/* ---------- PDF Preview ---------- */}
              {paper && subject && (
                <PDFPreviewModal
                  open={true}
                  onClose={() => setPreviewOpen(false)}
                  schoolName={schoolName}
                  subject={subject}
                  selected={selected}
                  paperMode={paperMode}
                  sectionedSelected={sectionedSelected}
                  boardParam={paper.meta.board}
                  mediumSlug={paper.meta.medium}
                  classKey={paper.meta.classKey}
                  firebaseUid={paper.userId}
                  examPatternTotalMarks={paper.totalMarks}
                />
              )}
            </div>
          </div>
        </section>
      </LoaderWrapper>
    </div>
  );
};

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
  examPatternTotalMarks,
}: any) => {
  if (!open) return null;
  const router = useRouter();

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
                  onClick={savePaperToDB}
                  disabled={loading}
                >
                  {loading ? "Preparing PDF…" : "Download PDF"}
                </button>
              )}
            </PDFDownloadLink>

            <button
              onClick={() => router.push("/generated-papers")}
              className="rounded-lg border border-slate-400 px-3 py-1.5 text-xs hover:bg-slate-100 cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>

        {/* ---------------- VIEWER ---------------- */}
        <div className="flex-1 h-px bg-slate-100 p-3">
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
        <div className="border-t border-slate-400 px-4 py-2 text-xs text-slate-500 flex justify-between">
          <span>
            <span className="font-medium">{subject.name}</span> • {boardParam} •{" "}
            {mediumSlug} • {classKey}
          </span>
          <span>
            Total Marks:{" "}
            <span className="font-medium">{examPatternTotalMarks}</span> • Mode:{" "}
            <span className="font-medium capitalize">{paperMode} Pattern</span>
          </span>
        </div>
      </div>
    </div>
  );
};

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
  subject: any;
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

    const examKey = subject as ScienceSubjectKey;
    const pattern = EXAM_PATTERN_12_SCIENCE[examKey];

    if (!pattern?.sections) return 0;

    return pattern.sections.reduce((sum, sec) => {
      const selected = sectionedSelected[sec.key] ?? [];
      const count = Math.min(selected.length, sec.attemptAny);
      return sum + count * sec.marks;
    }, 0);
  }, [subject, sectionedSelected]);

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
            className="fixed bottom-4 right-4 z-60 h-14 w-14 rounded-full bg-[#193625] shadow-xl flex items-center justify-center hover:bg-[#13261b] cursor-pointer"
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
                : "right-14 bottom-2 w-[85%] max-h-[80vh]"
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

const truncate = (s: string, n = 60) =>
  s.length > n ? s.slice(0, n - 1).trim() + "…" : s;

export default SavedPaperDetailPage;
