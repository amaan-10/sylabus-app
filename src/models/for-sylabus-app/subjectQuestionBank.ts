import { Schema, Document, Model, Connection } from "mongoose";

export type QuestionType =
  | "mcq"
  | "true-false"
  | "fill"
  | "very-short"
  | "short"
  | "long"
  | "numerical"
  | "diagram"
  | "match"
  | "case-study"
  | "word-problem"
  | "short-note"
  | "activity";

export type Difficulty = "easy" | "medium" | "hard";
export type QuestionSource = "balbharati" | "pyq";

export interface Question {
  id: string;
  type: QuestionType;
  examSectionType?: string;
  difficulty: Difficulty;
  marks: number;
  text: string;
  subQuestions?: Question[];
  answer?: string;
  source?: QuestionSource;
  options?: string[];
  columnA?: any;
  columnB?: any;
  tags: string[];
  imageUrl?: string;
}

export interface Chapter {
  id: string;
  chapterNumber: number;
  title: string;
  slug: string;
  description: string;
  topics: string[];
  learningObjectives: string[];
  questions: Question[];
}

export interface SectionQuestion {
  id: string;
  type: string;
  examSectionType: string;
  passageText?: string;
  marks: number;
  difficulty: Difficulty;
  question?: string;
  answer?: string;
  source?: QuestionSource;
  options?: string[];
  columnA?: any;
  columnB?: any;
  imageUrl?: string;
  subQuestions?: Question[];
  tags: string[];
}

export interface Section {
  id: string;
  sectionType: string;
  title: string;
  slug: string;
  description?: string;
  questions: SectionQuestion[];
  tags: string[];
}

export interface SubjectQuestionBank extends Document {
  id: string;
  board: string;
  medium: string;
  classKey: string;
  subjectSlug: string;
  subjectType: "language" | "academic";
  chapters?: Chapter[];
  sections?: Section[];
}

/* ---------------- SCHEMAS ---------------- */

const QuestionSchema = new Schema<Question>(
  {
    id: { type: String, required: true },
    type: { type: String, required: true },
    examSectionType: { type: String },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: true,
    },
    marks: { type: Number, required: true },
    text: { type: String, required: true },
    answer: String,
    imageUrl: String,
    source: { type: String, default: "balbharati" },
    options: { type: [String], default: undefined },
    columnA: { type: Object },
    columnB: { type: Object },
    tags: { type: [String], default: [] },
  },
  { _id: false },
);

QuestionSchema.add({
  subQuestions: {
    type: [QuestionSchema],
    default: undefined,
  },
});

const ChapterSchema = new Schema<Chapter>(
  {
    id: { type: String, required: true },
    chapterNumber: { type: Number, required: true },
    title: { type: String, required: true },
    slug: { type: String, required: true },
    description: { type: String, required: true },
    topics: { type: [String], default: [] },
    learningObjectives: { type: [String], default: [] },
    questions: { type: [QuestionSchema], default: [] },
  },
  { _id: false },
);

const SectionQuestionSchema = new Schema<SectionQuestion>(
  {
    id: { type: String, required: true },
    type: { type: String, required: true },
    examSectionType: String,
    passageText: String,
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: true,
    },
    marks: { type: Number, required: true },
    question: String,
    answer: String,
    columnA: Object,
    columnB: Object,
    imageUrl: String,
    source: { type: String, default: "balbharati" },
    options: { type: [String], default: undefined },
    subQuestions: { type: [QuestionSchema] },
    tags: { type: [String], default: [] },
  },
  { _id: false },
);

const SectionSchema = new Schema<Section>(
  {
    id: { type: String, required: true },
    sectionType: { type: String, required: true },
    title: { type: String, required: true },
    slug: { type: String, required: true },
    description: String,
    questions: { type: [SectionQuestionSchema], default: [] },
    tags: { type: [String], default: [] },
  },
  { _id: false },
);

const SubjectQuestionBankSchema = new Schema<SubjectQuestionBank>(
  {
    id: { type: String, required: true, index: true },
    board: { type: String, required: true, index: true },
    medium: { type: String, required: true, index: true },
    classKey: { type: String, required: true, index: true },
    subjectSlug: { type: String, required: true, index: true },

    subjectType: {
      type: String,
      enum: ["language", "academic"],
      required: true,
    },

    chapters: { type: [ChapterSchema], default: undefined },
    sections: { type: [SectionSchema], default: undefined },
  },
  { timestamps: true },
);

/* ✅ connection-based model */
export const getSubjectQuestionBankModel = (
  conn: Connection,
): Model<SubjectQuestionBank> => {
  return (
    conn.models.SubjectQuestionBank ||
    conn.model<SubjectQuestionBank>(
      "SubjectQuestionBank",
      SubjectQuestionBankSchema,
    )
  );
};
