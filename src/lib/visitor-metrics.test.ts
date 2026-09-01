import { describe, expect, it } from "vitest";
import { createFunnelEvent } from "./analytics";
import { computeGrowthSignal } from "./telegram-stats";
import {
  readVisitorMetricsFromMemory,
  recordVisitorMetricInMemory,
  resetAllVisitorSets,
  resetPeriodVisitorSets,
  resolveProductKey,
  shouldUseLifetimePathBackfillForPeriod,
} from "./visitor-metrics";

describe("visitor metrics", () => {
  it("tracks unique visitors, channels, products, and paths", () => {
    resetAllVisitorSets();

    recordVisitorMetricInMemory(
      createFunnelEvent({
        name: "page_view",
        deckSlug: "cfa-level-1-anki-deck",
        visitorId: "vis_a",
        path: "/decks/cfa-level-1-anki-deck",
        referrer: "https://google.com/search?q=cfa",
        country: "US",
      }),
    );
    recordVisitorMetricInMemory(
      createFunnelEvent({
        name: "checkout_intent",
        deckSlug: "cfa-level-1-anki-deck",
        visitorId: "vis_a",
        path: "/decks/cfa-level-1-anki-deck",
        country: "US",
      }),
    );
    recordVisitorMetricInMemory(
      createFunnelEvent({
        name: "mock_landing_view",
        deckSlug: "cfa-level-1-anki-deck",
        visitorId: "vis_b",
        source: "mock:cfa-level-1-readiness-check:landing",
        path: "/mock-exams/cfa-level-1-readiness-check",
        referrer: "https://chatgpt.com/",
        country: "PT",
      }),
    );

    const metrics = readVisitorMetricsFromMemory();

    expect(metrics.periodUnique).toBe(2);
    expect(metrics.periodByChannel.google).toBe(1);
    expect(metrics.periodByChannel.chatgpt).toBe(1);
    expect(metrics.periodByChannel.llm).toBe(0);
    expect(metrics.periodByCountry).toEqual({ US: 1, PT: 1 });
    expect(metrics.products["cfa-level-1-anki-deck"]).toMatchObject({
      visitors: 1,
      intents: 1,
      completions: 0,
      conversions: 0,
    });
    expect(metrics.products["mock:cfa-level-1-readiness-check"]).toMatchObject({
      visitors: 1,
      intents: 0,
      completions: 0,
      conversions: 0,
    });
    expect(metrics.paths["/decks/cfa-level-1-anki-deck"]).toBe(1);
    expect(metrics.pathsByChannel.google["/decks/cfa-level-1-anki-deck"]).toBe(1);
    expect(metrics.pathsByChannel.chatgpt["/mock-exams/cfa-level-1-readiness-check"]).toBe(1);
    expect(metrics.lifetimePathsByChannel.google["/decks/cfa-level-1-anki-deck"]).toBe(1);
    expect(metrics.lifetimePathsByChannel.chatgpt["/mock-exams/cfa-level-1-readiness-check"]).toBe(1);
    expect(metrics.periodNew).toBe(2);
    expect(metrics.periodReturning).toBe(0);

    const day = createFunnelEvent({
      name: "page_view",
      deckSlug: "cfa-level-1-anki-deck",
      visitorId: "vis_a",
      path: "/decks/cfa-level-1-anki-deck",
    }).occurredAt.slice(0, 10);
    expect(metrics.dailySnapshots[day]?.unique).toBe(2);
    expect(metrics.dailySnapshots[day]?.paths["/decks/cfa-level-1-anki-deck"]).toMatchObject({
      unique: 1,
      views: 1,
    });
    expect(metrics.dailySnapshots[day]?.paths["/mock-exams/cfa-level-1-readiness-check"]).toMatchObject({
      unique: 1,
      views: 1,
    });
    expect(metrics.dailySnapshots[day]?.byChannel.google).toBe(1);
    expect(metrics.dailySnapshots[day]?.byCountry.US).toBe(1);
  });

  it("keeps all-time Google/LLM path ranks after a period reset", () => {
    resetAllVisitorSets();

    recordVisitorMetricInMemory(
      createFunnelEvent({
        name: "page_view",
        deckSlug: "cfa-level-1-anki-deck",
        visitorId: "vis_google",
        path: "/decks/cfa-level-1-anki-deck",
        referrer: "https://www.google.com/",
      }),
    );
    recordVisitorMetricInMemory(
      createFunnelEvent({
        name: "page_view",
        deckSlug: "frm-part-1-anki-deck",
        visitorId: "vis_llm",
        path: "/decks/frm-part-1-anki-deck",
        referrer: "https://chatgpt.com/",
      }),
    );

    resetPeriodVisitorSets();

    const metrics = readVisitorMetricsFromMemory();

    expect(metrics.periodUnique).toBe(0);
    expect(metrics.paths["/decks/cfa-level-1-anki-deck"]).toBeUndefined();
    expect(metrics.pathsByChannel.google["/decks/cfa-level-1-anki-deck"]).toBeUndefined();
    expect(metrics.lifetimePathsByChannel.google["/decks/cfa-level-1-anki-deck"]).toBe(1);
    expect(metrics.lifetimePathsByChannel.chatgpt["/decks/frm-part-1-anki-deck"]).toBe(1);
  });

  it("does not leak historical paths into period ranks after reset", () => {
    resetAllVisitorSets();

    recordVisitorMetricInMemory(
      createFunnelEvent({
        name: "page_view",
        deckSlug: "cfa-level-1-anki-deck",
        visitorId: "vis_google",
        path: "/decks/cfa-level-1-anki-deck",
        referrer: "https://www.google.com/",
      }),
    );

    resetPeriodVisitorSets();

    recordVisitorMetricInMemory(
      createFunnelEvent({
        name: "page_view",
        deckSlug: "sie-exam-anki-deck",
        visitorId: "vis_google",
        path: "/mock-exams/sie-full-mock",
        referrer: "https://www.google.com/",
      }),
    );

    const metrics = readVisitorMetricsFromMemory();

    expect(metrics.pathsByChannel.google["/mock-exams/sie-full-mock"]).toBe(1);
    expect(metrics.pathsByChannel.google["/decks/cfa-level-1-anki-deck"]).toBeUndefined();
    expect(metrics.lifetimePathsByChannel.google["/decks/cfa-level-1-anki-deck"]).toBe(1);
    expect(metrics.lifetimePathsByChannel.google["/mock-exams/sie-full-mock"]).toBe(1);
  });

  it("backfills period top paths from lifetime∩period when period was never reset", () => {
    resetAllVisitorSets();

    recordVisitorMetricInMemory(
      createFunnelEvent({
        name: "page_view",
        deckSlug: "sie-exam-anki-deck",
        visitorId: "vis_sie",
        path: "/mock-exams/sie-full-mock",
        referrer: "https://www.google.com/",
      }),
    );
    recordVisitorMetricInMemory(
      createFunnelEvent({
        name: "page_view",
        deckSlug: "nebosh-anki-deck",
        visitorId: "vis_nebosh",
        path: "/decks/nebosh-anki-deck",
        referrer: "",
      }),
    );

    // Simulate pre-2026-08-14 Redis: lifetime paths exist, period path sets empty.
    const store = (
      globalThis as {
        __uniprep2goVisitorSets?: { periodPathVisitors: Map<string, Set<string>> };
      }
    ).__uniprep2goVisitorSets;
    store?.periodPathVisitors.clear();

    expect(shouldUseLifetimePathBackfillForPeriod(2, 2, 2, 0)).toBe(true);

    const metrics = readVisitorMetricsFromMemory();

    expect(metrics.paths["/mock-exams/sie-full-mock"]).toBe(1);
    expect(metrics.paths["/decks/nebosh-anki-deck"]).toBe(1);
    expect(metrics.pathsByChannel.google["/mock-exams/sie-full-mock"]).toBe(1);
  });

  it("only enables lifetime path backfill while period ≈ lifetime and paths are sparse", () => {
    expect(shouldUseLifetimePathBackfillForPeriod(299, 299, 120, 6)).toBe(true);
    expect(shouldUseLifetimePathBackfillForPeriod(299, 299, 120, 0)).toBe(true);
    expect(shouldUseLifetimePathBackfillForPeriod(299, 299, 120, 80)).toBe(false);
    expect(shouldUseLifetimePathBackfillForPeriod(299, 50, 120, 6)).toBe(false);
    expect(shouldUseLifetimePathBackfillForPeriod(2, 2, 2, 1)).toBe(false);
    expect(shouldUseLifetimePathBackfillForPeriod(0, 0)).toBe(false);
  });

  it("attributes later internal pages to the Google visitor via path∩channel", () => {
    resetAllVisitorSets();

    recordVisitorMetricInMemory(
      createFunnelEvent({
        name: "page_view",
        deckSlug: "us-citizenship-anki-deck",
        visitorId: "vis_google",
        path: "/blog/us-naturalization-civics-test-100-questions-only-10",
        referrer: "https://www.google.com/",
      }),
    );
    recordVisitorMetricInMemory(
      createFunnelEvent({
        name: "page_view",
        deckSlug: "citizenship-naturalization-anki-bundle",
        visitorId: "vis_google",
        path: "/mock-exams/us-citizenship-readiness-check",
        referrer: "https://uniprep2go.study/blog/foo",
      }),
    );

    const metrics = readVisitorMetricsFromMemory();

    expect(metrics.periodByChannel.google).toBe(1);
    expect(metrics.pathsByChannel.google["/blog/us-naturalization-civics-test-100-questions-only-10"]).toBe(
      1,
    );
    expect(metrics.pathsByChannel.google["/mock-exams/us-citizenship-readiness-check"]).toBe(1);
  });

  it("attributes llm channel from first-touch utm without referrer", () => {
    resetAllVisitorSets();

    recordVisitorMetricInMemory(
      createFunnelEvent({
        name: "page_view",
        deckSlug: "delf-b2-french-anki-deck",
        visitorId: "vis_llm",
        path: "/decks/delf-b2-french-anki-deck",
        utmSource: "llm",
        utmMedium: "llms.txt",
      }),
    );

    const metrics = readVisitorMetricsFromMemory();

    expect(metrics.periodByChannel.llm).toBe(1);
    expect(metrics.periodByChannel.direct).toBe(0);
  });

  it("tracks returning users on repeat visits", () => {
    resetAllVisitorSets();

    recordVisitorMetricInMemory(
      createFunnelEvent({
        name: "page_view",
        deckSlug: "cfa-level-1-anki-deck",
        visitorId: "vis_a",
        path: "/",
      }),
    );

    resetPeriodVisitorSets();

    recordVisitorMetricInMemory(
      createFunnelEvent({
        name: "page_view",
        deckSlug: "cfa-level-1-anki-deck",
        visitorId: "vis_a",
        path: "/decks/cfa-level-1-anki-deck",
      }),
    );
    recordVisitorMetricInMemory(
      createFunnelEvent({
        name: "page_view",
        deckSlug: "cfa-level-1-anki-deck",
        visitorId: "vis_b",
        path: "/",
      }),
    );

    const metrics = readVisitorMetricsFromMemory();

    expect(metrics.periodUnique).toBe(2);
    expect(metrics.periodNew).toBe(1);
    expect(metrics.periodReturning).toBe(1);
    expect(metrics.lifetimeUnique).toBe(2);
  });

  it("tracks mock completions separately from starts and deck CTAs", () => {
    resetAllVisitorSets();

    recordVisitorMetricInMemory(
      createFunnelEvent({
        name: "mock_landing_view",
        deckSlug: "sie-exam-anki-deck",
        visitorId: "vis_sie",
        source: "mock:sie-full-mock:landing",
        path: "/mock-exams/sie-full-mock",
      }),
    );
    recordVisitorMetricInMemory(
      createFunnelEvent({
        name: "mock_started",
        deckSlug: "sie-exam-anki-deck",
        visitorId: "vis_sie",
        source: "mock:sie-full-mock:start:exam",
        path: "/mock-exams/sie-full-mock",
      }),
    );
    recordVisitorMetricInMemory(
      createFunnelEvent({
        name: "mock_completed",
        deckSlug: "sie-exam-anki-deck",
        visitorId: "vis_sie",
        source: "mock:sie-full-mock:complete:exam",
        path: "/mock-exams/sie-full-mock",
      }),
    );

    const metrics = readVisitorMetricsFromMemory();

    expect(metrics.products["mock:sie-full-mock"]).toMatchObject({
      visitors: 1,
      intents: 1,
      completions: 1,
      conversions: 0,
    });
  });

  it("resolves mock product keys from source or path", () => {
    const event = createFunnelEvent({
      name: "mock_started",
      deckSlug: "cfa-level-1-anki-deck",
      source: "mock:cfa-level-1-readiness-check:start",
      path: "/mock-exams/cfa-level-1-readiness-check",
    });

    expect(resolveProductKey(event)).toBe("mock:cfa-level-1-readiness-check");
  });
});

