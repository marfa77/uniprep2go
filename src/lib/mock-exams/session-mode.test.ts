import { describe, expect, it } from "vitest";
import {
  canChangeLearnAnswer,
  learnOptionFeedback,
  parseMockSessionMode,
} from "./session-mode";

describe("mock session mode", () => {
  it("defaults to exam unless mode=learn", () => {
    expect(parseMockSessionMode(undefined)).toBe("exam");
    expect(parseMockSessionMode(null)).toBe("exam");
    expect(parseMockSessionMode("exam")).toBe("exam");
    expect(parseMockSessionMode("LEARN")).toBe("exam");
    expect(parseMockSessionMode("learn")).toBe("learn");
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
