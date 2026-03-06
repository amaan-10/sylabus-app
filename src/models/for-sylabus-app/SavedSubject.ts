import { Schema, Connection, Model, Document } from "mongoose";

export interface ISavedSubject extends Document {
  userId: string;
  subjectId: string;
  subjectData: {
    id: string;
    title: string;
    imgSrc: string;
    imgAlt: string;
    board: string;
    medium: string;
    classLevel: string;
    chapterCount: number;
    questionCount: number;
    link: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const SavedSubjectSchema = new Schema<ISavedSubject>(
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
  { timestamps: true },
);

// prevent duplicates
SavedSubjectSchema.index({ userId: 1, subjectId: 1 }, { unique: true });

/* ✅ connection-based model */
export const getSavedSubjectModel = (
  conn: Connection,
): Model<ISavedSubject> => {
  return (
    conn.models.SavedSubject ||
    conn.model<ISavedSubject>("SavedSubject", SavedSubjectSchema)
  );
};
