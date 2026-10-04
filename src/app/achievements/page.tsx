"use client";

import { Trophy, Lock, Star } from "lucide-react";

const achievements = [
  { id: "a1", icon: "🏆", title: "First Algorithm", description: "Solved your first algorithm", xp: 50, earned: true, date: "2026-09-15" },
  { id: "a2", icon: "🔥", title: "7 Day Streak", description: "Studied 7 days in a row", xp: 100, earned: true, date: "2026-09-20" },
  { id: "a3", icon: "🔍", title: "Debugging Detective", description: "Fixed 10 bugs", xp: 75, earned: true, date: "2026-09-22" },
  { id: "a4", icon: "💯", title: "100 Problems Solved", description: "Solved 100 exercises", xp: 200, earned: false, progress: 87 },
  { id: "a5", icon: "🐍", title: "Python Master", description: "Completed Python course", xp: 500, earned: false, progress: 42 },
  { id: "a6", icon: "📚", title: "Bookworm", description: "Read 50 lessons", xp: 150, earned: false, progress: 24 },
  { id: "a7", icon: "⚡", title: "Speed Runner", description: "Solved 10 exercises in one day", xp: 100, earned: false, progress: 7 },
  { id: "a8", icon: "🎯", title: "Perfect Score", description: "Got 100% on a quiz", xp: 75, earned: false, progress: 0 },
  { id: "a9", icon: "🌟", title: "Data Structure Explorer", description: "Completed all data structure lessons", xp: 300, earned: false, progress: 0 },
  { id: "a10", icon: "🚀", title: "First Project", description: "Completed your first project", xp: 250, earned: false, progress: 0 },
];

export default function AchievementsPage() {
  const earned = achievements.filter((a) => a.earned);

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-primary mb-1">Achievements</h1>
        <p className="text-text-secondary">Mở khóa achievements bằng cách học tập</p>
      </div>

      <div className="mb-8 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Trophy className="h-6 w-6 text-amber-400" strokeWidth={1.5} />
            <div>
              <p className="font-medium text-text-primary">{earned.length} / {achievements.length} Achievements Earned</p>
              <p className="text-sm text-text-muted">Keep learning to unlock more!</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-amber-400 tabular-nums">{earned.reduce((sum, a) => sum + a.xp, 0)}</p>
            <p className="text-xs text-text-muted">XP Earned</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {achievements.map((a) => (
          <div
            key={a.id}
            className={`rounded-xl border p-4 ${
              a.earned
                ? "border-amber-500/30 bg-amber-500/5"
                : "border-surface-3 bg-surface-1"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">{a.icon}</span>
              <div className="flex-1">
                <h3 className={`font-medium ${a.earned ? "text-text-primary" : "text-text-secondary"}`}>
                  {a.title}
                </h3>
                <p className="text-sm text-text-muted">{a.description}</p>
                {a.earned && a.date && (
                  <p className="text-xs text-text-faint mt-1">Earned: {a.date}</p>
                )}
                {!a.earned && a.progress !== undefined && (
                  <div className="mt-2">
                    <div className="h-1.5 rounded-full bg-surface-3 overflow-hidden">
                      <div className="h-full rounded-full bg-amber-500 transition-all duration-500" style={{ width: `${a.progress}%` }} />
                    </div>
                    <p className="text-[10px] text-text-faint mt-0.5 tabular-nums">{a.progress}% complete</p>
                  </div>
                )}
              </div>
              <div className="text-right">
                <span className="flex items-center gap-1 text-xs text-amber-400">
                  <Star className="h-3 w-3" strokeWidth={1.5} />
                  {a.xp}
                </span>
                {!a.earned && <Lock className="h-3 w-3 text-text-faint ml-auto mt-1" strokeWidth={1.5} />}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
