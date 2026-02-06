import mongoose, { Schema, models } from "mongoose";

const PaperDraftSchema = new Schema(
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
  { timestamps: true }
);

// one draft per user per subject
// PaperDraftSchema.index({ userId: 1, subjectSlug: 1 }, { unique: true });

export default models.PaperDraft ||
  mongoose.model("PaperDraft", PaperDraftSchema);
