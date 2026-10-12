import { readFileSync } from "node:fs";
import path from "node:path";
import type { FunctionDecl } from "./gemini";

/** Built by scripts/build-admin-bot-knowledge.mjs; traced into the function via next.config outputFileTracingIncludes. */
export const KNOWLEDGE_FILE = "src/data/admin-bot/knowledge.json";

type Doc = { id: string; title: string; text: string };
type Commit = {
  sha: string;
  date: string;
  author: string;
  subject: string;
  body: string;
  files: string[];
  filesTotal: number;
};
type Bank = { slug: string; questions: number | null; lastChanged: string | null; lastSubject: string | null };
type Pack = { generatedAt: string; head: string | null; docs: Doc[]; commits: Commit[]; banks: Bank[] };
type Chunk = { doc: string; heading: string; text: string; lower: string };

let cached: { pack: Pack; chunks: Chunk[] } | null = null;

function load() {
  if (cached) return cached;
  let pack: Pack;
  try {
    pack = JSON.parse(readFileSync(path.join(process.cwd(), KNOWLEDGE_FILE), "utf8")) as Pack;
  } catch {
    pack = { generatedAt: "", head: null, docs: [], commits: [], banks: [] };
  }
  cached = { pack, chunks: pack.docs.flatMap(chunkDoc) };
  return cached;
}

function chunkDoc(doc: Doc): Chunk[] {
  const chunks: Chunk[] = [];
  let heading = doc.title;
  let tableHeader = "";
  let buffer: string[] = [];
  const flush = () => {
    const text = buffer.join("\n").trim();
    if (text) chunks.push({ doc: doc.id, heading, text, lower: text.toLowerCase() });
    buffer = [];
  };
  for (const line of doc.text.split("\n")) {
    if (/^#{1,6}\s/.test(line)) {
      flush();
      heading = line.replace(/^#+\s*/, "").trim();
      tableHeader = "";
      continue;
    }
    if (line.startsWith("|")) {
      flush();
      if (!tableHeader) {
        tableHeader = line;
        continue;
      }
      if (/^\|[\s:|-]+\|?$/.test(line)) continue;
      const text = `${tableHeader}\n${line}`;
      chunks.push({ doc: doc.id, heading, text, lower: line.toLowerCase() });
      continue;
    }
    tableHeader = "";
    if (!line.trim()) {
      flush();
      continue;
    }
    buffer.push(line);
    if (buffer.join("\n").length > 1500) flush();
  }
  flush();
  return chunks;
}

function terms(query: string): string[] {
  return [...new Set(query.toLowerCase().split(/[^\p{L}\p{N}_.-]+/u).filter((t) => t.length >= 2))];
}

function score(lower: string, words: string[], phrase: string): number {
  const hits = words.filter((w) => lower.includes(w)).length;
  if (!hits) return 0;
  return hits / words.length + (phrase.length > 3 && lower.includes(phrase) ? 1 : 0);
}

function str(v: unknown): string | undefined {
  return typeof v === "string" && v.trim() ? v.trim() : undefined;
}

function clampInt(v: unknown, fallback: number, max: number) {
  return Math.min(Math.max(Number(v) || fallback, 1), max);
}

export function knowledgeIndex(): string {
  const { pack } = load();
  if (!pack.docs.length) return "База знаний не загружена.";
  const docs = pack.docs.map((d) => `- ${d.id} — ${d.title}`).join("\n");
  return `Снимок репозитория на ${pack.generatedAt.slice(0, 10)} (последний коммит ${pack.commits[0]?.date.slice(0, 10) ?? "?"}): ${pack.docs.length} документов, ${pack.commits.length} коммитов${pack.banks.length ? `, ${pack.banks.length} банков вопросов` : ""}.\nДокументы и правила:\n${docs}`;
}

export const KNOWLEDGE_FUNCTIONS: FunctionDecl[] = [
  {
    name: "search_knowledge",
    description:
      "Поиск по базе знаний проекта: правила Cursor (.cursor/rules), AGENTS.md, документы, ledgers и история коммитов. Ищи английскими ключевыми словами, slug'ами и терминами из репозитория (например: 'audit standard', 'frm-part-1', 'gumroad price'). Возвращает фрагменты со ссылкой на документ.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string" },
        scope: { type: "string", enum: ["all", "docs", "commits"] },
        limit: { type: "integer", description: "1–30, по умолчанию 12" },
      },
      required: ["query"],
    },
  },
  {
    name: "read_doc",
    description: "Прочитать документ базы знаний целиком (по id из списка), постранично по 40 000 символов.",
    parameters: {
      type: "object",
      properties: {
        id: { type: "string" },
        offset: { type: "integer", description: "Смещение в символах, по умолчанию 0" },
      },
      required: ["id"],
    },
  },
  {
    name: "recent_changes",
    description:
      "История изменений проекта (git-коммиты): дата, автор, заголовок, описание, изменённые файлы. Фильтры по датам, тексту и пути файла. Отвечает на «что делали», «когда меняли X», «что выкатили на неделе».",
    parameters: {
      type: "object",
      properties: {
        since: { type: "string", description: "YYYY-MM-DD включительно" },
        until: { type: "string", description: "YYYY-MM-DD включительно" },
        query: { type: "string", description: "Подстрока в заголовке или описании" },
        path: { type: "string", description: "Подстрока пути изменённого файла" },
        limit: { type: "integer", description: "1–80, по умолчанию 30" },
      },
    },
  },
];

