/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { getSubjectQuestionBank } from "@/lib/questionBank";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const board = searchParams.get("board");
    const medium = searchParams.get("medium");
    const classKey = searchParams.get("classKey");
    const subjectSlug = searchParams.get("subjectSlug");
    const source = searchParams.get("source") || "";

    if (!board || !medium || !classKey || !subjectSlug) {
      return NextResponse.json({ error: "Missing params" }, { status: 400 });
    }

    const subjectDoc = await getSubjectQuestionBank({
      board,
      medium,
      classKey,
      subjectSlug,
    });

    if (!subjectDoc) {
      return NextResponse.json({ error: "Subject not found" }, { status: 404 });
    }

    const types = new Set<string>();

    for (const ch of subjectDoc.chapters) {
      for (const q of ch.questions) {
        // Must match question source (if defined)
        const qSources = extractSources(q);
        if (qSources.length > 0 && !qSources.includes(source.toLowerCase())) {
          continue;
        }

        // 1️⃣ If question.type exists → use it directly
        if (typeof q.type === "string" && q.type.trim()) {
          types.add(formatType(q.type));
        }

        // 2️⃣ If MCQ detected by options
        if (Array.isArray(q.options) && q.options.length > 0) {
          types.add("MCQ");
        }

        // 3️⃣ Detect from tags
        if (Array.isArray(q.tags)) {
          const labels = detectFromTags(q.tags);
          labels.forEach((label) => types.add(label));
        }

        // 4️⃣ Marks-based types (optional but helpful)
        if (q.marks === 1) types.add("1-mark");
        if (q.marks === 2) types.add("2-mark");
        if (q.marks === 3) types.add("3-mark");
        if (q.marks >= 4) types.add("4-mark");
      }
    }

    return NextResponse.json({
      questionTypes: Array.from(types),
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

function extractSources(q: any): string[] {
  const out: string[] = [];
  if (!q) return out;
  if (q.source) out.push(String(q.source).toLowerCase());
  if (Array.isArray(q.sources)) out.push(...q.sources.map((x: any) => String(x).toLowerCase()));
  if (q.metadata?.source) out.push(String(q.metadata.source).toLowerCase());
  return Array.from(new Set(out));
}

function formatType(type: string): string {
  return type
    .trim()
    .replace(/_/g, " ")
    .replace(/\s+/g, " ")
    .replace(/\bmcq\b/i, "MCQ")
    .replace(/\bshort\b/i, "Short answer")
    .replace(/\blong\b/i, "Long answer")
    .replace(/\bnumerical\b/i, "Numerical")
    .replace(/\bvery short\b/i, "Very short answer")
    .replace(/\bactivity\b/i, "Activity based questions")
    .trim();
}

function detectFromTags(tags: string[]): string[] {
  const out: string[] = [];
  const lowerTags = tags.map((t) => t.toLowerCase());

  if (lowerTags.some((t) => t.includes("diagram"))) out.push("Diagram based");
  if (lowerTags.some((t) => t.includes("fill"))) out.push("Fill in the blanks");
  if (lowerTags.some((t) => t.includes("true") || t.includes("false"))) out.push("True or False");
  if (lowerTags.some((t) => t.includes("match"))) out.push("Match the following");
  if (lowerTags.some((t) => t.includes("case"))) out.push("Case-study");
  if (lowerTags.some((t) => t.includes("word"))) out.push("Word problems");
  if (lowerTags.some((t) => t.includes("activity"))) out.push("Activity based questions");


  return out;
}
