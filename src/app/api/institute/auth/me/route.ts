import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

import "@/models/for-sylabus-institutes/register";

import InstituteUser from "@/models/for-sylabus-institutes/InstituteUser";
import { connectToInstituteDB } from "@/lib/db-connect/sylabus-db-institutes";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET() {
  try {
    await connectToInstituteDB();

    const token = (await cookies()).get("token")?.value;

    if (!token) {
      console.error("No token found in cookies");
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
      });

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
