import { describe, expect, it } from "vitest";
import { createFunnelEvent } from "./analytics";
import { applyPriceRecordToDeck } from "./checkout-pricing";
import { getCatalogDeckBySlug } from "./decks";
import { getMockExamConfig } from "./mock-exams/configs";
import {
  toCheckoutClickMessage,
  toDeckWaitlistMessage,
  toMockInterestMessage,
  toMockStartedMessage,
} from "./telegram-notify";

describe("telegram checkout alerts", () => {
  it("formats Gumroad and Lemon checkout click messages with deck facts", () => {
    const gumroadCatalog = getCatalogDeckBySlug("cfa-level-1-anki-deck");
    const lemonCatalog = getCatalogDeckBySlug("ciple-a2-european-portuguese-anki-deck");

    expect(gumroadCatalog).toBeDefined();
    expect(lemonCatalog).toBeDefined();

    const gumroadDeck = applyPriceRecordToDeck(gumroadCatalog!, {
      amount: 11,
      currency: "USD",
      syncedAt: "2026-06-01T00:00:00.000Z",
      source: "gumroad",
    });
    const lemonDeck = applyPriceRecordToDeck(lemonCatalog!, {
      amount: 24.99,
      currency: "USD",
      syncedAt: "2026-06-01T00:00:00.000Z",
      source: "lemon",
    });

    const gumroadMessage = toCheckoutClickMessage(
      createFunnelEvent({
        name: "checkout_click",
        deckSlug: gumroadDeck.slug,
        source: "deck_page",
        path: `/decks/${gumroadDeck.slug}`,
      }),
      gumroadDeck,
    );

    expect(gumroadMessage).toContain("UniPrep2Go checkout click");
    expect(gumroadMessage).toContain("Provider: Gumroad");
    expect(gumroadMessage).toContain("https://pixidstudio.gumroad.com/l/ivjmuu?wanted=true");

    const lemonMessage = toCheckoutClickMessage(
      createFunnelEvent({
        name: "checkout_click",
        deckSlug: lemonDeck.slug,
        source: "catalog_buy",
        path: "/",
      }),
      lemonDeck,
    );

    expect(lemonMessage).toContain("Provider: Lemon Squeezy");
    expect(lemonMessage).toContain("https://ciple-a2.lemonsqueezy.com/checkout/buy/");
  });
});

describe("telegram mock alerts", () => {
  it("formats mock start messages with source and visitor context", () => {
    const mock = getMockExamConfig("series-7-readiness-check");
    expect(mock).toBeDefined();

    const message = toMockStartedMessage(
      createFunnelEvent({
        name: "mock_started",
        deckSlug: "series-7-anki-deck",
        source: "mock:series-7-readiness-check:start:exam",
        path: "/mock-exams/series-7-readiness-check",
        referrer: "https://google.com/search?q=series+7+mock",
        browserLanguage: "en-US",
        country: "US",
        region: "CA",
        city: "Los Angeles",
        screen: "1440x900",
        clientIp: "203.0.113.42",
        userAgent: "Mozilla/5.0",
      }),
      mock,
    );

    expect(message).toContain("UniPrep2Go mock started · Exam");
    expect(message).toContain("Mode: Exam");
    expect(message).toContain("Mock: Series 7 Readiness Check");
    expect(message).toContain("Linked deck: series-7-anki-deck");
    expect(message).toContain("Referrer: https://google.com/search?q=series+7+mock");
    expect(message).toContain("IP: 203.0.113.42");
  });

  it("labels Learn mode starts distinctly", () => {
    const mock = getMockExamConfig("epa-608-readiness-check");
    const message = toMockStartedMessage(
      createFunnelEvent({
        name: "mock_started",
        deckSlug: "hvac-epa-608-anki-deck",
        source: "mock:epa-608-readiness-check:start:learn",
      }),
      mock,
    );

    expect(message).toContain("UniPrep2Go mock started · Learn");
    expect(message).toContain("Mode: Learn");
  });
});

describe("telegram waitlist and mock interest alerts", () => {
  it("formats deck waitlist messages", () => {
    const message = toDeckWaitlistMessage(
      createFunnelEvent({
        name: "deck_waitlist_interest",
        deckSlug: "cdl-general-knowledge-anki-deck",
        source: "deck:cdl-general-knowledge-anki-deck:waitlist",
        path: "/decks/cdl-general-knowledge-anki-deck",
        country: "US",
      }),
      { slug: "cdl-general-knowledge-anki-deck", title: "CDL General Knowledge Anki Deck", status: "planned" },
    );

    expect(message).toContain("UniPrep2Go deck waitlist request");
    expect(message).toContain("Slug: cdl-general-knowledge-anki-deck");
    expect(message).toContain("Status: planned");
  });

  it("formats mock interest messages", () => {
    const mock = getMockExamConfig("cdl-general-knowledge-readiness-check");
    expect(mock).toBeDefined();

    const message = toMockInterestMessage(
      createFunnelEvent({
        name: "mock_unlock_interest",
        deckSlug: "cdl-general-knowledge-anki-deck",
        source: "mock:cdl-general-knowledge-readiness-check:interest:NO PASS",
        path: "/mock-exams/cdl-general-knowledge-readiness-check",
      }),
      mock,
    );

    expect(message).toContain("UniPrep2Go mock interest");
    expect(message).toContain("Mock slug: cdl-general-knowledge-readiness-check");
  });
});
