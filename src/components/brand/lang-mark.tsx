/**
 * @module components/brand/lang-mark
 * Language identity tiles. Instead of emoji we render a typographic monogram
 * tinted with the language's brand hue — distinctive, and never a wrong logo.
 */
import { cn } from "@/lib/utils";

interface LangInfo {
  short: string;
  color: string;
  label: string;
}

export const LANGS: Record<string, LangInfo> = {
  python: { short: "Py", color: "#3776AB", label: "Python" },
  cpp: { short: "C++", color: "#00599C", label: "C++" },
  c: { short: "C", color: "#A8B9CC", label: "C" },
  java: { short: "Jv", color: "#ED8B00", label: "Java" },
  javascript: { short: "JS", color: "#F7DF1E", label: "JavaScript" },
  typescript: { short: "TS", color: "#3178C6", label: "TypeScript" },
  sql: { short: "SQL", color: "#CC2927", label: "SQL" },
  html: { short: "H5", color: "#E34F26", label: "HTML" },
  css: { short: "CSS", color: "#1572B6", label: "CSS" },
  csharp: { short: "C#", color: "#68217A", label: "C#" },
  go: { short: "Go", color: "#00ADD8", label: "Go" },
  rust: { short: "Rs", color: "#DEA584", label: "Rust" },
};

export function LangMark({
  lang,
  size = "md",
  className,
}: {
  lang: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const info = LANGS[lang] ?? { short: lang.slice(0, 2), color: "#35e0a1", label: lang };
  const sizes = {
    sm: "h-8 w-8 text-[10px] rounded-inner",
    md: "h-10 w-10 text-xs rounded-control",
    lg: "h-14 w-14 text-sm rounded-card",
  } as const;

  return (
    <span
      title={info.label}
      aria-label={info.label}
      className={cn(
        "grid shrink-0 place-items-center border border-edge bg-ink-2 font-mono font-semibold leading-none",
        sizes[size],
        className
      )}
      style={{ color: info.color }}
    >
      {info.short}
    </span>
  );
}
