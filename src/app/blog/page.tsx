import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { ledgerList } from "@/lib/ui-button-classes";
import { SiteHeader } from "@/components/site-header";
import { getAllBlogPosts } from "@/lib/blog";
import { withAiMetadata } from "@/lib/llm-meta";
import { finalize, leafPageTitle } from "@/lib/seo";
import { absoluteUrl, siteConfig } from "@/lib/site";

const blogIndexTitle = leafPageTitle("Exam Prep Guides | Citizenship, SIE, ServSafe");

const blogDescription =
  "Practical UniPrep2Go study guides for EU citizenship exams, EPA 608, ServSafe, FINRA SIE, and more — with timed mocks (first one free) and Anki decks.";

export const metadata: Metadata = withAiMetadata(
  finalize({
    title: blogIndexTitle,
    description: blogDescription,
    alternates: {
      canonical: "/blog",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
    openGraph: {
      title: "Exam Prep Guides | UniPrep2Go Blog",
      description:
        "Practical study guides for citizenship and US licensing exams — paired with free timed practice tests.",
      url: "/blog",
      type: "website",
    },
  }),
  {
    aiDescription: blogDescription,
    aiCategory: "exam-prep;blog;study-guides",
    path: "/blog",
    linkLlmsCatalog: true,
  },
);

export default function BlogIndexPage() {
  const posts = getAllBlogPosts();
  const pageUrl = absoluteUrl("/blog");
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": `${pageUrl}#blog`,
        name: "UniPrep2Go Exam Prep Guides",
        description:
          "Practical study guides for US licensing and finance exams, paired with timed mocks (first one free).",
        url: pageUrl,
        publisher: {
          "@type": "Organization",
          name: siteConfig.name,
          url: siteConfig.url,
        },
        blogPost: posts.map((post) => ({
          "@type": "BlogPosting",
          headline: post.title,
          description: post.metaDescription,
          datePublished: post.publishedAt,
          url: absoluteUrl(`/blog/${post.slug}`),
          image: absoluteUrl(post.hero.src),
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
            name: "Blog",
            item: pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#f7f3ea] text-[#18140f]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader />

      <div className="mx-auto w-full max-w-3xl px-6 py-10 sm:px-10 lg:px-12" id="main-content">
        <h1 className="text-5xl tracking-tight text-ink">Guides</h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">
          Exam format, pass rules, and which product to use. One guide per question.
        </p>

        <ul className={`mt-10 ${ledgerList}`}>
          {posts.map((post) => (
            <li className="py-6" key={post.slug}>
              <h2 className="text-2xl text-ink">
                <Link className="hover:underline" href={`/blog/${post.slug}`}>
                  {post.title}
                </Link>
              </h2>
              <p className="mt-2 text-base leading-7 text-muted">{post.metaDescription}</p>
              <p className="mt-3">
                <Link
                  className="text-sm font-semibold text-navy underline-offset-4 hover:underline"
                  href={`/blog/${post.slug}`}
                >
                  Read guide
                </Link>
              </p>
            </li>
          ))}
        </ul>
      </div>

      <SiteFooter />
    </main>
  );
}
