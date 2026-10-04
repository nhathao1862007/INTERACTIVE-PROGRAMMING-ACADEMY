"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Trophy, Clock, Zap, CheckCircle2, Circle, Flame, Star, ArrowRight } from "lucide-react";

const challenges = [
  {
    id: "dc-1",
    title: "FizzBuzz",
    description: "In các số từ 1 đến 100. Nếu chia hết cho 3 in 'Fizz', chia hết cho 5 in 'Buzz', chia hết cho cả 2 in 'FizzBuzz'.",
    difficulty: "beginner",
    points: 50,
    language: "python",
    starterCode: `for i in range(1, 101):\n    # Your code here\n    pass`,
    completed: false,
  },
  {
    id: "dc-2",
    title: "Reverse String",
    description: "Viết hàm đảo ngược chuỗi không dùng built-in reverse.",
    difficulty: "beginner",
    points: 50,
    language: "python",
    starterCode: `def reverse_string(s):\n    # Your code here\n    pass`,
    completed: true,
  },
  {
    id: "dc-3",
    title: "Two Sum",
    description: "Cho mảng số nguyên và target, trả về index của 2 số có tổng bằng target.",
    difficulty: "intermediate",
    points: 100,
    language: "python",
    starterCode: `def two_sum(nums, target):\n    # Your code here\n    pass`,
    completed: false,
  },
  {
    id: "dc-4",
    title: "Palindrome Check",
    description: "Kiểm tra chuỗi có phải palindrome không (đọc xuôi ngược đều nhau).",
    difficulty: "beginner",
    points: 50,
    language: "python",
    starterCode: `def is_palindrome(s):\n    # Your code here\n    pass`,
    completed: false,
  },
  {
    id: "dc-5",
    title: "Binary Search",
    description: "Implement binary search trên mảng đã sắp xếp.",
    difficulty: "intermediate",
    points: 100,
    language: "python",
    starterCode: `def binary_search(arr, target):\n    # Your code here\n    pass`,
    completed: false,
  },
];

const weeklyChallenge = {
  title: "Build a CLI Expense Tracker",
  description: "Xây dựng ứng dụng quản lý chi tiêu qua command line với Python. Lưu dữ liệu vào file JSON, hỗ trợ thêm/xóa/thống kê.",
  points: 500,
  deadline: "2026-10-07",
  participants: 234,
};

export default function DailyChallengePage() {
  const [selectedChallenge, setSelectedChallenge] = useState(challenges[0]);
  const [code, setCode] = useState(challenges[0].starterCode);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);
  };

  const difficultyColors = {
    beginner: "bg-accent/10 text-accent",
    intermediate: "bg-amber-500/10 text-amber-400",
    advanced: "bg-red-500/10 text-red-400",
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-primary mb-1">Daily Challenge</h1>
        <p className="text-text-secondary">Thử thách hàng ngày — luyện tập và kiếm XP</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {challenges.map((ch) => (
              <button
                key={ch.id}
                onClick={() => {
                  setSelectedChallenge(ch);
                  setCode(ch.starterCode);
                }}
                className={cn(
                  "press shrink-0 rounded-lg px-4 py-2 text-sm transition-colors cursor-pointer",
                  selectedChallenge.id === ch.id
                    ? "bg-accent/10 text-accent"
                    : "text-text-secondary hover:bg-surface-2"
                )}
              >
                {ch.completed && <CheckCircle2 className="inline h-3 w-3 mr-1" strokeWidth={2} />}
                {ch.title}
              </button>
            ))}
          </div>

          <div className="rounded-xl border border-surface-3 bg-surface-1 overflow-hidden">
            <div className="border-b border-surface-3 bg-surface-2 px-5 py-3">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-semibold text-text-primary">{selectedChallenge.title}</h2>
                  <p className="text-sm text-text-muted">{selectedChallenge.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={cn("rounded px-2 py-0.5 text-xs font-medium", difficultyColors[selectedChallenge.difficulty as keyof typeof difficultyColors])}>
                    {selectedChallenge.difficulty}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-amber-400">
                    <Star className="h-3 w-3" strokeWidth={1.5} />
                    {selectedChallenge.points} XP
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                rows={10}
                className="w-full rounded-lg border border-surface-3 bg-surface-0 px-3 py-2 text-sm font-mono text-text-primary placeholder:text-text-muted outline-none focus:border-accent/50 resize-none"
              />
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-text-muted">{selectedChallenge.language}</span>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="press flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-surface-0 hover:bg-accent-dim disabled:opacity-50 cursor-pointer"
                >
                  <Zap className="h-4 w-4" strokeWidth={2} />
                  {isSubmitting ? "Submitting..." : "Submit Solution"}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="h-5 w-5 text-amber-400" strokeWidth={1.5} />
              <h3 className="font-semibold text-text-primary">Weekly Challenge</h3>
            </div>
            <h4 className="font-medium text-text-primary mb-1">{weeklyChallenge.title}</h4>
            <p className="text-sm text-text-secondary mb-3">{weeklyChallenge.description}</p>
            <div className="flex items-center gap-3 text-xs text-text-muted">
              <span className="flex items-center gap-1">
                <Star className="h-3 w-3 text-amber-400" strokeWidth={1.5} />
                {weeklyChallenge.points} XP
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" strokeWidth={1.5} />
                {weeklyChallenge.deadline}
              </span>
              <span>{weeklyChallenge.participants} participants</span>
            </div>
            <button className="press mt-3 flex items-center gap-1 text-sm text-accent hover:text-accent-dim cursor-pointer">
              Start Challenge <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>

          <div className="rounded-xl border border-surface-3 bg-surface-1 p-4">
            <div className="flex items-center gap-2 mb-3">
              <Flame className="h-5 w-5 text-orange-400" strokeWidth={1.5} />
              <h3 className="font-semibold text-text-primary">Streak</h3>
            </div>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 7 }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-8 rounded flex items-center justify-center text-xs",
                    i < 5 ? "bg-accent/20 text-accent" : "bg-surface-2 text-text-faint"
                  )}
                >
                  {i < 5 ? <CheckCircle2 className="h-4 w-4" strokeWidth={1.5} /> : <Circle className="h-4 w-4" strokeWidth={1.5} />}
                </div>
              ))}
            </div>
            <p className="mt-2 text-xs text-text-muted">5/7 days — Keep going!</p>
          </div>

          <div className="rounded-xl border border-surface-3 bg-surface-1 p-4">
            <h3 className="font-semibold text-text-primary mb-3">Leaderboard</h3>
            <div className="space-y-2">
              {[
                { rank: 1, name: "Minh", xp: 3200 },
                { rank: 2, name: "Hàu", xp: 2450 },
                { rank: 3, name: "Linh", xp: 2100 },
                { rank: 4, name: "Nam", xp: 1800 },
                { rank: 5, name: "An", xp: 1500 },
              ].map((user) => (
                <div key={user.rank} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold",
                      user.rank === 1 ? "bg-amber-500/20 text-amber-400" :
                      user.rank === 2 ? "bg-zinc-400/20 text-zinc-300" :
                      user.rank === 3 ? "bg-orange-500/20 text-orange-400" :
                      "bg-surface-2 text-text-muted"
                    )}>
                      {user.rank}
                    </span>
                    <span className="text-sm text-text-primary">{user.name}</span>
                  </div>
                  <span className="text-xs text-text-muted tabular-nums">{user.xp} XP</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
