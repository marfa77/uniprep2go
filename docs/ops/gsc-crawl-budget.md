# GSC crawl-budget ops (post-deploy)

## What we fixed in code

1. `robots.txt` lists **only** `https://uniprep2go.study/sitemap.xml` (no `/llms.txt` / `/llms-full.txt` as Sitemap).
2. Googlebot is disallowed from `/*?utm_source=llm` (stops rediscovery of LLM UTM duplicates).
3. Google sitemap keeps revenue + demand pages: all available decks, all indexable mocks, mock vertical hubs, Gaivota comics, money blog, commercial intent. Drops legal/contact and non-money blog noise.
4. `/llms.txt` stays crawlable via footer + GEO links + `llm-sitemap.xml` — just not advertised as a Google Sitemap.

## After deploy

1. GSC → Sitemaps → remove/ignore stale `llms.txt` and `llms-full.txt` sitemap entries if still listed.
2. Resubmit `https://uniprep2go.study/sitemap.xml`.
3. URL Inspection → Request indexing for top money URLs (SIE mock+deck, Series 7/63, CFA L1, FRM, CA RE, PTCB guide, ExCPT mock, MRICS QS).
4. Watch 2–4 weeks: indexed **money** URLs and Last crawled dates — not total indexed count.
5. Leave IndexNow as-is for Bing.
