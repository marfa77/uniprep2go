import { describe, expect, it } from "vitest";
import { availableDecks } from "./decks";
import { isRetiredLanguageDeckSlug } from "./retired-language-decks";
import {
  UNIPREP_TO_SHOP_PREVIEW_KEY,
  buildShopPreviewSampleCards,
} from "./prep2go-shop-samples";

describe("Prep2Go shop preview samples", () => {
  it("keeps shop preview mappings for curated and planned language decks", () => {
    const mappedSlugs = Object.keys(UNIPREP_TO_SHOP_PREVIEW_KEY);

    expect(mappedSlugs).toHaveLength(31);
    expect(mappedSlugs).toContain("german-a2-for-ukrainian-speakers-anki-deck");
    expect(mappedSlugs).toContain("german-a2-for-russian-speakers-anki-deck");
    expect(mappedSlugs).toContain("polish-a2-certyfikat-anki-deck");
    expect(mappedSlugs).toContain("polish-a2-for-ukrainian-speakers-anki-deck");
    expect(mappedSlugs).toContain("ielts-toefl-english-for-arabic-speakers-anki-deck");
    expect(mappedSlugs).toContain("ielts-toefl-english-for-ukrainian-speakers-anki-deck");
    expect(mappedSlugs).toContain("ielts-toefl-english-for-russian-speakers-anki-deck");
    expect(mappedSlugs).toContain("ielts-toefl-english-for-spanish-speakers-anki-deck");
    expect(mappedSlugs).toContain("ielts-toefl-english-for-portuguese-speakers-anki-deck");
    expect(mappedSlugs).not.toContain("delf-a2-printable-french-flashcards");
  });

  it("builds three real cards with audio for IELTS Arabic deck", () => {
    const samples = buildShopPreviewSampleCards(
      "ielts-toefl-english-for-arabic-speakers-anki-deck",
    );

    expect(samples).toHaveLength(3);
    expect(samples?.[0]).toMatchObject({
      question: "university",
      imageUrl: "/shop-preview-media/Arabic_to_English/1.webp",
      audioUrl: "/shop-preview-media/Arabic_to_English/1.mp3",
    });
    expect(samples?.[0]?.answer).toContain("جامعة");
    expect(samples?.[0]?.answer).not.toContain("What is included in");
  });

  it("builds paired Spanish and Italian audio tracks", () => {
    const samples = buildShopPreviewSampleCards("spanish-italian-paired-anki-deck");

    expect(samples?.[0]).toMatchObject({
      question: "roca · roccia",
      audioUrlEs: "/shop-preview-media/Spanish_Italian_Together/1_es.mp3",
      audioUrlIt: "/shop-preview-media/Spanish_Italian_Together/1_it.mp3",
    });
  });

  it("does not surface retired language decks through shop preview mappings", () => {
    const availableMapped = Object.keys(UNIPREP_TO_SHOP_PREVIEW_KEY).filter((slug) =>
      availableDecks.some((deck) => deck.slug === slug),
    );

    expect(availableMapped).toEqual([]);
    for (const slug of Object.keys(UNIPREP_TO_SHOP_PREVIEW_KEY)) {
      if (isRetiredLanguageDeckSlug(slug)) {
        expect(availableDecks.some((deck) => deck.slug === slug), slug).toBe(false);
      }
    }
  });
});
