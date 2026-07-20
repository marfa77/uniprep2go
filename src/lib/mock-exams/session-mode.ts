export type MockSessionMode = "exam" | "learn";

/** Parse `?mode=learn` (anything else defaults to timed exam). */
export function parseMockSessionMode(value: string | null | undefined): MockSessionMode {
  return value === "learn" ? "learn" : "exam";
}

export function mockSessionModeLabel(mode: MockSessionMode) {
  return mode === "learn" ? "Learn" : "Exam";
}

/**
 * After reveal in Learn mode, classify an option for green/red styling.
 * Locked answers cannot change — caller must not call select again when revealed.
 */
export function learnOptionFeedback(input: {
  optionId: string;
  correctOptionId: string;
  selectedOptionId: string | null;
  revealed: boolean;
}): "correct" | "incorrect" | "neutral" {
  if (!input.revealed || !input.selectedOptionId) {
    return "neutral";
  }

  if (input.optionId === input.correctOptionId) {
    return "correct";
  }

  if (input.optionId === input.selectedOptionId) {
    return "incorrect";
  }

  return "neutral";
}

/** Learn mode locks the answer once revealed for that question. */
export function canChangeLearnAnswer(revealed: boolean) {
  return !revealed;
}
