import { isLlmUtm } from "./traffic-attribution";

export type TrafficChannel = "google" | "chatgpt" | "llm" | "direct" | "other";

export type TrafficChannelOptions = {
  utmSource?: string;
  utmMedium?: string;
};

export const TRAFFIC_CHANNELS: TrafficChannel[] = [
  "google",
  "chatgpt",
  "llm",
  "direct",
  "other",
];

function hostnameFromReferrer(referrer: string) {
  let host = referrer.trim().toLowerCase();

  try {
    host = new URL(referrer).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    host = referrer.toLowerCase();
  }

  return host;
}

function isLlmReferrerHost(host: string) {
  return (
    host === "perplexity.ai" ||
    host.endsWith(".perplexity.ai") ||
    host === "claude.ai" ||
    host.endsWith(".claude.ai") ||
    host === "gemini.google.com" ||
    host === "copilot.microsoft.com" ||
    host === "you.com" ||
    host.endsWith(".you.com") ||
    host === "phind.com" ||
    host.endsWith(".phind.com")
  );
}

export function classifyTrafficChannel(
  referrer: string | undefined,
  options: TrafficChannelOptions = {},
): TrafficChannel {
  if (isLlmUtm(options.utmSource, options.utmMedium)) {
    return "llm";
  }

  if (!referrer?.trim()) {
    return "direct";
  }

  const host = hostnameFromReferrer(referrer);

  if (host.includes("google.") && host !== "gemini.google.com") {
    return "google";
  }

  if (
    host === "chatgpt.com" ||
    host.endsWith(".chatgpt.com") ||
    host === "chat.openai.com" ||
    host.endsWith(".openai.com")
  ) {
    return "chatgpt";
  }

  if (isLlmReferrerHost(host)) {
    return "llm";
  }

  if (host === "direct" || host === "none") {
    return "direct";
  }

  return "other";
}

export const trafficChannelLabels: Record<TrafficChannel, string> = {
  google: "Google",
  chatgpt: "ChatGPT",
  llm: "LLM",
  direct: "Direct",
  other: "Other",
};

export function emptyChannelCounts(): Record<TrafficChannel, number> {
  return {
    google: 0,
    chatgpt: 0,
    llm: 0,
    direct: 0,
    other: 0,
  };
}
