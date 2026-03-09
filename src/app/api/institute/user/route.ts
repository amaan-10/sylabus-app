import { connectToDatabase } from "@/lib/db";
import { getInstituteUserModel } from "@/models/for-sylabus-institutes/InstituteUser";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const conn = await connectToDatabase("sylabus-db-institutes");
    const InstituteUser = getInstituteUserModel(conn);

    const body = await req.json();

    const user = await InstituteUser.create(body);

    return NextResponse.json({ success: true, user });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}

export async function GET(req: Request) {
  const conn = await connectToDatabase("sylabus-db-institutes");
  const InstituteUser = getInstituteUserModel(conn);

  const { searchParams } = new URL(req.url);
  const role = searchParams.get("role");
  const instituteId = searchParams.get("instituteId");

  const query: any = {};
  if (role) query.role = role;
  if (instituteId) query.instituteId = instituteId;

  const users = await InstituteUser.find(query)
    .populate("instituteId", "name")
    .populate("programIds", "program")
    .lean();

  return NextResponse.json(users);
}
