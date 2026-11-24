import { describe, expect, it } from "vitest";
import { getDeckEditorialBundle } from "./index";

const STATES = { ny: "New York only", nj: "New Jersey only", pa: "Pennsylvania only", va: "Virginia only", oh: "Ohio only" } as const;

describe("WP-A PR 9 — state real estate decks", () => {
  it.each(Object.entries(STATES))("%s deck is registered, state-labelled, and has no pass rates", (st, label) => {
    const b = getDeckEditorialBundle(`${st}-real-estate-anki-deck`)!;
    expect(b).toBeTruthy();
    const text = b.sections.flatMap((s) => [...s.paragraphs, ...(s.bullets ?? [])]).join(" ");
    expect(text).toContain(label);
    expect(text).not.toMatch(/pass rate|% of (candidates|applicants)/i);
    expect(b.mockSlug).toBe(`${st}-real-estate-readiness-check`);
  });
});
