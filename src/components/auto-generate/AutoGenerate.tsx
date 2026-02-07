// src/app/auto-generate/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toRoman } from "@/lib/utility/helper";
import { easeIn, easeOut, Variants } from "framer-motion";
import LoaderWrapper from "@/components/PageLoader";
import { Book, ChevronDown, NotepadText, Trash2 } from "lucide-react";

/* ---------------------- Main Page Component ---------------------- */
const AutoGenerate: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const programParam = searchParams.get("program");
  const semesterParam = searchParams.get("semester");
  const courseParam = searchParams.get("course");
  const blueprintParam = searchParams.get("blueprint");

  const isSelectionComplete =
    !!programParam && !!semesterParam && !!courseParam && !!blueprintParam;

  useEffect(() => {
    if (!isSelectionComplete) {
      router.replace("./auto-generate?step=builder");
    }
  }, [isSelectionComplete, router]);

  // 🔒 Phase 1: Selection dialog ONLY
  if (!isSelectionComplete) {
    return <SelectionGate />;
  }

  // 🔓 Phase 2: real app mounts ONLY after selection
  return (
    <AutoGenerateBuilder
      programParam={programParam}
      semesterParam={semesterParam}
      courseParam={courseParam}
      blueprintParam={blueprintParam}
    />
  );
};

/* ---------------------- Custom Paper Builder Component ---------------------- */

type BuilderProps = {
  programParam: string;
  semesterParam: string;
  courseParam: string;
  blueprintParam: string;
};

const AutoGenerateBuilder: React.FC<BuilderProps> = ({
  programParam,
  semesterParam,
  courseParam,
  blueprintParam,
}) => {
  const [loading, setLoading] = useState(true);
  const [paper, setPaper] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const hasGeneratedRef = React.useRef(false);

  useEffect(() => {
    if (hasGeneratedRef.current) return;
    hasGeneratedRef.current = true;

    const generatePaper = async () => {
      try {
        setLoading(true);

        const res = await fetch("/api/institute/paper/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            program: programParam,
            semester: semesterParam,
            course: courseParam,
            blueprint: blueprintParam,
          }),
        });

        if (!res.ok) {
          throw new Error("Failed to generate paper");
        }

        const data = await res.json();
        console.log("Generated Paper:", data);
        setPaper(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    generatePaper();
  }, []);

  return (
    <section className="min-h-screen bg-slate-50 px-6 py-10 w-full">
      <LoaderWrapper isLoading={loading}>
        {error && (
          <div className="max-w-3xl mx-auto rounded-xl bg-red-50 border border-red-200 p-6 text-red-600">
            {error}
          </div>
        )}

        {!loading && paper && <GeneratedPaperView paper={paper} />}
      </LoaderWrapper>
    </section>
  );
};

