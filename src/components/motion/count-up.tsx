/**
 * @module components/motion/count-up
 * Animated numeric counter. Renders the final value on the server / on first
 * paint so it is never wrong; the GSAP tween only runs when motion is allowed.
 */
"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/motion/gsap";

interface CountUpProps {
  value: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

export function CountUp({
  value,
  className,
  prefix = "",
  suffix = "",
  duration = 1.4,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const state = { n: 0 };
        gsap.to(state, {
          n: value,
          duration,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 92%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            el.textContent = `${prefix}${Math.round(state.n).toLocaleString()}${suffix}`;
          },
        });
      });

      return () => mm.revert();
    },
    { scope: ref, dependencies: [value, prefix, suffix] }
  );

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}
