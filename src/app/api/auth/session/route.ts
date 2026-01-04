import { NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import "@/lib/firebase-admin"; // init admin SDK

export async function POST(req: Request) {
  const { token } = await req.json();

  if (!token) {
    return NextResponse.json({ error: "Token missing" }, { status: 401 });
  }

  try {
    const decoded = await getAuth().verifyIdToken(token);

    const sessionCookie = await getAuth().createSessionCookie(token, {
      expiresIn: 60 * 60 * 24 * 5 * 1000, // 5 days
    });

    const res = NextResponse.json({ success: true });

    res.cookies.set("session", sessionCookie, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 5,
    });

    return res;
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
