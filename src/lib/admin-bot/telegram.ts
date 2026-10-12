const API = "https://api.telegram.org";
const LIMIT = 3900;

function token(): string {
  const t = process.env.TELEGRAM_BOT_TOKEN?.trim();
  if (!t) throw new Error("TELEGRAM_BOT_TOKEN missing");
  return t;
}

async function tg<T = unknown>(method: string, body: Record<string, unknown>): Promise<T> {
  const res = await fetch(`${API}/bot${token()}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = (await res.json()) as { ok: boolean; result?: T; description?: string };
  if (!data.ok) throw new Error(data.description || `Telegram ${method} failed`);
  return data.result as T;
}

export function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function stripTags(s: string): string {
  return s
    .replace(/<[^>]+>/g, "")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

function normalizeHtml(s: string): string {
  return s
    .replace(/\*\*(.+?)\*\*/g, "<b>$1</b>")
    .replace(/(^|[^*\w])\*([^*\n]+?)\*(?![*\w])/g, "$1<i>$2</i>")
    .replace(/`([^`\n]+)`/g, "<code>$1</code>")
    .replace(/^#{1,6}\s*(.+)$/gm, "<b>$1</b>")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/?(p|ul|ol|li|h\d|div|span)[^>]*>/gi, "");
}

function chunks(text: string): string[] {
  const out: string[] = [];
  let rest = text;
  while (rest.length > LIMIT) {
    let cut = rest.lastIndexOf("\n\n", LIMIT);
    if (cut < LIMIT / 2) cut = rest.lastIndexOf("\n", LIMIT);
    if (cut < LIMIT / 2) cut = LIMIT;
    out.push(rest.slice(0, cut));
    rest = rest.slice(cut).trimStart();
  }
  if (rest.trim()) out.push(rest);
  return out;
}

export async function send(chatId: number | string, html: string): Promise<void> {
  for (const part of chunks(normalizeHtml(html))) {
    const base = { chat_id: chatId, link_preview_options: { is_disabled: true } };
    try {
      await tg("sendMessage", { ...base, text: part, parse_mode: "HTML" });
    } catch {
      await tg("sendMessage", { ...base, text: stripTags(part) });
    }
  }
}

export async function typing(chatId: number | string): Promise<void> {
  await tg("sendChatAction", { chat_id: chatId, action: "typing" }).catch(() => undefined);
}

export async function downloadFile(fileId: string): Promise<Buffer> {
  const file = await tg<{ file_path: string }>("getFile", { file_id: fileId });
  const res = await fetch(`${API}/file/bot${token()}/${file.file_path}`);
  if (!res.ok) throw new Error(`download ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}
