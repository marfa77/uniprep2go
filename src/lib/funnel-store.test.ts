import { beforeEach, describe, expect, it } from "vitest";
import { createFunnelEvent } from "./analytics";
import { getFunnelStats, recordFunnelEvent, resetFunnelStats } from "./funnel-store";

describe("funnel stats store", () => {
  beforeEach(async () => {
    await resetFunnelStats();
  });

  it("counts events by name, deck, and source", async () => {
    const before = await getFunnelStats();

    await recordFunnelEvent(
      createFunnelEvent({
        name: "page_view",
        deckSlug: "cfa-level-1-anki-deck",
        source: "landing_page",
      }),
    );
    await recordFunnelEvent(
      createFunnelEvent({
        name: "checkout_click",
        deckSlug: "cfa-level-1-anki-deck",
        source: "hero_cta",
      }),
    );

    const stats = await getFunnelStats();

    expect(stats.totalEvents - before.totalEvents).toBe(2);
    expect(stats.byEvent.page_view - before.byEvent.page_view).toBe(1);
    expect(stats.byEvent.checkout_click - before.byEvent.checkout_click).toBe(1);
    expect(stats.byDeck["cfa-level-1-anki-deck"] - (before.byDeck["cfa-level-1-anki-deck"] ?? 0)).toBe(2);
    expect(stats.bySource.hero_cta - (before.bySource.hero_cta ?? 0)).toBe(1);
    expect(stats.lifetime.totalEvents - before.lifetime.totalEvents).toBe(2);
    expect(stats.lifetime.byEvent.checkout_click - before.lifetime.byEvent.checkout_click).toBe(1);
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
