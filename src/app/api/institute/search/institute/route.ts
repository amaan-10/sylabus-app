import { NextResponse } from "next/server";
import Institute from "@/models/for-sylabus-institutes/Institute";
import { connectToInstituteDB } from "@/lib/db-connect/sylabus-db-institutes";

export async function GET(req: Request) {
  try {
    await connectToInstituteDB();

    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q") || "";

    if (!query) {
      return NextResponse.json([]);
    }

    const institutes = await Institute.find({
      name: { $regex: query, $options: "i" },
    })
      .select("_id name abbreviation location logoUrl")
      .limit(10);

    return NextResponse.json(institutes);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch institutes" },
      { status: 500 },
    );
  }
}
