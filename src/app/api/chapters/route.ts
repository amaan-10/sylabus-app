/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/api/chapters/route.ts
import { NextResponse } from "next/server";
import { getSubjectQuestionBank } from "@/lib/questionBank"; // <-- your DB helper
import type { Chapter } from "@/models/subjectQuestionBank"; // or wherever Chapter is

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
        { status: 400 }
      );
    }

    const subjectDoc = await getSubjectQuestionBank({
      board,
      medium,
      classKey,
      subjectSlug,
    });

    if (!subjectDoc || !subjectDoc.chapters || subjectDoc.chapters.length === 0) {
      return NextResponse.json(
        { error: "No chapters found for this combination" },
        { status: 404 }
      );
    }

    const chapters: Chapter[] = subjectDoc.chapters;

    return NextResponse.json(
      {
        chapters,
        count: chapters.length,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("GET /api/chapters error:", err);
    return NextResponse.json(
      { error: err.message ?? "Internal server error" },
      { status: 500 }
    );
  }
}
