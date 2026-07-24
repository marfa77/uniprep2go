export function makeQ(prompt, correct, wrongReasons, explanation, difficulty = "medium", correctId = "a") {
  const ids = ["a", "b", "c", "d"];
  const wrongIds = ids.filter((id) => id !== correctId);
  const options = ids.map((id) => ({
    id,
    text: id === correctId ? correct : wrongReasons[wrongIds.indexOf(id)].text,
  }));
  const distractorExplanations = Object.fromEntries(
    wrongIds.map((id, i) => [id, wrongReasons[i].why])
  );
  return { prompt, options, correctOptionId: correctId, explanation, distractorExplanations, difficulty };
}

export function toBatch(topicId, questions) {
  return questions.map((q) => ({
    topicId,
    prompt: q.prompt,
    options: q.options,
    correctOptionId: q.correctOptionId,
    explanation: q.explanation,
    distractorExplanations: q.distractorExplanations,
    difficulty: q.difficulty,
  }));
}
