import { describe, expect, it } from "vitest";
import {
  MOCK_FREE_START_LIMIT,
  formatMockStartProgress,
  isMockFreeDemandTestActive,
  mockFreeAccessNotice,
  mockFreeAccessPriceLabel,
} from "./pricing";

describe("mock pricing policy", () => {
  it("caps free access at 20 mock starts", () => {
    expect(MOCK_FREE_START_LIMIT).toBe(20);
    expect(mockFreeAccessPriceLabel).toContain("20");
    expect(mockFreeAccessNotice).toContain("Gumroad");
  });

  it("formats telegram progress against the free cap", () => {
    expect(formatMockStartProgress(0)).toBe("0/20");
    expect(formatMockStartProgress(19)).toBe("19/20");
    expect(formatMockStartProgress(25)).toBe("25/20");
    expect(isMockFreeDemandTestActive(19)).toBe(true);
    expect(isMockFreeDemandTestActive(20)).toBe(false);
  });
});
