import { NextResponse } from "next/server";
import mongoose from "mongoose";

import { connectToInstituteDB } from "@/lib/db-connect/sylabus-db-institutes";
import "@/models/for-sylabus-institutes/register";

import Course from "@/models/for-sylabus-institutes/Course";

export async function GET(req: Request) {
  try {
    await connectToInstituteDB();

    const { searchParams } = new URL(req.url);

    const instituteId = searchParams.get("instituteId");
    const query = searchParams.get("q") || "";

    if (!instituteId || !mongoose.Types.ObjectId.isValid(instituteId)) {
      return NextResponse.json(
        { error: "Invalid instituteId" },
        { status: 400 },
      );
    }

    const courses = await Course.find({
      instituteId: new mongoose.Types.ObjectId(instituteId),
      courseCode: { $regex: `^${query}`, $options: "i" }, // prefix search
    })
      .select(
        "courseCode courseTitle courseType degree programId semester credits",
      )
      .limit(10)
      .sort({ courseCode: 1 });

    return NextResponse.json(courses);
  } catch (err) {
    console.error("Course search error:", err);
    return NextResponse.json(
      { error: "Failed to search courses" },
      { status: 500 },
    );
  }
}
