import { afterEach, describe, expect, it } from "vitest";
import {
  initialLearnCreditsForQuantity,
  isLearnPassEnabled,
  learnCheckoutUrl,
  parseLearnPurchaseQuantity,
} from "./learn-pass";

describe("isLearnPassEnabled", () => {
  afterEach(() => {
    delete process.env.LEARN_PASS_ENABLED;
  });

  it("is off by default (no site surface)", () => {
    delete process.env.LEARN_PASS_ENABLED;
    expect(isLearnPassEnabled()).toBe(false);
  });

  it("turns on only with an explicit truthy flag", () => {
    process.env.LEARN_PASS_ENABLED = "true";
    expect(isLearnPassEnabled()).toBe(true);
    process.env.LEARN_PASS_ENABLED = "1";
    expect(isLearnPassEnabled()).toBe(true);
    process.env.LEARN_PASS_ENABLED = "false";
    expect(isLearnPassEnabled()).toBe(false);
  });
});

describe("learnCheckoutUrl", () => {
  it("returns base URL for quantity 1", () => {
    const url = learnCheckoutUrl(1);
    expect(url).toContain("wanted=true");
    expect(url).not.toContain("quantity=");
  });

  it("appends quantity for multi-pack checkout", () => {
    expect(learnCheckoutUrl(3)).toContain("quantity=3");
  });

  it("clamps invalid quantities", () => {
    expect(learnCheckoutUrl(0)).not.toContain("quantity=");
    expect(learnCheckoutUrl(99)).toContain("quantity=50");
  });
});

describe("learn pass quantity helpers", () => {
  it("parses purchase quantity safely", () => {
    expect(parseLearnPurchaseQuantity(3)).toBe(3);
    expect(parseLearnPurchaseQuantity("2")).toBe(2);
    expect(parseLearnPurchaseQuantity(null)).toBe(1);
    expect(parseLearnPurchaseQuantity(100)).toBe(50);
  });

  it("grants five credits per pack unit", () => {
    expect(initialLearnCreditsForQuantity(1)).toBe(5);
    expect(initialLearnCreditsForQuantity(3)).toBe(15);
  });
});
