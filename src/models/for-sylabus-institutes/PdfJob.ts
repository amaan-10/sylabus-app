import { Schema, model, models } from "mongoose";

const PdfJobSchema = new Schema(
  {
    status: {
      type: String,
      enum: ["UPLOADED", "PARSED", "AI_DONE", "SAVED", "FAILED"],
      default: "UPLOADED",
    },

    originalFileName: String,

    extractedText: {
      type: String,
    },

    aiJson: {
      type: Schema.Types.Mixed,
    },

    error: String,
  },
  { timestamps: true },
);

export default models.PdfJob || model("PdfJob", PdfJobSchema);
