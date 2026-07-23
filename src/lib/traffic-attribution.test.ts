import { describe, expect, it } from "vitest";
import {
  FIRST_TOUCH_STORAGE_KEY,
  captureFirstTouchAttribution,
  isLlmUtm,
  parseUtmParams,
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
});
