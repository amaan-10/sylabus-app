import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/models/User";
import { cookies } from "next/headers";
import { getAuth } from "firebase-admin/auth";

export async function GET(req: Request) {
  try {
    const session = (await cookies()).get("session")?.value;

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const decoded = await getAuth().verifySessionCookie(session, true);

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
