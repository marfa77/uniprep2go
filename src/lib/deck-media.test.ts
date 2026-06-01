import { describe, expect, it } from "vitest";
import { getDeckThumbnailUrl } from "./deck-media";

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
});
