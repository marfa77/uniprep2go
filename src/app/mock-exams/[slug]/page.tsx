import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { FunnelTracker } from "@/components/funnel-tracker";
import { LlmFactsStrip } from "@/components/llm/llm-facts-strip";
import { DeckExamFactsSection } from "@/components/decks/deck-exam-facts-section";
import { MockExamClient } from "@/components/mock-exams/mock-exam-client";
import {
  MockExamAboutSection,
  MockExamFaqSection,
} from "@/components/mock-exams/mock-seo-sections";
import { CollapsibleDetails } from "@/components/ui/collapsible-details";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getCatalogDeckBySlug } from "@/lib/decks";
import {
  buildMockAiCategory,
  buildMockAiDescription,
} from "@/lib/exam-llm-layer";
import { getExamFactsProfileForDeck } from "@/lib/exam-facts";
import { withAiMetadata } from "@/lib/llm-meta";
import { getMockAccessState } from "@/lib/mock-exams/access";
import { getAllMockExams, getMockExamConfig } from "@/lib/mock-exams/configs";
import { buildMockExamPageJsonLd } from "@/lib/mock-exams/llm";
import { mockFreeAccessPriceLabel } from "@/lib/mock-exams/pricing";
import { getQuestionBank, isMockExamRunnable } from "@/lib/mock-exams/question-bank";
import {
  buildMockSeoDescription,
  buildMockSeoKeywords,
  buildMockSeoPageCopy,
  buildMockSeoTitle,
} from "@/lib/mock-exams/seo";
import { buildSocialMetadata } from "@/lib/social-metadata";
import { finalize, mockExamRobots, truncateSeoTitle } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const revalidate = 3600;

export function generateStaticParams() {
  return getAllMockExams().map((config) => ({ slug: config.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const config = getMockExamConfig(slug);

  if (!config) {
    return { title: "Mock exam not found" };
  }

  const title = truncateSeoTitle(buildMockSeoTitle(config));
  const description = buildMockSeoDescription(config);
  const keywords = buildMockSeoKeywords(config);

  const coverImage = absoluteUrl(`/covers/${config.linkedDeckSlug}.webp`);
  const examFactsProfile = getExamFactsProfileForDeck(config.linkedDeckSlug);
  const robots = mockExamRobots(config.slug);

  return withAiMetadata(
    finalize({
      title,
      description,
      keywords,
      ...(robots ? { robots } : {}),
      alternates: {
        canonical: `/mock-exams/${config.slug}`,
      },
      ...buildSocialMetadata({
        title,
        description,
        path: `/mock-exams/${config.slug}`,
        image: coverImage,
        imageAlt: title,
        imageWidth: 1200,
        imageHeight: 630,
      }),
    }),
    {
      aiDescription: buildMockAiDescription(config, examFactsProfile),
      aiCategory: buildMockAiCategory(config),
      path: `/mock-exams/${config.slug}`,
    },
  );
}

export default async function MockExamPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const config = getMockExamConfig(slug);

  if (!config) {
    notFound();
  }

  const accessState = getMockAccessState(slug);
  const questions = getQuestionBank(slug);
  const runnable = isMockExamRunnable(slug);
  const jsonLd = buildMockExamPageJsonLd(config);
  const seoCopy = buildMockSeoPageCopy(config);
  const linkedDeck = getCatalogDeckBySlug(config.linkedDeckSlug);
  const examFactsProfile = getExamFactsProfileForDeck(config.linkedDeckSlug);

  return (
    <main className="min-h-screen bg-[#f7f3ea] text-[#18140f]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader />
      <FunnelTracker
        deckSlug={config.linkedDeckSlug}
        sectionEvents={[
          { selector: "#mock-landing", name: "mock_landing_view" },
          { selector: "#mock-faq", name: "faq_view" },
        ]}
        source={`mock:${config.slug}`}
      />

      <article
        id="mock-landing"
        className="mx-auto w-full max-w-4xl px-6 py-10 sm:px-10 lg:px-12"
      >
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#1f3a5f]">
          {config.slug === "servsafe-manager-mock"
            ? `Professional certification mocks · ${mockFreeAccessPriceLabel.toLowerCase()}`
            : `Exam prep mocks · ${mockFreeAccessPriceLabel.toLowerCase()}`}
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          {seoCopy.headline}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[#4f493e]">
          {config.questionCount} questions · {config.durationMinutes} min · {config.passRule.passPercent}% pass
          target · free
        </p>

        <LlmFactsStrip
          config={config}
          linkedDeck={linkedDeck}
          profile={examFactsProfile}
          variant="mock"
        />

        {accessState ? (
          <MockExamClient
            accessState={accessState}
            config={config}
            questions={questions}
            runnable={runnable}
          />
        ) : null}

        <CollapsibleDetails
          hint="Audience, topics, and how this check fits your study plan"
          id="mock-about"
          summary="About this practice test"
        >
          <MockExamAboutSection config={config} />
        </CollapsibleDetails>

        <CollapsibleDetails
          hint="Format, scoring, and independent prep disclaimer"
          id="mock-faq"
          summary="FAQ"
        >
          <MockExamFaqSection config={config} />
        </CollapsibleDetails>

        {examFactsProfile ? (
          <CollapsibleDetails
            hint="Official format, domain weights, and verify links"
            id="mock-exam-facts"
            summary="Official exam facts"
          >
            <DeckExamFactsSection profile={examFactsProfile} compact />
          </CollapsibleDetails>
        ) : null}

        <p className="mt-8 text-xs text-[#8a7d68]">
          <a className="underline decoration-[#18140f]/20 underline-offset-4" href={absoluteUrl(`/api/mock-exams/${config.slug}`)}>
            Facts JSON
          </a>
          {" · "}
          <a className="underline decoration-[#18140f]/20 underline-offset-4" href={absoluteUrl(`/mock-exams/${config.slug}/markdown`)}>
            Markdown
          </a>
        </p>
      </article>

      <SiteFooter />
    </main>
  );
}
