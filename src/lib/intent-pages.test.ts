import { describe, expect, it } from "vitest";
import sitemap from "../app/sitemap";
import robots from "../app/robots";
import { availableDecks } from "./decks";
import { intentPages } from "./intent-pages";
import { absoluteUrl, siteConfig } from "./site";

describe("intent pages visibility", () => {
  it("defines the initial high-intent visibility pages", () => {
    expect(intentPages.map((page) => page.slug)).toEqual([
      "best-frm-part-1-anki-deck",
      "ciple-a2-anki-deck-for-portuguese-citizenship",
      "anki-decks-for-language-exams",
    ]);

    expect(intentPages.every((page) => page.deckSlugs.length > 0)).toBe(true);
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

  it("publishes intent pages in sitemap and allows crawlers through robots", () => {
    const urls = sitemap().map((entry) => entry.url);
    const rules = robots().rules;

    for (const page of intentPages) {
      expect(urls).toContain(absoluteUrl(`/${page.slug}`));
    }

    expect(urls).toContain(absoluteUrl("/llms-full.txt"));
    expect(urls).toContain(`${siteConfig.url}/`);
    expect(urls.every((url) => url.startsWith(siteConfig.url))).toBe(true);
    expect(urls.some((url) => url.includes("://www."))).toBe(false);
    expect(robots().sitemap).toBe(`${siteConfig.url}/sitemap.xml`);
    expect(robots().host).toBe(siteConfig.url);
    expect(JSON.stringify(rules)).toContain("\"allow\":\"/\"");
  });

  it("lists every deck page and markdown doc in the sitemap", () => {
    const urls = sitemap().map((entry) => entry.url);

    for (const deck of availableDecks) {
      expect(urls).toContain(absoluteUrl(`/decks/${deck.slug}`));
      expect(urls).toContain(absoluteUrl(`/${deck.slug}.md`));
    }
  });
});
