import { describe, expect, it } from "vitest";
import { getBlogPostBySlug } from "./index";

const body = (slug: string) => {
  const p = getBlogPostBySlug(slug)!;
  return JSON.stringify([p.intro, p.cta, p.sections, p.faqs, p.bottomLine]);
};

describe("WP-B 8 — France, Canada, Belgium, Wallonie", () => {
  it("France: Service Public examen civique facts; year left as introduction year", () => {
    const p = getBlogPostBySlug("france-naturalization-2026-civic-exam-b2-language-test")!;
    expect(p.titleTag).toBe("France Naturalization 2026: Civic Exam + B2 Language Test Guide");
    const b = body(p.slug);
    expect(b).toContain("32 correct answers");
    expect(b).not.toMatch(/\$9\.99/);
  });
  it("Canada: IRCC facts, $653 verified; 2027 titleTag", () => {
    const p = getBlogPostBySlug("canada-citizenship-test-20-questions-630-dollars")!;
    expect(p.titleTag).toBe("Canada Citizenship Test 2027: 20 Questions, $653 & How to Pass");
    const b = body(p.slug);
    expect(b).toContain("CAN$653");
    expect(b).toContain("45 minutes");
    expect(b).not.toMatch(/\$9\.99/);
  });
  it("Belgium: regional facts; no unsourced €1,030 fee", () => {
    const b = body("belgium-citizenship-test-flanders-vs-wallonia");
    expect(b).toContain("€180");
    expect(b).not.toMatch(/1[.,]030/);
  });
  it("Wallonie: no MCQ, free parcours, 60 h", () => {
    const b = body("wallonie-citoyennete-francais-a2-parcours-integration");
    expect(b).toContain("60 heures minimum");
    expect(b).not.toMatch(/165 cartes|dispense les 400/);
  });
});
