import { describe, expect, it, vi, beforeEach } from "vitest";
import { createFunnelEvent } from "@/lib/analytics";
import { FUNNEL_EXCLUDE_COOKIE } from "@/lib/funnel-exclude";
import { shouldRecordFunnelEvent } from "@/lib/funnel-filter";

const notifyCheckoutClick = vi.fn(async () => true);
const notifyMockStarted = vi.fn(async () => true);
const recordFunnelEvent = vi.fn(async () => undefined);
const pricedDeck = {
  slug: "cfa-level-1-anki-deck",
  title: "CFA Level 1 Anki Deck",
  checkoutProvider: "Gumroad",
  checkoutUrl: "https://pixidstudio.gumroad.com/l/ivjmuu",
  price: { amount: 11, currency: "USD" },
};

vi.mock("@/lib/telegram-notify", () => ({ notifyCheckoutClick, notifyMockStarted }));
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
    notifyMockStarted.mockClear();
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
        "x-vercel-ip-country": "PT",
        "accept-language": "pt-PT,pt;q=0.9,en;q=0.8",
        cookie: `${FUNNEL_EXCLUDE_COOKIE}=1`,
      },
      body: JSON.stringify({
        name: "checkout_click",
        deckSlug: "cfa-level-1-anki-deck",
        source: "deck_page_cta",
        path: "/decks/cfa-level-1-anki-deck",
        destinationUrl: "https://pixidstudio.gumroad.com/l/ivjmuu",
        browserLanguage: "pt-PT",
      }),
    });

    const response = await POST(request);

    expect(response.status).toBe(204);
    expect(notifyCheckoutClick).toHaveBeenCalledTimes(1);
    expect(notifyCheckoutClick.mock.calls[0]?.[0]).toMatchObject({
      country: "PT",
      acceptLanguage: "pt-PT,pt;q=0.9,en;q=0.8",
      clientIp: "5.194.82.128",
      destinationUrl: "https://pixidstudio.gumroad.com/l/ivjmuu",
    });
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

  it("sends Telegram alerts for recorded mock starts", async () => {
    const { POST } = await import("@/app/api/events/route");
    const request = new Request("https://uniprep2go.study/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": "203.0.113.42",
        "x-vercel-ip-country": "US",
        "accept-language": "en-US,en;q=0.9",
      },
      body: JSON.stringify({
        name: "mock_started",
        deckSlug: "series-7-anki-deck",
        source: "mock:series-7-readiness-check:start",
        path: "/mock-exams/series-7-readiness-check",
        browserLanguage: "en-US",
      }),
    });

    const response = await POST(request);

    expect(response.status).toBe(204);
    expect(recordFunnelEvent).toHaveBeenCalledTimes(1);
    expect(notifyMockStarted).toHaveBeenCalledTimes(1);
    expect(notifyMockStarted.mock.calls[0]?.[0]).toMatchObject({
      name: "mock_started",
      deckSlug: "series-7-anki-deck",
      country: "US",
      clientIp: "203.0.113.42",
    });
    expect(notifyMockStarted.mock.calls[0]?.[1]).toMatchObject({
      slug: "series-7-readiness-check",
    });
  });

  it("sends Telegram mock start alerts even when funnel stats are excluded", async () => {
    process.env.FUNNEL_EXCLUDE_IPS = "203.0.113.42";

    const { POST } = await import("@/app/api/events/route");
    const request = new Request("https://uniprep2go.study/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": "203.0.113.42",
        "x-vercel-ip-country": "US",
        cookie: `${FUNNEL_EXCLUDE_COOKIE}=1`,
      },
      body: JSON.stringify({
        name: "mock_started",
        deckSlug: "series-7-anki-deck",
        source: "mock:series-7-readiness-check:start",
        path: "/mock-exams/series-7-readiness-check",
      }),
    });

    const response = await POST(request);

    expect(response.status).toBe(204);
    expect(notifyMockStarted).toHaveBeenCalledTimes(1);
    expect(recordFunnelEvent).not.toHaveBeenCalled();

    delete process.env.FUNNEL_EXCLUDE_IPS;
  });
});
