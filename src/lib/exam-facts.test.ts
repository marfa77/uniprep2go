import { describe, expect, it } from "vitest";
import {
  buildExamFactsJson,
  buildExamFactsMarkdownSection,
  getExamFactsProfileForDeck,
  hasCitableExamLayer,
  listCitableExamDeckSlugs,
} from "./exam-facts";

describe("exam facts layer", () => {
  it("returns a full PTCE profile for PTCB deck slugs", () => {
    const profile = getExamFactsProfileForDeck("ptcb-pharmacy-technician-anki-deck");
    expect(profile).not.toBeNull();
    expect(profile!.exam_facts.passing_score).toContain("1,400");
    expect(profile!.exam_facts.delivery).toMatch(/In-person at Pearson VUE/i);
    expect(profile!.exam_facts.delivery).toMatch(/suspended December 12, 2025/i);
    expect(profile!.official_sources?.length).toBeGreaterThanOrEqual(3);
    expect(profile!.domain_weights).toHaveLength(4);
    expect(profile!.candidate_qa.some((item) => /pass the PTCE/i.test(item.q))).toBe(true);
    expect(getExamFactsProfileForDeck("ptcb-study-guide-2026")).toEqual(profile);
  });

  it("skips language decks", () => {
    expect(hasCitableExamLayer("ciple-a2-european-portuguese-anki-deck")).toBe(false);
    expect(getExamFactsProfileForDeck("ciple-a2-european-portuguese-anki-deck")).toBeNull();
  });

  it("builds markdown with citable sections before product facts", () => {
    const profile = getExamFactsProfileForDeck("ptcb-pharmacy-technician-anki-deck")!;
    const markdown = buildExamFactsMarkdownSection(profile);

    expect(markdown).toContain("## Pharmacy Technician Certification Exam (PTCE) exam facts");
    expect(markdown).toContain("1,400 scaled score");
    expect(markdown).toContain("| Medications | 35.00% |");
    expect(markdown).toContain("What changed in the 2026 PTCE");
    expect(markdown).toContain("Days supply = quantity dispensed");
    expect(markdown).toContain("### What score do you need to pass the PTCE?");
  });

  it("exports JSON blocks for /api/facts", () => {
    const profile = getExamFactsProfileForDeck("sie-exam-anki-deck")!;
    const json = buildExamFactsJson(profile);

    expect(json.exam_facts.administered_by).toBe("FINRA");
    expect(json.domain_weights).toHaveLength(4);
    expect(json.high_yield_facts.length).toBeGreaterThanOrEqual(5);
    expect(json.candidate_qa.length).toBeGreaterThanOrEqual(3);
    expect(json.official_sources.length).toBeGreaterThanOrEqual(2);
  });

  it("covers CFA Level 2, CAT4 Level D, and IB Biology SL decks", () => {
    expect(hasCitableExamLayer("cfa-level-2-anki-deck")).toBe(true);
    expect(hasCitableExamLayer("cfa-level-2-formula-reference-2026")).toBe(true);
    expect(hasCitableExamLayer("cat4-level-d-anki-deck-printable-pdf")).toBe(true);
    expect(hasCitableExamLayer("ib-biology-sl-anki-deck")).toBe(true);

    const cfaL2 = buildExamFactsMarkdownSection(getExamFactsProfileForDeck("cfa-level-2-anki-deck")!);
    expect(cfaL2).toContain("88 vignette-linked");
    expect(cfaL2).toContain("Equity Valuation");

    const cat4 = buildExamFactsMarkdownSection(
      getExamFactsProfileForDeck("cat4-level-d-anki-deck-printable-pdf")!,
    );
    expect(cat4).toContain("11 years 6 months to 14 years 11 months");
    expect(cat4).toContain("Verbal Classification");

    expect(listCitableExamDeckSlugs().length).toBeGreaterThanOrEqual(18);
  });
});
