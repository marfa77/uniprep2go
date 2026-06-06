import { NextResponse } from "next/server";
import { getIndexNowUrls, submitIndexNowUrls } from "@/lib/indexnow";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 30;

function isAuthorized(request: Request): boolean {
  const secret = process.env.CRON_SECRET?.trim();
  if (!secret) return true;
  return request.headers.get("authorization") === `Bearer ${secret}`;
}

/** Weekly safety-net: ping all catalog URLs to IndexNow (Bing). */
export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const urls = getIndexNowUrls();
  const result = await submitIndexNowUrls(urls);

  return NextResponse.json({
    ok: result.ok,
    status: result.status,
    urlCount: result.urlCount,
    scope: "all",
    error: result.error,
    body: result.body,
  });
}
