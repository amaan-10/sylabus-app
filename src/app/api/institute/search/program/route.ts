import { NextResponse } from "next/server";
import mongoose from "mongoose";

import { connectToDatabase } from "@/lib/db";
import { getProgramModel } from "@/models/for-sylabus-institutes/Program";

export async function GET(req: Request) {
  try {
    const conn = await connectToDatabase("sylabus-db-institutes");
    const Program = getProgramModel(conn);

    const { searchParams } = new URL(req.url);

    const instituteId = searchParams.get("instituteId");
    const query = searchParams.get("q") || "";

    if (!instituteId || !mongoose.Types.ObjectId.isValid(instituteId)) {
      return NextResponse.json(
        { error: "Valid instituteId is required" },
        { status: 400 },
      );
    }

    const programs = await Program.find({
      instituteId: instituteId as any,
      $or: [
        { program: { $regex: query, $options: "i" } },
        { degree: { $regex: query, $options: "i" } },
        { stream: { $regex: query, $options: "i" } },
      ],
    })
      .select("program degree stream academicLevel")
      .limit(10)
      .sort({ program: 1 })
      .lean();

    return NextResponse.json(programs);
  } catch (err) {
    console.error("Program search error:", err);
    return NextResponse.json(
      { error: "Failed to fetch programs" },
      { status: 500 },
    );
  }
}
