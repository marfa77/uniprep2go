import type { MockExamConfig } from "../types";
import type { EditorialWeightRow } from "./types";

export type ResolvedWeightRow = {
  session: "1" | "2";
  displayLabel: string;
  officialWeight: string;
  priorOfficialWeight?: string;
  questionsOnCheck: number | null;
};

function normalizeLabel(label: string): string {
  return label.trim().toLowerCase().replace(/\s+/g, " ");
}

export function resolveWeightTableQuestions(
  rows: EditorialWeightRow[],
  config: MockExamConfig,
): ResolvedWeightRow[] {
  const topics = config.topics;
  const usedTopicIds = new Set<string>();

  return rows.map((row) => {
    const aliasSet = new Set(row.labelAliases.map(normalizeLabel));
    let matched = topics.find((topic) => row.topicIds.includes(topic.id));
    if (!matched) {
      matched = topics.find(
        (topic) => !usedTopicIds.has(topic.id) && aliasSet.has(normalizeLabel(topic.label)),
      );
    }
    if (matched) {
      usedTopicIds.add(matched.id);
    }

    const displayLabel = row.labelAliases[0];

    return {
      session: row.session,
      displayLabel: matched?.label ?? displayLabel,
      officialWeight: row.officialWeight,
      priorOfficialWeight: row.priorOfficialWeight,
      questionsOnCheck: matched?.questionCount ?? null,
    };
  });
}