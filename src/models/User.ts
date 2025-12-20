import mongoose, { Schema, Document, Model } from "mongoose";

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
  },
  { timestamps: true }
);

export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
