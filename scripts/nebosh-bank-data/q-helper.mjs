export const ANSWERS = ["a", "b", "c", "d"];

export function q(prompt, correct, wrong, explanation, distractors, difficulty = "medium", correctId = "a") {
  const options = ANSWERS.map((id) => ({
    id,
    text: id === correctId ? correct : wrong[ANSWERS.filter((x) => x !== correctId).indexOf(id)],
  }));
  const distractorExplanations = {};
  const wrongIds = ANSWERS.filter((x) => x !== correctId);
  const canonicalKeys = ["b", "c", "d"];
  wrongIds.forEach((id, i) => {
    const canonical = canonicalKeys[i];
    distractorExplanations[id] =
      distractors[id] ??
      distractors[canonical] ??
      (Array.isArray(distractors) ? distractors[i] : undefined) ??
      "This option does not best address the scenario described.";
  });
  return { prompt, options, correctOptionId: correctId, explanation, distractorExplanations, difficulty };
}

export function rot(i) {
  return ANSWERS[i % 4];
}
