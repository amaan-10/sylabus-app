import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { getQuestionPaperModel } from "@/models/for-sylabus-app/QuestionPaper";

export async function GET(
  req: Request,
  context: { params: Promise<{ paperId: string }> },
) {
  try {
    const conn = await connectToDatabase("sylabus-db");
    const QuestionPaper = getQuestionPaperModel(conn);

    const { paperId } = await context.params;

    if (!paperId) {
      return NextResponse.json({ error: "paperId missing" }, { status: 400 });
    }

    const paper = await QuestionPaper.findById(paperId).lean();

    if (!paper) {
      return NextResponse.json({ error: "Paper not found" }, { status: 404 });
    }

    return NextResponse.json({ paper });
  } catch (err) {
    console.error("Fetch paper error:", err);
    return NextResponse.json(
      { error: "Failed to fetch paper" },
      { status: 500 },
    );
  }
}
