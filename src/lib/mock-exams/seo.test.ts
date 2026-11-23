import { describe, expect, it } from "vitest";
import { getMockExamConfig } from "./configs";
import { buildMockExamFaqs, buildMockSeoDescription, buildMockSeoTitle, getMockSeoProfile } from "./seo";
import { fitMetaDescription } from "../seo";

describe("mock exam SEO", () => {
  it("keeps exam specifics after the snippet lead instead of repeating the lead", () => {
    for (const slug of [
      "frm-part-1-readiness-check",
      "ptcb-pharmacy-technician-mock",
      "gre-readiness-check",
      "california-real-estate-readiness-check",
      "mrics-readiness-check",
      "epa-608-readiness-check",
    ]) {
      const config = getMockExamConfig(slug)!;
      const meta = fitMetaDescription(buildMockSeoDescription(config));
      expect(meta.length).toBeLessThanOrEqual(155);
      expect(meta.toLowerCase().split("no signup").length - 1).toBeLessThanOrEqual(1);
      expect(meta).not.toMatch(/practice (questions|exam) practice test/i);
      expect(meta.length).toBeGreaterThan(95);
    }
  });

  it("leaves the CFA pair and the 5 Nov frozen mocks untouched", () => {
    for (const slug of [
      "cfa-level-1-readiness-check",
      "cfa-level-2-readiness-check",
      "life-in-the-uk-readiness-check",
      "unarmed-security-officer-readiness-check",
    ]) {
      const meta = buildMockSeoDescription(getMockExamConfig(slug)!);
      expect(meta).not.toMatch(/^Free .* practice test 2026: 25 questions free, no signup\. /);
    }
  });

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
    expect(l2Faqs.some((faq) => faq.question === "How many questions are on CFA Level 2?")).toBe(true);
    const officialL2 = l2Faqs.find((faq) => faq.question === "How many questions are on CFA Level 2?");
    expect(officialL2?.answer).toContain("88 item-set");
    expect(officialL2?.answer).toContain("22 vignettes");

    expect(buildMockSeoTitle(sie!)).toContain("SIE Practice Test");
    expect(buildMockSeoDescription(sie!)).toContain("75 timed questions");

    const rd = getMockExamConfig("rd-exam-readiness-check");
    expect(rd).toBeDefined();
    expect(buildMockSeoTitle(rd!)).toContain("RD Exam Practice Test");
    expect(buildMockSeoDescription(rd!)).toContain("120 timed questions");
    expect(buildMockSeoDescription(rd!)).not.toContain("60 timed questions");
    expect(buildMockSeoDescription(rd!)).toContain("$9.99");
  });

  it("uses 2027 in default medical mock titles and leaves frozen mocks on 2026", () => {
    const abo = getMockExamConfig("abo-optician-readiness-check");
    const nbrc = getMockExamConfig("nbrc-tmc-readiness-check");
    const unarmed = getMockExamConfig("unarmed-security-officer-readiness-check");
    const ptcb = getMockExamConfig("ptcb-pharmacy-technician-mock");
    expect(abo).toBeDefined();
    expect(nbrc).toBeDefined();
    expect(unarmed).toBeDefined();
    expect(ptcb).toBeDefined();
    expect(buildMockSeoTitle(abo!)).toContain("2027");
    expect(buildMockSeoTitle(nbrc!)).toContain("2027");
    expect(getMockSeoProfile(unarmed!).title).toContain("2026");
    expect(getMockSeoProfile(unarmed!).title).not.toContain("2027");
    expect(buildMockSeoTitle(ptcb!)).toContain("2026");
  });

  it("answers GARP official mock on FRM Part 1 FAQ", () => {
    const config = getMockExamConfig("frm-part-1-readiness-check");
    expect(config).toBeDefined();
    const faqs = buildMockExamFaqs(config!);
    const garpFaq = faqs.find((faq) => faq.question === "Is there an official GARP FRM Part 1 mock?");
    expect(garpFaq?.answer).toContain("GARP Learning");
    expect(garpFaq?.answer).toContain("garp.org");
    expect(garpFaq?.answer).not.toMatch(/\d+-question GARP practice/);
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
