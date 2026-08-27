/** Placeholder while the mock runner client chunk loads (code-split from the landing page). */
export function MockExamClientSkeleton() {
  return (
    <div
      aria-busy="true"
      aria-label="Loading practice test"
      className="mt-6 animate-pulse rounded-3xl border border-[#18140f]/10 bg-[#fffaf0] p-5 sm:p-6"
      id="start-mock"
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="h-10 rounded-xl bg-[#18140f]/8" />
        <div className="h-10 rounded-xl bg-[#18140f]/8" />
        <div className="h-10 rounded-xl bg-[#18140f]/8" />
      </div>
      <div className="mt-5 h-12 w-full rounded-full bg-[#18140f]/10 sm:w-64" />
      <p className="mt-3 text-sm text-[#7a6e5a]">Loading timed practice test…</p>
    </div>
  );
}
