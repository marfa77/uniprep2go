export const siteConfig = {
  name: "UniPrep2Go",
  url: "https://uniprep2go.study",
  description:
    "Free timed practice tests with topic scoring for US licensing and finance exams — CFA, FRM, California real estate, FINRA — plus focused Anki decks and printable formula PDFs for daily remediation after your mock.",
  primaryMarket: "United States",
  primaryPositioning:
    "US exam prep built around free timed online mocks and readiness checks — topic scoring, answer review, and pass/no-pass reports — with focused Anki decks and printable PDFs as the linked remediation layer (not bloated mega-deck dumps).",
  primaryUseCases: [
    "FINRA SIE, Series 7, and Series 63 exam prep",
    "US insurance and California real estate licensing exam prep",
    "CFA Level 1 / FRM Part 1 Anki + free timed mocks + formula sheets",
    "Other US licensing and specialty exam practice tests (also on this site)",
    "Language decks and EU citizenship prep live on Prep2Go; UniPrep keeps free mocks indexed",
  ],
  contactEmail: "support@uniprep2go.study",
  customDeckInquiry: {
    title: "Custom decks on request",
    summary:
      "We build custom Anki decks to order — licensing exams, language certifications, corporate training, immigration topics, and niche subjects not yet in the catalog.",
    instructions:
      "Email us with your exam or topic, target audience, preferred card count, and deadline. We will reply with scope, timeline, and pricing.",
    mailtoSubject: "Custom deck inquiry",
  },
  partnerDeckInquiry: {
    title: "Sell your Anki deck on UniPrep",
    summary:
      "Bring any Anki deck that clears quality review — UniPrep handles the rest: we build a free timed mock from your bank, publish deck + mock with SEO and LLM/GEO citation pages, sell on UniPrep/Gumroad at a price we agree with you, ping sales and funnel stats to your Telegram, and pay 70% of net (after Gumroad fees) monthly bank-to-bank once your accrued share hits $100.",
    instructions:
      "Email support@uniprep2go.study with topic/exam, card count, sample cards or a private .apkg, proof of rights, payout country, Telegram for stats, and your price ask. Any subject is welcome if quality passes; you do not build the mock — we do. No upload portal or author web dashboard — email intake only.",
    mailtoSubject: "Partner Anki deck submission",
    authorSharePercent: 70,
    uniSharePercent: 30,
    minPayoutUsd: 100,
    statsChannel: "Telegram",
    intentPath: "/sell-anki-deck",
  },
  checkoutProviders: "Gumroad, Lemon Squeezy, and the Prep2Go Immigration App Store",
  checkoutSellers: "PixID Studio and Prep2Go",
  gumroadStoreUrl: "https://pixidstudio.gumroad.com",
  starterDeckUrl: "https://pixidstudio.gumroad.com/l/ldpevc?wanted=true",
  lemonSqueezyStoreUrl: "https://ciple-a2.lemonsqueezy.com",
  googleAnalyticsId: "G-NDF8PVD7N3",
  ahrefsAnalyticsKey: "X11yI8gl/4QXmr55ol2GlA",
  legalLastUpdated: "2026-06-01",
  footerDisclaimer: {
    independence:
      "UniPrep2Go is an independent publisher of supplementary study materials. Our Anki decks and app content are for personal exam preparation only — not official exam materials, curriculum replacements, practice exams, or professional advice.",
    trademarks:
      "CFA® and Chartered Financial Analyst® are trademarks owned by CFA Institute. Other exam, credential, and program names on this site belong to their respective owners. No exam body or government authority — including CFA Institute, FINRA, GARP, IB, CAPLE, or immigration agencies — endorses, promotes, sponsors, or warrants our products.",
  },
} as const;

export const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/cookies", label: "Cookie Policy" },
  { href: "/contact", label: "Contact" },
] as const;

export function customDeckMailtoUrl() {
  const subject = encodeURIComponent(siteConfig.customDeckInquiry.mailtoSubject);

  return `mailto:${siteConfig.contactEmail}?subject=${subject}`;
}

export function partnerDeckMailtoUrl() {
  const subject = encodeURIComponent(siteConfig.partnerDeckInquiry.mailtoSubject);

  return `mailto:${siteConfig.contactEmail}?subject=${subject}`;
}

export function absoluteUrl(path: string) {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}
