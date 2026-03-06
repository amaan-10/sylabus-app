import { Schema, Connection, Model, Document } from "mongoose";

export interface IPaperDraft extends Document {
  userId: string;
  draftName: string;
  boardSlug: string;
  mediumSlug: string;
  classKey: string;
  subjectSlug: string;
  paperMode: "exam" | "custom";
  draft: any;
  lastUpdated?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const PaperDraftSchema = new Schema<IPaperDraft>(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },

    draftName: {
      type: String,
      required: true,
      trim: true,
    },

    boardSlug: {
      type: String,
      required: true,
    },

    mediumSlug: {
      type: String,
      required: true,
    },

    classKey: {
      type: String,
      required: true,
    },

    subjectSlug: {
      type: String,
      required: true,
    },

    paperMode: {
      type: String,
      enum: ["exam", "custom"],
      required: true,
    },

    draft: {
      type: Schema.Types.Mixed,
      required: true,
    },

    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

/* recommended indexes */
PaperDraftSchema.index({ userId: 1 });
PaperDraftSchema.index({ userId: 1, subjectSlug: 1 });

/* connection-based model */
export const getPaperDraftModel = (conn: Connection): Model<IPaperDraft> => {
  return (
    conn.models.PaperDraft ||
    conn.model<IPaperDraft>("PaperDraft", PaperDraftSchema)
  );
};
