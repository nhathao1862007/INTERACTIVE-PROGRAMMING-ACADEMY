/**
 * @module app/not-found
 * 404 page.
 */
import Link from "next/link";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-lg flex-col items-center justify-center px-6 text-center">
      <span className="font-mono text-5xl font-bold tabular-nums text-phosphor">404</span>
      <span className="mt-4 grid h-12 w-12 place-items-center rounded-card bg-ink-2 text-text-body ring-edge">
        <Compass className="h-6 w-6" strokeWidth={1.6} />
      </span>
      <h1 className="mt-5 font-display text-xl font-bold tracking-tight text-text-strong">
        Không tìm thấy trang
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-text-muted">
        Đường dẫn này không tồn tại hoặc đã được di chuyển.
      </p>
      <Link
        href="/"
        className="press mt-6 inline-flex cursor-pointer items-center gap-1.5 rounded-control bg-phosphor px-4 py-2 text-sm font-medium text-ink-0 hover:bg-phosphor-dim"
      >
        Về trang chủ
      </Link>
    </div>
  );
}
