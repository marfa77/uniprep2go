import type { PlannedDeck } from "./decks";

type PlannedCivicsSpec = {
  slug: string;
  shortName: string;
  title: string;
  subtitle: string;
  audience: string;
  examLabel: string;
  mockSlug: string;
  topics: string[];
  searchNote: string;
};

function plannedCivicsDeck(spec: PlannedCivicsSpec): PlannedDeck {
  return {
    slug: spec.slug,
    category: "language",
    status: "planned",
    title: spec.title,
    shortName: spec.shortName,
    subtitle: spec.subtitle,
    directAnswer: `The ${spec.shortName} Anki Deck is a planned UniPrep2Go product. It is not yet available for purchase. Take the free ${spec.shortName} readiness check to benchmark weak topics, then request waitlist notification on this page.`,
    lastUpdated: "2026-07-26",
    audience: spec.audience,
    format: ".apkg",
    coverImage: `/covers/${spec.slug}.webp`,
    facts: {
      cards: "Planned",
      topics: spec.topics.join("; "),
      formulas: "Planned high-yield recall cards from the readiness-check bank",
      examYear: "Current naturalisation / citizenship cycles",
      delivery: "Not currently for sale — waitlist notify",
    },
    topicCoverage: spec.topics.map((name) => ({
      name,
      examWeight: "25%",
      cards: "Planned",
    })),
    sampleCards: [],
    faqs: [
      {
        question: "Is this deck available for purchase?",
        answer: "No. Use Notify me when Anki launches on this page.",
      },
      {
        question: `Is there a free ${spec.shortName} practice test?`,
        answer: `Yes. Take the 60-question readiness check (free 25-question version) at /mock-exams/${spec.mockSlug}.`,
      },
      {
        question: "Is this official government exam material?",
        answer: `No. Independent UniPrep2Go study aid — not affiliated with or endorsed by ${spec.examLabel}. ${spec.searchNote}`,
      },
    ],
  };
}

/**
 * Waitlist templates that the wave launcher flips to available.
 * Live $9.99 civic SKUs live in civic-sold-decks.ts — do not duplicate them here.
 */
export const citizenshipPlannedDecks: PlannedDeck[] = [
  plannedCivicsDeck({
    slug: "belgium-flanders-mo-anki-deck",
    shortName: "Belgium Flanders MO",
    title: "Belgium Flanders MO Anki Deck — Maatschappelijke Oriëntatie",
    subtitle: "Anki deck for Flanders maatschappelijke oriëntatie (165 Dutch civics cards).",
    audience: "Applicants preparing Flanders maatschappelijke oriëntatie / integration civics.",
    examLabel: "Flemish integration / citizenship authorities",
    mockSlug: "belgium-flanders-mo-readiness-check",
    topics: [
      "Institutions & orientation",
      "History, geography & EU",
      "Rights & nationality",
      "Society & daily life",
    ],
    searchNote: "Pair with official Flanders MO materials.",
  }),
  plannedCivicsDeck({
    slug: "luxembourg-vivre-ensemble-anki-deck",
    shortName: "Luxembourg Vivre ensemble",
    title: "Luxembourg Vivre ensemble Anki Deck — Citizenship Civics",
    subtitle:
      "Anki deck for Luxembourg Vivre ensemble civics — 239 French + 239 English cards in subdecks for the 3 official exam modules.",
    audience: "Applicants preparing Luxembourg Vivre ensemble / nationality civics.",
    examLabel: "Luxembourg nationality / Vivre ensemble authorities",
    mockSlug: "luxembourg-vivre-ensemble-readiness-check",
    topics: [
      "Institutions & vivre ensemble",
      "History, geography & EU",
      "Rights & nationality",
      "Society & daily life",
    ],
    searchNote: "Pair with official Vivre ensemble materials.",
  }),
  {
    slug: "finland-kansalaisuuskoe-anki-deck",
    category: "language",
    status: "planned",
    title: "Finland Kansalaisuuskoe Anki Deck — 120 Flashcards",
    shortName: "Finland Kansalaisuuskoe",
    subtitle:
      "120 Finnish civics flashcards for the 2027 kansalaisuuskoe — same bank as the free timed mock.",
    directAnswer:
      "UniPrep2Go is releasing a 120-card Finland kansalaisuuskoe Anki deck ({PRICE} through Gumroad) built from the same validated Finnish MCQ bank as the free readiness check at /mock-exams/finland-kansalaisuuskoe-readiness-check. Checkout opens when Gumroad publish completes; take the mock first for theme scores, then import the .apkg for spaced recall. Independent study aid — not Maahanmuuttovirasto material.",
    lastUpdated: "2026-11-07",
    audience:
      "Applicants preparing Finland’s 2027 citizenship knowledge test in Finnish who want spaced repetition after the free mock.",
    format: ".apkg",
    coverImage: "/covers/finland-kansalaisuuskoe-anki-deck.webp",
    facts: {
      cards: "120",
      topics: "Valtio ja demokratia; historia ja EU; oikeudet ja yhteiskunta; palvelut ja arki",
      formulas: "Finnish question → correct answer + teaching note",
      examYear: "Applications from 1 March 2027",
      delivery: "Digital .apkg through Gumroad (instant download after publish)",
    },
    topicCoverage: [
      { name: "Valtio ja demokratia", examWeight: "25%", cards: "30" },
      { name: "Historia, maantiede ja EU", examWeight: "25%", cards: "30" },
      { name: "Oikeudet ja yhteiskunta", examWeight: "25%", cards: "30" },
      { name: "Palvelut ja arki", examWeight: "25%", cards: "30" },
    ],
    sampleCards: [
      {
        question:
          "Eduskuntavaaleissa valitaan koko maasta kansanedustajat seuraavaksi vaalikaudeksi. Kuinka monta edustajaa eduskuntaan valitaan ja kuinka pitkäksi kaudeksi?",
        answer: "200 edustajaa neljäksi vuodeksi",
      },
      {
        question:
          "Suomi oli satoja vuosia osa toista valtakuntaa ennen vuotta 1809. Minkä valtakunnan osa Suomi silloin oli?",
        answer: "Ruotsin valtakunnan",
      },
      {
        question:
          "Vuokranantaja kertoo asuntonäytössä, ettei hän vuokraa asuntoa hakijalle tämän ulkomaalaisen nimen vuoksi. Miten tilannetta arvioidaan Suomen lain mukaan?",
        answer: "Kyse on kielletystä syrjinnästä alkuperän perusteella",
      },
    ],
    faqs: [
      {
        question: "Is this deck available for purchase?",
        answer:
          "The .apkg is built and Gumroad publish is in progress. Take the free mock now; this page’s checkout link activates when Gumroad goes live.",
      },
      {
        question: "Where is the free practice test?",
        answer:
          "Take the 60-question, 45-minute Finnish mock at /mock-exams/finland-kansalaisuuskoe-readiness-check. Each attempt draws from 120 unique questions across four themes and reports your weak themes.",
      },
      {
        question: "When does the official test apply?",
        answer:
          "Citizenship applications submitted from 1 March 2027 by applicants aged 18–64 require the kansalaisuuskoe unless an exemption applies (Finnish/Swedish matriculation, a Finnish- or Swedish-language degree completed in Finland, or very weighty reasons). Confirm on migri.fi.",
      },
    ],
  },
];
