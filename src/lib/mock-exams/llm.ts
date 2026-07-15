import { getAllMockExams, getMockExamConfig } from "./configs";
import { buildMockExamFaqs, buildMockSeoDescription } from "./seo";
import type { MockExamConfig } from "./types";
import { isMockExamRunnable } from "./question-bank";
import { mockFreeAccessNotice, mockFreeAccessPriceLabel } from "./pricing";
import { absoluteUrl, siteConfig } from "../site";
import {
  buildExamFactsMarkdownSection,
  getExamFactsProfileForDeck,
} from "../exam-facts";

export { buildMockExamFaqs } from "./seo";

export function buildMockExamFacts(config: MockExamConfig) {
  return {
    product: config.title,
    slug: config.slug,
    type: "finance_mock_exam",
    linked_deck_slug: config.linkedDeckSlug,
    status: config.status,
    access_mode: config.accessMode,
    question_count: config.questionCount,
    duration_minutes: config.durationMinutes,
    pass_threshold_percent: config.passRule.passPercent,
    price: mockFreeAccessPriceLabel,
    exam_body: config.examBody,
    topics: config.topics,
    report_features: [
      "pass/no-pass readiness verdict",
      "weighted topic diagnosis",
      "pacing analysis",
      "full answer review",
      "linked Anki deck repair plan for no-pass or borderline results",
    ],
    question_source: "Converted from the linked UniPrep2Go Anki deck content, not AI-generated from scratch.",
    official_source_note: config.officialSourceNote,
    description: config.description,
    disclaimer: config.disclaimer,
    runnable: isMockExamRunnable(config.slug),
    landing_page: absoluteUrl(`/mock-exams/${config.slug}`),
    facts_json: absoluteUrl(`/api/mock-exams/${config.slug}`),
    markdown: absoluteUrl(`/mock-exams/${config.slug}/markdown`),
    not_official_exam_material: true,
    last_updated: config.lastUpdated,
  };
}

export function buildMockExamCatalogFacts() {
  const mocks = getAllMockExams();

  return {
    publisher: siteConfig.name,
    catalog_type: "finance_mock_exams",
    count: mocks.length,
    mocks: mocks.map((mock) => buildMockExamFacts(mock)),
    catalog_json: absoluteUrl("/api/mock-exams"),
  };
}

export function buildMockExamMarkdown(config: MockExamConfig) {
  const faqs = buildMockExamFaqs(config);
  const examFactsProfile = getExamFactsProfileForDeck(config.linkedDeckSlug);
  const examFactsSection = examFactsProfile
    ? `\n${buildExamFactsMarkdownSection(examFactsProfile)}\n`
    : "";

  return `# ${config.title}

> ${config.description}

## Product facts

- Slug: ${config.slug}
- Linked deck: ${config.linkedDeckSlug}
- Status: ${config.status}
- Access mode: ${config.accessMode}
- Questions: ${config.questionCount}
- Duration: ${config.durationMinutes} minutes
- Pass threshold: ${config.passRule.passPercent}%
- Price: ${mockFreeAccessPriceLabel}
- Pricing note: ${mockFreeAccessNotice}
- Exam body: ${config.examBody}
- Landing page: ${absoluteUrl(`/mock-exams/${config.slug}`)}
- Facts JSON: ${absoluteUrl(`/api/mock-exams/${config.slug}`)}

## Report features

- Pass/no-pass readiness verdict
- Weighted topic diagnosis
- Pacing analysis
- Full answer review with explanations
- Linked Anki deck repair plan for no-pass or borderline results

## Question source

${config.questionSourceNote ?? "Questions are converted from the linked UniPrep2Go Anki deck content and reshuffled into exam-style multiple choice. They are not generated from scratch without the deck source."}

## Structure

${config.topics
  .map((topic) => {
    const detail =
      typeof topic.questionCount === "number"
        ? `${topic.questionCount} questions`
        : `${topic.weightPercent}% weight`;
    return `- ${topic.label}: ${detail}, target ${topic.targetPercent}%`;
  })
  .join("\n")}

## Official source note

${config.officialSourceNote}
${examFactsSection}
## FAQ

${faqs.map((faq) => `### ${faq.question}\n\n${faq.answer}`).join("\n\n")}

## Disclaimer

${config.disclaimer}
`;
}

export function buildMockExamItemListJsonLd() {
  const mocks = getAllMockExams();

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "UniPrep2Go finance mock exams",
    itemListElement: mocks.map((mock, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: mock.title,
      url: absoluteUrl(`/mock-exams/${mock.slug}`),
    })),
  };
}

export function buildMockExamPageJsonLd(config: MockExamConfig) {
  const faqs = buildMockExamFaqs(config);
  const pageUrl = absoluteUrl(`/mock-exams/${config.slug}`);
  const seoDescription = buildMockSeoDescription(config);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        name: config.title,
        description: seoDescription,
        url: pageUrl,
        isPartOf: {
          "@id": `${siteConfig.url}/#website`,
        },
      },
      {
        "@type": "Quiz",
        "@id": `${pageUrl}#quiz`,
        name: config.title,
        description: seoDescription,
        url: pageUrl,
        educationalLevel: "Professional certification prep",
        numberOfQuestions: config.questionCount,
        about: config.examBody,
        isAccessibleForFree: config.accessMode === "free_demand_test",
      },
      {
        "@type": "Course",
        "@id": `${pageUrl}#course`,
        name: config.title,
        description: seoDescription,
        provider: {
          "@type": "Organization",
          name: siteConfig.name,
          url: siteConfig.url,
        },
        url: pageUrl,
        educationalLevel: "Professional certification prep",
        isAccessibleForFree: config.accessMode === "free_demand_test",
        teaches: config.topics.map((topic) => topic.label),
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteConfig.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Finance mock exams",
            item: absoluteUrl("/mock-exams"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: config.title,
            item: pageUrl,
          },
        ],
      },
    ],
  };
}

export function getMockExamBySlug(slug: string) {
  return getMockExamConfig(slug);
}
