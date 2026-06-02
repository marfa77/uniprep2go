"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";

type MathContentProps = {
  text: string;
  className?: string;
};

declare global {
  interface Window {
    MathJax?: {
      typesetPromise?: (elements?: HTMLElement[]) => Promise<void>;
    };
  }
}

function normalizeMath(text: string) {
  return text.replace(/\$\$([\s\S]+?)\$\$/g, "\\[$1\\]");
}

export function MathContent({ text, className }: MathContentProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const normalized = normalizeMath(text);

  useEffect(() => {
    if (ref.current && window.MathJax?.typesetPromise) {
      void window.MathJax.typesetPromise([ref.current]);
    }
  }, [normalized]);

  return (
    <>
      <Script id="mathjax-config" strategy="afterInteractive">
        {`
          window.MathJax = {
            tex: { inlineMath: [['$', '$'], ['\\\\(', '\\\\)']], displayMath: [['$$', '$$'], ['\\\\[', '\\\\]']] },
            svg: { fontCache: 'global' }
          };
        `}
      </Script>
      <Script
        id="mathjax-script"
        src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js"
        strategy="afterInteractive"
      />
      <span ref={ref} className={className}>
        {normalized}
      </span>
    </>
  );
}
