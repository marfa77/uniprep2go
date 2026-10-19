import { describe, expect, it } from "vitest";
import { heroAccessActions } from "./mock-hero-access-cta";
import type { Deck } from "@/lib/decks";
import type { LinkedDeckCheckout } from "./mock-report-handoff";

const checkout = { checkoutUrl: "https://gumroad.com/l/example", deckSlug: "example", ctaLabel: "Get the deck" } as LinkedDeckCheckout;
const planned = { status: "planned", shortName: "Example", slug: "example" } as Deck;

describe("heroAccessActions", () => {
  it("keeps the live deck checkout and hides the Mock Pass", () => {
    expect(heroAccessActions({ linkedCheckout: checkout, linkedDeck: undefined })).toEqual({
      showDeckCheckout: true,
      showMockPass: false,
      showWaitlist: false,
    });
  });

  it("offers the Mock Pass when there is no live deck, and a waitlist link when the deck is planned", () => {
    expect(heroAccessActions({ linkedCheckout: null, linkedDeck: planned })).toEqual({
      showDeckCheckout: false,
      showMockPass: true,
      showWaitlist: true,
    });
    expect(heroAccessActions({ linkedCheckout: null, linkedDeck: undefined }).showMockPass).toBe(true);
  });
});
