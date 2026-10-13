import { describe, expect, it } from "vitest";
import languageCatalog from "@/data/gumroad/language-anki-decks.json";
import sitemap from "../app/sitemap";
import { catalogAvailableDecks, decks, getCatalogDeckBySlug, getDeckBySlug } from "./decks";
import { buildLlmsFullTxt, buildLlmsTxt } from "./llm-docs";
import { applyPriceRecordToDeck } from "./checkout-pricing";
import {
  PREP2GO_SHOP_URL,
  RETIRED_LANGUAGE_DECK_REDIRECTS,
  RETIRED_LANGUAGE_DECK_SLUGS,
  RETIRED_LANGUAGE_DECKS_NOTE,
  buildRetiredLanguageDeckRedirects,
  getRetiredLanguageDeckRedirect,
  isRetiredLanguageDeckSlug,
} from "./retired-language-decks";

const pricedCatalog = catalogAvailableDecks.map((deck) =>
  applyPriceRecordToDeck(deck, {
    amount: 11,
    currency: "USD",
    syncedAt: "2026-06-01T00:00:00.000Z",
    source: "gumroad",
  }),
);

describe("retired language decks (sold on Prep2Go)", () => {
  it("covers every product in the language Anki Gumroad catalog", () => {
    const languageSlugs = Object.keys(languageCatalog.products).sort();

    expect(languageSlugs).toHaveLength(23);
    for (const slug of languageSlugs) expect(isRetiredLanguageDeckSlug(slug), slug).toBe(true);
  });

  it("maps each retired slug to a Prep2Go shop landing", () => {
    for (const slug of RETIRED_LANGUAGE_DECK_SLUGS) {
      const destination = getRetiredLanguageDeckRedirect(slug);
      expect(destination, slug).toBeDefined();
      expect(destination!.startsWith(`${PREP2GO_SHOP_URL}/`), slug).toBe(true);
      expect(isRetiredLanguageDeckSlug(slug)).toBe(true);
    }

    expect(getRetiredLanguageDeckRedirect("cfa-level-1-anki-deck")).toBeUndefined();
    expect(getRetiredLanguageDeckRedirect("leben-in-deutschland-anki-deck")).toBeUndefined();
    expect(getRetiredLanguageDeckRedirect("ciple-a2-grammar-anki-deck")).toBe(
      "https://www.prep2go.study/shop/deck/ciple-a2-grammar-anki-deck",
    );
    expect(getRetiredLanguageDeckRedirect("delf-prim-printable-french-flashcards")).toBeUndefined();
  });

  it("emits permanent 301 redirects for deck pages and markdown twins", () => {
    const redirects = buildRetiredLanguageDeckRedirects();

    expect(redirects).toHaveLength(RETIRED_LANGUAGE_DECK_SLUGS.length * 2);
    for (const slug of RETIRED_LANGUAGE_DECK_SLUGS) {
      const destination = RETIRED_LANGUAGE_DECK_REDIRECTS[slug];
      expect(redirects).toContainEqual({ source: `/decks/${slug}`, destination, statusCode: 301 });
      expect(redirects).toContainEqual({ source: `/${slug}.md`, destination, statusCode: 301 });
    }
  });

  it("removes retired decks from the catalog", () => {
    for (const slug of RETIRED_LANGUAGE_DECK_SLUGS) {
      expect(decks.some((deck) => deck.slug === slug), slug).toBe(false);
      expect(getDeckBySlug(slug), slug).toBeUndefined();
      expect(getCatalogDeckBySlug(slug), slug).toBeUndefined();
    }
  });

  it("keeps retired decks out of llms.txt, llms-full.txt, and the sitemap", () => {
    const llms = buildLlmsTxt(pricedCatalog);
    const bundle = buildLlmsFullTxt(pricedCatalog);
    const sitemapUrls = sitemap().map((entry) => entry.url);

    expect(llms).toContain(`${RETIRED_LANGUAGE_DECKS_NOTE} → ${PREP2GO_SHOP_URL}`);
    expect(bundle).toContain(PREP2GO_SHOP_URL);

    for (const slug of RETIRED_LANGUAGE_DECK_SLUGS) {
      expect(llms, slug).not.toContain(`/decks/${slug}`);
      expect(llms, slug).not.toContain(`/${slug}.md`);
      expect(llms, slug).not.toContain(`/api/facts/${slug}`);
      expect(bundle, slug).not.toContain(`/decks/${slug}`);
      expect(bundle, slug).not.toContain(`/${slug}.md`);
      expect(bundle, slug).not.toContain(`/api/facts/${slug}`);
      expect(sitemapUrls.some((url) => url.includes(slug)), slug).toBe(false);
    }
  });
});
