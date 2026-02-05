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

  const instituteParam = searchParams.get("institute");
  const programParam = searchParams.get("program");
  const semesterParam = searchParams.get("semester");
  const patternParam = searchParams.get("pattern");
  const paperParam = searchParams.get("paper");
  const paperCodeParam = searchParams.get("paperCode");
  const difficultyParam = searchParams.get("difficulty");
  const pyqPercentParam = searchParams.get("pyqPercent");

  const isSelectionComplete =
    !!instituteParam &&
    !!programParam &&
    !!semesterParam &&
    !!patternParam &&
    !!paperParam &&
    !!paperCodeParam &&
    !!difficultyParam &&
    !!pyqPercentParam;

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
      instituteParam={instituteParam}
      programParam={programParam}
      semesterParam={semesterParam}
      patternParam={patternParam}
      paperParam={paperParam}
      paperCodeParam={paperCodeParam}
      difficultyParam={difficultyParam}
      pyqPercentParam={pyqPercentParam}
    />
  );
};

/* ---------------------- Custom Paper Builder Component ---------------------- */

type BuilderProps = {
  instituteParam: string;
  programParam: string;
  semesterParam: string;
  patternParam: string;
  paperParam: string;
  paperCodeParam: string;
  difficultyParam: string;
  pyqPercentParam: string;
};

