import { describe, expect, it } from "vitest";
import {
  parsePartnerPaidCommand,
  parsePartnerPayoutMonth,
  shouldPartnerDigest,
  shouldPartnerPaid,
  shouldPartnerPayoutReport,
  toPartnerSaleMessage,
} from "./partner-telegram";
import type { PartnerRecord } from "./partners";

describe("partner telegram commands", () => {
  it("detects digest and payout commands", () => {
    expect(shouldPartnerDigest("/partner_digest")).toBe(true);
    expect(shouldPartnerPayoutReport("/partner_payouts 2026-08")).toBe(true);
    expect(shouldPartnerPaid("/partner_paid abc 2026-08 wire-9")).toBe(true);
    expect(parsePartnerPayoutMonth("/partner_payouts 2026-08")).toBe("2026-08");
    expect(parsePartnerPaidCommand("/partner_paid abc 2026-08 wire-9")).toEqual({
      partnerId: "abc",
      month: "2026-08",
      reference: "wire-9",
    });
  });

  it("formats author sale ping with share", () => {
    const partner: PartnerRecord = {
      partnerId: "p1",
      displayName: "P",
      email: "a@b.c",
      telegramChatId: "1",
      splitAuthorBps: 7000,
      payoutCurrency: "USD",
      deckSlugs: ["series-65-anki-deck"],
      status: "active",
    };
    const msg = toPartnerSaleMessage(partner, {
      saleId: "s1",
      deckSlug: "series-65-anki-deck",
      partnerId: "p1",
      grossCents: 1100,
      gumroadFeeCents: 100,
      netCents: 1000,
      authorShareCents: 700,
      uniShareCents: 300,
      currency: "USD",
      soldAt: "2026-08-06T00:00:00.000Z",
    });
    expect(msg).toContain("Your share (70% net): $7.00");
    expect(msg).toContain("series-65-anki-deck");
  });
});
