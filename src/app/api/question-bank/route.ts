/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/question-bank/route.ts
import { NextResponse } from "next/server";
import { getSubjectQuestionBank } from "@/lib/questionBank";
import type { Question, Chapter } from "@/models/subjectQuestionBank";

type QuestionSource = "balbharati" | "pyq";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const board = searchParams.get("board");
    const medium = searchParams.get("medium");
    const classKey = searchParams.get("classKey");
    const subjectSlug = searchParams.get("subjectSlug");
    const chapterSlug = searchParams.get("chapterSlug");
    const questionTypeLabel =
      searchParams.get("questionTypeLabel") ?? "Questions";
    const source = (searchParams.get("source") as QuestionSource) || "balbharati";

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
        { error: "No chapters found for this subject" },
        { status: 404 }
      );
    }

    const chapters: Chapter[] = subjectDoc.chapters;
    const chapter = chapterSlug
      ? chapters.find((ch) => ch.slug === chapterSlug)
      : chapters[0];

    if (!chapter) {
      return NextResponse.json(
        { error: "Chapter not found" },
        { status: 404 }
      );
    }

    const filteredQuestions = filterQuestionsByQuestionTypeLabel(
      chapter.questions,
      questionTypeLabel,
      source
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

function filterQuestionsByQuestionTypeLabel(
  questions: Question[],
  label: string,
  source: QuestionSource
): Question[] {
  const lower = label.toLowerCase().trim();
  const s = source ? source.toLowerCase() : "";

  // HELPER: gather explicit sources from a question (don't use tags fallback)
  const getQuestionSources = (q: any): string[] => {
    const out: string[] = [];
    if (!q) return out;
    if (typeof q.source === "string") out.push(q.source.toLowerCase());
    if (Array.isArray(q.sources)) out.push(...q.sources.map((x: any) => String(x).toLowerCase()));
    if (q.metadata && typeof q.metadata.source === "string")
      out.push(q.metadata.source.toLowerCase());
    // IMPORTANT: do NOT include q.tags here by default (can be added if you want)
    return Array.from(new Set(out));
  };

  // HELPER: normalize/inspect question type and some heuristics
  const getQuestionTypeNormalized = (q: any): string => {
    if (!q) return "";
    if (typeof q.type === "string") return q.type.toLowerCase();
    // fallback: if options exist, treat as mcq-ish
    if (Array.isArray(q.options) && q.options.length > 0) return "mcq";
    return "";
  };

  // type synonyms map: targetType -> array of possible type strings in data
  const TYPE_SYNONYMS: Record<string, string[]> = {
    mcq: [
      "mcq",
      "objective",
      "multiple-choice",
      "multiple choice",
      "objective-type",
      "mcq-single",
      "mcq-multiple",
      "single-best",
    ],
    "true-false": ["true-false", "true or false", "true/false", "tf"],
    fill: ["fill", "fill in the blanks", "fill-in-the-blanks"],
    short: ["short", "short-answer", "one-word"],
    long: ["long", "long-answer", "descriptive", "paragraph"],
    activity: ["activity", "activity-based-questions", "activity based questions", "Activity based questions"],
  };

  const matchesType = (q: any, target: string) => {
    const norm = getQuestionTypeNormalized(q);
    if (!norm && target === "mcq" && Array.isArray(q.options) && q.options.length > 0) {
      // heuristic: treat presence of options as MCQ
      return true;
    }
    const synonyms = TYPE_SYNONYMS[target] || [];
    return synonyms.some((syn) => norm === syn);
  };

  // 1) filter by source (strict: only explicit fields)
  let bySource = questions;
  if (s) {
    bySource = questions.filter((q: any) => {
      const qSources = getQuestionSources(q);
      if (qSources.length === 0) return false; // strict: require explicit source
      return qSources.includes(s);
    });
  }

  // debug logs (remove in production if noisy)
  console.debug(
    `[question-bank] source=${s || "any"} totalQuestions=${questions.length} afterSourceFilter=${bySource.length}`
  );

  const qs = bySource;

  // ---------- type filters ----------
  // MCQ
  if (lower.includes("mcq")) {
    const res = qs.filter((q) => matchesType(q, "mcq"));
    console.debug(`[question-bank] mcq filter matched ${res.length}`);
    return res;
  }

  // True / False
  if (lower.includes("true or false") || lower.includes("true/false") || lower === "tf") {
    const res = qs.filter((q) => matchesType(q, "true-false"));
    console.debug(`[question-bank] true/false filter matched ${res.length}`);
    return res;
  }

  // Fill in the blanks
  if (lower.includes("fill in the blanks") || lower.includes("fill")) {
    const res = qs.filter((q) => matchesType(q, "fill"));
    console.debug(`[question-bank] fill filter matched ${res.length}`);
    return res;
  }

  // Very short / 1-mark very short
  if (lower.includes("very short")) {
    const res = qs.filter((q) => q.type === "short" && (q.marks || 0) <= 1);
    console.debug(`[question-bank] very short filter matched ${res.length}`);
    return res;
  }

  // Short answer
  if (lower.includes("short answer") || lower.includes("answer in short")) {
    const res = qs.filter((q) => q.type === "short" && (q.marks || 0) <= 3);
    console.debug(`[question-bank] short answer filter matched ${res.length}`);
    return res;
  }

  // Long answer / Explain in detail
  if (lower.includes("long answer") || lower.includes("in detail") || lower.includes("explain")) {
    const res = qs.filter((q) => matchesType(q, "long"));
    console.debug(`[question-bank] long filter matched ${res.length}`);
    return res;
  }

  // Numerical / practical
  if (lower.includes("numerical") || lower.includes("practical")) {
    const res = qs.filter(
      (q: any) =>
        (Array.isArray(q.tags) && q.tags.some((t: any) => String(t).toLowerCase().includes("numerical"))) ||
        matchesType(q, "long")
    );
    console.debug(`[question-bank] numerical filter matched ${res.length}`);
    return res;
  }

  // Diagram based
  if (lower.includes("diagram")) {
    const res = qs.filter((q: any) => Array.isArray(q.tags) && q.tags.some((t: any) => String(t).toLowerCase().includes("diagram")));
    console.debug(`[question-bank] diagram filter matched ${res.length}`);
    return res;
  }

  // Match the following
  if (lower.includes("match the following")) {
    const res = qs.filter((q: any) => Array.isArray(q.tags) && q.tags.some((t: any) => String(t).toLowerCase().includes("match")));
    console.debug(`[question-bank] match filter matched ${res.length}`);
    return res;
  }

  // Case-study
  if (lower.includes("case-study") || lower.includes("case study")) {
    const res = qs.filter((q: any) => Array.isArray(q.tags) && q.tags.some((t: any) => String(t).toLowerCase().includes("case")));
    console.debug(`[question-bank] case-study filter matched ${res.length}`);
    return res;
  }

  // Word problems
  if (lower.includes("word problem")) {
    const res = qs.filter((q: any) => Array.isArray(q.tags) && q.tags.some((t: any) => String(t).toLowerCase().includes("word")));
    console.debug(`[question-bank] word-problem filter matched ${res.length}`);
    return res;
  }

  // Short notes
  if (lower.includes("short note")) {
    const res = qs.filter((q: any) => Array.isArray(q.tags) && q.tags.some((t: any) => String(t).toLowerCase().includes("note")));
    console.debug(`[question-bank] short-note filter matched ${res.length}`);
    return res;
  }

  // Activity based questions
  if (lower.includes("activity based questions")) {
    const res = qs.filter((q: any) => Array.isArray(q.tags) && q.tags.some((t: any) => String(t).toLowerCase().includes("activity")));
    console.debug(`[question-bank] activity-based-questions filter matched ${res.length}`);
    return res;
  }

  // fallback: return all questions after source filter
  console.debug(`[question-bank] fallback returning ${qs.length} questions`);
  return qs;
}
