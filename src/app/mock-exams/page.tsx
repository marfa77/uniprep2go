import Link from "next/link";
import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getAllMockExams } from "@/lib/mock-exams/configs";
import { isMockExamRunnable } from "@/lib/mock-exams/question-bank";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Free Mock Exams & Readiness Checks | UniPrep2Go",
  description:
    "Free timed SIE, ServSafe Manager, CFA, FRM, Series 7, Series 63, insurance, and California real estate readiness checks with topic scoring and pass/no-pass reports.",
  alternates: {
    canonical: "/mock-exams",
  },
  openGraph: {
    title: "Free Mock Exams & Readiness Checks | UniPrep2Go",
    description:
      "Free timed SIE, ServSafe Manager, CFA, FRM, Series 7, Series 63, insurance, and California real estate readiness checks with topic scoring and pass/no-pass reports.",
    url: "/mock-exams",
    type: "website",
  },
};

export const revalidate = 3600;

export default function MockExamsIndexPage() {
  const mocks = getAllMockExams();

  return (
    <main className="min-h-screen bg-[#f7f3ea] text-[#18140f]">
      <SiteHeader />

      <article className="mx-auto w-full max-w-4xl px-6 py-10 sm:px-10 lg:px-12">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#1f3a5f]">Finance mock exams</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          Timed mocks built from UniPrep2Go deck content
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[#4f493e]">
          {siteConfig.name} converts deck cards into exam-style multiple choice, scores weighted topics,
          and returns a full pass/no-pass readiness report. Use it as a baseline diagnostic before
          you decide what to drill next. Free during launch month.
        </p>
        <ul className="mt-6 grid gap-3 text-sm leading-6 text-[#4f493e] sm:grid-cols-3">
          <li className="rounded-2xl bg-[#18140f]/5 px-4 py-3">Timed exam-style questions</li>
          <li className="rounded-2xl bg-[#18140f]/5 px-4 py-3">Weighted topic score breakdown</li>
          <li className="rounded-2xl bg-[#18140f]/5 px-4 py-3">Wrong-answer review and linked deck repair plan</li>
        </ul>

        <div className="mt-10 space-y-4">
          {mocks.map((mock) => {
            const runnable = isMockExamRunnable(mock.slug);

            return (
              <Link
                key={mock.slug}
                className="block rounded-3xl border border-[#18140f]/10 bg-[#fffaf0] p-6 transition hover:border-[#1f3a5f]/30"
                href={`/mock-exams/${mock.slug}`}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-xl font-semibold">{mock.title}</h2>
                  <span className="rounded-full bg-[#1f3a5f]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#1f3a5f]">
                    {mock.status === "live" ? "Full mock available" : "Preview readiness check"}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-7 text-[#4f493e]">{mock.description}</p>
                <p className="mt-4 text-sm text-[#5f5749]">
                  {mock.questionCount} questions · {mock.durationMinutes} minutes · pass {mock.passRule.passPercent}%
                  {runnable ? "" : " · bank expanding"}
                </p>
              </Link>
            );
          })}
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}
