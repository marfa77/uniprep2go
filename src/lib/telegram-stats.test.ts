import { describe, expect, it } from "vitest";
import { shouldReturnStats, toTelegramStatsMessage } from "./telegram-stats";
import type { FunnelStats } from "./funnel-store";

describe("telegram stats", () => {
  it("recognizes stats commands", () => {
    expect(shouldReturnStats("stats")).toBe(true);
    expect(shouldReturnStats("/stats")).toBe(true);
    expect(shouldReturnStats("/stats@mariccol_bot")).toBe(true);
    expect(shouldReturnStats("hello")).toBe(false);
  });

  it("formats the funnel summary for Telegram", () => {
    const stats: FunnelStats = {
      totalEvents: 7,
      byEvent: {
        page_view: 3,
        product_facts_view: 1,
        topic_matrix_view: 1,
        sample_cards_view: 0,
        catalog_view: 0,
        faq_view: 0,
        checkout_intent: 1,
        checkout_click: 1,
      },
      byDeck: { "cfa-level-1-anki-deck": 7 },
      bySource: { hero_cta: 1 },
      recentEvents: [],
      startedAt: "2026-05-31T15:00:00.000Z",
      updatedAt: "2026-05-31T15:10:00.000Z",
      storage: "redis",
    };

    expect(toTelegramStatsMessage(stats)).toContain("UniPrep2Go funnel stats");
    expect(toTelegramStatsMessage(stats)).toContain("Page views: 3");
    expect(toTelegramStatsMessage(stats)).toContain("Checkout clicks: 1");
    expect(toTelegramStatsMessage(stats)).toContain("CTA rate: 33.3%");
    expect(toTelegramStatsMessage(stats)).toContain("Storage: redis");
  });
});
