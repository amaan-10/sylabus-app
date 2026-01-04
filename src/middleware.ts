import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_PATHS = [
  "/dashboard",
  "/courses",
  "/generated-papers",
  "/saved",
  "/account",
  "/auto-generate",
  "/custom-paper",
  "/quick-quiz",
  "/question-bank",
];

export function middleware(req: NextRequest) {
  const session = req.cookies.get("session")?.value;
  const { pathname } = req.nextUrl;

  const isProtected = PROTECTED_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );

  // 🔒 Block protected routes if not logged in
  if (!session && isProtected) {
    const url = new URL("/", req.url);
    // url.searchParams.set("redirect", pathname); // optional
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/courses/:path*",
    "/generated-papers/:path*",
    "/saved/:path*",
    "/account",
  ],
};
