// models/for-sylabus-institutes/Program.ts
import { Schema, model, models } from "mongoose";

const ProgramSchema = new Schema(
  {
    instituteId: {
      type: Schema.Types.ObjectId,
      ref: "Institute",
      required: true,
    },

    academicLevel: {
      type: String,
      enum: ["UG", "PG"],
      required: true,
    },

    stream: {
      type: String,
      required: true,
    },

    degree: {
      type: String,
      required: true,
    },

    program: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default models.Program || model("Program", ProgramSchema);
