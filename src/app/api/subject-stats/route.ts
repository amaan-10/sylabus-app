import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { getSubjectQuestionBankModel } from "@/models/for-sylabus-app/subjectQuestionBank";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const board = searchParams.get("board");
  const medium = searchParams.get("medium");
  const classKey = searchParams.get("classKey");
  const subjectSlug = searchParams.get("subjectSlug");

  if (!board || !medium || !classKey || !subjectSlug) {
    return NextResponse.json({ error: "Missing params" }, { status: 400 });
  }

  const conn = await connectToDatabase("sylabus-db");

  const SubjectQuestionBank = getSubjectQuestionBankModel(conn);

  const result = await SubjectQuestionBank.aggregate([
    {
      $match: { board, medium, classKey, subjectSlug },
    },
    {
      $project: {
        chapterCount: { $size: "$chapters" },
        questionCount: {
          $sum: {
            $map: {
              input: "$chapters",
              as: "ch",
              in: { $size: "$$ch.questions" },
            },
          },
        },
      },
    },
  ]);

  return NextResponse.json(result[0] ?? { chapterCount: 0, questionCount: 0 });
}
