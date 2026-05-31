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
      "gumroad_click",
    ]);
  });

  it("creates a valid event payload with deck and source context", () => {
    const event = createFunnelEvent({
      name: "gumroad_click",
      deckSlug: "cfa-level-1-anki-deck",
      source: "hero_cta",
    });

    expect(event).toMatchObject({
      name: "gumroad_click",
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
        referrer: "https://chat.openai.com/",
      }),
    ).toMatchObject({
      name: "checkout_intent",
      deckSlug: "cfa-level-1-anki-deck",
      source: "footer_cta",
      path: "/",
    });

    expect(() =>
      parseFunnelEvent({
        name: "unknown",
        deckSlug: "cfa-level-1-anki-deck",
      }),
    ).toThrow("Unsupported funnel event");
  });
});
