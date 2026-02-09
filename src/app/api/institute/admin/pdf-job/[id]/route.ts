import { connectToInstituteDB } from "@/lib/db-connect/sylabus-db-institutes";
import PdfJob from "@/models/for-sylabus-institutes/PdfJob";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> },
) {
  await connectToInstituteDB();

  // ✅ UNWRAP params
  const { id } = await context.params;

  const job = await PdfJob.findById(id);
  if (!job) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(job);
}
