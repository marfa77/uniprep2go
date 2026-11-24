import type { BlogPostDraft } from "../types";

export const memorizeEpa608RefrigerantsPost: BlogPostDraft = {
  slug: "memorize-epa-608-refrigerant-numbers-method",
  title: "How to Memorize Refrigerant Numbers for EPA 608: A Method That Actually Works",
  titleTag: "Memorize EPA 608 Refrigerant Numbers: Method That Works 2027",
  metaDescription:
    "R-22, R-410A, R-134a, R-404A — the EPA 608 exam throws 20+ refrigerant numbers at you. Here is the ASHRAE numbering system decoded, plus the grouping trick that makes them stick.",
  publishedAt: "2026-07-28",
  contentUpdated: "2026-11-24",
  eyebrow: "EPA 608 · HVAC certification",
  clusterId: "epa-608",
  relatedSlugs: [
    "epa-608-type-1-vs-type-2-which-first",
    "epa-608-practice-test-what-to-expect",
  ],
  intro:
    "**EPA 608 tests refrigerants by family and pressure class, not as a list of numbers.** The federal rules set 25 questions per section and a 70% pass mark, and EPA's own test topics include phaseout dates and the R-123 sensor rule. This guide shows how to decode an R-number, group refrigerants into families, and attach the pressure classes EPA defines in 40 CFR 82.152, so you can classify any refrigerant on the exam.",
  mockSlug: "epa-608-readiness-check",
  deckSlug: "hvac-epa-608-anki-deck",
  cta: {
    mockLabel: "Take the free EPA 608 readiness check",
    deckLabel: "EPA 608 Anki deck — refrigerant families",
    summary:
      "Ready to test refrigerant knowledge under pressure? Take the free EPA 608 readiness check on classification, pressure groups, and recovery — then lock in the families with the [EPA 608 Anki deck](/decks/hvac-epa-608-anki-deck).",
  },

  sections: [
    {
      heading: "What does the EPA 608 exam actually test about refrigerants?",
      blocks: [
        {
          type: "p",
          text: "The federal rules for certifying programs (40 CFR part 82, subpart F, appendix D) fix the structure of the test:",
        },
        {
          type: "ul",
          items: [
            "**25 questions** from the Core group plus **25** from each technical group you take (Type I, II or III). Universal is **100 questions** and can be passed all at once or by combining passing scores on separate sections.",
            "**Passing score: 70%** on the closed-book Type I, II, III and Universal tests. A Type I test in mail-in format needs **84%**.",
            "**Type II and Type III** must be closed-book, proctored tests in a secure environment.",
            "**Certification does not expire** (EPA).",
          ],
        },
        {
          type: "p",
          text: "EPA's published test topics include the R-22 and CFC phaseout dates in Core, and an equipment-room refrigerant sensor for R-123 under ASHRAE Standard 15 in Type III. So you need to know which family a refrigerant belongs to and which pressure class its equipment falls in, not just recognise the number. Check yourself on the [EPA 608 readiness check](/mock-exams/epa-608-readiness-check).",
        },
      ],
    },
    {
      heading: "How do you decode an R-number?",
      blocks: [
        {
          type: "p",
          text: "Refrigerant numbers follow the ASHRAE Standard 34 naming convention for simple molecules. Read the digits from right to left:",
        },
        {
          type: "table",
          caption: "Digit positions for single-compound refrigerants",
          headers: ["Digit (from the right)", "Meaning"],
          rows: [
            ["First", "Number of fluorine atoms"],
            ["Second", "Number of hydrogen atoms + 1"],
            ["Third", "Number of carbon atoms − 1 (left off when zero)"],
          ],
        },
        {
          type: "topics",
          items: [
            { title: "R-12", body: "2 fluorine, 0 hydrogen, 1 carbon: CCl₂F₂. Chlorine and no hydrogen, so a CFC." },
            { title: "R-22", body: "2 fluorine, 1 hydrogen, 1 carbon: CHClF₂. Hydrogen and chlorine, so an HCFC." },
            { title: "R-134a", body: "4 fluorine, 2 hydrogen, 2 carbon: C₂H₂F₄. No chlorine, so an HFC. The lowercase \"a\" marks an isomer, not a different family." },
          ],
        },
        {
          type: "p",
          text: "Blends in the 400 and 500 series (R-410A, R-407C, R-500) do not decode this way. Learn their family and pressure class directly. You will not be asked to calculate formulas; the code just turns a list of random numbers into a pattern.",
        },
      ],
    },
    {
      heading: "Which families should you learn first?",
      blocks: [
        {
          type: "topics",
          items: [
            { title: "CFCs: chlorine, no hydrogen", body: "R-11, R-12, R-113, R-114. The original high-ozone-depleting refrigerants." },
            { title: "HCFCs: hydrogen and chlorine", body: "R-22, R-123, R-124. EPA rules: no production or import of HCFC-22 since 2020, and of any HCFC from 2030." },
            { title: "HFCs: no chlorine", body: "R-134a, R-410A, R-407C, R-404A. No ozone depletion, but now restricted by GWP under EPA's Technology Transitions rule." },
          ],
        },
        {
          type: "table",
          caption: "EPA dates worth knowing (epa.gov, checked 24 Nov 2026)",
          headers: ["Date", "What changed"],
          rows: [
            ["1 Jan 2010", "No production or import of HCFC-22 except for equipment made before 2010"],
            ["1 Jan 2020", "No production or import of HCFC-22"],
            ["1 Jan 2025", "New residential and light commercial AC and heat pump systems must use refrigerant under 700 GWP (installation compliance date; systems with all components made or imported before then are exempt)"],
            ["1 Jan 2030", "No production or import of any HCFC"],
          ],
        },
      ],
    },
    {
      heading: "How does pressure class work?",
      blocks: [
        {
          type: "p",
          text: "EPA defines appliance pressure classes by the refrigerant's liquid-phase saturation pressure at 104 °F (40 CFR 82.152). This table uses EPA's own examples:",
        },
        {
          type: "table",
          caption: "Pressure classes in 40 CFR 82.152 (checked 24 Nov 2026)",
          headers: ["Class", "Saturation pressure at 104 °F", "EPA examples"],
          rows: [
            ["Low", "Below 45 psia", "R-11, R-123, R-113, R-245fa"],
            ["Medium", "45–170 psia", "R-114, R-124, R-12, R-134a, R-500"],
            ["High", "170–355 psia", "R-22, R-407A, R-407C, R-410A, R-502"],
            ["Very high", "Above 355 psia, or critical temperature below 104 °F", "R-13, R-23, R-503, R-508A, R-508B"],
          ],
        },
        {
          type: "p",
          text: "Type II covers high- and very-high-pressure appliances (except small appliances and motor vehicle AC); Type III covers low-pressure appliances; Type I covers small appliances, factory-sealed with 5 lb of refrigerant or less.",
        },
      ],
    },
    {
      heading: "What is the study method?",
      blocks: [
        {
          type: "steps",
          items: [
            { title: "Learn the three family rules", body: "Chlorine without hydrogen is a CFC; hydrogen with chlorine is an HCFC; no chlorine is an HFC." },
            { title: "Make one card per family, not per refrigerant", body: "Front: the family rule. Back: its members and the EPA dates. The [EPA 608 Anki deck](/decks/hvac-epa-608-anki-deck) drills the same groupings." },
            { title: "Add the pressure layer", body: "Attach each number to its 82.152 class and the certification type that covers it." },
            { title: "Say it out loud", body: "\"R-410A: HFC, high pressure, Type II.\" Saying all three forces recall instead of recognition." },
            { title: "Test under exam conditions", body: "Take 25 questions per section at the 70% line, closed book, and review every miss." },
          ],
        },
      ],
    },
    {
      heading: "Which mix-ups cost the most points?",
      blocks: [
        {
          type: "ul",
          items: [
            "**R-123 vs R-12x:** R-123 is a low-pressure HCFC (Type III); R-12 and R-124 are medium pressure.",
            "**R-134a vs R-410A:** both HFCs, but R-134a is medium pressure and R-410A is high pressure.",
            "**R-500 and R-502:** blends, but listed by EPA in the medium and high classes respectively, so do not lump them with the 400-series HFC blends.",
            "**Type I mail-in vs proctored:** the 84% pass mark applies only to the mail-in Type I format.",
          ],
        },
        {
          type: "p",
          text: "Deciding which type to take first? See [EPA 608 Type I vs Type II](/blog/epa-608-type-1-vs-type-2-which-first).",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "How does the refrigerant numbering system work?",
      answer: "For single compounds, read the digits from the right: fluorine atoms, then hydrogen atoms + 1, then carbon atoms − 1 (left off when zero). Blends in the 400 and 500 series do not decode this way.",
    },
    {
      question: "Is R-22 a CFC or an HCFC?",
      answer: "An HCFC: it contains hydrogen, chlorine and fluorine. EPA ended production and import of HCFC-22 on 1 January 2020.",
    },
    {
      question: "What pressure class is R-410A?",
      answer: "High pressure. 40 CFR 82.152 lists R-410A as an example of a high-pressure appliance refrigerant (170–355 psia at 104 °F), covered by Type II.",
    },
    {
      question: "What pressure class is R-123?",
      answer: "Low pressure (below 45 psia at 104 °F), so R-123 chillers fall under Type III.",
    },
    {
      question: "How many questions are on the EPA 608 test and what is the passing score?",
      answer: "25 questions for Core and 25 for each type, 100 for Universal. The passing score is 70%, or 84% for a mail-in Type I test (40 CFR part 82, subpart F, appendix D).",
    },
    {
      question: "Does EPA 608 certification expire?",
      answer: "No. EPA states that Section 608 technician certification credentials do not expire.",
    },
  ],
  bottomLine:
    "Learn the family rule, attach the EPA pressure class, and know the phaseout dates EPA lists in its test topics. Sources: [EPA 608 certification requirements](https://www.epa.gov/section608/section-608-technician-certification-requirements), [EPA 608 test topics](https://www.epa.gov/section608/test-topics), [40 CFR 82.152](https://www.ecfr.gov/current/title-40/chapter-I/subchapter-C/part-82/subpart-F/section-82.152), [40 CFR part 82 subpart F appendix D](https://www.ecfr.gov/current/title-40/chapter-I/subchapter-C/part-82/subpart-F/appendix-Appendix%20D%20to%20Subpart%20F%20of%20Part%2082), [EPA HCFC phaseout](https://www.epa.gov/ods-phaseout/phaseout-class-ii-ozone-depleting-substances) and [EPA Technology Transitions sector tables](https://www.epa.gov/climate-hfcs-reduction/sector-tables), checked 24 Nov 2026.",
};
