import { describe, expect, it } from "vitest";
import { getDeckBySlug } from "@/lib/decks";
import { getBlogPostBySlug } from "@/lib/blog";
import { getMockExamConfig } from "@/lib/mock-exams/configs";
import { getMockEditorialBundle } from "@/lib/mock-exams/editorial";
import { deckEditorialSlugs, getDeckEditorialBundle } from "./index";

function deckText(slug: string): string[] {
  const bundle = getDeckEditorialBundle(slug)!;
  return bundle.sections.flatMap((s) => [...s.paragraphs, ...(s.bullets ?? [])]);
}

function wordCount(parts: string[]): number {
  return parts
    .join(" ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*+/g, "")
    .split(/\s+/)
    .filter(Boolean).length;
}

describe("deck editorial blocks", () => {
  it.each(deckEditorialSlugs())("%s is a 250–400 word deck block on an existing deck", (slug) => {
    const bundle = getDeckEditorialBundle(slug)!;
    expect(getDeckBySlug(slug), slug).toBeTruthy();
    const headings = bundle.sections.map((s) => s.heading);
    const words = wordCount([...headings, ...deckText(slug)]);
    expect(words).toBeGreaterThanOrEqual(250);
    expect(words).toBeLessThanOrEqual(400);
    expect(headings.every((h) => !h.includes("2026"))).toBe(true);
    expect(bundle.sources.length).toBeGreaterThanOrEqual(1);
  });

  it.each(deckEditorialSlugs())("%s links to the mock for exam facts and only to real pages", (slug) => {
    const bundle = getDeckEditorialBundle(slug)!;
    const links = [...deckText(slug).join(" ").matchAll(/\]\((\/[^)\s]+)\)/g)].map((m) => m[1]);
    if (bundle.mockSlug) expect(links).toContain(`/mock-exams/${bundle.mockSlug}`);
    for (const href of links) {
      const [, kind, target] = href.split("/");
      if (kind === "mock-exams") expect(getMockExamConfig(target), href).toBeTruthy();
      else if (kind === "decks") expect(getDeckBySlug(target), href).toBeTruthy();
      else if (kind === "blog") expect(getBlogPostBySlug(target), href).toBeTruthy();
      else throw new Error(`Unexpected internal link ${href}`);
    }
  });

  it.each(deckEditorialSlugs())("%s never repeats a mock-page paragraph", (slug) => {
    const bundle = getDeckEditorialBundle(slug)!;
    if (!bundle.mockSlug) return;
    const mock = getMockEditorialBundle(bundle.mockSlug);
    if (!mock) return;
    const mockParts = new Set(mock.sections.flatMap((s) => [...s.paragraphs, ...(s.bullets ?? [])]));
    for (const part of deckText(slug)) expect(mockParts.has(part)).toBe(false);
  });

  it("batch 1 deck blocks map cards to each official outline", () => {
    expect(deckText("sat-anki-deck").join(" ")).toContain("Standard English Conventions");
    expect(deckText("series-7-anki-deck").join(" ")).toContain("**Function 3 (91 items):**");
    expect(deckText("pmp-anki-deck").join(" ")).toContain("**Process (41%):**");
    expect(deckText("cfa-level-1-anki-deck").join(" ")).toContain("Ethical and Professional Standards (10–15%)");
    expect(deckText("mrics-anki-deck").join(" ")).toContain("60-minute interview");
  });

  it("NBRC deck block maps cards to the RT outline areas", () => {
    const text = deckText("nbrc-tmc-anki-deck").join(" ");
    expect(text).toContain("Patient Data");
    expect(text).toContain("Initiation and Modification of Interventions");
    expect(text).toContain("/blog/nbrc-tmc-to-rt-exam-2027");
  });

  it("batch 2 deck blocks map cards to each official outline", () => {
    expect(deckText("cfa-level-2-anki-deck").join(" ")).toContain("22 vignettes");
    expect(deckText("gmat-focus-anki-deck").join(" ")).toContain("Data Sufficiency");
    expect(deckText("cem-anki-deck").join(" ")).toContain("**minimum score of 700**");
    expect(deckText("mrics-quantity-surveying-anki-deck").join(" ")).toContain("4,000-word");
    expect(deckText("ptcb-pharmacy-technician-anki-deck").join(" ")).toContain("**Medications (35%):**");
  });

  it("batch 3 deck blocks map cards to each official outline", () => {
    expect(deckText("gre-anki-deck").join(" ")).toContain("1 hour 58 minutes");
    expect(deckText("servsafe-manager-anki-deck").join(" ")).toContain("56 correct");
    expect(deckText("hvac-epa-608-anki-deck").join(" ")).toContain("25 questions from the Core group");
    expect(deckText("leed-green-associate-anki-deck").join(" ")).toContain("LEED v5");
    expect(deckText("sie-exam-anki-deck").join(" ")).toContain("Understanding Products and Their Risks");
  });

  it("batch 4 deck blocks map cards to each official outline", () => {
    expect(deckText("cdcp-anki-deck").join(" ")).toContain("27 correct");
    expect(deckText("series-63-anki-deck").join(" ")).toContain("43 correct");
    expect(deckText("cfp-certification-anki-deck").join(" ")).toContain("Retirement Savings and Income Planning (18%)");
    expect(deckText("property-casualty-insurance-exam-anki-deck").join(" ")).toContain("state's candidate handbook");
    expect(deckText("enrolled-agent-anki-deck").join(" ")).toContain("31 Dec 2025");
  });

  it("batch 5 deck blocks map cards to each official outline", () => {
    expect(deckText("series-6-anki-deck").join(" ")).toContain("(25 items)");
    expect(deckText("series-65-anki-deck").join(" ")).toContain("92 correct");
    expect(deckText("series-66-anki-deck").join(" ")).toContain("73 correct");
    expect(deckText("life-and-health-insurance-exam-anki-deck").join(" ")).toContain("state's candidate handbook");
    expect(deckText("frm-part-1-anki-deck").join(" ")).toContain("about 240 hours");
  });
});
