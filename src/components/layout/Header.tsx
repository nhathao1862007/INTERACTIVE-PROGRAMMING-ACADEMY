/**
 * @module components/layout/Header
 * Sticky application header: mobile nav trigger, command-palette search,
 * streak, theme switch and account affordances.
 */
"use client";

import { Bell, Flame, Menu, Search } from "lucide-react";
import { CommandPalette } from "./CommandPalette";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useShellStore } from "@/lib/store/shell";

export function Header() {
  const setMobileNav = useShellStore((s) => s.setMobileNav);
  const setPalette = useShellStore((s) => s.setPalette);

  return (
    <>
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-3 border-b border-edge bg-ink-0/70 px-3 backdrop-blur-xl sm:px-6">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileNav(true)}
            aria-label="Mở menu"
            className="press grid h-9 w-9 cursor-pointer place-items-center rounded-control text-text-muted hover:bg-ink-2 hover:text-text-strong lg:hidden"
          >
            <Menu className="h-5 w-5" strokeWidth={1.6} />
          </button>
        </div>

        <button
          type="button"
          onClick={() => setPalette(true)}
          className="group flex h-9 w-full max-w-sm cursor-pointer items-center gap-3 rounded-control bg-ink-1 px-3 text-sm text-text-muted ring-edge transition-shadow hover:ring-edge-strong"
        >
          <Search className="h-4 w-4 shrink-0" strokeWidth={1.6} />
          <span className="flex-1 truncate text-left">Tìm kiếm bài học, thuật toán…</span>
          <kbd className="hidden rounded border border-edge px-1.5 py-0.5 text-[10px] text-text-faint sm:block">
            ⌘K
          </kbd>
        </button>

        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-1.5 rounded-control bg-molten/12 px-2.5 py-1.5">
            <Flame className="h-4 w-4 text-molten" strokeWidth={1.6} />
            <span className="text-sm font-medium tabular-nums text-molten">7</span>
          </div>

          <ThemeToggle />

          <button
            type="button"
            aria-label="Thông báo"
            className="press relative grid h-9 w-9 cursor-pointer place-items-center rounded-control text-text-muted hover:bg-ink-2 hover:text-text-strong"
          >
            <Bell className="h-4 w-4" strokeWidth={1.6} />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-phosphor" />
          </button>

          <button
            type="button"
            aria-label="Tài khoản"
            className="press grid h-8 w-8 cursor-pointer place-items-center rounded-full bg-phosphor/15 text-xs font-bold text-phosphor"
          >
            H
          </button>
        </div>
      </header>

      <CommandPalette />
    </>
  );
}
