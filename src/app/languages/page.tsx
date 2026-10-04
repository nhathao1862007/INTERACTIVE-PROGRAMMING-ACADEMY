"use client";

import { BookOpen, ChevronRight, Lock } from "lucide-react";
import Link from "next/link";

const languages = [
  { id: "python", name: "Python", icon: "🐍", color: "#3776AB", level: "Beginner Friendly", lessons: 15, description: "Ngôn ngữ lập trình phổ biến nhất cho người mới bắt đầu", available: true },
  { id: "c", name: "C", icon: "⚙️", color: "#A8B9CC", level: "Intermediate", lessons: 0, description: "Ngôn ngữ nền tảng, hiểu cách máy tính hoạt động", available: false },
  { id: "cpp", name: "C++", icon: "⚡", color: "#00599C", level: "Intermediate", lessons: 0, description: "Mạnh mẽ cho system programming và competitive programming", available: false },
  { id: "java", name: "Java", icon: "☕", color: "#ED8B00", level: "Intermediate", lessons: 0, description: "Enterprise và Android development", available: false },
  { id: "javascript", name: "JavaScript", icon: "🟨", color: "#F7DF1E", level: "Beginner Friendly", lessons: 0, description: "Ngôn ngữ của web — chạy trên mọi trình duyệt", available: false },
  { id: "typescript", name: "TypeScript", icon: "🔷", color: "#3178C6", level: "Intermediate", lessons: 0, description: "JavaScript với type safety", available: false },
  { id: "html", name: "HTML", icon: "🌐", color: "#E34F26", level: "Beginner", lessons: 0, description: "Ngôn ngữ đánh dấu siêu văn bản cho web", available: false },
  { id: "css", name: "CSS", icon: "🎨", color: "#1572B6", level: "Beginner", lessons: 0, description: "Ngôn ngữ tạo kiểu cho web", available: false },
  { id: "sql", name: "SQL", icon: "🗄️", color: "#CC2927", level: "Intermediate", lessons: 0, description: "Ngôn ngữ truy vấn database", available: false },
];

export default function LanguagesPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-primary mb-1">Programming Languages</h1>
        <p className="text-text-secondary">Chọn ngôn ngữ để bắt đầu học</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {languages.map((lang) => (
          <Link
            key={lang.id}
            href={lang.available ? `/courses/${lang.id}` : "#"}
            className={`press card-hover rounded-xl border p-5 cursor-pointer ${
              lang.available
                ? "border-surface-3 bg-surface-2"
                : "border-surface-3/50 bg-surface-1 opacity-50"
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{lang.icon}</span>
              <div>
                <h3 className="font-semibold text-text-primary">{lang.name}</h3>
                <p className="text-xs text-text-muted">{lang.level}</p>
              </div>
            </div>
            <p className="text-sm text-text-secondary mb-3">{lang.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs text-text-muted">
                <span className="flex items-center gap-1">
                  <BookOpen className="h-3 w-3" strokeWidth={1.5} />
                  {lang.lessons} lessons
                </span>
              </div>
              {lang.available ? (
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
