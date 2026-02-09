// src/app/api/institute/paper/generate/route.ts

import { NextResponse } from "next/server";
import { connectToInstituteDB } from "@/lib/db-connect/sylabus-db-institutes";
import Course from "@/models/for-sylabus-institutes/Course";
import { generateCompletePaperSets } from "@/lib/ai/question-generator";

export async function POST(req: Request) {
  try {
    await connectToInstituteDB();

    const { program, semester, course, paperSets, examTitle, blueprint } =
      await req.json();

    let sections: any[] | null = null;

    if (typeof blueprint === "string") {
      try {
        sections = JSON.parse(blueprint);
      } catch {
        return NextResponse.json(
          { error: "Blueprint string is not valid JSON" },
          { status: 400 },
        );
      }
    } else if (Array.isArray(blueprint)) {
      sections = blueprint;
    }

    if (!Array.isArray(sections)) {
      return NextResponse.json(
        { error: "Invalid blueprint format. Expected array of sections." },
        { status: 400 },
      );
    }

    console.log("RAW sections:", sections);
    console.log("Array.isArray(sections):", Array.isArray(sections));
    console.log("sections.constructor:", sections?.constructor?.name);

    if (!paperSets || paperSets < 1) {
      return NextResponse.json(
        { error: "paperSets must be >= 1" },
        { status: 400 },
      );
    }

    const courseDoc = await Course.findOne({
      programId: program,
      semester,
      courseCode: course,
    });

    if (!courseDoc) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    const topics = courseDoc.units.flatMap((u: any) => u.topics);

    const generatedPaperSets = await generateCompletePaperSets({
      course: courseDoc,
      sections,
      topics,
      paperSets,
    });

    return NextResponse.json({
      courseMeta: {
        courseTitle: courseDoc.courseTitle,
        courseCode: courseDoc.courseCode,
        semester: courseDoc.semester,
        pattern: courseDoc.pattern,
        credits: courseDoc.credits,
        degree: courseDoc.degree,
        examTitle: examTitle,
        instituteId: courseDoc.instituteId,
      },
      paperSets: generatedPaperSets,
    });
  } catch (err: any) {
    console.error("Route Error:", err);
    return NextResponse.json(
      { error: err.message || "AI generation failed" },
      { status: 500 },
    );
  }
}
