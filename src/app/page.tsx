/**
 * @module app/page
 * Home — mission control. Asks "what do you want to become?", then previews
 * the matching roadmap. Hero backdrop is the custom WebGL scene.
 */
"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import {
  ArrowRight,
  Brain,
  BookOpen,
  Check,
  ChevronRight,
  Code2,
  Gamepad2,
  Layers,
  LayoutDashboard,
  Server,
  ShieldCheck,
  Smartphone,
  Target,
  Terminal,
  TrendingUp,
  Trophy,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { careerPaths } from "@/content/career-paths";
import { HeroScene } from "@/components/three/hero-scene";
import { Reveal } from "@/components/motion/reveal";
import { TiltCard } from "@/components/motion/tilt-card";
import { CountUp } from "@/components/motion/count-up";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { cn } from "@/lib/utils";

const CAREER_ICON: Record<string, LucideIcon> = {
  "software-engineer": Terminal,
  "fullstack-developer": Layers,
  "ai-engineer": Brain,
  "data-scientist": TrendingUp,
  "frontend-developer": LayoutDashboard,
  "backend-developer": Server,
  "mobile-developer": Smartphone,
  "cybersecurity-engineer": ShieldCheck,
  "game-developer": Gamepad2,
  "devops-engineer": Wrench,
  "competitive-programmer": Trophy,
};

const features: { icon: LucideIcon; title: string; desc: string; href: string }[] = [
  { icon: Terminal, title: "Code Playground", desc: "Viết và chạy code trực tiếp trong trình duyệt", href: "/playground" },
  { icon: Zap, title: "Algorithm Visualizer", desc: "Xem thuật toán chạy từng bước, code sáng theo dòng", href: "/algorithms" },
  { icon: BookOpen, title: "Interactive Lessons", desc: "Học qua thực hành thay vì chỉ đọc lý thuyết", href: "/courses" },
  { icon: Trophy, title: "Progress Tracking", desc: "Theo dõi tiến độ, XP và thành tựu của bạn", href: "/progress" },
];

const dailyPlan = [
  { label: "20 min — Python Fundamentals", done: true },
  { label: "15 min — Bubble Sort Visualizer", done: true },
  { label: "3 bài tập — Variables & Data Types", done: false },
  { label: "1 coding challenge — FizzBuzz", done: false },
  { label: "10 min review — String methods", done: false },
];

const stats: { label: string; value: number; suffix?: string }[] = [
  { label: "Lessons completed", value: 24 },
  { label: "Exercises solved", value: 87 },
  { label: "Current streak", value: 7, suffix: " days" },
  { label: "Total XP", value: 2450 },
];

