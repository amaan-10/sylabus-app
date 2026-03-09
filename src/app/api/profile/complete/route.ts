import { NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import "@/lib/firebase-admin";
import { connectToDatabase } from "@/lib/db";
import { getUserModel } from "@/models/for-sylabus-app/User";

export async function POST(req: Request) {
  const body = await req.json();
  const { name, gender, role, board, medium, classLevel } = body;

  const authHeader = req.headers.get("authorization");

  if (!authHeader) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.split("Bearer ")[1];
  const decoded = await getAuth().verifyIdToken(token);

  // connect to correct DB
  const conn = await connectToDatabase("sylabus-db");

  // get model bound to this connection
  const User = getUserModel(conn);

  await User.findOneAndUpdate(
    { firebaseUid: decoded.uid },
    { name, gender, role, board, medium, classLevel },
    { new: true },
  );

  return NextResponse.json({ success: true });
}
