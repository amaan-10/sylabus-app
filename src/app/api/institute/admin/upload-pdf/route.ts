export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import pdfParse from "pdf-parse-debugging-disabled";
import PdfJob from "@/models/for-sylabus-institutes/PdfJob";
import { connectToInstituteDB } from "@/lib/db-connect/sylabus-db-institutes";

export async function POST(req: Request) {
  try {
    await connectToInstituteDB();

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // ✅ EXACT SAME BUFFER LOGIC AS WORKING PROJECT
    const buffer = Buffer.from(await file.arrayBuffer());

    const parsed = await pdfParse(buffer);

    if (!parsed.text || parsed.text.trim().length === 0) {
      return NextResponse.json(
        { error: "No text found in PDF" },
        { status: 400 },
      );
    }

    const job = await PdfJob.create({
      originalFileName: file.name,
      extractedText: parsed.text,
      status: "PARSED",
    });

    return NextResponse.json({ jobId: job._id });
  } catch (err: any) {
    console.error("❌ PDF upload error:", err);
    return NextResponse.json(
      { error: err.message || "PDF parsing failed" },
      { status: 500 },
    );
  }
}
