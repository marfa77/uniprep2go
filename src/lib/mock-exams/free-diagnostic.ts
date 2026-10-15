import type { MockExamConfig } from "./types";

/** The free first attempt is a short diagnostic; Mock Pass attempts run the full session. */
export const FREE_DIAGNOSTIC_QUESTIONS = 25;

export function hasShortFreeDiagnostic(config: Pick<MockExamConfig, "questionCount">) {
  return config.questionCount > FREE_DIAGNOSTIC_QUESTIONS;
}

export function freeDiagnosticMinutes(config: Pick<MockExamConfig, "questionCount" | "durationMinutes">) {
  if (!hasShortFreeDiagnostic(config)) return config.durationMinutes;
  return Math.max(
    10,
    Math.round((config.durationMinutes * FREE_DIAGNOSTIC_QUESTIONS) / config.questionCount),
  );
}

/** Short clause for meta/FAQ copy: what the free first attempt is on this mock. */
export function freeAccessClause(config: Pick<MockExamConfig, "questionCount" | "durationMinutes">) {
  return hasShortFreeDiagnostic(config)
    ? `free ${FREE_DIAGNOSTIC_QUESTIONS}-question / ${freeDiagnosticMinutes(config)}-minute diagnostic`
    : "first mock free";
}

/** Largest-remainder split of `total` across weights; every weight > 0 gets at least 1 when possible. */
export function allocateByWeight(weights: number[], total: number): number[] {
  const sum = weights.reduce((acc, weight) => acc + weight, 0);
  if (sum <= 0) return weights.map(() => 0);
  const positive = weights.filter((weight) => weight > 0).length;
  const floorOne = positive <= total;
  const raw = weights.map((weight) => (weight * total) / sum);
  const counts = raw.map((value, index) =>
    Math.max(floorOne && weights[index]! > 0 ? 1 : 0, Math.floor(value)),
  );
  let left = total - counts.reduce((acc, count) => acc + count, 0);
  const order = raw
    .map((value, index) => ({ index, rest: value - Math.floor(value) }))
    .sort((a, b) => b.rest - a.rest);
  for (let step = 0; left > 0; step += 1) {
    counts[order[step % order.length]!.index]! += 1;
    left -= 1;
  }
  for (let step = 0; left < 0; step += 1) {
    const index = counts.indexOf(Math.max(...counts));
    counts[index]! -= 1;
    left += 1;
  }
  return counts;
}

/**
 * Session config for the free attempt: 25 questions, time scaled to the same pace,
 * topic quotas scaled to the same blueprint weights.
 */
export function freeDiagnosticConfig(config: MockExamConfig): MockExamConfig {
  if (!hasShortFreeDiagnostic(config)) return config;

  const counted = config.topics.every((topic) => typeof topic.questionCount === "number");
  const topics = counted
    ? (() => {
        const counts = allocateByWeight(
          config.topics.map((topic) => topic.questionCount ?? 0),
          FREE_DIAGNOSTIC_QUESTIONS,
        );
        return config.topics.map((topic, index) => ({ ...topic, questionCount: counts[index]! }));
      })()
    : config.topics;

  return {
    ...config,
    questionCount: FREE_DIAGNOSTIC_QUESTIONS,
    durationMinutes: freeDiagnosticMinutes(config),
    topics,
  };
}
