import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db-connect/sylabus-db";
import { User } from "@/models/for-sylabus-app/User";

export async function POST(req: Request) {
  const body = await req.json();
  const { firebaseUid, phone } = body;

  if (!firebaseUid || !phone) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  await connectToDatabase();

  let user = await User.findOne({ firebaseUid });

  if (!user) {
    user = await User.create({
      firebaseUid,
      phone,
    });

    return NextResponse.json({
      isNewUser: true,
    });
  }

  return NextResponse.json({
    isNewUser: false,
  });
}
