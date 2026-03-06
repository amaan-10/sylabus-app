import { Schema, Connection, Model, Document } from "mongoose";

export interface IProgram extends Document {
  instituteId: Schema.Types.ObjectId;
  academicLevel: "UG" | "PG";
  stream: string;
  degree: string;
  program: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const ProgramSchema = new Schema<IProgram>(
  {
    instituteId: {
      type: Schema.Types.ObjectId,
      ref: "Institute",
      required: true,
      index: true,
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

/* optional but recommended */
ProgramSchema.index({ instituteId: 1, academicLevel: 1 });

/* connection-based model */
export const getProgramModel = (conn: Connection): Model<IProgram> => {
  return conn.models.Program || conn.model<IProgram>("Program", ProgramSchema);
};
