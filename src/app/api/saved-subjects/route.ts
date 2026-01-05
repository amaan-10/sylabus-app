import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import SavedSubject from "@/models/SavedSubject";

export async function POST(req: Request) {
  try {
    const { userId, subjectId, subjectData } = await req.json();

    if (!userId || !subjectId) {
      return NextResponse.json(
        { error: "userId and subjectId are required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const saved = await SavedSubject.create({
      userId,
      subjectId,
      subjectData,
    });

    return NextResponse.json(saved, { status: 201 });
  } catch (err: any) {
    // Duplicate save
    if (err.code === 11000) {
      return NextResponse.json({ message: "Already saved" }, { status: 200 });
    }

    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const savedSubjects = await SavedSubject.find({ userId })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(savedSubjects);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { userId, subjectId } = await req.json();

    if (!userId || !subjectId) {
      return NextResponse.json(
        { error: "userId and subjectId are required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    await SavedSubject.deleteOne({ userId, subjectId });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
