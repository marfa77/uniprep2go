import { describe, expect, it } from "vitest";
import { getMockAccessState, isFullReportUnlocked } from "./access";
import { getAllMockExams, getMockExamConfig, primaryMock, validateMockExamConfig } from "./configs";
import {
  buildMockExamFacts,
  buildMockExamFaqs,
  buildMockExamMarkdown,
  buildMockExamPageJsonLd,
} from "./llm";
import { buildMockSeoDescription } from "./seo";
import {
  getQuestionBank,
  getQuestionBankForExam,
  isMockExamRunnable,
  validateQuestionBank,
} from "./question-bank";
import { wave4MockExamConfigs } from "./wave4-configs";
import { buildMockReport, shuffleQuestions, selectSessionQuestions } from "./scoring";
import { formulaBelongsOnFront } from "./formula-placement";
import type { MockQuestion } from "./types";

describe("mock exam configs", () => {
  it("validates all finance mock configs", () => {
    for (const config of getAllMockExams()) {
      expect(validateMockExamConfig(config)).toEqual([]);
    }
  });

  it("defines SIE as the primary mock product", () => {
    expect(primaryMock.slug).toBe("sie-full-mock");
    expect(primaryMock.linkedDeckSlug).toBe("sie-exam-anki-deck");
    expect(primaryMock.status).toBe("live");
  });

  it("does not attach mocks to language certification decks", async () => {
    const { getCatalogDeckBySlug } = await import("../decks");
    const languageFunnelExceptions = new Set([
      "citizenship-naturalization-anki-bundle",
      "dele-a2-ccse-spanish-citizenship-bundle",
      "swiss-citizenship-anki-deck",
      "czech-citizenship-anki-deck",
      "polish-citizenship-anki-deck",
      "denmark-indfoedsretsproeven-anki-deck",
      "portugal-nacionalidade-anki-deck",
      "norway-statsborgerproven-anki-deck",
      "sweden-medborgarskapsprov-anki-deck",
      "belgium-flanders-mo-anki-deck",
      "belgium-wallonie-citoyennete-anki-deck",
      "luxembourg-vivre-ensemble-anki-deck",
    ]);
    for (const config of getAllMockExams()) {
      // Civics mocks may funnel to Gumroad Anki bundles filed under language.
      if (languageFunnelExceptions.has(config.linkedDeckSlug)) continue;
      const deck = getCatalogDeckBySlug(config.linkedDeckSlug);
      expect(deck?.category, config.slug).not.toBe("language");
    }
  });

  it("funnels six-country citizenship readiness mocks to the Anki naturalization bundle", async () => {
    const { getDeckLinkedMocks } = await import("../deck-seo");
    const slugs = [
      "us-citizenship-readiness-check",
      "leben-in-deutschland-readiness-check",
      "naturalisation-francaise-readiness-check",
      "life-in-the-uk-readiness-check",
      "canadian-citizenship-readiness-check",
      "australian-citizenship-readiness-check",
    ];
    for (const slug of slugs) {
      expect(getMockExamConfig(slug)?.linkedDeckSlug).toBe(
        "citizenship-naturalization-anki-bundle",
      );
    }
    expect(getDeckLinkedMocks("citizenship-naturalization-anki-bundle").map((m) => m.slug)).toEqual(
      expect.arrayContaining(slugs),
    );
    expect(getDeckLinkedMocks("citizenship-naturalization-anki-bundle")).toHaveLength(6);
  });

  it("imports CCSE España readiness mock from Prep2Go and links the planned DELE+CCSE waitlist", async () => {
    const { getDeckBySlug } = await import("../decks");
    const config = getMockExamConfig("ccse-espana-readiness-check");
    expect(config?.status).toBe("live");
    expect(config?.linkedDeckSlug).toBe("dele-a2-ccse-spanish-citizenship-bundle");
    expect(getDeckBySlug("dele-a2-ccse-spanish-citizenship-bundle")?.status).toBe("planned");
    expect(config?.questionCount).toBe(60);
    expect(isMockExamRunnable("ccse-espana-readiness-check")).toBe(true);
    const { questions, errors } = getQuestionBankForExam("ccse-espana-readiness-check");
    expect(errors).toEqual([]);
    expect(questions).toHaveLength(60);
    expect(questions[0]?.sourceNote).toContain("CCSE");
  });

  it("imports Swiss DE/FR/IT readiness mocks and funnels to the Swiss Anki bundle", async () => {
    const { getDeckBySlug } = await import("../decks");
    const { getDeckLinkedMocks } = await import("../deck-seo");
    const deck = getDeckBySlug("swiss-citizenship-anki-deck");
    expect(deck?.status).toBe("available");
    expect(deck?.checkoutUrl).toContain("swiss-citizenship-anki-deck");
    for (const [slug, note] of [
      ["swiss-citizenship-readiness-check", "Einbürgerung Schweiz"],
      ["naturalisation-suisse-readiness-check", "Naturalisation Suisse"],
      ["naturalizzazione-svizzera-readiness-check", "Naturalizzazione Svizzera"],
    ] as const) {
      expect(getMockExamConfig(slug)?.linkedDeckSlug).toBe("swiss-citizenship-anki-deck");
      expect(isMockExamRunnable(slug)).toBe(true);
      const { questions, errors } = getQuestionBankForExam(slug);
      expect(errors).toEqual([]);
      expect(questions).toHaveLength(60);
      expect(questions[0]?.sourceNote).toContain(note);
    }
    expect(getDeckLinkedMocks("swiss-citizenship-anki-deck")).toHaveLength(3);
  });

  it("imports Czech and Polish citizenship readiness mocks with planned Anki waitlists", async () => {
    const { getDeckBySlug } = await import("../decks");
    for (const [slug, deckSlug, note] of [
      ["czech-citizenship-readiness-check", "czech-citizenship-anki-deck", "Czech Citizenship"],
      ["polish-citizenship-readiness-check", "polish-citizenship-anki-deck", "Polish Citizenship"],
    ] as const) {
      expect(getMockExamConfig(slug)?.status).toBe("live");
      expect(getMockExamConfig(slug)?.linkedDeckSlug).toBe(deckSlug);
      expect(getDeckBySlug(deckSlug)?.status).toBe("planned");
      expect(isMockExamRunnable(slug)).toBe(true);
      const { questions, errors } = getQuestionBankForExam(slug);
      expect(errors).toEqual([]);
      expect(questions).toHaveLength(60);
      expect(questions[0]?.sourceNote).toContain(note);
    }
  });

  it("keeps Home Health Aide bank clean, balanced, and home-care framed", () => {
    const slug = "home-health-aide-readiness-check";
    expect(getMockExamConfig(slug)?.status).toBe("live");
    expect(isMockExamRunnable(slug)).toBe(true);
    const { questions, errors } = getQuestionBankForExam(slug);
    expect(errors).toEqual([]);
    expect(questions).toHaveLength(60);
    const stems = new Set(questions.map((q) => q.prompt.trim().toLowerCase()));
    expect(stems.size).toBe(60);
    const answers = { a: 0, b: 0, c: 0, d: 0 };
    for (const q of questions) {
      answers[q.correctOptionId as keyof typeof answers] += 1;
      expect(q.explanation.split(/\s+/).length).toBeGreaterThanOrEqual(15);
      const blob = [q.prompt, ...q.options.map((o) => o.text), q.explanation].join(" ");
      expect(blob).not.toMatch(/FDIC|US securities|this concept always eliminates/i);
      expect(blob).not.toMatch(/\b(nursing home|OBRA|nurse aide|\bNA\b|CNA)\b/i);
    }
    expect(answers).toEqual({ a: 15, b: 15, c: 15, d: 15 });
  });

  it("ships thick explainers + honest format notes for every citizenship mock with Anki", async () => {
    const { getNicheExamExplainer } = await import("./niche-exam-explainers");
    const { getDeckBySlug } = await import("../decks");
    const { getAllMockExams } = await import("./configs");
    const citizenship = getAllMockExams().filter((mock) => {
      if (!mock.linkedDeckSlug || !getDeckBySlug(mock.linkedDeckSlug)) return false;
      return (
        mock.familyId === "citizenship" ||
        mock.verticalId === "citizenship" ||
        /citizenship|nacionalidade|indfoeds|statsborger|medborgar|citoyennete|vivre-ensemble|naturalisation|leben-in|life-in|canadian|australian|us-citizenship|flanders|wallonie|ccse|swiss/i.test(
          mock.slug,
        )
      );
    });
    expect(citizenship.length).toBeGreaterThanOrEqual(19);
    for (const mock of citizenship) {
      const explainer = getNicheExamExplainer(mock.slug);
      expect(explainer, mock.slug).toBeTruthy();
      expect(explainer!.whatIsExam.split(/\s+/).length, mock.slug).toBeGreaterThan(60);
      expect(explainer!.whoFor?.length ?? 0, mock.slug).toBeGreaterThan(80);
      expect(explainer!.howToPrepare?.length ?? 0, mock.slug).toBeGreaterThan(80);
      expect(explainer!.examFaqs.length, mock.slug).toBeGreaterThanOrEqual(6);
      expect(explainer!.officialFormat?.length ?? 0, mock.slug).toBeGreaterThan(40);
      expect(mock.officialSourceNote, mock.slug).toMatch(
        /independent|not official|no single federal|pending|proposed|diagnostic|oral interview|dual-gate|longer/i,
      );
      const { questions, errors } = getQuestionBankForExam(mock.slug);
      expect(errors, mock.slug).toEqual([]);
      expect(questions.length, mock.slug).toBeGreaterThanOrEqual(30);
      const boilerplate = questions.filter((q) =>
        /Correct answer:|Richtige Antwort:|Bonne réponse\s*:|Remember why|Husk hvorfor|Zapamiętaj, dlaczego|Zusätzlich: Prüfen Sie/i.test(
          q.explanation,
        ),
      );
      expect(boilerplate, `${mock.slug} boilerplate explanations`).toHaveLength(0);
    }
  });

  it("frames Czech citizenship mock with official reálie format callout", async () => {
    const { getNicheExamExplainer } = await import("./niche-exam-explainers");
    const slug = "czech-citizenship-readiness-check";
    const config = getMockExamConfig(slug);
    const explainer = getNicheExamExplainer(slug);
    expect(config?.officialSourceNote).toMatch(/30 questions|30Q/i);
    expect(config?.officialSourceNote).toMatch(/60 questions|60\b/i);
    expect(explainer?.officialFormat).toMatch(/30 MCQs|30 questions/i);
    expect(explainer?.officialFormat).toMatch(/60 timed questions|60 questions/i);
    expect(explainer?.whatIsExam.split(/\s+/).length).toBeGreaterThan(60);
    expect(explainer?.whoFor?.length).toBeGreaterThan(80);
    expect(explainer?.howToPrepare?.length).toBeGreaterThan(80);
    expect(explainer?.examFaqs.length).toBeGreaterThanOrEqual(6);
    expect(explainer?.whatIsExam).toMatch(/permanent residence|trvalý pobyt/i);
    const { questions } = getQuestionBankForExam(slug);
    const yearOnlyStems = questions.filter((q) =>
      /^V[e]? kterém roce\b/i.test(q.prompt.trim()),
    );
    expect(yearOnlyStems.length).toBe(0);
    const thinExplanations = questions.filter((q) => q.explanation.split(/\s+/).length < 15);
    expect(thinExplanations.length).toBe(0);
  });

  it("frames Polish citizenship mock as proposed civics (no official test yet)", async () => {
    const { getNicheExamExplainer } = await import("./niche-exam-explainers");
    const slug = "polish-citizenship-readiness-check";
    const config = getMockExamConfig(slug);
    const explainer = getNicheExamExplainer(slug);
    expect(config?.officialSourceNote).toMatch(/no official citizenship civics exam/i);
    expect(config?.examBody).toMatch(/no official test yet/i);
    expect(explainer?.whatIsExam.split(/\s+/).length).toBeGreaterThan(60);
    expect(explainer?.whoFor?.length).toBeGreaterThan(80);
    expect(explainer?.howToPrepare?.length).toBeGreaterThan(80);
    expect(explainer?.examFaqs.length).toBeGreaterThanOrEqual(6);
    expect(explainer?.whatIsExam).toMatch(/does not currently|no official|proposed/i);
    const { questions } = getQuestionBankForExam(slug);
    const yearOnlyStems = questions.filter((q) =>
      /^W którym roku\b/i.test(q.prompt.trim()),
    );
    expect(yearOnlyStems.length).toBe(0);
  });

  it("imports Nordic/Benelux/Portugal civics readiness mocks with planned Anki waitlists", async () => {
    const { getDeckBySlug } = await import("../decks");
    for (const [slug, deckSlug, note] of [
      ["denmark-indfoedsretsproeven-readiness-check", "denmark-indfoedsretsproeven-anki-deck", "Denmark Indfødsretsprøven"],
      ["portugal-nacionalidade-readiness-check", "portugal-nacionalidade-anki-deck", "Portugal Nacionalidade"],
      ["norway-statsborgerproven-readiness-check", "norway-statsborgerproven-anki-deck", "Norway Statsborgerprøven"],
      ["sweden-medborgarskapsprov-readiness-check", "sweden-medborgarskapsprov-anki-deck", "Sweden Medborgarskapsprov"],
      ["belgium-flanders-mo-readiness-check", "belgium-flanders-mo-anki-deck", "Belgium Flanders MO"],
      ["belgium-wallonie-citoyennete-readiness-check", "belgium-wallonie-citoyennete-anki-deck", "Belgium Wallonie Citoyenneté"],
      ["luxembourg-vivre-ensemble-readiness-check", "luxembourg-vivre-ensemble-anki-deck", "Luxembourg Vivre ensemble"],
    ] as const) {
      expect(getMockExamConfig(slug)?.status, slug).toBe("live");
      expect(getMockExamConfig(slug)?.linkedDeckSlug, slug).toBe(deckSlug);
      // Luxembourg is force-launched; other Nordic/Benelux decks stay planned waitlists.
      const expectedDeckStatus =
        deckSlug === "luxembourg-vivre-ensemble-anki-deck" ? "available" : "planned";
      expect(getDeckBySlug(deckSlug)?.status, deckSlug).toBe(expectedDeckStatus);
      expect(isMockExamRunnable(slug), slug).toBe(true);
      const { questions, errors } = getQuestionBankForExam(slug);
      expect(errors, slug).toEqual([]);
      expect(questions, slug).toHaveLength(60);
      expect(questions[0]?.sourceNote, slug).toContain(note);
    }
  });

  it("defines SIE topic counts that sum to 75", () => {
    const config = getMockExamConfig("sie-full-mock");
    expect(config?.questionCount).toBe(75);
    expect(config?.topics.reduce((sum, topic) => sum + (topic.questionCount ?? 0), 0)).toBe(75);
  });

  it("defines SIE quick diagnostic as a stratified 25-question sample from the full bank", () => {
    const config = getMockExamConfig("sie-quick-diagnostic");
    expect(config?.status).toBe("live");
    expect(config?.questionCount).toBe(25);
    expect(config?.durationMinutes).toBe(35);
    expect(config?.linkedDeckSlug).toBe("sie-exam-anki-deck");
    expect(config?.topics.reduce((sum, topic) => sum + (topic.questionCount ?? 0), 0)).toBe(25);
    expect(isMockExamRunnable("sie-quick-diagnostic")).toBe(true);
    const { questions, errors } = getQuestionBankForExam("sie-quick-diagnostic");
    expect(errors).toEqual([]);
    expect(questions.length).toBeGreaterThanOrEqual(75);
    expect(questions.every((q) => q.examSlug === "sie-quick-diagnostic")).toBe(true);
    const session = selectSessionQuestions(questions, config!, "seed-sie-quick");
    expect(session).toHaveLength(25);
  });

  it("defines ServSafe Manager topic counts that sum to 90", () => {
    const config = getMockExamConfig("servsafe-manager-mock");
    expect(config?.questionCount).toBe(90);
    expect(config?.passRule.passPercent).toBe(75);
    expect(config?.topics.reduce((sum, topic) => sum + (topic.questionCount ?? 0), 0)).toBe(90);
  });

  it("defines PTCB topic counts that sum to 90", () => {
    const config = getMockExamConfig("ptcb-pharmacy-technician-mock");
    expect(config?.questionCount).toBe(90);
    expect(config?.passRule.passPercent).toBe(70);
    expect(config?.topics.reduce((sum, topic) => sum + (topic.questionCount ?? 0), 0)).toBe(90);
  });

  it("defines Digital SAT readiness check with section-balanced scoring", () => {
    const config = getMockExamConfig("sat-readiness-check");
    expect(config).not.toBeNull();
    expect(config?.questionCount).toBe(49);
    expect(config?.topics).toHaveLength(2);
    expect(config?.topics.map((topic) => topic.id)).toEqual(["reading-and-writing", "math"]);
    expect(config?.topics.find((topic) => topic.id === "reading-and-writing")).toMatchObject({
      questionCount: 27,
      weightPercent: 55,
      targetPercent: 70,
    });
    expect(config?.topics.find((topic) => topic.id === "math")).toMatchObject({
      questionCount: 22,
      weightPercent: 45,
      targetPercent: 70,
    });
    expect(config?.passRule.requireAllTopicsAtTarget).toBe(true);
    expect(config?.passRule.passPercent).toBe(70);
    expect(config?.passRule.verdictLabels.pass).toBe("READINESS PASS");
    expect(validateMockExamConfig(config!)).toEqual([]);
  });

  it("defines PMP readiness check with ECO domain-balanced scoring", () => {
    const config = getMockExamConfig("pmp-readiness-check");
    expect(config).not.toBeNull();
    expect(config?.questionCount).toBe(51);
    expect(config?.topics).toHaveLength(3);
    expect(config?.topics.map((topic) => topic.id)).toEqual([
      "people",
      "process",
      "business-environment",
    ]);
    expect(config?.topics.map((topic) => topic.weightPercent)).toEqual([33, 41, 26]);
    expect(config?.topics.reduce((sum, topic) => sum + (topic.questionCount ?? 0), 0)).toBe(51);
    expect(config?.passRule.requireAllTopicsAtTarget).toBe(true);
    expect(config?.passRule.passPercent).toBe(70);
    expect(validateMockExamConfig(config!)).toEqual([]);
  });


  it("defines LEED AP O+M topic counts that sum to 50", () => {
    const config = getMockExamConfig("leed-ap-om-readiness-check");
    expect(config?.questionCount).toBe(50);
    expect(config?.topics.reduce((sum, topic) => sum + (topic.questionCount ?? 0), 0)).toBe(50);
    expect(config?.topics.map((t) => t.weightPercent).reduce((a, b) => a + b, 0)).toBe(100);
    expect(validateMockExamConfig(config!)).toEqual([]);
  });

  it("defines GRE General readiness check with Verbal/Quant section scoring", () => {
    const config = getMockExamConfig("gre-readiness-check");
    expect(config).not.toBeNull();
    expect(config?.questionCount).toBe(30);
    expect(config?.topics).toHaveLength(2);
    expect(config?.topics.map((topic) => topic.id)).toEqual(["verbal", "quant"]);
    expect(config?.topics.map((topic) => topic.weightPercent)).toEqual([50, 50]);
    expect(config?.topics.reduce((sum, topic) => sum + (topic.questionCount ?? 0), 0)).toBe(30);
    expect(config?.passRule.requireAllTopicsAtTarget).toBe(true);
    expect(validateMockExamConfig(config!)).toEqual([]);
  });
});

