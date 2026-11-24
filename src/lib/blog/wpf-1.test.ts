import { describe, expect, it } from "vitest";
import { getBlogPostBySlug } from "./index";

const body = (slug: string) => {
  const p = getBlogPostBySlug(slug)!;
  return JSON.stringify([p.intro, p.cta, p.sections, p.faqs, p.bottomLine]);
};

describe("WP-F 1 — WELL AP vs Fitwel, Spain CCSE, Luxembourg Vivre ensemble", () => {
  it("WELL vs Fitwel: IWBI/Fitwel facts, LEED GA section, 2027 title + titleTag", () => {
    const p = getBlogPostBySlug("well-ap-vs-fitwel-certification-2026")!;
    expect(p.title).toBe("WELL AP vs Fitwel: Which Wellness Certification Is Worth It in 2027?");
    expect(p.titleTag).toBe("WELL AP vs Fitwel 2027: Cost, Difficulty & Employer Demand");
    const b = body(p.slug);
    expect(b).toContain("$299");
    expect(b).toContain("How does WELL AP compare with LEED Green Associate?");
    expect(b).toContain("/blog/can-you-pass-leed-ga-free-resources-only");
  });
  it("Spain: Cervantes 2027 calendar; no unsourced €215", () => {
    const p = getBlogPostBySlug("spain-citizenship-ccse-dele-a2-two-exams")!;
    expect(p.titleTag).toBe("Spain Citizenship Exams 2027: CCSE vs DELE A2 & How to Pass Both");
    const b = body(p.slug);
    expect(b).toContain("23 November 2026");
    expect(b).not.toMatch(/€215/);
  });
  it("Luxembourg: Guichet/INLL facts; no unverified question count or pass score", () => {
    const p = getBlogPostBySlug("luxembourg-vivre-ensemble-test-format-pass")!;
    expect(p.titleTag).toBe("Luxembourg Vivre Ensemble Test 2027: Format, Questions & Pass Score");
    const b = body(p.slug);
    expect(b).toContain("€75");
    expect(b).not.toMatch(/official 10\/20\/10/);
  });
});
