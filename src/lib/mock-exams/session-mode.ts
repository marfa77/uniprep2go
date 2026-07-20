export type MockSessionMode = "exam" | "learn";

/** Parse `?mode=learn` (anything else defaults to timed exam). */
export function parseMockSessionMode(value: string | null | undefined): MockSessionMode {
  return value === "learn" ? "learn" : "exam";
}

export function mockSessionModeLabel(mode: MockSessionMode) {
  return mode === "learn" ? "Learn" : "Exam";
}

/**
 * Infer session mode from funnel `source` strings like
 * `mock:{slug}:start:learn`, `mock:{slug}:start:exam`, `mock:{slug}:complete:learn`.
 * Legacy `mock:{slug}:start` (no mode segment) counts as exam.
 */
export function parseMockSessionModeFromSource(
  source: string | null | undefined,
): MockSessionMode | undefined {
  if (!source || !source.startsWith("mock:")) {
    return undefined;
  }

  if (
    source.includes(":start:learn") ||
    source.includes(":complete:learn") ||
    /:learn:(verdict|pass|no_pass|consumed)/.test(source)
  ) {
    return "learn";
  }

  if (
    source.includes(":start:exam") ||
    source.includes(":complete:exam") ||
    /:exam:(verdict|pass|no_pass)/.test(source)
  ) {
    return "exam";
  }

  if (/:start$/.test(source)) {
    return "exam";
  }

  return undefined;
}

/** Count mock_started-style sources split by Exam vs Learn. */
export function countMockStartsByMode(bySource: Record<string, number>) {
  let exam = 0;
  let learn = 0;

  for (const [source, count] of Object.entries(bySource)) {
    if (!source.includes(":start")) {
      continue;
    }
    const mode = parseMockSessionModeFromSource(source);
    if (mode === "learn") {
      learn += count;
    } else if (mode === "exam") {
      exam += count;
    }
  }

  return { exam, learn, total: exam + learn };
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
