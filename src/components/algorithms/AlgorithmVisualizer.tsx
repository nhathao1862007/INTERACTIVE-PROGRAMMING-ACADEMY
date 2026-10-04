/**
 * @module components/algorithms/AlgorithmVisualizer
 * Step-driven algorithm visualiser.
 *
 * Motion rules (GSAP):
 *  - transform/opacity only — bar geometry comes from a static inline height,
 *    the animation plays a scaleY/rotateX "pop" from the transform origin.
 *  - stepped tweens use `overwrite: "auto"` so rapid Step presses retarget
 *    instead of stacking.
 *  - the active code line and the compared bars are highlighted together so
 *    source code and state stay visually linked.
 */
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Pause,
  Play,
  RotateCcw,
  Shuffle,
  SkipBack,
  SkipForward,
} from "lucide-react";
import type { Algorithm, AlgorithmStep } from "@/types";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { cn } from "@/lib/utils";

const SPEEDS = [
  { ms: 2000, label: "0.5x" },
  { ms: 1000, label: "1x" },
  { ms: 500, label: "2x" },
  { ms: 200, label: "5x" },
];

function barClass(
  step: AlgorithmStep,
  index: number
): { fill: string; text: string; ring: string } {
  if (step.found === index)
    return { fill: "bg-phosphor", text: "text-phosphor", ring: "ring-phosphor/40" };
  if (step.swapping?.includes(index))
    return { fill: "bg-danger", text: "text-danger", ring: "ring-danger/40" };
  if (step.comparing?.includes(index))
    return { fill: "bg-molten", text: "text-molten", ring: "ring-molten/40" };
  if (step.sorted?.includes(index))
    return { fill: "bg-phosphor/45", text: "text-text-muted", ring: "ring-phosphor/20" };
  return { fill: "bg-ink-4", text: "text-text-muted", ring: "ring-transparent" };
}

