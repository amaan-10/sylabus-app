// src/app/api/sections/route.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { getSubjectQuestionBank } from "@/lib/questionBank";
import type { Section } from "@/models/subjectQuestionBank";

const ALLOWED_SUBJECTS = ["english", "hindi", "marathi"];

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const board = searchParams.get("board");
    const medium = searchParams.get("medium");
    const classKey = searchParams.get("classKey");
    const subjectSlug = searchParams.get("subjectSlug");

    if (!board || !medium || !classKey || !subjectSlug) {
      return NextResponse.json(
        { error: "Missing required params" },
        { status: 400 },
      );
    }

    // 🔐 Allow only language subjects
    if (!ALLOWED_SUBJECTS.includes(subjectSlug)) {
      return NextResponse.json(
        { error: "Sections are available only for language subjects" },
        { status: 403 },
      );
    }

    const subjectDoc = await getSubjectQuestionBank({
      board,
      medium,
      classKey,
      subjectSlug,
    });

    if (
      !subjectDoc ||
      !subjectDoc.sections ||
      subjectDoc.sections.length === 0
    ) {
      return NextResponse.json(
        { error: "No sections found for this subject" },
        { status: 404 },
      );
    }

    const sections: Section[] = subjectDoc.sections;

    return NextResponse.json(
      {
        sections,
        count: sections.length,
      },
      { status: 200 },
    );
  } catch (err: any) {
    console.error("GET /api/sections error:", err);
    return NextResponse.json(
      { error: err.message ?? "Internal server error" },
      { status: 500 },
    );
  }
}
