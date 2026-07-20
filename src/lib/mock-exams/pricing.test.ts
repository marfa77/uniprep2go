import { describe, expect, it } from "vitest";
import { mockFreeAccessNotice, mockFreeAccessPriceLabel } from "./pricing";

describe("mock pricing policy", () => {
  it("positions mocks as a free lead magnet into Anki decks", () => {
    expect(mockFreeAccessPriceLabel.toLowerCase()).toContain("free");
    expect(mockFreeAccessNotice.toLowerCase()).toContain("free timed mocks");
    expect(mockFreeAccessNotice).toMatch(/Anki deck/i);
    expect(mockFreeAccessNotice).toMatch(/Gumroad/i);
    expect(mockFreeAccessNotice.toLowerCase()).not.toContain("first 20");
    expect(mockFreeAccessNotice.toLowerCase()).not.toContain("validate demand");
    expect(mockFreeAccessNotice.toLowerCase()).not.toContain("paid mocks");
  });
});
