/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/question-bank/route.ts
import { NextResponse } from "next/server";
import { getSubjectQuestionBank } from "@/lib/questionBank";
import type {
  Question,
  Chapter,
  QuestionType,
  Section,
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
    const sectionSlug = searchParams.get("sectionSlug");
    const questionTypeSlug = searchParams.get("questionTypeSlug");
    const source =
      (searchParams.get("source") as QuestionSource) || "balbharati";
    const marksParam = searchParams.get("marks");
    const marks = marksParam !== null ? Number(marksParam) : undefined;
    const paperMode = searchParams.get("paperMode");

    if (!board || !medium || !classKey || !subjectSlug) {
      return NextResponse.json(
        { error: "Missing required params" },
        { status: 400 },
      );
    }

    if (chapterSlug && sectionSlug) {
      return NextResponse.json(
        { error: "Provide either chapterSlug or sectionId, not both" },
        { status: 400 },
      );
    }

    const subjectDoc = await getSubjectQuestionBank({
      board,
      medium,
      classKey,
      subjectSlug,
    });

    let container:
      | (Chapter & { kind: "chapter" })
      | (Section & { kind: "section" })
      | null = null;

    // ---------- CHAPTER ----------
    if (chapterSlug) {
      const chapters = subjectDoc?.chapters ?? [];
      const chapter = chapters.find((ch) => ch.slug === chapterSlug);

      if (!chapter) {
        return NextResponse.json(
          { error: "Chapter not found" },
          { status: 404 },
        );
      }

      container = { ...chapter, kind: "chapter" };
    }

    // ---------- SECTION ----------
    else if (sectionSlug) {
      const sections = subjectDoc?.sections ?? [];
      const section = sections.find((sec) => sec.slug === sectionSlug);

      if (!section) {
        return NextResponse.json(
          { error: "Section not found" },
          { status: 404 },
        );
      }

      container = { ...section, kind: "section" };
    }

    // ---------- DEFAULT ----------
    else {
      // fallback: first chapter
      const chapter = subjectDoc?.chapters?.[0];
      if (!chapter) {
        return NextResponse.json(
          { error: "No container found" },
          { status: 404 },
        );
      }
      container = { ...chapter, kind: "chapter" };
    }

    const filteredQuestions = filterQuestions(container.questions ?? [], {
      source,
      type: questionTypeSlug as QuestionType,
      marks,
      paperMode,
      examSectionType: questionTypeSlug ?? undefined,
    });

    const totalMarks = filteredQuestions.reduce(
      (sum, q) => sum + (q.marks || 0),
      0,
    );

    return NextResponse.json({
      containerTitle: container.title,
      containerNumber:
        container.kind === "chapter" ? container.chapterNumber : undefined,
      questions: filteredQuestions,
      totalMarks,
    });
  } catch (err: any) {
    console.error("question-bank API error:", err);
    return NextResponse.json(
      { error: err.message ?? "Internal server error" },
      { status: 500 },
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
  },
): Question[] {
  let filtered = questions;

  // ---------- SOURCE FILTER (always) ----------
  if (source) {
    filtered = filtered.filter(
      (q) => q.source?.toLowerCase() === source.toLowerCase(),
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
