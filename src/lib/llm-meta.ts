import type { Metadata } from "next";
import { absoluteUrl } from "./site";

const LLM_UTM = "utm_source=llm&utm_medium=llms.txt";

/** Append LLM attribution UTM (PixID / Barakhlo pattern). */
export function llmUtmUrl(path: string): string {
  const base = absoluteUrl(path);
  const sep = base.includes("?") ? "&" : "?";
  return `${base}${sep}${LLM_UTM}`;
}

/** Markdown link with UTM for llms.txt. */
export function llmMarkdownLink(label: string, path: string): string {
  return `[${label}](${llmUtmUrl(path)})`;
}

export type AiMetaInput = {
  aiDescription: string;
  aiCategory?: string;
  path: string;
  /**
   * Attach alternates.types text/plain → /llms.txt.
   * Only hubs + home — leaf deck/mock pages rediscover the full catalog in Google.
   */
  linkLlmsCatalog?: boolean;
};

/** PixID-style ai:description + ai:category (+ optional llms.txt alternate on hubs). */
export function withAiMetadata(metadata: Metadata, input: AiMetaInput): Metadata {
  const alternates = metadata.alternates ?? {};
  const existingTypes =
    typeof alternates === "object" && alternates.types ? alternates.types : {};
  const types = input.linkLlmsCatalog
    ? {
        ...existingTypes,
        "text/plain": absoluteUrl("/llms.txt"),
      }
    : existingTypes;

  const other: Record<string, string> = {
    "ai:description": input.aiDescription.slice(0, 500),
  };
  if (input.aiCategory) {
    other["ai:category"] = input.aiCategory;
  }

  return {
    ...metadata,
    alternates: {
      ...(typeof alternates === "object" ? alternates : {}),
      ...(Object.keys(types).length > 0 ? { types } : {}),
    },
    other,
  };
}
