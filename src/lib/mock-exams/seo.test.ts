import { describe, expect, it } from "vitest";
import { getMockExamConfig } from "./configs";
import { buildMockExamFaqs, buildMockSeoDescription, buildMockSeoTitle } from "./seo";

describe("mock exam SEO", () => {
  it("targets practice-test keywords for priority mocks", () => {
    const servSafe = getMockExamConfig("servsafe-manager-mock");
    const sie = getMockExamConfig("sie-full-mock");

    expect(servSafe).toBeDefined();
    expect(sie).toBeDefined();

    expect(buildMockSeoTitle(servSafe!)).toContain("ServSafe Manager Practice Test");
    expect(buildMockSeoDescription(servSafe!)).toContain("90 timed questions");
    expect(buildMockSeoDescription(servSafe!)).toContain("70%");
    expect(buildMockSeoDescription(servSafe!)).toContain("75%");

    const cfaL1 = getMockExamConfig("cfa-level-1-readiness-check");
    const cfaL2 = getMockExamConfig("cfa-level-2-readiness-check");
    expect(cfaL1).toBeDefined();
    expect(cfaL2).toBeDefined();
    expect(buildMockSeoTitle(cfaL1!)).toBe("CFA Level 1 Practice Test | 25Q Free, 60Q Timed");
    expect(buildMockSeoTitle(cfaL2!)).toBe("CFA Level 2 Practice Exam | 25Q Free, 60Q Timed");
    expect(buildMockSeoDescription(cfaL1!)).toContain("CFA Level 1 practice test");
    expect(buildMockSeoDescription(cfaL1!)).not.toContain("$9.99");
    expect(buildMockSeoDescription(cfaL2!)).toContain("CFA Level 2 practice exam");
    expect(buildMockSeoDescription(cfaL2!)).not.toContain("$9.99");
    const l1Faqs = buildMockExamFaqs(cfaL1!);
    const l2Faqs = buildMockExamFaqs(cfaL2!);
    expect(l1Faqs.some((faq) => faq.question === "Is this the full CFA Level 1 exam?")).toBe(true);
    expect(l2Faqs.some((faq) => faq.question === "Is this a full CFA Level 2 item-set mock?")).toBe(true);
    const officialL2 = l2Faqs.find((faq) => faq.question.includes("official CFA Institute mock"));
    expect(officialL2?.answer).toContain("120 minutes");
    expect(officialL2?.answer).not.toContain("90 minutes");

    expect(buildMockSeoTitle(sie!)).toContain("SIE Practice Test");
    expect(buildMockSeoDescription(sie!)).toContain("75 timed questions");

    const rd = getMockExamConfig("rd-exam-readiness-check");
    expect(rd).toBeDefined();
    expect(buildMockSeoTitle(rd!)).toContain("RD Exam Practice Test");
    expect(buildMockSeoDescription(rd!)).toContain("120 timed questions");
    expect(buildMockSeoDescription(rd!)).not.toContain("60 timed questions");
    expect(buildMockSeoDescription(rd!)).toContain("$9.99");
  });

  it("exposes search-intent FAQs on the HTML page and in JSON-LD", () => {
    const config = getMockExamConfig("servsafe-manager-mock");
    expect(config).toBeDefined();

    const faqs = buildMockExamFaqs(config!);
    expect(faqs.some((faq) => faq.question.includes("free ServSafe Manager practice test"))).toBe(true);
    expect(faqs.some((faq) => faq.question.includes("How many questions"))).toBe(true);
    expect(faqs.length).toBeGreaterThanOrEqual(8);
  });
});
