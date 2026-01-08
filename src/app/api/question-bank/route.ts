/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/question-bank/route.ts
import { NextResponse } from "next/server";
import { getSubjectQuestionBank } from "@/lib/questionBank";
import type {
  Question,
  Chapter,
  QuestionType,
} from "@/models/subjectQuestionBank";

type QuestionSource = "balbharati" | "pyq";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const board = searchParams.get("board");
    const medium = searchParams.get("medium");
    const classKey = searchParams.get("classKey");
    const subjectSlug = searchParams.get("subjectSlug");
    const chapterSlug = searchParams.get("chapterSlug");
    const questionTypeSlug = searchParams.get("questionTypeSlug");
    const source =
      (searchParams.get("source") as QuestionSource) || "balbharati";
    const marksParam = searchParams.get("marks");
    const marks = marksParam !== null ? Number(marksParam) : undefined;

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

    if (
      !subjectDoc ||
      !subjectDoc.chapters ||
      subjectDoc.chapters.length === 0
    ) {
      return NextResponse.json(
        { error: "No chapters found for this subject" },
        { status: 404 }
      );
    }

    const chapters: Chapter[] = subjectDoc.chapters;
    const chapter = chapterSlug
      ? chapters.find((ch) => ch.slug === chapterSlug)
      : chapters[0];

    if (!chapter) {
      return NextResponse.json({ error: "Chapter not found" }, { status: 404 });
    }

    const filteredQuestions = filterQuestionsByType(
      chapter.questions,
      questionTypeSlug as QuestionType,
      source,
      marks
    );

    const totalMarks = filteredQuestions.reduce(
      (sum, q) => sum + (q.marks || 0),
      0
    );

    return NextResponse.json({
      chapterTitle: chapter.title,
      chapterNumber: chapter.chapterNumber,
      questions: filteredQuestions,
      totalMarks,
    });
  } catch (err: any) {
    console.error("question-bank API error:", err);
    return NextResponse.json(
      { error: err.message ?? "Internal server error" },
      { status: 500 }
    );
  }
}

function filterQuestionsByType(
  questions: Question[],
  type: QuestionType,
  source?: QuestionSource,
  marks?: number
): Question[] {
  const s = source?.toLowerCase();

  // ---------- SOURCE FILTER (strict) ----------
  let filtered = questions;

  if (s) {
    filtered = filtered.filter((q) => {
      if (!q.source) return false;
      return q.source.toLowerCase() === s;
    });
  }

  // ---------- TYPE FILTER ----------
  filtered = filtered.filter((q) => q.type === type);

  // ---------- MARKS FILTER (optional) ----------
  if (typeof marks === "number" && !isNaN(marks)) {
    filtered = filtered.filter((q) => q.marks === marks);
  }

  return filtered;
}
