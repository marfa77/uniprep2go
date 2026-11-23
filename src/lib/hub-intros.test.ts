import { describe, expect, it } from "vitest";
import {
  EXTRA_HUB_PATHS,
  HUB_PATHS,
  MOCK_PASS_PRICE_PHRASE,
  hubIntroLinkCount,
  hubIntroSentences,
  hubIntroWordCount,
  hubIntros,
} from "./hub-intros";
import { MOCK_VERTICALS } from "./mock-exams/taxonomy";
import { verticalSeoCopy } from "./mock-exams/vertical-seo";

function collectVerticalSeoSentences(): string[] {
  const sentences: string[] = [];
  for (const copy of Object.values(verticalSeoCopy)) {
    sentences.push(
      ...hubIntroSentences(copy.lead),
      ...copy.sections.flatMap((section) => hubIntroSentences(section.body)),
      ...copy.faqs.flatMap((faq) => [...hubIntroSentences(faq.question), ...hubIntroSentences(faq.answer)]),
    );
  }
  return sentences.map((s) => s.toLowerCase());
}

describe("hub-intros", () => {
  it("covers every hub path (23 verticals + 5 catalog hubs)", () => {
    expect(HUB_PATHS.length).toBe(28);
    expect(MOCK_VERTICALS.every((v) => HUB_PATHS.includes(`/mock-exams/v/${v.id}` as (typeof HUB_PATHS)[number]))).toBe(
      true,
    );
    for (const extra of EXTRA_HUB_PATHS) {
      expect(HUB_PATHS).toContain(extra);
    }
    expect(Object.keys(hubIntros).sort()).toEqual([...HUB_PATHS].sort());
  });

  it("meets copy rules for every hub intro", () => {
    const globalSentences: string[] = [];
    const seoSentences = collectVerticalSeoSentences();

    for (const path of HUB_PATHS) {
      const { intro } = hubIntros[path];
      const words = hubIntroWordCount(intro);
      const links = hubIntroLinkCount(intro);
      const dollars = intro.match(/\$/g)?.length ?? 0;
      const percentPattern = /\d\s*%/.test(intro);

      expect(words, `${path} word count`).toBeGreaterThanOrEqual(250);
      expect(words, `${path} word count`).toBeLessThanOrEqual(450);
      expect(links, `${path} links`).toBeGreaterThanOrEqual(3);
      expect(links, `${path} links`).toBeLessThanOrEqual(6);
      expect(dollars, `${path} dollar signs`).toBe(1);
      expect(percentPattern, `${path} percent stats`).toBe(false);
      expect(intro, `${path} mock pass phrase`).toContain(MOCK_PASS_PRICE_PHRASE);

      const sentences = hubIntroSentences(intro);
      for (const sentence of sentences) {
        const norm = sentence.toLowerCase();
        expect(globalSentences, `duplicate across hubs: ${sentence.slice(0, 50)}`).not.toContain(norm);
        expect(seoSentences, `vertical-seo overlap: ${sentence.slice(0, 50)}`).not.toContain(norm);
        globalSentences.push(norm);
      }
    }
  });

  it("defines valid supplemental FAQ structures where present", () => {
    const faqHubs = [
      "/decks",
      "/finance-anki-decks",
      "/language-certification-decks",
    ] as const;

    for (const path of faqHubs) {
      const faqs = hubIntros[path].faqs;
      expect(faqs?.length ?? 0, path).toBeGreaterThanOrEqual(3);
      expect(faqs?.length ?? 0, path).toBeLessThanOrEqual(5);
      for (const faq of faqs ?? []) {
        expect(faq.question.length).toBeGreaterThan(10);
        expect(faq.answer.split(/\s+/).length).toBeGreaterThanOrEqual(8);
      }
    }

    for (const vertical of MOCK_VERTICALS) {
      const path = `/mock-exams/v/${vertical.id}` as (typeof HUB_PATHS)[number];
      const extra = hubIntros[path].faqs;
      expect(extra?.length ?? 0).toBeLessThanOrEqual(2);
      for (const faq of extra ?? []) {
        expect(faq.question.length).toBeGreaterThan(10);
        expect(faq.answer.split(/\s+/).length).toBeGreaterThanOrEqual(8);
      }
    }
  });
});