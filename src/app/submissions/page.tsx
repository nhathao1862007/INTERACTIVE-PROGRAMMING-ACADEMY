"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle, Clock, Code2, Send } from "lucide-react";

interface Submission {
  id: string;
  projectTitle: string;
  language: string;
  status: "pending" | "passed" | "failed";
  submittedAt: string;
  score?: number;
  feedback?: string;
}

const mockSubmissions: Submission[] = [
  { id: "sub-1", projectTitle: "Calculator", language: "Python", status: "passed", submittedAt: "2026-09-28", score: 95, feedback: "Excellent code structure and error handling!" },
  { id: "sub-2", projectTitle: "Number Guessing Game", language: "Python", status: "passed", submittedAt: "2026-09-30", score: 88, feedback: "Good job! Consider adding input validation." },
  { id: "sub-3", projectTitle: "To-do CLI", language: "Python", status: "failed", submittedAt: "2026-10-01", feedback: "Missing delete functionality. Please complete all requirements." },
  { id: "sub-4", projectTitle: "Password Generator", language: "Python", status: "pending", submittedAt: "2026-10-03" },
];

export default function SubmissionsPage() {
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [code, setCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!code.trim()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setCode("");
    }, 2000);
  };

  const statusConfig = {
    passed: { icon: CheckCircle2, color: "text-accent", bg: "bg-accent/10", label: "Passed" },
    failed: { icon: XCircle, color: "text-red-400", bg: "bg-red-500/10", label: "Failed" },
    pending: { icon: Clock, color: "text-amber-400", bg: "bg-amber-500/10", label: "Pending" },
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-primary mb-1">Project Submissions</h1>
        <p className="text-text-secondary">Nộp bài và xem kết quả grading</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="font-semibold text-text-primary">Submit Project</h2>
          <div className="rounded-xl border border-surface-3 bg-surface-1 p-4">
            <div className="mb-3">
              <label className="block text-sm text-text-secondary mb-1.5">Project</label>
              <select className="w-full rounded-lg border border-surface-3 bg-surface-0 px-3 py-2 text-sm text-text-primary outline-none focus:border-accent/50">
                <option>Calculator</option>
                <option>Number Guessing Game</option>
                <option>To-do CLI</option>
                <option>Password Generator</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="block text-sm text-text-secondary mb-1.5">Language</label>
              <select className="w-full rounded-lg border border-surface-3 bg-surface-0 px-3 py-2 text-sm text-text-primary outline-none focus:border-accent/50">
                <option>Python</option>
                <option>C++</option>
                <option>JavaScript</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="block text-sm text-text-secondary mb-1.5">Code</label>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Paste your code here..."
                rows={8}
                className="w-full rounded-lg border border-surface-3 bg-surface-0 px-3 py-2 text-sm font-mono text-text-primary placeholder:text-text-muted outline-none focus:border-accent/50 resize-none"
              />
            </div>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !code.trim()}
              className="press flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-surface-0 hover:bg-accent-dim disabled:opacity-50 cursor-pointer"
            >
              <Send className="h-4 w-4" strokeWidth={2} />
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="font-semibold text-text-primary">Submission History</h2>
          <div className="space-y-3">
            {mockSubmissions.map((sub) => {
              const config = statusConfig[sub.status];
              const StatusIcon = config.icon;
              return (
                <button
                  key={sub.id}
                  onClick={() => setSelectedSubmission(sub)}
                  className={cn(
                    "press card-hover w-full rounded-xl border p-4 text-left cursor-pointer",
                    selectedSubmission?.id === sub.id
                      ? "border-accent/50 bg-accent/5"
                      : "border-surface-3 bg-surface-1"
                  )}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-text-primary">{sub.projectTitle}</h3>
                    <span className={cn("flex items-center gap-1 rounded px-2 py-0.5 text-xs font-medium", config.bg, config.color)}>
                      <StatusIcon className="h-3 w-3" strokeWidth={2} />
                      {config.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-text-muted">
                    <span className="flex items-center gap-1">
                      <Code2 className="h-3 w-3" strokeWidth={1.5} />
                      {sub.language}
                    </span>
                    <span>{sub.submittedAt}</span>
                    {sub.score && <span className="text-accent tabular-nums">{sub.score}/100</span>}
                  </div>
                </button>
              );
            })}
          </div>

          {selectedSubmission && (
            <div className="rounded-xl border border-surface-3 bg-surface-1 p-4">
              <h3 className="font-medium text-text-primary mb-2">Feedback</h3>
              <p className="text-sm text-text-secondary">{selectedSubmission.feedback || "No feedback yet"}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
