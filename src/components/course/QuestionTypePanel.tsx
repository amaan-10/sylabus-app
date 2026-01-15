"use client";

import { useEffect, useState } from "react";
import { BoardSlug, MediumSlug, ClassKey, Subject } from "@/lib/subjects";
import {
  Chapter,
  prettifyType,
  Question,
  QuestionSource,
  questionTypeToSlug,
} from "@/lib/utility/helper";
import { EXAM_PATTERN_12_SCIENCE, ScienceSubjectKey } from "@/lib/examPattern";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";

type PaperMode = "exam" | "custom";
type SectionedSelection = Record<string, Question[]>;

export const QuestionTypePanel: React.FC<{
  boardSlug: BoardSlug | null;
  mediumSlug: MediumSlug;
  classKey: ClassKey;
  subject: Subject;
  openSpec: {
    questionTypeLabel: string;
    marks: number;
    questionTypeSlug: string;
    chapterSlug: string;
    chapterTitle?: string;
    chapterNumber?: number;
    source: QuestionSource;
  };
  chapters: Chapter[];
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
  questionTypes: { key: string; label: string; marks: number }[];
}> = ({
  boardSlug,
  mediumSlug,
  classKey,
  subject,
  openSpec,
  chapters,
  onClose,
  onAddToPaper,
  selectedIds,
  selectedGlobal,
  setSelectedGlobal,
  paperMode,
  sectionedSelected,
  setSectionedSelected,
  questionTypes,
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

  const initialIndex = Math.max(
    0,
    chapters.findIndex((c) => c.slug === openSpec.chapterSlug)
  );

  const [chapterIndex, setChapterIndex] = useState(initialIndex);
  const [questionTypeIndex, setQuestionTypeIndex] = useState(0);

  const activeQuestionType = questionTypes[questionTypeIndex];

  useEffect(() => {
    setQuestionTypeIndex(
      questionTypes.findIndex((c) => c.label === openSpec.questionTypeLabel)
    );
  }, [openSpec]);

  const activeChapter = chapters[chapterIndex];

  useEffect(() => {
    setChapterIndex(chapters.findIndex((c) => c.slug === openSpec.chapterSlug));
  }, [openSpec]);

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
          questionTypeSlug: questionTypeToSlug(activeQuestionType?.label) ?? "",
          source: openSpec.source ?? "",
          marks: String(activeQuestionType?.marks ?? 0),
          paperMode: paperMode,
        });

        if (activeChapter?.slug) params.set("chapterSlug", activeChapter.slug);

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
    chapterIndex,
    questionTypeIndex,
    openSpec.marks,
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
      (s) => prettifyType(q.examSectionType) === s.type && q.marks === s.marks
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
  useEffect(() => {
    setLocalSelectedIds(new Set());
  }, [chapterIndex]);

  const capitalize = (s: string) =>
    s ? s.charAt(0).toUpperCase() + s.slice(1) : s;

  return (
    <div
      className="fixed right-0 top-0 h-full w-[min(920px,90vw)] bg-white shadow-2xl overflow-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-[11px] font-medium text-sky-900">
              {subject.name}
            </div>
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

        <div className="flex items-center gap-2 pt-2">
          <button
            onClick={() => setQuestionTypeIndex((i) => Math.max(0, i - 1))}
            disabled={questionTypeIndex === 0}
            className="rounded-full p-1.5 hover:bg-slate-100 disabled:opacity-40 cursor-pointer"
            aria-label="Previous question type"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <h2 className="text-lg font-semibold leading-[1.2] text-slate-900">
            {prettifyType(activeQuestionType?.label)}
          </h2>

          <button
            onClick={() =>
              setQuestionTypeIndex((i) =>
                Math.min(questionTypes.length - 1, i + 1)
              )
            }
            disabled={questionTypeIndex === questionTypes.length - 1}
            className="rounded-full p-1.5 hover:bg-slate-100 disabled:opacity-40 cursor-pointer"
            aria-label="Next question type"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-2 pb-2">
          <button
            onClick={() => setChapterIndex((i) => Math.max(0, i - 1))}
            disabled={chapterIndex === 0}
            className="rounded-full p-1.5 hover:bg-slate-100 disabled:opacity-40  cursor-pointer"
            aria-label="Previous chapter"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <h2 className="text-lg font-semibold leading-[1.2] text-slate-900">
            Chapter {activeChapter?.chapterNumber}: {activeChapter?.title}
          </h2>

          <button
            onClick={() =>
              setChapterIndex((i) => Math.min(chapters.length - 1, i + 1))
            }
            disabled={chapterIndex === chapters.length - 1}
            className="rounded-full p-1.5 hover:bg-slate-100 disabled:opacity-40  cursor-pointer"
            aria-label="Next chapter"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <p className="text-xs text-slate-500">
          Select questions and click{" "}
          <span className="font-medium">Add to paper</span>.
        </p>
      </div>

      <div className="p-[24px_24px_114px] space-y-4">
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
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {/* <button
                  onClick={handleAddSelectedToPaper}
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-3 py-1 text-xs md:text-sm font-medium text-white hover:opacity-95"
                >
                  Add to paper
                </button> */}
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
                  // className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs md:text-sm text-slate-700 hover:bg-slate-50"
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-3 py-1 text-xs md:text-sm font-medium text-white hover:opacity-95 cursor-pointer"
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

                      {q.imageUrl && (
                        <Image
                          src={q.imageUrl}
                          width={160}
                          height={160}
                          alt={q.id}
                          className="py-2"
                        />
                      )}

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
