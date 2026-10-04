/**
 * @module lib/motion/gsap
 * Single GSAP entry point for CODEVERSE Academy.
 * Registers plugins once (client-only) and exports the shared motion tokens
 * that every animation in the app must use.
 */
"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger, Flip);
  // Project-wide defaults — signature duration + easing.
  gsap.defaults({ duration: 0.32, ease: "expo.out" });
}

/** Signature easing curves. `signature` powers ~80% of motion. */
export const EASE = {
  signature: "expo.out",
  out: "power3.out",
  inOut: "power2.inOut",
  soft: "power1.out",
  spring: "back.out(1.7)",
} as const;

/** Duration palette: quick / standard / slow. */
export const DUR = {
  quick: 0.16,
  standard: 0.32,
  slow: 0.64,
} as const;

/** True when the user asked the OS to reduce motion. */
export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export { gsap, useGSAP, ScrollTrigger, Flip };
