import { describe, expect, it } from "vitest";
import { MOCK_VERTICALS } from "./taxonomy";
import { getVerticalSeoCopy, verticalSeoCopy } from "./vertical-seo";

describe("vertical SEO copy", () => {
  it("covers every mock vertical with lead, sections, and FAQs", () => {
    for (const vertical of MOCK_VERTICALS) {
      const seo = getVerticalSeoCopy(vertical.id);
      expect(seo.lead.split(/\s+/).length).toBeGreaterThanOrEqual(40);
      expect(seo.sections.length).toBeGreaterThanOrEqual(2);
      expect(seo.faqs.length).toBeGreaterThanOrEqual(2);
      for (const faq of seo.faqs) {
        expect(faq.question.length).toBeGreaterThan(10);
        expect(faq.answer.split(/\s+/).length).toBeGreaterThanOrEqual(8);
      }
    }
    expect(Object.keys(verticalSeoCopy).sort()).toEqual(
      MOCK_VERTICALS.map((vertical) => vertical.id).sort(),
    );
  });
});
