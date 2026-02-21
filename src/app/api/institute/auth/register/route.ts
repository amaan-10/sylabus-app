import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToInstituteDB } from "@/lib/db-connect/sylabus-db-institutes";
import InstituteUser from "@/models/for-sylabus-institutes/InstituteUser";

export async function POST(req: Request) {
  try {
    await connectToInstituteDB();
    const { name, email, password, instituteId } = await req.json();

    if (!name || !email || !password || !instituteId) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const exists = await InstituteUser.findOne({ email });
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
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
