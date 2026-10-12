/**
 * Minimal Gemini function-calling loop for the admin Telegram bot (same shape as family-health-bot).
 */

export type Part = Record<string, unknown>;
export type Content = { role: "user" | "model"; parts: Part[] };

export type FunctionDecl = {
  name: string;
  description: string;
  parameters: Record<string, unknown>;
};

type Candidate = { content?: { parts?: Part[] }; finishReason?: string };
type GeminiResponse = { candidates?: Candidate[]; error?: { message: string } };

export const ADMIN_BOT_MODEL = process.env.ADMIN_BOT_GEMINI_MODEL?.trim() || "gemini-3.8-flash";

function apiKey(): string {
  const key = (process.env.ADMIN_BOT_GEMINI_API_KEY || "").trim();
  if (!key) throw new Error("ADMIN_BOT_GEMINI_API_KEY missing");
  return key;
}

async function call(body: Record<string, unknown>, model: string): Promise<GeminiResponse> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey()}`;
  for (let attempt = 0; ; attempt++) {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = (await res.json().catch(() => ({}))) as GeminiResponse;
    if (res.ok) return data;
    if ((res.status === 429 || res.status >= 500) && attempt < 2) {
      await new Promise((r) => setTimeout(r, 2000 * (attempt + 1)));
      continue;
    }
    throw new Error(`Gemini ${res.status}: ${data.error?.message?.slice(0, 200) || "error"}`);
  }
}

function textOf(parts: Part[]): string {
  return parts
    .filter((p) => typeof p.text === "string" && !p.thought)
    .map((p) => p.text as string)
    .join("")
    .trim();
}

export function filePart(buffer: Buffer, mime: string): Part {
  return { inline_data: { mime_type: mime, data: buffer.toString("base64") } };
}

export async function agent(opts: {
  system: string;
  history: Content[];
  userParts: Part[];
  functions: FunctionDecl[];
  onCall: (name: string, args: Record<string, unknown>) => Promise<unknown>;
  model?: string;
}): Promise<string> {
  const contents: Content[] = [...opts.history, { role: "user", parts: opts.userParts }];
  for (let step = 0; step < 8; step++) {
    const data = await call(
      {
        system_instruction: { parts: [{ text: opts.system }] },
        contents,
        tools: [{ google_search: {} }, { functionDeclarations: opts.functions }],
        toolConfig: { includeServerSideToolInvocations: true },
        generationConfig: { temperature: 0.3 },
      },
      opts.model || ADMIN_BOT_MODEL
    );
    const candidate = data.candidates?.[0];
    const parts = candidate?.content?.parts || [];
    const calls = parts.filter((p) => p.functionCall) as Array<{
      functionCall: { name: string; args?: Record<string, unknown>; id?: string };
    }>;
    if (!calls.length) {
      const text = textOf(parts);
      if (text) return text;
      throw new Error(`empty answer (${candidate?.finishReason || "no candidate"})`);
    }
    contents.push({ role: "model", parts });
    const responses: Part[] = [];
    for (const { functionCall: fc } of calls) {
      let result: unknown;
      try {
        result = await opts.onCall(fc.name, fc.args || {});
      } catch (e) {
        result = { error: e instanceof Error ? e.message : String(e) };
      }
      responses.push({ functionResponse: { name: fc.name, id: fc.id, response: { result } } });
    }
    contents.push({ role: "user", parts: responses });
  }
  throw new Error("too many tool steps");
}
