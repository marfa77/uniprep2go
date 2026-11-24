import { describe, expect, it } from "vitest";
import { getBlogPostBySlug } from "./index";

describe("WP-B 10 — Swiss citizenship post (SEM + canton of Zurich)", () => {
  it("uses SEM and Zurich facts, removes unsourced claims; 2027 titleTag", () => {
    const p = getBlogPostBySlug("swiss-citizenship-test-cantonal-format-questions")!;
    expect(p.titleTag).toBe("Swiss Citizenship Test 2027: Cantonal Format, Questions & How to Pass");
    const b = JSON.stringify([p.intro, p.cta, p.sections, p.faqs, p.bottomLine, p.metaDescription]);
    expect(b).toContain("CHF 100");
    expect(b).toContain("Canton of Zurich only");
    expect(b).not.toMatch(/\$9\.99|48-question|most applicants are underprepared/);
  });
});
