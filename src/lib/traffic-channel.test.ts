import { describe, expect, it } from "vitest";
import { classifyTrafficChannel } from "./traffic-channel";

describe("traffic channel", () => {
  it("classifies google, chatgpt, direct, and other referrers", () => {
    expect(classifyTrafficChannel(undefined)).toBe("direct");
    expect(classifyTrafficChannel("")).toBe("direct");
    expect(classifyTrafficChannel("https://www.google.com/search?q=cfa")).toBe("google");
    expect(classifyTrafficChannel("https://chatgpt.com/")).toBe("chatgpt");
    expect(classifyTrafficChannel("https://chat.openai.com/")).toBe("chatgpt");
    expect(classifyTrafficChannel("https://bing.com/")).toBe("other");
  });

  it("classifies llm from utm even when referrer is empty", () => {
    expect(
      classifyTrafficChannel(undefined, {
        utmSource: "llm",
        utmMedium: "llms.txt",
      }),
    ).toBe("llm");
    expect(
      classifyTrafficChannel("https://uniprep2go.study/", {
        utmSource: "llm",
      }),
    ).toBe("llm");
  });

  it("classifies known AI referrers as llm", () => {
    expect(classifyTrafficChannel("https://www.perplexity.ai/search")).toBe("llm");
    expect(classifyTrafficChannel("https://claude.ai/chat")).toBe("llm");
    expect(classifyTrafficChannel("https://gemini.google.com/app")).toBe("llm");
  });

  it("prefers llm utm over google referrer", () => {
    expect(
      classifyTrafficChannel("https://www.google.com/", {
        utmSource: "llm",
        utmMedium: "llms.txt",
      }),
    ).toBe("llm");
  });
});
