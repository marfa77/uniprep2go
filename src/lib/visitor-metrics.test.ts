import { describe, expect, it } from "vitest";
import { createFunnelEvent } from "./analytics";
import { computeGrowthSignal } from "./telegram-stats";
import {
  readVisitorMetricsFromMemory,
  recordVisitorMetricInMemory,
  resetAllVisitorSets,
  resetPeriodVisitorSets,
  resolveProductKey,
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
      conversions: 0,
    });
    expect(metrics.products["mock:cfa-level-1-readiness-check"]).toMatchObject({
      visitors: 1,
      intents: 0,
      conversions: 0,
    });
    expect(metrics.paths["/decks/cfa-level-1-anki-deck"]).toBe(1);
    expect(metrics.periodNew).toBe(2);
    expect(metrics.periodReturning).toBe(0);
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
});
