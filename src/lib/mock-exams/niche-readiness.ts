import { finalizeMockExamConfig } from "./taxonomy";
import type { MockExamConfig, MockExamConfigDraft, MockTopic } from "./types";

export const NICHE_DISCLAIMER =
  "This is an independent readiness diagnostic from UniPrep2Go. It is not official exam-board material and does not award certification or guarantee a passing score.";

/** Compact niche mock: 60 scored items (4 × 15). */
export const NICHE_TOPIC_QUESTIONS = 15;
export const NICHE_SESSION_QUESTIONS = NICHE_TOPIC_QUESTIONS * 4;

export function fourNicheTopics(
  topics: Array<{ id: string; label: string }>,
  targetPercent = 70,
): MockTopic[] {
  return topics.map((topic) => ({
    ...topic,
    questionCount: NICHE_TOPIC_QUESTIONS,
    weightPercent: 25,
    targetPercent,
  }));
}

export function nicheReadinessConfig(
  partial: Omit<
    MockExamConfigDraft,
    "accessMode" | "passRule" | "disclaimer" | "lastUpdated" | "status"
  > & {
    status?: MockExamConfig["status"];
    passPercent?: number;
    lastUpdated?: string;
  },
): MockExamConfig {
  const { passPercent = 70, status = "live", lastUpdated = "2026-07-16", ...rest } = partial;
  return finalizeMockExamConfig({
    ...rest,
    accessMode: "free_demand_test",
    status,
    disclaimer: NICHE_DISCLAIMER,
    lastUpdated,
    passRule: {
      type: "readiness_check",
      passPercent,
      borderlinePercent: passPercent - 5,
      verdictLabels: {
        pass: "READINESS PASS",
        noPass: "NO PASS",
        borderline: "BORDERLINE RISK",
      },
    },
  });
}

/** Bankless waitlist niche — indexed SEO guide + notify CTA until the bank ships. */
export function nicheWaitlistConfig(
  partial: Omit<
    MockExamConfigDraft,
    "accessMode" | "passRule" | "disclaimer" | "lastUpdated" | "status"
  > & {
    passPercent?: number;
    lastUpdated?: string;
  },
): MockExamConfig {
  const { passPercent = 70, lastUpdated = "2026-07-16", ...rest } = partial;
  return finalizeMockExamConfig({
    ...rest,
    accessMode: "coming_soon",
    status: "coming_soon",
    disclaimer: NICHE_DISCLAIMER,
    lastUpdated,
    passRule: {
      type: "readiness_check",
      passPercent,
      borderlinePercent: passPercent - 5,
      verdictLabels: {
        pass: "READINESS PASS",
        noPass: "NO PASS",
        borderline: "BORDERLINE RISK",
      },
    },
  });
}
