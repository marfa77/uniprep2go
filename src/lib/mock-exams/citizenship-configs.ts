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
      "Independent readiness check on BAMF Einbürgerungstest / Leben in Deutschland themes. Official exam: 33 questions / 60 minutes / 17 correct for citizenship (15 for some PR/integration paths). This diagnostic is 60 questions / 60 minutes / 55%. Not official BAMF material.",
    description:
      "Free 60-question Leben in Deutschland / Einbürgerungstest diagnostic (60 min, 55% pass) — longer than the official 33/60/17 BAMF paper. Pairs with the Citizenship & Naturalization Anki Bundle. Independent prep.",
    examBody:
      "BAMF — Einbürgerungstest / Leben in Deutschland (33Q official; this page is a longer diagnostic)",
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
      "Independent readiness check for the French Examen civique (live from 1 Jan 2026: 40 MCQs / 45 min / 32/40). This diagnostic is 60 questions / 60 minutes / 70%. B2 language is separate. Not préfecture or official civic-exam material.",
    description:
      "Free 60-question French naturalisation civics diagnostic for the 2026 Examen civique themes — institutions, history, values, rights. Official civic exam is 40Q/45min/80%; B2 language is separate. Pairs with the Citizenship Anki Bundle.",
    examBody:
      "France — Examen civique (naturalisation; B2 language separate)",
    questionSourceNote: NOTE,
    lastUpdated: "2026-07-26",
    searchAliases: [
      "naturalisation française",
      "examen civique naturalisation",
      "French citizenship test",
      "examen civique 2026",
    ],
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
      "Independent readiness check on Life in the UK handbook themes. Official Home Office test: 24 questions / 45 minutes / 18/24 (75%), £50. This diagnostic is 60 questions / 45 minutes / 75%. Not official Home Office material.",
    description:
      "Free 60-question Life in the UK diagnostic (45 min, 75%) — longer than the official 24-question Home Office test. Pairs with the Citizenship & Naturalization Anki Bundle. Independent prep.",
    examBody:
      "UK Home Office — Life in the UK Test (24Q official; this page is a longer diagnostic)",
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
      "Independent readiness check on Discover Canada themes. Official IRCC test: 20 questions / 30 minutes / 15/20 (75%). This diagnostic is 60 questions / 45 minutes / 75%. Not official IRCC material.",
    description:
      "Free 60-question Canadian citizenship diagnostic — longer than the official 20-question IRCC test. Pairs with the Citizenship & Naturalization Anki Bundle. Independent prep.",
    examBody:
      "IRCC — Discover Canada citizenship test (20Q official; this page is a longer diagnostic)",
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
      "Independent readiness check on Our Common Bond themes. Official test: 20 MCQs / 45 minutes / 75% plus all 5 values questions correct. This diagnostic is 60 questions / 45 minutes / 75% and does not enforce the values dual-gate. Not Home Affairs material.",
    description:
      "Free 60-question Australian citizenship diagnostic. Official exam is 20Q/45min with a values dual-gate — this page is longer theme practice without that gate. Pairs with the Citizenship Anki Bundle.",
    examBody:
      "Australia Home Affairs — citizenship test (20Q + values gate; this page is a longer diagnostic)",
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
      "Independent readiness check on CCSE themes. Official Instituto Cervantes CCSE: 25 items / 45 minutes / 15/25 (60%) from a published ~300-item bank. This diagnostic is 60 questions / 45 minutes / 60%. DELE A2 language is a separate exam. Not Cervantes material.",
    description:
      "Free 60-question CCSE diagnostic for Spanish nationality civics — longer than the official 25-question Cervantes exam. DELE A2 is separate. Pairs with the DELE + CCSE Anki bundle.",
    examBody:
      "Instituto Cervantes — CCSE (25Q official; DELE A2 separate)",
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
      "Switzerland has no single federal citizenship MCQ — canton/commune tests vary. This is an independent German-language diagnostic of federal Staatskunde themes only (60Q / 45 min / 70%). Not SEM or cantonal exam material.",
    description:
      "Free 60-question German federal Staatskunde diagnostic for Swiss ordinary naturalisation. Canton/commune knowledge tests differ — this page covers federal themes only. Pairs with the Swiss Citizenship Anki Bundle.",
    examBody:
      "Switzerland — federal Staatskunde DE (no federal MCQ; canton/commune varies)",
    questionSourceNote:
      "Questions sourced from the Prep2Go Immigration app Einbürgerung Schweiz deck (Q&A converted to MCQ with related/near-miss distractors). Independent readiness check — not official Swiss government material.",
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
      "No single federal French citizenship MCQ — canton/commune tests vary. Independent French diagnostic of federal civics themes only (60Q / 45 min / 70%). Not SEM material.",
    description:
      "Free 60-question French federal civics diagnostic for Swiss ordinary naturalisation. Canton/commune tests differ. Pairs with the Swiss Citizenship Anki Bundle.",
    examBody:
      "Switzerland — federal Staatskunde FR (no federal MCQ; canton/commune varies)",
    questionSourceNote:
      "Questions sourced from the Prep2Go Immigration app Naturalisation Suisse deck (Q&A converted to MCQ with related/near-miss distractors). Independent readiness check — not official Swiss government material.",
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
      "No single federal Italian citizenship MCQ — canton/commune tests vary. Independent Italian diagnostic of federal civics themes only (60Q / 45 min / 70%). Not SEM material.",
    description:
      "Free 60-question Italian federal civics diagnostic for Swiss ordinary naturalisation. Canton/commune tests differ. Pairs with the Swiss Citizenship Anki Bundle.",
    examBody:
      "Switzerland — federal Staatskunde IT (no federal MCQ; canton/commune varies)",
    questionSourceNote:
      "Questions sourced from the Prep2Go Immigration app Naturalizzazione Svizzera deck (Q&A converted to MCQ with related/near-miss distractors). Independent readiness check — not official Swiss government material.",
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
      "Independent readiness check on Czech citizenship / reálie themes — not official MV ČR or NPI material. Official zkouška z reálií is 30 questions / 30 minutes / 60% from the NPI pool; this diagnostic is 60 questions / 45 minutes / 70%. Permanent residence usually needs language (often A2), not reálie.",
    description:
      "Free 60-question Czech reálie readiness diagnostic (45 min, 70% pass) for citizenship civics themes — longer than the official 30/30/60% exam. Pairs with the planned Czech Citizenship Anki waitlist. Independent prep — not Interior Ministry / NPI material.",
    examBody: "Czech Republic — zkouška z českých reálií (citizenship); not the permanent-residence language exam",
    questionSourceNote:
      "Questions rewritten from Prep2Go Czech Citizenship civics themes as full-stem MCQs with parallel-form near-miss distractors. Independent diagnostic — not the official NPI 300-item booklet.",
    lastUpdated: "2026-08-12",
    searchAliases: [
      "Czech citizenship test",
      "občanství ČR test",
      "zkouška z českých reálií",
      "zkouska z realii",
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
      "Poland has no official citizenship civics exam in force today — this is an independent readiness check on proposed / future “wiedza o Polsce” themes. Not MSWiA, UDSC, or NAWA material. Live naturalisation exam hurdle is usually PaF B1 language.",
    description:
      "Free 60-question Polish-language civics diagnostic for a proposed knowledge-of-Poland / test obywatelski path — not an official exam (none is required for citizenship today). Pairs with the planned Polish Citizenship Anki waitlist. Independent prep.",
    examBody: "Poland — proposed citizenship civics (no official test yet); language via PaF B1",
    questionSourceNote:
      "Questions rewritten from Prep2Go Polish Citizenship civics themes as full-stem MCQs with parallel-form near-miss distractors. Independent future-proofing diagnostic — not an official Polish government citizenship test.",
    lastUpdated: "2026-08-12",
    searchAliases: [
      "Polish citizenship test",
      "obywatelstwo polskie test",
      "wiedza o Polsce",
      "test obywatelski",
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
      "Independent readiness check on Indfødsretsprøven themes. Official exam: 45 MCQs / 45 minutes / 36/45 plus ≥4/5 values questions (~946 DKK). This diagnostic is 60 questions / 45 minutes / 70% without the values dual-gate. Not official Danish government material.",
    description:
      "Free 60-question Danish Indfødsretsprøven diagnostic. Official test is 45Q/45min with an 80% + values dual-gate — this page is longer theme practice. Waitlist Anki. Independent prep.",
    examBody:
      "Denmark — Indfødsretsprøven (45Q official + values gate; this page is a longer diagnostic)",
    questionSourceNote:
      "Questions rewritten from Prep2Go Denmark Indfødsretsprøven themes as full-stem MCQs with parallel-form near-miss distractors. Independent readiness check — not official Danish government material.",
    lastUpdated: "2026-08-04",
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
      "Portugal’s 2026 nationality law mandates a civic knowledge test, but official Q/time/pass were not yet published when this bank shipped — treat format as pending regulation. This is an independent 60Q / 45 min / 70% theme diagnostic on the five legal themes. Not official IRN material.",
    description:
      "Free 60-question Portuguese nationality civic diagnostic on history, culture, institutions, rights, and society. Official exam format still pending implementing rules — independent prep, not IRN.",
    examBody:
      "Portugal — nationality civic knowledge (format pending regulation; independent diagnostic)",
    questionSourceNote:
      "Questions rewritten from Prep2Go Portugal Nacionalidade civics themes as full-stem MCQs with parallel-form near-miss distractors. Independent readiness check — not official IRN / AIMA material.",
    lastUpdated: "2026-08-04",
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
      "Independent readiness check on Statsborgerprøven / samfunnskunnskap themes. Official HK-dir exam: 36 questions (32 scored) / 60 minutes / 24/32 (75%), Norwegian only. This diagnostic is 60 questions / 45 minutes / 70%. Not UDI/HK-dir material.",
    description:
      "Free 60-question Norwegian Statsborgerprøven diagnostic — longer/shorter-time than the official 36Q/60min/75% HK-dir exam. Waitlist Anki. Independent prep.",
    examBody:
      "Norway — Statsborgerprøven (HK-dir; 36Q official; this page is a longer diagnostic)",
    questionSourceNote:
      "Questions rewritten from Prep2Go Norway Statsborgerprøven civics themes as full-stem MCQs with parallel-form near-miss distractors. Independent readiness check — not official UDI material.",
    lastUpdated: "2026-08-04",
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
      "Sweden’s Medborgarskapsprov society-knowledge test is new/rolling out (from Aug 2026); exact Q/time/pass/cost were unpublished at bank ship time. This is an independent 60Q / 45 min / 70% Samhällskunskap theme diagnostic — not official UHR/Migrationsverket material.",
    description:
      "Free 60-question Swedish citizenship society-knowledge diagnostic for the new Medborgarskapsprov path. Official format may still be settling — independent theme practice + waitlist Anki.",
    examBody:
      "Sweden — Medborgarskapsprov (new society test; official format confirm on UHR)",
    questionSourceNote:
      "Questions rewritten from Prep2Go Sweden Medborgarskapsprov themes as full-stem MCQs with parallel-form near-miss distractors. Independent readiness check — not official Swedish Migration Agency material.",
    lastUpdated: "2026-08-04",
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
      "Flanders has no single federal civics MCQ like BAMF/LITUK. Live path is typically Dutch language + Maatschappelijke Oriëntatie (MO) / integration proof. A national civic test has been proposed, not assumed live. This 60Q check is independent MO-theme practice — not AGII material.",
    description:
      "Free 60-question Flanders MO / social-orientation diagnostic. Not an official national citizenship MCQ (Belgium’s civic test is proposed). Waitlist Anki. Independent prep.",
    examBody:
      "Belgium Flanders — Maatschappelijke oriëntatie (no single federal MCQ; proposed national test separate)",
    questionSourceNote:
      "Questions rewritten from Prep2Go Belgium Flanders MO (maatschappelijke oriëntatie) themes as full-stem MCQs with parallel-form near-miss distractors. Independent readiness check — not official Flemish government material.",
    lastUpdated: "2026-08-04",
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
      "Wallonia has no standardised citizenship civics QCM today — live hurdles are usually French A2 + social integration proof. A federal civic test is proposed, not assumed live. This 60Q check is independent theme practice — not official Walloon/CRI material.",
    description:
      "Free 60-question Wallonie citoyenneté theme diagnostic. Official Wallonia path is language + integration, not a published civics MCQ bank. Waitlist Anki. Independent prep.",
    examBody:
      "Belgium Wallonia — citoyenneté / parcours (no official QCM bank; proposed federal test separate)",
    questionSourceNote:
      "Questions rewritten from Prep2Go Belgium Wallonie Citoyenneté themes as full-stem MCQs with parallel-form near-miss distractors. Independent readiness check — not official Walloon government material.",
    lastUpdated: "2026-08-04",
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
      "Independent readiness check on Vivre ensemble themes. Official SFA exam path: 40 MCQs / 60 minutes / 28/40 (70%), or a 24h course alternative. This diagnostic is 60 questions / 45 minutes / 70% sampled from a 120-card bank. Luxembourgish Sproochentest is separate. Not official SFA material.",
    description:
      "Free 60-question Luxembourg Vivre ensemble diagnostic. Official exam is 40Q/60min/70% (or course path) — this page is longer theme practice. Pairs with the 120-card Anki deck. Independent prep.",
    examBody:
      "Luxembourg — Vivre ensemble (40Q official or course; Sproochentest separate)",
    questionSourceNote:
      "Questions rewritten from Prep2Go Luxembourg Vivre ensemble themes as full-stem MCQs with parallel-form near-miss distractors. Independent readiness check — not official Luxembourg government material.",
    lastUpdated: "2026-08-04",
    searchAliases: ["Vivre ensemble Luxembourg", "Luxembourg citizenship test", "nationalité luxembourgeoise"],
  }),
];

export const citizenshipMockSlugs = citizenshipMockExamConfigs.map((c) => c.slug);
