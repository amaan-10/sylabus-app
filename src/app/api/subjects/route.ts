import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db-connect/sylabus-db";
import Subject from "@/models/for-sylabus-app/Subject";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const { subjectSlug, chapterId, question } = await req.json();

    if (!subjectSlug || !chapterId || !question) {
      return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
    }

    /* 1️⃣ Fetch chapter to get question count */
    const subject = await Subject.findOne(
      {
        subjectSlug,
        "chapters.id": chapterId,
      },
      {
        "chapters.$": 1,
      },
    );

    if (!subject || !subject.chapters?.length) {
      return NextResponse.json(
        { message: "Chapter not found" },
        { status: 404 },
      );
    }

    const chapter = subject.chapters[0];
    const questionCount = chapter.questions?.length || 0;

    /* 2️⃣ Generate ID */
    const generatedId = `${chapterId}-q${questionCount + 1}`;

    const questionWithId = {
      ...question,
      id: generatedId,
    };

    /* 3️⃣ Push question */
    await Subject.updateOne(
      {
        subjectSlug,
        "chapters.id": chapterId,
      },
      {
        $push: {
          "chapters.$.questions": questionWithId,
        },
      },
    );

    return NextResponse.json({
      success: true,
      id: generatedId,
    });
  } catch (err) {
    console.error("QUESTION SAVE ERROR:", err);
    return NextResponse.json(
      { message: "Failed to save question" },
      { status: 500 },
    );
  }
}

export async function GET(req: Request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const subjectSlug = searchParams.get("subjectSlug");

    const subject = await Subject.findOne({ subjectSlug }).lean();

    if (!subject) {
      return NextResponse.json(
        { message: "Subject not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(subject);
  } catch (error) {
    console.error("SUBJECT META API ERROR:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    await connectToDatabase();

    const { subjectSlug, chapterId, questionId } = await req.json();

    if (!subjectSlug || !chapterId || !questionId) {
      return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
    }

    /* 1️⃣ Find the question (to get imageUrl) */
    const subject = await Subject.findOne(
      {
        subjectSlug,
        "chapters.id": chapterId,
        "chapters.questions.id": questionId,
      },
      {
        "chapters.$": 1,
      },
    ).lean();

    if (!subject || !subject.chapters?.length) {
      return NextResponse.json(
        { message: "Question not found" },
        { status: 404 },
      );
    }

    const chapter = subject.chapters[0];
    const question = chapter.questions.find((q: any) => q.id === questionId);

    /* 2️⃣ Delete image if exists */
    if (question?.imageUrl?.startsWith("/uploads/")) {
      const filePath = path.join(process.cwd(), "public", question.imageUrl);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    /* 3️⃣ Delete question from DB */
    const result = await Subject.updateOne(
      {
        subjectSlug,
        "chapters.id": chapterId,
      },
      {
        $pull: {
          "chapters.$.questions": { id: questionId },
        },
      },
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { message: "Failed to delete question" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      deletedQuestionId: questionId,
    });
  } catch (err) {
    console.error("DELETE QUESTION ERROR:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
