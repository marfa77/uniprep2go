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

    expect(listCitableExamDeckSlugs().length).toBeGreaterThanOrEqual(19);
  });

  it("returns a GMAT Focus profile with three equal sections", () => {
    const profile = getExamFactsProfileForDeck("gmat-focus-anki-deck");
    expect(profile).not.toBeNull();
    expect(profile!.exam_facts.question_count).toContain("64");
    expect(profile!.exam_facts.scoring_scale).toContain("205–805");
    expect(profile!.domain_weights).toHaveLength(3);
    expect(profile!.whats_changed?.some((line) => /January 31, 2024/i.test(line))).toBe(true);
  });

  it("returns an EPA Section 608 profile for the HVAC deck slug", () => {
    const profile = getExamFactsProfileForDeck("hvac-epa-608-anki-deck");
    expect(profile).not.toBeNull();
    expect(profile!.exam_facts.passing_score).toContain("18 of 25");
    expect(profile!.domain_weights).toHaveLength(4);
    expect(profile!.exam_facts.verify_at_url).toContain("epa.gov/section608");
    expect(profile!.candidate_qa.some((item) => /Universal exam/i.test(item.q))).toBe(true);
  });

  it("returns a BMS / BAS profile with honest credential framing", () => {
    const profile = getExamFactsProfileForDeck("bms-building-automation-anki-deck");
    expect(profile).not.toBeNull();
    expect(profile!.exam_facts.administered_by).toMatch(/No unified national exam/i);
    expect(profile!.domain_weights).toHaveLength(4);
    expect(profile!.high_yield_facts.some((line) => /BTL Listing applies to products/i.test(line))).toBe(true);
    expect(profile!.candidate_qa.some((item) => /BTL certified/i.test(item.q))).toBe(true);
  });

  it("returns LEED and CEM profiles with official scoring facts", () => {
    const leedGa = getExamFactsProfileForDeck("leed-green-associate-anki-deck");
    expect(leedGa!.exam_facts.passing_score).toContain("170");
    expect(leedGa!.exam_facts.question_count).toContain("100");

    const leedAp = getExamFactsProfileForDeck("leed-ap-bd-c-anki-deck");
    expect(leedAp!.exam_facts.exam_name).toContain("BD+C");
    expect(leedAp!.candidate_qa.some((item) => /O\+M/i.test(item.a))).toBe(true);

    const wellAp = getExamFactsProfileForDeck("well-ap-anki-deck");
    expect(wellAp!.exam_facts.passing_score).toContain("170");
    expect(wellAp!.domain_weights).toHaveLength(11);
    expect(wellAp!.candidate_qa.some((item) => /LEED AP/i.test(item.a))).toBe(true);

    const cem = getExamFactsProfileForDeck("cem-anki-deck");
    expect(cem!.exam_facts.passing_score).toContain("700");
    expect(cem!.exam_facts.question_count).toContain("130");
    expect(cem!.domain_weights.length).toBeGreaterThanOrEqual(14);
  });

  it("returns an ASHRAE certifications profile covering all seven ANSI programs", () => {
    const profile = getExamFactsProfileForDeck("ashrae-certifications-anki-deck");
    expect(profile).not.toBeNull();
    expect(profile!.domain_weights).toHaveLength(7);
    expect(profile!.exam_facts.passing_score).toContain("BCxP 83/120");
    expect(profile!.exam_facts.question_count).toContain("115");
    expect(profile!.candidate_qa.some((item) => /Seven ANSI/i.test(item.a))).toBe(true);
  });

  it("returns a CDCP profile with official 40-question / 68% pass facts", () => {
    const profile = getExamFactsProfileForDeck("cdcp-anki-deck");
    expect(profile).not.toBeNull();
    expect(profile!.exam_facts.passing_score).toContain("68%");
    expect(profile!.exam_facts.question_count).toContain("40");
    expect(profile!.domain_weights.length).toBeGreaterThanOrEqual(8);
    expect(profile!.candidate_qa.some((item) => /27.*40/i.test(item.a))).toBe(true);
  });

  it("returns a NEBOSH IGC profile with GIC1/GIC2 assessment facts", () => {
    const profile = getExamFactsProfileForDeck("nebosh-anki-deck");
    expect(profile).not.toBeNull();
    expect(profile!.exam_facts.passing_score).toContain("45%");
    expect(profile!.domain_weights.length).toBeGreaterThanOrEqual(11);
    expect(profile!.candidate_qa.some((item) => /GIC2/i.test(item.a))).toBe(true);
  });

  it("returns a CFPS profile with eight NFPA domains and pass/fail scoring note", () => {
    const profile = getExamFactsProfileForDeck("cfps-anki-deck");
    expect(profile).not.toBeNull();
    expect(profile!.domain_weights).toHaveLength(8);
    expect(profile!.domain_weights[0].domain).toContain("Fire Suppression");
    expect(profile!.exam_facts.passing_score).toContain("Not published");
    expect(profile!.exam_facts.question_count).toContain("100");
  });

  it("returns an MRICS profile describing APC submission and interview (not MCQ exam)", () => {
    const profile = getExamFactsProfileForDeck("mrics-anki-deck");
    expect(profile).not.toBeNull();
    expect(profile!.exam_facts.question_count).toContain("No multiple-choice");
    expect(profile!.exam_facts.time_limit).toContain("60 minutes");
    expect(profile!.candidate_qa.some((item) => /five attempts/i.test(item.a))).toBe(true);
  });

  it("returns an MRICS Quantity Surveying profile with six core competencies", () => {
    const profile = getExamFactsProfileForDeck("mrics-quantity-surveying-anki-deck");
    expect(profile).not.toBeNull();
    expect(profile!.exam_facts.exam_name).toContain("Quantity Surveying");
    expect(profile!.domain_weights.length).toBeGreaterThanOrEqual(7);
    expect(profile!.candidate_qa.some((item) => /Commercial management/i.test(item.a))).toBe(true);
  });
});