describe("question bank from deck content", () => {
  it("loads a complete SIE bank sourced from deck CSV export", () => {
    const { questions, errors } = getQuestionBankForExam("sie-full-mock");
    expect(errors).toEqual([]);
    expect(questions).toHaveLength(75);
    expect(questions[0]?.sourceNote).toContain("sie_300_authored.csv");
  });

  it("validates explanations and distractors for every question", () => {
    const { config, questions } = getQuestionBankForExam("sie-full-mock");
    expect(config).not.toBeNull();
    const errors = validateQuestionBank(
      "sie-full-mock",
      config!.questionCount,
      questions,
      config!.topics,
    );
    expect(errors).toEqual([]);
  });

  it("uses plausible unique options and distributes correct answers across positions", () => {
    for (const config of getAllMockExams()) {
      if (config.status !== "live" || !isMockExamRunnable(config.slug)) {
        continue;
      }
      const { questions } = getQuestionBankForExam(config.slug);
      if (questions.length < 20) {
        continue;
      }

      const correctPositions = new Set<string>();

      for (const question of questions) {
        const optionIds = question.options.map((option) => option.id);
        const optionTexts = question.options.map((option) => option.text);

        expect(question.options).toHaveLength(4);
        expect(new Set(optionIds).size).toBe(4);
        expect(new Set(optionTexts).size).toBe(4);
        expect(optionIds).toContain(question.correctOptionId);
        expect(optionTexts.join(" ")).not.toContain("None of the provided deck concepts");
        expect(optionTexts.join(" ")).not.toContain("different concept from the deck");
        correctPositions.add(question.correctOptionId);
      }

      // Some compact banks still bias toward fewer keys; require at least two.
      expect(correctPositions.size).toBeGreaterThanOrEqual(2);
    }
  });

  it("marks live and preview mocks as runnable when banks are complete", () => {
    expect(isMockExamRunnable("sie-full-mock")).toBe(true);
    expect(isMockExamRunnable("servsafe-manager-mock")).toBe(true);
    expect(isMockExamRunnable("ptcb-pharmacy-technician-mock")).toBe(true);
    expect(isMockExamRunnable("cfa-level-1-readiness-check")).toBe(true);
    expect(isMockExamRunnable("frm-part-1-readiness-check")).toBe(true);
  });

  it("marks GMAT Focus readiness mock runnable with the loaded question bank", () => {
    expect(isMockExamRunnable("gmat-focus-readiness-check")).toBe(true);
    const { errors } = getQuestionBankForExam("gmat-focus-readiness-check");
    expect(errors).toEqual([]);
  });

  it("marks Digital SAT readiness mock runnable when the bank meets topic quotas", () => {
    const { questions, errors } = getQuestionBankForExam("sat-readiness-check");
    if (questions.length < 49) {
      // Bank is still being authored elsewhere — scoring/config tests cover logic without it.
      expect(isMockExamRunnable("sat-readiness-check")).toBe(false);
      return;
    }

    expect(isMockExamRunnable("sat-readiness-check")).toBe(true);
    expect(errors).toEqual([]);
    expect(questions.length).toBeGreaterThanOrEqual(49);
    expect(questions.filter((q) => q.topicId === "reading-and-writing").length).toBeGreaterThanOrEqual(27);
    expect(questions.filter((q) => q.topicId === "math").length).toBeGreaterThanOrEqual(22);
  });

  it("stores GMAT equation stems in the formula field using LaTeX", () => {
    const { questions } = getQuestionBankForExam("gmat-focus-readiness-check");
    const equationQuestion = questions.find((question) => question.id.endsWith("-011"));
    expect(equationQuestion?.formula).toContain("2^{x+3}");
    expect(equationQuestion?.prompt).not.toMatch(/\^/);
  });

  it("shows GMAT reference formulas only in review, not during the question", () => {
    const { questions } = getQuestionBankForExam("gmat-focus-readiness-check");
    const discountQuestion = questions.find((question) => question.id.endsWith("-001"));
    const equationQuestion = questions.find((question) => question.id.endsWith("-011"));

    expect(discountQuestion?.formula).toContain("Final Price");
    expect(formulaBelongsOnFront(discountQuestion!)).toBe(false);
    expect(formulaBelongsOnFront(equationQuestion!)).toBe(true);
  });

  it("marks new preview readiness mocks runnable with minimal 10-per-topic banks", () => {
    for (const slug of [
      "epa-608-readiness-check",
      "bms-bas-readiness-check",
      "leed-green-associate-readiness-check",
      "leed-ap-bd-c-readiness-check",
      "well-ap-readiness-check",
      "cem-readiness-check",
      "ashrae-certifications-readiness-check",
      "cdcp-readiness-check",
      "nebosh-readiness-check",
      "cfps-readiness-check",
      "mrics-readiness-check",
      "mrics-quantity-surveying-readiness-check",
      "cfa-level-2-readiness-check",
      "us-citizenship-readiness-check",
    ]) {
      expect(isMockExamRunnable(slug)).toBe(true);
      const { errors } = getQuestionBankForExam(slug);
      expect(errors).toEqual([]);
    }
  });

  it("loads a complete ServSafe Manager bank sourced from deck CSV export", () => {
    const { questions, errors } = getQuestionBankForExam("servsafe-manager-mock");
    expect(errors).toEqual([]);
    expect(questions).toHaveLength(90);
    expect(questions[0]?.sourceNote).toContain("servsafe_manager_300_authored.csv");
  });

  it("loads a complete PTCB bank sourced from deck CSV export", () => {
    const { questions, errors } = getQuestionBankForExam("ptcb-pharmacy-technician-mock");
    expect(errors).toEqual([]);
    expect(questions).toHaveLength(90);
    expect(questions[0]?.sourceNote).toContain("ptcb_pharmacy_tech_300_authored.csv");
  });
});

