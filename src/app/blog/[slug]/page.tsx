import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostView } from "@/components/blog/blog-post-view";
import { getBlogPostBySlug, getBlogPostSlugs } from "@/lib/blog";
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
    return { title: "Not found" };
  }

  const path = `/blog/${post.slug}`;
  const ogImage = absoluteUrl(post.hero.src);

  return {
    title: post.titleTag,
    description: post.metaDescription,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.metaDescription,
      url: path,
      publishedTime: post.publishedAt,
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.hero.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.metaDescription,
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) {
    notFound();
  }

  return <BlogPostView post={post} />;
}
