import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "bfs-super-secret-key-2026-production");

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("bfs_auth_token")?.value;
  const path = request.nextUrl.pathname;

  // Protect Admin Routes
  if (path.startsWith("/admin")) {
    if (!token) return NextResponse.redirect(new URL("/login?role=admin", request.url));
    
    try {
      const verified = await jwtVerify(token, JWT_SECRET);
      if (verified.payload.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/login?role=admin", request.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL("/login?role=admin", request.url));
    }
  }

  // Protect Partner Routes
  if (path.startsWith("/partner-dashboard")) {
    if (!token) return NextResponse.redirect(new URL("/login?role=partner", request.url));
    
    try {
      const verified = await jwtVerify(token, JWT_SECRET);
      // Admin can also view partner dashboard
      if (verified.payload.role !== "PARTNER" && verified.payload.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/login?role=partner", request.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL("/login?role=partner", request.url));
    }
  }

  // Protect Client Routes
  if (path.startsWith("/portal/customer")) {
    if (!token) return NextResponse.redirect(new URL("/login?role=client", request.url));
    
    try {
      const verified = await jwtVerify(token, JWT_SECRET);
      if (verified.payload.role !== "CUSTOMER" && verified.payload.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/login?role=client", request.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL("/login?role=client", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/partner-dashboard/:path*",
    "/portal/customer/:path*"
  ],
};
