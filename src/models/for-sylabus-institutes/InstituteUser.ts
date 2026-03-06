import { Schema, Connection, Model, Document } from "mongoose";

export interface IInstituteUser extends Document {
  name: string;
  email: string;
  password?: string;
  role: "ADMIN" | "TEACHER";
  instituteId: Schema.Types.ObjectId;
  programIds: Schema.Types.ObjectId[];
  authProvider: "CREDENTIALS" | "GOOGLE";
  authProviderId?: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const InstituteUserSchema = new Schema<IInstituteUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    role: {
      type: String,
      enum: ["ADMIN", "TEACHER"],
      default: "TEACHER",
    },

    instituteId: {
      type: Schema.Types.ObjectId,
      ref: "Institute",
      required: true,
      index: true,
    },

    programIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "Program",
      },
    ],

    authProvider: {
      type: String,
      enum: ["CREDENTIALS", "GOOGLE"],
      default: "CREDENTIALS",
    },

    authProviderId: String,

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

/* helpful indexes */
InstituteUserSchema.index({ instituteId: 1 });
InstituteUserSchema.index({ instituteId: 1, role: 1 });

/* connection-based model */
export const getInstituteUserModel = (
  conn: Connection,
): Model<IInstituteUser> => {
  return (
    conn.models.InstituteUser ||
    conn.model<IInstituteUser>("InstituteUser", InstituteUserSchema)
  );
};
