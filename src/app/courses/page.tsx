"use client";

import { BookOpen, ChevronRight, Lock } from "lucide-react";
import Link from "next/link";

const courses = [
  { id: "python", title: "Python", icon: "🐍", color: "#3776AB", progress: 42, lessons: 15, description: "Ngôn ngữ lập trình phổ biến nhất cho người mới" },
  { id: "cpp", title: "C++", icon: "⚡", color: "#00599C", progress: 0, lessons: 0, description: "Ngôn ngữ mạnh mẽ cho system programming" },
  { id: "javascript", title: "JavaScript", icon: "🟨", color: "#F7DF1E", progress: 0, lessons: 0, description: "Ngôn ngữ của web" },
  { id: "java", title: "Java", icon: "☕", color: "#ED8B00", progress: 0, lessons: 0, description: "Enterprise và Android development" },
  { id: "typescript", title: "TypeScript", icon: "🔷", color: "#3178C6", progress: 0, lessons: 0, description: "JavaScript với type safety" },
  { id: "sql", title: "SQL", icon: "🗄️", color: "#CC2927", progress: 0, lessons: 0, description: "Ngôn ngữ truy vấn database" },
];

export default function CoursesPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-primary mb-1">Courses</h1>
        <p className="text-text-secondary">Chọn một ngôn ngữ để bắt đầu học</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course) => (
          <Link
            key={course.id}
            href={course.id === "python" ? "/courses/python" : "#"}
            className={`press card-hover rounded-xl border p-5 cursor-pointer ${
              course.id === "python"
                ? "border-surface-3 bg-surface-2"
                : "border-surface-3/50 bg-surface-1 opacity-50"
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{course.icon}</span>
              <div>
                <h3 className="font-semibold text-text-primary">{course.title}</h3>
                <p className="text-xs text-text-muted">{course.description}</p>
              </div>
            </div>

            {course.progress > 0 && (
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-text-muted">Progress</span>
                  <span className="text-xs text-accent tabular-nums">{course.progress}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-surface-3 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-accent transition-all duration-500"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs text-text-muted">
                <span className="flex items-center gap-1">
                  <BookOpen className="h-3 w-3" strokeWidth={1.5} />
                  {course.lessons} lessons
                </span>
              </div>
              {course.id === "python" ? (
                <ChevronRight className="h-4 w-4 text-text-faint" strokeWidth={1.5} />
              ) : (
                <Lock className="h-4 w-4 text-text-faint" strokeWidth={1.5} />
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
