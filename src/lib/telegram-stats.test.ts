import { describe, expect, it } from "vitest";
import { emptyAggregate } from "./funnel-aggregates";
import { emptyVisitorMetrics } from "./visitor-metrics";
import {
  shouldResetAllStats,
  shouldReturnStats,
  shouldSyncPrices,
  splitTelegramMessages,
  toTelegramStatsMessage,
  toTelegramStatsMessages,
  toTelegramResetAllMessage,
  toTelegramSyncMessage,
  computeGrowthSignal,
  formatSevenDayDynamics,
} from "./telegram-stats";
import type { FunnelStats } from "./funnel-store";

const sampleStats: FunnelStats = {
  ...emptyAggregate(),
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
    mock_landing_view: 1,
    mock_started: 1,
    mock_question_answered: 0,
    mock_completed: 0,
    mock_result_view: 0,
    mock_pass_verdict: 0,
    mock_no_pass_verdict: 0,
    mock_unlock_interest: 1,
    mock_deck_cta_click: 0,
    mock_checkout_placeholder_click: 0,
  },
  byDeck: { "cfa-level-1-anki-deck": 7, "frm-part-1-anki-deck": 2 },
  bySource: {
    hero_cta: 1,
    deck_page: 2,
    "mock:cfa-level-1-readiness-check:landing": 1,
    "mock:cfa-level-1-readiness-check:start": 1,
    "mock:cfa-level-1-readiness-check:unlock_interest": 1,
  },
  byCountry: { US: 5, PT: 2 },
  byLanguage: { "en-US": 4, "pt-PT": 2 },
  byReferrer: { "google.com": 4, "chatgpt.com": 2 },
  recentEvents: [],
  startedAt: "2026-05-31T15:00:00.000Z",
  updatedAt: "2026-06-10T15:10:00.000Z",
  lifetime: emptyAggregate(),
  visitors: {
    ...emptyVisitorMetrics(),
    lifetimeUnique: 128,
    periodUnique: 23,
    periodNew: 18,
    periodReturning: 5,
    periodByChannel: {
      google: 12,
      chatgpt: 4,
      direct: 5,
      other: 2,
    },
    dailyUnique: {
      "2026-06-04": 0,
      "2026-06-05": 10,
      "2026-06-06": 19,
      "2026-06-07": 9,
      "2026-06-08": 22,
      "2026-06-09": 23,
      "2026-06-10": 0,
    },
    dailyPageViews: {
      "2026-06-04": 0,
      "2026-06-05": 114,
      "2026-06-06": 169,
      "2026-06-07": 156,
      "2026-06-08": 210,
      "2026-06-09": 88,
      "2026-06-10": 0,
    },
    products: {
      "cfa-level-1-anki-deck": { visitors: 14, intents: 2, conversions: 1 },
      "mock:cfa-level-1-readiness-check": { visitors: 8, intents: 3, conversions: 0 },
    },
    paths: {
      "/decks/cfa-level-1-anki-deck": 14,
      "/mock-exams/cfa-level-1-readiness-check": 8,
      "/": 9,
    },
    periodByCountry: { US: 12, PT: 4, DE: 2 },
  },
  storage: "redis",
};

