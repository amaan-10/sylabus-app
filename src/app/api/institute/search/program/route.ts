import { NextResponse } from "next/server";
import mongoose from "mongoose";

import { connectToInstituteDB } from "@/lib/db-connect/sylabus-db-institutes";
import Program from "@/models/for-sylabus-institutes/Program";

export async function GET(req: Request) {
  try {
    await connectToInstituteDB();

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
      instituteId,
      $or: [
        { program: { $regex: query, $options: "i" } },
        { degree: { $regex: query, $options: "i" } },
        { stream: { $regex: query, $options: "i" } },
      ],
    })
      .select("program degree stream academicLevel")
      .limit(10)
      .sort({ program: 1 });

    return NextResponse.json(programs);
  } catch (err) {
    console.error("Program search error:", err);
    return NextResponse.json(
      { error: "Failed to fetch programs" },
      { status: 500 },
    );
  }
}
