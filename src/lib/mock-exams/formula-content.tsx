function isMarkdownTable(text: string): boolean {
  return text.trim().split("\n").some((line) => line.trim().startsWith("|"));
}

function parseMarkdownTable(text: string): string[][] | null {
  const lines = text
    .trim()
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  if (!lines.length || !lines[0].startsWith("|")) {
    return null;
  }

  const rows: string[][] = [];
  for (const line of lines) {
    if (/^\|[\s\-:|]+\|$/.test(line)) {
      continue;
    }
    const cells = line
      .replace(/^\|/, "")
      .replace(/\|$/, "")
      .split("|")
      .map((cell) => cell.trim());
    if (cells.length) {
      rows.push(cells);
    }
  }

  return rows.length >= 2 ? rows : null;
}

export function FormulaContent({ text, className }: { text: string; className?: string }) {
  if (isMarkdownTable(text)) {
    const rows = parseMarkdownTable(text);
    if (rows) {
      const [header, ...body] = rows;
      return (
        <div className={`overflow-x-auto ${className ?? ""}`.trim()}>
          <table className="w-full min-w-[280px] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-[#f7f3ea]">
                {header.map((cell) => (
                  <th
                    key={cell}
                    className="border border-[#18140f]/15 px-3 py-2 font-semibold text-[#18140f]"
                  >
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {body.map((row, rowIndex) => (
                <tr key={`row-${rowIndex}`}>
                  {row.map((cell, cellIndex) => (
                    <td
                      key={`${rowIndex}-${cellIndex}`}
                      className="border border-[#18140f]/10 px-3 py-2 text-[#18140f]"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }

  return null;
}

export function isFormulaTable(text: string | null | undefined): boolean {
  return Boolean(text && isMarkdownTable(text) && parseMarkdownTable(text));
}