const GeneratedPaperView = ({ paper }: { paper: any }) => {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h1 className="text-xl font-semibold text-slate-900">Question Paper</h1>
        <p className="mt-1 text-sm text-slate-500">
          Course Code: {paper.courseCode} • Semester {paper.semester}
        </p>
      </div>

      {/* Sections */}
      {paper.sections.map((section: any, idx: number) => (
        <div
          key={idx}
          className="rounded-2xl border border-slate-200 bg-white p-6"
        >
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            {section.sectionTitle}
          </h2>

          <div className="space-y-6">
            {section.questions.map((q: any, qIdx: number) => (
              <QuestionRenderer key={q.id || qIdx} question={q} index={qIdx} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const QuestionRenderer = ({
  question,
  index,
}: {
  question: any;
  index: number;
}) => {
  return (
    <div className="space-y-2">
      <p className="font-medium text-slate-900">
        {index + 1}. {question.question}
        <span className="ml-2 text-sm text-slate-500">
          ({question.marks} marks)
        </span>
      </p>

      {/* Image */}
      {question.image?.required && (
        <div className="mt-2 rounded-lg border bg-slate-50 p-3 text-sm text-slate-600">
          Diagram/Image required: {question.image.description}
        </div>
      )}

      {/* MCQ */}
      {question.questionType === "MCQ" && (
        <ul className="ml-6 list-disc text-sm text-slate-700">
          {question.options.map((opt: string, i: number) => (
            <li key={i}>{opt}</li>
          ))}
        </ul>
      )}

      {/* Sub Questions */}
      {question.subQuestions?.length > 0 && (
        <div className="ml-6 space-y-1">
          {question.subQuestions.map((sq: any, i: number) => (
            <p key={i} className="text-sm text-slate-700">
              {sq.label} {sq.question} ({sq.marks})
            </p>
          ))}
        </div>
      )}

      {/* Internal Choice */}
      {question.internalChoice && (
        <div className="mt-3 rounded-lg border border-dashed p-3 text-sm">
          <p className="font-medium">
            {question.internalChoice.type.toUpperCase()}
          </p>

          {question.internalChoice.alternatives.map((alt: any, i: number) => (
            <p key={i} className="mt-1 text-slate-700">
              {alt.question}
            </p>
          ))}
        </div>
      )}
    </div>
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

const SelectionGate = () => {
  const router = useRouter();

  const [step, setStep] = useState<"form" | "blueprint">("form");
  const [selectionOpen, setSelectionOpen] = useState(true);

  type SubQuestion = {
    label: string;
    questionsToShow: number;
    questionsToAttempt: number;
    marksPerQuestion: number;
    hasInternalChoice: boolean;
    choiceType: string;
    difficultyMix: {
      easy: number;
      medium: number;
      hard: number;
    };
  };

  type BlueprintSection = {
    sectionTitle: string;
    questionType: string;
    questionsToShow: number;
    questionsToAttempt: number;
    marksPerQuestion: number;
    hasInternalChoice: boolean;
    choiceType: string;
    hasSubQuestions?: boolean;
    subQuestions: SubQuestion[];
    difficultyMix: {
      easy: number;
      medium: number;
      hard: number;
    };
  };

  const [blueprint, setBlueprint] = useState<BlueprintSection[]>([
    {
      sectionTitle: "Q. 1.",
      questionType: "",
      questionsToShow: 10,
      questionsToAttempt: 10,
      marksPerQuestion: 1,
      hasInternalChoice: false,
      choiceType: "none",
      hasSubQuestions: false,
      subQuestions: [],
      difficultyMix: {
        easy: 50,
        medium: 30,
        hard: 20,
      },
    },
  ]);

  const [courseQuery, setCourseQuery] = useState("");
  const [courseResults, setCourseResults] = useState<any[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [courseLoading, setCourseLoading] = useState(false);
  const [semester, setSemester] = useState("1");
  const [user, setUser] = useState<any>(null);
  const [institute, setInstitute] = useState<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const [programQuery, setProgramQuery] = useState("");
  const [programResults, setProgramResults] = useState<any[]>([]);
  const [programLoading, setProgramLoading] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<any>(null);

  useEffect(() => {
    const fetchMe = async () => {
      const res = await fetch("/api/institute/auth/me");
      if (!res.ok) {
        router.push("/institute/login");
        return;
      }

      const data = await res.json();
      setUser(data.user);
      setInstitute(data.user.instituteId);
    };

    fetchMe();
  }, [router]);

  useEffect(() => {
    if (!programQuery || !institute?._id) {
      setProgramResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        setProgramLoading(true);

        const res = await fetch(
          `/api/institute/search/program?instituteId=${institute._id}&q=${programQuery}`,
        );

        const data = await res.json();
        setProgramResults(Array.isArray(data) ? data : []);
      } catch (err: any) {
        setProgramResults([]);
      } finally {
        setProgramLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [programQuery, institute]);

  useEffect(() => {
    if (!courseQuery || !semester) {
      setCourseResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        setCourseLoading(true);

        const res = await fetch(
          `/api/institute/search/course?instituteId=${institute._id}&q=${courseQuery}`,
        );

        const data = await res.json();
        setCourseResults(Array.isArray(data) ? data : []);
      } catch (err: any) {
        setCourseResults([]);
      } finally {
        setCourseLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [courseQuery, semester, institute]);

  useEffect(() => {
    setActiveIndex(0);
  }, [courseResults]);

  const updateSection = <K extends keyof BlueprintSection>(
    index: number,
    key: K,
    value: BlueprintSection[K],
  ) => {
    setBlueprint((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [key]: value };
      return updated;
    });
  };

  const updateSubQuestion = (
    sectionIndex: number,
    subIndex: number,
    field: string,
    value: any,
  ) => {
    setBlueprint((prev) =>
      prev.map((section, i) => {
        if (i !== sectionIndex) return section;

        return {
          ...section,
          subQuestions: section.subQuestions.map((sub, j) => {
            if (j !== subIndex) return sub;
            return { ...sub, [field]: value };
          }),
        };
      }),
    );
  };

  const updateDifficulty = (
    index: number,
    level: "easy" | "medium" | "hard",
    value: number,
  ) => {
    setBlueprint((prev) => {
      const updated = [...prev];
      updated[index].difficultyMix[level] = value;
      return updated;
    });
  };

  const updateSubDifficulty = (
    sectionIndex: number,
    subIndex: number,
    level: "easy" | "medium" | "hard",
    value: number,
  ) => {
    setBlueprint((prev) =>
      prev.map((section, i) => {
        if (i !== sectionIndex) return section;

        return {
          ...section,
          subQuestions: section.subQuestions.map((sub, j) => {
            if (j !== subIndex) return sub;

            return {
              ...sub,
              difficultyMix: {
                ...sub.difficultyMix,
                [level]: value,
              },
            };
          }),
        };
      }),
    );
  };

  const addSubQuestion = (sectionIndex: number) => {
    const currentSubQuestions = blueprint[sectionIndex].subQuestions || [];
    const nextLabel = String.fromCharCode(65 + currentSubQuestions.length);

    updateSection(sectionIndex, "subQuestions", [
      ...currentSubQuestions,
      {
        label: nextLabel,
        questionsToShow: 1,
        questionsToAttempt: 1,
        marksPerQuestion: 5,
        hasInternalChoice: false,
        choiceType: "or",
        difficultyMix: { easy: 40, medium: 40, hard: 20 },
      },
    ]);
  };

  const removeSubQuestion = (sectionIndex: number, subIndex: number) => {
    const updated = (blueprint[sectionIndex].subQuestions || []).filter(
      (_: any, i: number) => i !== subIndex,
    );
    updateSection(sectionIndex, "subQuestions", updated);
  };

  const addSection = () => {
    setBlueprint((prev) => [
      ...prev,
      {
        sectionTitle: "Q. " + (prev.length + 1),
        questionType: "Short Answer",
        questionsToShow: 5,
        questionsToAttempt: 5,
        marksPerQuestion: 2,
        hasInternalChoice: false,
        choiceType: "none",
        hasSubQuestions: false,
        subQuestions: [],
        difficultyMix: { easy: 40, medium: 40, hard: 20 },
      },
    ]);
  };

  const removeSection = (index: number) => {
    setBlueprint((prev) => prev.filter((_, i) => i !== index));
  };

  const handleGeneratePaper = async () => {
    router.push(
      `./auto-generate?program=${selectedProgram._id}&semester=${semester}&course=${selectedCourse.courseCode}&blueprint=${encodeURIComponent(JSON.stringify(blueprint))}`,
    );
  };

  console.log(selectedProgram);

  return (
    <div className="fixed inset-0 z-50 bg-slate-100 flex items-center justify-center p-4 font-poppins">
      {selectionOpen && (
        <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl overflow-hidden">
          {/* Header */}
          <div className="px-6 py-5 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900">
              Paper Setup
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Review & edit your details
            </p>
          </div>

          {/* Body */}
          <div className="px-6 py-6 min-h-[70vh] max-h-[70vh] overflow-y-auto space-y-6">
            {step === "form" && (
              <>
                {/* Course Search */}
                <div className="relative">
                  <label className="text-xs font-semibold uppercase text-slate-500 mb-1">
                    Course Code
                  </label>

                  <input
                    value={
                      selectedCourse ? selectedCourse.courseCode : courseQuery
                    }
                    onChange={(e) => {
                      setSelectedCourse(null);
                      setCourseQuery(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      if (!courseResults.length) return;

                      if (e.key === "ArrowDown") {
                        e.preventDefault();
                        setActiveIndex((prev) =>
                          prev === courseResults.length - 1 ? 0 : prev + 1,
                        );
                      }

                      if (e.key === "ArrowUp") {
                        e.preventDefault();
                        setActiveIndex((prev) =>
                          prev === 0 ? courseResults.length - 1 : prev - 1,
                        );
                      }

                      if (e.key === "Enter") {
                        e.preventDefault();
                        const selected = courseResults[activeIndex];
                        if (!selected) return;

                        setSelectedCourse(selected);
                        setCourseQuery("");
                        setCourseResults([]);
                      }

                      if (e.key === "Escape") {
                        setCourseResults([]);
                      }
                    }}
                    placeholder="Search course code (e.g. 23SBBO11SE)"
                    className="mt-2 w-full h-11 rounded-xl border border-slate-300 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                  />

                  {/* Dropdown */}
                  {(courseResults.length > 0 || courseLoading) &&
                    !selectedCourse && (
                      <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white/95 shadow-xl backdrop-blur-md">
                        {/* Loading */}
                        {courseLoading && (
                          <div className="flex items-center gap-2 px-5 py-4 text-sm text-slate-500">
                            <span className="h-2 w-2 animate-pulse rounded-full bg-slate-400" />
                            Searching courses…
                          </div>
                        )}

                        {/* Results */}
                        <div className="max-h-64 overflow-y-auto">
                          {courseResults.map((c, index) => {
                            const isActive = index === activeIndex;
                            const isCore = c.courseType === "Core";

                            return (
                              <div
                                key={c._id}
                                onMouseEnter={() => setActiveIndex(index)}
                                onClick={() => {
                                  setSelectedCourse(c);
                                  setCourseQuery("");
                                  setCourseResults([]);
                                }}
                                className={`cursor-pointer px-5 py-4 transition-all
                                  ${isActive ? "bg-slate-100" : "hover:bg-slate-50"}
                                `}
                              >
                                <div className="flex items-start justify-between gap-3">
                                  <div>
                                    {/* Course Code */}
                                    <div className="text-sm font-semibold text-slate-900">
                                      {c.courseCode}
                                    </div>

                                    {/* Degree + Semester */}
                                    <div className="mt-0.5 text-xs text-slate-500">
                                      {c.degree} • Semester{" "}
                                      {toRoman(c.semester)}
                                    </div>

                                    {/* Title */}
                                    <div className="mt-1 text-sm text-slate-700">
                                      {c.courseTitle}
                                    </div>
                                  </div>

                                  {/* Badges */}
                                  <div className="flex flex-col items-end gap-2">
                                    <span
                                      className={`rounded-full px-3 py-1 text-xs font-medium capitalize
                                        ${
                                          isCore
                                            ? "bg-blue-100 text-blue-600"
                                            : "bg-emerald-100 text-emerald-600"
                                        }
                                      `}
                                    >
                                      {c.courseType}
                                    </span>

                                    <span className="rounded-full bg-slate-200/70 px-3 py-1 text-xs font-medium text-slate-600">
                                      {c.credits} Credits
                                    </span>
                                  </div>
                                </div>

                                {/* Divider */}
                                {index !== courseResults.length - 1 && (
                                  <div className="mt-4 -mb-4 h-px bg-slate-100" />
                                )}
                              </div>
                            );
                          })}
                        </div>

                        {/* Empty */}
                        {!courseLoading && courseResults.length === 0 && (
                          <div className="px-5 py-4 text-sm text-slate-500">
                            No courses found
                          </div>
                        )}
                      </div>
                    )}

                  <div className="mt-6 rounded-2xl border border-slate-200 bg-linear-to-br from-white to-slate-50 p-5 shadow-sm">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                      Selected Course Details
                    </p>

                    {/* Program + Semester */}
                    <div className="mt-3 flex items-start gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-700 text-sm font-semibold">
                        <Book size={16} />
                      </div>

                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-900 leading-snug">
                          {selectedCourse
                            ? `${selectedCourse.degree}`
                            : "Course not selected"}
                        </p>

                        <p className="text-xs text-slate-500">
                          {selectedCourse
                            ? `Semester ${selectedCourse.semester || "—"}`
                            : "Select a course to proceed"}
                        </p>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="my-4 h-px bg-slate-200" />

                    {/* Course Info */}
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-700 text-sm font-semibold">
                        <NotepadText size={16} />
                      </div>

                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-900 leading-snug">
                          {selectedCourse
                            ? selectedCourse.courseTitle
                            : "Course not selected"}
                        </p>

                        <p className="text-xs text-slate-500">
                          {selectedCourse
                            ? `${selectedCourse.courseCode} • ${selectedCourse.courseType} • ${selectedCourse.credits} Credits`
                            : "Select a course to proceed"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {step === "blueprint" && (
              <div className="space-y-6">
                <p className="text-xs font-semibold uppercase text-slate-500">
                  Question Blueprint
                </p>

                {blueprint.map((section, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold uppercase text-slate-500">
                        Q. {index + 1}
                      </p>

                      <button
                        onClick={() => removeSection(index)}
                        disabled={blueprint.length === 1}
                        className={`flex h-8 w-8 items-center justify-center rounded-lg transition cursor-pointer
                        ${
                          blueprint.length === 1
                            ? "text-slate-300 cursor-not-allowed"
                            : "text-red-500 hover:bg-red-50"
                        }
                      `}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    {/* Section Title */}
                    <input
                      value={section.sectionTitle}
                      onChange={(e) =>
                        updateSection(index, "sectionTitle", e.target.value)
                      }
                      placeholder="Question Title"
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm"
                    />

                    <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3">
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          Sub-Questions (A, B, C)
                        </p>
                        <p className="text-xs text-slate-500">
                          Enable parts inside this question
                        </p>
                      </div>

                      <button
                        onClick={() =>
                          updateSection(
                            index,
                            "hasSubQuestions",
                            !section.hasSubQuestions,
                          )
                        }
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition cursor-pointer ${
                          section.hasSubQuestions ? "bg-black" : "bg-slate-300"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                            section.hasSubQuestions
                              ? "translate-x-6"
                              : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>

                    {section.hasSubQuestions && section.subQuestions && (
                      <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-4">
                        <p className="text-xs font-semibold uppercase text-slate-500">
                          Sub Questions
                        </p>

                        {section.subQuestions.map((sub, subIndex) => (
                          <div
                            key={subIndex}
                            className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-4"
                          >
                            {/* Header */}
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-semibold text-slate-800">
                                {sub.label}.
                              </p>

                              <button
                                onClick={() =>
                                  removeSubQuestion(index, subIndex)
                                }
                                className="text-red-500 hover:bg-red-50 rounded-lg p-1"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>

                            {/* Numbers */}
                            <div className="grid grid-cols-3 gap-3">
                              <EditableNumber
                                label="Questions Given"
                                value={sub.questionsToShow}
                                onChange={(v) =>
                                  updateSubQuestion(
                                    index,
                                    subIndex,
                                    "questionsToShow",
                                    v,
                                  )
                                }
                              />

                              <EditableNumber
                                label="Attempt Any"
                                value={sub.questionsToAttempt}
                                onChange={(v) =>
                                  updateSubQuestion(
                                    index,
                                    subIndex,
                                    "questionsToAttempt",
                                    v,
                                  )
                                }
                              />

                              <EditableNumber
                                label="Marks Each"
                                value={sub.marksPerQuestion}
                                onChange={(v) =>
                                  updateSubQuestion(
                                    index,
                                    subIndex,
                                    "marksPerQuestion",
                                    v,
                                  )
                                }
                              />
                            </div>

                            {/* Internal Choice */}
                            <div className="flex items-center justify-between">
                              <p className="text-sm text-slate-700">
                                Internal Choice
                              </p>
                              <button
                                onClick={() =>
                                  updateSubQuestion(
                                    index,
                                    subIndex,
                                    "hasInternalChoice",
                                    !sub.hasInternalChoice,
                                  )
                                }
                                className={`h-6 w-11 rounded-full ${
                                  sub.hasInternalChoice
                                    ? "bg-black"
                                    : "bg-slate-300"
                                }`}
                              />
                            </div>

                            {/* Difficulty */}
                            <div>
                              <p className="text-xs text-slate-500 mb-2">
                                Difficulty Distribution
                              </p>

                              {(["easy", "medium", "hard"] as const).map(
                                (lvl) => (
                                  <EditableSlider
                                    key={lvl}
                                    label={lvl}
                                    value={sub.difficultyMix[lvl]}
                                    onChange={(v) =>
                                      updateSubDifficulty(
                                        index,
                                        subIndex,
                                        lvl,
                                        v,
                                      )
                                    }
                                  />
                                ),
                              )}
                            </div>
                          </div>
                        ))}

                        <button
                          onClick={() => addSubQuestion(index)}
                          className="w-full rounded-xl border border-dashed border-slate-300 py-2 text-sm cursor-pointer"
                        >
                          + Add Sub Question
                        </button>
                      </div>
                    )}

                    {!section.hasSubQuestions &&
                      section.subQuestions.length === 0 && (
                        <>
                          {/* Question Type */}
                          <p className="text-xs text-slate-500 m-0">
                            Question Type
                          </p>
                          <div className="relative">
                            <select
                              value={section.questionType}
                              onChange={(e) =>
                                updateSection(
                                  index,
                                  "questionType",
                                  e.target.value,
                                )
                              }
                              className="mt-2 w-full h-11 rounded-xl border border-slate-300 px-4 pr-10 text-sm bg-white cursor-pointer appearance-none focus:outline-none focus:ring-2 focus:ring-black"
                            >
                              <option value="" disabled>
                                Select question type
                              </option>
                              <option>MCQ</option>
                              <option>Fill in the blanks</option>
                              <option>Short Answer</option>
                              <option>Long Answer</option>
                              <option>Short notes</option>
                            </select>

                            <span className="pointer-events-none absolute inset-y-0 top-2 right-3 flex items-center">
                              <ChevronDown
                                size={16}
                                className="text-slate-400"
                              />
                            </span>
                          </div>

                          {/* Numbers */}
                          <div className="grid grid-cols-3 gap-3">
                            <EditableNumber
                              label="Questions Given"
                              value={section.questionsToShow}
                              onChange={(v: number) =>
                                updateSection(index, "questionsToShow", v)
                              }
                            />

                            <EditableNumber
                              label="Attempt Any"
                              value={section.questionsToAttempt}
                              onChange={(v: number) =>
                                updateSection(index, "questionsToAttempt", v)
                              }
                            />

                            <EditableNumber
                              label="Marks Each"
                              value={section.marksPerQuestion}
                              onChange={(v: number) =>
                                updateSection(index, "marksPerQuestion", v)
                              }
                            />
                          </div>

                          {/* Choice */}
                          <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-4">
                            {/* Toggle Header */}
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium text-slate-900">
                                  Internal Choice
                                </p>
                                <p className="text-xs text-slate-500">
                                  Allow students to choose alternate questions
                                </p>
                              </div>

                              {/* Toggle Switch */}
                              <button
                                onClick={() =>
                                  updateSection(
                                    index,
                                    "hasInternalChoice",
                                    !section.hasInternalChoice,
                                  )
                                }
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition cursor-pointer ${
                                  section.hasInternalChoice
                                    ? "bg-black"
                                    : "bg-slate-300"
                                }`}
                              >
                                <span
                                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                                    section.hasInternalChoice
                                      ? "translate-x-6"
                                      : "translate-x-1"
                                  }`}
                                />
                              </button>
                            </div>

                            {/* Choice Type */}
                            {section.hasInternalChoice && (
                              <div className="space-y-2">
                                <p className="text-xs font-semibold uppercase text-slate-500">
                                  Choice Type
                                </p>

                                <div className="grid grid-cols-2 gap-2">
                                  {[
                                    {
                                      label: "OR",
                                      value: "or",
                                      desc: "Show alternate question",
                                    },
                                    {
                                      label: "ANY",
                                      value: "any",
                                      desc: "Attempt any subset",
                                    },
                                  ].map((opt) => (
                                    <button
                                      key={opt.value}
                                      onClick={() =>
                                        updateSection(
                                          index,
                                          "choiceType",
                                          opt.value,
                                        )
                                      }
                                      className={`rounded-xl border px-4 py-3 text-left transition cursor-pointer ${
                                        section.choiceType === opt.value
                                          ? "border-black bg-black text-white"
                                          : "border-slate-200 bg-white text-slate-800 hover:bg-slate-50"
                                      }`}
                                    >
                                      <p className="text-sm font-semibold">
                                        {opt.label}
                                      </p>
                                      <p
                                        className={`text-xs mt-0.5 ${
                                          section.choiceType === opt.value
                                            ? "text-white/70"
                                            : "text-slate-500"
                                        }`}
                                      >
                                        {opt.desc}
                                      </p>
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Difficulty Mix */}
                          <div>
                            <p className="text-xs text-slate-500 mb-2">
                              Difficulty Distribution
                            </p>

                            {(["easy", "medium", "hard"] as const).map(
                              (lvl) => (
                                <EditableSlider
                                  key={lvl}
                                  label={lvl}
                                  value={section.difficultyMix[lvl]}
                                  onChange={(v: number) =>
                                    updateDifficulty(index, lvl, v)
                                  }
                                />
                              ),
                            )}
                          </div>
                        </>
                      )}
                  </div>
                ))}

                {/* Add Section */}
                <button
                  onClick={addSection}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 border-dashed py-3 text-sm cursor-pointer"
                >
                  + Add Question
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-slate-200 flex gap-3">
            {step !== "form" && (
              <button
                onClick={() =>
                  setStep(step === "blueprint" ? "form" : "blueprint")
                }
                className="w-full rounded-xl border border-slate-300 py-3 text-sm font-medium text-slate-700 cursor-pointer"
              >
                ← Back
              </button>
            )}

            {step === "form" && (
              <button
                onClick={() => {
                  if (!selectedCourse) {
                    alert("Please select a course to proceed.");
                    return;
                  }
                  setStep("blueprint");
                }}
                className="w-full rounded-xl bg-black py-3 text-sm font-semibold text-white cursor-pointer"
              >
                Continue →
              </button>
            )}

            {/* {step === "confirm" && (
              <button
                onClick={() => setStep("params")}
                className="w-full rounded-xl bg-black py-3 text-sm font-semibold text-white cursor-pointer"
              >
                Next →
              </button>
            )} */}

            {step === "blueprint" && (
              <button
                onClick={handleGeneratePaper}
                className="w-full rounded-xl bg-black py-3 text-sm font-semibold text-white cursor-pointer"
              >
                Generate Paper
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const EditableField = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) => (
  <div>
    <label className="text-xs text-slate-500">{label}</label>
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="
        mt-1 w-full rounded-xl border border-slate-300
        px-4 py-2.5 text-sm
        focus:outline-none focus:ring-2 focus:ring-black
      "
    />
  </div>
);

const OptionCard = ({
  title,
  subtitle,
  active,
  onClick,
}: {
  title: string;
  subtitle?: string;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`
      rounded-xl border px-4 py-3 text-left transition cursor-pointer
      ${
        active
          ? "border-black bg-black text-white"
          : "border-slate-200 bg-slate-50 text-slate-800"
      }
    `}
  >
    <p className="text-sm font-medium">{title}</p>
    {subtitle && (
      <p
        className={`text-xs mt-0.5 ${active ? "text-white/70" : "text-slate-500"}`}
      >
        {subtitle}
      </p>
    )}
  </button>
);

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

const EditableNumber: React.FC<{
  label: string;
  value: number;
  onChange: (v: number) => void;
}> = ({ label, value, onChange }) => (
  <div>
    <p className="text-xs text-slate-500">{label}</p>
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
    />
  </div>
);

const EditableSlider: React.FC<{
  label: string;
  value: number;
  onChange: (v: number) => void;
}> = ({ label, value, onChange }) => (
  <div>
    <div className="flex justify-between text-xs">
      <span>{label}</span>
      <span>{value}%</span>
    </div>
    <input
      type="range"
      value={value}
      min={0}
      max={100}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full accent-black"
    />
  </div>
);

export default AutoGenerate;
