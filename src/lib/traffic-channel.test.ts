import { describe, expect, it } from "vitest";
import { classifyTrafficChannel } from "./traffic-channel";

describe("traffic channel", () => {
  it("classifies google, chatgpt, direct, and other referrers", () => {
    expect(classifyTrafficChannel(undefined)).toBe("direct");
    expect(classifyTrafficChannel("")).toBe("direct");
    expect(classifyTrafficChannel("https://www.google.com/search?q=cfa")).toBe("google");
    expect(classifyTrafficChannel("https://chatgpt.com/")).toBe("chatgpt");
    expect(classifyTrafficChannel("https://chat.openai.com/")).toBe("chatgpt");
    expect(classifyTrafficChannel("https://perplexity.ai/")).toBe("other");
  });
});
