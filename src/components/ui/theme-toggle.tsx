/**
 * @module components/ui/theme-toggle
 * Dark/light switch. Icons cross-fade with opacity + scale + blur
 * (matching the icon-animation values: 0.25 → 1, blur 4px → 0).
 */
"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  const base =
    "absolute h-4 w-4 transition-[opacity,transform,filter] duration-300 ease-signature";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Chuyển sang giao diện sáng" : "Chuyển sang giao diện tối"}
      aria-pressed={isDark}
      className={cn(
        "press relative grid h-9 w-9 cursor-pointer place-items-center rounded-control text-text-muted hover:bg-ink-2 hover:text-text-strong",
        className
      )}
    >
      <Sun
        strokeWidth={1.6}
        className={cn(
          base,
          isDark
            ? "scale-[0.25] opacity-0 blur-[4px] rotate-90"
            : "scale-100 opacity-100 blur-0 rotate-0"
        )}
      />
      <Moon
        strokeWidth={1.6}
        className={cn(
          base,
          isDark
            ? "scale-100 opacity-100 blur-0 rotate-0"
            : "scale-[0.25] opacity-0 blur-[4px] -rotate-90"
        )}
      />
    </button>
  );
}
