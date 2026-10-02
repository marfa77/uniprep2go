import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");
const COPY_PATH = join(root, "src/data/gumroad/landing-copy.json");

export function loadLandingCopy(slug) {
  if (!existsSync(COPY_PATH)) return null;
  return JSON.parse(readFileSync(COPY_PATH, "utf8"))[slug] ?? null;
}

const esc = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/** Card count per topic label from the git bank the deck is built from. */
export function topicCardCounts(spec) {
  const path = join(root, "src/data/mock-exams", `${spec?.mockSlug}.json`);
  if (!spec?.topics || !existsSync(path)) return [];
  const raw = JSON.parse(readFileSync(path, "utf8"));
  const questions = Array.isArray(raw) ? raw : raw.questions ?? [];
  return Object.entries(spec.topics).map(([id, label]) => ({
    label,
    count: questions.filter((q) => q.topicId === id).length,
  }));
}

export function affiliationOf(copy, fallback) {
  const admin = copy?.examFacts?.find((f) => /administ/i.test(f.label))?.value;
  return admin || fallback;
}

/** Gumroad description (no images — Gumroad strips them; samples live in the custom landing). */
export function buildCopyDescription({ copy, spec, mockUrl, deckUrl, delivery, hasSamples }) {
  const count = spec?.cardCount;
  const host = (() => {
    try {
      return new URL(copy.factsSource).hostname.replace(/^www\./, "");
    } catch {
      return copy.factsSource;
    }
  })();
  const topics = topicCardCounts(spec)
    .filter((t) => t.count > 0)
    .map((t) => `<li>${esc(t.label)} — ${t.count} cards</li>`)
    .join("");
  const links = [
    deckUrl ? `<a href="${deckUrl}">deck page</a>` : "",
    mockUrl ? `<a href="${mockUrl}">free timed readiness check</a>` : "",
  ]
    .filter(Boolean)
    .join(" · ");
  return [
    `<p><strong>${esc(copy.hook)}</strong></p>`,
    `<h2><strong>Exam at a glance</strong></h2><ul>${copy.examFacts
      .map((f) => `<li><strong>${esc(f.label)}:</strong> ${esc(f.value)}</li>`)
      .join("")}</ul><p><em>Source: <a href="${esc(copy.factsSource)}">${esc(host)}</a>.${copy.factsNote ? ` ${esc(copy.factsNote)}` : ""}</em></p>`,
    `<h2><strong>Who it's for</strong></h2><p>${esc(copy.whoFor)}</p>`,
    `<h2><strong>Why this deck</strong></h2><ul>${copy.whyThis.map((w) => `<li>${esc(w)}</li>`).join("")}</ul>`,
    `<h2><strong>What's inside</strong></h2><ul><li>${count} multiple-choice cards: question, 4 options, correct answer, explanation, and why each wrong option fails</li>${topics}<li>Tagged by topic so you can drill your weakest area</li></ul>`,
    hasSamples
      ? `<p><strong>Sample cards:</strong> swipe the image gallery above for 3 real screenshots from this deck — question, options, answer, and the why-wrong notes.</p>`
      : "",
    `<h2><strong>How to use it</strong></h2><ol>${copy.studyPlan.map((s) => `<li>${esc(s)}</li>`).join("")}</ol>`,
    `<p><strong>Delivery:</strong> ${delivery}</p>`,
    `<h2><strong>FAQ</strong></h2>${copy.faqs
      .map((f) => `<p><strong>${esc(f.q)}</strong><br>${esc(f.a)}</p>`)
      .join("")}`,
    links ? `<p>Also on UniPrep2Go: ${links}.</p>` : "",
    `<p><em>Independent study aid. Not affiliated with or endorsed by ${esc(affiliationOf(copy, spec?.disclaimerOrg))}.</em></p>`,
  ]
    .filter(Boolean)
    .join("");
}
