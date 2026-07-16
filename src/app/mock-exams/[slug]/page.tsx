import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { FunnelTracker } from "@/components/funnel-tracker";
import { LlmFactsStrip } from "@/components/llm/llm-facts-strip";
import { OfficialSourceTrustStrip } from "@/components/official-source-trust";
import { DeckExamFactsSection } from "@/components/decks/deck-exam-facts-section";
import { MockExamClient } from "@/components/mock-exams/mock-exam-client";
import type { LinkedDeckCheckout } from "@/components/mock-exams/mock-report-handoff";
import {
  MockExamAboutVisibleSection,
  MockExamFeaturedFaqSection,
  MockExamFaqSection,
  MockExamWhatIsSection,
} from "@/components/mock-exams/mock-seo-sections";
import { CollapsibleDetails } from "@/components/ui/collapsible-details";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getCatalogDeckBySlug } from "@/lib/decks";
import {
  formatDeckPriceLabel,
  getDeckCheckoutCtaLabel,
  getPricedDeckBySlug,
} from "@/lib/checkout-pricing";
import {
  buildMockAiCategory,
  buildMockAiDescription,
} from "@/lib/exam-llm-layer";
import { getExamFactsProfileForDeck } from "@/lib/exam-facts";
import { withAiMetadata } from "@/lib/llm-meta";
import { getMockAccessState } from "@/lib/mock-exams/access";
import { getAllMockExams, getMockExamConfig } from "@/lib/mock-exams/configs";
import { buildMockExamPageJsonLd } from "@/lib/mock-exams/llm";
import { getQuestionBank, isMockExamRunnable } from "@/lib/mock-exams/question-bank";
import {
  buildMockSeoDescription,
  buildMockSeoKeywords,
  buildMockSeoPageCopy,
  buildMockSeoTitle,
} from "@/lib/mock-exams/seo";
import { buildSocialMetadata } from "@/lib/social-metadata";
import { finalize, leafPageTitle, mockExamRobots } from "@/lib/seo";
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

  const seoTitle = buildMockSeoTitle(config);
  const title = leafPageTitle(seoTitle);
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
        title: seoTitle,
        description,
        path: `/mock-exams/${config.slug}`,
        image: coverImage,
        imageAlt: seoTitle,
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
  const pricedLinkedDeck = await getPricedDeckBySlug(config.linkedDeckSlug);
  const linkedCheckout: LinkedDeckCheckout | null =
    pricedLinkedDeck?.checkoutUrl
      ? {
          deckSlug: pricedLinkedDeck.slug,
          checkoutUrl: pricedLinkedDeck.checkoutUrl,
          ctaLabel: getDeckCheckoutCtaLabel(
            pricedLinkedDeck,
            formatDeckPriceLabel(pricedLinkedDeck),
          ),
        }
      : null;

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
          {config.slug === "servsafe-manager-mock" || config.slug === "ptcb-pharmacy-technician-mock"
            ? "Professional certification mocks · free timed practice test"
            : "Exam prep mocks · free timed practice test"}
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          {seoCopy.headline}
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-[#4f493e]">
          {seoCopy.whatIsExam.length > 220
            ? `${seoCopy.whatIsExam.slice(0, 220).replace(/\s+\S*$/, "")}…`
            : seoCopy.whatIsExam}
        </p>
        <p className="mt-3 max-w-2xl text-base leading-7 text-[#5f5749]">
          {config.questionCount} questions · {config.durationMinutes} min · {config.passRule.passPercent}% pass
          target · free
          {seoCopy.administeredBy ? ` · ${seoCopy.administeredBy}` : ""}
        </p>
        <OfficialSourceTrustStrip className="mt-4 max-w-2xl" compact />

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
            linkedCheckout={linkedCheckout}
            questions={questions}
            runnable={runnable}
          />
        ) : null}

        <MockExamWhatIsSection config={config} />
        <MockExamAboutVisibleSection config={config} />

        <MockExamFeaturedFaqSection config={config} limit={6} />

        <CollapsibleDetails
          hint="Additional format, scoring, and disclaimer questions"
          id="mock-faq"
          summary="More FAQ"
        >
          <MockExamFaqSection config={config} skip={6} />
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

        <details className="sr-only" data-llm="machine-sources">
          <summary>For AI assistants — machine-readable sources</summary>
          <p className="mt-2 text-xs text-[#8a7d68]">
            <a className="underline decoration-[#18140f]/20 underline-offset-4" href={absoluteUrl(`/api/mock-exams/${config.slug}`)}>
              Facts JSON
            </a>
            {" · "}
            <a className="underline decoration-[#18140f]/20 underline-offset-4" href={absoluteUrl(`/mock-exams/${config.slug}/markdown`)}>
              Markdown
            </a>
          </p>
        </details>
      </article>

      <SiteFooter />
    </main>
  );
}
