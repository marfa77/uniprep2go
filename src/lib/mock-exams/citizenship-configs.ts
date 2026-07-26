import {
  NICHE_SESSION_QUESTIONS,
  fourNicheTopics,
  nicheReadinessConfig,
} from "./niche-readiness";
import type { MockExamConfig } from "./types";

const NOTE =
  "Questions sourced from the Prep2Go Immigration app Naturalization decks (Q&A converted to MCQ with distractors sampled from the same deck). Independent readiness check — not official government exam material.";

/** Five new citizenship civics mocks (US stays in configs.ts). */
export const citizenshipMockExamConfigs: MockExamConfig[] = [
  nicheReadinessConfig({
    slug: "leben-in-deutschland-readiness-check",
    title: "Leben in Deutschland Readiness Check",
    shortTitle: "Leben in Deutschland",
    linkedDeckSlug: "leben-in-deutschland-prep2go-app",
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
      "A free 60-question Leben in Deutschland readiness diagnostic across constitution, history, society, and federal life — pairs with the Prep2Go Immigration app. Independent prep — not BAMF material.",
    examBody: "BAMF / German naturalization (Einbürgerungstest)",
    questionSourceNote: NOTE,
    lastUpdated: "2026-07-26",
    searchAliases: ["Einbürgerungstest", "LiD", "German citizenship test", "Leben in Deutschland"],
  }),
  nicheReadinessConfig({
    slug: "naturalisation-francaise-readiness-check",
    title: "Naturalisation française Readiness Check",
    shortTitle: "Naturalisation française",
    linkedDeckSlug: "naturalisation-francaise-prep2go-app",
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
      "A free 60-question French naturalization civics readiness diagnostic — institutions, history, values, and rights. Pairs with the Prep2Go Immigration app. Independent prep — not official French government material.",
    examBody: "French naturalization civics interview",
    questionSourceNote: NOTE,
    lastUpdated: "2026-07-26",
    searchAliases: ["naturalisation française", "entretien naturalisation", "French citizenship test"],
  }),
  nicheReadinessConfig({
    slug: "life-in-the-uk-readiness-check",
    title: "Life in the UK Readiness Check",
    shortTitle: "Life in the UK",
    linkedDeckSlug: "life-in-the-uk-prep2go-app",
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
      "A free 60-question Life in the UK readiness diagnostic across British values, history, government, and everyday life — pairs with the Prep2Go Immigration app. Independent prep — not Home Office material.",
    examBody: "UK Home Office — Life in the UK Test",
    questionSourceNote: NOTE,
    lastUpdated: "2026-07-26",
    searchAliases: ["Life in the UK test", "LITUK", "British citizenship test"],
  }),
  nicheReadinessConfig({
    slug: "canadian-citizenship-readiness-check",
    title: "Canadian Citizenship Readiness Check",
    shortTitle: "Canadian Citizenship",
    linkedDeckSlug: "canadian-citizenship-prep2go-app",
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
      "A free 60-question Canadian citizenship readiness diagnostic across history, government, rights, and symbols — pairs with the Prep2Go Immigration app. Independent prep — not IRCC material.",
    examBody: "IRCC — Discover Canada citizenship test",
    questionSourceNote: NOTE,
    lastUpdated: "2026-07-26",
    searchAliases: ["Canadian citizenship test", "Discover Canada", "IRCC citizenship"],
  }),
  nicheReadinessConfig({
    slug: "australian-citizenship-readiness-check",
    title: "Australian Citizenship Readiness Check",
    shortTitle: "Australian Citizenship",
    linkedDeckSlug: "australian-citizenship-prep2go-app",
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
      "A free 60-question Australian citizenship readiness diagnostic across values, history, government, and Australian life — pairs with the Prep2Go Immigration app. Independent prep — not official Home Affairs material.",
    examBody: "Australian Department of Home Affairs — citizenship test",
    questionSourceNote: NOTE,
    lastUpdated: "2026-07-26",
    searchAliases: ["Australian citizenship test", "Aussie citizenship practice"],
  }),
];

export const citizenshipMockSlugs = citizenshipMockExamConfigs.map((c) => c.slug);
