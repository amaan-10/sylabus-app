import mongoose, { Schema, Document, Model, Connection } from "mongoose";

export interface IUser extends Document {
  firebaseUid: string;
  phone: string;
  name?: string;
  gender?: string;
  role?: "teacher" | "student" | "admin";
  board?: string;
  medium?: string;
  classLevel?: string;
  createdAt: Date;
  userTier: "free" | "plus" | "pro+";
}

const UserSchema = new Schema<IUser>(
  {
    firebaseUid: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    name: String,
    gender: String,
    role: String,
    board: String,
    medium: String,
    classLevel: String,
    userTier: { type: String, default: "free", required: true },
  },
  { timestamps: true },
);

export const getUserModel = (conn: Connection): Model<IUser> => {
  return conn.models.User || conn.model<IUser>("User", UserSchema);
};
