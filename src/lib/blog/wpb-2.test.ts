import { describe, expect, it } from "vitest";
import { getBlogPostBySlug } from "./index";

const body = (slug: string) => {
  const p = getBlogPostBySlug(slug)!;
  return JSON.stringify([p.intro, p.sections, p.faqs, p.bottomLine]);
};

describe("WP-B 2 — CDL General Knowledge and NEBOSH posts", () => {
  it("CDL post uses 49 CFR part 383 facts; 80% kept (federal source); WP-D year 2027", () => {
    const p = getBlogPostBySlug("cdl-general-knowledge-test-50-questions-what-to-expect")!;
    expect(p.titleTag).toBe("CDL General Knowledge Test 2027: 50 Questions, 80% Pass & What to Expect");
    const b = body(p.slug);
    expect(b).toContain("383.135");
    expect(b).toContain("14 days");
    expect(b).not.toMatch(/half of first-timers|\$125|~25-question|60 minutes \(most states\)/);
    expect(p.faqs.map((f) => f.question)).toContain("How long is a CDL learner's permit valid?");
  });

  it("NEBOSH post uses NEBOSH qualification facts, no pass rates or salary data; WP-D year 2027", () => {
    const p = getBlogPostBySlug("nebosh-igc-vs-international-diploma-employers")!;
    expect(p.titleTag).toBe("NEBOSH IGC vs International Diploma: Employer Preference & Cost 2027");
    const b = body(p.slug);
    expect(b).toContain("RQF Level 6, 42 credits");
    expect(b).not.toMatch(/pass rate|\$30,000|70%\*\*|IG1/i);
    expect(p.sections.map((s) => s.heading)).toContain("What professional recognition does each bring?");
  });
});
