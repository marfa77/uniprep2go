import { getCatalogDeckBySlug } from "../decks";
import { getAllMockExams, getMockExamConfig } from "./configs";
import {
  buildMockExamFaqs,
  buildMockSeoDescription,
  buildMockSeoPageCopy,
  getMockSeoProfile,
} from "./seo";
import type { MockExamConfig } from "./types";
import { getMockOfficialResources } from "./official-resources";
import { isMockExamRunnable } from "./question-bank";
import { getVerticalDefinition } from "./taxonomy";
import { shouldIndexMockExam } from "../seo";
import { mockFreeAccessNotice, mockFreeAccessPriceLabel } from "./pricing";
import { absoluteUrl, siteConfig } from "../site";
import {
  buildExamFactsMarkdownSection,
  getExamFactsProfileForDeck,
} from "../exam-facts";

export { buildMockExamFaqs } from "./seo";

export function mockExamHubBreadcrumbLabel() {
  return "US exam practice tests";
}

export function buildMockExamFacts(config: MockExamConfig) {
  const linkedDeck = getCatalogDeckBySlug(config.linkedDeckSlug);
  const seoIndexed = shouldIndexMockExam(config.slug);
  const seo = getMockSeoProfile(config);
  const pageCopy = buildMockSeoPageCopy(config);
  const official = getMockOfficialResources(config);

  return {
    product: seo.headline,
    slug: config.slug,
    type: "practice_test",
    publisher: siteConfig.name,
    seller: linkedDeck?.checkoutSeller ?? "PixID Studio",
    linked_deck_slug: config.linkedDeckSlug,
    linked_deck_url: absoluteUrl(`/decks/${config.linkedDeckSlug}`),
    linked_deck_checkout_url: linkedDeck?.checkoutUrl ?? null,
    status: config.status,
    index_status: seoIndexed ? "indexed" : "noindex",
    seo_indexed: seoIndexed,
    access_mode: config.accessMode,
    question_count: config.questionCount,
    duration_minutes: config.durationMinutes,
    pass_threshold_percent: config.passRule.passPercent,
    price: mockFreeAccessPriceLabel,
    pricing_note: mockFreeAccessNotice,
    exam_body: config.examBody,
    certifier: official.certifier,
    verify_at_url: official.verifyAtUrl,
    official_resources: official.sources,
    vertical_id: config.verticalId,
    family_id: config.familyId,
    search_aliases: config.searchAliases ?? [],
    what_is_exam: pageCopy.whatIsExam,
    administered_by: pageCopy.administeredBy ?? official.certifier,
    official_format: pageCopy.officialFormat ?? null,
    topics: config.topics,
    funnel: {
      step_1: "free_timed_mock",
      step_2: "topic_readiness_report",
      step_3: "linked_deck_remediation",
      linked_deck_slug: config.linkedDeckSlug,
      linked_deck_product_url: absoluteUrl(`/decks/${config.linkedDeckSlug}`),
    },
    report_features: [
      "pass/no-pass readiness verdict",
      "weighted topic diagnosis",
      "pacing analysis",
      "full answer review",
      "linked Anki deck repair plan for no-pass or borderline results",
    ],
    question_source:
      config.questionSourceNote ??
      "Original UniPrep2Go practice items aligned to published topic outlines — not leaked official exam questions.",
    official_source_note: config.officialSourceNote,
    description: buildMockSeoDescription(config),
    disclaimer: config.disclaimer,
    runnable: isMockExamRunnable(config.slug),
    landing_page: absoluteUrl(`/mock-exams/${config.slug}`),
    vertical_page: absoluteUrl(`/mock-exams/v/${config.verticalId}`),
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
  const seo = getMockSeoProfile(config);
  const pageCopy = buildMockSeoPageCopy(config);
  const official = getMockOfficialResources(config);
  const examFactsProfile = getExamFactsProfileForDeck(config.linkedDeckSlug);
  const examFactsSection = examFactsProfile
    ? `\n${buildExamFactsMarkdownSection(examFactsProfile)}\n`
    : "";
  const officialLinks =
    official.sources.length > 0
      ? official.sources.map((source) => `- [${source.label}](${source.url})`).join("\n")
      : official.verifyAtUrl
        ? `- [Official resources](${official.verifyAtUrl})`
        : "- See the certifying body’s published candidate handbook for current fees and scheduling.";

  return `# ${seo.headline}

> ${buildMockSeoDescription(config)}

## ${pageCopy.whatIsHeading}

${pageCopy.whatIsExam}

- Administered by: ${pageCopy.administeredBy ?? official.certifier}
${pageCopy.officialFormat ? `- Official format: ${pageCopy.officialFormat}\n` : ""}
## Official certification resources

${official.trustLine}

${officialLinks}

## Product facts

- Slug: ${config.slug}
- Practice test label: ${pageCopy.practiceTestLabel}
- Vertical: ${config.verticalId} (${absoluteUrl(`/mock-exams/v/${config.verticalId}`)})
- Family: ${config.familyId}
- Linked deck: ${config.linkedDeckSlug}
- Status: ${config.status}
- Access mode: ${config.accessMode}
- Questions: ${config.questionCount}
- Duration: ${config.durationMinutes} minutes
- Pass threshold: ${config.passRule.passPercent}%
- Price: ${mockFreeAccessPriceLabel}
- Pricing note: ${mockFreeAccessNotice}
- Exam body: ${config.examBody}
- Search aliases: ${(config.searchAliases ?? []).join(", ") || "n/a"}
- Landing page: ${absoluteUrl(`/mock-exams/${config.slug}`)}
- Facts JSON: ${absoluteUrl(`/api/mock-exams/${config.slug}`)}

## About this free practice test

${pageCopy.intro}

- Built for: ${pageCopy.audience}
- Topics: ${pageCopy.topicSummary}

## Report features

- Pass/no-pass readiness verdict
- Weighted topic diagnosis
- Pacing analysis
- Full answer review with explanations
- Linked Anki deck repair plan for no-pass or borderline results

## Question source

${config.questionSourceNote ?? "Original UniPrep2Go practice items aligned to published topic outlines — not leaked official exam questions."}

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

export function buildMockExamItemListJsonLd(options?: { indexedOnly?: boolean }) {
  const indexedOnly = options?.indexedOnly ?? false;
  const mocks = getAllMockExams().filter(
    (mock) => !indexedOnly || shouldIndexMockExam(mock.slug),
  );

  return {
    "@type": "ItemList" as const,
    name: "UniPrep2Go free practice tests",
    numberOfItems: mocks.length,
    itemListElement: mocks.map((mock, index) => ({
      "@type": "ListItem" as const,
      position: index + 1,
      name: mock.title,
      url: absoluteUrl(`/mock-exams/${mock.slug}`),
    })),
  };
}

export function buildFeaturedMockItemListJsonLd(slugs: string[]) {
  const bySlug = new Map(getAllMockExams().map((mock) => [mock.slug, mock]));
  const indexedSlugs = slugs.filter((slug) => shouldIndexMockExam(slug));

  return {
    "@type": "ItemList" as const,
    name: "UniPrep2Go featured US licensing practice tests",
    numberOfItems: indexedSlugs.length,
    itemListElement: indexedSlugs.flatMap((slug, index) => {
      const mock = bySlug.get(slug);
      if (!mock) return [];
      return [
        {
          "@type": "ListItem" as const,
          position: index + 1,
          name: mock.title,
          url: absoluteUrl(`/mock-exams/${mock.slug}`),
        },
      ];
    }),
  };
}

export function buildMockExamPageJsonLd(config: MockExamConfig) {
  const faqs = buildMockExamFaqs(config);
  const pageUrl = absoluteUrl(`/mock-exams/${config.slug}`);
  const seoDescription = buildMockSeoDescription(config);
  const official = getMockOfficialResources(config);
  const vertical = getVerticalDefinition(config.verticalId);
  const verticalUrl = absoluteUrl(`/mock-exams/v/${config.verticalId}`);
  const clusterImage = absoluteUrl(
    `/images/mock-clusters/${vertical?.imageType ?? config.verticalId}.webp`,
  );
  const certifierOrg = {
    "@type": "Organization" as const,
    name: official.certifier,
    ...(official.verifyAtUrl ? { url: official.verifyAtUrl, sameAs: official.verifyAtUrl } : {}),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        name: config.title,
        description: seoDescription,
        url: pageUrl,
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: clusterImage,
        },
        isPartOf: {
          "@id": `${siteConfig.url}/#website`,
        },
        about: certifierOrg,
        significantLink: official.sources.map((source) => source.url),
      },
      {
        "@type": "Quiz",
        "@id": `${pageUrl}#quiz`,
        name: config.title,
        description: seoDescription,
        url: pageUrl,
        educationalLevel: "Professional certification prep",
        numberOfQuestions: config.questionCount,
        about: certifierOrg,
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
        about: certifierOrg,
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
            name: mockExamHubBreadcrumbLabel(),
            item: absoluteUrl("/mock-exams"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: vertical?.label ?? config.verticalId,
            item: verticalUrl,
          },
          {
            "@type": "ListItem",
            position: 4,
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
