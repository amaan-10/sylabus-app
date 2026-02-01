"use client";

import { useEffect, useMemo, useState } from "react";
import { BoardSlug, MediumSlug, ClassKey, Subject } from "@/lib/subjects";
import {
  capitalize,
  Chapter,
  prettifyType,
  Question,
  QuestionSource,
  questionTypeToSlug,
} from "@/lib/utility/helper";
import { EXAM_PATTERN_12_SCIENCE, ScienceSubjectKey } from "@/lib/examPattern";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  X,
} from "lucide-react";
import Image from "next/image";
import "katex/dist/katex.min.css";
import SmartMathJax from "../SmartMathJax";
import { Section } from "@/models/for-sylabus-app/subjectQuestionBank";

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
    containerId: string;
    containerTitle?: string;
    containerNumber?: number;
    source: QuestionSource;
  };
  handleToggleContainer: (id: string) => void;
  activeContainers: Chapter[] | Section[];
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
  isLanguageSubject: boolean;
}> = ({
  boardSlug,
  mediumSlug,
  classKey,
  subject,
  openSpec,
  handleToggleContainer,
  activeContainers,
  onClose,
  onAddToPaper,
  selectedIds,
  selectedGlobal,
  setSelectedGlobal,
  paperMode,
  sectionedSelected,
  setSectionedSelected,
  questionTypes,
  isLanguageSubject,
}) => {
  const isChapter = (c: Chapter | Section): c is Chapter => {
    return "chapterNumber" in c;
  };

  const [questions, setQuestions] = useState<Question[]>([]);
  const [containerTitle, setContainerTitle] = useState<string>(
    openSpec.containerTitle || "",
  );
  const [containerNumber, setContainerNumber] = useState<number>(
    openSpec.containerNumber || 0,
  );
  const [totalMarks, setTotalMarks] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // local selection within panel (for faster checkboxes)
  const [localSelectedIds, setLocalSelectedIds] = useState<Set<string>>(
    new Set(),
  );

  const initialIndex = Math.max(
    0,
    activeContainers.findIndex((c) => c.slug === openSpec.containerId),
  );

  const [containerIndex, setContainerIndex] = useState(initialIndex);
  const [questionTypeIndex, setQuestionTypeIndex] = useState(0);

  const activeQuestionType = questionTypes[questionTypeIndex];

  useEffect(() => {
    setQuestionTypeIndex(
      questionTypes.findIndex((c) => c.label === openSpec.questionTypeLabel),
    );
  }, [openSpec]);

  const activeContainer = activeContainers[containerIndex];

  useEffect(() => {
    setContainerIndex(
      activeContainers.findIndex((c) => c.slug === openSpec.containerId),
    );
  }, [openSpec, activeContainers]);

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

        if (activeContainer) {
          if (isLanguageSubject) {
            // section
            params.set("sectionSlug", activeContainer.slug);
          } else {
            // chapter
            params.set("chapterSlug", activeContainer.slug);
          }
        }

        const res = await fetch(`/api/question-bank?${params.toString()}`, {
          signal: controller.signal,
        });

        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.error || `Request failed with ${res.status}`);
        }

        const data = await res.json();
        setQuestions(data.questions || []);
        setContainerTitle(data.containerTitle || openSpec.containerTitle || "");
        setContainerNumber(
          data.containerNumber || openSpec.containerNumber || 0,
        );

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
    containerIndex,
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

    if (isLanguageSubject) {
      return pattern.sections.find(
        (s) => prettifyType(q.examSectionType) === s.type,
      );
    } else {
      return pattern.sections.find(
        (s) =>
          prettifyType(q.examSectionType) === s.type && q.marks === s.marks,
      );
    }
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
  }, [containerIndex]);

  const sectionCount = useMemo(() => {
    if (!isExamMode) return localSelectedIds.size;

    const sectionQuestionIds = new Set(questions.map((q) => q.id));

    return Object.values(sectionedSelected)
      .flat()
      .filter((x) => sectionQuestionIds.has(x.id)).length;
  }, [isExamMode, sectionedSelected, localSelectedIds, questions]);

  const totalSelected = isExamMode
    ? Object.values(sectionedSelected).flat().length
    : selectedGlobal.length;

  const getContainerIdAt = (index: number) =>
    activeContainers[index]?.id ?? null;

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
                Math.min(questionTypes.length - 1, i + 1),
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
            onClick={() => {
              setContainerIndex((i) => Math.max(0, i - 1));
              handleToggleContainer(getContainerIdAt(containerIndex - 1)!);
            }}
            disabled={containerIndex === 0}
            className="rounded-full p-1.5 hover:bg-slate-100 disabled:opacity-40  cursor-pointer"
            aria-label="Previous chapter"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <h2 className="text-lg font-semibold leading-[1.2] text-slate-900">
            <h2 className="text-lg font-semibold leading-[1.2] text-slate-900">
              {containerNumber && isChapter(activeContainer)
                ? `Chapter ${activeContainer?.chapterNumber}: `
                : ""}
              {activeContainer?.title}
            </h2>
          </h2>

          <button
            onClick={() => {
              setContainerIndex((i) =>
                Math.min(activeContainers.length - 1, i + 1),
              );
              handleToggleContainer(getContainerIdAt(containerIndex + 1)!);
            }}
            disabled={containerIndex === activeContainers.length - 1}
            className="rounded-full p-1.5 hover:bg-slate-100 disabled:opacity-40  cursor-pointer"
            aria-label="Next chapter"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <p className="text-xs text-slate-500">
          <span className="font-medium">Select questions </span>to include in
          the paper.
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
              {/* <div className="flex items-center gap-2">
                <button
                  onClick={handleAddSelectedToPaper}
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-3 py-1 text-xs md:text-sm font-medium text-white hover:opacity-95"
                >
                  Add to paper
                </button>
                <button
                  onClick={() => {
                    // toggle select all / none locally
                    const allIds = new Set(questions.map((q) => q.id));
                    const allSelected = questions.every((q) =>
                      localSelectedIds.has(q.id),
                    );
                    if (allSelected) {
                      // clear local selected and remove these from global
                      setLocalSelectedIds(new Set());
                      setSelectedGlobal((g) =>
                        g.filter((p) => !allIds.has(p.id)),
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
              </div> */}

              <div className="text-xs text-slate-500">
                Total selected:{" "}
                <span className="font-medium">{totalSelected}</span> • This
                section: <span className="font-medium">{sectionCount}</span>
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

                    {isLanguageSubject ? (
                      <SectionQuestionRenderer q={q} idx={idx} />
                    ) : (
                      <ChapterQuestionUI q={q} idx={idx} />
                    )}

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

