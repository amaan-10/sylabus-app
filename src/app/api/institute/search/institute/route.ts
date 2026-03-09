import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { getInstituteModel } from "@/models/for-sylabus-institutes/Institute";

export async function GET(req: Request) {
  try {
    const conn = await connectToDatabase("sylabus-db-institutes");
    const Institute = getInstituteModel(conn);

    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q") || "";

    if (!query) {
      return NextResponse.json([]);
    }

    const institutes = await Institute.find({
      name: { $regex: query, $options: "i" },
    })
      .select("_id name abbreviation location logoUrl")
      .limit(10)
      .lean();

    return NextResponse.json(institutes);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch institutes" },
      { status: 500 },
    );
  }
}
