import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("./redis", () => ({
  getRedisClient: () => null,
}));

import { createFunnelEvent } from "./analytics";
import { getFunnelStats, recordFunnelEvent, resetFunnelStats } from "./funnel-store";
import { resetAllVisitorSets } from "./visitor-metrics";

describe("funnel stats store", () => {
  beforeEach(async () => {
    resetAllVisitorSets();
    await resetFunnelStats();
  });

  it("counts events by name, deck, and source", async () => {
    const before = await getFunnelStats();

    await recordFunnelEvent(
      createFunnelEvent({
        name: "page_view",
        deckSlug: "cfa-level-1-anki-deck",
        visitorId: "vis_test_1",
        source: "landing_page",
        country: "US",
        browserLanguage: "en-US",
        referrer: "https://google.com/search?q=sie+anki",
        occurredAt: "2026-06-10T10:00:00.000Z",
      }),
    );
    await recordFunnelEvent(
      createFunnelEvent({
        name: "page_view",
        deckSlug: "cfa-level-1-anki-deck",
        visitorId: "vis_test_1",
        source: "landing_page",
        occurredAt: "2026-06-10T10:01:00.000Z",
      }),
    );
    await recordFunnelEvent(
      createFunnelEvent({
        name: "checkout_click",
        deckSlug: "cfa-level-1-anki-deck",
        visitorId: "vis_test_1",
        source: "hero_cta",
        country: "US",
        browserLanguage: "en-US",
        referrer: "https://google.com/search?q=sie+anki",
      }),
    );

    const stats = await getFunnelStats();

    expect(stats.byEvent).toMatchObject({
      page_view: 2,
      checkout_click: 1,
    });
    expect(stats.totalEvents - before.totalEvents).toBe(3);
    expect(stats.byEvent.page_view - before.byEvent.page_view).toBe(2);
    expect(stats.byEvent.checkout_click - before.byEvent.checkout_click).toBe(1);
    expect(stats.byDeck["cfa-level-1-anki-deck"] - (before.byDeck["cfa-level-1-anki-deck"] ?? 0)).toBe(3);
    expect(stats.bySource.hero_cta - (before.bySource.hero_cta ?? 0)).toBe(1);
    expect(stats.byCountry.US - (before.byCountry.US ?? 0)).toBe(2);
    expect(stats.byLanguage["en-US"] - (before.byLanguage["en-US"] ?? 0)).toBe(2);
    expect(stats.byReferrer["google.com"] - (before.byReferrer["google.com"] ?? 0)).toBe(2);
    expect(stats.lifetime.totalEvents - before.lifetime.totalEvents).toBe(3);
    expect(stats.lifetime.byEvent.checkout_click - before.lifetime.byEvent.checkout_click).toBe(1);
    expect(stats.visitors.periodUnique).toBe(1);
    expect(stats.visitors.periodByChannel.google).toBe(1);
    expect(stats.visitors.products["cfa-level-1-anki-deck"]).toMatchObject({
      visitors: 1,
      intents: 0,
      conversions: 1,
    });
    expect(stats.visitors.dailyPageViews["2026-06-10"]).toBe(2);
    expect(["memory", "redis"]).toContain(stats.storage);
  });

  it("preserves lifetime stats when the current period is reset", async () => {
    const before = await getFunnelStats();
    const lifetimeBefore = before.lifetime.totalEvents;

    await recordFunnelEvent(
      createFunnelEvent({
        name: "checkout_click",
        deckSlug: "cfa-level-1-anki-deck",
        source: "deck_page",
      }),
    );

    await resetFunnelStats();
    const stats = await getFunnelStats();

    expect(stats.totalEvents).toBe(0);
    expect(stats.lifetime.totalEvents).toBe(lifetimeBefore + 1);
    expect(stats.lifetime.byEvent.checkout_click).toBeGreaterThanOrEqual(1);
  });

  it("keeps the latest events for debugging", async () => {
    await recordFunnelEvent(
      createFunnelEvent({
        name: "checkout_intent",
        deckSlug: "cfa-level-1-anki-deck",
        source: "checkout_cta",
      }),
    );

    const stats = await getFunnelStats();

    expect(stats.recentEvents[0]).toMatchObject({
      name: "checkout_intent",
      source: "checkout_cta",
    });
  });
});
