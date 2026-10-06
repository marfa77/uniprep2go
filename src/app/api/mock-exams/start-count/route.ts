import { NextResponse } from "next/server";
import { getMockExamConfig } from "@/lib/mock-exams/configs";
import { getPublicMockStartCount } from "@/lib/mock-exams/mock-start-count-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const slug = new URL(request.url).searchParams.get("slug")?.trim() ?? "";
  if (!slug || !getMockExamConfig(slug)) {
    return NextResponse.json({ count: null }, { status: 400 });
  }

  const count = await getPublicMockStartCount(slug);
  return NextResponse.json(
    { count },
    { headers: { "Cache-Control": "private, no-store" } },
  );
}
