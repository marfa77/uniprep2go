import { describe, expect, it } from "vitest";
import { getMockAccessState, isFullReportUnlocked } from "./access";
import { getAllMockExams, getMockExamConfig, primaryMock, validateMockExamConfig } from "./configs";
import { buildMockExamFacts, buildMockExamMarkdown, buildMockExamPageJsonLd } from "./llm";
import { buildMockSeoDescription } from "./seo";
import { getQuestionBankForExam, isMockExamRunnable, validateQuestionBank } from "./question-bank";
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
    for (const config of getAllMockExams()) {
      const deck = getCatalogDeckBySlug(config.linkedDeckSlug);
      expect(deck?.category, config.slug).not.toBe("language");
    }
  });

  it("defines SIE topic counts that sum to 75", () => {
    const config = getMockExamConfig("sie-full-mock");
    expect(config?.questionCount).toBe(75);
    expect(config?.topics.reduce((sum, topic) => sum + (topic.questionCount ?? 0), 0)).toBe(75);
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
      const { questions } = getQuestionBankForExam(config.slug);
      if (questions.length === 0) {
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

      expect(correctPositions.size).toBeGreaterThanOrEqual(3);
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
  it("unlocks full report during free demand test", () => {
    const access = getMockAccessState("sie-full-mock");
    expect(access?.accessMode).toBe("free_demand_test");
    expect(isFullReportUnlocked(access)).toBe(true);
    expect(access?.interestCaptureEnabled).toBe(true);
  });
});

describe("llm visibility", () => {
  it("builds facts and markdown for mock exams", () => {
    const config = getMockExamConfig("sie-full-mock");
    expect(config).not.toBeNull();

    const facts = buildMockExamFacts(config!);
    expect(facts.type).toBe("finance_mock_exam");
    expect(facts.linked_deck_slug).toBe("sie-exam-anki-deck");
    expect(facts.price).toContain("Free for first 20 mock starts");
    expect(facts.report_features).toContain("weighted topic diagnosis");
    expect(facts.question_source).toContain("not AI-generated from scratch");

    const markdown = buildMockExamMarkdown(config!);
    expect(markdown).toContain("FINRA SIE Full Mock Exam");
    expect(markdown).toContain("## Report features");
    expect(markdown).toContain("## Question source");
    expect(markdown).toContain("does not guarantee an exam result");
  });

  it("exposes every configured mock through LLM facts and markdown", () => {
    for (const config of getAllMockExams()) {
      const facts = buildMockExamFacts(config);
      const markdown = buildMockExamMarkdown(config);

      expect(facts.slug).toBe(config.slug);
      expect(facts.landing_page).toContain(`/mock-exams/${config.slug}`);
      expect(facts.linked_deck_slug).toBe(config.linkedDeckSlug);
      expect(markdown).toContain(`# ${config.title}`);
      expect(markdown).toContain(`/api/mock-exams/${config.slug}`);
      expect(markdown).toContain("drill the linked deck before retaking");
    }
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
        expect.objectContaining({ position: 3, name: "CFA Level 1 Readiness Check" }),
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