const AutoGenerateBuilder: React.FC<BuilderProps> = ({
  instituteParam,
  programParam,
  semesterParam,
  patternParam,
  paperParam,
  paperCodeParam,
  difficultyParam,
  pyqPercentParam,
}) => {
  return (
    <>
      <section className="relative flex flex-row flex-nowrap flex-[1_0_0] items-start content-start justify-center gap-14 w-px min-h-screen h-min rounded-2xl bg-slate-50 md:border border-[rgba(0,0,0,0.08)] overflow-hidden p-[40px_8px_120px] md:p-[40px_32px_32px] will-change-transform">
        <div className="w-full">
          <LoaderWrapper isLoading={false}>
            <div>Auto Genrate paper</div>
            {instituteParam}, {programParam}, {semesterParam}, {patternParam},{" "}
            {paperParam}, {paperCodeParam}, {difficultyParam}, {pyqPercentParam}
          </LoaderWrapper>
        </div>
      </section>
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

const SelectionGate = () => {
  const router = useRouter();

  const [step, setStep] = useState<"form" | "blueprint">("form");
  const [selectionOpen, setSelectionOpen] = useState(true);

  type BlueprintSection = {
    sectionTitle: string;
    questionType: string;
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

  const [blueprint, setBlueprint] = useState<BlueprintSection[]>([
    {
      sectionTitle: "Section A",
      questionType: "MCQ",
      questionsToShow: 10,
      questionsToAttempt: 10,
      marksPerQuestion: 1,
      hasInternalChoice: false,
      choiceType: "none", // or | any
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

  const [programId, setProgramId] = useState("");
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
    if (!courseQuery || !programId || !semester) {
      setCourseResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        setCourseLoading(true);

        const res = await fetch(
          `/api/institute/search/course?programId=${programId}&semester=${semester}&q=${courseQuery}`,
        );

        const data = await res.json();
        setCourseResults(Array.isArray(data) ? data : []);
      } catch {
        setCourseResults([]);
      } finally {
        setCourseLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [courseQuery, programId, semester]);

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

  const addSection = () => {
    setBlueprint((prev) => [
      ...prev,
      {
        sectionTitle: "New Section",
        questionType: "Short Answer",
        questionsToShow: 5,
        questionsToAttempt: 5,
        marksPerQuestion: 2,
        hasInternalChoice: false,
        choiceType: "none",
        difficultyMix: { easy: 40, medium: 40, hard: 20 },
      },
    ]);
  };

  const removeSection = (index: number) => {
    setBlueprint((prev) => prev.filter((_, i) => i !== index));
  };

  const handleGeneratePaper = async () => {
    const res = await fetch("/api/institute/paper/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        program: selectedProgram._id,
        semester,
        course: selectedCourse.courseCode,
        blueprint,
      }),
    });

    const data = await res.json();

    console.log("Generated Paper", data);
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
                <div className="flex gap-4">
                  {/* Program */}
                  <div className="relative">
                    <label className="text-xs font-semibold uppercase text-slate-500 mb-1">
                      Program
                    </label>

                    <input
                      value={
                        selectedProgram ? selectedProgram.program : programQuery
                      }
                      onChange={(e) => {
                        setSelectedProgram(null);
                        setProgramId("");
                        setProgramQuery(e.target.value);
                      }}
                      placeholder="Search program (e.g. Botany)"
                      className="mt-2 w-full h-11 rounded-xl border border-slate-300 px-4 text-sm
                           focus:outline-none focus:ring-2 focus:ring-black"
                    />

                    {(programResults.length > 0 || programLoading) &&
                      !selectedProgram && (
                        <div className="absolute z-30 mt-2 w-full rounded-xl border border-slate-200 bg-white shadow-lg max-h-60 overflow-auto">
                          {programLoading && (
                            <div className="px-4 py-3 text-sm text-slate-500">
                              Searching…
                            </div>
                          )}

                          {programResults.map((p) => (
                            <div
                              key={p._id}
                              onClick={() => {
                                setSelectedProgram(p);
                                setProgramId(p._id);
                                setProgramQuery("");
                                setProgramResults([]);
                              }}
                              className="cursor-pointer px-4 py-3 hover:bg-slate-100"
                            >
                              <div className="text-sm font-medium text-slate-900">
                                {p.program}
                              </div>
                              <div className="text-xs text-slate-500">
                                {p.degree} • {p.stream} • {p.academicLevel}
                              </div>
                            </div>
                          ))}

                          {!programLoading && programResults.length === 0 && (
                            <div className="px-4 py-3 text-sm text-slate-500">
                              No programs found
                            </div>
                          )}
                        </div>
                      )}
                  </div>

                  {/* Semester */}
                  <div>
                    <label className="text-xs font-semibold uppercase text-slate-500 mb-1">
                      Semester
                    </label>

                    <div className="relative">
                      <select
                        value={semester}
                        onChange={(e) => setSemester(e.target.value)}
                        className="mt-2 w-full h-11 rounded-xl border border-slate-300 px-4 pr-10 text-sm bg-white cursor-pointer appearance-none focus:outline-none focus:ring-2 focus:ring-black"
                      >
                        <option value="" disabled>
                          Select semester
                        </option>

                        {[1, 2, 3, 4, 5, 6].map((s) => (
                          <option key={s} value={String(s)}>
                            Semester {toRoman(s)}
                          </option>
                        ))}
                      </select>

                      <span className="pointer-events-none absolute inset-y-0 top-2 right-3 flex items-center">
                        <ChevronDown size={16} className="text-slate-400" />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Course Search */}
                <div className="mt-6 relative">
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
                    placeholder="Search course code (e.g. 23SBBO11SE)"
                    className="mt-2 w-full h-11 rounded-xl border border-slate-300 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                  />

                  {/* Dropdown */}
                  {(courseResults.length > 0 || courseLoading) &&
                    !selectedCourse && (
                      <div className="absolute z-50 mt-2 w-full rounded-xl border border-slate-200 bg-white shadow-lg max-h-60 overflow-auto">
                        {courseLoading && (
                          <div className="px-4 py-3 text-sm text-slate-500">
                            Searching…
                          </div>
                        )}

                        {courseResults.map((c) => (
                          <div
                            key={c._id}
                            onClick={() => {
                              setSelectedCourse(c);
                              setCourseQuery("");
                              setCourseResults([]);
                            }}
                            className="cursor-pointer px-4 py-3 hover:bg-slate-100"
                          >
                            <div className="text-sm font-medium text-slate-900">
                              {c.courseCode}
                            </div>

                            <div className="text-xs text-slate-500">
                              {c.courseTitle} • {c.credits} Credits
                            </div>
                          </div>
                        ))}

                        {!courseLoading && courseResults.length === 0 && (
                          <div className="px-4 py-3 text-sm text-slate-500">
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
                          {selectedProgram
                            ? `${selectedProgram.degree} ${selectedProgram.program}`
                            : "Program not selected"}
                        </p>

                        <p className="text-xs text-slate-500">
                          {selectedProgram
                            ? `${selectedProgram.stream} • Semester ${semester || "—"}`
                            : "Select program & semester first"}
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
                            ? `${selectedCourse.courseCode} • ${selectedCourse.credits} Credits`
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
                        Section {index + 1}
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
                      placeholder="Section Title"
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm"
                    />

                    {/* Question Type */}
                    <div className="relative">
                      <select
                        value={section.questionType}
                        onChange={(e) =>
                          updateSection(index, "questionType", e.target.value)
                        }
                        className="mt-2 w-full h-11 rounded-xl border border-slate-300 px-4 pr-10 text-sm bg-white cursor-pointer appearance-none focus:outline-none focus:ring-2 focus:ring-black"
                      >
                        <option>MCQ</option>
                        <option>Short Answer</option>
                        <option>Long Answer</option>
                        <option>Case Study</option>
                        <option>Diagram</option>
                      </select>

                      <span className="pointer-events-none absolute inset-y-0 top-2 right-3 flex items-center">
                        <ChevronDown size={16} className="text-slate-400" />
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
                                  updateSection(index, "choiceType", opt.value)
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

                      {(["easy", "medium", "hard"] as const).map((lvl) => (
                        <EditableSlider
                          key={lvl}
                          label={lvl}
                          value={section.difficultyMix[lvl]}
                          onChange={(v: number) =>
                            updateDifficulty(index, lvl, v)
                          }
                        />
                      ))}
                    </div>
                  </div>
                ))}

                {/* Add Section */}
                <button
                  onClick={addSection}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 border-dashed py-3 text-sm cursor-pointer"
                >
                  + Add Section
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
                onClick={() => setStep("blueprint")}
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
