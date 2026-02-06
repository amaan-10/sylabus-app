import { Schema, model, models } from "mongoose";

const InstituteUserSchema = new Schema(
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

export default models.InstituteUser ||
  model("InstituteUser", InstituteUserSchema);
