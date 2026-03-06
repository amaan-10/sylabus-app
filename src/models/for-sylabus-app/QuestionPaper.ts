import { Schema, Connection, Model, Document } from "mongoose";

export interface IQuestionPaper extends Document {
  userId?: string;

  meta: {
    board?: string;
    medium?: string;
    classKey?: string;
    subjectSlug?: string;
    subjectName?: string;
  };

  schoolName?: string;

  paperInfo: {
    schoolName?: string;
    className?: string;
    subjectName?: string;
    testName?: string;
    examDate?: string;
    time?: number;
    includeInstructions?: boolean;
    logo?: string;
    watermark?: string;
  };

  paperMode: "exam" | "custom";

  questions: any[];

  examSections?: any;

  totalMarks?: number;

  createdAt?: Date;
}

const QuestionSchema = new Schema(
  {
    id: String,
    text: String,
    type: String,
    marks: Number,
    difficulty: String,
    options: [String],
    answer: String,
    explanation: String,
    source: String,
  },
  { _id: false },
);

const QuestionPaperSchema = new Schema<IQuestionPaper>(
  {
    userId: { type: String, index: true },

    meta: {
      board: String,
      medium: String,
      classKey: String,
      subjectSlug: String,
      subjectName: String,
    },

    schoolName: String,

    paperInfo: {
      schoolName: String,
      className: String,
      subjectName: String,
      testName: String,
      examDate: String,
      time: Number,
      includeInstructions: Boolean,
      logo: String,
      watermark: String,
    },

    paperMode: {
      type: String,
      enum: ["exam", "custom"],
      required: true,
    },

    questions: [QuestionSchema],

    examSections: Schema.Types.Mixed,

    totalMarks: Number,
  },
  { timestamps: true },
);

/* ✅ connection-based model */
export const getQuestionPaperModel = (
  conn: Connection,
): Model<IQuestionPaper> => {
  return (
    conn.models.QuestionPaper ||
    conn.model<IQuestionPaper>("QuestionPaper", QuestionPaperSchema)
  );
};
