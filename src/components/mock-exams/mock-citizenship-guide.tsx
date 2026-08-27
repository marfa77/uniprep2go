import Link from "next/link";
import type { LinkedDeckCheckout } from "@/components/mock-exams/mock-report-handoff";
import { TrackedCheckoutLink } from "@/components/funnel-tracker";
import type { CitizenshipGuideContent } from "@/lib/mock-exams/citizenship-guide-content";
import type { Deck } from "@/lib/decks";

type GuideCtaBarProps = {
  guide: CitizenshipGuideContent;
  linkedCheckout: LinkedDeckCheckout | null;
  linkedDeck: Deck | undefined;
  variant: "top" | "bottom";
};

function deckSecondaryLabel(linkedDeck: Deck | undefined, linkedCheckout: LinkedDeckCheckout | null) {
  if (linkedCheckout?.ctaLabel) {
    return linkedCheckout.ctaLabel;
  }
  if (linkedDeck?.status === "available") {
    return "Get Anki deck";
  }
  return "Anki deck";
}

export function MockCitizenshipGuideCtaBar({
  guide,
  linkedCheckout,
  linkedDeck,
  variant,
}: GuideCtaBarProps) {
  const showDeck = guide.deckCta === "live" && Boolean(linkedDeck);
  const deckHref = linkedCheckout?.checkoutUrl
    ? linkedCheckout.checkoutUrl
    : linkedDeck
      ? `/decks/${linkedDeck.slug}`
      : null;

  return (
    <section
      aria-label={variant === "top" ? "Start practice" : "Practice again"}
      className={`rounded-2xl border border-[#1f3a5f]/15 bg-[#fffaf0] px-4 py-4 sm:px-5 sm:py-5 ${
        variant === "top" ? "mt-5" : "mt-10"
      }`}
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#1f3a5f]">
        {variant === "top" ? "Free practice" : "Ready to score your weak topics?"}
      </p>
      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <a
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#18140f] px-6 text-sm font-semibold text-[#fffaf0] transition hover:bg-[#1f3a5f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f3a5f]"
          href="#start-mock"
        >
          Start free {guide.examLabel} mock
        </a>
        {showDeck && deckHref ? (
          linkedCheckout?.checkoutUrl ? (
            <TrackedCheckoutLink
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#18140f]/20 px-6 text-sm font-semibold text-[#18140f] transition hover:border-[#18140f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f3a5f]"
              deckSlug={linkedDeck!.slug}
              href={linkedCheckout.checkoutUrl}
              source={`mock:${guide.slug}:guide:${variant}:deck`}
            >
              {deckSecondaryLabel(linkedDeck, linkedCheckout)}
            </TrackedCheckoutLink>
          ) : (
            <Link
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#18140f]/20 px-6 text-sm font-semibold text-[#18140f] transition hover:border-[#18140f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f3a5f]"
              href={deckHref}
            >
              {deckSecondaryLabel(linkedDeck, linkedCheckout)}
            </Link>
          )
        ) : null}
      </div>
      {variant === "bottom" && guide.blogAngleSlug ? (
        <p className="mt-3 text-sm text-[#5f5749]">
          Deeper angle:{" "}
          <Link
            className="font-medium text-[#1f3a5f] underline-offset-4 hover:underline"
            href={`/blog/${guide.blogAngleSlug}`}
          >
            {guide.blogAngleLabel ?? "Read the guide"}
          </Link>
          . Official format facts stay on this page.
        </p>
      ) : null}
    </section>
  );
}

export function MockCitizenshipGuideFormatTable({ guide }: { guide: CitizenshipGuideContent }) {
  return (
    <section className="mt-6" id="official-vs-diagnostic">
      <h2 className="text-2xl font-semibold tracking-tight">
        Official {guide.examLabel} vs this diagnostic
      </h2>
      <p className="mt-2 max-w-3xl text-sm leading-7 text-[#5f5749]">{guide.comparisonNote}</p>
      <div className="mt-4 overflow-x-auto rounded-2xl border border-[#18140f]/10">
        <table className="min-w-full border-collapse text-left text-sm">
          <thead>
            <tr className="bg-[#18140f] text-[#fffaf0]">
              <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-[0.16em]" scope="col">
                Detail
              </th>
              <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-[0.16em]" scope="col">
                Official exam
              </th>
              <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-[0.16em]" scope="col">
                UniPrep2Go mock
              </th>
            </tr>
          </thead>
          <tbody>
            {guide.rows.map((row, index) => (
              <tr
                className={index % 2 === 0 ? "bg-[#fffaf0]" : "bg-[#f7f3ea]"}
                key={row.label}
              >
                <th className="px-4 py-3 font-semibold text-[#18140f]" scope="row">
                  {row.label}
                </th>
                <td className="px-4 py-3 text-[#4f493e]">{row.official}</td>
                <td className="px-4 py-3 text-[#4f493e]">{row.diagnostic}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function MockCitizenshipGuideLanguageNote({ guide }: { guide: CitizenshipGuideContent }) {
  return (
    <section className="mt-10" id="language-vs-civics">
      <h2 className="text-2xl font-semibold tracking-tight">{guide.languageVsCivics.heading}</h2>
      {guide.languageVsCivics.paragraphs.map((paragraph) => (
        <p className="mt-3 max-w-3xl text-sm leading-7 text-[#4f493e]" key={paragraph.slice(0, 40)}>
          {paragraph}
        </p>
      ))}
    </section>
  );
}

export function MockCitizenshipGuideFailTraps({ guide }: { guide: CitizenshipGuideContent }) {
  return (
    <section className="mt-10" id="fail-traps">
      <h2 className="text-2xl font-semibold tracking-tight">{guide.failTrapsHeading}</h2>
      <ul className="mt-4 space-y-4">
        {guide.failTraps.map((trap) => (
          <li
            className="rounded-2xl border border-[#18140f]/10 bg-[#fffaf0] px-4 py-4 sm:px-5"
            key={trap.title}
          >
            <h3 className="text-base font-semibold text-[#18140f]">{trap.title}</h3>
            <p className="mt-2 text-sm leading-7 text-[#4f493e]">{trap.detail}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
