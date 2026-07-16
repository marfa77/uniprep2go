import { NextResponse } from "next/server";
import { parseFunnelEvent } from "@/lib/analytics";
import { getDeckBySlug } from "@/lib/decks";
import { shouldRecordFunnelEvent } from "@/lib/funnel-filter";
import { recordFunnelEvent } from "@/lib/funnel-store";
import { getMockExamConfig } from "@/lib/mock-exams/configs";
import { notifyDeckWaitlistInterest } from "@/lib/telegram-notify";

function firstForwardedIp(value: string | null) {
  return value?.split(",")[0]?.trim() || undefined;
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    if (typeof payload.deckSlug !== "string" || payload.deckSlug.length > 120) {
      return NextResponse.json({ error: "Valid deckSlug is required" }, { status: 400 });
    }

    const deck = getDeckBySlug(payload.deckSlug);
    if (!deck) {
      return NextResponse.json({ error: "Deck not found" }, { status: 404 });
    }

    if (deck.status !== "planned") {
      return NextResponse.json(
        { error: "Waitlist is only available for planned decks" },
        { status: 400 },
      );
    }

    const mockSlug =
      typeof payload.mockSlug === "string" && payload.mockSlug.length <= 120
        ? payload.mockSlug
        : undefined;
    const linkedMock = mockSlug ? getMockExamConfig(mockSlug) : undefined;

    const event = parseFunnelEvent({
      name: "deck_waitlist_interest",
      deckSlug: deck.slug,
      source: linkedMock
        ? `deck:${deck.slug}:waitlist:from-mock:${linkedMock.slug}`
        : `deck:${deck.slug}:waitlist`,
      path: `/decks/${deck.slug}`,
      acceptLanguage: request.headers.get("accept-language") ?? undefined,
      country: request.headers.get("x-vercel-ip-country") ?? undefined,
      region: request.headers.get("x-vercel-ip-country-region") ?? undefined,
      city: request.headers.get("x-vercel-ip-city") ?? undefined,
      clientIp:
        firstForwardedIp(request.headers.get("x-forwarded-for")) ??
        request.headers.get("x-real-ip") ??
        undefined,
      userAgent: request.headers.get("user-agent") ?? undefined,
      referrer: typeof payload.referrer === "string" ? payload.referrer.slice(0, 500) : undefined,
    });

    try {
      const sent = await notifyDeckWaitlistInterest(event, deck);
      if (!sent) {
        console.warn("[telegram_notify] deck waitlist alert not sent", { deckSlug: deck.slug });
      }
    } catch (error) {
      console.error("[telegram_notify] deck waitlist alert failed", error);
    }

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
