import { describe, expect, it } from "vitest";
import { getAllMockExams, getMockExamConfig } from "./configs";
import {
  FREE_DIAGNOSTIC_QUESTIONS,
  allocateByWeight,
  freeAccessClause,
  freeDiagnosticConfig,
  freeVersionLine,
  hasShortFreeDiagnostic,
} from "./free-diagnostic";
import { buildMockExamFacts, buildMockExamMarkdown } from "./llm";
import { getCatalogDeckBySlug } from "../decks";
import { getPricedDecks, resolveDeckPriceForRender } from "../checkout-pricing";
import { buildLlmsFullTxt, buildLlmsTxt } from "../llm-docs";
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

  it("exposes free session facts on every mock in the API and markdown", () => {
    for (const config of getAllMockExams()) {
      const facts = buildMockExamFacts(config);
      expect(facts.free_question_count).toBe(Math.min(25, config.questionCount));
      expect(facts.free_duration_minutes).toBe(freeDiagnosticConfig(config).durationMinutes);
      expect(buildMockExamMarkdown(config)).toContain(`- Free version: ${freeVersionLine(config)}`);
    }
    expect(buildMockExamFacts(getMockExamConfig("cfa-level-1-readiness-check")!).free_duration_minutes).toBe(38);
    expect(buildMockExamFacts(getMockExamConfig("sie-full-mock")!).free_duration_minutes).toBe(35);
  });

  it("keeps hard-coded deck prices in mock copy equal to the linked deck price", () => {
    for (const config of getAllMockExams()) {
      const deck = getCatalogDeckBySlug(config.linkedDeckSlug);
      if (!deck || deck.status !== "available") continue;
      const amount = resolveDeckPriceForRender(deck as never).price.amount;
      for (const match of buildMockExamMarkdown(config).matchAll(/\$(\d+) \/ \d+[- ]card/g)) {
        expect(`${config.slug}: ${match[0]}`).toBe(`${config.slug}: $${amount}${match[0].slice(match[1]!.length + 1)}`);
      }
    }
  });

  it("never calls a long mock a free N-question test in LLM docs", async () => {
    const decks = await getPricedDecks();
    const longFree = /free[^.\n]{0,25}\b(3[0-9]|4[0-9]|[5-9][0-9]|1[0-9]{2})[- ]?(Q\b|question)/i;
    const freeNq = /free \[?[0-9]+Q/i;
    const lines = [buildLlmsTxt(decks), buildLlmsFullTxt(decks)]
      .flatMap((doc) => doc.split("\n"))
      .filter((line) => !/official/i.test(line));
    expect(lines.filter((line) => longFree.test(line) || freeNq.test(line))).toEqual([]);
  });
});
