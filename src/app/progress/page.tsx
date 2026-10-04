"use client";

import { BarChart3, Flame, Trophy, Target, Star } from "lucide-react";

const courseProgress = [
  { name: "Python", progress: 92, color: "bg-blue-500" },
  { name: "C++", progress: 61, color: "bg-purple-500" },
  { name: "Algorithms", progress: 52, color: "bg-accent" },
  { name: "Data Structures", progress: 65, color: "bg-amber-500" },
];

const skills = [
  { name: "Variables & Data Types", score: 90 },
  { name: "Control Flow", score: 85 },
  { name: "Functions", score: 78 },
  { name: "OOP", score: 65 },
  { name: "Recursion", score: 42 },
  { name: "Pointers", score: 55 },
  { name: "Big-O", score: 61 },
];

const achievements = [
  { icon: "🏆", title: "First Algorithm", desc: "Solved your first algorithm", earned: true },
  { icon: "🔥", title: "7 Day Streak", desc: "Studied 7 days in a row", earned: true },
  { icon: "💯", title: "100 Problems", desc: "Solved 100 exercises", earned: false },
  { icon: "🐍", title: "Python Master", desc: "Completed Python course", earned: false },
  { icon: "🔍", title: "Debugging Detective", desc: "Fixed 10 bugs", earned: true },
  { icon: "📚", title: "Bookworm", desc: "Read 50 lessons", earned: false },
];

export default function ProgressPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-primary mb-1">Progress Dashboard</h1>
        <p className="text-text-secondary">Theo dõi tiến độ học tập của bạn</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { icon: BarChart3, label: "Overall Progress", value: "78%", color: "text-accent" },
          { icon: Flame, label: "Current Streak", value: "7 days", color: "text-orange-400" },
          { icon: Star, label: "Total XP", value: "2,450", color: "text-amber-400" },
          { icon: Trophy, label: "Level", value: "5", color: "text-purple-400" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border border-surface-3 bg-surface-2 p-4">
            <stat.icon className={`h-5 w-5 ${stat.color} mb-2`} strokeWidth={1.5} />
            <p className="text-2xl font-bold text-text-primary tabular-nums">{stat.value}</p>
            <p className="text-xs text-text-muted">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="rounded-xl border border-surface-3 bg-surface-1 p-5">
          <h2 className="font-semibold text-text-primary mb-4">Course Progress</h2>
          <div className="space-y-4">
            {courseProgress.map((course) => (
              <div key={course.name}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-text-secondary">{course.name}</span>
                  <span className="text-xs text-text-muted tabular-nums">{course.progress}%</span>
                </div>
                <div className="h-2 rounded-full bg-surface-3 overflow-hidden">
                  <div className={`h-full rounded-full ${course.color} transition-all duration-500`} style={{ width: `${course.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-surface-3 bg-surface-1 p-5">
          <h2 className="font-semibold text-text-primary mb-4">Skill Mastery</h2>
          <div className="space-y-3">
            {skills.map((skill) => (
              <div key={skill.name} className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">{skill.name}</span>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-24 rounded-full bg-surface-3 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        skill.score >= 80 ? "bg-accent" : skill.score >= 60 ? "bg-amber-500" : "bg-red-500"
                      }`}
                      style={{ width: `${skill.score}%` }}
                    />
                  </div>
                  <span className="text-xs text-text-muted w-8 tabular-nums">{skill.score}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-surface-3 bg-surface-1 p-5 mb-8">
        <h2 className="font-semibold text-text-primary mb-4">Weakest Skills — Recommended Review</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {skills
            .filter((s) => s.score < 70)
            .map((skill) => (
              <div key={skill.name} className="rounded-lg border border-red-500/20 bg-red-500/5 p-3">
                <p className="text-sm font-medium text-red-400">{skill.name}</p>
                <p className="text-xs text-text-muted mt-1">Mastery: {skill.score}%</p>
                <button className="press mt-2 text-xs text-accent hover:text-accent-dim cursor-pointer">
                  Review now →
                </button>
              </div>
            ))}
        </div>
      </div>

      <div className="rounded-xl border border-surface-3 bg-surface-1 p-5">
        <h2 className="font-semibold text-text-primary mb-4">Achievements</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {achievements.map((a) => (
            <div
              key={a.title}
              className={`rounded-lg border p-3 text-center ${
                a.earned ? "border-amber-500/30 bg-amber-500/5" : "border-surface-3 opacity-40"
              }`}
            >
              <span className="text-2xl">{a.icon}</span>
              <p className="text-xs font-medium text-text-primary mt-1">{a.title}</p>
              <p className="text-[10px] text-text-muted">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
