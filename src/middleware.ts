// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const url = req.nextUrl.clone();

  // Protect all /dashboard routes
  if (url.pathname.startsWith("/dashboard")) {
    // If there's no token, redirect to login
    if (!accessToken) {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  // Redirect logged-in users away from login page
  if (url.pathname === "/" && accessToken) {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  // Allow all other requests
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/"], // Apply to both dashboard and login routes
};
