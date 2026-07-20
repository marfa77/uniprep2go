import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/lib/site";
import { btnPrimary, btnSecondary } from "@/lib/ui-button-classes";

const directAnswer =
  "The Anki Starter Kit for adults shows how to use a Prep2Go .apkg deck in about 15 minutes: install Anki on a laptop, import the deck, create a free AnkiWeb account, press Sync, then study daily reviews on your phone.";

const setupSteps = [
  {
    title: "Laptop first",
    time: "5 min",
    detail:
      "Install the free Anki desktop app from apps.ankiweb.net. Desktop import is the most reliable way to open a .apkg deck after purchase.",
  },
  {
    title: "Import .apkg",
    time: "2 min",
    detail:
      "Open Anki, choose File then Import, select your downloaded Prep2Go deck, and confirm. The deck appears in your deck list.",
  },
  {
    title: "Create AnkiWeb",
    time: "3 min",
    detail:
      "Create a free AnkiWeb account. This is the bridge that moves your deck and progress between laptop and phone.",
  },
  {
    title: "Press Sync",
    time: "2 min",
    detail:
      "Click Sync in Anki desktop, sign in to AnkiWeb, then choose Upload when Anki asks which collection should win.",
  },
  {
    title: "Phone study",
    time: "3 min",
    detail:
      "Install AnkiDroid on Android or AnkiMobile on iPhone, sign in with the same AnkiWeb account, sync, and start reviews.",
  },
] as const;

const visualSteps = [
  {
    label: "Import",
    title: "File → Import",
    body: "Select your downloaded .apkg file once.",
    footer: "Deck added",
  },
  {
    label: "Sync",
    title: "Press Sync",
    body: "Upload from laptop to your free AnkiWeb account.",
    footer: "AnkiWeb ready",
  },
  {
    label: "Review",
    title: "Study reviews",
    body: "Open today’s due cards and answer honestly.",
    footer: "10 min/day",
  },
] as const;

const faqs = [
  {
    question: "Is the iPhone Anki app paid?",
    answer:
      "Yes. The official iPhone app is AnkiMobile and it is paid. Anki desktop and AnkiWeb are free, and AnkiDroid on Android is free.",
  },
  {
    question: "Can I use the deck without a laptop?",
    answer:
      "Android users can often import .apkg files directly in AnkiDroid. For iPhone users, the safest path is laptop import first, then AnkiWeb sync to AnkiMobile.",
  },
  {
    question: "What if sync fails?",
    answer:
      "Check that you are signed into the same AnkiWeb account on both devices, sync desktop first, then sync the phone. If Anki asks upload or download during first setup, upload from desktop after importing the deck.",
  },
  {
    question: "How many cards should I study per day?",
    answer:
      "Start small: 10 to 20 new cards per day plus your due reviews. Consistency matters more than a huge first session.",
  },
  {
    question: "What is the daily routine?",
    answer:
      "Open Anki every morning for about 10 minutes, clear due reviews first, add a small number of new cards only if the review queue is under control, and stop before it becomes exhausting.",
  },
] as const;

export const metadata: Metadata = {
  title: "Anki Starter Kit for Adults | Use Your Prep2Go Deck in 15 Minutes",
  description: directAnswer,
  alternates: {
    canonical: "/anki-starter-kit",
  },
  openGraph: {
    title: "Anki Starter Kit for Adults",
    description: directAnswer,
    url: "/anki-starter-kit",
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "HowTo",
      "@id": `${siteConfig.url}/anki-starter-kit#howto`,
      name: "How to use your Prep2Go deck in 15 minutes",
      description: directAnswer,
      totalTime: "PT15M",
      step: setupSteps.map((step, index) => ({
        "@type": "HowToStep",
        position: index + 1,
        name: step.title,
        text: step.detail,
      })),
    },
    {
      "@type": "FAQPage",
      "@id": `${siteConfig.url}/anki-starter-kit#faq`,
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ],
};

