import { describe, expect, it } from "vitest";
import { createFunnelEvent, funnelEventNames, parseFunnelEvent } from "./analytics";

describe("funnel analytics contract", () => {
  it("supports the landing funnel events that should be logged", () => {
    expect(funnelEventNames).toEqual([
      "page_view",
      "product_facts_view",
      "topic_matrix_view",
      "sample_cards_view",
      "catalog_view",
      "faq_view",
      "checkout_intent",
      "checkout_click",
    ]);
  });

  it("creates a valid event payload with deck and source context", () => {
    const event = createFunnelEvent({
      name: "checkout_click",
      deckSlug: "cfa-level-1-anki-deck",
      source: "hero_cta",
    });

    expect(event).toMatchObject({
      name: "checkout_click",
      deckSlug: "cfa-level-1-anki-deck",
      source: "hero_cta",
    });
    expect(event.eventId).toMatch(/^evt_/);
    expect(event.occurredAt).toContain("T");
  });

  it("parses valid incoming events and rejects unknown events", () => {
    expect(
      parseFunnelEvent({
        name: "checkout_intent",
        deckSlug: "cfa-level-1-anki-deck",
        source: "footer_cta",
        path: "/",
        destinationUrl: "https://pixidstudio.gumroad.com/l/ivjmuu",
        referrer: "https://chat.openai.com/",
        browserLanguage: "en-US",
        browserLanguages: ["en-US", "en"],
        acceptLanguage: "en-US,en;q=0.9",
        country: "US",
        region: "CA",
        city: "Los Angeles",
        timezone: "America/Los_Angeles",
        screen: "1440x900",
        clientIp: "203.0.113.10",
      }),
    ).toMatchObject({
      name: "checkout_intent",
      deckSlug: "cfa-level-1-anki-deck",
      source: "footer_cta",
      path: "/",
      destinationUrl: "https://pixidstudio.gumroad.com/l/ivjmuu",
      browserLanguage: "en-US",
      browserLanguages: ["en-US", "en"],
      country: "US",
      timezone: "America/Los_Angeles",
    });

    expect(() =>
      parseFunnelEvent({
        name: "unknown",
        deckSlug: "cfa-level-1-anki-deck",
      }),
    ).toThrow("Unsupported funnel event");
  });
});
