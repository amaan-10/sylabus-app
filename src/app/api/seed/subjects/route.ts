/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/seed/route.ts
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { SubjectQuestionBankModel } from "@/models/subjectQuestionBank";
// import subjects from "@/data/msbshse-10.json";
// import subjects from "@/data/msbshse-12-science.json";
import subjects from "@/data/subjects.json";
import Subject from "@/models/Subject";

export async function POST() {
  try {
    await connectToDatabase();

    if (!Array.isArray(subjects)) {
      return NextResponse.json(
        { success: false, error: "Data must be an array" },
        { status: 400 }
      );
    }

    const results = [];

    for (const subject of subjects) {
      const updated = await Subject.findOneAndUpdate(
        {
          id: subject.id,
          board: subject.board,
          medium: subject.medium,
          classKey: subject.classKey,
          subjectSlug: subject.subjectSlug,
          programOutcomes: subject.programOutcomes,
        },
        subject,
        { upsert: true, new: true }
      );

      results.push({
        subject: subject.subjectSlug,
        id: updated._id,
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: "All subjects seeded successfully",
        results,
      },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
// curl -X POST http://localhost:3000/api/seed/subjects
