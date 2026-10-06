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
    expect(cfaL2).toContain("88 multiple-choice questions in 22 vignette-based item sets");
    expect(cfaL2).toContain("Equities");
    expect(cfaL2).toContain("level-ii-exam");
    expect(cfaL2).not.toContain("44 vignette");

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
    expect(profile!.whats_changed?.some((line) => /SuperScore/i.test(line))).toBe(true);
    expect(profile!.candidate_qa.some((item) => /200 unique/i.test(item.a))).toBe(true);
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

  it("returns an RD exam profile with CDR adaptive exam and four domain weights", () => {
    const profile = getExamFactsProfileForDeck("rd-exam-anki-deck");
    expect(profile).not.toBeNull();
    expect(profile!.exam_facts.passing_score).toContain("25");
    expect(profile!.exam_facts.question_count).toMatch(/125|145/);
    expect(profile!.domain_weights).toHaveLength(4);
    expect(profile!.domain_weights.some((d) => /Nutrition Care/i.test(d.domain) && d.weight.includes("45"))).toBe(
      true,
    );
    expect(profile!.candidate_qa.some((item) => /Pearson VUE|independent/i.test(item.a))).toBe(true);
  });

  it("returns a NEBOSH IGC profile with GIC1/GIC2 assessment facts", () => {
    const profile = getExamFactsProfileForDeck("nebosh-anki-deck");
    expect(profile).not.toBeNull();
    expect(profile!.exam_facts.passing_score).toContain("45%");
    expect(profile!.exam_facts.verify_at_url).toContain("international-general-certificate");
    expect(profile!.domain_weights.length).toBeGreaterThanOrEqual(11);
    expect(profile!.candidate_qa.some((item) => /GIC2/i.test(item.a))).toBe(true);
    expect(profile!.candidate_qa.some((item) => /free 50-question/i.test(item.a))).toBe(true);
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

  it("returns an ACE CPT profile with 150-item structure and scaled pass score", () => {
    const profile = getExamFactsProfileForDeck("ace-cpt-anki-deck");
    expect(profile).not.toBeNull();
    expect(profile!.exam_facts.question_count).toContain("150");
    expect(profile!.exam_facts.passing_score).toMatch(/500/);
    expect(profile!.domain_weights).toHaveLength(4);
    expect(profile!.candidate_qa.some((item) => /not official ACE/i.test(item.a))).toBe(true);
  });

  it("returns an NHA CPCT/A profile with 2025 test-plan counts", () => {
    const profile = getExamFactsProfileForDeck("nha-cpct-anki-deck");
    expect(profile).not.toBeNull();
    expect(profile!.exam_facts.question_count).toContain("100 scored");
    expect(profile!.exam_facts.time_limit).toMatch(/2 hours/);
    expect(profile!.exam_facts.passing_score).toMatch(/390/);
    expect(profile!.domain_weights).toHaveLength(5);
    expect(profile!.candidate_qa.some((item) => /CCMA/i.test(item.a) && /phlebotomy/i.test(item.a))).toBe(true);
  });

  it("returns a Luxembourg Vivre ensemble profile with 40Q exam pathway", () => {
    const profile = getExamFactsProfileForDeck("luxembourg-vivre-ensemble-anki-deck");
    expect(profile).not.toBeNull();
    expect(profile!.exam_facts.question_count).toContain("40");
    expect(profile!.exam_facts.passing_score).toMatch(/Not stated.*28\/40/);
    expect(profile!.candidate_qa.some((item) => /Sproochentest/i.test(item.a))).toBe(true);
  });

  it("returns a Flanders MO profile with AgII pathway facts", () => {
    const profile = getExamFactsProfileForDeck("belgium-flanders-mo-anki-deck");
    expect(profile).not.toBeNull();
    expect(profile!.exam_facts.question_count).toMatch(/41/);
    expect(profile!.exam_facts.time_limit).toMatch(/120/);
    expect(profile!.exam_facts.passing_score).toMatch(/70%/);
    expect(profile!.exam_facts.passing_score).toMatch(/60%/);
    expect(profile!.candidate_qa.some((item) => /Wallonia/i.test(item.a))).toBe(true);
  });

  it("returns an NHA CMAA profile with 110+25 / 135 min / 390 honesty", () => {
    const profile = getExamFactsProfileForDeck("nha-cmaa-anki-deck");
    expect(profile).not.toBeNull();
    expect(profile!.exam_facts.question_count).toMatch(/110/);
    expect(profile!.exam_facts.question_count).toMatch(/25/);
    expect(profile!.exam_facts.time_limit).toMatch(/135|2 hours 15/);
    expect(profile!.exam_facts.passing_score).toMatch(/390/);
    expect(profile!.candidate_qa.some((item) => /CCMA/i.test(item.a))).toBe(true);
  });

  it("returns a Finland kansalaisuuskoe profile with 2027 application gate", () => {
    const profile = getExamFactsProfileForDeck("finland-kansalaisuuskoe-anki-deck");
    expect(profile).not.toBeNull();
    expect(profile!.exam_facts.verify_at_url).toContain("migri.fi");
    expect(profile!.high_yield_facts.some((fact) => /1 March 2027/i.test(fact))).toBe(true);
    expect(profile!.candidate_qa.some((item) => /Anki deck/i.test(item.a))).toBe(true);
  });

  it("returns an AHA BLS profile with HeartCode 25Q / 84% honesty", () => {
    const profile = getExamFactsProfileForDeck("aha-bls-provider-anki-deck");
    expect(profile).not.toBeNull();
    expect(profile!.exam_facts.question_count).toMatch(/25/);
    expect(profile!.exam_facts.passing_score).toMatch(/84%/);
    expect(profile!.candidate_qa.some((item) => /two-finger|heel of 1 hand/i.test(item.a))).toBe(true);
  });

  it("returns an ARDMS SPI profile with 110Q / 555 honesty", () => {
    const profile = getExamFactsProfileForDeck("ardms-spi-anki-deck");
    expect(profile).not.toBeNull();
    expect(profile!.exam_facts.question_count).toMatch(/110/);
    expect(profile!.exam_facts.passing_score).toMatch(/555/);
    expect(profile!.candidate_qa.some((item) => /ABD|OB/i.test(item.a))).toBe(true);
  });

  it("returns an ASCP MLS profile with 100Q CAT / scaled 400 honesty", () => {
    const profile = getExamFactsProfileForDeck("ascp-mls-anki-deck");
    expect(profile).not.toBeNull();
    expect(profile!.exam_facts.question_count).toMatch(/100/);
    expect(profile!.exam_facts.passing_score).toMatch(/400/);
    expect(profile!.exam_facts.time_limit).toMatch(/2 hours 30/);
    expect(profile!.candidate_qa.some((item) => /MLT/i.test(item.a))).toBe(true);
  });

  it("returns an ASCP MLT profile with 100Q CAT / scaled 400 honesty", () => {
    const profile = getExamFactsProfileForDeck("ascp-mlt-anki-deck");
    expect(profile).not.toBeNull();
    expect(profile!.exam_facts.question_count).toMatch(/100/);
    expect(profile!.exam_facts.passing_score).toMatch(/400/);
    expect(profile!.candidate_qa.some((item) => /MLS/i.test(item.a))).toBe(true);
  });

  it("returns ASWB Bachelors 122Q / 4h honesty", () => {
    const profile = getExamFactsProfileForDeck("aswb-bachelors-anki-deck");
    expect(profile).not.toBeNull();
    expect(profile!.exam_facts.question_count).toMatch(/122/);
    expect(profile!.candidate_qa.some((item) => /Clinical|LCSW/i.test(item.a))).toBe(true);
  });

  it("returns ASWB Clinical 122Q / 4h honesty", () => {
    const profile = getExamFactsProfileForDeck("aswb-clinical-anki-deck");
    expect(profile).not.toBeNull();
    expect(profile!.exam_facts.question_count).toMatch(/122/);
    expect(profile!.candidate_qa.some((item) => /Bachelors|LSW/i.test(item.a))).toBe(true);
  });

  it("returns NIC Barber theory 60 items / 90 min honesty", () => {
    const profile = getExamFactsProfileForDeck("barber-state-anki-deck");
    expect(profile).not.toBeNull();
    expect(profile!.exam_facts.time_limit).toMatch(/90/);
    expect(profile!.high_yield_facts.some((item) => /Cosmetology/i.test(item))).toBe(true);
  });

  it("returns Medication Aide / MACE 60Q / 2h honesty", () => {
    const profile = getExamFactsProfileForDeck("medication-aide-anki-deck");
    expect(profile).not.toBeNull();
    expect(profile!.exam_facts.time_limit).toMatch(/2 hours/);
    expect(profile!.candidate_qa.some((item) => /MACE/i.test(item.a))).toBe(true);
  });

  it("returns NIC Nail Theory 110 / 90 min honesty", () => {
    const profile = getExamFactsProfileForDeck("nail-technician-state-anki-deck");
    expect(profile).not.toBeNull();
    expect(profile!.exam_facts.question_count).toMatch(/110/);
    expect(profile!.high_yield_facts.some((item) => /Cosmetology/i.test(item))).toBe(true);
  });

  it("returns NSCA-CPT 155Q / 3h / scaled 70 honesty", () => {
    const profile = getExamFactsProfileForDeck("nsca-cpt-anki-deck");
    expect(profile).not.toBeNull();
    expect(profile!.exam_facts.time_limit).toMatch(/3 hours/);
    expect(profile!.candidate_qa.some((item) => /CSCS/i.test(item.a))).toBe(true);
  });

  it("returns HRCI PHR 90+25 / 2h / scaled 500 honesty", () => {
    const profile = getExamFactsProfileForDeck("phr-hrci-anki-deck");
    expect(profile).not.toBeNull();
    expect(profile!.exam_facts.passing_score).toMatch(/500/);
    expect(profile!.high_yield_facts.some((item) => /SHRM/i.test(item))).toBe(true);
  });

  it("returns PT aide no-national-exam honesty", () => {
    const profile = getExamFactsProfileForDeck("physical-therapy-aide-anki-deck");
    expect(profile).not.toBeNull();
    expect(profile!.exam_facts.question_count).toMatch(/No national/i);
    expect(profile!.candidate_qa.some((item) => /NPTE/i.test(item.a))).toBe(true);
  });

  it("returns Praxis Core three-test honesty", () => {
    const profile = getExamFactsProfileForDeck("praxis-core-anki-deck");
    expect(profile).not.toBeNull();
    expect(profile!.exam_facts.question_count).toMatch(/5713/);
    expect(profile!.high_yield_facts.some((item) => /5355/i.test(item))).toBe(true);
  });

  it("returns Praxis Special Education 120Q / 2h honesty", () => {
    const profile = getExamFactsProfileForDeck("praxis-special-education-anki-deck");
    expect(profile).not.toBeNull();
    expect(profile!.exam_facts.time_limit).toMatch(/2 hours/);
    expect(profile!.candidate_qa.some((item) => /Core/i.test(item.a))).toBe(true);
  });

  it("returns PN L1 not-RDN honesty", () => {
    const profile = getExamFactsProfileForDeck("precision-nutrition-l1-anki-deck");
    expect(profile).not.toBeNull();
    expect(profile!.high_yield_facts.some((item) => /RDN/i.test(item))).toBe(true);
  });

  it("returns unarmed security no-national-exam honesty", () => {
    const profile = getExamFactsProfileForDeck("unarmed-security-officer-anki-deck");
    expect(profile).not.toBeNull();
    expect(profile!.exam_facts.question_count).toMatch(/No national/i);
    expect(profile!.candidate_qa.some((item) => /armed/i.test(item.a))).toBe(true);
  });

  it("returns wastewater operator not-drinking-water honesty", () => {
    const profile = getExamFactsProfileForDeck("wastewater-operator-1-anki-deck");
    expect(profile).not.toBeNull();
    expect(profile!.exam_facts.question_count).toMatch(/No national/i);
    expect(profile!.high_yield_facts.some((item) => /drinking/i.test(item))).toBe(true);
  });

  it("returns electrical journeyman not-master honesty", () => {
    const profile = getExamFactsProfileForDeck("electrical-journeyman-anki-deck");
    expect(profile).not.toBeNull();
    expect(profile!.high_yield_facts.some((item) => /master/i.test(item))).toBe(true);
  });

  it("returns NATE Core not-EPA-608 honesty", () => {
    const profile = getExamFactsProfileForDeck("nate-core-anki-deck");
    expect(profile).not.toBeNull();
    expect(profile!.candidate_qa.some((item) => /608/i.test(item.a))).toBe(true);
  });

  it("returns plumbing journeyman not-master honesty", () => {
    const profile = getExamFactsProfileForDeck("plumbing-journeyman-anki-deck");
    expect(profile).not.toBeNull();
    expect(profile!.high_yield_facts.some((item) => /master/i.test(item))).toBe(true);
  });
});
