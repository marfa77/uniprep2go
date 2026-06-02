import { NextResponse } from "next/server";
import { createFunnelEvent, parseFunnelEvent } from "@/lib/analytics";
import { shouldRecordFunnelEvent } from "@/lib/funnel-filter";
import { recordFunnelEvent } from "@/lib/funnel-store";
import { getMockAccessState } from "@/lib/mock-exams/access";
import { getMockExamConfig } from "@/lib/mock-exams/configs";

function normalizeVerdict(value: unknown) {
  return typeof value === "string" && value.length <= 40 ? value : undefined;
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    if (typeof payload.mockSlug !== "string" || payload.mockSlug.length > 120) {
      return NextResponse.json({ error: "Valid mockSlug is required" }, { status: 400 });
    }

    const config = getMockExamConfig(payload.mockSlug);
    const access = getMockAccessState(payload.mockSlug);

    if (!config || !access?.interestCaptureEnabled) {
      return NextResponse.json({ error: "Mock interest capture is not available" }, { status: 404 });
    }

    const event = parseFunnelEvent({
      name: "mock_unlock_interest",
      deckSlug: config.linkedDeckSlug,
      source: normalizeVerdict(payload.verdict)
        ? `mock:${config.slug}:interest:${normalizeVerdict(payload.verdict)}`
        : `mock:${config.slug}:interest`,
      path: `/mock-exams/${config.slug}`,
      acceptLanguage: request.headers.get("accept-language") ?? undefined,
      country: request.headers.get("x-vercel-ip-country") ?? undefined,
      region: request.headers.get("x-vercel-ip-country-region") ?? undefined,
      city: request.headers.get("x-vercel-ip-city") ?? undefined,
      userAgent: request.headers.get("user-agent") ?? undefined,
    });

    if (shouldRecordFunnelEvent(event, request)) {
      await recordFunnelEvent(event);
    }

    return NextResponse.json({ ok: true, eventId: event.eventId });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Invalid request" },
      { status: 400 },
    );
  }
}

export function createMockInterestEvent(mockSlug: string, deckSlug: string, verdict?: string) {
  return createFunnelEvent({
    name: "mock_unlock_interest",
    deckSlug,
    source: verdict ? `mock:${mockSlug}:interest:${verdict}` : `mock:${mockSlug}:interest`,
    path: `/mock-exams/${mockSlug}`,
  });
}
