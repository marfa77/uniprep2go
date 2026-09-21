export type StrongSample = { q: string; a: string };

export type ScoreableMcq = {
  prompt: string;
  options: { id: string; text: string }[];
  correctOptionId: string;
  topicId?: string;
  explanation?: string;
};

const TEMPLATE_RE =
  /fdic deposit insurance|this concept is identical|this concept has no application|this concept always eliminates|does not match the correct definition|remapped from sibling|what is included in /i;

const WEAK_STEM_RE =
  /^(what is (risk|the sec|finra|pure risk|speculative risk|personal property|real property|a fixture)\b)/i;

const META_EXAM_RE =
  /wie viele fragen hat|how many questions (has|does)|cu[aá]ntas preguntas tiene|combien de questions|hvor mange sp[øo]rgsm[aå]l|what should you do to prepare|official language of the uk/i;

function clean(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

/** Strip mock-writer wrappers so the selling stem is the exam question. */
export function sanitizeStem(text: string): string {
  let q = clean(text);
  q = q.replace(/^On the [^,]+,\s*/i, "");
  q = q.replace(/^For the [A-Z0-9 /+.-]+,\s*which of the following best answers this item:\s*/i, "");
  q = q.replace(/^For the [^,]+,\s*[^:]{2,40}:\s*/i, "");
  q = q.replace(/^Which option is correct for [^?]+\?\s*/i, "");
  q = q.replace(/^Which statement best applies to\s+/i, "");
  q = q.replace(/\s*[—–-]\s*which option is correct for[^?]*\??$/i, "");
  q = q.replace(/\s+which option is correct for[^?]*\??$/i, "");
  q = q.replace(/\s*Select the best answer\.?\s*$/i, "");
  q = q.replace(/\s+as tested on this exam\.?/i, "");
  q = q.replace(/\s+as tested in [^.?]+/i, "");
  q = q.replace(/\s+on a life\/health licensing exam\??$/i, "?");
  q = q.replace(/\s+when recommending products on the SIE\??$/i, "?");
  q = q.replace(/^In SIE [^,]+,\s*/i, "");
  q = q.replace(/\s+in SIE [^.?]+\??$/i, "?");
  q = clean(q);
  if (q) q = q.charAt(0).toUpperCase() + q.slice(1);
  return q;
}

function tokenSet(text: string): Set<string> {
  return new Set(
    text
      .toLowerCase()
      .replace(/[^a-z0-9\u00c0-\u024f]+/g, " ")
      .split(/\s+/)
      .filter((w) => w.length >= 4),
  );
}

function jaccard(a: string, b: string): number {
  const A = tokenSet(a);
  const B = tokenSet(b);
  if (!A.size || !B.size) return 0;
  let inter = 0;
  for (const w of A) if (B.has(w)) inter += 1;
  return inter / (A.size + B.size - inter);
}

function hasTemplateJunk(text: string): boolean {
  return TEMPLATE_RE.test(text);
}

export function scoreCivicQa(front: string, back: string, hint = ""): number {
  const q = sanitizeStem(front);
  const a = clean(back);
  if (q.length < 24 || q.length > 220) return -1;
  if (a.length < 8 || a.length > 180) return -1;
  if (!/[?;：؟]$/.test(q) && !/\?/.test(q)) return -1;
  if (hasTemplateJunk(q) || hasTemplateJunk(a) || META_EXAM_RE.test(q)) return -1;
  if (WEAK_STEM_RE.test(q)) return 4;

  let score = 18;
  if (q.endsWith("?") || q.endsWith("؟")) score += 4;
  if (a.length >= 16 && a.length <= 140) score += 4;
  if (q.length >= 40 && q.length <= 160) score += 3;
  if (/[A-ZÀ-ÖØ-Þ]{3,}|[0-9]{3,}|§|Grundgesetz|Constituci|BAMF|USCIS|CCSE/.test(q + a)) {
    score += 3;
  }
  const hintTokens = tokenSet(hint);
  const qTokens = tokenSet(q);
  let overlap = 0;
  for (const w of hintTokens) if (qTokens.has(w)) overlap += 1;
  if (overlap) score += Math.min(4, overlap);
  return score;
}

export function scoreMcq(question: ScoreableMcq, hint = ""): number {
  const q = sanitizeStem(question.prompt);
  const correct =
    question.options.find((option) => option.id === question.correctOptionId)?.text ?? "";
  const a = clean(correct);
  if (q.length < 28 || q.length > 320) return -1;
  if (a.length < 8 || a.length > 200) return -1;
  if (hasTemplateJunk(q) || hasTemplateJunk(a)) return -1;
  if (question.options.some((option) => hasTemplateJunk(option.text))) return 2;
  if (WEAK_STEM_RE.test(q)) return 5;

  let score = 16;
  if (/[?;：]$/.test(q) || q.includes("?")) score += 3;
  if (a.length >= 18 && a.length <= 140) score += 4;
  if (q.length >= 50 && q.length <= 200) score += 3;
  if (/\b(must|which|when|before|after|primarily|typically)\b/i.test(q)) score += 2;
  const hintTokens = tokenSet(hint);
  const qTokens = tokenSet(q + " " + a);
  let overlap = 0;
  for (const w of hintTokens) if (qTokens.has(w)) overlap += 1;
  score += Math.min(6, overlap * 2);
  return score;
}

export function pickStrongCivicSamples(
  rows: { front: string; back: string }[],
  hint = "",
  count = 3,
): StrongSample[] {
  const ranked = rows
    .map((row) => ({
      q: sanitizeStem(row.front),
      a: clean(row.back),
      score: scoreCivicQa(row.front, row.back, hint),
    }))
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score);

  return diversify(ranked, count);
}

export function pickStrongMcqSamples(
  questions: ScoreableMcq[],
  hint = "",
  count = 3,
): StrongSample[] {
  const ranked = questions
    .map((question) => {
      const a =
        question.options.find((option) => option.id === question.correctOptionId)?.text ?? "";
      return {
        q: sanitizeStem(question.prompt),
        a: clean(a),
        topic: question.topicId ?? "",
        score: scoreMcq(question, hint),
      };
    })
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score);

  return diversify(ranked, count);
}

function diversify(
  ranked: { q: string; a: string; topic?: string; score: number }[],
  count: number,
): StrongSample[] {
  const picks: StrongSample[] = [];
  const usedTopics = new Set<string>();

  for (const row of ranked) {
    if (picks.length >= count) break;
    if (picks.some((pick) => jaccard(pick.q, row.q) > 0.45)) continue;
    if (row.topic && usedTopics.has(row.topic) && picks.length < count - 1) continue;
    picks.push({ q: row.q, a: row.a });
    if (row.topic) usedTopics.add(row.topic);
  }

  for (const row of ranked) {
    if (picks.length >= count) break;
    if (picks.some((pick) => pick.q === row.q || jaccard(pick.q, row.q) > 0.45)) continue;
    picks.push({ q: row.q, a: row.a });
  }

  return picks.slice(0, count);
}
