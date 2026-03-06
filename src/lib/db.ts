/* eslint-disable @typescript-eslint/no-explicit-any */

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

type Cached = {
  [key: string]: any;
};

const globalWithMongo = global as typeof globalThis & {
  mongooseConnections?: Cached;
};

if (!globalWithMongo.mongooseConnections) {
  globalWithMongo.mongooseConnections = {};
}

export async function connectToDatabase(dbName: string) {
  if (globalWithMongo.mongooseConnections![dbName]) {
    return globalWithMongo.mongooseConnections![dbName];
  }

  const conn = await mongoose
    .createConnection(MONGODB_URI, {
      dbName,
    })
    .asPromise();

  globalWithMongo.mongooseConnections![dbName] = conn;

  console.log(`Connected to DB: ${dbName}`);

  return conn;
}
