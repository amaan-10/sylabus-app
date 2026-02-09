export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db-connect/sylabus-db";
import { User } from "@/models/for-sylabus-app/User";
import { cookies } from "next/headers";
import { adminAuth } from "@/lib/firebase-admin";

export async function GET(req: Request) {
  try {
    const session = (await cookies()).get("session")?.value;

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const decoded = await adminAuth.verifySessionCookie(session, true);

    const firebaseUid = decoded.uid;

    await connectToDatabase();

    const user = await User.findOne({ firebaseUid }).lean();

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
