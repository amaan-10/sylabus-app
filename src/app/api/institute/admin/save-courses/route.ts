import { NextResponse } from "next/server";
import { connectToInstituteDB } from "@/lib/db-connect/sylabus-db-institutes";
import PdfJob from "@/models/for-sylabus-institutes/PdfJob";
import Course from "@/models/for-sylabus-institutes/Course";
import mongoose from "mongoose";

export async function POST(req: Request) {
  try {
    await connectToInstituteDB();

    const { jobId, instituteId, programId, pattern, semester } =
      await req.json();

    if (!jobId || !instituteId || !programId || !pattern || !semester) {
      return NextResponse.json(
        {
          error:
            "jobId, instituteId, programId, pattern and semester are required",
        },
        { status: 400 },
      );
    }

    if (!mongoose.Types.ObjectId.isValid(programId)) {
      return NextResponse.json({ error: "Invalid programId" }, { status: 400 });
    }

    const job = await PdfJob.findById(jobId);
    if (!job || !job.aiJson?.courses) {
      return NextResponse.json(
        { error: "AI data not found for this job" },
        { status: 404 },
      );
    }

    const coursesToInsert = job.aiJson.courses.map((course: any) => ({
      instituteId,
      programId,
      semester,

      courseCode: course.courseCode ?? null,
      courseTitle: course.courseTitle ?? null,
      courseType: course.courseType ?? null,
      degree: course.degree ?? null,
      pattern,
      credits: course.credits ?? null,

      courseOutcome: course.courseOutcome ?? [],

      units: course.units ?? [],
      practicals: course.practicals ?? [],
      readings: course.readings ?? [],
    }));

    // 🔁 OPTIONAL: remove existing courses for same program+semester
    await Course.deleteMany({ programId, semester });

    // ✅ Insert all courses at once
    const insertedCourses = await Course.insertMany(coursesToInsert);

    job.status = "SAVED";
    await job.save();

    return NextResponse.json({
      success: true,
      count: insertedCourses.length,
      courses: insertedCourses,
    });
  } catch (err: any) {
    console.error("Save courses error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
