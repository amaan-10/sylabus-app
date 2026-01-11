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
    const paperMode = searchParams.get("paperMode");

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

    const filteredQuestions = filterQuestions(chapter.questions, {
      source,
      type: questionTypeSlug as QuestionType,
      marks,
      paperMode,
      examSectionType: questionTypeSlug ?? undefined,
    });

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

function filterQuestions(
  questions: Question[],
  {
    source,
    type,
    marks,
    paperMode,
    examSectionType,
  }: {
    source?: QuestionSource;
    type?: QuestionType;
    marks?: number;
    paperMode?: string | null;
    examSectionType?: string;
  }
): Question[] {
  let filtered = questions;

  // ---------- SOURCE FILTER (always) ----------
  if (source) {
    filtered = filtered.filter(
      (q) => q.source?.toLowerCase() === source.toLowerCase()
    );
  }

  // ---------- EXAM MODE ----------
  if (paperMode === "exam") {
    if (!examSectionType) return [];

    filtered = filtered.filter((q) => q.examSectionType === examSectionType);

    // optional safety: keep marks aligned
    if (typeof marks === "number") {
      filtered = filtered.filter((q) => q.marks === marks);
    }

    return filtered;
  }

  // ---------- CUSTOM MODE ----------
  if (paperMode === "custom") {
    if (type) {
      filtered = filtered.filter((q) => q.type === type);
    }

    if (typeof marks === "number") {
      filtered = filtered.filter((q) => q.marks === marks);
    }

    return filtered;
  }

  return filtered;
}
