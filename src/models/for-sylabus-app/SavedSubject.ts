// models/SavedSubject.ts
import mongoose, { Schema } from "mongoose";

const SavedSubjectSchema = new Schema(
  {
    userId: { type: String, required: true, index: true },

    subjectId: {
      type: String,
      required: true,
    },

    subjectData: {
      id: String,
      title: String,
      imgSrc: String,
      imgAlt: String,
      board: String,
      medium: String,
      classLevel: String,
      chapterCount: Number,
      questionCount: Number,
      link: String,
    },
  },
  { timestamps: true }
);

// Prevent duplicates
SavedSubjectSchema.index({ userId: 1, subjectId: 1 }, { unique: true });

export default mongoose.models.SavedSubject ||
  mongoose.model("SavedSubject", SavedSubjectSchema);
