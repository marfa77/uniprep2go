import { NextResponse } from "next/server";
import { submitIndexNowSitemap } from "@/lib/indexnow";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 30;

function isAuthorized(request: Request): boolean {
  const secret = process.env.CRON_SECRET?.trim();
  if (!secret) return true;
  return request.headers.get("authorization") === `Bearer ${secret}`;
}

/** Weekly safety-net: ping all sitemap URLs to IndexNow (Bing). */
export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = await submitIndexNowSitemap();

  return NextResponse.json({
    ok: result.ok,
    status: result.status,
    urlCount: result.urlCount,
    error: result.error,
    body: result.body,
  });
}
