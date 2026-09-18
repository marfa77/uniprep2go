import { describe, expect, it } from "vitest";
import {
  detectBotBurstDay,
  filterBotBurstDailyCounts,
  isBotBurstDay,
} from "./traffic-bot-burst";
import type { DailyTrafficSnapshot } from "./visitor-metrics";

function burstSnapshot(overrides: Partial<DailyTrafficSnapshot> = {}): DailyTrafficSnapshot {
  const paths: Record<string, { unique: number; views: number }> = {};

  for (let index = 0; index < 120; index += 1) {
    paths[`/path-${index}`] = { unique: 1, views: 2 };
  }

  return {
    unique: 477,
    pageViews: 898,
    paths,
    byChannel: { google: 0, chatgpt: 0, llm: 0, direct: 475, other: 2 },
    byCountry: { SG: 458, CN: 9, US: 6, BR: 4 },
    ...overrides,
  };
}

describe("traffic bot burst", () => {
  it("flags the SG Direct catalog crawl pattern", () => {
    const verdict = detectBotBurstDay(burstSnapshot());

    expect(verdict.isBurst).toBe(true);
    expect(verdict.reason).toContain("SG Direct crawl");
    expect(isBotBurstDay(burstSnapshot())).toBe(true);
  });

  it("does not flag normal mixed-acquisition days", () => {
    expect(
      isBotBurstDay({
        unique: 23,
        pageViews: 88,
        paths: {
          "/decks/cfa-level-1-anki-deck": { unique: 8, views: 12 },
          "/": { unique: 5, views: 7 },
        },
        byChannel: { google: 4, chatgpt: 2, llm: 1, direct: 12, other: 4 },
        byCountry: { US: 10, DE: 3 },
      }),
    ).toBe(false);
  });

  it("does not flag a Direct-heavy day with few paths", () => {
    expect(
      isBotBurstDay({
        unique: 100,
        pageViews: 120,
        paths: {
          "/": { unique: 80, views: 90 },
          "/decks/cfa-level-1-anki-deck": { unique: 20, views: 30 },
        },
        byChannel: { google: 0, chatgpt: 0, llm: 0, direct: 98, other: 2 },
        byCountry: { US: 90, CA: 10 },
      }),
    ).toBe(false);
  });

  it("zeros burst days in filtered growth windows", () => {
    const snapshots = {
      "2026-09-17": burstSnapshot(),
      "2026-09-16": {
        unique: 13,
        pageViews: 26,
        paths: { "/": { unique: 5, views: 8 } },
        byChannel: { google: 2, chatgpt: 0, llm: 1, direct: 8, other: 2 },
        byCountry: { US: 7, DE: 3 },
      },
    };

    const result = filterBotBurstDailyCounts(
      { "2026-09-17": 477, "2026-09-16": 13 },
      { "2026-09-17": 898, "2026-09-16": 26 },
      snapshots,
      ["2026-09-16", "2026-09-17"],
    );

    expect(result.filteredUnique["2026-09-17"]).toBe(0);
    expect(result.filteredViews["2026-09-17"]).toBe(0);
    expect(result.filteredUnique["2026-09-16"]).toBe(13);
    expect(result.burstDays).toHaveLength(1);
  });
});
