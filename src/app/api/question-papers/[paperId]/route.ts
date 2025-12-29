import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import QuestionPaper from "@/models/QuestionPaper";

export async function GET(
  req: Request,
  context: { params: Promise<{ paperId: string }> }
) {
  try {
    await connectToDatabase();

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
      { status: 500 }
    );
  }
}
