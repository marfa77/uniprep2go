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
  formatSearchAndLlmTopPages,
  formatSevenDayDynamics,
  formatTodayTopPages,
  formatYesterdaySection,
} from "./telegram-stats";
import type { FunnelStats } from "./funnel-store";
import type { FunnelEvent } from "./analytics";

const sampleStats: FunnelStats = {
  ...emptyAggregate(),
  totalEvents: 7,
  byEvent: {
    page_view: 3,
    exam_facts_view: 0,
    product_facts_view: 1,
    topic_matrix_view: 1,
    sample_cards_view: 0,
    positioning_view: 0,
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
    deck_waitlist_interest: 0,
    mock_deck_cta_click: 0,
    mock_checkout_placeholder_click: 0,
    learn_checkout_click: 0,
    learn_redeem_success: 0,
    learn_credit_consumed: 0,
  },
  byDeck: { "cfa-level-1-anki-deck": 7, "frm-part-1-anki-deck": 2 },
  bySource: {
    hero_cta: 1,
    deck_page: 2,
    "mock:cfa-level-1-readiness-check:landing": 1,
    "mock:cfa-level-1-readiness-check:start:exam": 2,
    "mock:cfa-level-1-readiness-check:start:learn": 1,
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
      llm: 3,
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
      "cfa-level-1-anki-deck": { visitors: 14, intents: 2, completions: 0, conversions: 1 },
      "mock:cfa-level-1-readiness-check": { visitors: 8, intents: 3, completions: 1, conversions: 0 },
    },
    paths: {
      "/decks/cfa-level-1-anki-deck": 14,
      "/mock-exams/cfa-level-1-readiness-check": 8,
      "/": 9,
    },
    pathsByChannel: {
      google: {},
      chatgpt: {},
      llm: {},
      direct: {},
      other: {},
    },
    periodByCountry: { US: 12, PT: 4, DE: 2 },
    dailySnapshots: {
      "2026-06-09": {
        unique: 23,
        pageViews: 88,
        paths: {
          "/decks/cfa-level-1-anki-deck": { unique: 8, views: 12 },
          "/": { unique: 5, views: 7 },
        },
        byChannel: {
          google: 4,
          chatgpt: 2,
          llm: 1,
          direct: 12,
          other: 4,
        },
        byCountry: { US: 10, DE: 3 },
      },
      "2026-06-08": {
        unique: 22,
        pageViews: 210,
        paths: { "/": { unique: 9, views: 15 } },
        byChannel: { google: 3, chatgpt: 1, llm: 0, direct: 14, other: 4 },
        byCountry: { US: 8 },
      },
    },
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

  it("formats a growth-focused stats message", () => {
    const now = new Date("2026-06-10T12:00:00.000Z");
    const messages = toTelegramStatsMessages(sampleStats, now);
    const message = toTelegramStatsMessage(sampleStats, now);

    expect(messages).toHaveLength(1);
    expect(message).toContain("UniPrep2Go · growth pulse");
    expect(message).toContain("▸ YESTERDAY · 09.06 UTC");
    expect(message).toContain("23 unique · 88 views");
    expect(message).toContain("/decks/cfa-level-1-anki-deck — 12v (8u)");
    expect(message).toContain("▸ LAST 7 DAYS · unique / views per UTC day");
    expect(message).toContain("← yesterday");
    expect(message).toContain("▸ PERIOD TOTAL · since reset");
    expect(message).toContain("23 unique (new 18 · returning 5 (21.7% return rate))");
    expect(message).toContain("Mock: 3 starts (exam 2 · learn 1)");
    expect(message).toContain("▸ TOP SKUs (period");
    expect(message).toContain("cfa-level-1-anki-deck: 14 view → 2 intent → 1 convert (7.1%)");
    expect(message).toContain("▸ ACQUISITION");
    expect(message).not.toContain("Top pages (period):");
    expect(message).not.toContain("Динамика 7 дней");
  });

  it("explains yesterday paths from dailySnapshots", () => {
    const block = formatYesterdaySection(sampleStats, new Date("2026-06-10T12:00:00.000Z"));

    expect(block).toContain("▸ YESTERDAY · 09.06 UTC");
    expect(block).toContain("Top paths:");
    expect(block).toContain("/decks/cfa-level-1-anki-deck — 12v (8u)");
    expect(block).toContain("+1u");
  });

  it("formats Google and LLM top pages from recent events", () => {
    const recentEvents: FunnelEvent[] = [
      {
        eventId: "g1",
        name: "page_view",
        deckSlug: "us-citizenship-anki-deck",
        occurredAt: "2026-06-10T10:00:00.000Z",
        visitorId: "g-v1",
        path: "/blog/us-naturalization-civics-test-100-questions-only-10",
        referrer: "https://www.google.com/",
      },
      {
        eventId: "g2",
        name: "page_view",
        deckSlug: "us-citizenship-anki-deck",
        occurredAt: "2026-06-10T10:05:00.000Z",
        visitorId: "g-v2",
        path: "/blog/us-naturalization-civics-test-100-questions-only-10",
        referrer: "https://www.google.com/search?q=us+citizenship",
      },
      {
        eventId: "g3",
        name: "mock_landing_view",
        deckSlug: "citizenship-naturalization-anki-bundle",
        occurredAt: "2026-06-10T10:10:00.000Z",
        visitorId: "g-v3",
        path: "/mock-exams/us-citizenship-readiness-check",
        referrer: "https://google.com/",
      },
      {
        eventId: "c1",
        name: "page_view",
        deckSlug: "czech-a2-cce-anki-deck",
        occurredAt: "2026-06-10T11:00:00.000Z",
        visitorId: "c-v1",
        path: "/blog/czech-cce-language-vs-realie-civics-two-exams",
        referrer: "https://chatgpt.com/",
      },
      {
        eventId: "l1",
        name: "page_view",
        deckSlug: "czech-a2-cce-anki-deck",
        occurredAt: "2026-06-10T11:05:00.000Z",
        visitorId: "l-v1",
        path: "/blog/czech-citizenship-exam-zkouska-z-realii-complete-guide",
        referrer: "https://www.perplexity.ai/",
      },
      {
        eventId: "d1",
        name: "page_view",
        deckSlug: "cfa-level-1-anki-deck",
        occurredAt: "2026-06-10T12:00:00.000Z",
        visitorId: "d-v1",
        path: "/decks/cfa-level-1-anki-deck",
      },
    ];

    const block = formatSearchAndLlmTopPages({
      ...sampleStats,
      recentEvents,
    });

    expect(block).toContain("Top pages (Google · recent):");
    expect(block).toContain(
      "/blog/us-naturalization-civics-test-100-questions-only-10 — 2 (2u)",
    );
    expect(block).toContain("/mock-exams/us-citizenship-readiness-check — 1 (1u)");
    expect(block).toContain("Top pages (LLM · ChatGPT+LLM · recent):");
    expect(block).toContain("/blog/czech-cce-language-vs-realie-civics-two-exams — 1 (1u)");
    expect(block).toContain(
      "/blog/czech-citizenship-exam-zkouska-z-realii-complete-guide — 1 (1u)",
    );
    expect(block).not.toContain("/decks/cfa-level-1-anki-deck");
  });

  it("prefers period path∩channel ranks over all-time when period has data", () => {
    const block = formatSearchAndLlmTopPages({
      ...sampleStats,
      recentEvents: [],
      visitors: {
        ...sampleStats.visitors,
        lifetimeByChannel: {
          google: 20,
          chatgpt: 6,
          llm: 4,
          direct: 5,
          other: 2,
        },
        lifetimePathsByChannel: {
          google: {
            "/decks/california-real-estate-exam-anki-deck": 8,
            "/decks/cfa-level-1-anki-deck": 5,
          },
          chatgpt: {
            "/decks/frm-part-1-anki-deck": 3,
          },
          llm: {
            "/decks/bench-energy-metal-trader-anki-deck": 2,
          },
          direct: {},
          other: {},
        },
        pathsByChannel: {
          google: {
            "/blog/us-naturalization-civics-test-100-questions-only-10": 5,
          },
          chatgpt: {
            "/blog/czech-cce-language-vs-realie-civics-two-exams": 2,
          },
          llm: {},
          direct: {},
          other: {},
        },
      },
    });

    expect(block).toContain("Top pages (Google · period):");
    expect(block).toContain("/blog/us-naturalization-civics-test-100-questions-only-10 — 5u");
    expect(block).toContain("Top pages (LLM · ChatGPT+LLM · period):");
    expect(block).toContain("/blog/czech-cce-language-vs-realie-civics-two-exams — 2u");
    // All-time still shown as secondary when leader differs
    expect(block).toContain("Top pages (Google · all-time):");
    expect(block).toContain("/decks/california-real-estate-exam-anki-deck — 8u");
  });

  it("falls back to all-time when period is empty, and still shows recent when present", () => {
    const recentEvents: FunnelEvent[] = [
      {
        eventId: "g1",
        name: "page_view",
        deckSlug: "sie-exam-anki-deck",
        occurredAt: "2026-08-14T10:00:00.000Z",
        visitorId: "g-new",
        path: "/mock-exams/sie-full-mock",
        referrer: "https://www.google.com/",
      },
    ];

    const block = formatSearchAndLlmTopPages({
      ...sampleStats,
      recentEvents,
      visitors: {
        ...sampleStats.visitors,
        pathsByChannel: {
          google: {},
          chatgpt: {},
          llm: {},
          direct: {},
          other: {},
        },
        lifetimePathsByChannel: {
          google: {
            "/decks/california-real-estate-exam-anki-deck": 2,
          },
          chatgpt: {
            "/decks/frm-part-1-anki-deck": 1,
          },
          llm: {},
          direct: {},
          other: {},
        },
      },
    });

    expect(block).toContain("Top pages (Google · all-time):");
    expect(block).toContain("/decks/california-real-estate-exam-anki-deck — 2u");
    expect(block).toContain("Top pages (Google · recent):");
    expect(block).toContain("/mock-exams/sie-full-mock");
  });

  it("falls back to period path∩channel ranks when all-time is empty", () => {
    const block = formatSearchAndLlmTopPages({
      ...sampleStats,
      recentEvents: [],
      visitors: {
        ...sampleStats.visitors,
        pathsByChannel: {
          google: {
            "/blog/us-naturalization-civics-test-100-questions-only-10": 5,
            "/mock-exams/us-citizenship-readiness-check": 3,
          },
          chatgpt: {
            "/blog/czech-cce-language-vs-realie-civics-two-exams": 2,
          },
          llm: {
            "/blog/czech-citizenship-exam-zkouska-z-realii-complete-guide": 1,
          },
          direct: {},
          other: {},
        },
      },
    });

    expect(block).toContain("Top pages (Google · period):");
    expect(block).toContain(
      "/blog/us-naturalization-civics-test-100-questions-only-10 — 5u",
    );
    expect(block).toContain("Top pages (LLM · ChatGPT+LLM · period):");
    expect(block).toContain("/blog/czech-cce-language-vs-realie-civics-two-exams — 2u");
  });

  it("keeps Google channel sticky across wiped later page views in the recent window", () => {
    const recentEvents: FunnelEvent[] = [
      {
        eventId: "g1",
        name: "page_view",
        deckSlug: "us-citizenship-anki-deck",
        occurredAt: "2026-06-10T10:00:00.000Z",
        visitorId: "g-v1",
        path: "/blog/us-naturalization-civics-test-100-questions-only-10",
        referrer: "https://www.google.com/",
      },
      {
        eventId: "g1b",
        name: "page_view",
        deckSlug: "citizenship-naturalization-anki-bundle",
        occurredAt: "2026-06-10T10:02:00.000Z",
        visitorId: "g-v1",
        path: "/mock-exams/us-citizenship-readiness-check",
        referrer: "https://uniprep2go.study/blog/us-naturalization-civics-test-100-questions-only-10",
      },
    ];

    const block = formatSearchAndLlmTopPages({
      ...sampleStats,
      recentEvents,
    });

    expect(block).toContain("/mock-exams/us-citizenship-readiness-check — 1 (1u)");
  });

  it("formats today's top pages from recent events", () => {
    const now = new Date("2026-06-10T18:00:00.000Z");
    const recentEvents: FunnelEvent[] = [
      {
        eventId: "1",
        name: "page_view",
        deckSlug: "cfa-level-1-anki-deck",
        occurredAt: "2026-06-10T10:00:00.000Z",
        visitorId: "v1",
        path: "/decks/cfa-level-1-anki-deck",
      },
      {
        eventId: "2",
        name: "page_view",
        deckSlug: "cfa-level-1-anki-deck",
        occurredAt: "2026-06-10T11:00:00.000Z",
        visitorId: "v1",
        path: "/decks/cfa-level-1-anki-deck",
      },
      {
        eventId: "3",
        name: "mock_landing_view",
        deckSlug: "cfa-level-1-anki-deck",
        occurredAt: "2026-06-10T12:00:00.000Z",
        visitorId: "v2",
        path: "/mock-exams/cfa-level-1-readiness-check",
      },
      {
        eventId: "4",
        name: "page_view",
        deckSlug: "sie-exam-anki-deck",
        occurredAt: "2026-06-09T23:00:00.000Z",
        visitorId: "v3",
        path: "/",
      },
    ];

    const block = formatTodayTopPages(
      {
        ...sampleStats,
        recentEvents,
        visitors: {
          ...sampleStats.visitors,
          dailyUnique: { ...sampleStats.visitors.dailyUnique, "2026-06-10": 2 },
          dailyPageViews: { ...sampleStats.visitors.dailyPageViews, "2026-06-10": 3 },
        },
      },
      6,
      now,
    );

    expect(block).toContain("Top pages (today · 10.06 · 2 unique / 3 views):");
    expect(block).toContain("/decks/cfa-level-1-anki-deck — 2 (1u)");
    expect(block).toContain("/mock-exams/cfa-level-1-readiness-check — 1 (1u)");
    expect(block).not.toContain("\n- / —");
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

  it("formats the 7-day dynamics block with daily totals", () => {
    const block = formatSevenDayDynamics(
      sampleStats.visitors.dailyUnique,
      sampleStats.visitors.dailyPageViews,
      7,
      new Date("2026-06-10T12:00:00.000Z"),
    );

    expect(block).toContain("▸ LAST 7 DAYS · unique / views per UTC day");
    expect(block).toContain("04.06:  0u /   0v ·");
    expect(block).toContain("05.06: 10u / 114v ▪▪▪▪▪▪▪▪▪▪");
    expect(block).toContain("09.06: 23u /  88v");
    expect(block).toContain("← yesterday");
    expect(block).toContain("Σ7d:");
    expect(block).toContain("vs prior 7d unique:");
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

  it("shows only top 5 SKUs in the growth pulse", () => {
    const products = Object.fromEntries(
      Array.from({ length: 15 }, (_, index) => [
        `deck-${index + 1}`,
        { visitors: 15 - index, intents: 0, completions: 0, conversions: 0 },
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
    expect(message).toContain("deck-5: 11 view");
    expect(message).not.toContain("deck-6:");
    expect(message).toContain("- ...and 10 more SKUs");
  });

  it("splits only when the message is too long", () => {
    const messages = splitTelegramMessages("a".repeat(5000), 3900);

    expect(messages.length).toBeGreaterThan(1);
    expect(messages[0]).toContain("[1/");
    expect(toTelegramStatsMessages(sampleStats).every((message) => message.length <= 4096)).toBe(true);
  });
});
