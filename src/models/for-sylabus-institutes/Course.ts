// models/for-sylabus-institutes/Course.ts
import { Schema, model, models } from "mongoose";

const UnitSchema = new Schema(
  {
    unit: String,
    lectures: Number,
    topics: [String],
  },
  { _id: false },
);

const PracticalSchema = new Schema(
  {
    title: String,
    hours: String,
  },
  { _id: false },
);

const CourseSchema = new Schema(
  {
    programId: {
      type: Schema.Types.ObjectId,
      ref: "Program",
      required: true,
    },

    semester: {
      type: Number,
      required: true,
    },

    courseCode: String,
    courseTitle: String,
    courseType: String,
    degree: String,
    pattern: String,
    credits: Number,
    teachingHours: Number,

    courseOutcome: [String],

    units: [UnitSchema],
    practicals: [PracticalSchema],
    readings: [String],
  },
  { timestamps: true },
);

CourseSchema.index({ programId: 1, semester: 1 });
CourseSchema.index({ "units.unit": 1 });

export default models.Course || model("Course", CourseSchema);