export function AlgorithmVisualizer({ algorithm }: { algorithm: Algorithm }) {
  const [steps, setSteps] = useState<AlgorithmStep[]>(algorithm.steps);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1000);

  const rootRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const step = steps[currentStep];
  const isFinished = currentStep >= steps.length - 1;

  // Regenerate the step trace when the algorithm changes.
  useEffect(() => {
    setSteps(algorithm.steps);
    setCurrentStep(0);
    setIsPlaying(false);
  }, [algorithm]);

  // Entrance choreography for the panel itself.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-anim='panel']", {
          autoAlpha: 0,
          y: 18,
          filter: "blur(6px)",
          duration: 0.6,
          ease: "expo.out",
        });
      });
      return () => mm.revert();
    },
    { scope: rootRef }
  );

  // Step change -> animate the bars that entered a new state.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const bars = barsRef.current?.querySelectorAll("[data-bar]");
        if (!bars?.length) return;

        gsap.fromTo(
          bars,
          { transformOrigin: "50% 100%" },
          {
            keyframes: [
              { scaleY: 0.82, duration: 0.14, ease: "power2.out" },
              { scaleY: 1, duration: 0.32, ease: "back.out(2.2)" },
            ],
            stagger: { each: 0.03, from: "start" },
            overwrite: "auto",
          }
        );

        // The active comparison pulses so the eye lands on it first.
        const active = Array.from(bars).filter((bar) =>
          ["compare", "swap", "found"].includes((bar as HTMLElement).dataset.state ?? "")
        );
        if (active.length) {
          gsap.fromTo(
            active,
            { filter: "brightness(1.7)" },
            {
              filter: "brightness(1)",
              duration: 0.55,
              ease: "power2.out",
              stagger: 0.06,
              overwrite: "auto",
            }
          );
        }
      });
      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [currentStep, steps] }
  );

  // The highlighted source line slides in rather than snapping.
  useGSAP(
    () => {
      const el = lineRef.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, x: -10 },
          { autoAlpha: 1, x: 0, duration: 0.3, ease: "expo.out", overwrite: "auto" }
        );
      });
      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [currentStep, steps] }
  );

  useEffect(() => {
    if (!isPlaying) return;
    if (isFinished) {
      setIsPlaying(false);
      return;
    }
    const timer = setTimeout(() => {
      setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
    }, speed);
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, steps.length, speed, isFinished]);

  const handlePlay = () => {
    if (isFinished) setCurrentStep(0);
    setIsPlaying((p) => !p);
  };

  const randomize = useCallback(() => {
    const size = 6;
    const next = Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 5);
    const generated =
      algorithm.id === "bubble-sort"
        ? generateBubbleSortSteps(next)
        : algorithm.id === "binary-search"
          ? generateBinarySearchSteps([...next].sort((a, b) => a - b), next[0])
          : generateLinearSearchSteps(next, next[0]);
    setSteps(generated);
    setCurrentStep(0);
    setIsPlaying(false);
  }, [algorithm.id]);

  return (
    <div
      ref={rootRef}
      data-anim="panel"
      className="overflow-hidden rounded-card bg-ink-1 shadow-e3 ring-edge"
    >
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-edge px-5 py-4">
        <div>
          <h2 className="font-display text-base font-semibold tracking-tight text-text-strong">
            {algorithm.name}
          </h2>
          <p className="mt-0.5 max-w-md text-sm leading-relaxed text-text-muted">
            {algorithm.description}
          </p>
        </div>
        <span className="rounded-control bg-ink-2 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-phosphor ring-edge">
          {algorithm.category}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* ------------------------------ State ------------------------------ */}
        <div className="border-b border-edge p-5 lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.22em] text-text-faint">
              Visualization
            </h3>
            <span className="font-mono text-xs tabular-nums text-text-muted">
              {currentStep + 1} / {steps.length}
            </span>
          </div>

          <div
            ref={barsRef}
            className="mt-4 flex h-56 items-end justify-center gap-2 rounded-control bg-ink-0/60 p-4 ring-edge"
          >
            {step.array.map((value, idx) => {
              const state =
                step.found === idx
                  ? "found"
                  : step.swapping?.includes(idx)
                    ? "swap"
                    : step.comparing?.includes(idx)
                      ? "compare"
                      : "idle";
              const tone = barClass(step, idx);
              return (
                <div key={idx} className="flex flex-col items-center gap-1.5">
                  <span className={cn("font-mono text-xs tabular-nums", tone.text)}>
                    {value}
                  </span>
                  <div
                    data-bar
                    data-state={state}
                    className={cn(
                      "w-9 rounded-t-control ring-1 transition-colors duration-200 will-change-transform",
                      tone.fill,
                      tone.ring
                    )}
                    style={{ height: `${(value / 100) * 132 + 16}px` }}
                  />
                  <span className="font-mono text-[10px] tabular-nums text-text-faint">{idx}</span>
                </div>
              );
            })}
          </div>

          <div className="mt-4 rounded-control bg-ink-0/60 p-4 ring-edge">
            <p className="text-sm leading-relaxed text-text-strong">{step.description}</p>
            {Object.keys(step.variables).length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {Object.entries(step.variables).map(([key, val]) => (
                  <span
                    key={key}
                    className="rounded-inner bg-ink-2 px-2 py-0.5 font-mono text-[11px] text-text-body"
                  >
                    {key}
                    <span className="text-phosphor"> = </span>
                    {String(val)}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="mt-4 flex items-center justify-center gap-2">
            <IconControl label="Khởi động lại" onClick={() => { setCurrentStep(0); setIsPlaying(false); }}>
              <RotateCcw className="h-4 w-4" strokeWidth={1.6} />
            </IconControl>
            <IconControl
              label="Bước trước"
              disabled={currentStep === 0}
              onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
            >
              <SkipBack className="h-4 w-4" strokeWidth={1.6} />
            </IconControl>

            <button
              type="button"
              onClick={handlePlay}
              aria-label={isPlaying ? "Tạm dừng" : "Chạy"}
              className="press grid h-12 w-12 cursor-pointer place-items-center rounded-card bg-phosphor text-ink-0 shadow-glow hover:bg-phosphor-dim"
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" strokeWidth={2} />
              ) : (
                <Play className="h-5 w-5" strokeWidth={2} />
              )}
            </button>

            <IconControl
              label="Bước sau"
              disabled={isFinished}
              onClick={() => setCurrentStep((s) => Math.min(steps.length - 1, s + 1))}
            >
              <SkipForward className="h-4 w-4" strokeWidth={1.6} />
            </IconControl>
            <IconControl label="Ngẫu nhiên dữ liệu" onClick={randomize}>
              <Shuffle className="h-4 w-4" strokeWidth={1.6} />
            </IconControl>
          </div>

          <div className="mt-3 flex items-center justify-center gap-1">
            <span className="mr-1 font-mono text-[10px] uppercase tracking-[0.18em] text-text-faint">
              Speed
            </span>
            {SPEEDS.map((option) => (
              <button
                key={option.ms}
                type="button"
                onClick={() => setSpeed(option.ms)}
                aria-pressed={speed === option.ms}
                className={cn(
                  "press cursor-pointer rounded-inner px-2.5 py-1 font-mono text-[11px] transition-colors",
                  speed === option.ms
                    ? "bg-phosphor/12 text-phosphor"
                    : "text-text-muted hover:bg-ink-2 hover:text-text-body"
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* ------------------------------ Source ------------------------------ */}
        <div className="flex flex-col p-5">
          <h3 className="font-mono text-[11px] uppercase tracking-[0.22em] text-text-faint">
            Source Code
          </h3>

          <div className="mt-4 flex-1 overflow-x-auto rounded-control bg-ink-0/60 p-4 ring-edge">
            <div className="min-w-max font-mono text-[13px] leading-relaxed">
              {algorithm.code.split("\n").map((line, idx) => {
                const active = step.lineHighlight === idx;
                return (
                  <div
                    key={idx}
                    className={cn(
                      "flex items-start gap-3 rounded-inner px-2 py-0.5 transition-colors duration-200",
                      active ? "bg-phosphor/12" : "hover:bg-ink-1/60"
                    )}
                  >
                    <span className="w-6 shrink-0 select-none text-right tabular-nums text-text-faint">
                      {idx + 1}
                    </span>
                    <span
                      ref={active ? lineRef : undefined}
                      className={cn(
                        "whitespace-pre",
                        active ? "text-phosphor" : "text-text-body"
                      )}
                    >
                      {line || " "}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-4 gap-2">
            {[
              { label: "Best", value: algorithm.timeComplexity.best, tone: "text-phosphor" },
              { label: "Average", value: algorithm.timeComplexity.average, tone: "text-molten" },
              { label: "Worst", value: algorithm.timeComplexity.worst, tone: "text-danger" },
              { label: "Space", value: algorithm.spaceComplexity, tone: "text-signal" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-control bg-ink-0/60 p-3 text-center ring-edge"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-faint">
                  {item.label}
                </p>
                <p className={cn("mt-1 font-mono text-sm", item.tone)}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function IconControl({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className="press grid h-10 w-10 cursor-pointer place-items-center rounded-control text-text-body ring-edge transition-colors hover:bg-ink-2 hover:text-text-strong disabled:pointer-events-none disabled:opacity-35"
    >
      {children}
    </button>
  );
}

/* ---------------------------------------------------------------------------
 * Step-trace generators.
 * Each returns a flat list of snapshots; the visualiser replays them.
 * ------------------------------------------------------------------------- */

function generateBubbleSortSteps(arr: number[]): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const a = [...arr];

  steps.push({
    array: [...a],
    lineHighlight: 0,
    description: "Bắt đầu Bubble Sort",
    variables: { i: 0, j: 0 },
  });

  for (let i = 0; i < a.length - 1; i++) {
    for (let j = 0; j < a.length - i - 1; j++) {
      steps.push({
        array: [...a],
        comparing: [j, j + 1],
        lineHighlight: 3,
        description: `So sánh a[${j}]=${a[j]} và a[${j + 1}]=${a[j + 1]}`,
        variables: { i, j, "a[j]": a[j], "a[j+1]": a[j + 1] },
      });

      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        steps.push({
          array: [...a],
          swapped: [j, j + 1],
          lineHighlight: 5,
          description: `Hoán đổi → [${a.join(", ")}]`,
          variables: { i, j },
        });
      }
    }
    steps.push({
      array: [...a],
      sorted: [a.length - i - 1],
      lineHighlight: 2,
      description: `Vòng ${i + 1} xong — phần tử lớn nhất đã về đúng chỗ`,
      variables: { i },
    });
  }

  steps.push({
    array: [...a],
    sorted: a.map((_, idx) => idx),
    lineHighlight: 7,
    description: "Hoàn thành Bubble Sort!",
    variables: {},
  });

  return steps;
}

function generateBinarySearchSteps(arr: number[], target: number): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  let left = 0;
  let right = arr.length - 1;

  steps.push({
    array: [...arr],
    lineHighlight: 0,
    description: `Tìm ${target} trong mảng đã sắp xếp`,
    variables: { left, right, target },
  });

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    steps.push({
      array: [...arr],
      comparing: [mid],
      lineHighlight: 2,
      description: `mid=${mid} → arr[mid]=${arr[mid]}`,
      variables: { left, right, mid },
    });

    if (arr[mid] === target) {
      steps.push({
        array: [...arr],
        found: mid,
        lineHighlight: 3,
        description: `Tìm thấy ${target} tại index ${mid}`,
        variables: { mid },
      });
      return steps;
    }

    if (arr[mid] < target) {
      left = mid + 1;
      steps.push({
        array: [...arr],
        lineHighlight: 4,
        description: "Giá trị giữa nhỏ hơn → tìm sang phải",
        variables: { left, right },
      });
    } else {
      right = mid - 1;
      steps.push({
        array: [...arr],
        lineHighlight: 5,
        description: "Giá trị giữa lớn hơn → tìm sang trái",
        variables: { left, right },
      });
    }
  }

  steps.push({
    array: [...arr],
    lineHighlight: 7,
    description: `Không tìm thấy ${target}`,
    variables: {},
  });

  return steps;
}

function generateLinearSearchSteps(arr: number[], target: number): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [
    {
      array: [...arr],
      lineHighlight: 0,
      description: `Tìm ${target}`,
      variables: { target },
    },
  ];

  for (let i = 0; i < arr.length; i++) {
    steps.push({
      array: [...arr],
      comparing: [i],
      lineHighlight: 2,
      description: `Kiểm tra arr[${i}] = ${arr[i]}`,
      variables: { i },
    });
    if (arr[i] === target) {
      steps.push({
        array: [...arr],
        found: i,
        lineHighlight: 3,
        description: `Tìm thấy ${target} tại index ${i}`,
        variables: { i },
      });
      return steps;
    }
  }

  steps.push({
    array: [...arr],
    lineHighlight: 5,
    description: `Không tìm thấy ${target}`,
    variables: {},
  });

  return steps;
}