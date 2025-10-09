// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const url = req.nextUrl.clone();

  if (url.pathname.startsWith("/dashboard")) {
    if (!accessToken) {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  if (url.pathname === "/" && accessToken) {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/"], 
};
