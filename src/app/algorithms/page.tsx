/**
 * @module app/algorithms
 * Algorithm library + visualiser. Selecting an algorithm loads its step
 * trace into <AlgorithmVisualizer />.
 */
"use client";

import { useMemo, useState } from "react";
import { algorithms } from "@/content/algorithms";
import { AlgorithmVisualizer } from "@/components/algorithms/AlgorithmVisualizer";
import { Reveal } from "@/components/motion/reveal";
import { TiltCard } from "@/components/motion/tilt-card";
import { cn } from "@/lib/utils";

const CATEGORIES = ["all", "sorting", "searching", "graph", "dp", "greedy"] as const;

type Category = (typeof CATEGORIES)[number];

const categoryLabel: Record<Category, string> = {
  all: "Tất cả",
  sorting: "Sorting",
  searching: "Searching",
  graph: "Graph",
  dp: "Dynamic Programming",
  greedy: "Greedy",
};

export default function AlgorithmsPage() {
  const [category, setCategory] = useState<Category>("all");
  const [selectedId, setSelectedId] = useState<string>(algorithms[0]?.id ?? "");

  const visible = useMemo(
    () => (category === "all" ? algorithms : algorithms.filter((a) => a.category === category)),
    [category]
  );

  const current = useMemo(
    () => algorithms.find((a) => a.id === selectedId) ?? visible[0] ?? algorithms[0],
    [selectedId, visible]
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <Reveal>
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-text-faint">
          Step-by-step execution
        </p>
        <h1 className="mt-3 font-display text-2xl font-bold tracking-tight text-text-strong sm:text-3xl">
          Algorithm Visualizer
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-body">
          Mỗi thuật toán được tách thành từng trạng thái. Bấm Play hoặc Step để xem dòng code
          tương ứng sáng lên cùng với biến và vùng nhớ.
        </p>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="mt-6 flex flex-wrap items-center gap-2">
          {CATEGORIES.map((item) => {
            const active = category === item;
            return (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                aria-pressed={active}
                className={cn(
                  "press cursor-pointer rounded-control px-3 py-1.5 font-mono text-xs transition-colors duration-200",
                  active
                    ? "bg-phosphor/12 text-phosphor ring-1 ring-phosphor/40"
                    : "bg-ink-1 text-text-muted ring-edge hover:bg-ink-2 hover:text-text-body"
                )}
              >
                {categoryLabel[item]}
              </button>
            );
          })}
        </div>
      </Reveal>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((algo, index) => {
          const active = current?.id === algo.id;
          return (
            <Reveal key={algo.id} delay={Math.min(index * 0.04, 0.24)}>
              <TiltCard intensity={5} className="h-full">
                <button
                  type="button"
                  onClick={() => setSelectedId(algo.id)}
                  aria-pressed={active}
                  className={cn(
                    "group flex h-full w-full cursor-pointer flex-col rounded-card p-4 text-left transition-colors duration-200",
                    active
                      ? "bg-phosphor/10 ring-1 ring-phosphor/50"
                      : "bg-ink-1 ring-edge hover:bg-ink-2"
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-display text-sm font-semibold tracking-tight text-text-strong">
                      {algo.name}
                    </span>
                    <span className="shrink-0 rounded-inner bg-ink-2 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-phosphor">
                      {algo.category}
                    </span>
                  </div>
                  <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-text-muted">
                    {algo.description}
                  </p>
                  <div className="mt-3 flex gap-1.5">
                    <span className="rounded-inner bg-ink-0/60 px-1.5 py-0.5 font-mono text-[10px] text-text-body">
                      T {algo.timeComplexity.average}
                    </span>
                    <span className="rounded-inner bg-ink-0/60 px-1.5 py-0.5 font-mono text-[10px] text-text-body">
                      S {algo.spaceComplexity}
                    </span>
                  </div>
                </button>
              </TiltCard>
            </Reveal>
          );
        })}
      </div>

      {current && (
        <div className="mt-6">
          <AlgorithmVisualizer algorithm={current} />
        </div>
      )}
    </div>
  );
}