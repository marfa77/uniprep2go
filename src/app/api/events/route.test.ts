import { describe, expect, it, vi, beforeEach } from "vitest";
import { createFunnelEvent } from "@/lib/analytics";
import { FUNNEL_EXCLUDE_COOKIE } from "@/lib/funnel-exclude";
import { shouldRecordFunnelEvent } from "@/lib/funnel-filter";

const notifyCheckoutClick = vi.fn(async () => true);
const recordFunnelEvent = vi.fn(async () => undefined);
const pricedDeck = {
  slug: "cfa-level-1-anki-deck",
  title: "CFA Level 1 Anki Deck",
  checkoutProvider: "Gumroad",
  checkoutUrl: "https://pixidstudio.gumroad.com/l/ivjmuu",
  price: { amount: 11, currency: "USD" },
};

vi.mock("@/lib/telegram-notify", () => ({ notifyCheckoutClick }));
vi.mock("@/lib/funnel-store", () => ({ recordFunnelEvent }));
vi.mock("@/lib/checkout-pricing", () => ({
  getPricedDeckBySlug: vi.fn(async () => pricedDeck),
  formatDeckPriceLabel: vi.fn(() => "$11 USD"),
}));
vi.mock("@/lib/decks", () => ({
  getCatalogDeckBySlug: vi.fn(() => pricedDeck),
}));

describe("POST /api/events", () => {
  beforeEach(() => {
    notifyCheckoutClick.mockClear();
    recordFunnelEvent.mockClear();
  });

  it("sends Telegram checkout alerts even when funnel stats are excluded", async () => {
    process.env.FUNNEL_EXCLUDE_IPS = "5.194.82.128";

    const { POST } = await import("@/app/api/events/route");
    const request = new Request("https://uniprep2go.study/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": "5.194.82.128",
        cookie: `${FUNNEL_EXCLUDE_COOKIE}=1`,
      },
      body: JSON.stringify({
        name: "checkout_click",
        deckSlug: "cfa-level-1-anki-deck",
        source: "deck_page_cta",
        path: "/decks/cfa-level-1-anki-deck",
      }),
    });

    const response = await POST(request);

    expect(response.status).toBe(204);
    expect(notifyCheckoutClick).toHaveBeenCalledTimes(1);
    expect(recordFunnelEvent).not.toHaveBeenCalled();
    expect(
      shouldRecordFunnelEvent(
        createFunnelEvent({
          name: "checkout_click",
          deckSlug: "cfa-level-1-anki-deck",
        }),
        request,
      ),
    ).toBe(false);

    delete process.env.FUNNEL_EXCLUDE_IPS;
  });
});
