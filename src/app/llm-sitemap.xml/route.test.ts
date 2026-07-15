import { describe, expect, it } from "vitest";
import { GET } from "./route";
import { availableDecks } from "@/lib/decks";
import { getAllMockExams } from "@/lib/mock-exams/configs";
import { shouldIndexMockExam } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

describe("LLM sitemap", () => {
  it("publishes machine-readable discovery URLs outside the Google sitemap", async () => {
    const response = GET();
    const body = await response.text();

    expect(response.headers.get("Content-Type")).toContain("application/xml");
    expect(body).toContain(`<loc>${absoluteUrl("/llms.txt")}</loc>`);
    expect(body).toContain(`<loc>${absoluteUrl("/llms-full.txt")}</loc>`);
    expect(body).toContain(`<loc>${absoluteUrl("/api/facts")}</loc>`);
    expect(body).toContain(`<loc>${absoluteUrl("/api/mock-exams")}</loc>`);

    for (const deck of availableDecks) {
      expect(body).toContain(`<loc>${absoluteUrl(`/${deck.slug}.md`)}</loc>`);
      expect(body).toContain(`<loc>${absoluteUrl(`/api/facts/${deck.slug}`)}</loc>`);
    }

    for (const mock of getAllMockExams().filter((m) => shouldIndexMockExam(m.slug))) {
      expect(body).toContain(`<loc>${absoluteUrl(`/api/mock-exams/${mock.slug}`)}</loc>`);
      expect(body).toContain(`<loc>${absoluteUrl(`/mock-exams/${mock.slug}/markdown`)}</loc>`);
    }
  });
});
