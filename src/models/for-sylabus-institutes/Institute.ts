// models/for-sylabus-institutes/Institute.ts
import { Schema, model, models } from "mongoose";

const InstituteSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    logoUrl: { type: String },
    abbreviation: { type: String, required: true },
    society: String,
    affiliation: String,
    autonomous: Boolean,
    naac: String,
    location: String,
  },
  { timestamps: true },
);

export default models.Institute || model("Institute", InstituteSchema);
