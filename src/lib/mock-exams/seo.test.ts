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
    expect(buildMockSeoDescription(servSafe!)).toContain("75%");

    expect(buildMockSeoTitle(sie!)).toContain("SIE Practice Test");
    expect(buildMockSeoDescription(sie!)).toContain("75-question");
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
