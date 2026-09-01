import { describe, expect, it } from "vitest";
import {
  FIRST_TOUCH_STORAGE_KEY,
  captureFirstTouchAttribution,
  isLlmUtm,
  isThreadsTaggedTouch,
  parseUtmParams,
  resolveAttributionReferrer,
} from "./traffic-attribution";

function memoryStorage(initial: Record<string, string> = {}): Storage {
  const map = new Map(Object.entries(initial));

  return {
    get length() {
      return map.size;
    },
    clear() {
      map.clear();
    },
    getItem(key: string) {
      return map.has(key) ? map.get(key)! : null;
    },
    key(index: number) {
      return [...map.keys()][index] ?? null;
    },
    removeItem(key: string) {
      map.delete(key);
    },
    setItem(key: string, value: string) {
      map.set(key, value);
    },
  };
}

describe("traffic attribution", () => {
  it("parses utm_source and utm_medium from query strings", () => {
    expect(parseUtmParams("?utm_source=llm&utm_medium=llms.txt")).toEqual({
      utmSource: "llm",
      utmMedium: "llms.txt",
    });
    expect(isLlmUtm("llm", "llms.txt")).toBe(true);
    expect(isLlmUtm("google", "cpc")).toBe(false);
  });

  it("stores first-touch utm once and reuses it", () => {
    const storage = memoryStorage();
    const first = captureFirstTouchAttribution({
      search: "?utm_source=llm&utm_medium=llms.txt",
      referrer: "",
      path: "/decks/delf-b2-french-anki-deck",
      storage,
      now: new Date("2026-07-23T12:00:00.000Z"),
    });

    expect(first).toMatchObject({
      utmSource: "llm",
      utmMedium: "llms.txt",
      landingPath: "/decks/delf-b2-french-anki-deck",
    });
    expect(storage.getItem(FIRST_TOUCH_STORAGE_KEY)).toContain('"utmSource":"llm"');

    const second = captureFirstTouchAttribution({
      search: "",
      referrer: "https://uniprep2go.study/",
      path: "/",
      storage,
    });

    expect(second.utmSource).toBe("llm");
    expect(second.utmMedium).toBe("llms.txt");
    expect(second.landingPath).toBe("/decks/delf-b2-french-anki-deck");
  });

  it("keeps first-touch referrer across same-site navigations", () => {
    expect(
      resolveAttributionReferrer(
        "https://uniprep2go.study/blog/foo",
        "https://www.google.com/search?q=citizenship",
      ),
    ).toBe("https://www.google.com/search?q=citizenship");

    expect(
      resolveAttributionReferrer("", "https://chatgpt.com/"),
    ).toBe("https://chatgpt.com/");

    expect(
      resolveAttributionReferrer("https://www.google.com/", "https://chatgpt.com/"),
    ).toBe("https://www.google.com/");
  });

  it("enriches a first touch that had no utm when a later url includes utm", () => {
    const storage = memoryStorage();
    captureFirstTouchAttribution({
      search: "",
      referrer: "",
      path: "/",
      storage,
      now: new Date("2026-07-23T12:00:00.000Z"),
    });

    const enriched = captureFirstTouchAttribution({
      search: "?utm_source=llm&utm_medium=llms.txt",
      referrer: "",
      path: "/llms.txt",
      storage,
    });

    expect(enriched.utmSource).toBe("llm");
    expect(enriched.utmMedium).toBe("llms.txt");
  });

  it("recognizes tagged Threads clicks only", () => {
    expect(isThreadsTaggedTouch("threads")).toBe(true);
    expect(isThreadsTaggedTouch("THREADS")).toBe(true);
    expect(isThreadsTaggedTouch("llm")).toBe(false);
    expect(isThreadsTaggedTouch(undefined)).toBe(false);
  });
});