const ChapterQuestionUI = ({ q, idx }: any) => {
  return (
    <div className="flex-1">
      <div className="w-full">
        <span className="font-semibold">Q. {idx + 1}.</span>
        <span className="relative left-5 -ml-3">
          <SmartMathJax text={q.text} />
        </span>
      </div>

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
        Type: <span className="font-medium">{q.type}</span> • Marks:{" "}
        <span className="font-medium">{q.marks}</span> • Difficulty:{" "}
        <span className="font-medium">{capitalize(String(q.difficulty))}</span>
      </p>

      {q.options && q.options.length > 0 && (
        <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
          {q.options.map((opt: any, i: any) => (
            <li key={i}>
              <SmartMathJax text={opt} />
            </li>
          ))}
        </ul>
      )}

      {q.answer && (
        <p className="mt-2 text-sm">
          <strong>Answer:</strong> <SmartMathJax text={q.answer} />
        </p>
      )}

      {q.explanation && (
        <p className="mt-1 text-sm text-slate-500">
          <strong>Explanation:</strong> {q.explanation}
        </p>
      )}
    </div>
  );
};

const QuestionBlock = ({
  q,
  idx,
  isSubQuestion,
}: {
  q: any;
  idx?: number;
  isSubQuestion?: boolean;
}) => {
  const capitalize = (s: string) =>
    s ? s.charAt(0).toUpperCase() + s.slice(1) : s;

  return (
    <div className="my-2">
      <div className="w-full">
        {idx !== undefined &&
          (isSubQuestion ? (
            <span className="font-semibold">A{idx + 1}.</span>
          ) : (
            <span>{String.fromCharCode(97 + idx)})</span>
          ))}
        <span className="relative left-5 -ml-3">
          <SmartMathJax text={q.text || q.question || ""} />
        </span>
      </div>

      {q.imageUrl && (
        <Image
          src={q.imageUrl}
          width={160}
          height={160}
          alt={q.id}
          className="py-2"
        />
      )}

      {isSubQuestion ? (
        <p className="mt-1 text-[12px] text-slate-500">
          Type: <span className="font-medium">{q.type}</span> • Marks:{" "}
          <span className="font-medium">{q.marks}</span> • Difficulty:{" "}
          <span className="font-medium">
            {capitalize(String(q.difficulty))}
          </span>
        </p>
      ) : (
        ""
      )}

      {q.options && q.options.length > 0 && (
        <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
          {q.options.map((opt: string, i: number) => (
            <li key={i}>
              <SmartMathJax text={opt} />
            </li>
          ))}
        </ul>
      )}

      {q.answer && (
        <p className="mt-2 text-sm">
          <strong>Answer:</strong> <SmartMathJax text={q.answer} />
        </p>
      )}
    </div>
  );
};

