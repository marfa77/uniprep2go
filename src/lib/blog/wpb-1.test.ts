import { describe, expect, it } from "vitest";
import { getBlogPostBySlug } from "./index";
import { fitSeoTitle } from "../seo";

const body = (slug: string) => {
  const p = getBlogPostBySlug(slug)!;
  return JSON.stringify([p.intro, p.sections, p.faqs, p.bottomLine]);
};

describe("WP-B 1 — California DRE posts", () => {
  it("DRE-centers post: WP-E drops the unsourced pass rate, WP-D year 2027, DRE weights", () => {
    const p = getBlogPostBySlug("california-real-estate-exam-dre-test-centers")!;
    expect(p.titleTag).toBe("California Real Estate Exam: DRE Test Centers & Format 2027");
    expect(fitSeoTitle(p.titleTag, 60).length).toBeLessThanOrEqual(60);
    const b = body(p.slug);
    expect(b).not.toMatch(/51%|nearly \*\*50%\*\*|18 calendar days|105 correct/);
    expect(b).toContain("Laws of Agency and Fiduciary Duties — 17%");
    expect(p.faqs.map((f) => f.question)).toContain("Can I take the California real estate exam online?");
  });

  it("PSI vs Pearson post adds DRE exam facts, weights and retake rules with FAQs", () => {
    const p = getBlogPostBySlug("california-real-estate-exam-psi-vs-pearson-vue")!;
    expect(p.sections.map((s) => s.heading)).toContain("What are the California exam facts?");
    expect(p.faqs.map((f) => f.question)).toContain("How much does the California real estate exam cost?");
    expect(body(p.slug)).toContain("two years");
  });
});

describe("WP-B 1 — Italy citizenship B1 post", () => {
  it("uses Ministry / CILS facts, WP-D year 2027, no unsourced fees", () => {
    const p = getBlogPostBySlug("italy-citizenship-b1-test-cils-celi-not-civics")!;
    expect(p.titleTag).toBe("Italy Citizenship B1 Test: What It Actually Is & How to Pass 2027");
    expect(p.title).toBe("Italy Citizenship: The B1 Test Is Not a Civics Exam");
    const b = body(p.slug);
    expect(b).toContain("Law 132/2018");
    expect(b).toContain("18 months");
    expect(b).not.toMatch(/€1[0-9]{2}|retake the entire exam|12–24 months/);
    expect(p.faqs.map((f) => f.question)).toContain("When are the 2027 CILS B1 exams?");
  });
});
