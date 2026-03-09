import { NextResponse } from "next/server";
import { generateCourseJSON } from "@/lib/ai/generate-course";
import { CourseSchema, CoursesResponseSchema } from "@/lib/scheme";

import { connectToDatabase } from "@/lib/db";
import { getPdfJobModel } from "@/models/for-sylabus-institutes/PdfJob";

export async function POST(req: Request) {
  try {
    const conn = await connectToDatabase("sylabus-db-institutes");
    const PdfJob = getPdfJobModel(conn);

    const { jobId } = await req.json();

    const job = await PdfJob.findById(jobId);

    if (!job || !job.extractedText) {
      return NextResponse.json({ error: "PDF job not found" }, { status: 404 });
    }

    const aiJson = await generateCourseJSON(job.extractedText);

    const validated = CoursesResponseSchema.parse(aiJson);

    /* normalize null arrays */
    validated.courses = validated.courses.map((course) => ({
      ...course,
      units: course.units ?? [],
      practicals: course.practicals ?? [],
      readings: course.readings ?? [],
      courseOutcome: course.courseOutcome ?? [],
    }));

    job.aiJson = validated;
    job.status = "AI_DONE";
    await job.save();

    return NextResponse.json(validated);
  } catch (err: any) {
    console.error("AI api error:", err);

    return NextResponse.json(
      { error: err.message || "AI generation failed" },
      { status: 500 },
    );
  }
}
