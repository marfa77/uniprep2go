import { describe, expect, it } from "vitest";
import { getBlogPostBySlug } from "./blog";
import { getDeckBySlug } from "./decks";
import { buildDeckSeoHeadline } from "./deck-seo";
import { getMockExamConfig, getAllMockExams } from "./mock-exams/configs";
import { buildMockSeoPageCopy } from "./mock-exams/seo";

describe("Meta / H1 fixes (24 Nov 2026)", () => {
  it("meta descriptions drop unsourced or contradicted claims", () => {
    const meta = (s: string) => getBlogPostBySlug(s)!.metaDescription;
    expect(meta("cdl-general-knowledge-test-50-questions-what-to-expect")).not.toMatch(/half fail|60 minutes|Exact topic split/);
    expect(meta("how-many-practice-tests-before-servsafe-manager-exam")).not.toMatch(/2–3|85%|ServSafe data/);
    expect(meta("florida-food-manager-certification-dbpr-rules")).not.toMatch(/4-employee|most people overpay/);
    expect(meta("life-in-the-uk-test-why-one-in-three-fail")).not.toMatch(/25% fail/);
    expect(meta("denmark-indfoedsretsproeven-47-percent-pass-rate")).not.toMatch(/47%|pass rate/);
    expect(meta("belgium-citizenship-test-flanders-vs-wallonia")).not.toMatch(/hike to B1|three citizenship systems/);
  });

  it("H1 year tokens and the neutral Swedish H1", () => {
    expect(buildDeckSeoHeadline(getDeckBySlug("pmp-anki-deck")! as never)).toBe("2027 PMP Exam Prep — 346 cards + Free Mock");
    expect(buildDeckSeoHeadline(getDeckBySlug("nebosh-anki-deck")! as never)).toBe("2027 NEBOSH IGC Exam Prep — 250 cards + Free Mock");
    expect(buildMockSeoPageCopy(getMockExamConfig("gmat-focus-readiness-check")!).headline).toBe("Free GMAT Readiness Check (2027 exam)");
    expect(getBlogPostBySlug("france-naturalization-2026-civic-exam-b2-language-test")!.title).toBe("France Naturalization 2027: Two Exams, Not One");
    expect(getBlogPostBySlug("france-naturalization-2026-civic-exam-b2-language-test")!.titleTag).toBe("France Naturalization 2026: Civic Exam + B2 Language Test Guide");
    expect(getBlogPostBySlug("sweden-medborgarskapsprov-2026-new-test")!.title).toBe("Sweden Medborgarskapsprov: How the New Citizenship Test Works");
  });

  it("no unverified LEED v4 end date remains in mock configs", () => {
    for (const c of getAllMockExams()) expect(c.officialSourceNote ?? "").not.toContain("June 28, 2026");
  });
});
