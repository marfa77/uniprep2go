import { describe, expect, it } from "vitest";
import { getBlogPostBySlug } from "./index";

const body = (slug: string) => {
  const p = getBlogPostBySlug(slug)!;
  return JSON.stringify([p.intro, p.cta, p.sections, p.faqs, p.bottomLine]);
};

describe("WP-B 7 — Sweden, Finland, Netherlands, Czech citizenship posts", () => {
  it("Sweden: UHR facts (test has started), 2027 titleTag", () => {
    const p = getBlogPostBySlug("sweden-medborgarskapsprov-2026-new-test")!;
    expect(p.titleTag).toBe("Sweden Citizenship Test 2027: Medborgarskapsprov Format & Prep");
    const b = body(p.slug);
    expect(b).toContain("15 August 2026");
    expect(b).toContain("Sverige i fokus");
  });
  it("Finland: Migri 2027 dates; no invented question counts", () => {
    const b = body("finland-kansalaisuuskoe-2027-new-test");
    expect(b).toContain("1 March 2027");
    expect(b).not.toMatch(/60-question|120-card/);
  });
  it("Netherlands: DUO fees and IND A2 rule; 2027 titleTag", () => {
    const p = getBlogPostBySlug("netherlands-inburgeringsexamen-five-exams-pass-guide")!;
    expect(p.titleTag).toBe("Netherlands Inburgeringsexamen 2027: 5 Exams, Cost & How to Pass");
    const b = body(p.slug);
    expect(b).toContain("€250");
    expect(b).toContain("language level A2");
  });
  it("Czech: B1 both exams, 18 of 30, CZK fees; links the reálie guide", () => {
    const b = body("czech-cce-language-vs-realie-civics-two-exams");
    expect(b).toContain("18 of 30");
    expect(b).toContain("CZK 5,700");
    expect(b).toContain("/blog/czech-citizenship-exam-zkouska-z-realii-complete-guide");
  });
});
