"use client";

import { EXAM_PATTERN_12_SCIENCE, ScienceSubjectKey } from "@/lib/examPattern";
import { Subject } from "@/lib/subjects";
import {
  Chapter,
  Question,
  questionTypeToSlug,
  truncate,
} from "@/lib/utility/helper";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import {
  motion,
  easeIn,
  easeOut,
  Variants,
  AnimatePresence,
} from "framer-motion";
import { FileText, Maximize2, Minimize2, Minus } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2 } from "lucide-react";
import SmartMathJax from "../SmartMathJax";

type PaperMode = "exam" | "custom";
type SectionedSelection = Record<string, Question[]>;

export const PaperBuilder: React.FC<{
  selected: Question[];
  removeFromPaper: (id: string) => void;
  clearPaper: () => void;
  setSelected: React.Dispatch<React.SetStateAction<Question[]>>;
  exportJSON: () => void;
  exportPrintable: () => void;
  paperMode: PaperMode;
  sectionedSelected: SectionedSelection;
  setSectionedSelected: React.Dispatch<
    React.SetStateAction<SectionedSelection>
  >;
  subject: Subject;
  setPaperMode: React.Dispatch<React.SetStateAction<PaperMode>>;
  handleOpenQuestionType: (
    label: string,
    marks: number,
    chapterSlug: string,
    chapterTitle?: string,
    chapterNumber?: number,
  ) => void;
  chapters: Chapter[];
  setExamPatternTotalMarks: React.Dispatch<React.SetStateAction<number>>;
  board: string;
}> = ({
  selected,
  removeFromPaper,
  clearPaper,
  setSelected,
  exportJSON,
  exportPrintable,
  paperMode,
  sectionedSelected,
  subject,
  setSectionedSelected,
  setPaperMode,
  handleOpenQuestionType,
  chapters,
  setExamPatternTotalMarks,
  board,
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

  const examSectionTotalMarks = useMemo(() => {
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

  useEffect(() => {
    examSectionTotalMarks;
    setExamPatternTotalMarks(examSectionTotalMarks);
  }, [examSectionTotalMarks]);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8, // desktop drag threshold
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200, // long-press delay (key for mobile)
        tolerance: 8, // finger movement allowed
      },
    }),
  );

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
                <div className="flex justify-between items-center gap-6">
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
                      {board.toUpperCase()} Pattern
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
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={(e) => {
                      if (!e.over || e.active.id === e.over.id) return;

                      setSelected((items) => {
                        const oldIndex = items.findIndex(
                          (i) => i.id === e.active.id,
                        );
                        const newIndex = items.findIndex(
                          (i) => i.id === e.over!.id,
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
                      .sections,
                  ).map(([_, sec]) => {
                    const qs = sectionedSelected[sec.key] || [];

                    return (
                      <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={(e) => {
                          if (!e.over || e.active.id === e.over.id) return;

                          setSectionedSelected((prev) => {
                            // Find the section key for this DnD context
                            const sectionKey = sec.key;
                            const sectionItems = prev[sectionKey] || [];
                            const oldIndex = sectionItems.findIndex(
                              (i) => i.id === e.active.id,
                            );
                            const newIndex = sectionItems.findIndex(
                              (i) => i.id === e.over!.id,
                            );
                            if (oldIndex === -1 || newIndex === -1) return prev;
                            const newSectionItems = arrayMove(
                              sectionItems,
                              oldIndex,
                              newIndex,
                            );
                            return {
                              ...prev,
                              [sectionKey]: newSectionItems,
                            };
                          });
                        }}
                      >
                        <motion.div
                          key={sec.key}
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="rounded-xl border-2 border-slate-200 bg-white p-3 space-y-2"
                          onClick={() =>
                            handleOpenQuestionType(
                              questionTypeToSlug(sec.type),
                              sec.marks,
                              chapters[0].slug,
                              chapters[0].title,
                              chapters[0].chapterNumber,
                            )
                          }
                        >
                          <div className="flex justify-between items-center cursor-pointer mb-0">
                            <div className="flex items-center justify-between gap-3">
                              <div>
                                <p className="text-sm font-semibold text-slate-800">
                                  {sec.title}
                                </p>
                                <p className="text-[11px] text-slate-500">
                                  {sec.type} • {sec.marks} marks each
                                </p>
                              </div>
                            </div>

                            <span className="text-xs font-semibold text-slate-600">
                              {qs.length}/{sec.total} Q •{" "}
                              {qs.reduce((s, q) => s + q.marks, 0)}/
                              {sec.total * sec.marks} M
                            </span>
                          </div>
                          {qs.length === sec.total && (
                            <div className="flex justify-end items-center mb-0 cursor-pointer">
                              <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-[11px] font-medium text-red-700">
                                Section Full
                              </span>
                            </div>
                          )}
                          <div className="h-0.5" />

                          <SortableContext
                            items={qs.map((q) => q.id)}
                            strategy={verticalListSortingStrategy}
                          >
                            {qs.length === 0 ? (
                              <p className="text-xs text-slate-400 italic cursor-pointer">
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
                          </SortableContext>
                        </motion.div>
                      </DndContext>
                    );
                  })
                )}
              </motion.div>

              {/* ---------------- FOOTER ---------------- */}
              <div
                className="flex items-center justify-between
                px-6 py-4
                bg-white
                ring-1 ring-black/5"
              >
                <button
                  onClick={clearPaper}
                  className="rounded-full px-4 py-1.5
               text-xs font-medium text-red-500
               hover:bg-slate-100 cursor-pointer"
                >
                  Clear all
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={exportPrintable}
                    className="rounded-full bg-slate-900
                 px-5 py-1.5 text-xs font-medium text-white
                 hover:bg-slate-800 cursor-pointer"
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
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
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
          {index + 1}. <SmartMathJax text={q.text} />
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
        {index + 1}. <SmartMathJax text={q.text} /> ({q.marks})
      </div>
    </div>
  );
};
