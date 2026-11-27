import type { BlogPostDraft } from "../types";

export const ankiDeckShelfLifePost: BlogPostDraft = {
  slug: "how-long-anki-decks-stay-current-exam-shelf-life",
  title: "How Long Do Anki Decks Stay Current?",
  titleTag: "How Long Do Anki Decks Stay Current? Exam-by-Exam Shelf Life 2027",
  metaDescription:
    "Anki deck shelf life in 2027: when a LEED or outline change makes an old deck worthless versus when FINRA-style banks stay usable. Official change signals by exam and how to spot a stale deck early.",
  publishedAt: "2026-07-28",
  contentUpdated: "2026-11-24",
  eyebrow: "Study tools · Deck freshness",
  clusterId: "anki-study",
  relatedSlugs: ["anki-vs-quizlet-professional-exam-prep"],
  intro:
    "**An Anki deck does not expire on a timer. It goes stale when the official source changes:** a new outline, a rule that changes an answer, or revised study material. This guide lists the official change signals for the exams we cover, with dates from the exam bodies, and shows how to check a deck and decide whether to patch or replace it.",
  mockSlug: "epa-608-readiness-check",
  deckSlug: "hvac-epa-608-anki-deck",
  cta: {
    mockLabel: "Try a free readiness check",
    deckLabel: "Browse dated Anki decks in the catalog",
    summary:
      "Check your exam body's latest outline or study material first, then browse the deck catalogue and verify your recall with a free readiness check.",
  },
  sections: [
    {
      heading: "What makes a deck go stale?",
      blocks: [
        {
          type: "p",
          text: "A flashcard deck is only as current as the source it was built from. Three kinds of change make cards wrong:",
        },
        {
          type: "ul",
          items: [
            "**Outline changes:** the exam body publishes a new content outline or switches versions.",
            "**Rule changes:** a law or regulation changes the right answer, even if the exam outline stays the same.",
            "**Material updates:** the official study material is revised, so questions follow the new text.",
          ],
        },
        {
          type: "p",
          text: "There is no fixed shelf life. The useful habit is to know which of these signals your exam's official body publishes, and to check them before you study.",
        },
      ],
    },
    {
      heading: "What are the official change signals, exam by exam?",
      blocks: [
        {
          type: "table",
          caption: "Official change signals (checked 24 Nov 2026)",
          headers: ["Exam", "What changed or what to watch", "Source"],
          rows: [
            ["LEED Green Associate", "LEED v5 is available for BD+C, ID+C and O+M; the Green Associate credential page still links the LEED v4 candidate handbook", "usgbc.org"],
            ["EPA 608", "EPA's test topics page was last updated on 5 December 2025; Technology Transitions rules set a 700 GWP limit for new residential and light commercial AC systems from 1 January 2025", "epa.gov"],
            ["ServSafe Manager", "Content follows the FDA Food Code; FDA now lists a 2026 edition as its most recent full Food Code (the 2022 edition was the 10th)", "fda.gov, servsafe.com"],
            ["FINRA SIE and Series 7", "Retake waiting periods change on 19 January 2027 (not an outline change); the SIE outline is published as a PDF on finra.org", "finra.org"],
            ["US citizenship civics", "The 2025 test (128 questions) applies to N-400s filed from 20 October 2025; answers about current officials change with elections", "uscis.gov"],
            ["Denmark Indfødsretsprøven", "SIRI updates the learning material every year; the August 2026 update covers the latest elections and government", "danskogproever.dk"],
            ["Sweden medborgarskapsprov", "New test from 2026; the official material \"Sverige i fokus\" was corrected on 10 August 2026", "uhr.se"],
          ],
        },
      ],
    },
    {
      heading: "Which exams change most often?",
      blocks: [
        {
          type: "ul",
          items: [
            "**Civics tests with current-affairs content** change every year or every election: Denmark has five current-affairs questions per test, and US answers about officials follow elections.",
            "**Rating-system exams** change when the system does: LEED's move to v5 is the example to watch.",
            "**Regulation-driven exams** change when the rules do, sometimes without a new outline: EPA's refrigerant rules and the FDA Food Code are the drivers for EPA 608 and ServSafe.",
            "**Securities exams** have published outlines and section weights; check the outline date on finra.org before you trust older material.",
          ],
        },
      ],
    },
    {
      heading: "How do you check whether your deck is stale?",
      blocks: [
        {
          type: "steps",
          items: [
            { title: "Find the official source", body: "The exam body's outline, handbook or study material, and its update date." },
            { title: "Compare versions", body: "If your deck was built before the latest version or update, mark it for review." },
            { title: "Check the rule-sensitive cards", body: "Dates, thresholds, fees, officials and refrigerant or temperature values are the cards most likely to be wrong." },
            { title: "Test with current questions", body: "A timed check such as the [EPA 608 readiness check](/mock-exams/epa-608-readiness-check) shows whether your recall matches the current exam." },
          ],
        },
      ],
    },
    {
      heading: "Should you patch a deck or replace it?",
      blocks: [
        {
          type: "p",
          text: "**Patch** when the outline is the same and only a few facts changed: edit or suspend the affected cards and add new ones from the official source. **Replace** when the exam moves to a new version or outline, as with a rating-system change, because the structure of what is tested changes, not just individual answers. Anki can update notes when you re-import a newer version of the same shared deck (see [Anki vs Quizlet](/blog/anki-vs-quizlet-professional-exam-prep)). For EPA 608 specifically, the [EPA 608 Anki deck](/decks/hvac-epa-608-anki-deck) is organised around refrigerant families and pressure classes.",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "How long does an Anki deck stay current?",
      answer: "There is no fixed period. A deck stays current until the exam body changes the outline, the rules change an answer, or the official study material is revised.",
    },
    {
      question: "Has the LEED Green Associate exam moved to v5?",
      answer: "USGBC's credential page does not say so; LEED v5 is available for BD+C, ID+C and O+M, and the page links the v4 candidate handbook (checked 24 Nov 2026).",
    },
    {
      question: "When did EPA last update its 608 test topics?",
      answer: "EPA's test topics page shows a last update of 5 December 2025.",
    },
    {
      question: "Which civics tests change every year?",
      answer: "Denmark's, for example: SIRI updates the learning material annually, and five questions cover current affairs. US civics answers about current officials change with elections.",
    },
    {
      question: "Which cards go out of date first?",
      answer: "Cards with dates, thresholds, fees, office holders and regulated values.",
    },
    {
      question: "Should I patch or replace an outdated deck?",
      answer: "Patch for a few changed facts; replace when the exam moves to a new version or outline.",
    },
  ],
  bottomLine:
    "Decks do not expire on a timer; they expire when the official source changes. Sources: [USGBC — LEED Green Associate](https://www.usgbc.org/credentials/leed-green-associate), [EPA 608 test topics](https://www.epa.gov/section608/test-topics), [EPA Technology Transitions sector tables](https://www.epa.gov/climate-hfcs-reduction/sector-tables), [FDA Food Code](https://www.fda.gov/food/retail-food-protection/fda-food-code), [FINRA SIE](https://www.finra.org/registration-exams-ce/qualification-exams/securities-industry-essentials-exam), [USCIS 2025 civics test](https://www.uscis.gov/citizenship-resource-center/naturalization-test-and-study-resources/2025-civics-test), [SIRI learning material update](https://danskogproever.dk/nyheder/2026/laeremateriale-til-indfoedsretsproeven-er-opdateret/) and [UHR study material](https://www.uhr.se/medborgarskapsprovet/utbildningsmaterial/), checked 24 Nov 2026.",
};
