/**
 * @module components/motion/reveal
 * Scroll-triggered entrance. Content is visible by default (SSR / no-JS /
 * reduced-motion safe); the animation only attaches when motion is allowed.
 */
"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/motion/gsap";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Travel distance in px. */
  y?: number;
  delay?: number;
}

export function Reveal({ children, className, y = 18, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y, filter: "blur(6px)" },
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.64,
            delay,
            ease: "expo.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
