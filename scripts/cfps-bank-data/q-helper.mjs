export const ANSWERS = ["a", "b", "c", "d"];

export function q(prompt, correct, wrong, explanation, distractors, difficulty = "medium", correctId = "a") {
  const options = ANSWERS.map((id) => ({
    id,
    text: id === correctId ? correct : wrong[ANSWERS.filter((x) => x !== correctId).indexOf(id)],
  }));
  const wrongIds = ANSWERS.filter((id) => id !== correctId);
  const fallbackPool = Object.entries(distractors)
    .filter(([key]) => key !== correctId)
    .map(([, value]) => value);
  const distractorExplanations = {};
  for (let i = 0; i < wrongIds.length; i++) {
    const id = wrongIds[i];
    distractorExplanations[id] =
      distractors[id] ??
      fallbackPool[i] ??
      "Incorrect. This option does not reflect accepted fire protection practice.";
  }
  return { prompt, options, correctOptionId: correctId, explanation, distractorExplanations, difficulty };
}

export function rot(i) {
  return ANSWERS[i % 4];
}
