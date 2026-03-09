import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/db";
import { getInstituteUserModel } from "@/models/for-sylabus-institutes/InstituteUser";

export async function POST(req: Request) {
  try {
    const conn = await connectToDatabase("sylabus-db-institutes");
    const InstituteUser = getInstituteUserModel(conn);

    const { name, email, password, instituteId } = await req.json();

    if (!name || !email || !password || !instituteId) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const exists = await InstituteUser.findOne({ email }).lean();

    if (exists) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await InstituteUser.create({
      name,
      email,
      password: hashedPassword,
      instituteId,
    });

    return NextResponse.json({ success: true, userId: user._id });
  } catch (err: any) {
    console.error("Registration error:", err);

    return NextResponse.json(
      { error: err.message || "Registration failed" },
      { status: 500 },
    );
  }
}
