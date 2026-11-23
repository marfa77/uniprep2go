import { describe, expect, it } from "vitest";
import { getMockExamConfig } from "../configs";
import { buildMockExamFaqs, buildMockSeoDescription } from "../seo";
import { buildMockExamPageJsonLd } from "../llm";
import {
  enrichmentMockSlugs,
  getMockEditorialBundle,
} from "./index";
import { resolveWeightTableQuestions } from "./resolve-weight-table";

describe("mock exam editorial enrichment", () => {
  it("registers all five batch-1 slugs with sections and sources", () => {
    for (const slug of enrichmentMockSlugs()) {
      const bundle = getMockEditorialBundle(slug);
      expect(bundle, slug).toBeTruthy();
      expect(bundle!.sections.length).toBeGreaterThanOrEqual(3);
      expect(bundle!.sources.length).toBeGreaterThanOrEqual(2);
      expect(bundle!.faqs.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("renders CFA L1 2027 weight rows from topic ids and label aliases", () => {
    const config = getMockExamConfig("cfa-level-1-readiness-check")!;
    const bundle = getMockEditorialBundle("cfa-level-1-readiness-check")!;
    const rows = resolveWeightTableQuestions(bundle.weightTable!.rows, config);
    expect(rows).toHaveLength(10);
    expect(rows.every((row) => row.questionsOnCheck !== null)).toBe(true);
    expect(rows.find((row) => row.displayLabel.includes("Ethical"))?.officialWeight).toBe(
      "10–15%",
    );
  });

  it("merges editorial FAQs into JSON-LD without duplicating SIE free-test questions", () => {
    const config = getMockExamConfig("sie-full-mock")!;
    const faqs = buildMockExamFaqs(config);
    expect(faqs.filter((f) => f.question === "Is there a free FINRA SIE practice test?")).toHaveLength(1);
    expect(faqs.some((f) => f.question === "Is the FINRA SIE practice test free?")).toBe(false);
    const jsonLd = buildMockExamPageJsonLd(config);
    const faqEntity = jsonLd["@graph"].find(
      (node) => typeof node === "object" && node !== null && "@type" in node && node["@type"] === "FAQPage",
    ) as { mainEntity: Array<{ name: string }> } | undefined;
    expect(
      faqEntity?.mainEntity.some((q) => q.name === "Is there a free FINRA SIE practice test?"),
    ).toBe(true);
    expect(
      faqEntity?.mainEntity.some((q) => /wait to retake the sie/i.test(q.name)),
    ).toBe(true);
  });

  it("includes FRM 2027 fee FAQ after editorial merge", () => {
    const config = getMockExamConfig("frm-part-1-readiness-check")!;
    const faqs = buildMockExamFaqs(config);
    expect(
      faqs.some((f) => f.question === "When are the 2027 FRM Part I exams and what do they cost?"),
    ).toBe(true);
    expect(faqs.some((f) => f.question === "Is there an official GARP FRM Part 1 mock?")).toBe(
      true,
    );
  });

  it("optional PTCB meta description override stays within meta limit", () => {
    const config = getMockExamConfig("ptcb-pharmacy-technician-mock")!;
    const meta = buildMockSeoDescription(config);
    expect(meta.length).toBeLessThanOrEqual(155);
    expect(meta).toContain("$129");
    expect(meta).toContain("January 2026");
  });

  it("exposes editorial section headings for CFA L1 2027 weights", () => {
    const bundle = getMockEditorialBundle("cfa-level-1-readiness-check")!;
    expect(bundle!.weightTable!.heading).toContain("2027");
    expect(bundle!.sections.some((s) => s.heading.includes("PSM"))).toBe(true);
    expect(bundle!.replaceExamFactsDomainWeights).toBe(true);
  });
});