describe("computeGrowthSignal", () => {
  it("detects growth, plateau, and cooling", () => {
    const now = new Date("2026-06-10T12:00:00.000Z");
    const growing = computeGrowthSignal(
      {
        "2026-06-04": 2,
        "2026-06-05": 2,
        "2026-06-06": 2,
        "2026-06-07": 2,
        "2026-06-08": 4,
        "2026-06-09": 5,
        "2026-06-10": 6,
        "2026-05-28": 1,
        "2026-05-29": 1,
        "2026-05-30": 1,
        "2026-05-31": 1,
        "2026-06-01": 1,
        "2026-06-02": 1,
        "2026-06-03": 1,
      },
      now,
    );

    expect(growing.label).toContain("↑ growing");
  });

  it("tracks tagged Threads uniques, views, and mock starts", () => {
    resetAllVisitorSets();

    recordVisitorMetricInMemory(
      createFunnelEvent({
        name: "page_view",
        deckSlug: "sie-exam-anki-deck",
        visitorId: "th_a",
        path: "/mock-exams/sie-full-mock",
        utmSource: "threads",
        utmMedium: "social",
      }),
    );
    recordVisitorMetricInMemory(
      createFunnelEvent({
        name: "mock_started",
        deckSlug: "sie-exam-anki-deck",
        visitorId: "th_a",
        path: "/mock-exams/sie-full-mock",
        source: "mock:sie-full-mock:start:exam",
        utmSource: "threads",
        utmMedium: "social",
      }),
    );
    recordVisitorMetricInMemory(
      createFunnelEvent({
        name: "page_view",
        deckSlug: "cfa-level-1-anki-deck",
        visitorId: "th_b",
        path: "/decks/cfa-level-1-anki-deck",
        referrer: "https://google.com/",
      }),
    );

    const metrics = readVisitorMetricsFromMemory();
    const day = new Date().toISOString().slice(0, 10);

    expect(metrics.threads.periodUnique).toBe(1);
    expect(metrics.threads.lifetimeUnique).toBe(1);
    expect(metrics.threads.dailyUnique[day]).toBe(1);
    expect(metrics.threads.dailyViews[day]).toBe(1);
    expect(metrics.threads.dailyMockStarts[day]).toBe(1);
  });
});