export const BANKS_FUNCTION: FunctionDecl = {
  name: "mock_banks",
  description:
    "Банки вопросов mock-экзаменов: slug, число вопросов, дата последнего изменения и коммит. Сортировка по свежести или размеру, фильтр по slug.",
  parameters: {
    type: "object",
    properties: {
      sort: { type: "string", enum: ["recent", "size", "slug"] },
      query: { type: "string" },
      changed_since: { type: "string", description: "YYYY-MM-DD" },
      limit: { type: "integer", description: "1–250, по умолчанию 40" },
    },
  },
};

export function runKnowledgeTool(name: string, args: Record<string, unknown>): unknown {
  const { pack, chunks } = load();
  switch (name) {
    case "search_knowledge": {
      const query = str(args.query) ?? "";
      const words = terms(query);
      if (!words.length) throw new Error("empty query");
      const phrase = query.toLowerCase().trim();
      const scope = str(args.scope) ?? "all";
      const limit = clampInt(args.limit, 12, 30);
      const results: Array<{ score: number; item: Record<string, unknown> }> = [];
      if (scope !== "commits") {
        for (const c of chunks) {
          const s = score(c.lower, words, phrase);
          if (s) results.push({ score: s, item: { doc: c.doc, section: c.heading, text: c.text.slice(0, 1500) } });
        }
      }
      if (scope !== "docs") {
        for (const c of pack.commits) {
          const lower = `${c.subject}\n${c.body}\n${c.files.join(" ")}`.toLowerCase();
          const s = score(lower, words, phrase);
          if (s) {
            results.push({
              score: s + 0.05,
              item: { commit: c.sha.slice(0, 8), date: c.date.slice(0, 10), subject: c.subject, body: c.body.slice(0, 600) },
            });
          }
        }
      }
      results.sort((a, b) => b.score - a.score);
      return { total: results.length, results: results.slice(0, limit).map((r) => r.item) };
    }
    case "read_doc": {
      const id = str(args.id) ?? "";
      const doc = pack.docs.find((d) => d.id === id) ?? pack.docs.find((d) => d.id.endsWith(id));
      if (!doc) return { error: `нет документа ${id}` };
      const offset = Math.max(Number(args.offset) || 0, 0);
      const text = doc.text.slice(offset, offset + 40_000);
      return { id: doc.id, length: doc.text.length, offset, nextOffset: offset + text.length < doc.text.length ? offset + text.length : null, text };
    }
    case "recent_changes": {
      const since = str(args.since);
      const until = str(args.until);
      const query = str(args.query)?.toLowerCase();
      const filePath = str(args.path)?.toLowerCase();
      const limit = clampInt(args.limit, 30, 80);
      const picked = pack.commits
        .filter((c) => !since || c.date.slice(0, 10) >= since)
        .filter((c) => !until || c.date.slice(0, 10) <= until)
        .filter((c) => !query || `${c.subject}\n${c.body}`.toLowerCase().includes(query))
        .filter((c) => !filePath || c.files.some((f) => f.toLowerCase().includes(filePath)));
      return {
        total: picked.length,
        commits: picked.slice(0, limit).map((c) => ({
          date: c.date.slice(0, 16),
          sha: c.sha.slice(0, 8),
          author: c.author,
          subject: c.subject,
          body: c.body.slice(0, 500) || undefined,
          files: c.files.slice(0, 12),
          filesTotal: c.filesTotal,
        })),
      };
    }
    case "mock_banks": {
      const query = str(args.query)?.toLowerCase();
      const changedSince = str(args.changed_since);
      const sort = str(args.sort) ?? "recent";
      const limit = clampInt(args.limit, 40, 250);
      const banks = pack.banks
        .filter((b) => !query || b.slug.includes(query))
        .filter((b) => !changedSince || (b.lastChanged ?? "") >= changedSince)
        .sort((a, b) =>
          sort === "size"
            ? (b.questions ?? 0) - (a.questions ?? 0)
            : sort === "slug"
              ? a.slug.localeCompare(b.slug)
              : (b.lastChanged ?? "").localeCompare(a.lastChanged ?? ""),
        );
      return { total: banks.length, banks: banks.slice(0, limit) };
    }
    default:
      return undefined;
  }
}