describe("scoring", () => {
  const sampleQuestions: MockQuestion[] = [
    {
      id: "q1",
      examSlug: "sie-full-mock",
      topicId: "capital-markets",
      prompt: "What is FINRA?",
      options: [
        { id: "a", text: "Correct" },
        { id: "b", text: "Wrong 1" },
        { id: "c", text: "Wrong 2" },
        { id: "d", text: "Wrong 3" },
      ],
      correctOptionId: "a",
      explanation: "Because FINRA is an SRO.",
      distractorExplanations: {
        b: "Not FINRA",
        c: "Not FINRA",
        d: "Not FINRA",
      },
      difficulty: "easy",
      sourceNote: "test",
    },
    {
      id: "q2",
      examSlug: "sie-full-mock",
      topicId: "products-risks",
      prompt: "What is a mutual fund?",
      options: [
        { id: "a", text: "Correct fund" },
        { id: "b", text: "Wrong fund 1" },
        { id: "c", text: "Wrong fund 2" },
        { id: "d", text: "Wrong fund 3" },
      ],
      correctOptionId: "a",
      explanation: "Pooled investment company.",
      distractorExplanations: {
        b: "Wrong",
        c: "Wrong",
        d: "Wrong",
      },
      difficulty: "medium",
      sourceNote: "test",
    },
  ];

  it("returns pass when score clears threshold with no critical topics", () => {
    const report = buildMockReport(
      {
        examSlug: "sie-full-mock",
        attemptSeed: "seed",
        answers: { q1: "a", q2: "a" },
        elapsedSeconds: 4200,
        startedAt: "2026-06-01T10:00:00.000Z",
        completedAt: "2026-06-01T11:10:00.000Z",
      },
      sampleQuestions,
    );

    expect(report.verdict).toBe("PASS");
    expect(report.verdictExplanation).toContain("70%");
  });

  it("shuffles deterministically by attempt seed", () => {
    const first = shuffleQuestions(sampleQuestions, "seed-a").map((question) => question.id);
    const second = shuffleQuestions(sampleQuestions, "seed-a").map((question) => question.id);
    const third = shuffleQuestions(sampleQuestions, "seed-b").map((question) => question.id);

    expect(first).toEqual(second);
    expect(first).not.toEqual(third);
  });

  it("selects a stratified session subset from a larger bank", () => {
    const config = getMockExamConfig("epa-608-readiness-check");
    expect(config).not.toBeNull();

    const bank: MockQuestion[] = [];
    for (const topic of config!.topics) {
      for (let index = 0; index < 25; index += 1) {
        bank.push({
          ...sampleQuestions[0]!,
          id: `${topic.id}-${index}`,
          topicId: topic.id,
        });
      }
    }

    const session = selectSessionQuestions(bank, config!, "attempt-1");
    expect(session).toHaveLength(config!.questionCount);
    for (const topic of config!.topics) {
      expect(session.filter((question) => question.topicId === topic.id)).toHaveLength(
        topic.questionCount ?? 0,
      );
    }
  });

  function buildSatSectionQuestions(topicId: string, count: number): MockQuestion[] {
    return Array.from({ length: count }, (_, index) => ({
      id: `${topicId}-${index}`,
      examSlug: "sat-readiness-check",
      topicId,
      prompt: `${topicId} question ${index}`,
      options: [
        { id: "a", text: "Correct" },
        { id: "b", text: "Wrong 1" },
        { id: "c", text: "Wrong 2" },
        { id: "d", text: "Wrong 3" },
      ],
      correctOptionId: "a",
      explanation: "Correct choice.",
      distractorExplanations: {
        b: "Wrong",
        c: "Wrong",
        d: "Wrong",
      },
      difficulty: "medium" as const,
      sourceNote: "test",
    }));
  }

  function answersWithCorrectCount(questions: MockQuestion[], correctCount: number) {
    const answers: Record<string, string> = {};
    questions.forEach((question, index) => {
      answers[question.id] = index < correctCount ? "a" : "b";
    });
    return answers;
  }

  it("scores Digital SAT borderline when overall clears 70% but one section is below target", () => {
    const rw = buildSatSectionQuestions("reading-and-writing", 20);
    const math = buildSatSectionQuestions("math", 20);
    const questions = [...rw, ...math];
    // RW 90%, Math 65% (below 70% target, not critical), overall 78%
    const answers = {
      ...answersWithCorrectCount(rw, 18),
      ...answersWithCorrectCount(math, 13),
    };

    const report = buildMockReport(
      {
        examSlug: "sat-readiness-check",
        attemptSeed: "sat-borderline",
        answers,
        elapsedSeconds: 3600,
        startedAt: "2026-07-16T10:00:00.000Z",
        completedAt: "2026-07-16T11:00:00.000Z",
      },
      questions,
    );

    expect(report.scorePercent).toBeGreaterThanOrEqual(70);
    expect(report.topicResults.find((topic) => topic.topicId === "math")?.scorePercent).toBeLessThan(70);
    expect(report.verdict).toBe("BORDERLINE RISK");
    expect(report.verdict).not.toBe("READINESS PASS");
  });

  it("scores Digital SAT readiness pass when both sections meet target and overall clears 70%", () => {
    const rw = buildSatSectionQuestions("reading-and-writing", 20);
    const math = buildSatSectionQuestions("math", 20);
    const questions = [...rw, ...math];
    // RW 90%, Math 70%, overall 80%
    const answers = {
      ...answersWithCorrectCount(rw, 18),
      ...answersWithCorrectCount(math, 14),
    };

    const report = buildMockReport(
      {
        examSlug: "sat-readiness-check",
        attemptSeed: "sat-pass",
        answers,
        elapsedSeconds: 3600,
        startedAt: "2026-07-16T10:00:00.000Z",
        completedAt: "2026-07-16T11:00:00.000Z",
      },
      questions,
    );

    expect(report.scorePercent).toBeGreaterThanOrEqual(70);
    expect(report.topicResults.every((topic) => topic.scorePercent >= topic.targetPercent)).toBe(true);
    expect(report.verdict).toBe("READINESS PASS");
  });

  it("scores Digital SAT no pass when overall is below 70%", () => {
    const rw = buildSatSectionQuestions("reading-and-writing", 20);
    const math = buildSatSectionQuestions("math", 20);
    const questions = [...rw, ...math];
    // RW 50%, Math 50%, overall 50%
    const answers = {
      ...answersWithCorrectCount(rw, 10),
      ...answersWithCorrectCount(math, 10),
    };

    const report = buildMockReport(
      {
        examSlug: "sat-readiness-check",
        attemptSeed: "sat-fail",
        answers,
        elapsedSeconds: 3600,
        startedAt: "2026-07-16T10:00:00.000Z",
        completedAt: "2026-07-16T11:00:00.000Z",
      },
      questions,
    );

    expect(report.scorePercent).toBeLessThan(70);
    expect(report.verdict).toBe("NO PASS");
  });
});