describe("telegram stats", () => {
  it("recognizes stats commands", () => {
    expect(shouldReturnStats("stats")).toBe(true);
    expect(shouldReturnStats("/stats")).toBe(true);
    expect(shouldReturnStats("/stats@mariccol_bot")).toBe(true);
    expect(shouldReturnStats("hello")).toBe(false);
  });

  it("recognizes sync commands", () => {
    expect(shouldSyncPrices("sync")).toBe(true);
    expect(shouldSyncPrices("/sync")).toBe(true);
    expect(shouldSyncPrices("/sync@mariccol_bot")).toBe(true);
    expect(shouldSyncPrices("/stats")).toBe(false);
  });

  it("recognizes full stats reset commands", () => {
    expect(shouldResetAllStats("reset-all-stats")).toBe(true);
    expect(shouldResetAllStats("/reset-all-stats")).toBe(true);
    expect(shouldResetAllStats("/stats")).toBe(false);
    expect(toTelegramResetAllMessage()).toContain("all stats reset");
  });

  it("formats price sync results for Telegram", () => {
    const message = toTelegramSyncMessage({
      synced: 35,
      gumroad: 13,
      lemon: 0,
      failed: 22,
      errors: [],
    });

    expect(message).toContain("UniPrep2Go price sync complete");
    expect(message).toContain("Synced: 35");
    expect(message).toContain("Gumroad: 13");
    expect(message).toContain("Failed: 22");
    expect(message).toContain("Errors: none");
  });

  it("formats a single growth-focused stats message", () => {
    const messages = toTelegramStatsMessages(sampleStats);
    const message = toTelegramStatsMessage(sampleStats);

    expect(messages).toHaveLength(1);
    expect(message).toContain("UniPrep2Go · growth pulse");
    expect(message).toContain("Unique users: 23 period · 128 lifetime");
    expect(message).toContain("new 18 · returning 5 (21.7% return rate)");
    expect(message).toContain("Google 12 · ChatGPT 4 · Direct 5 · Other 2");
    expect(message).toContain("Countries (unique, period):");
    expect(message).toContain("US 12 · PT 4 · DE 2");
    expect(message).toContain("cfa-level-1-anki-deck: 14 view → 2 intent → 1 convert (7.1%)");
    expect(message).toContain("mock · cfa-level-1-readiness-check: 8 view → 3 intent → 0 convert (0.0%)");
    expect(message).toContain("/decks/cfa-level-1-anki-deck — 14");
    expect(message).toContain("Динамика 7 дней (посетители / просмотры)");
    expect(message).toContain(
      formatSevenDayDynamics(
        sampleStats.visitors.dailyUnique,
        sampleStats.visitors.dailyPageViews,
      ),
    );
    expect(message).not.toContain("All-time");
    expect(message).not.toContain("Recent events");
    expect(message).not.toContain("Last 7 days");
  });

  it("falls back to visit counts when unique country data is missing", () => {
    const message = toTelegramStatsMessage({
      ...sampleStats,
      byCountry: { US: 45, PT: 12 },
      visitors: {
        ...sampleStats.visitors,
        periodByCountry: {},
      },
    });

    expect(message).toContain("US 45 · PT 12 (visits)");
  });

  it("formats the 7-day dynamics block like the reference example", () => {
    const block = formatSevenDayDynamics(
      sampleStats.visitors.dailyUnique,
      sampleStats.visitors.dailyPageViews,
      7,
      new Date("2026-06-10T12:00:00.000Z"),
    );

    expect(block).toContain("Динамика 7 дней (посетители / просмотры)");
    expect(block).toContain("04.06: 0 / 0 ·");
    expect(block).toContain("05.06: 10 / 114 ▪▪▪▪▪▪▪▪▪▪");
    expect(block).toContain("06.06: 19 / 169 ▪▪▪▪▪▪▪▪▪▪▪▪");
    expect(block).toContain("10.06: 0 / 0 ·");
  });

  it("computes growth vs prior week", () => {
    const signal = computeGrowthSignal(
      {
        "2026-06-04": 0,
        "2026-06-05": 10,
        "2026-06-06": 19,
        "2026-06-07": 9,
        "2026-06-08": 22,
        "2026-06-09": 23,
        "2026-06-10": 0,
        "2026-06-03": 2,
        "2026-06-02": 2,
        "2026-06-01": 2,
        "2026-05-31": 2,
        "2026-05-30": 2,
        "2026-05-29": 2,
        "2026-05-28": 2,
      },
      new Date("2026-06-10T12:00:00.000Z"),
    );

    expect(signal.label).toContain("↑ growing");
  });

  it("shows only top 10 decks and mocks in the growth pulse", () => {
    const products = Object.fromEntries(
      Array.from({ length: 15 }, (_, index) => [
        `deck-${index + 1}`,
        { visitors: 15 - index, intents: 0, conversions: 0 },
      ]),
    );

    const message = toTelegramStatsMessage({
      ...sampleStats,
      visitors: {
        ...sampleStats.visitors,
        products,
      },
    });

    expect(message).toContain("deck-1: 15 view");
    expect(message).toContain("deck-10: 6 view");
    expect(message).not.toContain("deck-11:");
    expect(message).toContain("- ...and 5 more");
  });

  it("splits only when the message is too long", () => {
    const messages = splitTelegramMessages("a".repeat(5000), 3900);

    expect(messages.length).toBeGreaterThan(1);
    expect(messages[0]).toContain("[1/");
    expect(toTelegramStatsMessages(sampleStats).every((message) => message.length <= 4096)).toBe(true);
  });
});
