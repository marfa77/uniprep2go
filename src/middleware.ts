import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  FUNNEL_EXCLUDE_COOKIE,
  FUNNEL_EXCLUDE_QUERY,
  FUNNEL_INCLUDE_QUERY,
} from "./lib/funnel-exclude";

const EXCLUDE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365 * 5;

export function middleware(request: NextRequest) {
  const search = request.nextUrl.search;
  const response = NextResponse.next();

  if (search.includes(FUNNEL_INCLUDE_QUERY)) {
    response.cookies.delete(FUNNEL_EXCLUDE_COOKIE);
    return response;
  }

  if (!search.includes(FUNNEL_EXCLUDE_QUERY)) {
    return response;
  }

  response.cookies.set(FUNNEL_EXCLUDE_COOKIE, "1", {
    maxAge: EXCLUDE_COOKIE_MAX_AGE,
    path: "/",
    sameSite: "lax",
    secure: request.nextUrl.protocol === "https:",
    httpOnly: true,
  });

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
};
