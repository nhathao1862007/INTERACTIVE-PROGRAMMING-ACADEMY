/**
 * @module components/motion/tilt-card
 * Pointer-driven 3D tilt. Uses gsap.quickTo so a single tween is reused per
 * axis instead of allocating a tween on every pointermove.
 */
"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Max rotation on each axis, in degrees. */
  intensity?: number;
}

export function TiltCard({ children, className, intensity = 7 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    (_context, contextSafe) => {
      const el = ref.current;
      if (!el || !contextSafe) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const config = { duration: 0.5, ease: "power3.out", transformPerspective: 900 } as const;
      const rotX = gsap.quickTo(el, "rotationX", config);
      const rotY = gsap.quickTo(el, "rotationY", config);
      const scale = gsap.quickTo(el, "scale", config);

      const onMove = contextSafe((event: PointerEvent) => {
        const rect = el.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width - 0.5;
        const py = (event.clientY - rect.top) / rect.height - 0.5;
        rotY(px * intensity);
        rotX(-py * intensity);
      });

      const onEnter = contextSafe(() => scale(1.02));
      const onLeave = contextSafe(() => {
        rotX(0);
        rotY(0);
        scale(1);
      });

      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerenter", onEnter);
      el.addEventListener("pointerleave", onLeave);

      return () => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerenter", onEnter);
        el.removeEventListener("pointerleave", onLeave);
      };
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={cn("preserve-3d will-change-transform", className)}>
      {children}
    </div>
  );
}
