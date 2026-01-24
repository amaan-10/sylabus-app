import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import QuestionPaper from "@/models/QuestionPaper";

/* ---------------- POST: saved papers ---------------- */
export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const body = await req.json();

    const {
      userId,
      meta,
      paperInfo,
      paperMode,
      questions,
      examSections,
      totalMarks,
    } = body;

    if (!questions || questions.length === 0) {
      return NextResponse.json(
        { error: "No questions provided" },
        { status: 400 },
      );
    }

    const paper = await QuestionPaper.create({
      userId,
      meta,
      paperInfo,
      paperMode,
      questions,
      examSections,
      totalMarks,
    });

    return NextResponse.json({ success: true, paperId: paper._id });
  } catch (err: any) {
    console.error("Save paper error:", err);
    return NextResponse.json(
      { error: "Failed to save paper" },
      { status: 500 },
    );
  }
}

/* ---------------- GET: List saved papers ---------------- */
export async function GET(req: Request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId") || "guest";

    const papers = await QuestionPaper.find({ userId })
      .sort({ createdAt: -1 })
      .select("_id meta schoolName paperMode totalMarks createdAt questions")
      .lean();

    return NextResponse.json({ papers });
  } catch (err) {
    console.error("Fetch papers error:", err);
    return NextResponse.json(
      { error: "Failed to fetch papers" },
      { status: 500 },
    );
  }
}

/* ---------------- DELETE: Remove paper ---------------- */
export async function DELETE(req: Request) {
  try {
    await connectToDatabase();
    const { paperId } = await req.json();

    if (!paperId) {
      return NextResponse.json({ error: "paperId required" }, { status: 400 });
    }

    await QuestionPaper.findByIdAndDelete(paperId);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Delete paper error:", err);
    return NextResponse.json(
      { error: "Failed to delete paper" },
      { status: 500 },
    );
  }
}
