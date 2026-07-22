import { describe, expect, it } from "vitest";
import { availableDecks } from "./decks";
import {
  UNIPREP_TO_SHOP_PREVIEW_KEY,
  buildShopPreviewSampleCards,
} from "./prep2go-shop-samples";

describe("Prep2Go shop preview samples", () => {
  it("keeps shop preview mappings for curated and planned language decks", () => {
    const mappedSlugs = Object.keys(UNIPREP_TO_SHOP_PREVIEW_KEY);

    expect(mappedSlugs).toHaveLength(26);
    expect(mappedSlugs).toContain("ielts-toefl-english-for-arabic-speakers-anki-deck");
    expect(mappedSlugs).toContain("ielts-toefl-english-for-ukrainian-speakers-anki-deck");
    expect(mappedSlugs).not.toContain("delf-a2-printable-french-flashcards");
  });

  it("builds three real cards with audio for IELTS Arabic deck", () => {
    const samples = buildShopPreviewSampleCards(
      "ielts-toefl-english-for-arabic-speakers-anki-deck",
    );

    expect(samples).toHaveLength(3);
    expect(samples?.[0]).toMatchObject({
      question: "be",
      imageUrl: "/shop-preview-media/Arabic_to_English/1.webp",
      audioUrl: "/shop-preview-media/Arabic_to_English/1.mp3",
    });
    expect(samples?.[0]?.answer).toContain("يكون");
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

  it("applies shop previews to all mapped available language decks", () => {
    const availableMapped = Object.keys(UNIPREP_TO_SHOP_PREVIEW_KEY).filter((slug) =>
      availableDecks.some((deck) => deck.slug === slug),
    );

    expect(availableMapped.sort()).toEqual(
      [
        "ciple-a2-european-portuguese-anki-deck",
        "delf-b2-french-anki-deck",
        "dele-a2-spanish-anki-deck",
        "dutch-a2-inburgering-anki-deck",
        "german-a2-anki-deck",
        "celi-b1-italian-anki-deck",
        "danish-a2-prove-i-dansk-anki-deck",
        "norwegian-a2-norskprove-anki-deck",
        "swedish-a2-sfi-anki-deck",
        "greek-a2-ellinomatheia-anki-deck",
        "czech-a2-cce-anki-deck",
        "ielts-toefl-english-for-french-speakers-anki-deck",
        "ielts-toefl-english-for-arabic-speakers-anki-deck",
        "ielts-toefl-english-for-ukrainian-speakers-anki-deck",
      ].sort(),
    );

    for (const slug of availableMapped) {
      const deck = availableDecks.find((item) => item.slug === slug);

      expect(deck).toBeDefined();
      expect(deck?.sampleCards).toHaveLength(3);
      expect(deck?.sampleCards[0]?.question).not.toMatch(/^What is included in /);
    }
  });
});
