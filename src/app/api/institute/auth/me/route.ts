import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

import { connectToDatabase } from "@/lib/db";
import { getInstituteUserModel } from "@/models/for-sylabus-institutes/InstituteUser";
import { getInstituteModel } from "@/models/for-sylabus-institutes/Institute";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET() {
  try {
    const conn = await connectToDatabase("sylabus-db-institutes");

    const InstituteUser = getInstituteUserModel(conn);

    // ✅ register Institute schema for populate
    getInstituteModel(conn);

    const token = (await cookies()).get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: string;
      role: string;
    };

    const user = await InstituteUser.findById(decoded.userId)
      .select("-password")
      .populate({
        path: "instituteId",
        select:
          "name abbreviation location logoUrl affiliation autonomous naac society description",
      })
      .lean();

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (err) {
    console.error("ME API error:", err);

    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 },
    );
  }
}
