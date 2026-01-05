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

  // Redirect logged-in users away from auth pages
  if (
    session &&
    (pathname === "/" || pathname === "/signin" || pathname === "/signup")
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Block protected routes if not logged in
  if (!session && isProtected) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/signin",
    "/signup",
    "/dashboard/:path*",
    "/courses/:path*",
    "/generated-papers/:path*",
    "/saved/:path*",
    "/account/:path*",
    "/auto-generate/:path*",
    "/custom-paper/:path*",
    "/quick-quiz/:path*",
    "/question-bank/:path*",
  ],
};
