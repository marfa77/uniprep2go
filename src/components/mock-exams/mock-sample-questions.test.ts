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
    explanation: "Because A is correct.",
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
});
