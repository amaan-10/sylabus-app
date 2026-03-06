import { Schema, Connection, Model, Document } from "mongoose";

export interface IPdfJob extends Document {
  status: "UPLOADED" | "PARSED" | "AI_DONE" | "SAVED" | "FAILED";
  originalFileName?: string;
  extractedText?: string;
  aiJson?: any;
  error?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const PdfJobSchema = new Schema<IPdfJob>(
  {
    status: {
      type: String,
      enum: ["UPLOADED", "PARSED", "AI_DONE", "SAVED", "FAILED"],
      default: "UPLOADED",
      index: true,
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

/* helpful for job tracking */
PdfJobSchema.index({ status: 1, createdAt: -1 });

/* connection-based model */
export const getPdfJobModel = (conn: Connection): Model<IPdfJob> => {
  return conn.models.PdfJob || conn.model<IPdfJob>("PdfJob", PdfJobSchema);
};