export default function AnkiStarterKitPage() {
  return (
    <main className="min-h-screen bg-[#f7f3ea] text-[#18140f]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader />

      <article id="main-content" tabIndex={-1}>
        <section className="border-b border-[#18140f]/10">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:px-10 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:py-20">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#1f3a5f]">
                Anki Starter Kit for adults
              </p>
              <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                How to use your Prep2Go deck in 15 minutes
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#4f493e]">{directAnswer}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  className={btnPrimary}
                  href={siteConfig.starterDeckUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Download the ServSafe Manager deck
                </a>
                <a
                  className={btnSecondary}
                  href="https://app.gumroad.com/library"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Open your purchased deck
                </a>
              </div>
              <p className="mt-4 text-sm leading-6 text-[#6d6252]">
                No separate Starter Kit deck is required. This guide is here to remove setup friction after
                checkout.
              </p>
            </div>

            <div className="rounded-[2rem] border border-[#18140f]/10 bg-[#fffaf0] p-5 shadow-[0_24px_60px_-32px_rgba(24,20,15,0.35)]">
              <div className="rounded-3xl bg-[#18140f] p-4 text-[#fffaf0]">
                <div className="flex gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#f0c36a]" />
                  <span className="h-3 w-3 rounded-full bg-[#b9d7a8]" />
                  <span className="h-3 w-3 rounded-full bg-[#b7c8e8]" />
                </div>
                <div className="mt-6 rounded-2xl bg-[#fffaf0] p-4 text-[#18140f]">
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#1f3a5f]">
                    Today
                  </p>
                  <p className="mt-2 text-3xl font-semibold">10 min</p>
                  <p className="mt-2 text-sm leading-6 text-[#5f5749]">
                    Clear due reviews, add a small number of new cards, sync when finished.
                  </p>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                  <span className="rounded-full bg-[#fffaf0]/10 px-3 py-2">Laptop</span>
                  <span className="rounded-full bg-[#fffaf0]/10 px-3 py-2">AnkiWeb</span>
                  <span className="rounded-full bg-[#fffaf0]/10 px-3 py-2">Phone</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-[#18140f]/10 bg-[#fffaf0]">
          <div className="mx-auto max-w-6xl px-6 py-14 sm:px-10">
            <h2 className="text-2xl font-semibold tracking-tight">Step-by-step setup</h2>
            <ol className="mt-8 grid gap-4 lg:grid-cols-5">
              {setupSteps.map((step, index) => (
                <li className="rounded-3xl border border-[#18140f]/10 bg-[#f7f3ea] p-5" key={step.title}>
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-xs uppercase tracking-[0.18em] text-[#1f3a5f]">
                      {index + 1}
                    </span>
                    <span className="rounded-full bg-[#18140f]/5 px-3 py-1 text-xs text-[#5f5749]">
                      {step.time}
                    </span>
                  </div>
                  <h3 className="mt-4 font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#5f5749]">{step.detail}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="border-b border-[#18140f]/10">
          <div className="mx-auto max-w-6xl px-6 py-14 sm:px-10">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#1f3a5f]">
              Visual walkthrough
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight">
              Three screens to understand: import, sync, review
            </h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {visualSteps.map((step) => (
                <div className="rounded-3xl border border-[#18140f]/10 bg-[#fffaf0] p-4" key={step.title}>
                  <div className="rounded-2xl border border-[#18140f]/10 bg-[#f7f3ea] p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="font-mono text-xs uppercase tracking-[0.18em] text-[#1f3a5f]">
                        {step.label}
                      </span>
                      <span className="h-2 w-16 rounded-full bg-[#18140f]/10" />
                    </div>
                    <div className="space-y-2">
                      <span className="block h-3 w-5/6 rounded-full bg-[#18140f]/15" />
                      <span className="block h-3 w-2/3 rounded-full bg-[#18140f]/10" />
                      <span className="block h-20 rounded-2xl border border-dashed border-[#1f3a5f]/35 bg-[#fffaf0]" />
                    </div>
                  </div>
                  <h3 className="mt-4 font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#5f5749]">{step.body}</p>
                  <p className="mt-3 font-mono text-xs uppercase tracking-[0.18em] text-[#1f3a5f]">
                    {step.footer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-[#18140f]/10 bg-[#fffaf0]">
          <div className="mx-auto grid max-w-6xl gap-8 px-6 py-14 sm:px-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#1f3a5f]">
                Daily routine
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight">
                10 minutes every morning
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                "Clear due reviews before adding new cards.",
                "Add 10-20 new cards only if the queue feels manageable.",
                "Press Sync after studying so phone and laptop stay aligned.",
              ].map((item) => (
                <p className="rounded-3xl border border-[#18140f]/10 bg-[#f7f3ea] p-5 text-sm leading-6 text-[#4f493e]" key={item}>
                  {item}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="border-b border-[#18140f]/10">
          <div className="mx-auto max-w-4xl px-6 py-14 sm:px-10">
            <h2 className="text-2xl font-semibold tracking-tight">FAQ</h2>
            <dl className="mt-8 space-y-6">
              {faqs.map((faq) => (
                <div key={faq.question}>
                  <dt className="font-medium">{faq.question}</dt>
                  <dd className="mt-2 text-sm leading-7 text-[#5f5749]">{faq.answer}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                className={btnPrimary}
                href={siteConfig.starterDeckUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                Download the ServSafe Manager deck
              </a>
              <a
                className={btnSecondary}
                href="https://app.gumroad.com/library"
                rel="noopener noreferrer"
                target="_blank"
              >
                Open your purchased deck
              </a>
            </div>
          </div>
        </section>
      </article>

      <SiteFooter />
    </main>
  );
}
