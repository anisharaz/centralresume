import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { auth } from "./lib/auth";

type Session = typeof auth.$Infer.Session;
export async function middleware(request: NextRequest) {
  try {
    const response = await axios.get<Session>("/api/auth/get-session", {
      baseURL: request.nextUrl.origin,
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    });

    const session = response.data;

    if (!session) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

export const config = {
  matcher: ["/user/:path*", "/getting-started"], // protected routes
};
