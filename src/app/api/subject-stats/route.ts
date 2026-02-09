import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db-connect/sylabus-db";
import { SubjectQuestionBankModel } from "@/models/for-sylabus-app/subjectQuestionBank";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const board = searchParams.get("board");
  const medium = searchParams.get("medium");
  const classKey = searchParams.get("classKey");
  const subjectSlug = searchParams.get("subjectSlug");

  if (!board || !medium || !classKey || !subjectSlug) {
    return NextResponse.json({ error: "Missing params" }, { status: 400 });
  }

  await connectToDatabase();

  const result = await SubjectQuestionBankModel.aggregate([
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
