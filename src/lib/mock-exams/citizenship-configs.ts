import {
  NICHE_SESSION_QUESTIONS,
  fourNicheTopics,
  nicheReadinessConfig,
} from "./niche-readiness";
import type { MockExamConfig } from "./types";

const BUNDLE = "citizenship-naturalization-anki-bundle";

const NOTE =
  "Questions sourced from the Prep2Go Naturalization banks (same civics Q&A as the Citizenship & Naturalization Anki Bundle). Independent readiness check — not official government exam material.";

/** Five new citizenship civics mocks (US stays in configs.ts). All funnel to the Anki bundle. */
export const citizenshipMockExamConfigs: MockExamConfig[] = [
  nicheReadinessConfig({
    slug: "leben-in-deutschland-readiness-check",
    title: "Leben in Deutschland Readiness Check",
    shortTitle: "Leben in Deutschland",
    linkedDeckSlug: BUNDLE,
    durationMinutes: 60,
    questionCount: NICHE_SESSION_QUESTIONS,
    passPercent: 55,
    topics: fourNicheTopics(
      [
        { id: "politics-rights", label: "Politics, constitution & rights" },
        { id: "history", label: "German history" },
        { id: "society-law", label: "Society, religion & law" },
        { id: "federal-states", label: "Federal states & everyday life" },
      ],
      55,
    ),
    officialSourceNote:
      "Readiness check sampled from Prep2Go Leben in Deutschland (Einbürgerungstest) themes. Official BAMF test is 33 questions with 17 correct to pass. Not official BAMF material.",
    description:
      "A free 60-question Leben in Deutschland readiness diagnostic across constitution, history, society, and federal life — pairs with the Citizenship & Naturalization Anki Bundle. Independent prep — not BAMF material.",
    examBody: "BAMF / German naturalization (Einbürgerungstest)",
    questionSourceNote: NOTE,
    lastUpdated: "2026-07-26",
    searchAliases: ["Einbürgerungstest", "LiD", "German citizenship test", "Leben in Deutschland"],
  }),
  nicheReadinessConfig({
    slug: "naturalisation-francaise-readiness-check",
    title: "Naturalisation française Readiness Check",
    shortTitle: "Naturalisation française",
    linkedDeckSlug: BUNDLE,
    durationMinutes: 60,
    questionCount: NICHE_SESSION_QUESTIONS,
    passPercent: 70,
    topics: fourNicheTopics([
      { id: "institutions", label: "Institutions & Republic" },
      { id: "history", label: "French history" },
      { id: "values-symbols", label: "Values & symbols" },
      { id: "rights-duties", label: "Rights, duties & civic life" },
    ]),
    officialSourceNote:
      "Readiness check sampled from Prep2Go Naturalisation française civics themes. Not an official prefecture interview.",
    description:
      "A free 60-question French naturalization civics readiness diagnostic — institutions, history, values, and rights. Pairs with the Citizenship & Naturalization Anki Bundle. Independent prep — not official French government material.",
    examBody: "French naturalization civics interview",
    questionSourceNote: NOTE,
    lastUpdated: "2026-07-26",
    searchAliases: ["naturalisation française", "entretien naturalisation", "French citizenship test"],
  }),
  nicheReadinessConfig({
    slug: "life-in-the-uk-readiness-check",
    title: "Life in the UK Readiness Check",
    shortTitle: "Life in the UK",
    linkedDeckSlug: BUNDLE,
    durationMinutes: 45,
    questionCount: NICHE_SESSION_QUESTIONS,
    passPercent: 75,
    topics: fourNicheTopics(
      [
        { id: "values", label: "British values" },
        { id: "history", label: "UK history" },
        { id: "government", label: "Government & law" },
        { id: "everyday", label: "Everyday life & society" },
      ],
      75,
    ),
    officialSourceNote:
      "Readiness check sampled from Prep2Go Life in the UK themes. Official Home Office pass mark is 75%. Not official Home Office material.",
    description:
      "A free 60-question Life in the UK readiness diagnostic across British values, history, government, and everyday life — pairs with the Citizenship & Naturalization Anki Bundle. Independent prep — not Home Office material.",
    examBody: "UK Home Office — Life in the UK Test",
    questionSourceNote: NOTE,
    lastUpdated: "2026-07-26",
    searchAliases: ["Life in the UK test", "LITUK", "British citizenship test"],
  }),
  nicheReadinessConfig({
    slug: "canadian-citizenship-readiness-check",
    title: "Canadian Citizenship Readiness Check",
    shortTitle: "Canadian Citizenship",
    linkedDeckSlug: BUNDLE,
    durationMinutes: 45,
    questionCount: NICHE_SESSION_QUESTIONS,
    passPercent: 75,
    topics: fourNicheTopics(
      [
        { id: "history", label: "Canadian history" },
        { id: "government", label: "Government & politics" },
        { id: "rights", label: "Rights & responsibilities" },
        { id: "symbols-geography", label: "Symbols, regions & geography" },
      ],
      75,
    ),
    officialSourceNote:
      "Readiness check sampled from Prep2Go Canadian Citizenship / Discover Canada themes. Not official IRCC material.",
    description:
      "A free 60-question Canadian citizenship readiness diagnostic across history, government, rights, and symbols — pairs with the Citizenship & Naturalization Anki Bundle. Independent prep — not IRCC material.",
    examBody: "IRCC — Discover Canada citizenship test",
    questionSourceNote: NOTE,
    lastUpdated: "2026-07-26",
    searchAliases: ["Canadian citizenship test", "Discover Canada", "IRCC citizenship"],
  }),
  nicheReadinessConfig({
    slug: "australian-citizenship-readiness-check",
    title: "Australian Citizenship Readiness Check",
    shortTitle: "Australian Citizenship",
    linkedDeckSlug: BUNDLE,
    durationMinutes: 45,
    questionCount: NICHE_SESSION_QUESTIONS,
    passPercent: 75,
    topics: fourNicheTopics(
      [
        { id: "values", label: "Australian values" },
        { id: "history", label: "Australian history" },
        { id: "government", label: "Government & democracy" },
        { id: "australia", label: "Australia & Australians" },
      ],
      75,
    ),
    officialSourceNote:
      "Readiness check sampled from Prep2Go Australian Citizenship themes. Not official Department of Home Affairs material.",
    description:
      "A free 60-question Australian citizenship readiness diagnostic across values, history, government, and Australian life — pairs with the Citizenship & Naturalization Anki Bundle. Independent prep — not official Home Affairs material.",
    examBody: "Australian Department of Home Affairs — citizenship test",
    questionSourceNote: NOTE,
    lastUpdated: "2026-07-26",
    searchAliases: ["Australian citizenship test", "Aussie citizenship practice"],
  }),
  nicheReadinessConfig({
    slug: "ccse-espana-readiness-check",
    title: "CCSE (España) Readiness Check",
    shortTitle: "CCSE España",
    linkedDeckSlug: "dele-a2-ccse-spanish-citizenship-bundle",
    durationMinutes: 45,
    questionCount: NICHE_SESSION_QUESTIONS,
    passPercent: 60,
    topics: fourNicheTopics(
      [
        { id: "constitution", label: "Government & constitution" },
        { id: "institutions-rights", label: "Institutions, elections & rights" },
        { id: "geography-culture", label: "Geography, history & culture" },
        { id: "everyday-life", label: "Everyday life & procedures" },
      ],
      60,
    ),
    officialSourceNote:
      "Readiness check sampled from Prep2Go CCSE (España) civics themes (Instituto Cervantes constitutional and sociocultural knowledge test). Official CCSE is 25 questions; pass mark is typically 15/25. Not official Instituto Cervantes material.",
    description:
      "A free 60-question CCSE (España) readiness diagnostic across constitution, institutions, culture/geography, and everyday life — pairs with the DELE + CCSE Spanish nationality Anki bundle. Independent prep — not Instituto Cervantes material.",
    examBody: "Instituto Cervantes — CCSE (conocimientos constitucionales y socioculturales de España)",
    questionSourceNote:
      "Questions sourced from the Prep2Go Immigration app CCSE (España) deck (Q&A converted to MCQ with distractors sampled from the same deck). Independent readiness check — not official Instituto Cervantes material.",
    lastUpdated: "2026-07-26",
    searchAliases: [
      "CCSE",
      "CCSE España",
      "prueba CCSE",
      "nacionalidad española test",
      "Instituto Cervantes citizenship test",
    ],
  }),
];

export const citizenshipMockSlugs = citizenshipMockExamConfigs.map((c) => c.slug);
