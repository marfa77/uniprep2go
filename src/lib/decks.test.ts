import { describe, expect, it } from "vitest";
import { availableDecks, getAvailableDecksByCategory, getCatalogDeckBySlug, getDeckBySlug, getRelatedDecks, primaryDeck, siteFaqs } from "./decks";

describe("deck catalog", () => {
  it("keeps featured decks in the finance catalog and places CFA Level 2 next to Level 1", () => {
    const finance = getAvailableDecksByCategory().find((group) => group.category === "finance");
    const slugs = finance?.decks.map((deck) => deck.slug) ?? [];

    expect(slugs).toContain("cfa-level-1-anki-deck");
    expect(slugs).toContain("sie-exam-anki-deck");
    expect(slugs.indexOf("cfa-level-2-anki-deck")).toBe(
      slugs.indexOf("cfa-level-1-anki-deck") + 1,
    );
    expect(slugs.indexOf("cfa-level-2-formula-reference-2026")).toBe(
      slugs.indexOf("cfa-level-1-formula-reference-2026") + 1,
    );
  });

  it("exposes the CFA Level 1 Anki deck as reusable product data", () => {
    expect(primaryDeck.slug).toBe("cfa-level-1-anki-deck");
    expect(primaryDeck.checkoutUrl).toBe("https://pixidstudio.gumroad.com/l/ivjmuu?wanted=true");
    expect(primaryDeck.checkoutProvider).toBe("Gumroad");
    expect(primaryDeck.checkoutSeller).toBe("PixID Studio");
    expect(primaryDeck.facts.cards).toBe("348");
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
      "An option-free bond has annual modified duration 7.2 and annual convexity 64. If its yield rises by 100 bps, what is the estimated percentage price change?",
      "A US GAAP firm on LIFO reports inventory of $800k and COGS of $3,000k; its LIFO reserve rose from $150k to $200k as prices rose. What are FIFO inventory and FIFO COGS?",
      "A non-dividend stock trades at $52. A 1-year European call with a $50 strike costs $6.00 and the risk-free rate is 5%. What is the no-arbitrage price of the matching European put?",
    ]);
    expect(primaryDeck.sampleCards[0]?.answer).toContain("About −6.88%. The durati");
    expect(primaryDeck.sampleCards[1]?.answer).toContain("FIFO inventory = $1,000k");
    expect(primaryDeck.sampleCards[2]?.answer).toContain("About $1.62. Put-call pa");
  });

  it("includes the CFA Level 1 Formula Reference as a printable recall product", () => {
    const formulaRef = getDeckBySlug("cfa-level-1-formula-reference-2026");

    expect(formulaRef?.status).toBe("available");
    expect(formulaRef).toMatchObject({
      category: "finance",
      checkoutUrl: "https://pixidstudio.gumroad.com/l/cfa-level-1-formula-reference-2026?wanted=true",
      checkoutProvider: "Gumroad",
      checkoutSeller: "PixID Studio",
      format: "PDF",
      coverImage: "/covers/cfa-level-1-formula-reference-2026.webp",
    });
    expect(formulaRef?.facts.cards).toBe("54 pages + 80 recall questions");
    expect(formulaRef?.sampleCards).toHaveLength(3);
    expect(formulaRef?.sampleCards.map((card) => card.imageUrl)).toEqual([
      "/samples/cfa-level-1-formula-reference-2026-sample-1.webp",
      "/samples/cfa-level-1-formula-reference-2026-sample-2.webp",
      "/samples/cfa-level-1-formula-reference-2026-sample-3.webp",
    ]);
    expect(formulaRef?.directAnswer).toContain("250 typeset formulas");
    expect(formulaRef?.directAnswer).not.toMatch(/study guide/i);
    expect(formulaRef?.title).not.toMatch(/study guide/i);
  });

  it("uses Gumroad as the primary checkout for curated language decks", () => {
    const cipleDeck = getDeckBySlug("ciple-a2-european-portuguese-anki-deck");

    expect(cipleDeck?.status).toBe("available");
    expect(cipleDeck).toMatchObject({
      checkoutProvider: "Gumroad",
      checkoutSeller: "PixID Studio",
      checkoutUrl:
        "https://pixidstudio.gumroad.com/l/ciple-a2-european-portuguese-anki-deck?wanted=true",
    });
  });

  it("positions the catalog as US-first while keeping language decks for long-tail SEO", () => {
    expect(siteFaqs[0].answer).toContain("US-first");
    expect(siteFaqs[1].answer).toContain("FINRA SIE");
    expect(siteFaqs[1].answer).toContain("California real estate");
    expect(siteFaqs[0].answer).toContain("free timed online practice tests");
    expect(siteFaqs.some((faq) => faq.question.includes("custom deck"))).toBe(true);
    expect(
      siteFaqs.some((faq) =>
        faq.answer.includes("published official outlines and blueprints"),
      ),
    ).toBe(true);
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

  it("keeps curated language Anki decks plus DELF Prim, citizenship, and DELE/CCSE bundle on Gumroad", () => {
    const expectedAnkiLanguageDecks = [
      "ciple-a2-european-portuguese-anki-deck",
      "delf-b2-french-anki-deck",
      "dele-a2-spanish-anki-deck",
      "dutch-a2-inburgering-anki-deck",
      "german-a2-anki-deck",
      "celi-b1-italian-anki-deck",
      "danish-a2-prove-i-dansk-anki-deck",
      "norwegian-a2-norskprove-anki-deck",
      "swedish-a2-sfi-anki-deck",
      "greek-a2-ellinomatheia-anki-deck",
      "czech-a2-cce-anki-deck",
      "polish-a2-certyfikat-anki-deck",
      "polish-a2-for-ukrainian-speakers-anki-deck",
      "german-a2-for-ukrainian-speakers-anki-deck",
      "german-a2-for-russian-speakers-anki-deck",
      "ielts-toefl-english-for-french-speakers-anki-deck",
      "ielts-toefl-english-for-arabic-speakers-anki-deck",
      "ielts-toefl-english-for-ukrainian-speakers-anki-deck",
      "ielts-toefl-english-for-russian-speakers-anki-deck",
      "ielts-toefl-english-for-spanish-speakers-anki-deck",
      "ielts-toefl-english-for-portuguese-speakers-anki-deck",
      "ielts-toefl-english-for-turkish-speakers-anki-deck",
    ];
    const expectedLanguageDecks = [
      ...expectedAnkiLanguageDecks,
      "delf-prim-printable-french-flashcards",
      "luxembourg-vivre-ensemble-anki-deck",
      "belgium-flanders-mo-anki-deck",
      "dele-a2-ccse-spanish-citizenship-bundle",
      "leben-in-deutschland-anki-deck",
      "denmark-indfoedsretsproeven-anki-deck",
      "ccse-espana-anki-deck",
      "naturalisation-francaise-anki-deck",
      "norway-statsborgerproven-anki-deck",
      "einburgerung-schweiz-anki-deck",
      "polish-citizenship-anki-deck",
      "sweden-medborgarskapsprov-anki-deck",
      "canadian-citizenship-anki-deck",
      "czech-citizenship-anki-deck",
      "life-in-the-uk-anki-deck",
      "belgium-wallonie-citoyennete-anki-deck",
      "portugal-nacionalidade-anki-deck",
      "australian-citizenship-anki-deck",
      "naturalisation-suisse-anki-deck",
      "naturalizzazione-svizzera-anki-deck",
      "us-citizenship-anki-deck",
    ];

    const languageDecks = availableDecks.filter((deck) => deck.category === "language");

    expect(languageDecks.map((deck) => deck.slug).sort()).toEqual(expectedLanguageDecks.sort());
    expect(availableDecks.filter((deck) => deck.checkoutProvider === "Lemon Squeezy")).toEqual([]);

    for (const slug of expectedAnkiLanguageDecks) {
      const deck = getDeckBySlug(slug);

      expect(deck?.status).toBe("available");
      expect(deck).toMatchObject({
        category: "language",
        format: ".apkg",
        checkoutProvider: "Gumroad",
        checkoutSeller: "PixID Studio",
      });
      expect(deck?.checkoutUrl).toBe(
        `https://pixidstudio.gumroad.com/l/${slug}?wanted=true`,
      );
      expect(deck?.sampleCards.length).toBeGreaterThanOrEqual(1);
      expect(deck?.sampleCards).toHaveLength(3);
      const firstCard = deck?.sampleCards[0];
      expect(firstCard?.question).not.toMatch(/^What is included in /);
    }

    const primDeck = getDeckBySlug("delf-prim-printable-french-flashcards");
    expect(primDeck).toMatchObject({
      status: "available",
      format: "PDF",
      checkoutProvider: "Gumroad",
      checkoutSeller: "PixID Studio",
      checkoutUrl:
        "https://pixidstudio.gumroad.com/l/delf-prim-printable-french-flashcards?wanted=true",
    });
    expect(primDeck?.title).toContain("DELF Prim");
    expect(primDeck?.title).toContain("Ages 7–12");
    expect(primDeck?.directAnswer).toContain("ages 7–12");
    expect(primDeck?.sampleCards).toHaveLength(4);

    const citizenshipBundle = getDeckBySlug("citizenship-naturalization-anki-bundle");
    expect(citizenshipBundle?.status).toBe("planned");
    expect(citizenshipBundle?.checkoutUrl).toBeUndefined();
    expect(citizenshipBundle?.title).toContain("retired hub");
    expect(citizenshipBundle?.directAnswer).toContain("$9");
    expect(getDeckBySlug("us-citizenship-anki-deck")?.status).toBe("available");
    expect(getDeckBySlug("leben-in-deutschland-anki-deck")?.facts.cards).toBe("296");

    for (const slug of [
      "us-citizenship-test-prep2go-app",
      "leben-in-deutschland-prep2go-app",
      "naturalisation-francaise-prep2go-app",
      "life-in-the-uk-prep2go-app",
      "canadian-citizenship-prep2go-app",
      "australian-citizenship-prep2go-app",
    ]) {
      expect(getDeckBySlug(slug)?.status).toBe("planned");
      expect(getCatalogDeckBySlug(slug)).toBeUndefined();
    }

    const swissBundle = getDeckBySlug("swiss-citizenship-anki-deck");
    expect(swissBundle?.status).toBe("planned");
    expect(swissBundle?.checkoutUrl).toBeUndefined();
    expect(swissBundle?.title).toContain("retired hub");
    expect(getDeckBySlug("einburgerung-schweiz-anki-deck")?.facts.cards).toBe("207");

    expect(getDeckBySlug("ciple-a2-european-portuguese-anki-deck")?.directAnswer).toContain(
      "nacionalidade portuguesa",
    );
    expect(getDeckBySlug("ciple-a2-european-portuguese-anki-deck")?.facts.cards).toBe("2067");
    expect(getDeckBySlug("dutch-a2-inburgering-anki-deck")?.title).toContain("NT2");
    expect(getDeckBySlug("dutch-a2-inburgering-anki-deck")?.facts.cards).toBe("1897");
    expect(getDeckBySlug("german-a2-anki-deck")?.title).toContain("Goethe telc ÖSD DTZ");
    expect(getDeckBySlug("celi-b1-italian-anki-deck")?.title).toContain("CELI CILS PLIDA");
    expect(getDeckBySlug("celi-b1-italian-anki-deck")?.facts.cards).toBe("2171");
    expect(getDeckBySlug("danish-a2-prove-i-dansk-anki-deck")?.title).toContain("PD2 PD3");
    expect(getDeckBySlug("norwegian-a2-norskprove-anki-deck")?.title).toContain("Norskprøve");
    expect(getDeckBySlug("norwegian-a2-norskprove-anki-deck")?.facts.cards).toBe("1487");
    expect(getDeckBySlug("swedish-a2-sfi-anki-deck")?.title).toContain("Swedish SFI");
    expect(getDeckBySlug("greek-a2-ellinomatheia-anki-deck")?.title).toContain("Ellinomatheia");
    expect(getDeckBySlug("greek-a2-ellinomatheia-anki-deck")?.facts.cards).toBe("939");
    expect(getDeckBySlug("czech-a2-cce-anki-deck")?.title).toContain("Czech CCE");
    expect(getDeckBySlug("czech-a2-cce-anki-deck")?.facts.cards).toBe("945");
    expect(getDeckBySlug("polish-a2-certyfikat-anki-deck")?.title).toContain("Certyfikat");
    expect(getDeckBySlug("polish-a2-certyfikat-anki-deck")?.facts.cards).toBe("1491");
    expect(getDeckBySlug("polish-a2-for-ukrainian-speakers-anki-deck")?.title).toContain("Ukrainian Speakers");
    expect(getDeckBySlug("polish-a2-for-ukrainian-speakers-anki-deck")?.facts.cards).toBe("1491");
    expect(getDeckBySlug("german-a2-for-ukrainian-speakers-anki-deck")?.title).toContain("Ukrainian Speakers");
    expect(getDeckBySlug("german-a2-for-ukrainian-speakers-anki-deck")?.facts.cards).toBe("2026");
    expect(getDeckBySlug("german-a2-for-russian-speakers-anki-deck")?.title).toContain("Russian Speakers");
    expect(getDeckBySlug("german-a2-for-russian-speakers-anki-deck")?.facts.cards).toBe("2026");
    const enFr = getDeckBySlug("ielts-toefl-english-for-french-speakers-anki-deck");
    expect(enFr?.title).toContain("IELTS / TOEFL English for French Speakers");
    expect(enFr?.facts.cards).toBe("2522");
    expect(enFr?.directAnswer).toContain("French");
    expect(enFr?.directAnswer).toContain("IELTS");
    const enAr = getDeckBySlug("ielts-toefl-english-for-arabic-speakers-anki-deck");
    expect(enAr?.title).toContain("IELTS / TOEFL English for Arabic Speakers");
    expect(enAr?.facts.cards).toBe("2504");
    expect(enAr?.directAnswer).toContain("Arabic");
    const enUk = getDeckBySlug("ielts-toefl-english-for-ukrainian-speakers-anki-deck");
    expect(enUk?.title).toContain("IELTS / TOEFL English for Ukrainian Speakers");
    expect(enUk?.facts.cards).toBe("2504");
    expect(enUk?.directAnswer).toContain("Ukrainian");
    const enRu = getDeckBySlug("ielts-toefl-english-for-russian-speakers-anki-deck");
    expect(enRu?.title).toContain("IELTS / TOEFL English for Russian Speakers");
    expect(enRu?.facts.cards).toBe("2504");
    expect(enRu?.directAnswer).toContain("Russian");
    const enEs = getDeckBySlug("ielts-toefl-english-for-spanish-speakers-anki-deck");
    expect(enEs?.title).toContain("IELTS / TOEFL English for Spanish Speakers");
    expect(enEs?.facts.cards).toBe("2504");
    expect(enEs?.directAnswer).toContain("Latin American Spanish");
    expect(enEs?.shortName).toContain("LatAm");
    const enPt = getDeckBySlug("ielts-toefl-english-for-portuguese-speakers-anki-deck");
    expect(enPt?.title).toContain("IELTS / TOEFL English for Brazilian Portuguese Speakers");
    expect(enPt?.facts.cards).toBe("2504");
    expect(enPt?.directAnswer).toContain("Brazilian Portuguese");
    expect(enPt?.shortName).toContain("BR");
    const deleDeck = getDeckBySlug("dele-a2-spanish-anki-deck");
    expect(deleDeck?.title).toContain("DELE SIELE");
    expect(deleDeck?.directAnswer).toContain("DELE A2");
    expect(deleDeck?.directAnswer).toContain("SIELE");
    expect(deleDeck?.directAnswer).toContain("not a DELE + CCSE nationality bundle");
    expect(deleDeck?.facts.cards).toBe("2120");
    expect(deleDeck?.directAnswer).toContain("single Anki .apkg");
    expect(getCatalogDeckBySlug("dele-a2-ccse-spanish-citizenship-bundle")?.status).toBe("available");
    expect(getDeckBySlug("czech-citizenship-anki-deck")?.status).toBe("available");
    expect(getDeckBySlug("polish-citizenship-anki-deck")?.status).toBe("available");
    const frenchDeck = getDeckBySlug("delf-b2-french-anki-deck");
    expect(frenchDeck?.title).toContain("DELF DALF TCF TEF");
    expect(frenchDeck?.facts.cards).toBe("2115");
    expect(frenchDeck?.directAnswer).toContain("TCF Canada");
    expect(frenchDeck?.directAnswer).toContain("TEF Canada");
    expect(frenchDeck?.directAnswer).toContain("TCF ANF");
    expect(frenchDeck?.directAnswer).toContain("TCF général");
    expect(frenchDeck?.directAnswer).toContain("fide");
    expect(frenchDeck?.directAnswer).toContain("Swiss residency French");
    expect(frenchDeck?.faqs.some((faq) => faq.question.includes("Swiss fide"))).toBe(true);

    const germanDeck = getDeckBySlug("german-a2-anki-deck");
    expect(germanDeck?.directAnswer).toContain("Einbürgerung");
    expect(germanDeck?.directAnswer).toContain("fide");
    expect(germanDeck?.faqs.some((faq) => faq.answer.includes("Einbürgerung Schweiz"))).toBe(
      true,
    );

    const italianDeck = getDeckBySlug("celi-b1-italian-anki-deck");
    expect(italianDeck?.directAnswer).toContain("permesso di soggiorno");
    expect(italianDeck?.directAnswer).toContain("cittadinanza");
  });

  it("ships IELTS English for French, Arabic, Ukrainian, Russian, Spanish, Portuguese, and Turkish Speakers", () => {
    const englishDecks = availableDecks.filter((deck) =>
      deck.slug.startsWith("ielts-toefl-english-for-"),
    );

    expect(englishDecks.map((d) => d.slug).sort()).toEqual([
      "ielts-toefl-english-for-arabic-speakers-anki-deck",
      "ielts-toefl-english-for-french-speakers-anki-deck",
      "ielts-toefl-english-for-portuguese-speakers-anki-deck",
      "ielts-toefl-english-for-russian-speakers-anki-deck",
      "ielts-toefl-english-for-spanish-speakers-anki-deck",
      "ielts-toefl-english-for-turkish-speakers-anki-deck",
      "ielts-toefl-english-for-ukrainian-speakers-anki-deck",
    ].sort());

    const enTr = getDeckBySlug("ielts-toefl-english-for-turkish-speakers-anki-deck");
    expect(enTr?.status).toBe("available");
    expect(enTr?.facts.cards).toBe("952");
    expect(enTr?.directAnswer).toContain("Turkish");
    expect(enTr?.checkoutUrl).toContain("ielts-toefl-english-for-turkish-speakers-anki-deck");
  });

  it("includes the CFA Level 2 Anki deck with three Gumroad preview cards", () => {
    const l2Deck = getDeckBySlug("cfa-level-2-anki-deck");

    expect(l2Deck?.status).toBe("available");
    expect(l2Deck?.facts.cards).toBe("495");
    expect(l2Deck?.sampleCards).toHaveLength(3);
    expect(l2Deck?.sampleCards.map((card) => card.imageUrl)).toEqual([
      "/samples/cfa-level-2-anki-deck-sample-1.webp",
      "/samples/cfa-level-2-anki-deck-sample-2.webp",
      "/samples/cfa-level-2-anki-deck-sample-3.webp",
    ]);
    expect(l2Deck?.sampleCards.map((card) => card.question)).toEqual([
      "How do you value a 2-year 3% annual-pay bond on a tree with r₀ = 2% and year-1 rates of 3.375% and 2.5%?",
      "How do you apply both a DLOC and a DLOM to value a minority stake in a private company?",
      "How does standardized unexpected earnings work as a momentum indicator, and why scale the surprise?",
    ]);
    expect(l2Deck?.sampleCards[0]?.answer).toContain("today's value is about 101.04");
    expect(l2Deck?.sampleCards[1]?.answer).toContain("Total discount = 1 − (1 − DLOC)(1 − DLOM)");
    expect(l2Deck?.sampleCards[2]?.answer).toContain("SUE = (reported EPS − expected EPS)");
  });

  it("includes the FRM Part 1 deck with three Gumroad preview cards", () => {
    const frmDeck = getDeckBySlug("frm-part-1-anki-deck");

    expect(frmDeck?.status).toBe("available");
    expect(frmDeck).toMatchObject({
      category: "finance",
      checkoutUrl: "https://pixidstudio.gumroad.com/l/eeyvu?wanted=true",
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
    expect(frmDeck?.sampleCards[0]?.question).toContain("single monthly mortality rate");
    expect(frmDeck?.sampleCards[1]?.question).toContain("default correlation");
    expect(frmDeck?.sampleCards[2]?.question).toContain("OLS slope and intercept");
    expect(frmDeck?.topicCoverage?.map((t) => t.cards)).toEqual(["89", "89", "133", "133"]);
  });

  it("includes the SIE exam deck with three Gumroad preview cards", () => {
    const sieDeck = getDeckBySlug("sie-exam-anki-deck");

    expect(sieDeck?.status).toBe("available");
    expect(sieDeck).toMatchObject({
      category: "finance",
      checkoutUrl: "https://pixidstudio.gumroad.com/l/qjocr?wanted=true",
      checkoutProvider: "Gumroad",
      checkoutSeller: "PixID Studio",
    });
    expect(sieDeck?.facts.cards).toBe("300");
    expect(sieDeck?.sampleCards).toHaveLength(3);
    // Screenshot captures: text must stay the captured card.
    expect(sieDeck?.sampleCards.map((card) => card.question)).toEqual([
      "How do you find the conversion ratio and parity price of a convertible bond?",
      "How does the Securities Exchange Act of 1934 differ from the 1933 Act?",
      "When must a firm file a Currency Transaction Report?",
    ]);
  });

  it("includes the Series 7 deck with three Gumroad preview cards", () => {
    const seriesSevenDeck = getDeckBySlug("series-7-anki-deck");

    expect(seriesSevenDeck?.status).toBe("available");
    expect(seriesSevenDeck).toMatchObject({
      category: "finance",
      checkoutUrl: "https://pixidstudio.gumroad.com/l/lvzval?wanted=true",
      checkoutProvider: "Gumroad",
      checkoutSeller: "PixID Studio",
    });
    expect(seriesSevenDeck?.facts.cards).toBe("300");
    expect(seriesSevenDeck?.sampleCards).toHaveLength(3);
    expect(seriesSevenDeck?.sampleCards.map((card) => card.question)).toEqual([
      "A customer in the 32% bracket compares a 4% muni with a 5.5% corporate bond. Which pays more after tax?",
      "A customer buys 1 XYZ Jan 50 put at 3. What is the maximum loss, and at what stock price does it occur?",
      "When a customer's risk tolerance and risk capacity disagree, which one limits the recommendation?",
    ]);
  });

  it("includes the Series 63 deck with three Gumroad preview cards", () => {
    const seriesSixtyThreeDeck = getDeckBySlug("series-63-anki-deck");

    expect(seriesSixtyThreeDeck?.status).toBe("available");
    expect(seriesSixtyThreeDeck).toMatchObject({
      category: "finance",
      checkoutUrl: "https://pixidstudio.gumroad.com/l/vsbsgw?wanted=true",
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
      "When must Form CRS be updated and existing clients informed?",
      "When can a person avoid imprisonment for violating a rule or order?",
      "When does an investment adviser not need to register in a state?",
    ]);
  });

  it("keeps the legacy DELF A2 printable planned and sells DELF Prim for kids", () => {
    const legacyPrintable = getDeckBySlug("delf-a2-printable-french-flashcards");
    const primPrintable = getDeckBySlug("delf-prim-printable-french-flashcards");

    expect(legacyPrintable?.status).toBe("planned");
    expect(legacyPrintable?.format).toBe("PDF");
    expect(primPrintable?.status).toBe("available");
    expect(primPrintable?.format).toBe("PDF");
    expect(primPrintable?.sampleCards.map((card) => card.imageUrl)).toEqual([
      "/samples/delf-prim-printable-french-flashcards-sample-1.webp",
      "/samples/delf-prim-printable-french-flashcards-sample-2.webp",
      "/samples/delf-prim-printable-french-flashcards-sample-3.webp",
      "/samples/delf-prim-printable-french-flashcards-sample-4.webp",
    ]);
  });

  it("includes the California Real Estate deck with three Gumroad preview cards", () => {
    const californiaRealEstateDeck = getDeckBySlug("california-real-estate-exam-anki-deck");

    expect(californiaRealEstateDeck?.status).toBe("available");
    expect(californiaRealEstateDeck).toMatchObject({
      category: "finance",
      checkoutUrl: "https://pixidstudio.gumroad.com/l/qqrwpk?wanted=true",
      checkoutProvider: "Gumroad",
      checkoutSeller: "PixID Studio",
    });
    expect(californiaRealEstateDeck?.facts.cards).toBe("250");
    expect(californiaRealEstateDeck?.sampleCards).toHaveLength(3);
    expect(californiaRealEstateDeck?.sampleCards.map((card) => card.imageUrl)).toEqual([
      "/samples/california-real-estate-exam-anki-deck-sample-1.webp",
      "/samples/california-real-estate-exam-anki-deck-sample-2.webp",
      "/samples/california-real-estate-exam-anki-deck-sample-3.webp",
    ]);
    // Screenshot captures: text must stay the captured card.
    expect(californiaRealEstateDeck?.sampleCards.map((card) => card.question)).toEqual([
      "A listing agent meets a Fresno homeowner to sign a listing; weeks later a buyer's agent writes an offer. When must each agent deliver the agency relationship disclosure form?",
      "A Sacramento seller hands the buyer the Transfer Disclosure Statement two days after the buyer's offer was accepted. The house is sold 'as-is.' What right does the buyer have?",
      "Lena buys a Los Angeles condo for $800,000 in 2025. Ignoring voter-approved bonds and assessments, what is her basic property tax, and the most her assessed value can be the next year?",
    ]);
  });

  it("includes the Life & Health Insurance deck with three Gumroad preview cards", () => {
    const lifeHealthDeck = getDeckBySlug("life-and-health-insurance-exam-anki-deck");

    expect(lifeHealthDeck?.status).toBe("available");
    expect(lifeHealthDeck).toMatchObject({
      category: "finance",
      checkoutUrl: "https://pixidstudio.gumroad.com/l/jcrljf?wanted=true",
      checkoutProvider: "Gumroad",
      checkoutSeller: "PixID Studio",
    });
    expect(lifeHealthDeck?.facts.cards).toBe("250");
    expect(lifeHealthDeck?.sampleCards).toHaveLength(3);
    expect(lifeHealthDeck?.sampleCards.map((card) => card.imageUrl)).toEqual([
      "/samples/life-and-health-insurance-exam-anki-deck-sample-1.webp",
      "/samples/life-and-health-insurance-exam-anki-deck-sample-2.webp",
      "/samples/life-and-health-insurance-exam-anki-deck-sample-3.webp",
    ]);
    // Screenshot captures: text must stay the captured card.
    expect(lifeHealthDeck?.sampleCards.map((card) => card.question)).toEqual([
      "Dana bought a $250,000 life policy without disclosing that she smoked. She dies in a car crash 26 months after issue. Can the insurer deny the claim because of the misstatement?",
      "Raj's nonqualified deferred annuity holds $60,000 of after-tax premiums and is worth $90,000. At age 52 he withdraws $40,000. How much is taxable, and is there a penalty?",
      "Mia, 8, is covered under both her married parents' employer health plans. Mom was born March 10, 1990; Dad was born July 2, 1985. Which plan pays first on Mia's $2,000 claim?",
    ]);
  });

  it("includes the Property & Casualty Insurance deck with three Gumroad preview cards", () => {
    const propertyCasualtyDeck = getDeckBySlug("property-casualty-insurance-exam-anki-deck");

    expect(propertyCasualtyDeck?.status).toBe("available");
    expect(propertyCasualtyDeck).toMatchObject({
      category: "finance",
      checkoutUrl: "https://pixidstudio.gumroad.com/l/engqgt?wanted=true",
      checkoutProvider: "Gumroad",
      checkoutSeller: "PixID Studio",
    });
    expect(propertyCasualtyDeck?.facts.cards).toBe("250");
    expect(propertyCasualtyDeck?.sampleCards).toHaveLength(3);
    expect(propertyCasualtyDeck?.sampleCards.map((card) => card.imageUrl)).toEqual([
      "/samples/property-casualty-insurance-exam-anki-deck-sample-1.webp",
      "/samples/property-casualty-insurance-exam-anki-deck-sample-2.webp",
      "/samples/property-casualty-insurance-exam-anki-deck-sample-3.webp",
    ]);
    // Screenshot captures: text must stay the captured card.
    expect(propertyCasualtyDeck?.sampleCards.map((card) => card.question)).toEqual([
      "A building worth $500,000 is insured for $300,000 with an 80% coinsurance clause and a $1,000 deductible. A fire causes a $100,000 partial loss. How much does the insurer pay?",
      "Under an HO-3, a homeowner knocks over a can of paint while redecorating. It ruins the wall-to-wall carpet and a leather sofa. Which damage is covered?",
      "Sam carries 25/50/25 auto liability. He causes a crash: driver A has $40,000 of injuries, driver B $15,000, and A's car needs $30,000 of repairs. What does Sam's insurer pay?",
    ]);
  });

  it("includes the ServSafe Manager deck as a full food safety product", () => {
    const servSafeDeck = getDeckBySlug("servsafe-manager-anki-deck");

    expect(servSafeDeck?.status).toBe("available");
    expect(servSafeDeck).toMatchObject({
      category: "professional",
      checkoutUrl: "https://pixidstudio.gumroad.com/l/ldpevc?wanted=true",
      checkoutProvider: "Gumroad",
      checkoutSeller: "PixID Studio",
      format: ".apkg",
      coverImage: "/covers/servsafe-manager-anki-deck.webp",
    });
    expect(servSafeDeck?.facts.cards).toBe("300");
    expect(servSafeDeck?.sampleCards).toHaveLength(3);
    expect(servSafeDeck?.sampleCards.map((card) => card.imageUrl)).toEqual([
      "/samples/servsafe-manager-anki-deck-sample-1.webp",
      "/samples/servsafe-manager-anki-deck-sample-2.webp",
      "/samples/servsafe-manager-anki-deck-sample-3.webp",
    ]);
    expect(servSafeDeck?.directAnswer).toContain("ServSafe Manager Anki deck");
  });

  it("includes the ServSafe Manager PDF guide as a printable practice product", () => {
    const servSafeGuide = getDeckBySlug("servsafe-manager-complete-study-guide");

    expect(servSafeGuide?.status).toBe("available");
    expect(servSafeGuide).toMatchObject({
      category: "professional",
      checkoutUrl: "https://pixidstudio.gumroad.com/l/lyvna?wanted=true",
      checkoutProvider: "Gumroad",
      checkoutSeller: "PixID Studio",
      format: "PDF",
      coverImage: "/covers/servsafe-manager-complete-study-guide.webp",
    });
    expect(servSafeGuide?.facts.cards).toBe("40 pages + 70 practice questions");
    expect(servSafeGuide?.sampleCards).toHaveLength(3);
    expect(servSafeGuide?.sampleCards.map((card) => card.imageUrl)).toEqual([
      "/samples/servsafe-manager-complete-study-guide-sample-1.webp",
      "/samples/servsafe-manager-complete-study-guide-sample-2.webp",
      "/samples/servsafe-manager-complete-study-guide-sample-3.webp",
    ]);
    expect(servSafeGuide?.directAnswer).toContain("40 pages");
    expect(servSafeGuide?.directAnswer).toContain("8 exam domains fully explained");
    expect(servSafeGuide?.directAnswer).toContain("70 exam-style multiple-choice questions");
  });

  it("includes the PTCB Pharmacy Technician deck as a full PTCE prep product", () => {
    const ptcbDeck = getDeckBySlug("ptcb-pharmacy-technician-anki-deck");

    expect(ptcbDeck?.status).toBe("available");
    expect(ptcbDeck).toMatchObject({
      category: "professional",
      checkoutUrl: "https://pixidstudio.gumroad.com/l/yvifxh?wanted=true",
      checkoutProvider: "Gumroad",
      checkoutSeller: "PixID Studio",
      format: ".apkg",
      coverImage: "/covers/ptcb-pharmacy-technician-anki-deck.webp",
    });
    expect(ptcbDeck?.facts.cards).toBe("300");
    expect(ptcbDeck?.sampleCards).toHaveLength(3);
    expect(ptcbDeck?.sampleCards.map((card) => card.imageUrl)).toEqual([
      "/samples/ptcb-pharmacy-technician-anki-deck-sample-1.webp",
      "/samples/ptcb-pharmacy-technician-anki-deck-sample-2.webp",
      "/samples/ptcb-pharmacy-technician-anki-deck-sample-3.webp",
    ]);
    expect(ptcbDeck?.sampleCards.map((card) => card.question)).toEqual([
      "Lopressor vs Toprol XL — generic name, class, use, and the substitution trap?",
      "How do you verify the check digit of DEA number BL6324817?",
      "Why is concentrated oral morphine solution a classic dosing-error drug?",
    ]);
    expect(ptcbDeck?.sampleCards[1].answer).toContain("BL6324817 fails");
    expect(ptcbDeck?.directAnswer).toContain("PTCE");
    expect(ptcbDeck?.directAnswer).toContain("60 high-yield Top 200 drugs");
    expect(ptcbDeck?.directAnswer).not.toMatch(/top 200 brand\/generic pairs/i);
    expect(ptcbDeck?.directAnswer).not.toContain("UniPrep2Go sells");
  });

  it("includes the PTCB Study Guide 2026 as a printable PTCE prep product", () => {
    const ptcbGuide = getDeckBySlug("ptcb-study-guide-2026");

    expect(ptcbGuide?.status).toBe("available");
    expect(ptcbGuide).toMatchObject({
      category: "professional",
      checkoutUrl: "https://pixidstudio.gumroad.com/l/ptcb-study-guide-2026?wanted=true",
      checkoutProvider: "Gumroad",
      checkoutSeller: "PixID Studio",
      format: "PDF",
      coverImage: "/covers/ptcb-study-guide-2026.webp",
    });
    expect(ptcbGuide?.facts.cards).toBe("30 pages + 80 practice questions");
    expect(ptcbGuide?.sampleCards).toHaveLength(3);
    expect(ptcbGuide?.sampleCards.map((card) => card.imageUrl)).toEqual([
      "/samples/ptcb-study-guide-2026-sample-1.webp",
      "/samples/ptcb-study-guide-2026-sample-2.webp",
      "/samples/ptcb-study-guide-2026-sample-3.webp",
    ]);
    expect(ptcbGuide?.directAnswer).toContain("January 2026 PTCE");
    expect(ptcbGuide?.directAnswer).toContain("80-question practice exam");
  });

  it("includes the CAT4 Level D bundle as an academic prep product", () => {
    const cat4Bundle = getDeckBySlug("cat4-level-d-anki-deck-printable-pdf");

    expect(cat4Bundle?.status).toBe("available");
    expect(cat4Bundle).toMatchObject({
      category: "academic",
      checkoutUrl: "https://pixidstudio.gumroad.com/l/mhgni?wanted=true",
      checkoutProvider: "Gumroad",
      checkoutSeller: "PixID Studio",
      format: ".apkg",
      coverImage: "/covers/cat4-level-d-anki-deck-printable-pdf.webp",
    });
    expect(cat4Bundle?.facts.cards).toBe("200 Anki cards + 49-page PDF");
    expect(cat4Bundle?.sampleCards).toHaveLength(3);
    expect(cat4Bundle?.sampleCards.map((card) => card.imageUrl)).toEqual([
      "/samples/cat4-level-d-anki-deck-printable-pdf-sample-1.webp",
      "/samples/cat4-level-d-anki-deck-printable-pdf-sample-2.webp",
      "/samples/cat4-level-d-anki-deck-printable-pdf-sample-3.webp",
    ]);
    expect(cat4Bundle?.directAnswer).toContain("CAT4 Level D");
    expect(cat4Bundle?.directAnswer).not.toContain("prep2go CAT4");
    expect(cat4Bundle?.directAnswer).not.toContain("UniPrep2Go sells");
  });

  it("links academic decks to other products in the same category", () => {
    const cat4 = getCatalogDeckBySlug("cat4-level-d-anki-deck-printable-pdf");
    const biology = getCatalogDeckBySlug("ib-biology-sl-anki-deck");

    expect(cat4).toBeDefined();
    expect(biology).toBeDefined();

    const relatedToCat4 = getRelatedDecks(cat4!);
    expect(relatedToCat4.some((deck) => deck.slug === "ib-biology-sl-anki-deck")).toBe(true);

    const relatedToBiology = getRelatedDecks(biology!);
    expect(relatedToBiology.some((deck) => deck.slug === "cat4-level-d-anki-deck-printable-pdf")).toBe(
      true,
    );
  });

  it("wires ACE CPT to NASM and ISSA peer decks", () => {
    const ace = getCatalogDeckBySlug("ace-cpt-anki-deck");
    expect(ace).toBeDefined();
    const related = getRelatedDecks(ace!);
    expect(related.map((deck) => deck.slug)).toEqual(
      expect.arrayContaining(["nasm-cpt-anki-deck", "issa-cpt-anki-deck"]),
    );
  });

  it("shows only explicit PTCB peers on the study guide page", () => {
    const guide = getCatalogDeckBySlug("ptcb-study-guide-2026");
    expect(guide).toBeDefined();
    const related = getRelatedDecks(guide!);
    expect(related.map((deck) => deck.slug)).toEqual(["ptcb-pharmacy-technician-anki-deck"]);
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

  it("uses Prep2Go shop preview cards for curated language decks", () => {
    const expectations: Record<string, string[]> = {
      "ciple-a2-european-portuguese-anki-deck": ["a universidade", "o escritório", "o mercado"],
      "delf-b2-french-anki-deck": ["université", "bureau", "marché"],
      "dutch-a2-inburgering-anki-deck": ["universiteit", "kantoor", "markt"],
      "german-a2-anki-deck": ["universität", "büro", "markt"],
      "dele-a2-spanish-anki-deck": ["universidad", "oficina", "mercado"],
      "celi-b1-italian-anki-deck": ["università", "ufficio", "mercato"],
      "danish-a2-prove-i-dansk-anki-deck": ["universitet", "kontor", "marked"],
      "norwegian-a2-norskprove-anki-deck": ["universitet", "kontor", "marked"],
      "swedish-a2-sfi-anki-deck": ["universitet", "kontor", "marknad"],
      "greek-a2-ellinomatheia-anki-deck": ["πανεπιστήμιο", "γραφείο", "αγορά"],
      "czech-a2-cce-anki-deck": ["univerzita", "kancelář", "trh"],
      "polish-a2-certyfikat-anki-deck": ["dom", "rodzina", "rynek"],
      "polish-a2-for-ukrainian-speakers-anki-deck": ["dom", "rodzina", "rynek"],
      "german-a2-for-ukrainian-speakers-anki-deck": ["universität", "büro", "markt"],
      "german-a2-for-russian-speakers-anki-deck": ["universität", "büro", "markt"],
      "ielts-toefl-english-for-french-speakers-anki-deck": ["university", "interview", "station"],
      "ielts-toefl-english-for-arabic-speakers-anki-deck": ["university", "interview", "station"],
      "ielts-toefl-english-for-ukrainian-speakers-anki-deck": ["university", "interview", "station"],
      "ielts-toefl-english-for-russian-speakers-anki-deck": ["university", "interview", "station"],
      "ielts-toefl-english-for-spanish-speakers-anki-deck": ["university", "interview", "station"],
      "ielts-toefl-english-for-portuguese-speakers-anki-deck": ["university", "interview", "station"],
      "ielts-toefl-english-for-turkish-speakers-anki-deck": ["university", "interview", "station"],
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
      "cfa-level-1-anki-deck": "CFA Level 1 Anki Deck — 348 Smart Flashcards",
      "cfa-level-1-formula-reference-2026":
        "CFA Level 1 Formula Reference 2026 — 250 Formulas + 98 Definitions + 80-Question Drill (PDF)",
      "cfa-level-2-anki-deck": "CFA Level 2 Anki Deck — 495 Flashcards",
      "cfa-level-2-formula-reference-2026":
        "CFA Level 2 Formula Reference 2026 — 219 Formulas + 276 Definitions + 80-Question Drill (PDF)",
      "cfps-anki-deck": "CFPS Anki Deck — 400 Flashcards",
      "frm-part-1-anki-deck": "FRM Part 1 Anki Deck — 444 Exam Flashcards",
      "sie-exam-anki-deck": "SIE Exam Anki Deck — 300 High-Yield Flashcards",
      "series-7-anki-deck": "Series 7 Flashcards — 300 High-Yield Top-Off Cards + Free Timed Mock",
      "series-63-anki-deck": "Series 63 Flashcards — 250 High-Yield NASAA Cards + Free Timed Mock",
      "california-real-estate-exam-anki-deck":
        "California Real Estate Exam Anki Deck — 250 High-Yield Flashcards",
      "life-and-health-insurance-exam-anki-deck":
        "Life & Health Insurance Exam Anki Deck — 250 High-Yield Flashcards",
      "property-casualty-insurance-exam-anki-deck":
        "Property & Casualty Insurance Exam Anki Deck — 250 High-Yield Flashcards",
      "ciple-a2-european-portuguese-anki-deck":
        "CIPLE CAPLE Portuguese Citizenship Anki Deck — 2067 Flashcards",
      "delf-b2-french-anki-deck": "DELF DALF TCF TEF French Anki Deck — 2115 Flashcards",
      "delf-prim-printable-french-flashcards":
        "DELF Prim Printable French Flashcards — Ages 7–12 · 360 PDF Cards",
            "dele-a2-spanish-anki-deck": "DELE SIELE Spanish Anki Deck — 2120 Flashcards",
      "dutch-a2-inburgering-anki-deck":
        "Dutch Inburgering NT2 A2 Anki Deck — 1897 Flashcards",
      "german-a2-anki-deck": "German Goethe telc ÖSD DTZ Anki Deck — 2115 Flashcards",
      "gmat-focus-anki-deck": "GMAT Focus Anki Deck — 200 Flashcards",
      "sat-anki-deck": "Digital SAT Anki Deck — 160 Flashcards",
      "pmp-anki-deck": "PMP Anki Deck — 346 Flashcards",
      "gre-anki-deck": "GRE Anki Deck — 350 Flashcards",
      "leed-ap-om-anki-deck": "LEED AP O+M Anki Deck — 250 Flashcards",
      "celi-b1-italian-anki-deck": "CELI CILS PLIDA Italian Anki Deck — 2171 Flashcards",
      "danish-a2-prove-i-dansk-anki-deck":
        "Danish Prøve i Dansk PD2 PD3 Anki Deck — 1000 Flashcards",
      "norwegian-a2-norskprove-anki-deck":
        "Norwegian Norskprøve Residence Citizenship Anki Deck — 1487 Flashcards",
      "swedish-a2-sfi-anki-deck":
        "Swedish SFI Residence Citizenship Anki Deck — 1000 Flashcards",
      "greek-a2-ellinomatheia-anki-deck":
        "Greek Ellinomatheia Residence Citizenship Anki Deck — 939 Flashcards",
      "czech-a2-cce-anki-deck":
        "Czech CCE Residence Citizenship Anki Deck — 945 Flashcards",
      "polish-a2-certyfikat-anki-deck":
        "Polish A2 Certyfikat Residence Citizenship Anki Deck — 1491 Flashcards",
      "polish-a2-for-ukrainian-speakers-anki-deck":
        "Polish A2 for Ukrainian Speakers Anki Deck — 1491 Flashcards",
      "german-a2-for-ukrainian-speakers-anki-deck":
        "German A2 for Ukrainian Speakers Anki Deck — 2026 Flashcards",
      "german-a2-for-russian-speakers-anki-deck":
        "German A2 for Russian Speakers Anki Deck — 2026 Flashcards",
      "ielts-toefl-english-for-french-speakers-anki-deck":
        "IELTS / TOEFL English for French Speakers Anki Deck — 2522 Flashcards",
      "ielts-toefl-english-for-arabic-speakers-anki-deck":
        "IELTS / TOEFL English for Arabic Speakers Anki Deck — 2504 Flashcards",
      "ielts-toefl-english-for-ukrainian-speakers-anki-deck":
        "IELTS / TOEFL English for Ukrainian Speakers Anki Deck — 2504 Flashcards",
      "ielts-toefl-english-for-russian-speakers-anki-deck":
        "IELTS / TOEFL English for Russian Speakers Anki Deck — 2504 Flashcards",
      "ielts-toefl-english-for-spanish-speakers-anki-deck":
        "IELTS / TOEFL English for Spanish Speakers Anki Deck — 2504 Flashcards",
      "ielts-toefl-english-for-portuguese-speakers-anki-deck":
        "IELTS / TOEFL English for Brazilian Portuguese Speakers Anki — 2504 Cards",
      "ielts-toefl-english-for-turkish-speakers-anki-deck":
        "IELTS / TOEFL English for Turkish Speakers Anki Deck — 952 Flashcards",
      "belgium-flanders-mo-anki-deck": "Belgium Flanders MO Anki Deck — 165 Flashcards",
      "hvac-epa-608-anki-deck": "EPA 608 HVAC Anki Deck — 200 Flashcards",
      "ib-biology-sl-anki-deck": "IB Biology SL Anki Deck — 149 Smart Flashcards",
      "cat4-level-d-anki-deck-printable-pdf":
        "CAT4 Level D Anki Deck + Printable PDF — Grade 7 Verbal & Quantitative",
      "servsafe-manager-anki-deck": "ServSafe Manager Anki Deck — 300 Food Safety Flashcards",
      "servsafe-manager-complete-study-guide":
        "ServSafe Manager Complete Study Guide — PDF + 70 Practice Questions",
      "ptcb-pharmacy-technician-anki-deck":
        "PTCB Pharmacy Technician Anki Deck — 300 High-Yield Flashcards",
      "ptcb-study-guide-2026":
        "PTCB Outline 2026 Study Guide — PTCE Blueprint PDF + 80-Question Exam + Cheat Sheets",
      "ace-cpt-anki-deck": "ACE CPT Anki Deck — 300 Flashcards",
      "acsm-cpt-anki-deck": "ACSM CPT Anki Deck — 120 Flashcards",
      "nha-cpct-anki-deck": "NHA CPCT/A Anki Deck — 120 Flashcards",
      "luxembourg-vivre-ensemble-anki-deck":
        "Luxembourg Vivre ensemble Anki Deck — 478 Flashcards",
      "bench-energy-metal-trader-anki-deck":
        "Metal Trader Anki Deck — 202 Commodity Flashcards",
      "bench-energy-oil-trader-anki-deck":
        "Oil Trader Anki Deck — 211 Commodity Flashcards",
      "bench-energy-coal-trader-anki-deck":
        "Coal Trader Anki Deck — 221 Commodity Flashcards",
      "bms-building-automation-anki-deck":
        "BMS / BAS Anki Deck — 200 Flashcards",
      "cfp-certification-anki-deck": "CFP Certification Anki Deck — 120 Flashcards",
      "commodity-trader-pack-bundle": "Commodity Trader Pack — 634 Anki Flashcards",
      "cdcp-anki-deck": "CDCP Anki Deck — 250 Flashcards",
      "cem-anki-deck": "CEM Anki Deck — 250 Flashcards",
      "enrolled-agent-anki-deck": "IRS Enrolled Agent Anki Deck — 120 Flashcards",
      "fl-real-estate-anki-deck": "Florida Real Estate Anki Deck — 60 Flashcards",
      "mortgage-loan-originator-anki-deck": "SAFE MLO Anki Deck — 120 Flashcards",
      "series-6-anki-deck": "Series 6 Anki Deck — 120 Flashcards",
      "series-65-anki-deck": "Series 65 Anki Deck — 120 Flashcards",
      "series-66-anki-deck": "Series 66 Anki Deck — 120 Flashcards",
      "series-79-anki-deck": "Series 79 Anki Deck — 120 Flashcards",
      "series-99-anki-deck": "Series 99 Anki Deck — 120 Flashcards",
      "ak-real-estate-anki-deck": "Alaska Real Estate Anki Deck — 60 Flashcards",
      "al-real-estate-anki-deck": "Alabama Real Estate Anki Deck — 60 Flashcards",
      "ar-real-estate-anki-deck": "Arkansas Real Estate Anki Deck — 60 Flashcards",
      "az-real-estate-anki-deck": "Arizona Real Estate Anki Deck — 60 Flashcards",
      "co-real-estate-anki-deck": "Colorado Real Estate Anki Deck — 60 Flashcards",
      "dele-a2-ccse-spanish-citizenship-bundle":
        "DELE A2 + CCSE Anki Bundle — 2463 Flashcards for Spanish Nationality",
      "ga-real-estate-anki-deck": "Georgia Real Estate Anki Deck — 60 Flashcards",
      "il-real-estate-anki-deck": "Illinois Real Estate Anki Deck — 60 Flashcards",
      "ma-real-estate-anki-deck": "Massachusetts Real Estate Anki Deck — 60 Flashcards",
      "medical-scribe-anki-deck": "Medical Scribe Anki Deck — 120 Flashcards",
      "mi-real-estate-anki-deck": "Michigan Real Estate Anki Deck — 60 Flashcards",
      "nc-real-estate-anki-deck": "North Carolina Real Estate Anki Deck — 60 Flashcards",
      "nj-real-estate-anki-deck": "New Jersey Real Estate Anki Deck — 60 Flashcards",
      "ny-real-estate-anki-deck": "NY Real Estate Anki Deck — 60 Flashcards",
      "oh-real-estate-anki-deck": "Ohio Real Estate Anki Deck — 60 Flashcards",
      "pa-real-estate-anki-deck": "Pennsylvania Real Estate Anki Deck — 60 Flashcards",
      "rd-exam-anki-deck": "RD Exam Anki Deck — 120 Flashcards",
      "real-estate-appraiser-anki-deck": "Real Estate Appraiser Anki Deck — 60 Flashcards",
      "tx-real-estate-anki-deck": "Texas Real Estate Anki Deck — 60 Flashcards",
      "va-real-estate-anki-deck": "Virginia Real Estate Anki Deck — 60 Flashcards",
      "wa-real-estate-anki-deck": "Washington Real Estate Anki Deck — 60 Flashcards",
      "us-adaptation-english-prep2go-app": "US Adaptation (English) — Prep2Go Immigration App",
      "uae-survival-guide-prep2go-app": "UAE Survival Guide — Prep2Go Immigration App",
      "saudi-arabia-survival-guide-prep2go-app":
        "Saudi Arabia Survival Guide — Prep2Go Immigration App",
      "singapore-survival-guide-prep2go-app": "Singapore Survival Guide — Prep2Go Immigration App",
      "south-africa-survival-guide-prep2go-app":
        "South Africa Survival Guide — Prep2Go Immigration App",
      "ashrae-certifications-anki-deck":
        "ASHRAE Certs Anki Deck — 250 Flashcards",
      "australia-survival-guide-prep2go-app": "Australia Survival Guide — Prep2Go Immigration App",
      "canada-survival-guide-prep2go-app": "Canada Survival Guide — Prep2Go Immigration App",
      "germany-survival-guide-prep2go-app": "Germany Survival Guide — Prep2Go Immigration App",
      "japan-survival-guide-prep2go-app": "Japan Survival Guide — Prep2Go Immigration App",
      "netherlands-survival-guide-prep2go-app":
        "Netherlands Survival Guide — Prep2Go Immigration App",
      "nebosh-anki-deck": "NEBOSH IGC Anki Deck — 250 Flashcards",
      "uk-survival-guide-prep2go-app": "UK Survival Guide — Prep2Go Immigration App",
      "portugal-survival-guide-prep2go-app": "Portugal Survival Guide — Prep2Go Immigration App",
      "leed-ap-bd-c-anki-deck": "LEED AP BD+C Anki Deck — 250 Flashcards",
      "leed-green-associate-anki-deck": "LEED GA Anki Deck — 250 Flashcards",
      "mrics-anki-deck": "MRICS / APC Anki Deck — 250 Flashcards",
      "mrics-quantity-surveying-anki-deck":
        "MRICS QS Anki Deck — 250 Flashcards",
      "leben-in-deutschland-anki-deck": "Leben in Deutschland Anki Deck — 296 Cards",
      "denmark-indfoedsretsproeven-anki-deck": "Denmark Indfødsretsprøven Anki Deck — 191 Cards",
      "ccse-espana-anki-deck": "CCSE España Anki Deck — 343 Cards",
      "naturalisation-francaise-anki-deck": "Naturalisation française Anki Deck — 200 Cards",
      "norway-statsborgerproven-anki-deck": "Norway Statsborgerprøven Anki Deck — 170 Cards",
      "einburgerung-schweiz-anki-deck": "Einbürgerung Schweiz Anki Deck — 207 Cards",
      "polish-citizenship-anki-deck": "Polish Citizenship Anki Deck — 170 Cards",
      "sweden-medborgarskapsprov-anki-deck": "Sweden Medborgarskapsprov Anki Deck — 170 Cards",
      "canadian-citizenship-anki-deck": "Canadian Citizenship Anki Deck — 200 Cards",
      "czech-citizenship-anki-deck": "Czech Citizenship Anki Deck — 169 Cards",
      "life-in-the-uk-anki-deck": "Life in the UK Anki Deck — 201 Cards",
      "belgium-wallonie-citoyennete-anki-deck": "Belgium Wallonie Citoyenneté Anki Deck — 165 Cards",
      "portugal-nacionalidade-anki-deck": "Portugal Nacionalidade Anki Deck — 173 Cards",
      "australian-citizenship-anki-deck": "Australian Citizenship Anki Deck — 200 Cards",
      "naturalisation-suisse-anki-deck": "Naturalisation suisse Anki Deck — 207 Cards",
      "naturalizzazione-svizzera-anki-deck": "Naturalizzazione svizzera Anki Deck — 207 Cards",
      "us-citizenship-anki-deck": "U.S. Citizenship Anki Deck — 128 Cards",
      "well-ap-anki-deck": "WELL AP Anki Deck — 250 Flashcards",
    };

    expect(Object.fromEntries(availableDecks.map((deck) => [deck.slug, deck.title]))).toEqual(
      expectedTitles,
    );
    expect(availableDecks.every((deck) => deck.title.includes(" — "))).toBe(true);
    expect(availableDecks.every((deck) => !deck.title.includes(":"))).toBe(true);
  });
});
