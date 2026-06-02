import { describe, expect, it } from "vitest";
import { emptyAggregate } from "./funnel-aggregates";
import {
  shouldResetAllStats,
  shouldReturnStats,
  shouldSyncPrices,
  splitTelegramMessages,
  toTelegramStatsMessage,
  toTelegramStatsMessages,
  toTelegramResetAllMessage,
  toTelegramSyncMessage,
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
    section_view: 99,
    "mock:cfa-level-1-readiness-check:landing": 1,
    "mock:cfa-level-1-readiness-check:start": 1,
    "mock:cfa-level-1-readiness-check:unlock_interest": 1,
  },
  byCountry: { US: 5, PT: 2 },
  byLanguage: { "en-US": 4, "pt-PT": 2 },
  byReferrer: { "google.com": 4, "chatgpt.com": 2 },
  recentEvents: [
    {
      eventId: "evt_1",
      name: "checkout_click",
      deckSlug: "cfa-level-1-anki-deck",
      occurredAt: "2026-05-31T15:10:00.000Z",
      source: "deck_page",
      country: "US",
      browserLanguage: "en-US",
      referrer: "https://google.com/search?q=cfa+anki",
    },
  ],
  startedAt: "2026-05-31T15:00:00.000Z",
  updatedAt: "2026-05-31T15:10:00.000Z",
  lifetime: {
    ...emptyAggregate(),
    totalEvents: 147,
    byEvent: {
      page_view: 46,
      product_facts_view: 19,
      topic_matrix_view: 13,
      sample_cards_view: 4,
      catalog_view: 2,
      faq_view: 21,
      checkout_intent: 3,
      checkout_click: 1,
      mock_landing_view: 3,
      mock_started: 2,
      mock_question_answered: 0,
      mock_completed: 1,
      mock_result_view: 1,
      mock_pass_verdict: 0,
      mock_no_pass_verdict: 1,
      mock_unlock_interest: 1,
      mock_deck_cta_click: 1,
      mock_checkout_placeholder_click: 0,
    },
    byDeck: {
      "cfa-level-1-anki-deck": 80,
      "frm-part-1-anki-deck": 20,
    },
    bySource: {
      section_view: 95,
      home: 18,
      deck_page: 17,
      "mock:cfa-level-1-readiness-check:landing": 3,
      "mock:cfa-level-1-readiness-check:start": 2,
      "mock:cfa-level-1-readiness-check:complete": 1,
      "mock:cfa-level-1-readiness-check:verdict:no_pass": 1,
      "mock:cfa-level-1-readiness-check:no_pass": 1,
      "mock:cfa-level-1-readiness-check:interest:NO PASS": 1,
      "mock:cfa-level-1-readiness-check:deck_cta_click": 1,
    },
    byCountry: { US: 100, CA: 20 },
    byLanguage: { "en-US": 90, "en-CA": 20 },
    byReferrer: { "google.com": 70, "chatgpt.com": 10 },
    startedAt: "2026-05-01T10:00:00.000Z",
    updatedAt: "2026-05-31T15:10:00.000Z",
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
    expect(toTelegramResetAllMessage()).toContain("all funnel stats reset");
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

  it("formats full lifetime and current-period stats for Telegram", () => {
    const message = toTelegramStatsMessage(sampleStats);

    expect(message).toContain("UniPrep2Go funnel stats");
    expect(message).toContain("All-time");
    expect(message).toContain("Current period (since last reset)");
    expect(message).toContain("Total events: 147");
    expect(message).toContain("Total events: 7");
    expect(message).toContain("Top decks (all-time)");
    expect(message).toContain("- cfa-level-1-anki-deck: 80");
    expect(message).toContain("Mock exams breakdown (all-time)");
    expect(message).toContain(
      "- cfa-level-1-readiness-check: landing 3 · starts 2 · completions 1 · results 1 · pass 0 · no-pass 1 · interest 1 · deck CTA 1",
    );
    expect(message).toContain("Top sources (all-time)");
    expect(message).toContain("Top countries (all-time)");
    expect(message).toContain("- US: 100");
    expect(message).toContain("Top browser languages (current period)");
    expect(message).toContain("- en-US: 4");
    expect(message).toContain("Top referrers (all-time)");
    expect(message).toContain("- google.com: 70");
    expect(message).toContain("Recent events");
    expect(message).toContain("checkout_click · cfa-level-1-anki-deck · deck_page · US · en-US · google.com");
    expect(message).toContain("Storage: redis");
  });

  it("hides legacy section_view noise from top sources", () => {
    const message = toTelegramStatsMessage(sampleStats);

    expect(message).not.toContain("section_view");
    expect(message).toContain("- home: 18");
    expect(message).toContain("- deck_page: 17");
  });

  it("splits oversized Telegram messages into chunks", () => {
    const messages = splitTelegramMessages("a".repeat(5000), 3900);

    expect(messages.length).toBeGreaterThan(1);
    expect(messages[0]).toContain("[1/");
    expect(toTelegramStatsMessages(sampleStats).every((message) => message.length <= 4096)).toBe(
      true,
    );
  });
});
