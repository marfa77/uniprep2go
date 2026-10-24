import { describe, expect, it } from "vitest";
import {
  fillProductPriceMentions,
  formatCatalogListPrice,
  getCatalogListPriceUsd,
  withCatalogProductPrices,
} from "./catalog-price";

describe("catalog-price", () => {
  it("uses Gumroad default $9.99 from catalog-list-prices.json", () => {
    expect(getCatalogListPriceUsd()).toBe(9.99);
    expect(formatCatalogListPrice()).toBe("$9.99");
  });

  it("honors slug overrides (delf-prim → $9.99)", () => {
    expect(getCatalogListPriceUsd("delf-prim-printable-french-flashcards")).toBe(9.99);
  });

  it("fills {PRICE} and legacy UniPrep product prices", () => {
    expect(fillProductPriceMentions("Buy for {PRICE}", "$9.99")).toBe("Buy for $9.99");
    expect(withCatalogProductPrices("Pairs with the $9 Anki · $11 · $16 · $39 leftover")).toBe(
      "Pairs with the $9.99 Anki · $9.99 · $9.99 · $9.99 leftover",
    );
  });

  it("does not rewrite exam-math decimals like $16.80", () => {
    expect(withCatalogProductPrices("Honey $16.80 and tins $10.00")).toBe(
      "Honey $16.80 and tins $10.00",
    );
  });

  it("does not rewrite already-correct $9.99 on default Gumroad SKUs", () => {
    expect(withCatalogProductPrices("Live $9.99 / 120-card Anki")).toBe(
      "Live $9.99 / 120-card Anki",
    );
  });

  it("rewrites $9.99 when the slug override is higher (money raise)", () => {
    expect(withCatalogProductPrices("Then the $9.99 / 300-card SIE Anki", "sie-exam-anki-deck")).toBe(
      "Then the $19 / 300-card SIE Anki",
    );
    expect(getCatalogListPriceUsd("ptcb-study-guide-2026")).toBe(14);
    expect(formatCatalogListPrice("ptcb-study-guide-2026")).toBe("$14");
  });

  it("does not rewrite live money/pack prices in multi-SKU LLM blobs", () => {
    const blob =
      "CFA Anki $19 · Pass Pack $29 vs $38 · PTCB pack $24 vs $33 · guide $14";
    expect(withCatalogProductPrices(blob)).toBe(blob);
    expect(getCatalogListPriceUsd("cfa-level-1-pass-pack")).toBe(29);
    expect(getCatalogListPriceUsd("ptcb-2026-pass-pack")).toBe(24);
  });
});
