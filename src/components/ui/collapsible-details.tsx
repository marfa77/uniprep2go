import type { ReactNode } from "react";

type CollapsibleDetailsProps = {
  id?: string;
  summary: string;
  hint?: string;
  children: ReactNode;
  className?: string;
};

export function CollapsibleDetails({
  id,
  summary,
  hint,
  children,
  className = "",
}: CollapsibleDetailsProps) {
  return (
    <details
      className={`group mt-8 overflow-hidden rounded-3xl border border-[#18140f]/10 bg-[#fffaf0]/70 ${className}`}
      id={id}
    >
      <summary className="cursor-pointer list-none px-5 py-4 sm:px-6 sm:py-5 [&::-webkit-details-marker]:hidden">
        <span className="flex items-center justify-between gap-4">
          <span>
            <span className="block text-base font-semibold text-[#18140f]">{summary}</span>
            {hint ? (
              <span className="mt-1 block text-sm leading-6 text-[#5f5749]">{hint}</span>
            ) : null}
          </span>
          <span
            aria-hidden="true"
            className="shrink-0 font-mono text-xs uppercase tracking-[0.18em] text-[#7a6e5a] transition group-open:rotate-180"
          >
            ▼
          </span>
        </span>
      </summary>
      <div className="border-t border-[#18140f]/10 px-5 py-5 sm:px-6 sm:py-6">{children}</div>
    </details>
  );
}
