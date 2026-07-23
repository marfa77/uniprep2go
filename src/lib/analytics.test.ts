import { describe, expect, it } from "vitest";
import { createFunnelEvent, funnelEventNames, parseFunnelEvent } from "./analytics";

describe("funnel analytics contract", () => {
  it("supports the landing funnel events that should be logged", () => {
    expect(funnelEventNames).toEqual([
      "page_view",
      "exam_facts_view",
      "product_facts_view",
      "topic_matrix_view",
      "sample_cards_view",
      "positioning_view",
      "catalog_view",
      "faq_view",
      "checkout_intent",
      "checkout_click",
      "mock_landing_view",
      "mock_started",
      "mock_question_answered",
      "mock_completed",
      "mock_result_view",
      "mock_pass_verdict",
      "mock_no_pass_verdict",
      "mock_unlock_interest",
      "deck_waitlist_interest",
      "mock_deck_cta_click",
      "mock_checkout_placeholder_click",
      "learn_checkout_click",
      "learn_redeem_success",
      "learn_credit_consumed",
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
        destinationUrl: "https://pixidstudio.gumroad.com/l/ivjmuu?wanted=true",
        referrer: "https://chat.openai.com/",
        utmSource: "llm",
        utmMedium: "llms.txt",
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
      destinationUrl: "https://pixidstudio.gumroad.com/l/ivjmuu?wanted=true",
      utmSource: "llm",
      utmMedium: "llms.txt",
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
