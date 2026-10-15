import { describe, expect, it } from "vitest";
import {
  mockFreeAccessNotice,
  mockFreeAccessPriceLabel,
  mockFunnelNoticeForLinkedDeck,
} from "./pricing";

describe("mock pricing policy", () => {
  it("states one free mock, then the $5 / 5-attempt Mock Pass", () => {
    expect(mockFreeAccessPriceLabel).toBe("Free 25-question diagnostic, then $5 for 5 full attempts");
    expect(mockFreeAccessNotice).toMatch(/first UniPrep2Go attempt is free: a 25-question timed diagnostic on any exam/);
    expect(mockFreeAccessNotice).toMatch(/Full-length mocks and retakes run on a \$5 UniPrep2Go Mock Pass .*: 5 attempts on any mock/);
    expect(mockFreeAccessNotice.toLowerCase()).not.toContain("free timed mocks");
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
