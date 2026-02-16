import { NextResponse } from "next/server";
import { generateCourseJSON } from "@/lib/ai/generate-course";
import PdfJob from "@/models/for-sylabus-institutes/PdfJob";
import { connectToInstituteDB } from "@/lib/db-connect/sylabus-db-institutes";
import { CourseSchema, CoursesResponseSchema } from "@/lib/scheme";

export async function POST(req: Request) {
  try {
    await connectToInstituteDB();

    const { jobId } = await req.json();

    const job = await PdfJob.findById(jobId);
    if (!job || !job.extractedText) {
      return NextResponse.json({ error: "PDF job not found" }, { status: 404 });
    }

    const aiJson = await generateCourseJSON(job.extractedText);

    const validated = CoursesResponseSchema.parse(aiJson);

    // 🔁 NORMALIZE NULL ARRAYS
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
    console.error("AI api error: ", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
