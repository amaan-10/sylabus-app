// lib/chapters.ts

import type { BoardSlug, MediumSlug, ClassKey, Subject } from "./subjects";

// Basic question types for your platform
export type QuestionType = "mcq" | "short" | "long" | "true-false" | "fill";

// Difficulty levels
export type Difficulty = "easy" | "medium" | "hard";

// A single question inside a chapter
export interface Question {
  id: string;               // unique per chapter (e.g. "q1")
  type: QuestionType;
  difficulty: Difficulty;
  marks: number;
  text: string;
  options?: string[];       // for MCQ / True-False
  answer?: string;          // expected answer or correct option
  explanation?: string;     // optional explanation
  tags?: string[];          // e.g. ["algebra", "conceptual"]
}

// A chapter within a subject
export interface Chapter {
  id: string;               // unique within subject (e.g. "ch1")
  chapterNumber: number;
  title: string;
  slug: string;             // URL-safe (e.g. "number-systems")
  description?: string;
  topics?: string[];
  learningObjectives?: string[];
  questions: Question[];
}

// A mapping of (board + medium + class + subject) → chapters
export interface SubjectChapters {
  board: BoardSlug;
  medium: MediumSlug | "all"; // "all" = applies to all mediums of that board
  classKey: ClassKey;
  subjectSlug: string;        // must match Subject.slug from subjects.ts
  chapters: Chapter[];
}

// Helper to create slug from string
const slugify = (value: string): string =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// Helper to build simple question IDs
const qId = (chapterId: string, index: number) => `${chapterId}-q${index + 1}`;

// -----------------------------------------------------------------------------
// MAIN DATA
// NOTE: This is a *starting dataset* with example chapters/questions.
//       You can keep pushing more entries to this array per subject.
// -----------------------------------------------------------------------------

