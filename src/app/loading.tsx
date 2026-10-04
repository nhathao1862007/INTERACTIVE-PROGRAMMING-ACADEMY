/**
 * @module app/loading
 * Route-level loading skeleton (reserves space, no content jump).
 */
export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-10" aria-busy="true" aria-live="polite">
      <div className="h-6 w-40 animate-pulse rounded-control bg-ink-2" />
      <div className="mt-3 h-4 w-72 animate-pulse rounded-control bg-ink-2" />
      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-32 animate-pulse rounded-card bg-ink-1 ring-edge"
            style={{ willChange: "opacity" }}
          />
        ))}
      </div>
      <span className="sr-only">Đang tải…</span>
    </div>
  );
}
