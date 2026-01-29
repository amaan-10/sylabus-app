import { BoardSlug, MediumSlug, ClassKey, Subject } from "@/lib/subjects";
import { Section } from "@/models/subjectQuestionBank";

export type QuestionSource = "balbharati" | "pyq";

export type Question = {
  id: string;
  type: string;
  examSectionType?: string;
  difficulty: string | "easy" | "medium" | "hard";
  marks: number;
  text: string;
  options?: string[];
  answer?: string;
  explanation?: string;
  tags?: string[];
  source?: QuestionSource;
  imageUrl?: string;
};

export interface Chapter {
  id: string;
  chapterNumber: number;
  title: string;
  slug: string;
  description?: string;
  topics?: string[];
  learningObjectives?: string[];
  questions: Question[];
}

export type UserData = {
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

export type PaperMode = "exam" | "custom";

export type SectionedSelection = Record<string, Question[]>;
// key = section.key (A1, A2, B, C, D)

export type ScienceSubjectKey = "physics" | "chemistry" | "biology";

export const questionTypeToSlug = (label: string): string => {
  const shortMap: Record<string, string> = {
    mcq: "mcq",
    "very short answer": "very-short",
    "short answer": "short",
    "short answer 1": "short-1",
    "short answer 2": "short-2",
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

export const getQuestionTypesForSubject = (
  subject: Subject,
  source: QuestionSource,
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

export const capitalize = (s: string) =>
  s ? s.charAt(0).toUpperCase() + s.slice(1) : s;

export const resolveBoardSlug = (abbreviation: string): BoardSlug | null => {
  const abbr = abbreviation.toLowerCase();
  if (abbr.includes("cbse")) return "cbse";
  if (abbr.includes("msbshse") || abbr.includes("maharashtra"))
    return "msbshse";
  if (abbr.includes("icse") || abbr.includes("cisce")) return "icse";
  return null;
};

export const getClassLabel = (classKey: ClassKey): string => {
  if (classKey === "8" || classKey === "9" || classKey === "10") {
    return `Class ${classKey}`;
  }
  const [std, stream] = classKey.split("-");
  const stdLabel = `Class ${std}`;
  const streamLabel = getStreamLabel(
    stream as "science" | "commerce" | "arts" | "humanities" | "all",
  );
  return `${stdLabel} - ${streamLabel}`;
};

export const getClassLabelforPaper = (classKey: ClassKey): string => {
  if (classKey === "8" || classKey === "9" || classKey === "10") {
    return `${classKey}`;
  }
  const [std, stream] = classKey.split("-");
  const stdLabel = `${std}`;
  const streamLabel = getStreamLabel(
    stream as "science" | "commerce" | "arts" | "humanities" | "all",
  );
  return `${stdLabel}th ${streamLabel}`;
};

export const getStreamLabel = (
  stream: "science" | "commerce" | "arts" | "humanities" | "all",
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

export const getChaptersFor = async (
  board: BoardSlug,
  medium: MediumSlug,
  classKey: ClassKey,
  subjectSlug: string,
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

const ALLOWED_SUBJECTS = ["english", "hindi", "marathi"] as const;

export const getSectionsFor = async (
  board: BoardSlug,
  medium: MediumSlug,
  classKey: ClassKey,
  subjectSlug: string,
): Promise<Section[]> => {
  // 🔐 Guard: only language subjects
  if (!ALLOWED_SUBJECTS.includes(subjectSlug as any)) {
    console.warn(
      `getSectionsFor skipped: subject "${subjectSlug}" has no sections`,
    );
    return [];
  }

  const params = new URLSearchParams({
    board,
    medium,
    classKey,
    subjectSlug,
  });

  try {
    const res = await fetch(`/api/sections?${params.toString()}`);

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      console.error("getSectionsFor error:", res.status, body);
      return [];
    }

    const data = await res.json();
    return (data.sections as Section[]) || [];
  } catch (err) {
    console.error("getSectionsFor fetch error:", err);
    return [];
  }
};

export const prettifyType = (t?: string): string => {
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
    "short-1": "Short answer 1",
    "short-2": "Short answer 2",

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

export const truncate = (s: string, n = 60) =>
  s.length > n ? s.slice(0, n - 1).trim() + "…" : s;
