import { Schema, Connection, Model, Document } from "mongoose";

export interface ICourse extends Document {
  programId: Schema.Types.ObjectId;
  instituteId: Schema.Types.ObjectId;
  semester: number;

  courseCode?: string;
  courseTitle?: string;
  courseType?: string;
  degree?: string;
  pattern?: string;

  credits?: number;
  teachingHours?: number;

  courseOutcome?: string[];

  units?: {
    unit: string;
    lectures: number;
    topics: string[];
  }[];

  practicals?: {
    title: string;
    hours: string;
  }[];

  readings?: string[];
}

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

const CourseSchema = new Schema<ICourse>(
  {
    programId: {
      type: Schema.Types.ObjectId,
      ref: "Program",
      required: true,
      index: true,
    },

    instituteId: {
      type: Schema.Types.ObjectId,
      ref: "Institute",
      required: true,
      index: true,
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

/* useful indexes */
CourseSchema.index({ programId: 1, semester: 1 });
CourseSchema.index({ instituteId: 1, semester: 1 });
CourseSchema.index({ "units.unit": 1 });

/* connection-based model */
export const getCourseModel = (conn: Connection): Model<ICourse> => {
  return conn.models.Course || conn.model<ICourse>("Course", CourseSchema);
};