export const SUBJECT_CHAPTERS: SubjectChapters[] = [
  // ===========================================================================
  // ICSE – All Mediums – Example: Class 8, 9, 10 (English, Maths, Physics)
  // ===========================================================================

  // ICSE Class 8 – Mathematics
  {
    board: "icse",
    medium: "all",
    classKey: "8",
    subjectSlug: "mathematics", // from subjects.ts slug
    chapters: [
      {
        id: "icse-8-maths-ch1",
        chapterNumber: 1,
        title: "Rational Numbers",
        slug: slugify("Rational Numbers"),
        description: "Introduction to rational numbers and their properties.",
        topics: ["Number line", "Operations on rational numbers"],
        learningObjectives: [
          "Represent rational numbers on the number line",
          "Perform operations with rational numbers",
        ],
        questions: [
          {
            id: qId("icse-8-maths-ch1", 0),
            type: "mcq",
            difficulty: "easy",
            marks: 1,
            text: "Which of the following is a rational number?",
            options: ["√2", "π", "3/4", "√5"],
            answer: "3/4",
            explanation: "A rational number can be expressed as p/q where q ≠ 0.",
            tags: ["concept", "definition"],
          },
          {
            id: qId("icse-8-maths-ch1", 1),
            type: "short",
            difficulty: "medium",
            marks: 2,
            text: "Add 3/5 and 2/15 and simplify your answer.",
            answer: "11/15",
            explanation: "LCM of 5 and 15 is 15. 3/5 = 9/15, so 9/15 + 2/15 = 11/15.",
            tags: ["addition", "fractions"],
          },
        ],
      },
      {
        id: "icse-8-maths-ch2",
        chapterNumber: 2,
        title: "Algebraic Expressions",
        slug: slugify("Algebraic Expressions"),
        description: "Basics of algebraic expressions and simplification.",
        topics: ["Like & unlike terms", "Addition & subtraction of expressions"],
        learningObjectives: [
          "Identify like and unlike terms",
          "Simplify algebraic expressions",
        ],
        questions: [
          {
            id: qId("icse-8-maths-ch2", 0),
            type: "short",
            difficulty: "easy",
            marks: 2,
            text: "Simplify: 3x + 5x - 2x",
            answer: "6x",
            explanation: "3x + 5x - 2x = (3+5-2)x = 6x.",
            tags: ["algebra", "simplification"],
          },
        ],
      },
    ],
  },

  // ICSE Class 10 – Physics
  {
    board: "icse",
    medium: "all",
    classKey: "10",
    subjectSlug: "physics",
    chapters: [
      {
        id: "icse-10-phy-ch1",
        chapterNumber: 1,
        title: "Force and Pressure",
        slug: slugify("Force and Pressure"),
        description: "Understanding different types of forces and pressure.",
        topics: ["Balanced and unbalanced forces", "Pressure in fluids"],
        learningObjectives: [
          "Classify different types of forces",
          "Explain pressure in solids, liquids and gases",
        ],
        questions: [
          {
            id: qId("icse-10-phy-ch1", 0),
            type: "mcq",
            difficulty: "easy",
            marks: 1,
            text: "SI unit of force is:",
            options: ["dyne", "newton", "joule", "pascal"],
            answer: "newton",
            explanation: "The SI unit of force is newton (N).",
            tags: ["units", "basic"],
          },
          {
            id: qId("icse-10-phy-ch1", 1),
            type: "long",
            difficulty: "medium",
            marks: 5,
            text: "Explain with example how pressure changes with area on which a force acts.",
            answer:
              "Pressure is inversely proportional to the area. For the same force, smaller area means more pressure. Example: a sharp knife cuts better than a blunt knife.",
            tags: ["pressure", "conceptual"],
          },
        ],
      },
    ],
  },

  // ===========================================================================
  // MSBSHSE – All Mediums – Example: 10th Science, 11th Science, 12th Commerce
  // ===========================================================================

  // MSBSHSE Class 10 – Science
  {
    board: "msbshse",
    medium: "all",
    classKey: "10",
    subjectSlug: "science-technology",
    chapters: [
      {
        id: "ms-10-sci-ch1",
        chapterNumber: 1,
        title: "Chemical Reactions and Equations",
        slug: slugify("Chemical Reactions and Equations"),
        description:
          "Basic types of chemical reactions and balancing of equations.",
        topics: ["Types of reactions", "Balancing equations", "Oxidation & reduction"],
        learningObjectives: [
          "Identify different types of chemical reactions",
          "Balance simple chemical equations",
        ],
        questions: [
          {
            id: qId("ms-10-sci-ch1", 0),
            type: "short",
            difficulty: "easy",
            marks: 2,
            text: "Define a chemical equation with one example.",
            answer:
              "A chemical equation is a symbolic representation of a chemical reaction. Example: 2H₂ + O₂ → 2H₂O.",
            tags: ["definition", "equation"],
          },
          {
            id: qId("ms-10-sci-ch1", 1),
            type: "mcq",
            difficulty: "easy",
            marks: 1,
            text: "Which of the following is a combination reaction?",
            options: [
              "2H₂ + O₂ → 2H₂O",
              "CaCO₃ → CaO + CO₂",
              "2KClO₃ → 2KCl + 3O₂",
              "Zn + 2HCl → ZnCl₂ + H₂",
            ],
            answer: "2H₂ + O₂ → 2H₂O",
            tags: ["types-of-reaction"],
          },
        ],
      },
    ],
  },

  // MSBSHSE Class 11 – Science – Physics
  {
    board: "msbshse",
    medium: "all",
    classKey: "11-science",
    subjectSlug: "physics",
    chapters: [
      {
        id: "ms-11-phy-ch1",
        chapterNumber: 1,
        title: "Units and Measurements",
        slug: slugify("Units and Measurements"),
        description:
          "Fundamental and derived units, measurement of physical quantities.",
        topics: ["SI units", "Significant figures", "Dimensional analysis"],
        learningObjectives: [
          "Recall base and derived units in SI",
          "Solve problems using dimensional analysis",
        ],
        questions: [
          {
            id: qId("ms-11-phy-ch1", 0),
            type: "mcq",
            difficulty: "easy",
            marks: 1,
            text: "Which of the following is NOT a base quantity in SI?",
            options: ["Length", "Mass", "Time", "Velocity"],
            answer: "Velocity",
            tags: ["units"],
          },
        ],
      },
    ],
  },

  // MSBSHSE Class 12 – Commerce – Accountancy
  {
    board: "msbshse",
    medium: "all",
    classKey: "12-commerce",
    subjectSlug: "accountancy",
    chapters: [
      {
        id: "ms-12-acct-ch1",
        chapterNumber: 1,
        title: "Partnership Final Accounts",
        slug: slugify("Partnership Final Accounts"),
        description: "Preparation of final accounts of partnership firms.",
        topics: ["Profit & Loss Appropriation", "Partners' capital accounts"],
        learningObjectives: [
          "Prepare profit and loss appropriation account",
          "Understand adjustments related to partners",
        ],
        questions: [
          {
            id: qId("ms-12-acct-ch1", 0),
            type: "long",
            difficulty: "hard",
            marks: 8,
            text:
              "A and B are partners sharing profits in the ratio of 3:2. Prepare Profit & Loss Appropriation Account given suitable figures and adjustments.",
            tags: ["final-accounts", "partnership"],
          },
        ],
      },
    ],
  },

  // ===========================================================================
  // CBSE – English Medium – Example: 10th Maths, 12th Science Physics
  // ===========================================================================

  // CBSE Class 10 – Mathematics
  {
    board: "cbse",
    medium: "english",
    classKey: "10",
    subjectSlug: "mathematics",
    chapters: [
      {
        id: "cbse-10-maths-ch1",
        chapterNumber: 1,
        title: "Real Numbers",
        slug: slugify("Real Numbers"),
        description: "Number system, Euclid’s division lemma and applications.",
        topics: ["Euclid's division lemma", "HCF & LCM", "Irrational numbers"],
        learningObjectives: [
          "Apply Euclid's division lemma to find HCF",
          "Understand representation of irrational numbers",
        ],
        questions: [
          {
            id: qId("cbse-10-maths-ch1", 0),
            type: "short",
            difficulty: "medium",
            marks: 3,
            text: "Use Euclid's division lemma to find the HCF of 56 and 96.",
            answer: "8",
            tags: ["hcf", "euclid-lemma"],
          },
          {
            id: qId("cbse-10-maths-ch1", 1),
            type: "true-false",
            difficulty: "easy",
            marks: 1,
            text: "√3 is a rational number. True or False?",
            options: ["True", "False"],
            answer: "False",
            explanation: "√3 cannot be expressed as p/q, so it is irrational.",
            tags: ["irrational"],
          },
        ],
      },
    ],
  },

  // CBSE Class 12 – Science – Physics
  {
    board: "cbse",
    medium: "english",
    classKey: "12-science",
    subjectSlug: "physics",
    chapters: [
      {
        id: "cbse-12-phy-ch1",
        chapterNumber: 1,
        title: "Electric Charges and Fields",
        slug: slugify("Electric Charges and Fields"),
        description: "Basics of electrostatics, Coulomb's law, electric field.",
        topics: [
          "Electric charge",
          "Coulomb's law",
          "Electric field and field lines",
        ],
        learningObjectives: [
          "State and apply Coulomb's law",
          "Define electric field intensity",
        ],
        questions: [
          {
            id: qId("cbse-12-phy-ch1", 0),
            type: "mcq",
            difficulty: "easy",
            marks: 1,
            text: "SI unit of electric charge is:",
            options: ["Coulomb", "Ampere", "Volt", "Ohm"],
            answer: "Coulomb",
            tags: ["units", "electrostatics"],
          },
          {
            id: qId("cbse-12-phy-ch1", 1),
            type: "long",
            difficulty: "hard",
            marks: 5,
            text:
              "State Coulomb's law in electrostatics and explain the vector form of the law.",
            tags: ["derivation", "theory"],
          },
        ],
      },
    ],
  },

  // ===========================================================================
  // CBSE – Hindi Medium – Example: Class 9 Science
  // ===========================================================================

  {
    board: "cbse",
    medium: "hindi",
    classKey: "9",
    subjectSlug: "विज्ञान-science",
    chapters: [
      {
        id: "cbse-9-sci-hindi-ch1",
        chapterNumber: 1,
        title: "हमारा आस-पास का पदार्थ (Matter in Our Surroundings)",
        slug: slugify("Matter in Our Surroundings"),
        description: "पदार्थ की अवस्थाएँ, ठोस, द्रव और गैस की विशेषताएँ।",
        topics: ["ठोस, द्रव, गैस", "पदार्थ की अवस्था परिवर्तन"],
        learningObjectives: [
          "पदार्थ की तीन अवस्थाओं की व्याख्या करना",
          "तापमान और दाब के प्रभाव को समझना",
        ],
        questions: [
          {
            id: qId("cbse-9-sci-hindi-ch1", 0),
            type: "short",
            difficulty: "easy",
            marks: 2,
            text: "ठोस और द्रव के बीच दो अंतर लिखिए।",
            tags: ["basic", "states-of-matter"],
          },
        ],
      },
    ],
  },
];

