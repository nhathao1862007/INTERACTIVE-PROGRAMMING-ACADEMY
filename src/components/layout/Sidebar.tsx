/**
 * @module components/layout/Sidebar
 * Primary navigation. Renders a fixed rail on desktop and a slide-over
 * Sheet on mobile (driven by the shell store).
 */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { navGroups } from "./nav";
import { Sheet } from "@/components/ui/sheet";
import { useShellStore } from "@/lib/store/shell";
import { cn } from "@/lib/utils";

function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M12 2.8 20 7.4 12 12 4 7.4 12 2.8Z" fill="currentColor" opacity="0.95" />
      <path d="M4 7.4v9.2L12 21.2V12L4 7.4Z" fill="currentColor" opacity="0.5" />
      <path d="M20 7.4v9.2L12 21.2V12l8-4.6Z" fill="currentColor" opacity="0.75" />
    </svg>
  );
}

function Brand({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onNavigate}
      className="flex items-center gap-3 border-b border-edge px-5 py-4 cursor-pointer"
    >
      <span className="grid h-9 w-9 place-items-center rounded-control bg-phosphor/12 text-phosphor shadow-glow">
        <BrandMark className="h-5 w-5" />
      </span>
      <span className="leading-none">
        <span className="block font-display text-sm font-bold tracking-tight text-text-strong">
          CODEVERSE
        </span>
        <span className="mt-1 block text-[10px] uppercase tracking-[0.22em] text-text-faint">
          Academy
        </span>
      </span>
    </Link>
  );
}

function SidebarPanel({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      <Brand onNavigate={onNavigate} />

      <nav className="flex-1 space-y-5 overflow-y-auto px-3 py-4">
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-text-faint">
              {group.label}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "press group relative flex items-center gap-3 rounded-control px-3 py-2 text-sm transition-colors cursor-pointer",
                        active
                          ? "bg-phosphor/10 text-phosphor"
                          : "text-text-body hover:bg-ink-2 hover:text-text-strong"
                      )}
                    >
                      <span
                        className={cn(
                          "absolute left-0 top-1/2 h-5 w-[2px] -translate-y-1/2 rounded-full bg-phosphor transition-opacity duration-200",
                          active ? "opacity-100" : "opacity-0"
                        )}
                      />
                      <item.icon className="h-4 w-4 shrink-0" strokeWidth={active ? 2 : 1.6} />
                      <span className="truncate">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-edge p-4">
        <div className="rounded-control bg-ink-2 p-3 ring-edge">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-text-body">Level 5</span>
            <span className="text-xs tabular-nums text-phosphor">2,450 XP</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink-3">
            <div className="h-full w-[65%] rounded-full bg-phosphor" />
          </div>
          <p className="mt-2 text-[10px] text-text-faint">550 XP → Level 6</p>
        </div>
      </div>
    </div>
  );
}

export function Sidebar() {
  const mobileNavOpen = useShellStore((s) => s.mobileNavOpen);
  const setMobileNav = useShellStore((s) => s.setMobileNav);

  return (
    <>
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 border-r border-edge bg-ink-1/85 backdrop-blur-xl lg:block">
        <SidebarPanel />
      </aside>

      <Sheet
        open={mobileNavOpen}
        onClose={() => setMobileNav(false)}
        label="Menu điều hướng"
      >
        <div className="flex justify-end p-2">
          <button
            type="button"
            onClick={() => setMobileNav(false)}
            aria-label="Đóng menu"
            className="press grid h-9 w-9 cursor-pointer place-items-center rounded-control text-text-muted hover:bg-ink-2 hover:text-text-strong"
          >
            <X className="h-4 w-4" strokeWidth={1.6} />
          </button>
        </div>
        <SidebarPanel onNavigate={() => setMobileNav(false)} />
      </Sheet>
    </>
  );
}
