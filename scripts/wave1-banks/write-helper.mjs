const ANSWERS = ["a", "b", "c", "d"];
export const SOURCE_NOTE = "Original UniPrep2Go local bank (Wave 1).";

/** @param {number} i 0-based index */
export function rot(i) {
  return ANSWERS[i % 4];
}

/**
 * @param {string} examSlug
 * @param {string} topicId
 * @param {number} n 1-based
 * @param {[string, string, string[], string, string[], string]} row
 *   [prompt, correct, wrongs[3], explanation, distractorNotes[3], difficulty]
 * @param {string} [correctId]
 */
export function makeQ(examSlug, topicId, n, row, correctId = "a") {
  const [prompt, correct, wrongs, explanation, distNotes, difficulty] = row;
  if (wrongs.length !== 3 || distNotes.length !== 3) {
    throw new Error(`Bad row ${examSlug} ${topicId} ${n}`);
  }
  const wrongIds = ANSWERS.filter((id) => id !== correctId);
  const options = ANSWERS.map((id) => ({
    id,
    text: id === correctId ? correct : wrongs[wrongIds.indexOf(id)],
  }));
  const distractorExplanations = {};
  wrongIds.forEach((id, i) => {
    distractorExplanations[id] = distNotes[i];
  });
  const num = String(n).padStart(3, "0");
  return {
    id: `${examSlug}-${topicId}-${num}`,
    examSlug,
    topicId,
    prompt,
    options,
    correctOptionId: correctId,
    explanation,
    distractorExplanations,
    difficulty,
    sourceNote: SOURCE_NOTE,
  };
}

/** Wave 1 session banks: 4 topics × 10 questions = 40. */
export function buildBank(examSlug, topics, perTopic = 10) {
  /** @type {any[]} */
  const out = [];
  const topicIds = Object.keys(topics);
  if (topicIds.length === 0) throw new Error(`${examSlug}: no topics`);
  for (const topicId of topicIds) {
    const rows = topics[topicId];
    if (rows.length !== perTopic) {
      throw new Error(`${examSlug}/${topicId}: expected ${perTopic}, got ${rows.length}`);
    }
    rows.forEach((row, i) => {
      out.push(makeQ(examSlug, topicId, i + 1, row, rot(i)));
    });
  }
  const expectedTotal = perTopic * topicIds.length;
  if (out.length !== expectedTotal) {
    throw new Error(`${examSlug}: expected ${expectedTotal}, got ${out.length}`);
  }
  return out;
}
