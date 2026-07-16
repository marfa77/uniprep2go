import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "../..");
const SITE = "https://uniprep2go.study";
const TITLE_MAX = 57;

export function loadJson(relPath) {
  return JSON.parse(readFileSync(join(ROOT, relPath), "utf8"));
}

function extractMeta(html, attr, name) {
  const re = new RegExp(
    `<meta[^>]+${attr}=["']${name}["'][^>]+content=["']([^"']*)["']|<meta[^>]+content=["']([^"']*)["'][^>]+${attr}=["']${name}["']`,
    "i",
  );
  const m = html.match(re);
  return (m?.[1] ?? m?.[2] ?? "").trim();
}

function extractTag(html, tag) {
  const m = html.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return m?.[1]?.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() ?? "";
}

export async function fetchPageSeo(url) {
  try {
    const response = await fetch(url, {
      headers: { "User-Agent": "UniPrep2Go-SEO-Audit/1.0" },
      redirect: "follow",
    });
    const html = await response.text();
    const title = extractTag(html, "title");
    const description =
      extractMeta(html, "name", "description") || extractMeta(html, "property", "og:description");
    const canonical = (html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)?.[1] ??
      html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i)?.[1] ??
      "");
    const robots = extractMeta(html, "name", "robots");
    const h1 = extractTag(html, "h1");
    return {
      url,
      status: response.status,
      ok: response.ok,
      title,
      titleLen: title.length,
      description,
      descriptionLen: description.length,
      canonical,
      robots,
      h1,
    };
  } catch (error) {
    return { url, ok: false, error: String(error.message ?? error) };
  }
}

export async function collectInventory({ scope = "all" } = {}) {
  const configs = await import("../../src/lib/mock-exams/configs.ts");
  const decksMod = await import("../../src/lib/decks.ts");
  const seoMod = await import("../../src/lib/seo.ts");
  const deckSeoMod = await import("../../src/lib/deck-seo.ts");
  const mockSeoMod = await import("../../src/lib/mock-exams/seo.ts");

  const specs = existsSync(join(ROOT, "src/data/building-deck-specs.json"))
    ? loadJson("src/data/building-deck-specs.json")
    : {};
  const gumroad = existsSync(join(ROOT, "src/data/gumroad/building-anki-decks.json"))
    ? loadJson("src/data/gumroad/building-anki-decks.json")
    : { products: {} };

  const allMocks = configs.getAllMockExams();
  const availableDecks = decksMod.availableDecks ?? [];
  const plannedDecks = (decksMod.catalogPlannedDecks ?? []).length
    ? decksMod.catalogPlannedDecks
    : [];

  const buildingSlugs = new Set(Object.keys(specs));
  const isBuilding = (slug) => buildingSlugs.has(slug);
  const inScope = (slug, kind) => {
    if (scope === "all") return true;
    if (scope === "building") return isBuilding(slug);
    if (scope === "gmat") return slug.includes("gmat");
    if (scope === "finance") {
      const deck = availableDecks.find((d) => d.slug === slug);
      return deck?.category === "finance" || slug.includes("cfa") || slug.includes("frm") || slug.includes("series") || slug.includes("sie");
    }
    return slug.includes(scope);
  };

  const decks = availableDecks
    .filter((d) => inScope(d.slug, "deck"))
    .map((deck) => {
      const profile = deckSeoMod.getDeckSeoProfile(deck);
      const title = deckSeoMod.buildDeckSeoTitle(deck);
      const mock = configs.getAllMockExams().find((m) => m.linkedDeckSlug === deck.slug);
      const gumroadRecord = gumroad.products?.[deck.slug];
      return {
        slug: deck.slug,
        status: deck.status,
        category: deck.category,
        checkoutUrl: deck.checkoutUrl ?? null,
        checkoutProvider: deck.checkoutProvider ?? null,
        title,
        titleLen: title.length,
        description: profile.description,
        descriptionLen: profile.description.length,
        keywords: profile.keywords,
        headline: profile.headline,
        linkedMock: mock?.slug ?? null,
        mockIndexed: mock ? seoMod.shouldIndexMockExam(mock.slug) : false,
        gumroadLinked: Boolean(gumroadRecord?.gumroadProductId),
        gumroadPublished: Boolean(gumroadRecord?.publishedAt),
        isBuilding: isBuilding(deck.slug),
        pageUrl: `${SITE}/decks/${deck.slug}`,
      };
    });

  const plannedInCatalog = [];
  for (const [slug, spec] of Object.entries(specs)) {
    if (!inScope(slug, "deck")) continue;
    const liveDeck = availableDecks.find((d) => d.slug === slug);
    const gumroadRecord = gumroad.products?.[slug];
    if (!liveDeck || liveDeck.status === "planned") {
      plannedInCatalog.push({
        slug,
        gumroadName: spec.gumroadName,
        cardCount: spec.cardCount,
        gumroadLive: Boolean(gumroadRecord?.gumroadProductId),
        siteStatus: liveDeck?.status ?? "missing-from-available",
      });
    }
  }

  const mocks = allMocks
    .filter((m) => inScope(m.slug, "mock") || (m.linkedDeckSlug && inScope(m.linkedDeckSlug, "deck")))
    .map((mock) => {
      const profile = mockSeoMod.getMockSeoProfile(mock);
      const title = mockSeoMod.buildMockSeoTitle(mock);
      return {
        slug: mock.slug,
        status: mock.status,
        questionCount: mock.questionCount,
        linkedDeckSlug: mock.linkedDeckSlug,
        indexed: seoMod.shouldIndexMockExam(mock.slug),
        title,
        titleLen: title.length,
        description: profile.description,
        descriptionLen: profile.description.length,
        keywords: profile.keywords,
        pageUrl: `${SITE}/mock-exams/${mock.slug}`,
      };
    });

  return {
    collectedAt: new Date().toISOString(),
    scope,
    site: SITE,
    decks,
    plannedInCatalog,
    mocks,
    gumroadProductCount: Object.keys(gumroad.products ?? {}).length,
  };
}

