export type TrafficChannel = "google" | "chatgpt" | "direct" | "other";

export function classifyTrafficChannel(referrer: string | undefined): TrafficChannel {
  if (!referrer?.trim()) {
    return "direct";
  }

  let host = referrer.trim().toLowerCase();

  try {
    host = new URL(referrer).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    host = referrer.toLowerCase();
  }

  if (host.includes("google.")) {
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

  if (host === "direct" || host === "none") {
    return "direct";
  }

  return "other";
}

export const trafficChannelLabels: Record<TrafficChannel, string> = {
  google: "Google",
  chatgpt: "ChatGPT",
  direct: "Direct",
  other: "Other",
};