const SubQuestionRenderer = ({
  questions,
  level = 1,
}: {
  questions: any[];
  level?: number;
}) => {
  let isSubQuestion = false;
  if (level === 1) {
    isSubQuestion = true;
  }

  return (
    <div className={`space-y-3 pl-${level * 4}`}>
      {questions.map((sq, idx) => (
        <div
          className={`${level === 1 ? "rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700" : ""}`}
          key={sq.id}
        >
          <QuestionBlock isSubQuestion={isSubQuestion} idx={idx} q={sq} />

          {sq.subQuestions && sq.subQuestions.length > 0 && (
            <SubQuestionRenderer
              questions={sq.subQuestions}
              level={level + 1}
            />
          )}
        </div>
      ))}
    </div>
  );
};

const SectionQuestionRenderer = ({ q, idx }: any) => {
  return (
    <div className="space-y-6">
      <div
        key={q.id}
        className="rounded-2xl border border-slate-300 bg-white p-4 space-y-3"
      >
        {/* Passage-based question */}
        <span className="font-semibold">
          Q. {idx + 1}. {q.question}
        </span>

        {q.passageText && <CollapsiblePassage text={q.passageText} />}

        {/* Main question (if exists) */}
        {/* {q.question && (
          <QuestionBlock q={{ ...q, text: q.question }} idx={idx} />
        )} */}

        <p className="mt-1 text-[12px] text-slate-500">
          Type: <span className="font-medium">{q.type}</span> • Marks:{" "}
          <span className="font-medium">{q.marks}</span> • Difficulty:{" "}
          <span className="font-medium">
            {capitalize(String(q.difficulty))}
          </span>
        </p>

        {q.text && <QuestionBlock q={{ ...q, text: q.text }} idx={idx} />}

        {/* Sub-questions (recursive) */}
        {q.subQuestions && q.subQuestions.length > 0 && (
          <SubQuestionRenderer questions={q.subQuestions} />
        )}
      </div>
    </div>
  );
};

const CollapsiblePassage = ({
  text,
  collapsedHeight = 96, // px (≈ 4–5 lines)
}: {
  text: string;
  collapsedHeight?: number;
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm mt-2">
      <div
        className="relative overflow-hidden transition-all duration-300"
        style={{
          maxHeight: expanded ? "none" : collapsedHeight,
        }}
      >
        <SmartMathJax text={text} />

        {/* Fade overlay when collapsed */}
        {!expanded && (
          <div className="pointer-events-none absolute bottom-0 left-0 h-10 w-full bg-linear-to-t from-slate-50 to-transparent" />
        )}
      </div>

      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="mt-2 mr-2 text-xs font-semibold text-emerald-600 cursor-pointer flex justify-self-end"
      >
        {expanded ? (
          <>
            Show less <ChevronUp size={16} />{" "}
          </>
        ) : (
          <>
            Read More <ChevronDown size={16} />{" "}
          </>
        )}
      </button>
    </div>
  );
};
