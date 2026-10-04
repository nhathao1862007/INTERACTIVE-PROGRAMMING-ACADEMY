/**
 * @module components/layout/CommandPalette
 * Keyboard-first navigation palette (Ctrl/Cmd + K) over the nav model.
 */
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CornerDownLeft, Search } from "lucide-react";
import { navItems } from "./nav";
import { useShellStore } from "@/lib/store/shell";
import { cn } from "@/lib/utils";

export function CommandPalette() {
  const router = useRouter();
  const open = useShellStore((s) => s.paletteOpen);
  const setOpen = useShellStore((s) => s.setPalette);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(!open);
      }
      if (event.key === "Escape" && open) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  useEffect(() => {
    if (!open) return;
    setQuery("");
    setActive(0);
    const id = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(id);
  }, [open]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return navItems.slice(0, 8);
    return navItems
      .filter(
        (item) =>
          item.label.toLowerCase().includes(q) ||
          item.href.includes(q) ||
          (item.hint ?? "").toLowerCase().includes(q)
      )
      .slice(0, 8);
  }, [query]);

  const go = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60]"
      role="dialog"
      aria-modal="true"
      aria-label="Tìm kiếm nhanh"
    >
      <button
        type="button"
        aria-label="Đóng"
        onClick={() => setOpen(false)}
        className="absolute inset-0 cursor-default bg-ink-0/70 backdrop-blur-sm"
      />
      <div className="absolute left-1/2 top-[12vh] w-[min(38rem,92vw)] -translate-x-1/2 overflow-hidden rounded-card bg-ink-1 shadow-e4 ring-edge">
        <div className="flex items-center gap-3 border-b border-edge px-4">
          <Search className="h-4 w-4 shrink-0 text-text-muted" strokeWidth={1.6} />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown") {
                event.preventDefault();
                setActive((a) => Math.min(a + 1, results.length - 1));
              }
              if (event.key === "ArrowUp") {
                event.preventDefault();
                setActive((a) => Math.max(a - 1, 0));
              }
              if (event.key === "Enter" && results[active]) {
                go(results[active].href);
              }
            }}
            placeholder="Tìm trang, khoá học, thuật toán…"
            aria-label="Tìm kiếm nhanh"
            className="h-12 w-full bg-transparent text-sm text-text-strong outline-none placeholder:text-text-muted"
          />
          <kbd className="rounded border border-edge px-1.5 py-0.5 text-[10px] text-text-faint">
            ESC
          </kbd>
        </div>

        <ul className="max-h-80 overflow-y-auto p-2">
          {results.map((item, idx) => (
            <li key={item.href}>
              <button
                type="button"
                onMouseEnter={() => setActive(idx)}
                onClick={() => go(item.href)}
                className={cn(
                  "flex w-full cursor-pointer items-center gap-3 rounded-control px-3 py-2 text-left text-sm transition-colors",
                  idx === active
                    ? "bg-phosphor/10 text-phosphor"
                    : "text-text-body hover:bg-ink-2"
                )}
              >
                <item.icon className="h-4 w-4 shrink-0" strokeWidth={1.6} />
                <span className="flex-1 truncate">{item.label}</span>
                {item.hint && (
                  <span className="hidden text-xs text-text-faint sm:block">{item.hint}</span>
                )}
                {idx === active && (
                  <CornerDownLeft className="h-3.5 w-3.5 shrink-0 text-text-faint" strokeWidth={1.6} />
                )}
              </button>
            </li>
          ))}
          {results.length === 0 && (
            <li className="px-3 py-6 text-center text-sm text-text-muted">
              Không tìm thấy kết quả
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
