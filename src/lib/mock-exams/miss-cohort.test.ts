import { describe, expect, it } from "vitest";
import {
  buildMissCohortStore,
  isAgentUserAgent,
  MISS_COHORT_PUBLISH_MIN,
  toPublicMissCohort,
} from "./miss-cohort";

const config = {
  topics: [
    { id: "options", label: "Options", targetPercent: 70 },
    { id: "equity", label: "Equity", targetPercent: 70 },
  ],
};

describe("miss cohort", () => {
  it("hides public copy until the first-exam threshold", () => {
    let store = null as ReturnType<typeof buildMissCohortStore> | null;
    for (let i = 0; i < MISS_COHORT_PUBLISH_MIN - 1; i += 1) {
      store = buildMissCohortStore(
        config,
        [
          { topicId: "options", correct: 2, total: 10 },
          { topicId: "equity", correct: 8, total: 10 },
        ],
        store,
      );
    }
    expect(toPublicMissCohort(store!)).toBeNull();
    store = buildMissCohortStore(
      config,
      [
        { topicId: "options", correct: 2, total: 10 },
        { topicId: "equity", correct: 8, total: 10 },
      ],
      store,
    );
    const published = toPublicMissCohort(store);
    expect(published?.attempts).toBe(MISS_COHORT_PUBLISH_MIN);
    expect(published?.mostMissed.topicId).toBe("options");
    expect(published?.mostMissed.accuracyPercent).toBe(20);
    expect(published?.overallAccuracyPercent).toBe(50);
  });

  it("ignores unknown topic ids and Cursor user agents", () => {
    const store = buildMissCohortStore(
      config,
      [{ topicId: "leaked-item", correct: 0, total: 99 }],
      null,
    );
    expect(store.topics.every((row) => row.total === 0)).toBe(true);
    expect(
      isAgentUserAgent(
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Cursor/3.23.12 Chrome/148.0.7778.280 Electron/42.10.0 Safari/537.36",
      ),
    ).toBe(true);
    expect(isAgentUserAgent("Mozilla/5.0 Chrome/120.0.0.0")).toBe(false);
  });
});