export default function HomePage() {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "expo.out", transformPerspective: 1000 },
        });
        tl.from(".hero-eyebrow", { y: 12, autoAlpha: 0, duration: 0.5 })
          .from(
            ".hero-title-line",
            { y: 36, autoAlpha: 0, rotateX: -38, filter: "blur(8px)", duration: 0.85, stagger: 0.09 },
            "-=0.25"
          )
          .from(".hero-copy", { y: 16, autoAlpha: 0, duration: 0.6 }, "-=0.55")
          .from(".hero-stat", { y: 18, autoAlpha: 0, duration: 0.5, stagger: 0.08 }, "-=0.45");
      });
      return () => mm.revert();
    },
    { scope: heroRef }
  );

  const active = careerPaths.find((p) => p.id === selectedPath);
  const ActiveIcon = active ? CAREER_ICON[active.id] ?? Code2 : Code2;

  return (
    <div>
      <section ref={heroRef} className="relative isolate overflow-hidden border-b border-edge">
        <div className="absolute inset-0 -z-10">
          <HeroScene />
        </div>
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-ink-0/10 via-ink-0/50 to-ink-0" />

        <div className="mx-auto max-w-6xl px-6 pb-20 pt-16 sm:pt-24">
          <p className="hero-eyebrow font-mono text-[11px] uppercase tracking-[0.28em] text-phosphor">
            Codeverse Academy — Interactive Learning
          </p>

          <h1 className="mt-5 font-display text-[clamp(2.5rem,6.2vw,4.5rem)] font-bold leading-[1.02] tracking-tight text-text-strong">
            <span className="hero-title-line block">Bạn muốn</span>
            <span className="hero-title-line block text-phosphor">trở thành gì?</span>
          </h1>

          <p className="hero-copy mt-6 max-w-xl text-pretty text-[15px] leading-relaxed text-text-body">
            Quan sát — tương tác — viết code — chạy thử — sửa lỗi. Chọn mục tiêu nghề nghiệp,
            hệ thống sẽ dựng lộ trình và đưa bạn qua từng bước với visualizer, playground và bài tập.
          </p>

          <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="hero-stat">
                <p className="font-display text-2xl font-bold tabular-nums text-text-strong sm:text-3xl">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-1 text-xs text-text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-text-faint">
            Step 01 — Direction
          </p>
          <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-text-strong sm:text-3xl">
            Chọn mục tiêu nghề nghiệp
          </h2>
          <p className="mt-2 max-w-2xl text-pretty text-sm leading-relaxed text-text-body">
            Mỗi mục tiêu mở ra một roadmap riêng — bạn luôn biết mình đang ở đâu và bước tiếp theo là gì.
          </p>
        </Reveal>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {careerPaths.map((path, index) => {
            const Icon = CAREER_ICON[path.id] ?? Code2;
            const isActive = selectedPath === path.id;
            return (
              <Reveal key={path.id} delay={Math.min(index * 0.04, 0.32)}>
                <TiltCard intensity={6} className="h-full">
                  <button
                    type="button"
                    onClick={() => setSelectedPath(isActive ? null : path.id)}
                    aria-pressed={isActive}
                    className={cn(
                      "group flex h-full w-full cursor-pointer flex-col rounded-card p-4 text-left transition-colors duration-200",
                      isActive
                        ? "bg-phosphor/10 ring-1 ring-phosphor/50"
                        : "bg-ink-1 ring-edge hover:bg-ink-2"
                    )}
                  >
                    <span
                      className={cn(
                        "grid h-9 w-9 place-items-center rounded-control ring-edge transition-colors",
                        isActive
                          ? "bg-phosphor/15 text-phosphor"
                          : "bg-ink-2 text-text-body group-hover:text-phosphor"
                      )}
                    >
                      <Icon className="h-4 w-4" strokeWidth={1.6} />
                    </span>
                    <span className="mt-3 block text-sm font-medium leading-snug text-text-strong">
                      {path.title}
                    </span>
                    <span className="mt-1 block text-xs leading-relaxed text-text-muted">
                      {path.description}
                    </span>
                  </button>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>

        {active && (
          <div className="mt-8 rounded-card bg-ink-1 p-6 shadow-e3 ring-edge">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-control bg-phosphor/12 text-phosphor shadow-glow">
                  <ActiveIcon className="h-5 w-5" strokeWidth={1.6} />
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold tracking-tight text-text-strong">
                    {active.title} Roadmap
                  </h3>
                  <p className="text-xs text-text-muted">
                    {active.roadmap.length} bước ·{" "}
                    {active.roadmap.filter((n) => n.status === "available").length} bước đang mở
                  </p>
                </div>
              </div>
              <Link
                href={`/roadmap?path=${active.id}`}
                className="press inline-flex cursor-pointer items-center gap-1.5 rounded-control bg-phosphor px-4 py-2 text-sm font-medium text-ink-0 hover:bg-phosphor-dim"
              >
                Bắt đầu <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </Link>
            </div>

            <ol className="mt-5 flex flex-wrap items-center gap-2">
              {active.roadmap.map((node, idx) => (
                <li key={node.id} className="flex items-center gap-2">
                  <span className="rounded-control bg-ink-2 px-3 py-1.5 text-xs text-text-body ring-edge">
                    {node.title}
                  </span>
                  {idx < active.roadmap.length - 1 && (
                    <ChevronRight className="h-3.5 w-3.5 text-text-faint" strokeWidth={1.6} />
                  )}
                </li>
              ))}
            </ol>
          </div>
        )}
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-text-faint">
            Step 02 — Toolkit
          </p>
          <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-text-strong sm:text-3xl">
            Bộ công cụ học tập
          </h2>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Reveal key={feature.title} delay={Math.min(index * 0.05, 0.2)}>
              <Link
                href={feature.href}
                className="group flex h-full cursor-pointer flex-col rounded-card bg-ink-1 p-5 ring-edge transition-[background-color,box-shadow] duration-200 hover:bg-ink-2 hover:shadow-e3"
              >
                <feature.icon className="h-6 w-6 text-phosphor" strokeWidth={1.6} />
                <h3 className="mt-4 font-medium text-text-strong">{feature.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-text-muted">{feature.desc}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-xs font-medium text-phosphor opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  Mở <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <div className="h-full rounded-card bg-ink-1 p-6 ring-edge">
              <div className="flex items-center gap-3">
                <Target className="h-5 w-5 text-phosphor" strokeWidth={1.6} />
                <h3 className="font-medium text-text-strong">Daily Plan — hôm nay</h3>
                <span className="ml-auto font-mono text-xs tabular-nums text-text-faint">2/5</span>
              </div>
              <ul className="mt-4 space-y-3">
                {dailyPlan.map((item) => (
                  <li key={item.label} className="flex items-center gap-3">
                    <span
                      className={cn(
                        "grid h-5 w-5 shrink-0 place-items-center rounded-[6px] border",
                        item.done
                          ? "border-phosphor bg-phosphor/20 text-phosphor"
                          : "border-edge text-transparent"
                      )}
                    >
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    <span
                      className={cn(
                        "text-sm",
                        item.done ? "text-text-muted line-through" : "text-text-body"
                      )}
                    >
                      {item.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <Link
              href="/daily-challenge"
              className="group flex h-full cursor-pointer flex-col justify-between rounded-card bg-ink-1 p-6 ring-edge transition-shadow duration-200 hover:shadow-e3"
            >
              <div>
                <Zap className="h-6 w-6 text-molten" strokeWidth={1.6} />
                <h3 className="mt-4 font-medium text-text-strong">Thử thách hôm nay</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-text-muted">
                  FizzBuzz · +50 XP. Giữ streak 7 ngày của bạn.
                </p>
              </div>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-phosphor">
                Làm ngay
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  strokeWidth={2}
                />
              </span>
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
