import { describe, expect, it } from "vitest";
import { getDeckEditorialBundle } from "./index";

const STATES = { wa: "Washington only", ga: "Georgia only", il: "Illinois only", nc: "North Carolina only", co: "Colorado only" } as const;

describe("WP-A PR 8 — state real estate decks", () => {
  it.each(Object.entries(STATES))("%s deck is registered, state-labelled, and has no pass rates", (st, label) => {
    const b = getDeckEditorialBundle(`${st}-real-estate-anki-deck`)!;
    expect(b).toBeTruthy();
    const text = b.sections.flatMap((s) => [...s.paragraphs, ...(s.bullets ?? [])]).join(" ");
    expect(text).toContain(label);
    expect(text).not.toMatch(/pass rate|% of (candidates|applicants)/i);
    expect(b.mockSlug).toBe(`${st}-real-estate-readiness-check`);
  });
});
