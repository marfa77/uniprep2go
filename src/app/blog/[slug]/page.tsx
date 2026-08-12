import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostView } from "@/components/blog/blog-post-view";
import { getBlogPostBySlug, getBlogPostSlugs } from "@/lib/blog";
import { withAiMetadata } from "@/lib/llm-meta";
import { fitMetaDescription, leafPageTitle } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getBlogPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) {
    return { title: "Not found", robots: { index: false, follow: false } };
  }

  const path = `/blog/${post.slug}`;
  const ogImage = absoluteUrl(post.hero.src);
  const description = fitMetaDescription(post.metaDescription);
  const aiDescription = (post.intro || post.metaDescription).slice(0, 500);

  return withAiMetadata(
    {
      // Absolute title — avoid "| UniPrep2Go" doubling past SERP truncation.
      title: leafPageTitle(post.titleTag, 60),
      description,
      alternates: {
        canonical: path,
      },
      robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, "max-image-preview": "large" },
      },
      openGraph: {
        type: "article",
        title: post.title,
        description,
        url: path,
        publishedTime: post.publishedAt,
        images: [{ url: ogImage, width: 1200, height: 630, alt: post.hero.alt }],
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description,
        images: [ogImage],
      },
    },
    {
      aiDescription,
      aiCategory: `exam-prep;blog;${post.clusterId ?? "guide"}`,
      path,
    },
  );
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) {
    notFound();
  }

  return <BlogPostView post={post} />;
}
