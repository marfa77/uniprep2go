/** Visible trust line: structure from official outlines; questions remain independent. */
export function OfficialSourceTrustStrip({
  className = "",
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  if (compact) {
    return (
      <p className={`text-sm leading-6 text-[#5f5749] ${className}`.trim()}>
        <span className="font-semibold text-[#18140f]">Official-source aligned.</span> Topic
        weights, timing, and pass rules follow published exam outlines and blueprints. Questions are
        original UniPrep2Go study aids — not leaked official items.
      </p>
    );
  }

  return (
    <aside
      aria-label="Official source alignment"
      className={`rounded-3xl border border-[#18140f]/10 bg-[#fffaf0]/80 px-5 py-4 ${className}`.trim()}
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#1f3a5f]">
        Official sources
      </p>
      <p className="mt-2 text-sm leading-6 text-[#4f493e]">
        We model domain weights, session length, and readiness targets on{" "}
        <strong className="font-semibold text-[#18140f]">
          published official outlines and blueprints
        </strong>{" "}
        from the exam bodies (FINRA, CFA Institute, GBCI/USGBC, ETS, PMI, and others). Every question
        is an original UniPrep2Go study aid — independent prep, not official exam material and not
        leaked test items.
      </p>
    </aside>
  );
}
