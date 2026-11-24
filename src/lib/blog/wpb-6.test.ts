import { describe, expect, it } from "vitest";
import { getBlogPostBySlug } from "./index";

const body = (slug: string) => {
  const p = getBlogPostBySlug(slug)!;
  return JSON.stringify([p.intro, p.cta, p.sections, p.faqs, p.bottomLine]);
};

describe("WP-B 6 — Denmark, Germany; WP-E Denmark + Leben in Deutschland titles", () => {
  it("Denmark: unsourced 47% removed from title/titleTag/body (WP-E); official SIRI facts; 2027", () => {
    const p = getBlogPostBySlug("denmark-indfoedsretsproeven-47-percent-pass-rate")!;
    expect(p.title).toBe("Denmark Indfødsretsprøven: Format, Pass Rules and How to Prepare");
    expect(p.titleTag).toBe("Denmark Indfødsretsprøven: How to Pass 2027");
    const b = body(p.slug);
    expect(b).not.toMatch(/47%|\$9\.99|October 21/);
    expect(b).toContain("3,657 of 6,242");
    expect(b).toContain("at least 4 of the 5");
  });

  it("Germany: BAMF facts; WP-D 2027", () => {
    const p = getBlogPostBySlug("germany-einbuergerungstest-vs-leben-in-deutschland-difference")!;
    expect(p.titleTag).toBe("Germany Einbürgerungstest vs Leben in Deutschland: Difference & Format 2027");
    const b = body(p.slug);
    expect(b).toContain("At least 17 correct");
    expect(b).toContain("€255 per person");
    expect(b).not.toMatch(/\$9\.99|residence permit/);
  });

  it("Leben in Deutschland guide: WP-E drops 'Pass Rate', WP-D 2027 (title only)", () => {
    const p = getBlogPostBySlug("leben-in-deutschland-test-english-preparation-guide")!;
    expect(p.titleTag).toBe("Leben in Deutschland Test 2027: English Prep Guide & Questions");
  });
});
