export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import pdfParse from "pdf-parse-debugging-disabled";

import { connectToDatabase } from "@/lib/db";
import { getPdfJobModel } from "@/models/for-sylabus-institutes/PdfJob";

export async function POST(req: Request) {
  try {
    const conn = await connectToDatabase("sylabus-db-institutes");
    const PdfJob = getPdfJobModel(conn);

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // same buffer logic
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
