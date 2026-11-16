import { describe, expect, it } from "vitest";
import { getMockExamConfig } from "./configs";
import { buildMockExamFaqs } from "./seo";
import { HEAD_TERM_SLUGS, getMockHeadTermBlock } from "./head-term-program";
import { getMockQuestionCountAeo } from "./mock-question-count-aeo";

describe("Bing head-term program", () => {
  it("covers all ten priority mocks", () => {
    expect(HEAD_TERM_SLUGS.length).toBe(10);
    for (const slug of HEAD_TERM_SLUGS) {
      const config = getMockExamConfig(slug);
      expect(config, slug).toBeDefined();
      const block = getMockHeadTermBlock(slug);
      expect(block?.h2.length, slug).toBeGreaterThan(5);
      expect(block?.faq.question, slug).toBeTruthy();
    }
  });

  it("adds question-count FAQ for allied-health priority mocks", () => {
    for (const slug of [
      "abo-optician-readiness-check",
      "nbrc-tmc-readiness-check",
      "ardms-spi-readiness-check",
      "medical-scribe-readiness-check",
    ]) {
      const config = getMockExamConfig(slug);
      expect(config).toBeDefined();
      const block = getMockQuestionCountAeo(config!);
      expect(block?.faq.question).toMatch(/how many questions/i);
      const faqs = buildMockExamFaqs(config!);
      expect(faqs.some((f) => f.question === block?.faq.question)).toBe(true);
    }
  });
});