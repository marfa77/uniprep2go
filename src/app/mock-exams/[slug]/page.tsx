import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { FunnelTracker } from "@/components/funnel-tracker";
import { MockExamClient } from "@/components/mock-exams/mock-exam-client";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getMockAccessState } from "@/lib/mock-exams/access";
import { getAllMockExams, getMockExamConfig } from "@/lib/mock-exams/configs";
import { buildMockExamPageJsonLd } from "@/lib/mock-exams/llm";
import { getQuestionBank, isMockExamRunnable } from "@/lib/mock-exams/question-bank";
import { absoluteUrl } from "@/lib/site";

export const revalidate = 3600;

function buildMockSeoTitle(config: NonNullable<ReturnType<typeof getMockExamConfig>>) {
  if (config.slug === "sie-full-mock") {
    return "Free 2026 SIE Mock Exam | 75 Questions + Score Report";
  }

  if (config.slug === "cfa-level-1-readiness-check") {
    return "Free CFA Level 1 Readiness Check | 60 Questions + Report";
  }

  if (config.slug === "servsafe-manager-mock") {
    return "Free 2026 ServSafe Manager Mock Exam | 90 Questions + Score Report";
  }

  return `Free ${config.shortTitle} | ${config.questionCount}-Question Diagnostic`;
}

function buildMockSeoDescription(config: NonNullable<ReturnType<typeof getMockExamConfig>>) {
  const type = config.status === "live" ? "mock exam" : "readiness diagnostic";

  return `Take a free timed ${type}: ${config.questionCount} questions, ${config.durationMinutes} minutes, ${config.passRule.passPercent}% target, topic scoring, explanations, and pass/no-pass report.`;
}

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

  const title = buildMockSeoTitle(config);
  const description = buildMockSeoDescription(config);

  return {
    title,
    description,
    alternates: {
      canonical: `/mock-exams/${config.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `/mock-exams/${config.slug}`,
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
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

  return (
    <main className="min-h-screen bg-[#f7f3ea] text-[#18140f]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader />
      <FunnelTracker
        deckSlug={config.linkedDeckSlug}
        sectionEvents={[{ selector: "#mock-landing", name: "mock_landing_view" }]}
        source={`mock:${config.slug}`}
      />

      <article
        id="mock-landing"
        className="mx-auto w-full max-w-4xl px-6 py-10 sm:px-10 lg:px-12"
      >
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#1f3a5f]">
          {config.slug === "servsafe-manager-mock"
            ? "Professional certification mocks · free during launch month"
            : "Finance mock exams · free during launch month"}
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          {config.title}
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[#4f493e]">{config.description}</p>
        <p className="mt-4 text-sm text-[#7a6e5a]">
          Linked deck:{" "}
          <a className="underline decoration-[#18140f]/20 underline-offset-4" href={`/decks/${config.linkedDeckSlug}`}>
            {config.linkedDeckSlug}
          </a>
          {" · "}
          <a className="underline decoration-[#18140f]/20 underline-offset-4" href={absoluteUrl(`/api/mock-exams/${config.slug}`)}>
            Facts JSON
          </a>
          {" · "}
          <a className="underline decoration-[#18140f]/20 underline-offset-4" href={absoluteUrl(`/mock-exams/${config.slug}/markdown`)}>
            Markdown
          </a>
        </p>

        {accessState ? (
          <MockExamClient
            accessState={accessState}
            config={config}
            questions={questions}
            runnable={runnable}
          />
        ) : null}
      </article>

      <SiteFooter />
    </main>
  );
}
