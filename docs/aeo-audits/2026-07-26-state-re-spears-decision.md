# State real-estate Google spears — decision (2026-07-26)

## Decision
**Keep the allowlist at CA / FL / TX / NY only for Google index.** Do not expand AZ / IL / OH / PA (or other Wave-3/4 state RE pages) into `shouldIndexMockExam` this cycle.

## Why
- 46 non-allowlist state RE mocks remain useful for practice + LLM/`llms-full.txt` citation without competing for Google crawl budget against the 12 niche money spears.
- FL/TX already sit in `nicheGooglePrioritySlugs`; CA/NY cover the other large markets.
- Expanding spears without unique thick SEO + Search Console demand risks thin-state cannibalization.

## Revisit triggers
Expand a state only when **all** are true:
1. Search Console (or paid keyword data) shows non-brand demand for that state RE practice test.
2. The mock page has unique niche explainer + FAQ depth (not template-only).
3. We are willing to raise sitemap priority and monitor impressions for 30 days.

## Operational note
Non-allowlist state RE pages stay `noindex,follow`, remain in `/llms-full.txt` and `/api/mock-exams`, and keep practice/funnel value.
