// models/subjectQuestionBank.ts
import mongoose, { Schema, Document, Model } from "mongoose";

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
  answer: string;
  source?: QuestionSource;
  options?: string[]; // only for MCQ
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

export interface SubjectQuestionBank extends Document {
  id: string;
  board: string; // "msbshse"
  medium: string; // "english"
  classKey: string; // "10"
  subjectSlug: string; // "science-technology-1"
  chapters: Chapter[];
}

// ---------------- SCHEMAS ----------------

const QuestionSchema = new Schema<Question>(
  {
    id: { type: String, required: true },
    type: {
      type: String,
      enum: ["mcq", "short", "long", "numerical"],
      required: true,
    },
    examSectionType: {
      type: String,
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: true,
    },
    marks: { type: Number, required: true },
    text: { type: String, required: true },
    answer: { type: String, required: true },
    imageUrl: { type: String },
    source: { type: String, default: "balbharati" },
    options: { type: [String], default: undefined },
    tags: { type: [String], default: [] },
  },
  { _id: false }
);

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
  { _id: false }
);

const SubjectQuestionBankSchema = new Schema<SubjectQuestionBank>(
  {
    id: { type: String, required: true, index: true },
    board: { type: String, required: true, index: true },
    medium: { type: String, required: true, index: true },
    classKey: { type: String, required: true, index: true },
    subjectSlug: { type: String, required: true, index: true },
    chapters: { type: [ChapterSchema], default: [] },
  },
  {
    timestamps: true,
  }
);

// avoid OverwriteModelError in Next.js
export const SubjectQuestionBankModel: Model<SubjectQuestionBank> =
  mongoose.models.SubjectQuestionBank ||
  mongoose.model<SubjectQuestionBank>(
    "SubjectQuestionBank",
    SubjectQuestionBankSchema
  );
