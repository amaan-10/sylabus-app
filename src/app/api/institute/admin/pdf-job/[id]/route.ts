import { connectToDatabase } from "@/lib/db";
import { getPdfJobModel } from "@/models/for-sylabus-institutes/PdfJob";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const conn = await connectToDatabase("sylabus-db-institutes");
  const PdfJob = getPdfJobModel(conn);

  const { id } = await context.params;

  const job = await PdfJob.findById(id).lean();

  if (!job) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(job);
}
