import { describe, expect, it } from "vitest";
import {
  mockFreeAccessNotice,
  mockFreeAccessPriceLabel,
  mockFunnelNoticeForLinkedDeck,
} from "./pricing";

describe("mock pricing policy", () => {
  it("positions mocks as a free lead magnet into Anki decks", () => {
    expect(mockFreeAccessPriceLabel.toLowerCase()).toContain("free");
    expect(mockFreeAccessNotice.toLowerCase()).toContain("free timed mocks");
    expect(mockFreeAccessNotice).toMatch(/Anki deck/i);
    expect(mockFreeAccessNotice.toLowerCase()).not.toContain("first 20");
    expect(mockFreeAccessNotice.toLowerCase()).not.toContain("validate demand");
    expect(mockFreeAccessNotice.toLowerCase()).not.toContain("paid mocks");
  });

  it("splits buy vs waitlist funnel language by linked deck status", () => {
    const buyable = mockFunnelNoticeForLinkedDeck({
      status: "available",
      checkoutUrl: "https://pixidstudio.gumroad.com/l/example",
    });
    const planned = mockFunnelNoticeForLinkedDeck({ status: "planned" });

    expect(buyable.toLowerCase()).toContain("buy");
    expect(buyable).toMatch(/Gumroad/i);
    expect(buyable.toLowerCase()).not.toContain("waitlist");
    expect(planned.toLowerCase()).toContain("waitlist");
    expect(planned.toLowerCase()).not.toContain("buy the linked");
  });
});
