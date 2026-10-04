/**
 * @module components/three/blueprint-grid
 * CSS-only hero backdrop. Used as the fallback when WebGL is unavailable or
 * the user prefers reduced motion (no animated loop).
 */
import { cn } from "@/lib/utils";

export function BlueprintGrid({ className }: { className?: string }) {
  return (
    <div className={cn("relative h-full w-full overflow-hidden", className)} aria-hidden="true">
      <div className="blueprint-grid absolute inset-0 opacity-70" />
      <div
        className="absolute -left-[10%] top-[10%] h-[42rem] w-[42rem] rounded-full blur-[120px]"
        style={{ background: "radial-gradient(circle, var(--phosphor-glow), transparent 65%)" }}
      />
      <div
        className="absolute -right-[12%] top-[30%] h-[34rem] w-[34rem] rounded-full blur-[120px]"
        style={{ background: "radial-gradient(circle, var(--signal-glow), transparent 65%)" }}
      />
    </div>
  );
}
