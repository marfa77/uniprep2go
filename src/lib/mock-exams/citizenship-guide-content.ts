export const CITIZENSHIP_GUIDE_PILOT_SLUGS = [
  "life-in-the-uk-readiness-check",
  "leben-in-deutschland-readiness-check",
  "finland-kansalaisuuskoe-readiness-check",
] as const;

export type CitizenshipGuidePilotSlug = (typeof CITIZENSHIP_GUIDE_PILOT_SLUGS)[number];

export type CitizenshipGuideComparisonRow = {
  label: string;
  official: string;
  diagnostic: string;
};

export type CitizenshipGuideFailTrap = {
  title: string;
  detail: string;
};

export type CitizenshipGuideDeckCta = "live" | "hidden";

export type CitizenshipGuideContent = {
  slug: CitizenshipGuidePilotSlug;
  examLabel: string;
  comparisonNote: string;
  rows: CitizenshipGuideComparisonRow[];
  languageVsCivics: {
    heading: string;
    paragraphs: string[];
  };
  failTrapsHeading: string;
  failTraps: CitizenshipGuideFailTrap[];
  blogAngleSlug?: string;
  blogAngleLabel?: string;
  deckCta: CitizenshipGuideDeckCta;
};

const GUIDE_CONTENT: Record<CitizenshipGuidePilotSlug, CitizenshipGuideContent> = {
  "life-in-the-uk-readiness-check": {
    slug: "life-in-the-uk-readiness-check",
    examLabel: "Life in the UK Test",
    comparisonNote:
      "The Home Office sitting is the scored event. This page is a longer free diagnostic on handbook themes — not live Home Office items.",
    rows: [
      { label: "Questions", official: "24 multiple-choice", diagnostic: "60 multiple-choice" },
      { label: "Time", official: "45 minutes", diagnostic: "45 minutes" },
      { label: "Pass score", official: "18 of 24 (75%)", diagnostic: "75% on this diagnostic" },
      { label: "Fee", official: "£50 (verify on GOV.UK)", diagnostic: "Free" },
      { label: "Delivery", official: "Approved UK test centre", diagnostic: "Browser — timed or learn mode" },
      { label: "Source", official: "Official handbook (GOV.UK)", diagnostic: "Independent theme practice" },
    ],
    languageVsCivics: {
      heading: "Life in the UK is civics — not IELTS or ESOL",
      paragraphs: [
        "The Life in the UK Test assesses knowledge of British values, history, government, and everyday life from the official handbook. It is not an English-language exam like IELTS, SELT, or ESOL used on other visa routes.",
        "You may still need separate English evidence (B1 SELT or equivalent) for naturalisation depending on your pathway — verify on GOV.UK alongside the handbook edition named for your sitting.",
      ],
    },
    failTrapsHeading: "Common mistakes before you book",
    failTraps: [
      {
        title: "Drilling random 24-question apps instead of the handbook",
        detail:
          "Many free apps reuse outdated stems or skip Chapter 3 history weight. Align every session with the current GOV.UK handbook edition, then use this 60-question diagnostic only to score weak domains.",
      },
      {
        title: "Treating a 60Q diagnostic pass as a guaranteed 18/24",
        detail:
          "This mock is longer and uses independent items. Passing here means topic repair — finish with a strict 24-question / 45-minute set at 75% before you pay the £50 sitting fee.",
      },
      {
        title: "Confusing settlement and citizenship routes",
        detail:
          "Indefinite Leave to Remain and British citizenship both use the same test format today, but your ID, booking, and file timing differ. Book only through GOV.UK-approved channels.",
      },
      {
        title: "Ignoring British values vs trivia dates",
        detail:
          "Examiners test principles (rule of law, democracy, tolerance) and significance — not year-list memorisation alone. If you only remember dates without context, history rows stay red on the topic report.",
      },
    ],
    blogAngleSlug: "life-in-the-uk-test-why-one-in-three-fail",
    blogAngleLabel: "Why one in three fail (angle guide)",
    deckCta: "live",
  },
  "leben-in-deutschland-readiness-check": {
    slug: "leben-in-deutschland-readiness-check",
    examLabel: "Einbürgerungstest / Leben in Deutschland",
    comparisonNote:
      "BAMF publishes the official 33-question Einbürgerungstest. This page is a longer free diagnostic on overlapping civics themes — not BAMF test-centre material.",
    rows: [
      { label: "Questions", official: "33 multiple-choice", diagnostic: "60 multiple-choice" },
      { label: "Time", official: "60 minutes", diagnostic: "60 minutes" },
      { label: "Pass score", official: "17 of 33 for citizenship (15 for some PR paths)", diagnostic: "55% on this diagnostic" },
      { label: "Fee", official: "Test-centre fee (verify BAMF)", diagnostic: "Free" },
      { label: "Delivery", official: "Authorized BAMF test centre", diagnostic: "Browser — timed or learn mode" },
      { label: "Bundesland items", official: "Yes — state-specific questions", diagnostic: "Federal + general themes (confirm your Land list separately)" },
    ],
    languageVsCivics: {
      heading: "Einbürgerungstest is civics — not Goethe, telc, ÖSD, or DTZ",
      paragraphs: [
        "Leben in Deutschland / Einbürgerungstest tests society and constitution knowledge in German. It is separate from German language certificates (Goethe, telc, ÖSD, DTZ) that many naturalisation files still require.",
        "Some integration paths use a shorter LiD variant (15 correct) — confirm whether your file needs Einbürgerungstest (17) or integration LiD before you book.",
      ],
    },
    failTrapsHeading: "Common mistakes before the BAMF sitting",
    failTraps: [
      {
        title: "Studying only federal topics and skipping your Bundesland",
        detail:
          "Roughly one-third of official items can be state-specific. Download the question catalogue for your Bundesland from BAMF and drill those stems separately from this federal diagnostic.",
      },
      {
        title: "Using a German A2 vocabulary deck as civics prep",
        detail:
          "Language flashcards do not replace the Einbürgerungstest catalogue. Pair vocabulary study with civics MCQs — the Citizenship & Naturalization Anki Bundle covers civics themes, not telc grammar.",
      },
      {
        title: "Confusing Einbürgerungstest with general integration LiD",
        detail:
          "Naturalisation usually needs 17/33. Some residence/integration routes accept 15/33. Verify your pathway on bamf.de before you optimise for the wrong cut score.",
      },
      {
        title: "Assuming 55% on this 60Q mock equals 17/33 on exam day",
        detail:
          "Different length, different pass rule. Use this diagnostic for topic scoring, then sit a timed 33-question block at the official threshold before paying the test-centre fee.",
      },
    ],
    blogAngleSlug: "germany-einbuergerungstest-vs-leben-in-deutschland-difference",
    blogAngleLabel: "Einbürgerungstest vs Leben in Deutschland (comparison)",
    deckCta: "live",
  },
  "finland-kansalaisuuskoe-readiness-check": {
    slug: "finland-kansalaisuuskoe-readiness-check",
    examLabel: "Kansalaisuuskoe",
    comparisonNote:
      "Migri will publish binding rules and learning materials before the first sitting. Figures below mix confirmed law dates with provisional format discussion — confirm on migri.fi.",
    rows: [
      { label: "Applies from", official: "Applications from 1 March 2027", diagnostic: "Practice anytime (prep hub)" },
      { label: "Questions", official: "~20–40 MCQ (provisional — confirm Migri)", diagnostic: "60 multiple-choice" },
      { label: "Time", official: "Not stably published yet", diagnostic: "45 minutes" },
      { label: "Pass score", official: "~70% proposed — confirm Migri", diagnostic: "70% on this diagnostic" },
      { label: "Language", official: "Finnish or Swedish", diagnostic: "Finnish (this page)" },
      { label: "Source", official: "Migri + Helsinki University pack", diagnostic: "Independent theme practice — not Migri items" },
    ],
    languageVsCivics: {
      heading: "Kansalaisuuskoe is society knowledge — not English practice",
      paragraphs: [
        "The citizenship test covers Finnish legislation, rights, equality, history, and culture in Finnish or Swedish. English study guides alone will not match exam-day language requirements.",
        "Exemptions may apply if you hold a Finnish/Swedish matriculation exam or a higher-education degree completed in Finnish or Swedish — verify your case on migri.fi before you assume you must sit the test.",
      ],
    },
    failTrapsHeading: "Common mistakes before March 2027",
    failTraps: [
      {
        title: "Filing date vs law effective date",
        detail:
          "The Act is effective 1 January 2027, but the test applies to applications submitted from 1 March 2027. Applications by 28 February 2027 may follow transition rules — confirm timing for your file.",
      },
      {
        title: "Memorising rumoured Q-counts from blogs",
        detail:
          "Press briefings cited ~20–40 questions and ~70% pass — not final until Migri publishes materials. Study themes (Eduskunta, rights, EU 1995, Kela, Migri) rather than invented item banks.",
      },
      {
        title: "Studying in English when the live test is FI/SV",
        detail:
          "This diagnostic is in Finnish. If you need Swedish, build vocabulary in that language and watch migri.fi for the official bilingual learning pack.",
      },
      {
        title: "Waiting for an official bank while ignoring civic literacy",
        detail:
          "No public timed bank exists yet. Use Migri announcements plus this free mock to score weak domains now — switch to official samples the day they publish.",
      },
    ],
    blogAngleSlug: "finland-kansalaisuuskoe-2027-new-test",
    blogAngleLabel: "Finland 2027 timeline & exemptions (news angle)",
    deckCta: "hidden",
  },
};

export function isCitizenshipGuidePilot(slug: string): slug is CitizenshipGuidePilotSlug {
  return (CITIZENSHIP_GUIDE_PILOT_SLUGS as readonly string[]).includes(slug);
}

export function getCitizenshipGuideContent(slug: string): CitizenshipGuideContent | null {
  if (!isCitizenshipGuidePilot(slug)) {
    return null;
  }
  return GUIDE_CONTENT[slug];
}
