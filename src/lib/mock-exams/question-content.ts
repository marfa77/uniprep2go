export type QuestionTextBlock =
  | { type: "text"; content: string }
  | {
      type: "table";
      headers: string[];
      alignments: Array<"left" | "right" | "center">;
      rows: string[][];
    };

function splitTableRow(line: string) {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function parseAlignment(separatorLine: string) {
  return splitTableRow(separatorLine).map((cell) => {
    const trimmed = cell.replace(/\s/g, "");
    if (trimmed.startsWith(":") && trimmed.endsWith(":")) {
      return "center" as const;
    }
    if (trimmed.endsWith(":")) {
      return "right" as const;
    }
    return "left" as const;
  });
}

export function parseMarkdownTable(lines: string[]): QuestionTextBlock | null {
  if (lines.length < 2) {
    return null;
  }

  const separator = lines[1]?.trim() ?? "";
  if (!/^\|(?:\s*:?-+:?\s*\|)+\s*$/.test(separator)) {
    return null;
  }

  const headers = splitTableRow(lines[0] ?? "");
  const alignments = parseAlignment(separator);
  const rows = lines.slice(2).map(splitTableRow).filter((row) => row.some(Boolean));

  if (headers.length === 0 || rows.length === 0) {
    return null;
  }

  return { type: "table", headers, alignments, rows };
}

export function parseQuestionContentBlocks(text: string): QuestionTextBlock[] {
  const lines = text.split("\n");
  const blocks: QuestionTextBlock[] = [];
  let textBuffer: string[] = [];
  let tableBuffer: string[] = [];

  function flushText() {
    const content = textBuffer.join("\n").trim();
    if (content) {
      blocks.push({ type: "text", content });
    }
    textBuffer = [];
  }

  function flushTable() {
    if (tableBuffer.length === 0) {
      return;
    }

    const table = parseMarkdownTable(tableBuffer);
    if (table) {
      blocks.push(table);
    } else {
      textBuffer.push(...tableBuffer);
    }
    tableBuffer = [];
  }

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
      flushText();
      tableBuffer.push(trimmed);
      continue;
    }

    flushTable();
    textBuffer.push(line);
  }

  flushTable();
  flushText();

  return blocks;
}

export function normalizeDisplayMath(text: string) {
  return text.replace(/\$\$([\s\S]+?)\$\$/g, "\\[$1\\]");
}
