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
};

/** PixID-style ai:description + ai:category + llms.txt alternate. */
export function withAiMetadata(metadata: Metadata, input: AiMetaInput): Metadata {
  const llmsTxtUrl = absoluteUrl("/llms.txt");
  const alternates = metadata.alternates ?? {};
  const types = {
    ...(typeof alternates === "object" && alternates.types ? alternates.types : {}),
    "text/plain": llmsTxtUrl,
  };

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
      types,
    },
    other,
  };
}
