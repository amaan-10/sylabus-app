// models/QuestionPaper.ts
import mongoose, { Schema, Types } from "mongoose";

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
  { _id: false }
);

const QuestionPaperSchema = new Schema(
  {
    // ownership (optional but future-proof)
    userId: { type: String, index: true }, // Firebase UID / Clerk / Auth ID

    meta: {
      board: String,
      medium: String,
      classKey: String,
      subjectSlug: String,
      subjectName: String,
    },

    schoolName: String,

    paperMode: {
      type: String,
      enum: ["exam", "custom"],
      required: true,
    },

    questions: [QuestionSchema],

    examSections: Schema.Types.Mixed, // sectionedSelected (for exam mode)

    totalMarks: Number,

    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.QuestionPaper ||
  mongoose.model("QuestionPaper", QuestionPaperSchema);
