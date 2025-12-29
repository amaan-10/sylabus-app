import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import PaperDraft from "@/models/PaperDraft";

/* -------------------------------- POST -------------------------------- */
/* Create new draft every time */
export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const { userId, draft } = await req.json();

    if (!userId || !draft?.subjectSlug) {
      return NextResponse.json(
        { error: "userId and subjectSlug required" },
        { status: 400 }
      );
    }

    const saved = await PaperDraft.create({
      userId,
      subjectSlug: draft.subjectSlug,
      paperMode: draft.paperMode,
      draft,
      lastUpdated: new Date(),
    });

    return NextResponse.json({ draft: saved });
  } catch (err) {
    console.error("POST paper-draft error:", err);
    return NextResponse.json(
      { error: "Failed to save draft" },
      { status: 500 }
    );
  }
}

/* -------------------------------- GET -------------------------------- */
/* Get all drafts OR single draft */
export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const subjectSlug = searchParams.get("subjectSlug");

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    // single draft
    if (subjectSlug) {
      const draft = await PaperDraft.findOne({ userId, subjectSlug });
      return NextResponse.json({ draft });
    }

    // all drafts
    const drafts = await PaperDraft.find({ userId }).sort({
      updatedAt: -1,
    });

    return NextResponse.json({ drafts });
  } catch (err) {
    console.error("GET paper-draft error:", err);
    return NextResponse.json(
      { error: "Failed to fetch drafts" },
      { status: 500 }
    );
  }
}

/* -------------------------------- PUT -------------------------------- */
/* Update draft explicitly */
export async function PUT(req: NextRequest) {
  try {
    await connectToDatabase();

    const { userId, subjectSlug, updates } = await req.json();

    if (!userId || !subjectSlug) {
      return NextResponse.json(
        { error: "userId and subjectSlug required" },
        { status: 400 }
      );
    }

    const updated = await PaperDraft.findOneAndUpdate(
      { userId, subjectSlug },
      {
        ...updates,
        lastUpdated: new Date(),
      },
      { new: true }
    );

    return NextResponse.json({ draft: updated });
  } catch (err) {
    console.error("PUT paper-draft error:", err);
    return NextResponse.json(
      { error: "Failed to update draft" },
      { status: 500 }
    );
  }
}

/* -------------------------------- DELETE -------------------------------- */
/* Delete single or all drafts */
export async function DELETE(req: NextRequest) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const subjectSlug = searchParams.get("subjectSlug");

    if (!userId) {
      return NextResponse.json({ error: "userId required" }, { status: 400 });
    }

    if (subjectSlug) {
      await PaperDraft.deleteOne({ userId, subjectSlug });
      return NextResponse.json({ success: true });
    }

    await PaperDraft.deleteMany({ userId });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE paper-draft error:", err);
    return NextResponse.json(
      { error: "Failed to delete draft(s)" },
      { status: 500 }
    );
  }
}