export function runRuleChecks(inventory) {
  const issues = [];
  const DESC_MIN = 120;
  const DESC_MAX = 165;
  const TITLE_MIN = 35;

  for (const deck of inventory.decks) {
    if (deck.titleLen > TITLE_MAX) {
      issues.push({
        severity: "high",
        code: "title-too-long",
        entity: deck.slug,
        type: "deck",
        message: `Title ${deck.titleLen} chars (max ${TITLE_MAX}): "${deck.title}"`,
      });
    }
    if (deck.titleLen > 0 && deck.titleLen < TITLE_MIN && deck.status === "available") {
      issues.push({
        severity: "medium",
        code: "title-too-short",
        entity: deck.slug,
        type: "deck",
        message: `Title only ${deck.titleLen} chars: "${deck.title}"`,
      });
    }
    if (deck.descriptionLen < DESC_MIN) {
      issues.push({
        severity: "medium",
        code: "description-thin",
        entity: deck.slug,
        type: "deck",
        message: `Description only ${deck.descriptionLen} chars`,
      });
    }
    if (deck.descriptionLen > DESC_MAX) {
      issues.push({
        severity: "low",
        code: "description-long",
        entity: deck.slug,
        type: "deck",
        message: `Description ${deck.descriptionLen} chars (SERP soft max ~${DESC_MAX})`,
      });
    }
    if (!(deck.keywords?.length >= 3) && deck.status === "available") {
      issues.push({
        severity: "medium",
        code: "keywords-thin",
        entity: deck.slug,
        type: "deck",
        message: `Only ${deck.keywords?.length ?? 0} SEO keywords`,
      });
    }
    // Language / survival / formula PDFs are Anki-only by design — not a funnel bug.
    const ankiOnlyOk =
      deck.category === "language" ||
      /survival|grammar|formula-reference|printable|prep2go-app|study-guide|trader-anki|commodity-trader|ib-biology/i.test(
        deck.slug,
      );
    if (deck.status === "available" && !deck.linkedMock && !ankiOnlyOk) {
      issues.push({
        severity: "high",
        code: "deck-without-mock",
        entity: deck.slug,
        type: "deck",
        message: "Available deck has no linked mock — weak free→paid funnel SEO",
      });
    } else if (deck.status === "available" && !deck.linkedMock && ankiOnlyOk) {
      issues.push({
        severity: "low",
        code: "anki-only-no-mock",
        entity: deck.slug,
        type: "deck",
        message: "Anki-only product (no mock by design)",
      });
    }
    if (deck.status === "available" && deck.linkedMock && !deck.mockIndexed) {
      issues.push({
        severity: "high",
        code: "deck-live-mock-noindex",
        entity: deck.slug,
        type: "deck",
        message: `Deck available but linked mock ${deck.linkedMock} is noindex`,
      });
    }
    if (deck.status === "planned" && deck.gumroadLinked && deck.checkoutProvider === "Gumroad") {
      issues.push({
        severity: "critical",
        code: "planned-but-gumroad-live",
        entity: deck.slug,
        type: "deck",
        message: "Deck marked planned on site but Gumroad product exists — SEO/conversion leak",
      });
    }
    if (deck.linkedMock && deck.mockIndexed && !deck.checkoutUrl && deck.status === "available") {
      issues.push({
        severity: "high",
        code: "indexed-funnel-no-checkout",
        entity: deck.slug,
        type: "deck",
        message: "Indexed mock funnel without checkout URL on deck page",
      });
    }
    if (deck.isBuilding && deck.gumroadLinked && deck.status !== "available") {
      issues.push({
        severity: "critical",
        code: "building-gumroad-site-mismatch",
        entity: deck.slug,
        type: "deck",
        message: `Building deck Gumroad live but site status=${deck.status}`,
      });
    }
    if (deck.isBuilding && deck.status === "available" && !deck.gumroadLinked) {
      issues.push({
        severity: "high",
        code: "building-available-no-gumroad",
        entity: deck.slug,
        type: "deck",
        message: "Building deck available on site without Gumroad product id",
      });
    }
  }

  for (const row of inventory.plannedInCatalog) {
    if (row.gumroadLive) {
      issues.push({
        severity: "critical",
        code: "spec-gumroad-ahead-of-site",
        entity: row.slug,
        type: "catalog",
        message: `${row.gumroadName} sold on Gumroad but site shows ${row.siteStatus}`,
      });
    }
  }

  for (const mock of inventory.mocks) {
    if (mock.titleLen > TITLE_MAX + 3) {
      issues.push({
        severity: "medium",
        code: "mock-title-long",
        entity: mock.slug,
        type: "mock",
        message: `Mock title ${mock.titleLen} chars: "${mock.title}"`,
      });
    }
    if (mock.descriptionLen < DESC_MIN && mock.indexed) {
      issues.push({
        severity: "medium",
        code: "mock-description-thin",
        entity: mock.slug,
        type: "mock",
        message: `Indexed mock description only ${mock.descriptionLen} chars`,
      });
    }
    if (!mock.indexed && mock.status === "live" && mock.linkedDeckSlug) {
      const deck = inventory.decks.find((d) => d.slug === mock.linkedDeckSlug);
      if (deck?.checkoutUrl && (deck.gumroadLinked || deck.checkoutProvider === "Gumroad" || deck.checkoutProvider === "Lemon Squeezy")) {
        issues.push({
          severity: "high",
          code: "mock-not-indexed-paid-deck-live",
          entity: mock.slug,
          type: "mock",
          message: `Mock noindex but linked deck ${mock.linkedDeckSlug} is monetized`,
        });
      }
    }
    if (mock.indexed && mock.status !== "live") {
      issues.push({
        severity: "critical",
        code: "indexed-but-not-live",
        entity: mock.slug,
        type: "mock",
        message: `Mock marked indexed but status=${mock.status}`,
      });
    }
  }

  const keywordMap = new Map();
  for (const mock of inventory.mocks.filter((m) => m.indexed)) {
    for (const kw of mock.keywords ?? []) {
      const key = kw.toLowerCase();
      if (!keywordMap.has(key)) keywordMap.set(key, []);
      keywordMap.get(key).push(mock.slug);
    }
  }
  for (const [kw, slugs] of keywordMap) {
    if (slugs.length > 1) {
      issues.push({
        severity: "low",
        code: "keyword-overlap",
        entity: slugs.join(", "),
        type: "mock",
        message: `Shared keyword "${kw}" across ${slugs.length} indexed mocks`,
      });
    }
  }

  return issues.sort((a, b) => {
    const rank = { critical: 0, high: 1, medium: 2, low: 3 };
    return rank[a.severity] - rank[b.severity];
  });
}

