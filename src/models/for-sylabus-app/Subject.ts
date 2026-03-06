import { Schema, Connection, Model, Document } from "mongoose";

interface Subject extends Document {
  id: string;
  board: string;
  medium: string;
  classKey: string;
  subjectSlug: string;
  programOutcomes: string[];
  taxonomySet: any[];
  chapters: any[];
  createdAt?: Date;
  updatedAt?: Date;
}

const QuestionSchema = new Schema(
  {
    id: String,
    type: String,
    difficulty: String,
    courseOutcomes: String,
    taxonomy: String,
    marks: Number,
    text: String,
    options: [String],
    answer: String,
    tags: [String],
    imageUrl: String,
    subQuestions: [String],
    createdBy: String,
    author: String,
  },
  { _id: false },
);

const ChapterSchema = new Schema(
  {
    id: String,
    chapterNumber: Number,
    title: String,
    slug: String,
    description: String,
    topics: [String],
    learningObjectives: [String],
    courseOutcomes: [String],
    questions: [QuestionSchema],
  },
  { _id: false },
);

const taxonomySchema = new Schema(
  {
    level: String,
    name: String,
    description: String,
    actionVerbs: [String],
  },
  { _id: false },
);

const SubjectSchema = new Schema<Subject>(
  {
    id: String,
    board: String,
    medium: String,
    classKey: String,
    subjectSlug: String,
    programOutcomes: [String],
    taxonomySet: [taxonomySchema],
    chapters: [ChapterSchema],
  },
  { timestamps: true },
);

/* ✅ connection-based model */
export const getSubjectModel = (conn: Connection): Model<Subject> => {
  return conn.models.Subject || conn.model<Subject>("Subject", SubjectSchema);
};
