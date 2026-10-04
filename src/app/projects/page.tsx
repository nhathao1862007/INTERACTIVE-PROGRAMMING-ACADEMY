"use client";

import { Clock, Star, Lock } from "lucide-react";

const projects = [
  { id: "calc", title: "Calculator", difficulty: "beginner", duration: "30 min", description: "Xây dựng máy tính đơn giản với Python", xp: 50, available: true },
  { id: "guess", title: "Number Guessing Game", difficulty: "beginner", duration: "45 min", description: "Trò chơi đoán số với random module", xp: 75, available: true },
  { id: "todo", title: "To-do CLI", difficulty: "beginner", duration: "60 min", description: "Quản lý công việc qua command line", xp: 100, available: true },
  { id: "password", title: "Password Generator", difficulty: "beginner", duration: "30 min", description: "Tạo mật khẩu ngẫu nhiên an toàn", xp: 50, available: true },
  { id: "file-org", title: "File Organizer", difficulty: "intermediate", duration: "90 min", description: "Tự động sắp xếp files trong thư mục", xp: 150, available: false },
  { id: "scraper", title: "Web Scraper", difficulty: "intermediate", duration: "120 min", description: "Thu thập dữ liệu từ web với BeautifulSoup", xp: 200, available: false },
  { id: "rest-api", title: "REST API", difficulty: "intermediate", duration: "180 min", description: "Xây dựng REST API với Flask", xp: 250, available: false },
  { id: "banking", title: "CLI Banking System", difficulty: "advanced", duration: "240 min", description: "Hệ thống ngân hàng qua command line", xp: 400, available: false },
];

const difficultyColors = {
  beginner: "bg-accent/10 text-accent",
  intermediate: "bg-amber-500/10 text-amber-400",
  advanced: "bg-red-500/10 text-red-400",
};

export default function ProjectsPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-primary mb-1">Projects</h1>
        <p className="text-text-secondary">Áp dụng kiến thức vào các project thực tế</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className={`press card-hover rounded-xl border p-5 ${
              project.available
                ? "border-surface-3 bg-surface-2"
                : "border-surface-3/50 bg-surface-1 opacity-50"
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-text-primary">{project.title}</h3>
                <p className="text-sm text-text-muted mt-0.5">{project.description}</p>
              </div>
              {!project.available && <Lock className="h-4 w-4 text-text-faint" strokeWidth={1.5} />}
            </div>

            <div className="flex items-center gap-3">
              <span className={`rounded px-2 py-0.5 text-xs font-medium ${difficultyColors[project.difficulty as keyof typeof difficultyColors]}`}>
                {project.difficulty}
              </span>
              <span className="flex items-center gap-1 text-xs text-text-muted">
                <Clock className="h-3 w-3" strokeWidth={1.5} />
                {project.duration}
              </span>
              <span className="flex items-center gap-1 text-xs text-amber-400">
                <Star className="h-3 w-3" strokeWidth={1.5} />
                {project.xp} XP
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
