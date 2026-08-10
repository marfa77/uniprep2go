import { describe, expect, it } from "vitest";
import {
  computeSaleShares,
  getAuthorShareBps,
  getMinPayoutUsd,
  getPartnerById,
  getPartnerForDeckSlug,
  listPartners,
} from "./partners";

describe("partners registry", () => {
  it("loads default 70/30 split and min payout", () => {
    expect(getAuthorShareBps()).toBe(7000);
    expect(getMinPayoutUsd()).toBe(100);
    expect(computeSaleShares(1000).authorShareCents).toBe(700);
    expect(computeSaleShares(1000).uniShareCents).toBe(300);
  });

  it("keeps pilot-template from attributing decks", () => {
    expect(getPartnerById("pilot-template")?.status).toBe("template");
    expect(getPartnerForDeckSlug("series-65-anki-deck")).toBeNull();
    expect(listPartners().some((p) => p.partnerId === "pilot-template")).toBe(true);
  });
});
