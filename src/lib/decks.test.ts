import { describe, expect, it } from "vitest";
import { availableDecks, getDeckBySlug, primaryDeck, siteFaqs } from "./decks";

describe("deck catalog", () => {
  it("exposes the CFA Level 1 Anki deck as reusable product data", () => {
    expect(primaryDeck.slug).toBe("cfa-level-1-anki-deck");
    expect(primaryDeck.checkoutUrl).toBe("https://pixidstudio.gumroad.com/l/ivjmuu");
    expect(primaryDeck.checkoutProvider).toBe("Gumroad");
    expect(primaryDeck.checkoutSeller).toBe("PixID Studio");
    expect(primaryDeck.facts.cards).toBe("342+");
    expect(primaryDeck.format).toBe(".apkg");
    expect(primaryDeck.coverImage).toBe("/covers/cfa-level-1-anki-deck.webp");
    expect(primaryDeck.topicCoverage).toHaveLength(10);
    expect(primaryDeck.sampleCards).toHaveLength(3);
    expect(primaryDeck.sampleCards[0]?.imageUrl).toContain("/samples/");
    expect(primaryDeck.faqs.length).toBeGreaterThanOrEqual(5);
  });

  it("can resolve future product pages by slug", () => {
    expect(getDeckBySlug("cfa-level-1-anki-deck")).toBe(primaryDeck);
    expect(getDeckBySlug("missing-deck")).toBeUndefined();
  });

  it("uses the latest Gumroad preview cards for CFA Level 1", () => {
    expect(primaryDeck.sampleCards.map((card) => card.imageUrl)).toEqual([
      "/samples/cfa-level-1-anki-deck-sample-1.webp",
      "/samples/cfa-level-1-anki-deck-sample-2.webp",
      "/samples/cfa-level-1-anki-deck-sample-3.webp",
    ]);
    expect(primaryDeck.sampleCards.map((card) => card.question)).toEqual([
      "What is a forward contract?",
      "What is the no-arbitrage forward price for an asset with no income?",
      "What is the forward price for an asset that pays income?",
    ]);
    expect(primaryDeck.sampleCards[0]?.answer).toContain("No money changes hands upfront");
    expect(primaryDeck.sampleCards[1]?.answer).toContain("Forward price is the no-arbitrage price");
    expect(primaryDeck.sampleCards[2]?.answer).toContain("Income reduces forward price");
  });

  it("uses Lemon Squeezy as the primary checkout for language decks", () => {
    const cipleDeck = getDeckBySlug("ciple-a2-european-portuguese-anki-deck");

    expect(cipleDeck?.status).toBe("available");
    expect(cipleDeck).toMatchObject({
      checkoutProvider: "Lemon Squeezy",
      checkoutSeller: "Prep2Go",
      checkoutUrl:
        "https://ciple-a2.lemonsqueezy.com/checkout/buy/6f688637-f5ce-440f-8d2a-7614379ee3ca",
    });
  });

  it("positions the catalog as US-first while keeping language decks for long-tail SEO", () => {
    expect(siteFaqs[0].answer).toContain("US-first");
    expect(siteFaqs[1].answer).toContain("FINRA SIE");
    expect(siteFaqs[1].answer).toContain("California real estate");
    expect(siteFaqs[0].answer).toContain("Language decks remain available");
    expect(siteFaqs.some((faq) => faq.question.includes("custom deck"))).toBe(true);
  });

  it("uses product covers for available deck catalog thumbnails", () => {
    const missingCoverDecks = availableDecks.filter((deck) => !deck.coverImage);
    expect(missingCoverDecks.map((deck) => deck.slug)).toEqual([]);

    for (const deck of availableDecks) {
      expect(deck.coverImage, deck.slug).toMatch(/^\/(covers|samples)\/.*cover.*\.webp$|^\/covers\/.*\.webp$/);
      expect(deck.coverImage, deck.slug).not.toContain("-sample-");
      expect(deck.coverImage, deck.slug).not.toContain("/shop-preview-media/");
    }
  });

  it("includes every Lemon Squeezy deck product from Prep2Go shop", () => {
    const expectedLemonDecks = [
      "ciple-a2-european-portuguese-anki-deck",
      "delf-b2-french-anki-deck",
      "dutch-a2-inburgering-anki-deck",
      "german-a2-anki-deck",
      "celi-b1-italian-anki-deck",
      "danish-a2-prove-i-dansk-anki-deck",
      "delf-a2-printable-french-flashcards",
      "spanish-italian-paired-anki-deck",
      "ielts-toefl-english-for-arabic-speakers-anki-deck",
      "arabic-survival-phrases-anki-deck",
      "dele-a2-ccse-spanish-citizenship-bundle",
      "ielts-toefl-english-for-french-speakers-anki-deck",
      "ielts-toefl-english-for-portuguese-speakers-anki-deck",
      "ielts-toefl-english-for-spanish-speakers-anki-deck",
      "ielts-toefl-english-for-turkish-speakers-anki-deck",
      "japanese-survival-phrases-anki-deck",
      "korean-survival-phrases-anki-deck",
      "russian-survival-phrases-anki-deck",
      "norwegian-a2-norskprove-anki-deck",
      "ciple-a2-grammar-anki-deck",
      "dele-a2-grammar-anki-deck",
      "delf-b2-grammar-anki-deck",
    ];

    const lemonDecks = availableDecks.filter((deck) => deck.checkoutProvider === "Lemon Squeezy");

    expect(lemonDecks.map((deck) => deck.slug).sort()).toEqual(expectedLemonDecks.sort());

    for (const slug of expectedLemonDecks) {
      const deck = getDeckBySlug(slug);

      expect(deck?.status).toBe("available");
      expect(deck).toMatchObject({
        category: "language",
        checkoutProvider: "Lemon Squeezy",
        checkoutSeller: "Prep2Go",
      });
      expect(deck?.checkoutUrl).toContain("https://ciple-a2.lemonsqueezy.com/checkout/buy/");
      expect(deck?.sampleCards.length).toBeGreaterThanOrEqual(1);
      if (deck?.slug === "delf-a2-printable-french-flashcards") {
        expect(deck.sampleCards).toHaveLength(4);
        expect(deck.sampleCards.map((card) => card.imageUrl)).toEqual([
          "/samples/delf-a2-printable-french-flashcards-sample-1.webp",
          "/samples/delf-a2-printable-french-flashcards-sample-2.webp",
          "/samples/delf-a2-printable-french-flashcards-sample-3.webp",
          "/samples/delf-a2-printable-french-flashcards-sample-4.webp",
        ]);
        return;
      }
      expect(deck?.sampleCards).toHaveLength(3);
      const firstCard = deck?.sampleCards[0];
      expect(firstCard?.question).not.toMatch(/^What is included in /);
      if (firstCard?.imageUrl) {
        expect(firstCard.imageUrl).toMatch(
          /^(\/shop-preview-media\/|\/samples\/prep2go-grammar\/)/,
        );
      } else {
        expect(firstCard?.audioUrl).toContain(".mp3");
      }
    }
  });

  it("positions English-for-speakers decks as IELTS and TOEFL prep", () => {
    const englishDecks = availableDecks.filter((deck) =>
      deck.slug.startsWith("ielts-toefl-english-for-"),
    );

    expect(englishDecks).toHaveLength(5);
    for (const deck of englishDecks) {
      expect(deck.title).toContain("IELTS / TOEFL English");
      expect(deck.title).toContain("1000 Flashcards");
      expect(deck.facts.cards).toBe("1000");
      expect(deck.directAnswer).toContain("1000 cards");
      expect(deck.directAnswer).toContain("IELTS");
      expect(deck.directAnswer).toContain("TOEFL");
      expect(deck.audience).toContain("IELTS");
      expect(deck.facts.topics).toContain("IELTS");
    }
  });

  it("includes the FRM Part 1 deck with three Gumroad preview cards", () => {
    const frmDeck = getDeckBySlug("frm-part-1-anki-deck");

    expect(frmDeck?.status).toBe("available");
    expect(frmDeck).toMatchObject({
      category: "finance",
      checkoutUrl: "https://pixidstudio.gumroad.com/l/eeyvu",
      checkoutProvider: "Gumroad",
      checkoutSeller: "PixID Studio",
    });
    expect(frmDeck?.facts.cards).toBe("444");
    expect(frmDeck?.sampleCards).toHaveLength(3);
    expect(frmDeck?.sampleCards.map((card) => card.imageUrl)).toEqual([
      "/samples/frm-part-1-anki-deck-sample-1.webp",
      "/samples/frm-part-1-anki-deck-sample-2.webp",
      "/samples/frm-part-1-anki-deck-sample-3.webp",
    ]);
  });

  it("includes the SIE exam deck with three Gumroad preview cards", () => {
    const sieDeck = getDeckBySlug("sie-exam-anki-deck");

    expect(sieDeck?.status).toBe("available");
    expect(sieDeck).toMatchObject({
      category: "finance",
      checkoutUrl: "https://pixidstudio.gumroad.com/l/qjocr",
      checkoutProvider: "Gumroad",
      checkoutSeller: "PixID Studio",
    });
    expect(sieDeck?.facts.cards).toBe("300");
    expect(sieDeck?.sampleCards).toHaveLength(3);
    expect(sieDeck?.sampleCards.map((card) => card.question)).toEqual([
      "What is the SEC?",
      "What is FINRA?",
      "What does the MSRB regulate?",
    ]);
  });

  it("includes the Series 7 deck with three Gumroad preview cards", () => {
    const seriesSevenDeck = getDeckBySlug("series-7-anki-deck");

    expect(seriesSevenDeck?.status).toBe("available");
    expect(seriesSevenDeck).toMatchObject({
      category: "finance",
      checkoutUrl: "https://pixidstudio.gumroad.com/l/lvzval",
      checkoutProvider: "Gumroad",
      checkoutSeller: "PixID Studio",
    });
    expect(seriesSevenDeck?.facts.cards).toBe("300");
    expect(seriesSevenDeck?.sampleCards).toHaveLength(3);
    expect(seriesSevenDeck?.sampleCards.map((card) => card.question)).toEqual([
      "What must a registered representative remember when prospecting for new customers?",
      "When does retail communication require heightened review?",
      "Who is an institutional customer?",
    ]);
  });

  it("includes the Series 63 deck with three Gumroad preview cards", () => {
    const seriesSixtyThreeDeck = getDeckBySlug("series-63-anki-deck");

    expect(seriesSixtyThreeDeck?.status).toBe("available");
    expect(seriesSixtyThreeDeck).toMatchObject({
      category: "finance",
      checkoutUrl: "https://pixidstudio.gumroad.com/l/vsbsgw",
      checkoutProvider: "Gumroad",
      checkoutSeller: "PixID Studio",
    });
    expect(seriesSixtyThreeDeck?.facts.cards).toBe("250");
    expect(seriesSixtyThreeDeck?.sampleCards).toHaveLength(3);
    expect(seriesSixtyThreeDeck?.sampleCards.map((card) => card.imageUrl)).toEqual([
      "/samples/series-63-anki-deck-sample-1.webp",
      "/samples/series-63-anki-deck-sample-2.webp",
      "/samples/series-63-anki-deck-sample-3.webp",
    ]);
    expect(seriesSixtyThreeDeck?.sampleCards.map((card) => card.question)).toEqual([
      "What is a broker-dealer under state securities law?",
      "Why is an issuer usually excluded from broker-dealer definition?",
      "Are agents themselves broker-dealers?",
    ]);
  });

  it("includes the DELF A2 printable deck with four Prep2Go shop preview screenshots", () => {
    const printableDeck = getDeckBySlug("delf-a2-printable-french-flashcards");

    expect(printableDeck?.status).toBe("available");
    expect(printableDeck?.format).toBe("PDF");
    expect(printableDeck?.sampleCards).toHaveLength(4);
    expect(printableDeck?.sampleCards.map((card) => card.imageUrl)).toEqual([
      "/samples/delf-a2-printable-french-flashcards-sample-1.webp",
      "/samples/delf-a2-printable-french-flashcards-sample-2.webp",
      "/samples/delf-a2-printable-french-flashcards-sample-3.webp",
      "/samples/delf-a2-printable-french-flashcards-sample-4.webp",
    ]);
  });

  it("includes the California Real Estate deck with three Gumroad preview cards", () => {
    const californiaRealEstateDeck = getDeckBySlug("california-real-estate-exam-anki-deck");

    expect(californiaRealEstateDeck?.status).toBe("available");
    expect(californiaRealEstateDeck).toMatchObject({
      category: "finance",
      checkoutUrl: "https://pixidstudio.gumroad.com/l/qqrwpk",
      checkoutProvider: "Gumroad",
      checkoutSeller: "PixID Studio",
    });
    expect(californiaRealEstateDeck?.facts.cards).toBe("400");
    expect(californiaRealEstateDeck?.sampleCards).toHaveLength(3);
    expect(californiaRealEstateDeck?.sampleCards.map((card) => card.imageUrl)).toEqual([
      "/samples/california-real-estate-exam-anki-deck-sample-1.webp",
      "/samples/california-real-estate-exam-anki-deck-sample-2.webp",
      "/samples/california-real-estate-exam-anki-deck-sample-3.webp",
    ]);
    expect(californiaRealEstateDeck?.sampleCards.map((card) => card.question)).toEqual([
      "What is real property?",
      "What is personal property?",
      "What is a fixture?",
    ]);
  });

  it("includes the Life & Health Insurance deck with three Gumroad preview cards", () => {
    const lifeHealthDeck = getDeckBySlug("life-and-health-insurance-exam-anki-deck");

    expect(lifeHealthDeck?.status).toBe("available");
    expect(lifeHealthDeck).toMatchObject({
      category: "finance",
      checkoutUrl: "https://pixidstudio.gumroad.com/l/jcrljf",
      checkoutProvider: "Gumroad",
      checkoutSeller: "PixID Studio",
    });
    expect(lifeHealthDeck?.facts.cards).toBe("400");
    expect(lifeHealthDeck?.sampleCards).toHaveLength(3);
    expect(lifeHealthDeck?.sampleCards.map((card) => card.imageUrl)).toEqual([
      "/samples/life-and-health-insurance-exam-anki-deck-sample-1.webp",
      "/samples/life-and-health-insurance-exam-anki-deck-sample-2.webp",
      "/samples/life-and-health-insurance-exam-anki-deck-sample-3.webp",
    ]);
    expect(lifeHealthDeck?.sampleCards.map((card) => card.question)).toEqual([
      "What is risk in insurance?",
      "What is pure risk?",
      "What is speculative risk?",
    ]);
  });

  it("includes the Property & Casualty Insurance deck with three Gumroad preview cards", () => {
    const propertyCasualtyDeck = getDeckBySlug("property-casualty-insurance-exam-anki-deck");

    expect(propertyCasualtyDeck?.status).toBe("available");
    expect(propertyCasualtyDeck).toMatchObject({
      category: "finance",
      checkoutUrl: "https://pixidstudio.gumroad.com/l/engqgt",
      checkoutProvider: "Gumroad",
      checkoutSeller: "PixID Studio",
    });
    expect(propertyCasualtyDeck?.facts.cards).toBe("400");
    expect(propertyCasualtyDeck?.sampleCards).toHaveLength(3);
    expect(propertyCasualtyDeck?.sampleCards.map((card) => card.imageUrl)).toEqual([
      "/samples/property-casualty-insurance-exam-anki-deck-sample-1.webp",
      "/samples/property-casualty-insurance-exam-anki-deck-sample-2.webp",
      "/samples/property-casualty-insurance-exam-anki-deck-sample-3.webp",
    ]);
    expect(propertyCasualtyDeck?.sampleCards.map((card) => card.question)).toEqual([
      "What is risk in property and casualty insurance?",
      "What is pure risk?",
      "What is speculative risk?",
    ]);
  });

  it("uses three real sample previews for the IB Biology SL deck", () => {
    const biologyDeck = getDeckBySlug("ib-biology-sl-anki-deck");

    expect(biologyDeck?.status).toBe("available");
    expect(biologyDeck?.sampleCards).toHaveLength(3);
    expect(biologyDeck?.sampleCards.map((card) => card.imageUrl)).toEqual([
      "/samples/ib-biology-sl-anki-deck-sample-1.webp",
      "/samples/ib-biology-sl-anki-deck-sample-2.webp",
      "/samples/ib-biology-sl-anki-deck-sample-3.webp",
    ]);
    expect(biologyDeck?.sampleCards.map((card) => card.question)).toEqual([
      "Alpha vs Beta glucose",
      "Cellulose structure and function",
      "Starch structure",
    ]);
  });

  it("uses Prep2Go shop preview cards for core language decks", () => {
    const expectations: Record<string, string[]> = {
      "ciple-a2-european-portuguese-anki-deck": ["estar", "eu", "tu"],
      "delf-b2-french-anki-deck": ["être", "je", "tu"],
      "dutch-a2-inburgering-anki-deck": ["zijn", "ik", "jij"],
      "german-a2-anki-deck": ["sein", "ich", "du"],
      "celi-b1-italian-anki-deck": ["essere", "io", "tu"],
    };

    for (const [slug, questions] of Object.entries(expectations)) {
      const deck = getDeckBySlug(slug);

      expect(deck?.sampleCards.map((card) => card.question)).toEqual(questions);
      expect(deck?.sampleCards[0]?.imageUrl).toContain("/shop-preview-media/");
      expect(deck?.sampleCards[0]?.audioUrl).toContain(".mp3");
    }
  });

  it("uses a consistent public title pattern for available decks", () => {
    const expectedTitles: Record<string, string> = {
      "cfa-level-1-anki-deck": "CFA Level 1 Anki Deck — 342+ Smart Flashcards",
      "frm-part-1-anki-deck": "FRM Part 1 Anki Deck — 444 Exam Flashcards",
      "sie-exam-anki-deck": "SIE Exam Anki Deck — 300 High-Yield Flashcards",
      "series-7-anki-deck": "Series 7 Anki Deck — 300 High-Yield Flashcards",
      "series-63-anki-deck": "Series 63 Anki Deck — 250 High-Yield Flashcards",
      "california-real-estate-exam-anki-deck":
        "California Real Estate Exam Anki Deck — 400 High-Yield Flashcards",
      "life-and-health-insurance-exam-anki-deck":
        "Life & Health Insurance Exam Anki Deck — 400 High-Yield Flashcards",
      "property-casualty-insurance-exam-anki-deck":
        "Property & Casualty Insurance Exam Anki Deck — 400 High-Yield Flashcards",
      "ciple-a2-european-portuguese-anki-deck":
        "CIPLE A2 Portuguese Anki Deck — 1600+ Flashcards",
      "delf-b2-french-anki-deck": "DELF B2 French Anki Deck — 2000+ Flashcards",
      "dutch-a2-inburgering-anki-deck":
        "Dutch A2 Inburgering Anki Deck — 1000+ Flashcards",
      "german-a2-anki-deck": "German A2 Anki Deck — 1000 Flashcards",
      "celi-b1-italian-anki-deck": "CELI B1 Italian Anki Deck — 1,373 Flashcards",
      "danish-a2-prove-i-dansk-anki-deck":
        "Danish A2 Prøve i Dansk Anki Deck — 1000 Flashcards",
      "delf-a2-printable-french-flashcards":
        "DELF A2 Printable French Flashcards — 360 PDF Cards",
      "spanish-italian-paired-anki-deck":
        "Spanish + Italian Paired Vocabulary Anki Deck — 940+ Flashcards",
      "ielts-toefl-english-for-arabic-speakers-anki-deck":
        "IELTS / TOEFL English for Arabic Speakers Anki Deck — 1000 Flashcards",
      "arabic-survival-phrases-anki-deck":
        "Arabic Survival Phrases Anki Deck — 300 Flashcards",
      "dele-a2-ccse-spanish-citizenship-bundle":
        "DELE A2 + CCSE Spanish Citizenship Anki Bundle — Exam Flashcards",
      "ielts-toefl-english-for-french-speakers-anki-deck":
        "IELTS / TOEFL English for French Speakers Anki Deck — 1000 Flashcards",
      "ielts-toefl-english-for-portuguese-speakers-anki-deck":
        "IELTS / TOEFL English for Portuguese Speakers Anki Deck — 1000 Flashcards",
      "ielts-toefl-english-for-spanish-speakers-anki-deck":
        "IELTS / TOEFL English for Spanish Speakers Anki Deck — 1000 Flashcards",
      "ielts-toefl-english-for-turkish-speakers-anki-deck":
        "IELTS / TOEFL English for Turkish Speakers Anki Deck — 1000 Flashcards",
      "japanese-survival-phrases-anki-deck":
        "Japanese Survival Phrases Anki Deck — 300 Flashcards",
      "korean-survival-phrases-anki-deck":
        "Korean Survival Phrases Anki Deck — 300 Flashcards",
      "russian-survival-phrases-anki-deck":
        "Russian Survival Phrases Anki Deck — 300 Flashcards",
      "norwegian-a2-norskprove-anki-deck":
        "Norwegian A2 Norskprøve Anki Deck — 1000 Flashcards",
      "ciple-a2-grammar-anki-deck":
        "CIPLE A2 Portuguese Grammar Anki Deck — 200 Cards",
      "dele-a2-grammar-anki-deck":
        "DELE A2 Spanish Grammar Anki Deck — 200 Cards",
      "delf-b2-grammar-anki-deck":
        "DELF B2 French Grammar Anki Deck — 200 Cards",
      "ib-biology-sl-anki-deck": "IB Biology SL Anki Deck — 149 Smart Flashcards",
      "bench-energy-metal-trader-anki-deck":
        "Metal Trader Anki Deck — 202 Commodity Flashcards",
      "bench-energy-oil-trader-anki-deck":
        "Oil Trader Anki Deck — 211 Commodity Flashcards",
      "bench-energy-coal-trader-anki-deck":
        "Coal Trader Anki Deck — 221 Commodity Flashcards",
      "commodity-trader-pack-bundle": "Commodity Trader Pack — 634 Anki Flashcards",
      "us-adaptation-english-prep2go-app": "US Adaptation (English) — Prep2Go Immigration App",
      "uae-survival-guide-prep2go-app": "UAE Survival Guide — Prep2Go Immigration App",
      "saudi-arabia-survival-guide-prep2go-app":
        "Saudi Arabia Survival Guide — Prep2Go Immigration App",
      "singapore-survival-guide-prep2go-app": "Singapore Survival Guide — Prep2Go Immigration App",
      "south-africa-survival-guide-prep2go-app":
        "South Africa Survival Guide — Prep2Go Immigration App",
      "australia-survival-guide-prep2go-app": "Australia Survival Guide — Prep2Go Immigration App",
      "canada-survival-guide-prep2go-app": "Canada Survival Guide — Prep2Go Immigration App",
      "germany-survival-guide-prep2go-app": "Germany Survival Guide — Prep2Go Immigration App",
      "japan-survival-guide-prep2go-app": "Japan Survival Guide — Prep2Go Immigration App",
      "netherlands-survival-guide-prep2go-app":
        "Netherlands Survival Guide — Prep2Go Immigration App",
      "uk-survival-guide-prep2go-app": "UK Survival Guide — Prep2Go Immigration App",
      "portugal-survival-guide-prep2go-app": "Portugal Survival Guide — Prep2Go Immigration App",
      "us-citizenship-test-prep2go-app": "U.S. Citizenship Test — Prep2Go Immigration App",
      "leben-in-deutschland-prep2go-app": "Leben in Deutschland — Prep2Go Immigration App",
      "naturalisation-francaise-prep2go-app":
        "Naturalisation française — Prep2Go Immigration App",
      "life-in-the-uk-prep2go-app": "Life in the UK — Prep2Go Immigration App",
      "canadian-citizenship-prep2go-app": "Canadian Citizenship — Prep2Go Immigration App",
      "australian-citizenship-prep2go-app": "Australian Citizenship — Prep2Go Immigration App",
    };

    expect(Object.fromEntries(availableDecks.map((deck) => [deck.slug, deck.title]))).toEqual(
      expectedTitles,
    );
    expect(availableDecks.every((deck) => deck.title.includes(" — "))).toBe(true);
    expect(availableDecks.every((deck) => !deck.title.includes(":"))).toBe(true);
  });
});
