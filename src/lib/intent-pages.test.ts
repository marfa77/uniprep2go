import { describe, expect, it } from "vitest";
import sitemap from "../app/sitemap";
import robots from "../app/robots";
import { availableDecks } from "./decks";
import { intentPages } from "./intent-pages";
import { getAllMockExams } from "./mock-exams/configs";
import { isMockExamRunnable } from "./mock-exams/question-bank";
import { shouldIndexMockExam } from "./seo";
import { absoluteUrl, siteConfig } from "./site";

describe("intent pages visibility", () => {
  it("defines the initial high-intent visibility pages", () => {
    expect(intentPages.map((page) => page.slug)).toEqual([
      "best-frm-part-1-anki-deck",
      "ciple-a2-anki-deck-for-portuguese-citizenship",
      "anki-decks-for-language-exams",
      "cursor-rules-for-indie-hackers",
    ]);

    expect(
      intentPages.every((page) => (page.deckSlugs?.length ?? 0) > 0 || (page.externalOffers?.length ?? 0) > 0),
    ).toBe(true);
    expect(intentPages.every((page) => page.faqs.length >= 3)).toBe(true);
  });

  it("lists every available language deck on the language exam intent page", () => {
    const page = intentPages.find((item) => item.slug === "anki-decks-for-language-exams");
    const languageDeckSlugs = availableDecks
      .filter((deck) => deck.category === "language")
      .map((deck) => deck.slug);

    expect(page).toBeDefined();
    expect(page?.deckSlugs).toEqual(languageDeckSlugs);
    expect(page?.deckSlugs).toHaveLength(22);
    expect(page?.directAnswer).toContain("IELTS / TOEFL");
    expect(page?.directAnswer).toContain("22 language exam Anki decks");
  });

  it("keeps deck and mock magnets in sitemap instead of legacy intent URLs", () => {
    const urls = sitemap().map((entry) => entry.url);
    const rules = robots().rules;

    for (const page of intentPages) {
      if (page.indexInSitemap) {
        expect(urls).toContain(absoluteUrl(`/${page.slug}`));
      } else {
        expect(urls).not.toContain(absoluteUrl(`/${page.slug}`));
      }
    }

    expect(urls).toContain(absoluteUrl("/decks/frm-part-1-anki-deck"));
    expect(urls).toContain(absoluteUrl("/mock-exams/frm-part-1-readiness-check"));

    expect(urls).toContain(`${siteConfig.url}/`);
    expect(urls).toContain(absoluteUrl("/anki-starter-kit"));
    expect(urls).toContain(absoluteUrl("/decks/servsafe-manager-anki-deck"));
    expect(urls.every((url) => url.startsWith(siteConfig.url))).toBe(true);
    expect(urls.some((url) => url.includes("://www."))).toBe(false);
    expect(urls.every((url) => !url.endsWith(".md"))).toBe(true);
    expect(urls.every((url) => !url.includes("/api/"))).toBe(true);
    expect(urls).not.toContain(absoluteUrl("/llms.txt"));
    expect(urls).not.toContain(absoluteUrl("/llms-full.txt"));
    expect(robots().sitemap).toEqual([
      `${siteConfig.url}/sitemap.xml`,
      `${siteConfig.url}/llm-sitemap.xml`,
    ]);
    expect(robots().host).toBe(siteConfig.url);
    expect(JSON.stringify(rules)).toContain("\"allow\":\"/\"");
  });

  it("lists every HTML deck page in the sitemap", () => {
    const urls = sitemap().map((entry) => entry.url);

    for (const deck of availableDecks) {
      expect(urls).toContain(absoluteUrl(`/decks/${deck.slug}`));
      expect(urls).not.toContain(absoluteUrl(`/${deck.slug}.md`));
    }
  });

  it("lists runnable mock HTML pages in the Google sitemap", () => {
    const urls = sitemap().map((entry) => entry.url);

    expect(urls).toContain(absoluteUrl("/mock-exams"));

    for (const mock of getAllMockExams()) {
      const mockUrl = absoluteUrl(`/mock-exams/${mock.slug}`);
      if (shouldIndexMockExam(mock.slug)) {
        expect(urls).toContain(mockUrl);
      } else {
        expect(urls).not.toContain(mockUrl);
      }
      expect(urls).not.toContain(absoluteUrl(`/api/mock-exams/${mock.slug}`));
      expect(urls).not.toContain(absoluteUrl(`/mock-exams/${mock.slug}/markdown`));
    }

    expect(urls).toContain(absoluteUrl("/building-certification-anki-decks"));
    expect(getAllMockExams().every((mock) => isMockExamRunnable(mock.slug))).toBe(true);
  });
});
