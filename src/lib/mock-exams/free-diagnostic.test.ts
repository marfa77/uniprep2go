import { describe, expect, it } from "vitest";
import { getAllMockExams, getMockExamConfig } from "./configs";
import {
  FREE_DIAGNOSTIC_QUESTIONS,
  allocateByWeight,
  freeAccessClause,
  freeDiagnosticConfig,
  hasShortFreeDiagnostic,
} from "./free-diagnostic";
import { createAttemptSeed, selectSessionQuestions } from "./scoring";
import { getQuestionBank } from "./question-bank";

describe("free diagnostic", () => {
  it("splits 25 questions by blueprint weight", () => {
    expect(allocateByWeight([15, 15, 15, 15], 25)).toEqual([7, 6, 6, 6]);
    expect(allocateByWeight([40, 20], 25).reduce((a, b) => a + b, 0)).toBe(25);
    expect(allocateByWeight([1, 1, 98], 25)).toEqual([1, 1, 23]);
  });

  it("scales every long mock to 25 questions at the same pace", () => {
    for (const config of getAllMockExams()) {
      const free = freeDiagnosticConfig(config);
      if (!hasShortFreeDiagnostic(config)) {
        expect(free).toBe(config);
        continue;
      }
      expect(free.questionCount).toBe(FREE_DIAGNOSTIC_QUESTIONS);
      expect(free.durationMinutes).toBeGreaterThanOrEqual(10);
      expect(free.durationMinutes).toBeLessThanOrEqual(config.durationMinutes);
      if (config.topics.every((topic) => typeof topic.questionCount === "number")) {
        expect(free.topics.reduce((sum, topic) => sum + (topic.questionCount ?? 0), 0)).toBe(25);
      }
    }
  });

  it("draws 25 stratified questions from the PTCB bank", () => {
    const config = getMockExamConfig("ptcb-pharmacy-technician-mock")!;
    const bank = getQuestionBank(config.slug);
    const session = selectSessionQuestions(bank, freeDiagnosticConfig(config), createAttemptSeed());
    expect(session).toHaveLength(25);
    expect(new Set(session.map((q) => q.topicId)).size).toBe(config.topics.length);
    expect(freeAccessClause(config)).toMatch(/^free 25-question \/ \d+-minute diagnostic$/);
  });
});
