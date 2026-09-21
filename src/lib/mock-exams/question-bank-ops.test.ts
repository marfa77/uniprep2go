import { afterEach, describe, expect, it, vi } from "vitest";
import {
  clearQuestionBankOpsCache,
  fetchLiveQuestionBankFromOps,
  fetchQuestionBankFromOps,
  getLiveQuestionBank,
} from "./question-bank-ops";

describe("question-bank-ops", () => {
  afterEach(() => {
    clearQuestionBankOpsCache();
    vi.unstubAllGlobals();
    delete process.env.PREP2GO_SUPABASE_URL;
    delete process.env.PREP2GO_SUPABASE_SERVICE_ROLE_KEY;
  });

  it("maps ops RPC rows into MockQuestion shape", async () => {
    process.env.PREP2GO_SUPABASE_URL = "https://example.supabase.co";
    process.env.PREP2GO_SUPABASE_SERVICE_ROLE_KEY = "test-service-role";

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      text: async () =>
        JSON.stringify([
          {
            id: "life-in-the-uk-readiness-check-values-001",
            examSlug: "life-in-the-uk-readiness-check",
            topicId: "values",
            prompt: "What are the fundamental principles of British life?",
            options: [
              { id: "a", text: "Democracy / the rule of law" },
              { id: "b", text: "A passport" },
            ],
            correctOptionId: "a",
            explanation: "British values.",
            distractorExplanations: { b: "That is citizenship, not values." },
            difficulty: "medium",
            sourceNote: "ops",
          },
        ]),
    });
    vi.stubGlobal("fetch", fetchMock);

    const questions = await fetchQuestionBankFromOps("life-in-the-uk-readiness-check");

    expect(questions).toHaveLength(1);
    expect(questions[0]?.distractorExplanations.b).toContain("citizenship");
    expect(fetchMock).toHaveBeenCalledWith(
      "https://example.supabase.co/rest/v1/rpc/ops_get_mock_bank",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ p_slug: "life-in-the-uk-readiness-check" }),
      }),
    );
  });

  it("fails closed when Prep2Go credentials are missing", async () => {
    await expect(fetchQuestionBankFromOps("life-in-the-uk-readiness-check")).rejects.toThrow(
      /PREP2GO_SUPABASE/,
    );
  });

  it("reads live banks from the ready-only RPC", async () => {
    process.env.PREP2GO_SUPABASE_URL = "https://example.supabase.co";
    process.env.PREP2GO_SUPABASE_SERVICE_ROLE_KEY = "test-service-role";
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      text: async () => JSON.stringify([]),
    });
    vi.stubGlobal("fetch", fetchMock);

    await expect(fetchLiveQuestionBankFromOps("life-in-the-uk-readiness-check")).resolves.toEqual([]);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://example.supabase.co/rest/v1/rpc/ops_get_live_mock_bank",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ p_slug: "life-in-the-uk-readiness-check" }),
      }),
    );
  });

  it("falls back to git JSON when the live ops bank is not ready", async () => {
    process.env.PREP2GO_SUPABASE_URL = "https://example.supabase.co";
    process.env.PREP2GO_SUPABASE_SERVICE_ROLE_KEY = "test-service-role";
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        text: async () => JSON.stringify([]),
      }),
    );

    const questions = await getLiveQuestionBank("life-in-the-uk-readiness-check");
    expect(questions.length).toBeGreaterThan(50);
    expect(questions[0]?.examSlug).toBe("life-in-the-uk-readiness-check");
  });
});
