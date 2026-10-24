import type { ReactNode } from "react";
import Link from "next/link";

/**
 * Lightweight markdown for deck/mock money copy.
 * Supports: **bold**, *italic*, [label](url), numbered lists, bullet lists, paragraphs.
 * Headings (###) are handled by the caller (section splitter).
 */

const INLINE_MARK =
  /\*\*([^*]+)\*\*|\[([^\]]+)\]\((https?:\/\/[^)\s]+|\/[^)\s]*)\)|(?<!\*)\*([^*\n]+)\*(?!\*)/g;

export function renderInlineMarkdown(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let last = 0;
  let key = 0;
  for (const match of text.matchAll(INLINE_MARK)) {
    const index = match.index ?? 0;
    if (index > last) nodes.push(text.slice(last, index));
    if (match[1] != null) {
      nodes.push(
        <strong className="font-semibold text-[#18140f]" key={`b-${key++}`}>
          {match[1]}
        </strong>,
      );
    } else if (match[2] != null && match[3] != null) {
      const href = match[3];
      const label = match[2];
      if (href.startsWith("/")) {
        nodes.push(
          <Link
            className="font-medium text-[#1f3a5f] underline underline-offset-2 hover:text-[#18140f]"
            href={href}
            key={`l-${key++}`}
          >
            {label}
          </Link>,
        );
      } else {
        nodes.push(
          <a
            className="font-medium text-[#1f3a5f] underline underline-offset-2 hover:text-[#18140f]"
            href={href}
            key={`l-${key++}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            {label}
          </a>,
        );
      }
    } else if (match[4] != null) {
      nodes.push(
        <em className="italic" key={`i-${key++}`}>
          {match[4]}
        </em>,
      );
    }
    last = index + match[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

function isOrderedItem(line: string) {
  return /^\d+\.\s+/.test(line);
}

function isBulletItem(line: string) {
  return /^[-*]\s+/.test(line);
}

function stripListMarker(line: string) {
  return line.replace(/^\d+\.\s+/, "").replace(/^[-*]\s+/, "");
}

function isTableRow(line: string) {
  const t = line.trim();
  return t.startsWith("|") && t.endsWith("|");
}

function isTableSeparator(line: string) {
  return /^\|[\s:|-]+\|$/.test(line.trim());
}

function splitTableCells(line: string) {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((c) => c.trim());
}

function MarkdownTable({
  rows,
  className,
}: {
  rows: string[];
  className: string;
}) {
  const dataRows = rows.filter((r) => !isTableSeparator(r));
  if (dataRows.length === 0) return null;
  const header = splitTableCells(dataRows[0]!);
  const body = dataRows.slice(1).map(splitTableCells);
  return (
    <div className="overflow-x-auto">
      <table className={`w-full border-collapse text-left ${className}`}>
        <thead>
          <tr className="border-b border-[#18140f]/15">
            {header.map((cell, j) => (
              <th className="px-3 py-2 font-semibold text-[#18140f]" key={`th-${j}`} scope="col">
                {renderInlineMarkdown(cell)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((cells, i) => (
            <tr className="border-b border-[#18140f]/8" key={`tr-${i}`}>
              {cells.map((cell, j) => (
                <td className="px-3 py-2 align-top" key={`td-${i}-${j}`}>
                  {renderInlineMarkdown(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * Render a markdown body block (no ### headings) as paragraphs / lists / tables with inline marks.
 */
export function SimpleMarkdownBlock({
  text,
  className = "text-sm leading-7 text-[#4f493e]",
}: {
  text: string;
  className?: string;
}) {
  const chunks = text
    .split(/\n\n+/)
    .map((c) => c.trim())
    .filter((c) => c && !c.startsWith("<!--"));

  return (
    <>
      {chunks.map((chunk, i) => {
        const lines = chunk.split("\n").map((l) => l.trimEnd());
        const nonEmpty = lines.filter((l) => l.trim());
        const allOrdered =
          nonEmpty.length > 0 && nonEmpty.every((l) => isOrderedItem(l.trim()));
        const allBullets =
          nonEmpty.length > 0 && nonEmpty.every((l) => isBulletItem(l.trim()));
        const allTable =
          nonEmpty.length >= 2 &&
          nonEmpty.every((l) => isTableRow(l.trim())) &&
          nonEmpty.some((l) => isTableSeparator(l.trim()));

        if (allTable) {
          return <MarkdownTable className={className} key={`tbl-${i}`} rows={nonEmpty} />;
        }
        if (allOrdered) {
          return (
            <ol
              className={`list-decimal space-y-2 pl-5 ${className}`}
              key={`ol-${i}`}
            >
              {nonEmpty.map((line, j) => (
                <li key={`oli-${i}-${j}`}>
                  {renderInlineMarkdown(stripListMarker(line.trim()))}
                </li>
              ))}
            </ol>
          );
        }
        if (allBullets) {
          return (
            <ul
              className={`list-disc space-y-2 pl-5 ${className}`}
              key={`ul-${i}`}
            >
              {nonEmpty.map((line, j) => (
                <li key={`uli-${i}-${j}`}>
                  {renderInlineMarkdown(stripListMarker(line.trim()))}
                </li>
              ))}
            </ul>
          );
        }

        // Soft-wrap single newlines inside a paragraph as spaces
        const flat = lines.map((l) => l.trim()).filter(Boolean).join(" ");
        return (
          <p className={className} key={`p-${i}`}>
            {renderInlineMarkdown(flat)}
          </p>
        );
      })}
    </>
  );
}
