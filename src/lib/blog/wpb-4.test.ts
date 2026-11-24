import { describe, expect, it } from "vitest";
import { getBlogPostBySlug } from "./index";

const body = (slug: string) => {
  const p = getBlogPostBySlug(slug)!;
  return JSON.stringify([p.intro, p.cta, p.sections, p.faqs, p.bottomLine]);
};

describe("WP-B 4 — Life in the UK, US civics, Norway citizenship posts", () => {
  it("Life in the UK: no unsourced 1-in-3 / pass-rate claims (WP-E rule), GOV.UK facts, 2027 titleTag", () => {
    const p = getBlogPostBySlug("life-in-the-uk-test-why-one-in-three-fail")!;
    expect(p.title).toBe("Life in the UK Test: Why People Fail");
    expect(p.titleTag).toBe("Life in the UK Test 2027: Why People Fail | Free Mock");
    const b = body(p.slug);
    expect(b).toContain("75% or more");
    expect(b).not.toMatch(/1 in 3|one in three|70–75%|~86%|\$9\.99/i);
  });

  it("US civics: USCIS 2008 vs 2025 rules and re-exam window; 2027 year token", () => {
    const p = getBlogPostBySlug("us-naturalization-civics-test-100-questions-only-10")!;
    expect(p.title).toBe("US Naturalization Civics Test 2027: 128 Questions, Up to 20 Asked");
    expect(p.titleTag).toBe("US Citizenship Civics Test 2027: 128 Questions, 12 to Pass");
    const b = body(p.slug);
    expect(b).toContain("20 October 2025");
    expect(b).toContain("between 60 and 90 days");
    expect(b).not.toMatch(/\$9\.99|128 cards/);
  });

  it("Norway: HK-dir format and UDI B1 rule; 2027 titleTag", () => {
    const p = getBlogPostBySlug("norway-statsborgerproven-format-questions-pass")!;
    expect(p.titleTag).toBe("Norway Statsborgerprøven 2027: Format, Questions & How to Pass");
    const b = body(p.slug);
    expect(b).toContain("At least 24 correct answers");
    expect(b).toContain("1 October 2022");
  });
});
