import formulaReference from "../../scripts/formula-reference/cfa-level-2-2026.json";

export type CfaL2PreviewFormula = {
  id: string;
  topicKey: string;
  topicLabel: string;
  name: string;
  latex: string;
  vars?: string;
  use: string;
};

const TOPIC_LABELS: Record<string, string> = {
  QM: "Quantitative Methods",
  ECO: "Economics",
  FSA: "Financial Statement Analysis",
  CI: "Corporate Finance",
  EV: "Equities",
  FI: "Fixed Income",
  DI: "Derivatives and Risk Management",
  AI: "Alternative Investments",
  PM: "Portfolio Construction",
  ETH: "Ethical and Professional Standards",
};

/** Two preview formulas per CFA Level 2 topic (~20 total) from the 2026-curriculum sheet JSON. */
export function getCfaLevel2FormulaPreview(): CfaL2PreviewFormula[] {
  const preview: CfaL2PreviewFormula[] = [];
  const topicOrder = Object.keys(TOPIC_LABELS);

  for (const topicKey of topicOrder) {
    const topic = formulaReference.topics[topicKey as keyof typeof formulaReference.topics];
    if (!topic) continue;

    if ("formulas" in topic && topic.formulas?.length) {
      const picks = topic.formulas.slice(0, 3);
      for (const row of picks) {
        preview.push({
          id: row.id,
          topicKey,
          topicLabel: TOPIC_LABELS[topicKey] ?? topicKey,
          name: row.name,
          latex: row.latex,
          vars: "vars" in row && row.vars ? row.vars : undefined,
          use: row.use,
        });
      }
      continue;
    }

    const ethicsStandards =
      "standards" in topic
        ? (topic.standards as Array<{ code: string; name: string; requires: string }>)
        : undefined;
    if (ethicsStandards?.length) {
      for (const row of ethicsStandards.slice(0, 2)) {
        preview.push({
          id: `eth-${row.code}`,
          topicKey,
          topicLabel: TOPIC_LABELS[topicKey] ?? topicKey,
          name: `${row.code}: ${row.name}`,
          latex: row.requires,
          use: "Ethics application recall — not a numeric formula; tested in item-set judgment.",
        });
      }
    }
  }

  return preview;
}

export const CFA_LEVEL_2_OFFICIAL_TOPIC_WEIGHTS: Array<{ topic: string; weight: string }> = [
  { topic: "Quantitative Methods", weight: "5–10%" },
  { topic: "Economics", weight: "5–10%" },
  { topic: "Financial Statement Analysis", weight: "10–15%" },
  { topic: "Corporate Finance", weight: "5–10%" },
  { topic: "Equities", weight: "10–15%" },
  { topic: "Fixed Income", weight: "10–15%" },
  { topic: "Derivatives and Risk Management", weight: "5–10%" },
  { topic: "Alternative Investments", weight: "5–10%" },
  { topic: "Portfolio Construction", weight: "10–15%" },
  { topic: "Ethical and Professional Standards", weight: "10–15%" },
];