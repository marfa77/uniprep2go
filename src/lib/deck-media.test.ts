import { describe, expect, it } from "vitest";
import { getDeckCoverUrl, getDeckThumbnailUrl, isPreoptimizedPublicImage } from "./deck-media";

describe("deck media", () => {
  it("returns the first sample card image when available", () => {
    expect(
      getDeckThumbnailUrl([
        { question: "Q1", answer: "A1", imageUrl: "" },
        { question: "Q2", answer: "A2", imageUrl: "/samples/example.webp" },
      ]),
    ).toBe("/samples/example.webp");
  });

  it("returns null when no sample images exist", () => {
    expect(
      getDeckThumbnailUrl([{ question: "Q1", answer: "A1", imageUrl: "" }]),
    ).toBeNull();
  });

  it("prefers product covers over sample card thumbnails", () => {
    expect(
      getDeckCoverUrl({
        coverImage: "/covers/product.webp",
        sampleCards: [{ question: "Q1", answer: "A1", imageUrl: "/samples/card.webp" }],
      }),
    ).toBe("/covers/product.webp");
  });

  it("falls back to slug-based cover path for planned decks", () => {
    expect(
      getDeckCoverUrl({
        slug: "mrics-anki-deck",
        sampleCards: [],
      }),
    ).toBe("/covers/mrics-anki-deck.webp");
  });

  it("marks public cover and hero paths as preoptimized", () => {
    expect(isPreoptimizedPublicImage("/covers/cfa-level-1-anki-deck.webp")).toBe(true);
    expect(isPreoptimizedPublicImage("/home/hero.webp")).toBe(true);
    expect(isPreoptimizedPublicImage("/samples/card.webp")).toBe(false);
  });
});
