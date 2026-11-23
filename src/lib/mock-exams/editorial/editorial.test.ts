import { describe, expect, it } from "vitest";
import { getMockExamConfig } from "../configs";
import { buildMockExamFaqs, buildMockSeoDescription } from "../seo";
import { buildMockExamPageJsonLd } from "../llm";
import {
  enrichmentMockSlugs,
  getMockEditorialBundle,
} from "./index";
import { resolveWeightTableQuestions } from "./resolve-weight-table";
import { getDeckBySlug } from "../../decks";
import { getBlogPostBySlug as getBlogPost } from "../../blog";

describe("mock exam editorial enrichment", () => {
  it("registers all five batch-1 slugs with sections and sources", () => {
    for (const slug of enrichmentMockSlugs()) {
      const bundle = getMockEditorialBundle(slug);
      expect(bundle, slug).toBeTruthy();
      expect(bundle!.sections.length).toBeGreaterThanOrEqual(3);
      expect(bundle!.sources.length).toBeGreaterThanOrEqual(2);
      expect(bundle!.faqs.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("renders CFA L1 2027 weight rows from topic ids and label aliases", () => {
    const config = getMockExamConfig("cfa-level-1-readiness-check")!;
    const bundle = getMockEditorialBundle("cfa-level-1-readiness-check")!;
    const rows = resolveWeightTableQuestions(bundle.weightTable!.rows, config);
    expect(rows).toHaveLength(10);
    expect(rows.every((row) => row.questionsOnCheck !== null)).toBe(true);
    expect(rows.find((row) => row.displayLabel.includes("Ethical"))?.officialWeight).toBe(
      "10–15%",
    );
  });

  it("merges editorial FAQs into JSON-LD without duplicating SIE free-test questions", () => {
    const config = getMockExamConfig("sie-full-mock")!;
    const faqs = buildMockExamFaqs(config);
    expect(faqs.filter((f) => f.question === "Is there a free FINRA SIE practice test?")).toHaveLength(1);
    expect(faqs.some((f) => f.question === "Is the FINRA SIE practice test free?")).toBe(false);
    const jsonLd = buildMockExamPageJsonLd(config);
    const faqEntity = jsonLd["@graph"].find(
      (node) => typeof node === "object" && node !== null && "@type" in node && node["@type"] === "FAQPage",
    ) as { mainEntity: Array<{ name: string }> } | undefined;
    expect(
      faqEntity?.mainEntity.some((q) => q.name === "Is there a free FINRA SIE practice test?"),
    ).toBe(true);
    expect(
      faqEntity?.mainEntity.some((q) => /wait to retake the sie/i.test(q.name)),
    ).toBe(true);
  });

  it("includes FRM 2027 fee FAQ after editorial merge", () => {
    const config = getMockExamConfig("frm-part-1-readiness-check")!;
    const faqs = buildMockExamFaqs(config);
    expect(
      faqs.some((f) => f.question === "When are the 2027 FRM Part I exams and what do they cost?"),
    ).toBe(true);
    expect(faqs.some((f) => f.question === "Is there an official GARP FRM Part 1 mock?")).toBe(
      true,
    );
  });

  it("optional PTCB meta description override stays within meta limit", () => {
    const config = getMockExamConfig("ptcb-pharmacy-technician-mock")!;
    const meta = buildMockSeoDescription(config);
    expect(meta.length).toBeLessThanOrEqual(155);
    expect(meta).toContain("$129");
    expect(meta).toContain("January 2026");
  });

  it("exposes editorial section headings for CFA L1 2027 weights", () => {
    const bundle = getMockEditorialBundle("cfa-level-1-readiness-check")!;
    expect(bundle!.weightTable!.heading).toContain("2027");
    expect(bundle!.sections.some((s) => s.heading.includes("PSM"))).toBe(true);
    expect(bundle!.replaceExamFactsDomainWeights).toBe(true);
  });
});

const BATCH_2_SLUGS = [
  "series-7-readiness-check",
  "series-63-readiness-check",
  "life-and-health-insurance-readiness-check",
  "property-casualty-insurance-readiness-check",
  "pmp-readiness-check",
  "gmat-focus-readiness-check",
  "nclex-rn-readiness-check",
  "servsafe-manager-mock",
  "mrics-readiness-check",
  "mrics-quantity-surveying-readiness-check",
  "series-65-readiness-check",
  "cscs-nsca-readiness-check",
  "leed-green-associate-readiness-check",
  "cfp-certification-readiness-check",
  "epa-608-readiness-check",
  "enrolled-agent-readiness-check",
] as const;

function bundleText(slug: string): string {
  const bundle = getMockEditorialBundle(slug)!;
  return [
    bundle.howToPrepare ?? "",
    ...bundle.sections.flatMap((s) => [...s.paragraphs, ...(s.bullets ?? [])]),
    ...bundle.faqs.map((f) => f.answer),
  ].join(" ");
}

function editorialWordCount(slug: string): number {
  const bundle = getMockEditorialBundle(slug)!;
  const text = [
    bundle.howToPrepare ?? "",
    ...bundle.sections.flatMap((s) => [s.heading, ...s.paragraphs, ...(s.bullets ?? [])]),
    ...bundle.faqs.flatMap((f) => [f.question, f.answer]),
  ]
    .join(" ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*/g, "");
  return text.split(/\s+/).filter(Boolean).length;
}

function faqPageNames(slug: string): string[] {
  const config = getMockExamConfig(slug)!;
  const jsonLd = buildMockExamPageJsonLd(config);
  const faqEntity = jsonLd["@graph"].find(
    (node) => typeof node === "object" && node !== null && "@type" in node && node["@type"] === "FAQPage",
  ) as { mainEntity: Array<{ name: string }> } | undefined;
  return faqEntity?.mainEntity.map((q) => q.name) ?? [];
}

describe("mock exam editorial enrichment — batch 2", () => {
  it.each(BATCH_2_SLUGS)("%s links only to existing mocks, decks and blog posts", (slug) => {
    const links = [...bundleText(slug).matchAll(/\]\((\/[^)\s]+)\)/g)].map((m) => m[1]);
    expect(links.length).toBeGreaterThanOrEqual(2);
    for (const href of links) {
      const [, kind, target] = href.split("/");
      if (kind === "mock-exams") expect(getMockExamConfig(target), href).toBeTruthy();
      else if (kind === "decks") expect(getDeckBySlug(target), href).toBeTruthy();
      else if (kind === "blog") expect(getBlogPost(target), href).toBeTruthy();
      else throw new Error(`Unexpected internal link ${href} on ${slug}`);
    }
  });

  it.each(BATCH_2_SLUGS)("%s never restates deck prices", (slug) => {
    const prices = [...bundleText(slug).matchAll(/\$\d+(?:\.\d{2})?/g)].map((m) => m[0]);
    expect(prices).not.toContain("$9.99");
    expect(prices).not.toContain("$11");
  });

  it.each(BATCH_2_SLUGS)("%s has 600–900 words, 5–7 FAQs, sources and no 2026 in headings", (slug) => {
    const bundle = getMockEditorialBundle(slug)!;
    expect(bundle, slug).toBeTruthy();
    const words = editorialWordCount(slug);
    expect(words).toBeGreaterThanOrEqual(600);
    expect(words).toBeLessThanOrEqual(900);
    expect(bundle.faqs.length).toBeGreaterThanOrEqual(5);
    expect(bundle.faqs.length).toBeLessThanOrEqual(7);
    expect(bundle.sources.length).toBeGreaterThanOrEqual(2);
    expect(bundle.sources.every((s) => s.url.startsWith("https://") && s.checked)).toBe(true);
    expect(bundle.sections.every((s) => !s.heading.includes("2026"))).toBe(true);
  });

  it.each(BATCH_2_SLUGS)("%s merges every editorial FAQ into FAQPage JSON-LD", (slug) => {
    const names = faqPageNames(slug);
    for (const faq of getMockEditorialBundle(slug)!.faqs) {
      expect(names, faq.question).toContain(faq.question);
    }
  });

  it.each(BATCH_2_SLUGS)("%s takes mock length from config, not hardcoded copy", (slug) => {
    const config = getMockExamConfig(slug)!;
    const lengthFaq = getMockEditorialBundle(slug)!.faqs.find((f) => /UniPrep2Go/.test(f.question))!;
    expect(lengthFaq.answer).toContain(`${config.questionCount} questions in ${config.durationMinutes} minutes`);
    expect(lengthFaq.answer).toContain("$19, unlimited mocks");
  });

  it("Series 7 uses FINRA's 125 scored items and the 19 Jan 2027 retake change", () => {
    const bundle = getMockEditorialBundle("series-7-readiness-check")!;
    expect(bundle.sections.map((s) => s.heading)).toContain(
      "How long to wait before retaking the Series 7 (changes 19 Jan 2027)",
    );
    const facts = bundle.sections[0].bullets!.join(" ");
    expect(facts).toContain("125 scored");
    expect(facts).toContain("$395");
    const config = getMockExamConfig("series-7-readiness-check")!;
    const f3 = config.topics.find((t) => t.id === "s7-f3")!.questionCount;
    expect(bundle.sections[1].bullets!.join(" ")).toContain(`This check draws ${f3}.`);
  });

  it("Series 63 does not apply FINRA's 15-day retake rule", () => {
    const retake = getMockEditorialBundle("series-63-readiness-check")!.sections.find((s) =>
      s.heading.startsWith("How long to wait before retaking the Series 63"),
    )!;
    const text = retake.paragraphs.join(" ");
    expect(text).toContain("4 Jan 2027");
    expect(text).toContain("FINRA exams only");
    expect(text).not.toMatch(/\b15 days\b/);
  });

  it("insurance pages label state-specific numbers as Texas-only", () => {
    for (const slug of [
      "life-and-health-insurance-readiness-check",
      "property-casualty-insurance-readiness-check",
    ]) {
      const bundle = getMockEditorialBundle(slug)!;
      const example = bundle.sections.find((s) => s.heading.startsWith("Example: the Texas"))!;
      expect(example.paragraphs.join(" ")).toContain("Texas-only");
      expect(bundle.faqs[0].question).toMatch(/same in every state/);
    }
  });

  it("Series 65 uses NASAA retake rules and FINRA's 92/130 pass mark", () => {
    const text = bundleText("series-65-readiness-check");
    expect(text).toContain("**92 of the 130 scored questions**");
    expect(text).toContain("4 Jan 2027");
    expect(text).not.toMatch(/\b15 days\b/);
  });

  it("dated 2027 facts appear only where officially announced", () => {
    expect(bundleText("nclex-rn-readiness-check")).toContain("**$350 from 1 Feb 2027**");
    expect(bundleText("cfp-certification-readiness-check")).toContain("early bird $825");
  });

  it("EPA 608 cites Appendix D passing scores", () => {
    const text = bundleText("epa-608-readiness-check");
    expect(text).toContain("**70%** for closed-book");
    expect(text).toContain("**84%** for Type I");
  });

  it("CSCS copy omits pass rates and the future degree rule", () => {
    const text = bundleText("cscs-nsca-readiness-check");
    expect(text).not.toMatch(/\d+% passed|pass rate|CASCE|2036/i);
  });

  it("PMP copy follows the July 2026 ECO (33/41/26, 170 scored + 10 pretest)", () => {
    const bundle = getMockEditorialBundle("pmp-readiness-check")!;
    const all = bundle.sections.flatMap((s) => [...s.paragraphs, ...(s.bullets ?? [])]).join(" ");
    expect(all).toContain("**170 are scored**");
    expect(all).toContain("People — 33%");
    expect(all).toContain("Process — 41%");
    expect(all).toContain("Business Environment — 26%");
    expect(all).toContain("up to three times");
  });
});

describe("NBRC TMC → RT transition editorial (WP0)", () => {
  const bundle = () => getMockEditorialBundle("nbrc-tmc-readiness-check")!;
  const text = () =>
    [
      bundle().howToPrepare ?? "",
      ...bundle().sections.flatMap((s) => [...s.paragraphs, ...(s.bullets ?? [])]),
      ...bundle().faqs.map((f) => f.answer),
    ].join(" ");

  it("states the official transition dates and RT format", () => {
    const all = text();
    for (const fact of ["15 Dec 2026", "31 Dec 2026", "4 Jan 2027", "31 Dec 2027", "160 are scored", "120 days", "$360", "$300"]) {
      expect(all, fact).toContain(fact);
    }
  });

  it("renders transition headings without 2026 and merges FAQs into JSON-LD", () => {
    const headings = bundle().sections.map((s) => s.heading);
    expect(headings).toContain("When does the TMC end, and what replaces it?");
    expect(headings).toContain("If you have already passed the TMC");
    expect(headings.every((h) => !h.includes("2026"))).toBe(true);
    const config = getMockExamConfig("nbrc-tmc-readiness-check")!;
    const jsonLd = buildMockExamPageJsonLd(config);
    const faqEntity = jsonLd["@graph"].find(
      (node) => typeof node === "object" && node !== null && "@type" in node && node["@type"] === "FAQPage",
    ) as { mainEntity: Array<{ name: string }> } | undefined;
    for (const faq of bundle().faqs) {
      expect(faqEntity?.mainEntity.map((q) => q.name)).toContain(faq.question);
    }
  });

  it("is honest that the check is not an RT Examination simulation", () => {
    expect(text()).toContain("**not** an RT Examination simulation");
  });
});

const WP1_MOCKS_1 = [
  "ace-cpt-readiness-check",
  "rd-exam-readiness-check",
  "leed-ap-om-readiness-check",
  "cdcp-readiness-check",
  "cem-readiness-check",
] as const;

function wp1Text(slug: string): string {
  const b = getMockEditorialBundle(slug)!;
  return [b.howToPrepare ?? "", ...b.sections.flatMap((s) => [...s.paragraphs, ...(s.bullets ?? [])]), ...b.faqs.map((f) => f.answer)].join(" ");
}

function wp1Words(slug: string): number {
  const b = getMockEditorialBundle(slug)!;
  return [b.howToPrepare ?? "", ...b.sections.flatMap((s) => [s.heading, ...s.paragraphs, ...(s.bullets ?? [])]), ...b.faqs.flatMap((f) => [f.question, f.answer])]
    .join(" ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*/g, "")
    .split(/\s+/)
    .filter(Boolean).length;
}

describe("WP1 mock editorial — ACE CPT, RD, LEED AP O+M, CDCP, CEM", () => {
  it.each(WP1_MOCKS_1)("%s: 600–900 words, 5–7 FAQs in JSON-LD, sources, config-driven length", (slug) => {
    const bundle = getMockEditorialBundle(slug)!;
    const words = wp1Words(slug);
    expect(words).toBeGreaterThanOrEqual(600);
    expect(words).toBeLessThanOrEqual(900);
    expect(bundle.faqs.length).toBeGreaterThanOrEqual(5);
    expect(bundle.faqs.length).toBeLessThanOrEqual(7);
    expect(bundle.sources.length).toBeGreaterThanOrEqual(2);
    expect(bundle.sections.every((s) => !s.heading.includes("2026"))).toBe(true);
    const config = getMockExamConfig(slug)!;
    const jsonLd = buildMockExamPageJsonLd(config);
    const faqEntity = jsonLd["@graph"].find(
      (node) => typeof node === "object" && node !== null && "@type" in node && node["@type"] === "FAQPage",
    ) as { mainEntity: Array<{ name: string }> } | undefined;
    for (const faq of bundle.faqs) expect(faqEntity?.mainEntity.map((q) => q.name)).toContain(faq.question);
    const lengthFaq = bundle.faqs.find((f) => /UniPrep2Go/.test(f.question))!;
    expect(lengthFaq.answer).toContain(`${config.questionCount} questions in ${config.durationMinutes} minutes`);
  });

  it.each(WP1_MOCKS_1)("%s links only to existing pages", (slug) => {
    for (const [, href] of wp1Text(slug).matchAll(/\]\((\/[^)\s]+)\)/g)) {
      const [, kind, target] = href.split("/");
      if (kind === "mock-exams") expect(getMockExamConfig(target), href).toBeTruthy();
      else if (kind === "decks") expect(getDeckBySlug(target), href).toBeTruthy();
      else if (kind === "blog") expect(getBlogPost(target), href).toBeTruthy();
      else throw new Error(href);
    }
  });

  it("RD page carries the dated 1 Jan 2027 CDR outline change", () => {
    expect(wp1Text("rd-exam-readiness-check")).toContain("Human Nutrition and Medical Nutrition Therapy — 40%");
  });
});
