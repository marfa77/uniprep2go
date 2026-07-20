import { describe, expect, it } from "vitest";
import {
  canChangeLearnAnswer,
  countMockStartsByMode,
  learnOptionFeedback,
  parseMockSessionMode,
  parseMockSessionModeFromSource,
} from "./session-mode";

describe("mock session mode", () => {
  it("defaults to exam unless mode=learn", () => {
    expect(parseMockSessionMode(undefined)).toBe("exam");
    expect(parseMockSessionMode(null)).toBe("exam");
    expect(parseMockSessionMode("exam")).toBe("exam");
    expect(parseMockSessionMode("LEARN")).toBe("exam");
    expect(parseMockSessionMode("learn")).toBe("learn");
  });

  it("parses Exam vs Learn from funnel source strings", () => {
    expect(parseMockSessionModeFromSource("mock:epa-608-readiness-check:start:exam")).toBe(
      "exam",
    );
    expect(parseMockSessionModeFromSource("mock:epa-608-readiness-check:start:learn")).toBe(
      "learn",
    );
    expect(
      parseMockSessionModeFromSource("mock:epa-608-readiness-check:start:learn:deeplink"),
    ).toBe("learn");
    expect(parseMockSessionModeFromSource("mock:epa-608-readiness-check:start")).toBe("exam");
    expect(parseMockSessionModeFromSource("mock:epa-608-readiness-check:landing")).toBeUndefined();
    expect(
      countMockStartsByMode({
        "mock:a:start:exam": 3,
        "mock:b:start:learn": 2,
        "mock:c:start": 1,
        "mock:d:landing": 9,
      }),
    ).toEqual({ exam: 4, learn: 2, total: 6 });
  });

  it("locks learn answers after reveal", () => {
    expect(canChangeLearnAnswer(false)).toBe(true);
    expect(canChangeLearnAnswer(true)).toBe(false);
  });

  it("marks correct green and selected wrong red after reveal", () => {
    expect(
      learnOptionFeedback({
        optionId: "b",
        correctOptionId: "b",
        selectedOptionId: "a",
        revealed: true,
      }),
    ).toBe("correct");

    expect(
      learnOptionFeedback({
        optionId: "a",
        correctOptionId: "b",
        selectedOptionId: "a",
        revealed: true,
      }),
    ).toBe("incorrect");

    expect(
      learnOptionFeedback({
        optionId: "c",
        correctOptionId: "b",
        selectedOptionId: "a",
        revealed: true,
      }),
    ).toBe("neutral");

    expect(
      learnOptionFeedback({
        optionId: "a",
        correctOptionId: "b",
        selectedOptionId: "a",
        revealed: false,
      }),
    ).toBe("neutral");
  });

  it("keeps exam path semantics separate from learn feedback helpers", () => {
    // Exam mode never uses learnOptionFeedback for styling before submit;
    // helper stays neutral when not revealed so exam UI is unaffected.
    expect(
      learnOptionFeedback({
        optionId: "a",
        correctOptionId: "a",
        selectedOptionId: "a",
        revealed: false,
      }),
    ).toBe("neutral");
  });
});
