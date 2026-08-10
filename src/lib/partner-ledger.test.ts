import { beforeEach, describe, expect, it } from "vitest";
import {
  accruedAuthorCents,
  markPartnerPaid,
  parseGumroadSalePayload,
  recordPartnerSale,
  recordPartnerSaleFromGumroad,
} from "./partner-ledger";
import type { PartnerRecord } from "./partners";

const testPartner: PartnerRecord = {
  partnerId: "test-partner",
  displayName: "Test Partner",
  email: "t@example.com",
  telegramChatId: "123",
  splitAuthorBps: 7000,
  payoutCurrency: "USD",
  deckSlugs: ["series-65-anki-deck"],
  status: "active",
};

describe("partner ledger", () => {
  beforeEach(() => {
    const g = globalThis as {
      __uniprep2goPartnerSales?: unknown[];
      __uniprep2goPartnerPayouts?: unknown[];
      __uniprep2goPartnerSaleIds?: Set<string>;
    };
    g.__uniprep2goPartnerSales = [];
    g.__uniprep2goPartnerPayouts = [];
    g.__uniprep2goPartnerSaleIds = new Set();
  });

  it("parses Gumroad ping cents and computes 70/30", async () => {
    const parsed = parseGumroadSalePayload({
      sale_id: "sale_1",
      permalink: "series-65-anki-deck",
      price: "1100",
      gumroad_fee: "100",
    });
    expect(parsed?.grossCents).toBe(1100);
    expect(parsed?.gumroadFeeCents).toBe(100);
    expect(parsed?.netCents).toBe(1000);

    const { sale, created } = await recordPartnerSale({
      saleId: "sale_1",
      deckSlug: "series-65-anki-deck",
      partner: testPartner,
      grossCents: 1100,
      gumroadFeeCents: 100,
      netCents: 1000,
    });
    expect(created).toBe(true);
    expect(sale.authorShareCents).toBe(700);
    expect(sale.uniShareCents).toBe(300);

    const again = await recordPartnerSale({
      saleId: "sale_1",
      deckSlug: "series-65-anki-deck",
      partner: testPartner,
      grossCents: 1100,
      gumroadFeeCents: 100,
      netCents: 1000,
    });
    expect(again.created).toBe(false);
  });

  it("ignores Gumroad pings for unmapped decks", async () => {
    const result = await recordPartnerSaleFromGumroad({
      sale_id: "sale_x",
      permalink: "unknown-deck",
      price: "1100",
      gumroad_fee: "100",
    });
    expect(result.ok).toBe(false);
  });

  it("accrues and clears unpaid balance on mark paid", async () => {
    await recordPartnerSale({
      saleId: "sale_2",
      deckSlug: "series-65-anki-deck",
      partner: testPartner,
      grossCents: 1100,
      gumroadFeeCents: 100,
      netCents: 1000,
      soldAt: "2026-08-01T12:00:00.000Z",
    });
    const sales = [
      {
        saleId: "sale_2",
        deckSlug: "series-65-anki-deck",
        partnerId: "test-partner",
        grossCents: 1100,
        gumroadFeeCents: 100,
        netCents: 1000,
        authorShareCents: 700,
        uniShareCents: 300,
        currency: "USD",
        soldAt: "2026-08-01T12:00:00.000Z",
      },
    ];
    expect(accruedAuthorCents(sales, [], "test-partner")).toBe(700);

    const payout = await markPartnerPaid({
      partnerId: "test-partner",
      month: "2026-08",
      reference: "wise-1",
    });
    expect(payout?.amountCents).toBe(700);
  });
});
