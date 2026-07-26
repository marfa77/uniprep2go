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
  nicheReadinessConfig({
    slug: "swiss-citizenship-readiness-check",
    title: "Einbürgerung Schweiz Readiness Check",
    shortTitle: "Einbürgerung Schweiz",
    linkedDeckSlug: "swiss-citizenship-anki-deck",
    durationMinutes: 45,
    questionCount: NICHE_SESSION_QUESTIONS,
    passPercent: 70,
    topics: fourNicheTopics(
      [
        { id: "politics-democracy", label: "Politik, Institutionen & direkte Demokratie" },
        { id: "history-culture", label: "Geschichte, Kultur & Alltag" },
        { id: "geography-society", label: "Geographie & Sozialsystem" },
        { id: "naturalisation", label: "Einbürgerungsverfahren" },
      ],
      70,
    ),
    officialSourceNote:
      "Readiness check sampled from Prep2Go Einbürgerung Schweiz federal Staatskunde themes (SEM ordinary naturalisation, German). Canton and commune tests vary — this check covers federal civics only. Not official Swiss government material.",
    description:
      "A free 60-question German-language Swiss citizenship readiness diagnostic across politics and direct democracy, history and culture, geography and the social system, and the naturalisation process — pairs with the Swiss Citizenship Anki Bundle (DE / FR / IT). Independent prep — not SEM / cantonal exam material.",
    examBody: "Switzerland SEM — ordinary naturalisation (federal Staatskunde DE; canton/commune varies)",
    questionSourceNote:
      "Questions sourced from the Prep2Go Immigration app Einbürgerung Schweiz deck (Q&A converted to MCQ with distractors sampled from the same deck). Independent readiness check — not official Swiss government material.",
    lastUpdated: "2026-07-26",
    searchAliases: [
      "Swiss citizenship test",
      "Einbürgerung Schweiz",
      "Staatskunde Schweiz",
      "Swiss naturalisation practice German",
    ],
  }),
  nicheReadinessConfig({
    slug: "naturalisation-suisse-readiness-check",
    title: "Naturalisation Suisse Readiness Check",
    shortTitle: "Naturalisation Suisse",
    linkedDeckSlug: "swiss-citizenship-anki-deck",
    durationMinutes: 45,
    questionCount: NICHE_SESSION_QUESTIONS,
    passPercent: 70,
    topics: fourNicheTopics(
      [
        { id: "politics-democracy", label: "Politique, institutions & démocratie directe" },
        { id: "history-culture", label: "Histoire, culture & vie quotidienne" },
        { id: "geography-society", label: "Géographie & système social" },
        { id: "naturalisation", label: "Procédure de naturalisation" },
      ],
      70,
    ),
    officialSourceNote:
      "Readiness check sampled from Prep2Go Naturalisation Suisse federal civics themes (SEM ordinary naturalisation, French). Canton and commune tests vary — federal block only. Not official Swiss government material.",
    description:
      "A free 60-question French-language Swiss naturalisation readiness diagnostic — politics, history, geography, and the naturalisation process. Pairs with the Swiss Citizenship Anki Bundle (DE / FR / IT). Independent prep — not SEM material.",
    examBody: "Switzerland SEM — ordinary naturalisation (federal Staatskunde FR; canton/commune varies)",
    questionSourceNote:
      "Questions sourced from the Prep2Go Immigration app Naturalisation Suisse deck (Q&A converted to MCQ with distractors sampled from the same deck). Independent readiness check — not official Swiss government material.",
    lastUpdated: "2026-07-26",
    searchAliases: [
      "naturalisation suisse test",
      "examen naturalisation suisse",
      "Staatsbürgerschaft Schweiz français",
    ],
  }),
  nicheReadinessConfig({
    slug: "naturalizzazione-svizzera-readiness-check",
    title: "Naturalizzazione Svizzera Readiness Check",
    shortTitle: "Naturalizzazione Svizzera",
    linkedDeckSlug: "swiss-citizenship-anki-deck",
    durationMinutes: 45,
    questionCount: NICHE_SESSION_QUESTIONS,
    passPercent: 70,
    topics: fourNicheTopics(
      [
        { id: "politics-democracy", label: "Politica, istituzioni e democrazia diretta" },
        { id: "history-culture", label: "Storia, cultura e vita quotidiana" },
        { id: "geography-society", label: "Geografia e sistema sociale" },
        { id: "naturalisation", label: "Procedura di naturalizzazione" },
      ],
      70,
    ),
    officialSourceNote:
      "Readiness check sampled from Prep2Go Naturalizzazione Svizzera federal civics themes (SEM ordinary naturalisation, Italian). Canton and commune tests vary — federal block only. Not official Swiss government material.",
    description:
      "A free 60-question Italian-language Swiss naturalisation readiness diagnostic — politics, history, geography, and the naturalisation process. Pairs with the Swiss Citizenship Anki Bundle (DE / FR / IT). Independent prep — not SEM material.",
    examBody: "Switzerland SEM — ordinary naturalisation (federal Staatskunde IT; canton/commune varies)",
    questionSourceNote:
      "Questions sourced from the Prep2Go Immigration app Naturalizzazione Svizzera deck (Q&A converted to MCQ with distractors sampled from the same deck). Independent readiness check — not official Swiss government material.",
    lastUpdated: "2026-07-26",
    searchAliases: [
      "naturalizzazione svizzera test",
      "esame cittadinanza svizzera",
      "Staatsbürgerschaft Schweiz italiano",
    ],
  }),
  nicheReadinessConfig({
    slug: "czech-citizenship-readiness-check",
    title: "Czech Citizenship Readiness Check",
    shortTitle: "Czech Citizenship",
    linkedDeckSlug: "czech-citizenship-anki-deck",
    durationMinutes: 45,
    questionCount: NICHE_SESSION_QUESTIONS,
    passPercent: 70,
    topics: fourNicheTopics(
      [
        { id: "state-rights", label: "State, constitution & rights" },
        { id: "history-geo-eu", label: "History, geography & EU" },
        { id: "society-daily", label: "Society, culture & daily life" },
        { id: "services-extras", label: "Education, health & extras" },
      ],
      70,
    ),
    officialSourceNote:
      "Readiness check sampled from Prep2Go Czech Citizenship civics themes for Czech naturalisation / permanent residence knowledge. Not official Czech Interior Ministry material.",
    description:
      "A free 60-question Czech citizenship readiness diagnostic across state and rights, history and EU, society, and public services — pairs with the planned Czech Citizenship Anki deck (waitlist). Independent prep — not official government material.",
    examBody: "Czech Republic — citizenship / permanent residence civics knowledge",
    questionSourceNote:
      "Questions sourced from the Prep2Go Immigration app Czech Citizenship deck (Q&A converted to MCQ with distractors sampled from the same deck). Independent readiness check — not official Czech government material.",
    lastUpdated: "2026-07-26",
    searchAliases: [
      "Czech citizenship test",
      "občanství ČR test",
      "zkouška z českých reálií",
      "Czech naturalisation practice",
    ],
  }),
  nicheReadinessConfig({
    slug: "polish-citizenship-readiness-check",
    title: "Polish Citizenship Readiness Check",
    shortTitle: "Polish Citizenship",
    linkedDeckSlug: "polish-citizenship-anki-deck",
    durationMinutes: 45,
    questionCount: NICHE_SESSION_QUESTIONS,
    passPercent: 70,
    topics: fourNicheTopics(
      [
        { id: "state-rights", label: "State, constitution & rights" },
        { id: "history-geo-eu", label: "History, geography & EU" },
        { id: "society-daily", label: "Society, culture & daily life" },
        { id: "services-extras", label: "Education, health & extras" },
      ],
      70,
    ),
    officialSourceNote:
      "Readiness check sampled from Prep2Go Polish Citizenship civics themes for Polish naturalisation knowledge. Not official Polish government material.",
    description:
      "A free 60-question Polish citizenship readiness diagnostic across state and rights, history and EU, society, and public services — pairs with the planned Polish Citizenship Anki deck (waitlist). Independent prep — not official government material.",
    examBody: "Poland — citizenship / naturalisation civics knowledge",
    questionSourceNote:
      "Questions sourced from the Prep2Go Immigration app Polish Citizenship deck (Q&A converted to MCQ with distractors sampled from the same deck). Independent readiness check — not official Polish government material.",
    lastUpdated: "2026-07-26",
    searchAliases: [
      "Polish citizenship test",
      "obywatelstwo polskie test",
      "egzamin z wiedzy o Polsce",
      "Polish naturalisation practice",
    ],
  }),
  nicheReadinessConfig({
    slug: "denmark-indfoedsretsproeven-readiness-check",
    title: "Denmark Indfødsretsprøven Readiness Check",
    shortTitle: "Denmark Indfødsretsprøven",
    linkedDeckSlug: "denmark-indfoedsretsproeven-anki-deck",
    durationMinutes: 45,
    questionCount: NICHE_SESSION_QUESTIONS,
    passPercent: 70,
    topics: fourNicheTopics(
      [
        { id: "constitution-democracy", label: "Constitution & democracy" },
        { id: "history-society", label: "Society, culture & history" },
        { id: "welfare-daily", label: "Welfare & daily life" },
        { id: "geo-eu-extras", label: "Geography, EU & extras" },
      ],
      70,
    ),
    officialSourceNote:
      "Readiness check sampled from Prep2Go Denmark Indfødsretsprøven themes. Not official Danish government material.",
    description:
      "A free 60-question Danish citizenship (Indfødsretsprøven) readiness diagnostic — constitution, society, welfare, and geography/EU. Pairs with the planned Denmark Indfødsretsprøven Anki deck (waitlist). Independent prep.",
    examBody: "Denmark — Indfødsretsprøven (citizenship civics test)",
    questionSourceNote:
      "Questions sourced from the Prep2Go Immigration app Denmark Indfødsretsprøven deck (Q&A converted to MCQ with distractors sampled from the same deck).",
    lastUpdated: "2026-07-26",
    searchAliases: ["Indfødsretsprøven", "Danish citizenship test", "Denmark citizenship quiz"],
  }),
  nicheReadinessConfig({
    slug: "portugal-nacionalidade-readiness-check",
    title: "Portugal Nacionalidade Readiness Check",
    shortTitle: "Portugal Nacionalidade",
    linkedDeckSlug: "portugal-nacionalidade-anki-deck",
    durationMinutes: 45,
    questionCount: NICHE_SESSION_QUESTIONS,
    passPercent: 70,
    topics: fourNicheTopics(
      [
        { id: "state-rights", label: "State & rights" },
        { id: "nationality-civic", label: "Nationality & civic participation" },
        { id: "history-geo-eu", label: "History, geography & EU" },
        { id: "society-services", label: "Society & public services" },
      ],
      70,
    ),
    officialSourceNote:
      "Readiness check sampled from Prep2Go Portugal Nacionalidade civic knowledge themes. Not official IRN material.",
    description:
      "A free 60-question Portuguese nationality civic knowledge readiness diagnostic. Pairs with the planned Portugal Nacionalidade Anki deck (waitlist). Independent prep.",
    examBody: "Portugal — nationality civic knowledge",
    questionSourceNote:
      "Questions sourced from the Prep2Go Immigration app Portugal Nacionalidade deck (Q&A converted to MCQ with distractors sampled from the same deck).",
    lastUpdated: "2026-07-26",
    searchAliases: ["nacionalidade portuguesa", "conhecimento cívico nacionalidade", "Portugal citizenship test"],
  }),
  nicheReadinessConfig({
    slug: "norway-statsborgerproven-readiness-check",
    title: "Norway Statsborgerprøven Readiness Check",
    shortTitle: "Norway Statsborgerprøven",
    linkedDeckSlug: "norway-statsborgerproven-anki-deck",
    durationMinutes: 45,
    questionCount: NICHE_SESSION_QUESTIONS,
    passPercent: 70,
    topics: fourNicheTopics(
      [
        { id: "state-democracy", label: "State & democracy" },
        { id: "history-geo-eu", label: "History, geography & EEA" },
        { id: "rights-society", label: "Rights & society" },
        { id: "services-extras", label: "Services & extras" },
      ],
      70,
    ),
    officialSourceNote:
      "Readiness check sampled from Prep2Go Norway Statsborgerprøven themes. Not official UDI material.",
    description:
      "A free 60-question Norwegian citizenship (Statsborgerprøven) readiness diagnostic. Pairs with the planned Norway Statsborgerprøven Anki deck (waitlist). Independent prep.",
    examBody: "Norway — Statsborgerprøven",
    questionSourceNote:
      "Questions sourced from the Prep2Go Immigration app Norway Statsborgerprøven deck (Q&A converted to MCQ with distractors sampled from the same deck).",
    lastUpdated: "2026-07-26",
    searchAliases: ["Statsborgerprøven", "Norwegian citizenship test", "statsborgerskap quiz"],
  }),
  nicheReadinessConfig({
    slug: "sweden-medborgarskapsprov-readiness-check",
    title: "Sweden Medborgarskapsprov Readiness Check",
    shortTitle: "Sweden Medborgarskapsprov",
    linkedDeckSlug: "sweden-medborgarskapsprov-anki-deck",
    durationMinutes: 45,
    questionCount: NICHE_SESSION_QUESTIONS,
    passPercent: 70,
    topics: fourNicheTopics(
      [
        { id: "state-democracy", label: "State & democracy" },
        { id: "history-geo-eu", label: "History, geography & EU" },
        { id: "rights-society", label: "Rights & society" },
        { id: "services-extras", label: "Services & extras" },
      ],
      70,
    ),
    officialSourceNote:
      "Readiness check sampled from Prep2Go Sweden Medborgarskapsprov themes. Not official Swedish Migration Agency material.",
    description:
      "A free 60-question Swedish citizenship (Medborgarskapsprov) readiness diagnostic. Pairs with the planned Sweden Medborgarskapsprov Anki deck (waitlist). Independent prep.",
    examBody: "Sweden — Medborgarskapsprov",
    questionSourceNote:
      "Questions sourced from the Prep2Go Immigration app Sweden Medborgarskapsprov deck (Q&A converted to MCQ with distractors sampled from the same deck).",
    lastUpdated: "2026-07-26",
    searchAliases: ["Medborgarskapsprov", "Swedish citizenship test", "medborgarskap quiz"],
  }),
  nicheReadinessConfig({
    slug: "belgium-flanders-mo-readiness-check",
    title: "Belgium Flanders MO Readiness Check",
    shortTitle: "Belgium Flanders MO",
    linkedDeckSlug: "belgium-flanders-mo-anki-deck",
    durationMinutes: 45,
    questionCount: NICHE_SESSION_QUESTIONS,
    passPercent: 70,
    topics: fourNicheTopics(
      [
        { id: "institutions-orientation", label: "Institutions & orientation" },
        { id: "history-geo-eu", label: "History, geography & EU" },
        { id: "rights-nationality", label: "Rights & nationality" },
        { id: "society-daily", label: "Society & daily life" },
      ],
      70,
    ),
    officialSourceNote:
      "Readiness check sampled from Prep2Go Belgium Flanders MO (maatschappelijke oriëntatie) themes. Not official Flemish government material.",
    description:
      "A free 60-question Flanders maatschappelijke oriëntatie readiness diagnostic. Pairs with the planned Belgium Flanders MO Anki deck (waitlist). Independent prep.",
    examBody: "Belgium Flanders — Maatschappelijke oriëntatie",
    questionSourceNote:
      "Questions sourced from the Prep2Go Immigration app Belgium Flanders MO deck (Q&A converted to MCQ with distractors sampled from the same deck).",
    lastUpdated: "2026-07-26",
    searchAliases: ["maatschappelijke oriëntatie", "Flanders MO test", "inburgering Vlaanderen"],
  }),
  nicheReadinessConfig({
    slug: "belgium-wallonie-citoyennete-readiness-check",
    title: "Belgium Wallonie Citoyenneté Readiness Check",
    shortTitle: "Belgium Wallonie Citoyenneté",
    linkedDeckSlug: "belgium-wallonie-citoyennete-anki-deck",
    durationMinutes: 45,
    questionCount: NICHE_SESSION_QUESTIONS,
    passPercent: 70,
    topics: fourNicheTopics(
      [
        { id: "institutions-integration", label: "Institutions & integration" },
        { id: "history-geo-eu", label: "History, geography & EU" },
        { id: "rights-nationality", label: "Rights & nationality" },
        { id: "society-daily", label: "Society & daily life" },
      ],
      70,
    ),
    officialSourceNote:
      "Readiness check sampled from Prep2Go Belgium Wallonie Citoyenneté themes. Not official Walloon government material.",
    description:
      "A free 60-question Wallonia citoyenneté / parcours d'intégration readiness diagnostic. Pairs with the planned Belgium Wallonie Citoyenneté Anki deck (waitlist). Independent prep.",
    examBody: "Belgium Wallonia — Citoyenneté / parcours d'intégration",
    questionSourceNote:
      "Questions sourced from the Prep2Go Immigration app Belgium Wallonie Citoyenneté deck (Q&A converted to MCQ with distractors sampled from the same deck).",
    lastUpdated: "2026-07-26",
    searchAliases: ["citoyenneté Wallonie", "parcours d'intégration", "Belgium citizenship Wallonia"],
  }),
  nicheReadinessConfig({
    slug: "luxembourg-vivre-ensemble-readiness-check",
    title: "Luxembourg Vivre ensemble Readiness Check",
    shortTitle: "Luxembourg Vivre ensemble",
    linkedDeckSlug: "luxembourg-vivre-ensemble-anki-deck",
    durationMinutes: 45,
    questionCount: NICHE_SESSION_QUESTIONS,
    passPercent: 70,
    topics: fourNicheTopics(
      [
        { id: "institutions-vivre", label: "Institutions & vivre ensemble" },
        { id: "history-geo-eu", label: "History, geography & EU" },
        { id: "rights-nationality", label: "Rights & nationality" },
        { id: "society-daily", label: "Society & daily life" },
      ],
      70,
    ),
    officialSourceNote:
      "Readiness check sampled from Prep2Go Luxembourg Vivre ensemble themes. Not official Luxembourg government material.",
    description:
      "A free 60-question Luxembourg Vivre ensemble readiness diagnostic. Pairs with the planned Luxembourg Vivre ensemble Anki deck (waitlist). Independent prep.",
    examBody: "Luxembourg — Vivre ensemble / nationality civics",
    questionSourceNote:
      "Questions sourced from the Prep2Go Immigration app Luxembourg Vivre ensemble deck (Q&A converted to MCQ with distractors sampled from the same deck).",
    lastUpdated: "2026-07-26",
    searchAliases: ["Vivre ensemble Luxembourg", "Luxembourg citizenship test", "nationalité luxembourgeoise"],
  }),
];

export const citizenshipMockSlugs = citizenshipMockExamConfigs.map((c) => c.slug);
