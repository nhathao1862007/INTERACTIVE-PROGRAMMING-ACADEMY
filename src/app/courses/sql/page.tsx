"use client";

import { sqlCourse } from "@/content/sql-course";
import { CheckCircle2, Circle, Lock, Clock, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function SqlCoursePage() {
  const totalLessons = sqlCourse.chapters.reduce((acc, ch) => acc + ch.lessons.length, 0);
  const completedLessons = 0;
  const progress = Math.round((completedLessons / totalLessons) * 100);

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-5xl">🗄️</span>
          <div>
            <h1 className="text-2xl font-bold text-text-primary">{sqlCourse.title}</h1>
            <p className="text-text-secondary">{sqlCourse.description}</p>
          </div>
        </div>

        <div className="rounded-xl border border-surface-3 bg-surface-2 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">Overall Progress</span>
            <span className="text-sm font-medium text-accent tabular-nums">{progress}%</span>
          </div>
          <div className="h-2 rounded-full bg-surface-3 overflow-hidden">
            <div className="h-full rounded-full bg-accent transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-2 text-xs text-text-muted">
            {completedLessons} / {totalLessons} lessons completed
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {sqlCourse.chapters.map((chapter) => (
          <div key={chapter.id} className="rounded-xl border border-surface-3 bg-surface-1 overflow-hidden">
            <div className="border-b border-surface-3 bg-surface-2 px-5 py-3">
              <h2 className="font-semibold text-text-primary">{chapter.title}</h2>
              <p className="text-sm text-text-muted">{chapter.description}</p>
            </div>

            <div className="divide-y divide-surface-3/50">
              {chapter.lessons.map((lesson, idx) => {
                const isLocked = idx > 0;

                return (
                  <Link
                    key={lesson.id}
                    href={isLocked ? "#" : `/courses/sql/lessons/${lesson.id}`}
                    className={`flex items-center justify-between px-5 py-3 transition-colors ${
                      isLocked ? "opacity-50 cursor-not-allowed" : "hover:bg-surface-2/50 cursor-pointer"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {isLocked ? (
                        <Lock className="h-5 w-5 text-text-faint" strokeWidth={1.5} />
                      ) : (
                        <Circle className="h-5 w-5 text-text-faint" strokeWidth={1.5} />
                      )}
                      <div>
                        <h3 className={`text-sm font-medium ${isLocked ? "text-text-muted" : "text-text-primary"}`}>
                          {lesson.title}
                        </h3>
                        <p className="text-xs text-text-muted">{lesson.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 text-xs text-text-muted">
                        <Clock className="h-3 w-3" strokeWidth={1.5} />
                        {lesson.duration} min
                      </span>
                      {!isLocked && <ChevronRight className="h-4 w-4 text-text-faint" strokeWidth={1.5} />}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
