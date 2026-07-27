export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | {
      type: "topics";
      items: Array<{ title: string; body: string; bullets?: string[] }>;
    }
  | {
      type: "steps";
      items: Array<{ title: string; body: string }>;
    }
  | {
      type: "table";
      caption?: string;
      headers: string[];
      rows: string[][];
    };

export type BlogSection = {
  heading: string;
  blocks: BlogBlock[];
};

export type BlogFaq = {
  question: string;
  answer: string;
};

export type BlogImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type BlogPost = {
  slug: string;
  /** Visible H1 */
  title: string;
  /** `<title>` without site suffix — layout adds `| UniPrep2Go` when not absolute */
  titleTag: string;
  metaDescription: string;
  publishedAt: string;
  eyebrow: string;
  intro: string;
  /** Content cluster id for related guides (e.g. "servsafe", "epa-608") */
  clusterId: string;
  /** Other blog slugs in the same cluster (cross-links) */
  relatedSlugs: string[];
  mockSlug: string;
  deckSlug: string;
  /** Hero stock image — required for published guides */
  hero: BlogImage;
  /** Mid-article stock images (auto-placed between sections) */
  inlineImages: BlogImage[];
  cta: {
    mockLabel: string;
    deckLabel: string;
    summary: string;
  };
  sections: BlogSection[];
  faqs: BlogFaq[];
  bottomLine: string;
};

/** Post authors omit images; `withBlogStockImages` attaches Pexels heroes. */
export type BlogPostDraft = Omit<BlogPost, "hero" | "inlineImages">;