describe("access adapter", () => {
  it("unlocks full report on free timed mocks without paid-mock interest capture", () => {
    const access = getMockAccessState("sie-full-mock");
    expect(access?.accessMode).toBe("free_demand_test");
    expect(isFullReportUnlocked(access)).toBe(true);
    expect(access?.interestCaptureEnabled).toBe(false);
    expect(access?.ctaDescription.toLowerCase()).not.toContain("validate demand");
    expect(access?.ctaDescription.toLowerCase()).not.toContain("first 20");
  });
});

describe("llm visibility", () => {
  it("builds facts and markdown for mock exams", () => {
    const config = getMockExamConfig("sie-full-mock");
    expect(config).not.toBeNull();

    const facts = buildMockExamFacts(config!);
    expect(["finance_mock_exam", "practice_test"]).toContain(facts.type);
    expect(facts.linked_deck_slug).toBe("sie-exam-anki-deck");
    expect(String(facts.price).toLowerCase()).toContain("free");
    expect(String(facts.price).toLowerCase()).not.toContain("first 20");
    expect(facts.access_mode).toBe("free_timed_mock");
    expect(String(facts.access_mode)).not.toContain("demand");
    expect(String(facts.pricing_note).toLowerCase()).toContain("buy");
    expect(String(facts.pricing_note).toLowerCase()).not.toContain("validate demand");
    expect(facts.linked_deck_checkout_url).toContain("gumroad.com");
    expect(facts.funnel.linked_deck_checkout_url).toContain("gumroad.com");
    expect(facts.report_features).toContain("weighted topic diagnosis");
    expect(String(facts.question_source).length).toBeGreaterThan(20);

    const markdown = buildMockExamMarkdown(config!);
    expect(markdown).toMatch(/SIE/i);
    expect(markdown).toContain("## Official certification resources");
    expect(markdown).toContain("finra.org");
    expect(markdown).toContain("## Report features");
    expect(markdown).toContain("## Question source");
    expect(markdown).toContain("does not guarantee an exam result");
    expect(markdown).toContain("Access mode: free_timed_mock");
    expect(markdown).not.toContain("free_demand_test");
    expect(facts.verify_at_url).toContain("finra.org");
    expect(facts.official_resources?.length).toBeGreaterThan(0);

    const faqs = buildMockExamFaqs(config!);
    const reportFaq = faqs.find((faq) => faq.question.includes("What does the report show"));
    expect(reportFaq?.answer.toLowerCase()).toContain("gumroad");
    expect(reportFaq?.answer.toLowerCase()).not.toContain("waitlist or deck when available");
  });

  it("exposes every configured mock through LLM facts and markdown", () => {
    for (const config of getAllMockExams()) {
      const facts = buildMockExamFacts(config);
      const markdown = buildMockExamMarkdown(config);

      expect(facts.slug).toBe(config.slug);
      expect(facts.landing_page).toContain(`/mock-exams/${config.slug}`);
      expect(facts.linked_deck_slug).toBe(config.linkedDeckSlug);
      expect(markdown).toContain(`/api/mock-exams/${config.slug}`);
      expect(markdown).toContain("## FAQ");
      expect(markdown).toContain(config.disclaimer.slice(0, 40));
    }
  });

  it("keeps Wave 4 mocks live, runnable, and free-access", () => {
    expect(wave4MockExamConfigs.length).toBe(50);

    for (const config of wave4MockExamConfigs) {
      expect(config.status).toBe("live");
      expect(config.accessMode).toBe("free_demand_test");
      expect(isMockExamRunnable(config.slug)).toBe(true);
      expect(getQuestionBank(config.slug)).toHaveLength(60);
    }

    expect(getAllMockExams().filter((mock) => mock.status === "coming_soon")).toHaveLength(0);
  });

  it("publishes Google-friendly structured data for mock pages", () => {
    const config = getMockExamConfig("cfa-level-1-readiness-check");
    expect(config).not.toBeNull();

    const graph = buildMockExamPageJsonLd(config!)["@graph"];
    const course = graph.find((node) => node["@type"] === "Course");
    const breadcrumb = graph.find((node) => node["@type"] === "BreadcrumbList");

    expect(graph.map((node) => node["@type"])).toEqual([
      "WebPage",
      "Quiz",
      "Course",
      "FAQPage",
      "BreadcrumbList",
    ]);
    expect(course).toMatchObject({
      "@id": "https://uniprep2go.study/mock-exams/cfa-level-1-readiness-check#course",
      isAccessibleForFree: true,
    });
    expect(course?.teaches).toContain("Ethical and Professional Standards");
    expect(buildMockSeoDescription(config!)).toContain("60 timed questions");
    expect(breadcrumb).toMatchObject({
      itemListElement: expect.arrayContaining([
        expect.objectContaining({ position: 1, name: "Home" }),
        expect.objectContaining({ position: 2, name: "US exam practice tests" }),
        expect.objectContaining({ position: 3, name: "Finance credentials" }),
        expect.objectContaining({ position: 4, name: "CFA Level 1 Readiness Check" }),
      ]),
    });
  });

  it("builds GMAT markdown with citable exam facts before the FAQ", () => {
    const config = getMockExamConfig("gmat-focus-readiness-check");
    expect(config).not.toBeNull();

    const markdown = buildMockExamMarkdown(config!);
    expect(markdown).toContain("Graduate Management Admission Test (GMAT)");
    expect(markdown).toContain("205–805");
    expect(buildMockExamFacts(config!).runnable).toBe(true);
  });

  it("builds EPA 608 markdown with citable exam facts before the FAQ", () => {
    const config = getMockExamConfig("epa-608-readiness-check");
    expect(config).not.toBeNull();

    const markdown = buildMockExamMarkdown(config!);
    expect(markdown).toContain("EPA Section 608 Technician Certification");
    expect(markdown).toContain("18 of 25");
    expect(buildMockExamFacts(config!).runnable).toBe(true);
  });

  it("builds BMS markdown with citable exam facts before the FAQ", () => {
    const config = getMockExamConfig("bms-bas-readiness-check");
    expect(config).not.toBeNull();

    const markdown = buildMockExamMarkdown(config!);
    expect(markdown).toContain("Building Automation System (BAS / BMS)");
    expect(markdown).toContain("BACnet");
    expect(buildMockExamFacts(config!).runnable).toBe(true);
  });

  it("builds LEED and CEM markdown with citable exam facts", () => {
    const leedGa = getMockExamConfig("leed-green-associate-readiness-check")!;
    expect(buildMockExamMarkdown(leedGa)).toContain("LEED Green Associate");
    expect(buildMockExamMarkdown(leedGa)).toContain("170");

    const leedAp = getMockExamConfig("leed-ap-bd-c-readiness-check")!;
    expect(buildMockExamMarkdown(leedAp)).toContain("Building Design + Construction");

    const wellAp = getMockExamConfig("well-ap-readiness-check")!;
    expect(buildMockExamMarkdown(wellAp)).toContain("WELL Accredited Professional");
    expect(buildMockExamMarkdown(wellAp)).toContain("170");
    expect(buildMockExamFacts(wellAp).runnable).toBe(true);

    const cem = getMockExamConfig("cem-readiness-check")!;
    expect(buildMockExamMarkdown(cem)).toContain("Certified Energy Manager (CEM)");
    expect(buildMockExamMarkdown(cem)).toContain("700");
    expect(buildMockExamFacts(cem).runnable).toBe(true);

    const ashrae = getMockExamConfig("ashrae-certifications-readiness-check")!;
    expect(buildMockExamMarkdown(ashrae)).toContain("ASHRAE Personnel Certification");
    expect(buildMockExamMarkdown(ashrae)).toContain("BCxP");
    expect(buildMockExamFacts(ashrae).runnable).toBe(true);

    const cdcp = getMockExamConfig("cdcp-readiness-check")!;
    expect(cdcp.questionCount).toBe(40);
    expect(cdcp.durationMinutes).toBe(60);
    expect(cdcp.topics.reduce((sum, topic) => sum + (topic.questionCount ?? 0), 0)).toBe(40);
    expect(buildMockExamMarkdown(cdcp)).toContain("Certified Data Centre Professional");
    expect(buildMockExamMarkdown(cdcp)).toContain("68%");
    expect(buildMockExamFacts(cdcp).runnable).toBe(true);

    const nebosh = getMockExamConfig("nebosh-readiness-check")!;
    expect(buildMockExamMarkdown(nebosh)).toContain("NEBOSH");
    expect(buildMockExamMarkdown(nebosh)).toContain("GIC1");
    expect(buildMockExamFacts(nebosh).runnable).toBe(true);

    const cfps = getMockExamConfig("cfps-readiness-check")!;
    expect(buildMockExamMarkdown(cfps)).toContain("Certified Fire Protection Specialist");
    expect(buildMockExamMarkdown(cfps)).toContain("Fire Suppression");
    expect(buildMockExamFacts(cfps).runnable).toBe(true);

    const mrics = getMockExamConfig("mrics-readiness-check")!;
    expect(buildMockExamMarkdown(mrics)).toContain("Assessment of Professional Competence");
    expect(buildMockExamMarkdown(mrics)).toContain("MRICS");
    expect(buildMockExamFacts(mrics).runnable).toBe(true);

    const mricsQs = getMockExamConfig("mrics-quantity-surveying-readiness-check")!;
    expect(buildMockExamMarkdown(mricsQs)).toContain("Quantity Surveying");
    expect(buildMockExamMarkdown(mricsQs)).toContain("Commercial Management");
    expect(buildMockExamFacts(mricsQs).runnable).toBe(true);
  });
});
