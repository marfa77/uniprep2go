import { describe, expect, it } from "vitest";
import { getMockExamConfig } from "../configs";
import { buildMockExamPageJsonLd } from "../llm";
import { getDeckBySlug } from "../../decks";
import { getBlogPostBySlug } from "../../blog";
import { getMockEditorialBundle } from "./index";
import { getDeckEditorialBundle } from "../../deck-editorial";

const MOCKS = ["sat-readiness-check", "nremt-paramedic-readiness-check", "nremt-aemt-readiness-check", "home-health-aide-readiness-check"] as const;
const DECKS = ["aspt-phlebotomy-anki-deck"] as const;

const text = (slug: string) => {
  const b = getMockEditorialBundle(slug)!;
  return [b.howToPrepare ?? "", ...b.sections.flatMap((s) => [...s.paragraphs, ...(s.bullets ?? [])]), ...b.faqs.map((f) => f.answer)].join(" ");
};
const words = (slug: string) => {
  const b = getMockEditorialBundle(slug)!;
  return [b.howToPrepare ?? "", ...b.sections.flatMap((s) => [s.heading, ...s.paragraphs, ...(s.bullets ?? [])]), ...b.faqs.flatMap((f) => [f.question, f.answer])]
    .join(" ").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\*\*/g, "").split(/\s+/).filter(Boolean).length;
};

describe("WP-A PR 6 — mock editorial", () => {
  it.each(MOCKS)("%s: 600–900 words, FAQs in JSON-LD, headings without 2026, config-driven length", (slug) => {
    const b = getMockEditorialBundle(slug)!;
    expect(words(slug)).toBeGreaterThanOrEqual(600);
    expect(words(slug)).toBeLessThanOrEqual(900);
    expect(b.faqs.length).toBeGreaterThanOrEqual(5);
    expect(b.sections.every((s) => !s.heading.includes("2026"))).toBe(true);
    const config = getMockExamConfig(slug)!;
    const ld = buildMockExamPageJsonLd(config);
    const faq = ld["@graph"].find((n) => typeof n === "object" && n !== null && "@type" in n && n["@type"] === "FAQPage") as { mainEntity: Array<{ name: string }> } | undefined;
    for (const f of b.faqs) expect(faq?.mainEntity.map((q) => q.name)).toContain(f.question);
    expect(b.faqs.find((f) => /UniPrep2Go/.test(f.question))!.answer).toContain(`${config.questionCount} questions in ${config.durationMinutes} minutes`);
  });

  it.each(MOCKS)("%s links only to existing pages and labels state facts, no pass rates", (slug) => {
    for (const [, href] of text(slug).matchAll(/\]\((\/[^)\s]+)\)/g)) {
      const [, kind, target] = href.split("/");
      if (kind === "mock-exams") expect(getMockExamConfig(target), href).toBeTruthy();
      else if (kind === "decks") expect(getDeckBySlug(target), href).toBeTruthy();
      else if (kind === "blog") expect(getBlogPostBySlug(target), href).toBeTruthy();
      else throw new Error(href);
    }
    if (slug === "home-health-aide-readiness-check") expect(text(slug)).toContain("42 CFR 484.80");
    expect(text(slug)).not.toMatch(/pass rate|% of candidates/i);
  });

  it("decks are registered", () => {
    for (const d of DECKS) expect(getDeckEditorialBundle(d), d).toBeTruthy();
  });
});
