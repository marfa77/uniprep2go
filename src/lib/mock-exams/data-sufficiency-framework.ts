/** Shared answer-choice instructions for GMAT-style Data Sufficiency items. */
export const DATA_SUFFICIENCY_ANSWER_FRAMEWORK =
  "(For all Data Sufficiency questions, use the following answer framework: (a) Statement (1) ALONE is sufficient, but statement (2) alone is not sufficient. (b) Statement (2) ALONE is sufficient, but statement (1) alone is not sufficient. (c) BOTH statements TOGETHER are sufficient, but neither statement alone is sufficient. (d) NEITHER statement alone NOR both statements together are sufficient to answer the question.)";

export function buildDataSufficiencyPrompt(questionStem: string, statements: string[]) {
  const statementBlock = statements.map((statement, index) => `(${index + 1}) ${statement}`).join("\n");
  return `${questionStem}\n\n${statementBlock}\n\n${DATA_SUFFICIENCY_ANSWER_FRAMEWORK}`;
}
