import { describe, expect, it } from "vitest";
import { getBlogPostBySlug } from "./index";

const body = (slug: string) => {
  const p = getBlogPostBySlug(slug)!;
  return JSON.stringify([p.intro, p.sections, p.faqs, p.bottomLine]);
};

describe("WP-B 3 — EPA 608 refrigerants, FINRA options, Anki vs Quizlet", () => {
  it("EPA 608 post uses 40 CFR 82.152 classes and appendix D test rules; WP-D year 2027", () => {
    const p = getBlogPostBySlug("memorize-epa-608-refrigerant-numbers-method")!;
    expect(p.titleTag).toBe("Memorize EPA 608 Refrigerant Numbers: Method That Works 2027");
    const b = body(p.slug);
    expect(b).toContain("82.152");
    expect(b).toContain("84%");
    expect(b).not.toMatch(/Light blue|60% higher|under 2 seconds|Completely Fazed/);
  });

  it("FINRA options post uses FINRA outline facts, no unsourced trap statistics; WP-D year 2027", () => {
    const p = getBlogPostBySlug("finra-options-questions-read-without-getting-tricked")!;
    expect(p.titleTag).toBe("SIE Options Question Traps 2027 | 4-Step Reading Method");
    const b = body(p.slug);
    expect(b).toContain("Understanding Products and Their Risks");
    expect(b).toContain("/blog/finra-exam-retake-waiting-period-2027");
    expect(b).toContain("/mock-exams/series-7-readiness-check");
    expect(b).not.toMatch(/most first-time candidates|nearly every form|FINRA loves/);
  });

  it("Anki vs Quizlet post cites the Anki manual and makes no competitor stats or price claims", () => {
    const p = getBlogPostBySlug("anki-vs-quizlet-professional-exam-prep")!;
    const b = body(p.slug);
    expect(b).toContain("docs.ankiweb.net");
    expect(b).not.toMatch(/\$36|\$24\.99|\$25|Cureus|6–13%|millions of/);
  });
});
