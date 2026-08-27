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
        answer: `Yes. Take the free 60-question readiness check at /mock-exams/${spec.mockSlug}.`,
      },
      {
        question: "Is this official government exam material?",
        answer: `No. Independent UniPrep2Go study aid — not affiliated with or endorsed by ${spec.examLabel}. ${spec.searchNote}`,
      },
    ],
  };
}

/** Planned waitlist Anki decks for EU/Nordic civics mocks not yet on Gumroad. */
export const citizenshipPlannedDecks: PlannedDeck[] = [
  plannedCivicsDeck({
    slug: "denmark-indfoedsretsproeven-anki-deck",
    shortName: "Denmark Indfødsretsprøven",
    title: "Denmark Indfødsretsprøven Anki Deck — Citizenship Civics",
    subtitle: "Planned Anki deck for the Danish citizenship (indfødsret) civics test.",
    audience: "Applicants preparing the Danish Indfødsretsprøven citizenship civics test.",
    examLabel: "Danish immigration / citizenship authorities",
    mockSlug: "denmark-indfoedsretsproeven-readiness-check",
    topics: [
      "Constitution & democracy",
      "Society, culture & history",
      "Welfare & daily life",
      "Geography, EU & extras",
    ],
    searchNote: "Pair with official Indfødsretsprøven materials.",
  }),
  plannedCivicsDeck({
    slug: "portugal-nacionalidade-anki-deck",
    shortName: "Portugal Nacionalidade",
    title: "Portugal Nacionalidade Anki Deck — Civic Knowledge",
    subtitle: "Planned Anki deck for Portuguese nationality civic knowledge.",
    audience: "Applicants preparing Portuguese nationality civic knowledge requirements.",
    examLabel: "Portuguese nationality / IRN authorities",
    mockSlug: "portugal-nacionalidade-readiness-check",
    topics: [
      "State & rights",
      "Nationality & civic participation",
      "History, geography & EU",
      "Society & public services",
    ],
    searchNote: "Pair with official nationality guidance.",
  }),
  plannedCivicsDeck({
    slug: "norway-statsborgerproven-anki-deck",
    shortName: "Norway Statsborgerprøven",
    title: "Norway Statsborgerprøven Anki Deck — Citizenship Civics",
    subtitle: "Planned Anki deck for the Norwegian citizenship test (statsborgerprøven).",
    audience: "Applicants preparing the Norwegian Statsborgerprøven.",
    examLabel: "UDI / Norwegian citizenship authorities",
    mockSlug: "norway-statsborgerproven-readiness-check",
    topics: [
      "State & democracy",
      "History, geography & EEA",
      "Rights & society",
      "Services & extras",
    ],
    searchNote: "Pair with official Statsborgerprøven materials.",
  }),
  plannedCivicsDeck({
    slug: "sweden-medborgarskapsprov-anki-deck",
    shortName: "Sweden Medborgarskapsprov",
    title: "Sweden Medborgarskapsprov Anki Deck — Citizenship Civics",
    subtitle: "Planned Anki deck for the Swedish citizenship test (medborgarskapsprov).",
    audience: "Applicants preparing the Swedish Medborgarskapsprov.",
    examLabel: "Swedish Migration Agency / citizenship authorities",
    mockSlug: "sweden-medborgarskapsprov-readiness-check",
    topics: [
      "State & democracy",
      "History, geography & EU",
      "Rights & society",
      "Services & extras",
    ],
    searchNote: "Pair with official Medborgarskapsprov materials.",
  }),
  plannedCivicsDeck({
    slug: "belgium-flanders-mo-anki-deck",
    shortName: "Belgium Flanders MO",
    title: "Belgium Flanders MO Anki Deck — Maatschappelijke Oriëntatie",
    subtitle: "Anki deck for Flanders maatschappelijke oriëntatie (120 Dutch MCQ cards).",
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
    slug: "belgium-wallonie-citoyennete-anki-deck",
    shortName: "Belgium Wallonie Citoyenneté",
    title: "Belgium Wallonie Citoyenneté Anki Deck — Integration Civics",
    subtitle: "Planned Anki deck for Wallonia citizenship / integration parcours.",
    audience: "Applicants preparing Wallonia citoyenneté / parcours d'intégration civics.",
    examLabel: "Walloon integration / citizenship authorities",
    mockSlug: "belgium-wallonie-citoyennete-readiness-check",
    topics: [
      "Institutions & integration",
      "History, geography & EU",
      "Rights & nationality",
      "Society & daily life",
    ],
    searchNote: "Pair with official Wallonia citoyenneté materials.",
  }),
  plannedCivicsDeck({
    slug: "luxembourg-vivre-ensemble-anki-deck",
    shortName: "Luxembourg Vivre ensemble",
    title: "Luxembourg Vivre ensemble Anki Deck — Citizenship Civics",
    subtitle: "Planned Anki deck for Luxembourg 'Vivre ensemble' citizenship course themes.",
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
    title: "Finland Kansalaisuuskoe — Mock-only prep",
    shortName: "Finland Kansalaisuuskoe",
    subtitle: "No Anki deck for sale — use the free Finnish-language readiness check.",
    directAnswer:
      "UniPrep2Go does not sell a Finland kansalaisuuskoe Anki deck. Take the free 60-question Finnish mock at /mock-exams/finland-kansalaisuuskoe-readiness-check and study Migri learning materials when the University of Helsinki package publishes on migri.fi.",
    lastUpdated: "2026-08-27",
    audience: "Applicants preparing Finland’s 2027 citizenship knowledge test.",
    format: ".apkg",
    coverImage: "/covers/finland-kansalaisuuskoe-anki-deck.webp",
    facts: {
      cards: "Not offered",
      topics: "Valtio ja demokratia; historia ja EU; oikeudet; palvelut",
      formulas: "Use the free mock + official Migri materials",
      examYear: "Applications from 1 March 2027",
      delivery: "No Anki deck — mock-only pathway",
    },
    topicCoverage: [
      { name: "Valtio ja demokratia", examWeight: "25%", cards: "Mock" },
      { name: "Historia, maantiede ja EU", examWeight: "25%", cards: "Mock" },
      { name: "Oikeudet ja yhteiskunta", examWeight: "25%", cards: "Mock" },
      { name: "Palvelut ja arki", examWeight: "25%", cards: "Mock" },
    ],
    sampleCards: [],
    faqs: [
      {
        question: "Is there a Finland kansalaisuuskoe Anki deck?",
        answer:
          "No. UniPrep2Go offers a free Finnish-language readiness check only. Study Migri’s official learning materials when published.",
      },
      {
        question: "Where is the free practice test?",
        answer: "Take the 60-question mock at /mock-exams/finland-kansalaisuuskoe-readiness-check.",
      },
      {
        question: "When does the official test apply?",
        answer:
          "Citizenship applications submitted from 1 March 2027 require the kansalaisuuskoe unless an exemption applies. Confirm on migri.fi.",
      },
    ],
  },
];
