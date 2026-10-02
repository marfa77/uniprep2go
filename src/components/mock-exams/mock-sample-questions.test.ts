import { describe, expect, it } from "vitest";
import { pickMockSampleQuestions } from "@/components/mock-exams/mock-sample-questions";
import type { MockQuestion } from "@/lib/mock-exams/types";

function q(partial: Partial<MockQuestion> & Pick<MockQuestion, "id" | "prompt" | "topicId">): MockQuestion {
  return {
    examSlug: "demo",
    options: [
      { id: "a", text: "Long enough option text A for scoring" },
      { id: "b", text: "Long enough option text B for scoring" },
      { id: "c", text: "Long enough option text C for scoring" },
      { id: "d", text: "Long enough option text D for scoring" },
    ],
    correctOptionId: "a",
    explanation: "A is correct because the rule applies to this scenario; the others misstate it.",
    distractorExplanations: {
      b: "B is wrong.",
      c: "C is wrong.",
      d: "D is wrong.",
    },
    difficulty: "medium",
    sourceNote: "test",
    ...partial,
  };
}

describe("pickMockSampleQuestions", () => {
  it("prefers longer scenario stems over thin What is drills", () => {
    const questions = [
      q({ id: "1", topicId: "a", prompt: "What is beta?" }),
      q({
        id: "2",
        topicId: "b",
        prompt:
          "If a client account shows excessive trading relative to objectives, which sales practice concern is most likely?",
      }),
      q({ id: "3", topicId: "c", prompt: "What is an ETF?" }),
      q({
        id: "4",
        topicId: "d",
        prompt:
          "When opening a margin account, which document set is typically required before extending margin privileges?",
      }),
      q({ id: "5", topicId: "e", prompt: "What is FINRA?" }),
      q({
        id: "6",
        topicId: "f",
        prompt:
          "A representative posts performance results that omit material fees. Which advertising issue is most accurate?",
      }),
    ];

    const samples = pickMockSampleQuestions(questions, 3);
    expect(samples).toHaveLength(3);
    expect(samples.every((item) => !/^What is\b/i.test(item.prompt))).toBe(true);
    expect(new Set(samples.map((item) => item.topicId)).size).toBe(3);
  });

  it("drops template, drill, and thin-explanation items before picking", () => {
    const scenario =
      "A customer asks a representative which account feature fits a short horizon. Which answer is most accurate?";
    const questions = [
      q({ id: "t", topicId: "a", prompt: `${scenario} (template)`, explanation: "The correct choice (A) matches this rule." }),
      q({ id: "d", topicId: "b", prompt: `${scenario} (Drill 2)` }),
      q({ id: "e", topicId: "c", prompt: `${scenario} (thin)`, explanation: "A." }),
      q({ id: "ok", topicId: "d", prompt: scenario }),
    ];
    expect(pickMockSampleQuestions(questions, 3).map((item) => item.id)).toEqual(["ok"]);
  });

  it("is seeded: stable for the same bank, random among the top pool across seeds", () => {
    const questions = Array.from({ length: 40 }, (_, i) =>
      q({
        id: String(i),
        topicId: `t${i}`,
        prompt: `A client in case ${i} asks a representative about suitability rule ${i}. Which response is most accurate here?`,
      }),
    );
    const first = pickMockSampleQuestions(questions, 5, "demo").map((item) => item.id);
    expect(pickMockSampleQuestions(questions, 5, "demo").map((item) => item.id)).toEqual(first);
    const seeds = ["a", "b", "c", "d", "e", "f"].map((seed) =>
      pickMockSampleQuestions(questions, 5, seed).map((item) => item.id).join(","),
    );
    expect(new Set(seeds).size).toBeGreaterThan(1);
  });
});
