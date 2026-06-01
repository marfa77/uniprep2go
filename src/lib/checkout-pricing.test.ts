import { describe, expect, it, vi } from "vitest";
import {
  PRICE_PLACEHOLDER,
  applyPendingPriceToDeck,
  applyPriceRecordToDeck,
  applySyncedPriceToDeck,
  formatDeckPriceLabel,
  getCheckoutActionLabel,
  parseGumroadPriceCentsFromHtml,
  parseLemonVariantId,
  resetLemonVariantIndexCache,
  syncDeckPrice,
  writeCachedPrice,
  resolveDeckPrice,
} from "./checkout-pricing";
import { getCatalogDeckBySlug } from "./decks";

describe("checkout pricing", () => {
  it("parses Gumroad price_cents from public product HTML", () => {
    const html =
      '<script>window.product = {"price_cents&quot;:null,"name":"Test"}</script>' +
      '<meta data-price_cents&quot;:1100 />';

    expect(parseGumroadPriceCentsFromHtml(html)).toBe(1100);
  });

  it("extracts Lemon variant id from checkout URL", () => {
    expect(
      parseLemonVariantId(
        "https://ciple-a2.lemonsqueezy.com/checkout/buy/753c8eb8-f49b-46d6-bc0e-a725f451de31",
      ),
    ).toBe("753c8eb8-f49b-46d6-bc0e-a725f451de31");
  });

  it("syncs Lemon deck price by checkout slug via variants index", async () => {
    resetLemonVariantIndexCache();
    process.env.LEMON_SQUEEZY_API_KEY = "test-lemon-key";

    const deck = getCatalogDeckBySlug("ciple-a2-european-portuguese-anki-deck");
    expect(deck).toBeDefined();

    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: RequestInfo | URL) => {
        const url = String(input);

        if (url.includes("/v1/variants?page")) {
          return {
            ok: true,
            json: async () => ({
              data: [
                {
                  id: "1261452",
                  attributes: {
                    slug: "6f688637-f5ce-440f-8d2a-7614379ee3ca",
                    price: 2499,
                  },
                },
              ],
              meta: { page: { lastPage: 1 } },
            }),
          };
        }

        throw new Error(`Unexpected fetch: ${url}`);
      }) as typeof fetch,
    );

    const record = await syncDeckPrice(deck!);
    expect(record.amount).toBe(24.99);
    expect(record.source).toBe("lemon");

    delete process.env.LEMON_SQUEEZY_API_KEY;
    vi.unstubAllGlobals();
  });

  it("injects synced price into directAnswer placeholder", () => {
    const deck = getCatalogDeckBySlug("cfa-level-1-anki-deck");
    expect(deck).toBeDefined();
    expect(deck!.directAnswer).toContain(PRICE_PLACEHOLDER);

    const updated = applyPriceRecordToDeck(deck!, {
      amount: 12,
      currency: "USD",
      syncedAt: "2026-06-01T00:00:00.000Z",
      source: "gumroad",
    });

    expect(updated.price.amount).toBe(12);
    expect(updated.directAnswer).toContain("for $12 USD through Gumroad");
    expect(updated.directAnswer).not.toContain(PRICE_PLACEHOLDER);
  });

  it("syncs Gumroad deck price from checkout page", async () => {
    const deck = getCatalogDeckBySlug("cfa-level-1-anki-deck");
    expect(deck).toBeDefined();

    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({
        ok: true,
        text: async () => 'price_cents&quot;:1100',
      })) as typeof fetch,
    );

    const record = await syncDeckPrice(deck!);
    expect(record.amount).toBe(11);
    expect(record.source).toBe("gumroad");

    vi.unstubAllGlobals();
  });

  it("marks pending decks without leaking raw price placeholders", () => {
    const deck = getCatalogDeckBySlug("ciple-a2-european-portuguese-anki-deck");
    expect(deck).toBeDefined();

    const pending = applyPendingPriceToDeck(deck!);

    expect(pending.pricePending).toBe(true);
    expect(pending.price.amount).toBe(0);
    expect(pending.directAnswer).toContain("the checkout price");
    expect(pending.directAnswer).not.toContain(PRICE_PLACEHOLDER);
  });

  it("uses static App Store pricing for Prep2Go Immigration decks", async () => {
    const deck = getCatalogDeckBySlug("us-citizenship-test-prep2go-app");
    expect(deck).toBeDefined();

    const priced = await resolveDeckPrice(deck!);

    expect(priced.checkoutProvider).toBe("App Store");
    expect(priced.price.amount).toBe(4.99);
    expect(formatDeckPriceLabel(priced)).toBe("From $4.99/mo");
    expect(getCheckoutActionLabel(priced.checkoutProvider)).toBe("App Store");
  });

  it("serves cached synced price on deck resolve", async () => {
    const deck = getCatalogDeckBySlug("cfa-level-1-anki-deck");
    expect(deck).toBeDefined();

    await writeCachedPrice(deck!.slug, {
      amount: 13.5,
      currency: "USD",
      syncedAt: "2026-06-01T00:00:00.000Z",
      source: "gumroad",
    });

    const resolved = await resolveDeckPrice(deck!);
    expect(resolved.price.amount).toBe(13.5);
    expect(resolved.directAnswer).toContain("$13.50 USD");
    expect(applySyncedPriceToDeck).toBeDefined();
  });
});
