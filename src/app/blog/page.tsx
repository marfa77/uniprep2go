import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getAllBlogPosts } from "@/lib/blog";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Exam Prep Guides — Citizenship, EPA 608, ServSafe, FINRA",
  description:
    "Practical UniPrep2Go study guides for EU citizenship exams, EPA 608, ServSafe, FINRA SIE, and more — with free timed mocks and Anki decks.",
  alternates: {
    canonical: "/blog",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    title: "Exam Prep Guides — UniPrep2Go Blog",
    description:
      "Practical study guides for citizenship and US licensing exams — paired with free timed practice tests.",
    url: "/blog",
    type: "website",
  },
};

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
          "Practical study guides for US licensing and finance exams, paired with free timed mocks.",
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
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#1f3a5f]">Blog</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          Exam prep guides
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-[#4f493e]">
          What the exam actually tests, the numbers that trip people up, and how to use a free mock
          without fooling yourself — then repair gaps with Anki.
        </p>

        <ul className="mt-12 divide-y divide-[#18140f]/10 border-y border-[#18140f]/10">
          {posts.map((post) => (
            <li className="py-8" key={post.slug}>
              <Link
                className="block overflow-hidden rounded-2xl border border-[#18140f]/10"
                href={`/blog/${post.slug}`}
              >
                <Image
                  alt={post.hero.alt}
                  className="h-48 w-full object-cover sm:h-56"
                  height={630}
                  src={post.hero.src}
                  width={1200}
                />
              </Link>
              <p className="mt-5 font-mono text-xs uppercase tracking-[0.16em] text-[#7a6e5a]">
                {post.eyebrow} · {post.publishedAt}
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight">
                <Link className="hover:underline" href={`/blog/${post.slug}`}>
                  {post.title}
                </Link>
              </h2>
              <p className="mt-3 text-base leading-7 text-[#4f493e]">{post.metaDescription}</p>
              <p className="mt-4">
                <Link
                  className="text-sm font-semibold text-[#1f3a5f] underline-offset-4 hover:underline"
                  href={`/blog/${post.slug}`}
                >
                  Read guide →
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
