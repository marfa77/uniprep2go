import Link from "next/link";
import {
  getBlogPostsForDeckSlug,
  getBlogPostsForMockSlug,
  type BlogPost,
} from "@/lib/blog";

type RelatedExamGuidesSectionProps = {
  mockSlug?: string;
  deckSlug?: string;
  /** Heading override for context (mock vs deck page). */
  heading?: string;
};

function resolveGuides({
  mockSlug,
  deckSlug,
}: RelatedExamGuidesSectionProps): BlogPost[] {
  if (mockSlug) {
    return getBlogPostsForMockSlug(mockSlug);
  }
  if (deckSlug) {
    return getBlogPostsForDeckSlug(deckSlug);
  }
  return [];
}

/** Reverse link from product pages (mock / deck) back to niche exam guides. */
export function RelatedExamGuidesSection({
  mockSlug,
  deckSlug,
  heading = "Exam prep guides",
}: RelatedExamGuidesSectionProps) {
  const guides = resolveGuides({ mockSlug, deckSlug });
  if (guides.length === 0) {
    return null;
  }

  return (
    <section className="mt-12" id="exam-prep-guides">
      <h2 className="text-2xl font-semibold tracking-tight">{heading}</h2>
      <p className="mt-3 text-sm leading-7 text-[#4f493e]">
        State rules, test-day logistics, and study plans that point back to this practice path.
      </p>
      <ul className="mt-5 divide-y divide-[#18140f]/10 border-y border-[#18140f]/10">
        {guides.map((guide) => (
          <li key={guide.slug}>
            <Link
              className="block py-4 transition hover:bg-[#fffaf0]/60"
              href={`/blog/${guide.slug}`}
            >
              <span className="font-medium text-[#18140f]">{guide.title}</span>
              <span className="mt-1 block text-sm leading-6 text-[#5f5749]">
                {guide.metaDescription}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm">
        <Link
          className="font-medium text-[#1f3a5f] underline-offset-4 hover:underline"
          href="/blog"
        >
          Browse all exam prep guides →
        </Link>
      </p>
    </section>
  );
}
