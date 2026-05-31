import { beforeEach, describe, expect, it } from "vitest";
import { createFunnelEvent } from "./analytics";
import { getFunnelStats, recordFunnelEvent, resetFunnelStats } from "./funnel-store";

describe("funnel stats store", () => {
  beforeEach(async () => {
    await resetFunnelStats();
  });

  it("counts events by name, deck, and source", async () => {
    await recordFunnelEvent(
      createFunnelEvent({
        name: "page_view",
        deckSlug: "cfa-level-1-anki-deck",
        source: "landing_page",
      }),
    );
    await recordFunnelEvent(
      createFunnelEvent({
        name: "gumroad_click",
        deckSlug: "cfa-level-1-anki-deck",
        source: "hero_cta",
      }),
    );

    const stats = await getFunnelStats();

    expect(stats.totalEvents).toBe(2);
    expect(stats.byEvent.page_view).toBe(1);
    expect(stats.byEvent.gumroad_click).toBe(1);
    expect(stats.byDeck["cfa-level-1-anki-deck"]).toBe(2);
    expect(stats.bySource.hero_cta).toBe(1);
    expect(stats.storage).toBe("memory");
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
