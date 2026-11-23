import { getMockExamConfig } from "../configs";
import { FREE_DIAGNOSTIC_QUESTIONS } from "../free-diagnostic";
import { MOCK_PASS_PRICE_USD } from "../mock-pass";
import type { MockExamConfig } from "../types";

/** Live config for an editorial slug — copy reads counts from here, never hardcodes them. */
export function requireMockConfig(slug: string): MockExamConfig {
  const config = getMockExamConfig(slug);
  if (!config) throw new Error(`Editorial bundle references unknown mock slug: ${slug}`);
  return config;
}

export function topicQuestions(config: MockExamConfig, topicId: string): number {
  const topic = config.topics.find((t) => t.id === topicId);
  if (!topic || topic.questionCount == null) {
    throw new Error(`Topic ${topicId} on ${config.slug} has no question count`);
  }
  return topic.questionCount;
}

export function topicLabel(config: MockExamConfig, topicId: string): string {
  const topic = config.topics.find((t) => t.id === topicId);
  if (!topic) throw new Error(`Unknown topic ${topicId} on ${config.slug}`);
  return topic.label;
}

/** "25 questions free, then the full 60-question / 90-minute mock on Mock Pass ($19, unlimited mocks)". */
export function mockAccessLine(config: MockExamConfig): string {
  return `**${FREE_DIAGNOSTIC_QUESTIONS} questions free, no signup**, then the full **${config.questionCount}-question / ${config.durationMinutes}-minute** mock on UniPrep Mock Pass ($${MOCK_PASS_PRICE_USD}, unlimited mocks)`;
}

export { FREE_DIAGNOSTIC_QUESTIONS, MOCK_PASS_PRICE_USD };

/** Top-N topics by session question count, as "Label (n)" joined for prose. */
export function largestTopicsLine(config: MockExamConfig, n = 3): string {
  return [...config.topics]
    .sort((a, b) => (b.questionCount ?? 0) - (a.questionCount ?? 0))
    .slice(0, n)
    .map((t) => `${t.label} (${t.questionCount ?? 0})`)
    .join(", ");
}
