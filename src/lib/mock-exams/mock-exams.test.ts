import { describe, expect, it } from "vitest";
import { getMockAccessState, isFullReportUnlocked } from "./access";
import { getAllMockExams, getMockExamConfig, validateMockExamConfig } from "./configs";
import { buildMockExamFacts, buildMockExamMarkdown, buildMockExamPageJsonLd } from "./llm";
import { buildMockSeoDescription } from "./seo";
import { getQuestionBankForExam, isMockExamRunnable, validateQuestionBank } from "./question-bank";
import { buildMockReport, shuffleQuestions } from "./scoring";
import type { MockQuestion } from "./types";

describe("mock exam configs", () => {
  it("validates all finance mock configs", () => {
    for (const config of getAllMockExams()) {
      expect(validateMockExamConfig(config)).toEqual([]);
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
    expect(isMockExamRunnable("cfa-level-1-readiness-check")).toBe(true);
    expect(isMockExamRunnable("frm-part-1-readiness-check")).toBe(true);
  });

  it("loads a complete ServSafe Manager bank sourced from deck CSV export", () => {
    const { questions, errors } = getQuestionBankForExam("servsafe-manager-mock");
    expect(errors).toEqual([]);
    expect(questions).toHaveLength(90);
    expect(questions[0]?.sourceNote).toContain("servsafe_manager_300_authored.csv");
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
      expect(markdown).toContain("recommended remediation path");
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
      "Course",
      "FAQPage",
      "BreadcrumbList",
    ]);
    expect(course).toMatchObject({
      "@id": "https://www.uniprep2go.study/mock-exams/cfa-level-1-readiness-check#course",
      isAccessibleForFree: true,
    });
    expect(course?.teaches).toContain("Ethical and Professional Standards");
    expect(buildMockSeoDescription(config!)).toContain("60 timed questions");
    expect(breadcrumb).toMatchObject({
      itemListElement: expect.arrayContaining([
        expect.objectContaining({ position: 1, name: "Home" }),
        expect.objectContaining({ position: 2, name: "Finance mock exams" }),
        expect.objectContaining({ position: 3, name: "CFA Level 1 Readiness Check" }),
      ]),
    });
  });
});
