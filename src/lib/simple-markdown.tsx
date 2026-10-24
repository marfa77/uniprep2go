import type { ReactNode } from "react";
import Link from "next/link";

/**
 * Lightweight markdown for deck/mock money copy.
 * Supports: **bold**, [label](url), numbered lists, bullet lists, paragraphs.
 * Headings (###) are handled by the caller (section splitter).
 */

const BOLD_OR_LINK =
  /\*\*([^*]+)\*\*|\[([^\]]+)\]\((https?:\/\/[^)\s]+|\/[^)\s]*)\)/g;

export function renderInlineMarkdown(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let last = 0;
  let key = 0;
  for (const match of text.matchAll(BOLD_OR_LINK)) {
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

/**
 * Render a markdown body block (no ### headings) as paragraphs / lists with inline marks.
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