/** Local synthesis (no LLM) — same shape as lead_editor for markdown rendering. */
export function synthesizeLocalAudit(inventory, ruleIssues, liveSamples = []) {
  const bySev = { critical: 0, high: 0, medium: 0, low: 0 };
  for (const i of ruleIssues) bySev[i.severity] = (bySev[i.severity] ?? 0) + 1;

  const liveFails = liveSamples.filter((s) => !s.ok || s.status !== 200);
  const titleLong = liveSamples.filter((s) => s.ok && (s.titleLen ?? 0) > TITLE_MAX);
  const noCanon = liveSamples.filter((s) => s.ok && !s.canonical);
  const noindexLive = liveSamples.filter(
    (s) => s.ok && /noindex/i.test(s.robots ?? "") && !/preview|planned/i.test(s.url),
  );

  // Soften: many catalog rows are intentional; cap deductions.
  let score = 100;
  score -= Math.min(36, bySev.critical * 12);
  score -= Math.min(30, bySev.high * 3);
  score -= Math.min(12, bySev.medium * 2);
  score -= Math.min(8, bySev.low * 0.25);
  score -= Math.min(16, liveFails.length * 8);
  score -= Math.min(8, titleLong.length * 2);
  score -= Math.min(9, noCanon.length * 3);
  score = Math.max(0, Math.min(100, Math.round(score)));

  const available = inventory.decks.filter((d) => d.status === "available").length;
  const indexedMocks = inventory.mocks.filter((m) => m.indexed).length;
  const topIssues = ruleIssues.filter((i) => i.severity === "critical" || i.severity === "high").slice(0, 10);

  const top_10_actions = topIssues.map((issue, idx) => ({
    rank: idx + 1,
    action: `[${issue.code}] ${issue.entity}: ${issue.message}`,
    owner: issue.type === "mock" ? "Mock SEO" : issue.type === "deck" ? "Deck SEO" : "Catalog",
    effort: issue.severity === "critical" ? "Low" : "Medium",
    impact: issue.severity === "critical" ? "High" : "Medium",
  }));

  for (const s of liveFails.slice(0, 3)) {
    top_10_actions.push({
      rank: top_10_actions.length + 1,
      action: `Fix live fetch ${s.url} (status=${s.status ?? "err"} ${s.error ?? ""})`,
      owner: "Technical",
      effort: "Low",
      impact: "High",
    });
  }
  for (const s of titleLong.slice(0, 2)) {
    top_10_actions.push({
      rank: top_10_actions.length + 1,
      action: `Shorten live title on ${s.url} (${s.titleLen} chars): "${s.title}"`,
      owner: "Content",
      effort: "Low",
      impact: "Medium",
    });
  }

  return {
    overall_score: score,
    mode: "local-rules",
    executive_summary:
      `Local SEO audit (no LLM): ${available} available decks, ${indexedMocks} indexed mocks, ` +
      `${inventory.gumroadProductCount} Gumroad products. Rule issues: ${bySev.critical} critical / ` +
      `${bySev.high} high / ${bySev.medium} medium / ${bySev.low} low. Live samples: ` +
      `${liveSamples.length} checked, ${liveFails.length} failed, ${titleLong.length} long titles, ` +
      `${noCanon.length} missing canonical, ${noindexLive.length} unexpected noindex.`,
    severity_counts: bySev,
    top_10_actions: top_10_actions.slice(0, 10),
    this_week: [
      ...topIssues.slice(0, 5).map((i) => `Fix ${i.code} on ${i.entity}`),
      ...liveFails.slice(0, 2).map((s) => `Investigate live ${s.url}`),
    ].slice(0, 7),
    risks_if_ignored: [
      bySev.critical
        ? "Critical Gumroad↔site mismatches leak crawl equity and confuse buyers"
        : "No critical mismatches detected",
      bySev.high
        ? "High issues (noindex funnels / missing mocks) suppress commercial SEO"
        : "No high funnel gaps in rule set",
    ],
  };
}

export async function collectLiveSamples(inventory, limit = 40) {
  const urls = new Set([
    `${SITE}/`,
    `${SITE}/mock-exams`,
    `${SITE}/building-certification-anki-decks`,
    `${SITE}/decks`,
  ]);
  // Prefer building + available decks with checkout
  const deckUrls = [
    ...inventory.decks.filter((d) => d.isBuilding && d.status === "available"),
    ...inventory.decks.filter((d) => d.status === "available" && !d.isBuilding),
  ];
  for (const deck of deckUrls) urls.add(deck.pageUrl);
  for (const mock of inventory.mocks.filter((m) => m.indexed)) urls.add(mock.pageUrl);
  // Also sample a few preview mocks that have monetized decks
  for (const mock of inventory.mocks.filter((m) => !m.indexed && m.status === "live").slice(0, 4)) {
    urls.add(mock.pageUrl);
  }

  const samples = [];
  for (const url of [...urls].slice(0, limit)) {
    samples.push(await fetchPageSeo(url));
  }
  return samples;
}
