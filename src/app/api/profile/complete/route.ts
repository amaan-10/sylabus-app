import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db-connect/sylabus-db";
import { User } from "@/models/for-sylabus-app/User";
import { getAuth } from "firebase-admin/auth";
import "@/lib/firebase-admin"; // init admin SDK

export async function POST(req: Request) {
  const body = await req.json();
  const { name, gender, role, board, medium, classLevel } = body;

  const authHeader = req.headers.get("authorization");
  if (!authHeader) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.split("Bearer ")[1];
  const decoded = await getAuth().verifyIdToken(token);

  await connectToDatabase();

  await User.findOneAndUpdate(
    { firebaseUid: decoded.uid },
    { name, gender, role, board, medium, classLevel },
  );

  return NextResponse.json({ success: true });
}
