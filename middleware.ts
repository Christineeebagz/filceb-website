// middleware.ts
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req: any) => {
  // Get the current path from req.url
  const url = new URL(req.url);
  const pathname = url.pathname;

  // Add pathname to headers so it can be accessed in layouts
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-pathname", pathname);

  // 🚨 CRITICAL: Don't redirect if we're already on an auth page
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  // 🚨 CRITICAL: Don't redirect if we're on the homepage
  if (pathname === "/") {
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  // Only check auth for protected routes
  const isAuthenticated = !!req.auth;

  if (!isAuthenticated) {
    // Redirect to signin with callback URL
    const signInUrl = new URL("/api/auth/signin", req.url);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
});

// Only protect specific routes, not everything
export const config = {
  matcher: [
    // Protect these routes only
    "/dashboard/:path*",
    "/profile/:path*",
    "/admin/:path*",
    // Add other protected routes here
  ],
};
