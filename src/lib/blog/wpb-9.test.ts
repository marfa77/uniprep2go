import { describe, expect, it } from "vitest";
import { getBlogPostBySlug } from "./index";

const body = (slug: string) => {
  const p = getBlogPostBySlug(slug)!;
  return JSON.stringify([p.intro, p.cta, p.sections, p.faqs, p.bottomLine]);
};

describe("WP-B 9 — LEED GA free resources, Anki shelf life, exam-prep tools", () => {
  it("LEED GA: USGBC facts only; 2027 titleTag", () => {
    const p = getBlogPostBySlug("can-you-pass-leed-ga-free-resources-only")!;
    expect(p.titleTag).toBe("Can You Pass LEED GA with Free Resources Only? Honest 2027 Breakdown");
    const b = body(p.slug);
    expect(b).toContain("170 out of 200");
    expect(b).not.toMatch(/\$300|Reddit|veterans take the exam free/);
  });
  it("shelf life: official change signals only; 2027 titleTag", () => {
    const p = getBlogPostBySlug("how-long-anki-decks-stay-current-exam-shelf-life")!;
    expect(p.titleTag).toBe("How Long Do Anki Decks Stay Current? Exam-by-Exam Shelf Life 2027");
    const b = body(p.slug);
    expect(b).toContain("5 December 2025");
    expect(b).not.toMatch(/April 26, 2026|3–5 questions|90%\+ accurate|Decarbonization \(~50%\)/);
  });
  it("exam-prep tools: no competitor statistics; 2027 title + titleTag", () => {
    const p = getBlogPostBySlug("exam-prep-tools-comparison-uniprep2go")!;
    expect(p.title).toBe("Best Free Exam Prep Websites & Tools in 2027");
    expect(p.titleTag).toBe("Best Free Exam Prep Websites & Tools 2027");
    const b = body(p.slug);
    expect(b).not.toMatch(/2\.6M|2\.6 million|22,000|20,000 student|1\.32 million|17,500/);
  });
});
