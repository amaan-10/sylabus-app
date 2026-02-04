/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/mongodb.ts
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

// Global cache for hot reloading in Next.js
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectToInstituteDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: "sylabus-db-institutes",
      })
      .then((mongooseInstance) => mongooseInstance);
  }

  console.log("Connected to db for institutes");

  cached.conn = await cached.promise;
  return cached.conn;
}
