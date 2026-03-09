import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { getUserModel } from "@/models/for-sylabus-app/User";

export async function POST(req: Request) {
  const body = await req.json();
  const { firebaseUid, phone } = body;

  if (!firebaseUid || !phone) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  // connect to correct DB
  const conn = await connectToDatabase("sylabus-db");

  // get model attached to this connection
  const User = getUserModel(conn);

  let user = await User.findOne({ firebaseUid });

  if (!user) {
    await User.create({
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
