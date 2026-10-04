"use client";

import { useSearchParams } from "next/navigation";
import { careerPaths } from "@/content/career-paths";
import { Lock, CheckCircle2, Circle, PlayCircle, ChevronDown, ChevronUp } from "lucide-react";
import { useState, Suspense } from "react";
import { cn } from "@/lib/utils";

const statusConfig = {
  locked: { icon: Lock, color: "text-text-faint" },
  available: { icon: Circle, color: "text-accent" },
  in_progress: { icon: PlayCircle, color: "text-blue-400" },
  completed: { icon: CheckCircle2, color: "text-accent" },
  mastered: { icon: CheckCircle2, color: "text-amber-400" },
};

const levelColors = {
  beginner: "border-accent/30 bg-accent/5",
  intermediate: "border-blue-500/30 bg-blue-500/5",
  advanced: "border-purple-500/30 bg-purple-500/5",
};

function RoadmapContent() {
  const searchParams = useSearchParams();
  const pathId = searchParams.get("path") || "software-engineer";
  const careerPath = careerPaths.find((p) => p.id === pathId) ?? careerPaths[0];
  const [expandedNode, setExpandedNode] = useState<string | null>(null);

  const levels = ["beginner", "intermediate", "advanced"] as const;

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-primary mb-1">
          {careerPath.icon} {careerPath.title} Roadmap
        </h1>
        <p className="text-text-secondary">{careerPath.description}</p>
      </div>

      <div className="space-y-8">
        {levels.map((level) => {
          const nodes = careerPath.roadmap.filter((n) => n.level === level);
          if (nodes.length === 0) return null;

          return (
            <div key={level}>
              <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-text-muted mb-4">
                {level}
              </h2>
              <div className="space-y-3">
                {nodes.map((node) => {
                  const config = statusConfig[node.status];
                  const StatusIcon = config.icon;
                  const isExpanded = expandedNode === node.id;

                  return (
                    <div
                      key={node.id}
                      className={cn(
                        "rounded-xl border p-4 transition-all",
                        levelColors[level],
                        node.status === "locked" && "opacity-50"
                      )}
                    >
                      <button
                        onClick={() => setExpandedNode(isExpanded ? null : node.id)}
                        className="w-full flex items-center justify-between cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <StatusIcon className={cn("h-5 w-5", config.color)} strokeWidth={1.5} />
                          <div className="text-left">
                            <h3 className="font-medium text-text-primary">{node.title}</h3>
                            <p className="text-sm text-text-muted">{node.description}</p>
                          </div>
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4 text-text-muted" strokeWidth={1.5} />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-text-muted" strokeWidth={1.5} />
                        )}
                      </button>

                      {isExpanded && (
                        <div className="mt-4 ml-8 space-y-3">
                          {node.skills.length > 0 && (
                            <div>
                              <p className="text-xs font-medium text-text-muted mb-2">Skills</p>
                              <div className="flex flex-wrap gap-2">
                                {node.skills.map((skill) => (
                                  <span
                                    key={skill}
                                    className="rounded-md bg-surface-3 px-2.5 py-1 text-xs text-text-secondary"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          {node.lessons.length > 0 && (
                            <div>
                              <p className="text-xs font-medium text-text-muted mb-2">Lessons</p>
                              <div className="space-y-1">
                                {node.lessons.map((lesson) => (
                                  <p key={lesson} className="text-sm text-text-secondary">
                                    → {lesson}
                                  </p>
                                ))}
                              </div>
                            </div>
                          )}
                          {node.prerequisites.length > 0 && (
                            <div>
                              <p className="text-xs font-medium text-text-muted mb-2">Prerequisites</p>
                              <div className="flex flex-wrap gap-2">
                                {node.prerequisites.map((pre) => (
                                  <span
                                    key={pre}
                                    className="rounded-md bg-surface-3/50 px-2.5 py-1 text-xs text-text-muted"
                                  >
                                    {careerPath.roadmap.find((n) => n.id === pre)?.title ?? pre}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function RoadmapPage() {
  return (
    <Suspense fallback={<div className="p-8 text-text-muted">Loading roadmap...</div>}>
      <RoadmapContent />
    </Suspense>
  );
}