// -----------------------------------------------------------------------------
// HELPERS
// -----------------------------------------------------------------------------

/**
 * Get all chapters for a given board + medium + class + subjectSlug
 * Falls back to medium "all" for that board if exact medium not found.
 */
export const getChaptersFor = (
  board: BoardSlug,
  medium: MediumSlug,
  classKey: ClassKey,
  subjectSlug: string
): Chapter[] => {
  // Try exact (board + medium + class + subject)
  const exact = SUBJECT_CHAPTERS.find(
    (entry) =>
      entry.board === board &&
      entry.medium === medium &&
      entry.classKey === classKey &&
      entry.subjectSlug === subjectSlug
  );
  if (exact) return exact.chapters;

  // Fallback: "all" mediums for that board
  const fallback = SUBJECT_CHAPTERS.find(
    (entry) =>
      entry.board === board &&
      entry.medium === "all" &&
      entry.classKey === classKey &&
      entry.subjectSlug === subjectSlug
  );
  return fallback ? fallback.chapters : [];
};

/**
 * Get a single chapter by its slug
 */
export const getChapterBySlug = (
  board: BoardSlug,
  medium: MediumSlug,
  classKey: ClassKey,
  subjectSlug: string,
  chapterSlug: string
): Chapter | undefined => {
  const chapters = getChaptersFor(board, medium, classKey, subjectSlug);
  return chapters.find((ch) => ch.slug === chapterSlug);
};
