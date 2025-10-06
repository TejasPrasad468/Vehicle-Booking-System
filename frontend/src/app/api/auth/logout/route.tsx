// app/api/auth/logout/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.json({ message: "Logged out successfully" });
  response.cookies.set("token", "", {
    httpOnly: false,
    sameSite: "strict",
    path: "/",
    maxAge: -1, // expires immediately
  });
  return response;
}
