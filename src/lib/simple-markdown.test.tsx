import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { SimpleMarkdownBlock, renderInlineMarkdown } from "./simple-markdown";

describe("simple-markdown", () => {
  it("renders bold without leaking asterisks", () => {
    const html = renderToStaticMarkup(
      <>{renderInlineMarkdown("A **1,000-card** deck for **daily life**.")}</>,
    );
    expect(html).toContain("<strong");
    expect(html).toContain("1,000-card");
    expect(html).not.toContain("**");
  });

  it("renders italic without leaking asterisks", () => {
    const html = renderToStaticMarkup(
      <>{renderInlineMarkdown("You learn *how to ask and answer* before fruit names.")}</>,
    );
    expect(html).toContain("<em");
    expect(html).toContain("how to ask and answer");
    expect(html).not.toContain("*how");
    expect(html).not.toMatch(/\*[^*]+\*/);
  });

  it("renders internal and external links", () => {
    const html = renderToStaticMarkup(
      <>{renderInlineMarkdown("See the [mock](/mock-exams/x) and [site](https://example.com).")}</>,
    );
    expect(html).toContain('href="/mock-exams/x"');
    expect(html).toContain('href="https://example.com"');
    expect(html).toContain('target="_blank"');
    expect(html).not.toContain("[mock]");
  });

  it("renders numbered lists as ol", () => {
    const html = renderToStaticMarkup(
      <SimpleMarkdownBlock
        text={`Intro line.

1. **Greetings** — bom dia
2. **Modals** — poder

Outro.`}
      />,
    );
    expect(html).toContain("<ol");
    expect(html).toContain("<li");
    expect(html).toContain("Greetings");
    expect(html).not.toContain("**");
    expect(html).toContain("Outro");
  });

  it("renders pipe tables", () => {
    const html = renderToStaticMarkup(
      <SimpleMarkdownBlock
        text={`| Lookalike | Wrong | Right |
| --- | --- | --- |
| *актуальный* | “actual” | **current** |`}
      />,
    );
    expect(html).toContain("<table");
    expect(html).toContain("<th");
    expect(html).toContain("<em");
    expect(html).toContain("current");
    expect(html).not.toContain("| ---");
  });
});

