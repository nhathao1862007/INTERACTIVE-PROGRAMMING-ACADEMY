"use client";

import { useState } from "react";
import { pythonCourse } from "@/content/python-course";
import { cn } from "@/lib/utils";
import { CheckCircle2, Circle, Filter } from "lucide-react";

const allExercises = pythonCourse.chapters
  .flatMap((ch) => ch.lessons)
  .flatMap((l) => l.exercises.map((e) => ({ ...e, lessonTitle: l.title })));

const difficulties = ["all", "beginner", "intermediate", "advanced"] as const;

export default function ExercisesPage() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [solved, setSolved] = useState<Set<string>>(new Set());

  const filtered = allExercises.filter((e) => {
    if (selectedDifficulty !== "all" && e.difficulty !== selectedDifficulty) return false;
    return true;
  });

  const toggleSolved = (id: string) => {
    setSolved((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary mb-1">Exercises</h1>
        <p className="text-text-secondary">Luyện tập với các bài tập đa dạng</p>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-text-muted" strokeWidth={1.5} />
          <span className="text-sm text-text-muted">Filter:</span>
        </div>
        <div className="flex gap-2">
          {difficulties.map((d) => (
            <button
              key={d}
              onClick={() => setSelectedDifficulty(d)}
              className={cn(
                "press rounded-lg px-3 py-1 text-sm transition-colors cursor-pointer",
                selectedDifficulty === d
                  ? "bg-accent/10 text-accent"
                  : "text-text-secondary hover:bg-surface-2"
              )}
            >
              {d.charAt(0).toUpperCase() + d.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((exercise) => {
          const isSolved = solved.has(exercise.id);
          return (
            <div
              key={exercise.id}
              className={cn(
                "rounded-xl border p-4 transition-colors",
                isSolved ? "border-accent/30 bg-accent/5" : "border-surface-3 bg-surface-1"
              )}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={cn(
                      "rounded px-1.5 py-0.5 text-[10px] font-medium",
                      exercise.difficulty === "beginner" ? "bg-accent/10 text-accent" :
                      exercise.difficulty === "intermediate" ? "bg-amber-500/10 text-amber-400" :
                      "bg-red-500/10 text-red-400"
                    )}>
                      {exercise.difficulty}
                    </span>
                    <span className="rounded bg-surface-3 px-1.5 py-0.5 text-[10px] text-text-secondary">
                      {exercise.type.replace("_", " ")}
                    </span>
                    <span className="text-[10px] text-text-faint">+{exercise.points} XP</span>
                  </div>
                  <h3 className="font-medium text-text-primary">{exercise.title}</h3>
                  <p className="text-sm text-text-muted mt-0.5">{exercise.description}</p>
                  <p className="text-xs text-text-faint mt-1">From: {exercise.lessonTitle}</p>
                </div>
                <button
                  onClick={() => toggleSolved(exercise.id)}
                  className="press shrink-0 cursor-pointer"
                >
                  {isSolved ? (
                    <CheckCircle2 className="h-5 w-5 text-accent" strokeWidth={1.5} />
                  ) : (
                    <Circle className="h-5 w-5 text-text-faint" strokeWidth={1.5} />
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
