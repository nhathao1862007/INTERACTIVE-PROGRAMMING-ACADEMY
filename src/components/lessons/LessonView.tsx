"use client";

import { useState } from "react";
import { Lesson, Exercise } from "@/types";
import { BookOpen, Code2, HelpCircle, Lightbulb, AlertTriangle, CheckCircle2, ChevronRight, ChevronLeft, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

interface Props {
  lesson: Lesson;
  chapterTitle: string;
  courseId: string;
}

const sectionIcons: Record<string, React.ElementType> = {
  concept: BookOpen,
  syntax: Code2,
  example: Lightbulb,
  playground: Play,
  visualization: Code2,
  quiz: HelpCircle,
  exercise: HelpCircle,
  challenge: AlertTriangle,
  summary: CheckCircle2,
};

export function LessonView({ lesson, chapterTitle }: Props) {
  const [currentSection, setCurrentSection] = useState(0);
  const [completedSections, setCompletedSections] = useState<Set<number>>(new Set());
  const [showQuiz, setShowQuiz] = useState(false);

  const section = lesson.sections[currentSection];
  const progress = Math.round((completedSections.size / lesson.sections.length) * 100);

  const markComplete = () => {
    setCompletedSections((prev) => new Set([...prev, currentSection]));
    if (currentSection < lesson.sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  return (
    <div className="flex h-[calc(100vh-3.5rem)]">
      <div className="w-64 border-r border-surface-3/50 bg-surface-1 overflow-y-auto">
        <div className="p-4 border-b border-surface-3/50">
          <p className="text-xs text-text-muted mb-1">{chapterTitle}</p>
          <h2 className="text-sm font-semibold text-text-primary">{lesson.title}</h2>
          <div className="mt-2 h-1 rounded-full bg-surface-3 overflow-hidden">
            <div className="h-full rounded-full bg-accent transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <nav className="p-2">
          {lesson.sections.map((s, idx) => {
            const Icon = sectionIcons[s.type] || BookOpen;
            const isCompleted = completedSections.has(idx);
            const isCurrent = currentSection === idx;

            return (
              <button
                key={s.id}
                onClick={() => setCurrentSection(idx)}
                className={cn(
                  "press w-full flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors mb-0.5 cursor-pointer",
                  isCurrent
                    ? "bg-accent/10 text-accent"
                    : "text-text-secondary hover:bg-surface-2"
                )}
              >
                {isCompleted ? (
                  <CheckCircle2 className="h-4 w-4 text-accent shrink-0" strokeWidth={1.5} />
                ) : (
                  <Icon className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                )}
                <span className="truncate">{s.title}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto p-8">
          <div className="mb-6">
            <h1 className="text-xl font-bold text-text-primary mb-1">{section.title}</h1>
            <p className="text-sm text-text-muted">{section.content}</p>
          </div>

          {section.code && (
            <div className="rounded-xl border border-surface-3 overflow-hidden mb-6">
              <div className="flex items-center justify-between border-b border-surface-3 bg-surface-2 px-4 py-2">
                <span className="text-xs font-medium text-text-secondary">
                  {section.language || "python"}
                </span>
              </div>
              <div className="bg-surface-0">
                <MonacoEditor
                  height="200px"
                  language={section.language || "python"}
                  theme="vs-dark"
                  value={section.code}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 13,
                    readOnly: true,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                  }}
                />
              </div>
            </div>
          )}

          {section.type === "playground" && section.code && (
            <div className="rounded-xl border border-surface-3 overflow-hidden mb-6">
              <div className="flex items-center justify-between border-b border-surface-3 bg-surface-2 px-4 py-2">
                <span className="text-xs font-medium text-text-secondary">Interactive Playground</span>
                <button className="press rounded bg-accent px-2 py-0.5 text-xs font-medium text-surface-0 cursor-pointer">
                  Run
                </button>
              </div>
              <div className="bg-surface-0">
                <MonacoEditor
                  height="150px"
                  language={section.language || "python"}
                  theme="vs-dark"
                  value={section.code}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 13,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                  }}
                />
              </div>
            </div>
          )}

          {showQuiz && lesson.exercises.length > 0 && (
            <QuizSection exercise={lesson.exercises[0]} onClose={() => setShowQuiz(false)} />
          )}

          <div className="flex items-center justify-between mt-8 pt-6 border-t border-surface-3">
            <button
              onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
              disabled={currentSection === 0}
              className="press flex items-center gap-1 rounded-lg border border-surface-3 px-4 py-2 text-sm text-text-secondary hover:bg-surface-2 disabled:opacity-30 cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
              Previous
            </button>

            {currentSection < lesson.sections.length - 1 ? (
              <button
                onClick={markComplete}
                className="press flex items-center gap-1 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-surface-0 hover:bg-accent-dim transition-colors cursor-pointer"
              >
                Complete & Continue
                <ChevronRight className="h-4 w-4" strokeWidth={2} />
              </button>
            ) : (
              <button
                onClick={() => setShowQuiz(true)}
                className="press flex items-center gap-1 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-surface-0 hover:bg-accent-dim transition-colors cursor-pointer"
              >
                Take Quiz
                <ChevronRight className="h-4 w-4" strokeWidth={2} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function QuizSection({ exercise, onClose }: { exercise: Exercise; onClose: () => void }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const isCorrect = selected === exercise.correctAnswer;

  return (
    <div className="rounded-xl border border-surface-3 bg-surface-2 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-text-primary">{exercise.title}</h3>
        <button onClick={onClose} className="text-xs text-text-muted hover:text-text-secondary cursor-pointer">
          Close
        </button>
      </div>

      <p className="text-sm text-text-secondary mb-4">{exercise.description}</p>

      {exercise.code && (
        <pre className="rounded-lg bg-surface-0 p-3 font-mono text-sm text-text-secondary mb-4 overflow-x-auto">
          {exercise.code}
        </pre>
      )}

      <div className="space-y-2">
        {exercise.options?.map((option, idx) => (
          <button
            key={idx}
            onClick={() => { setSelected(idx); setShowResult(true); }}
            className={cn(
              "press w-full rounded-lg border p-3 text-left text-sm transition-colors cursor-pointer",
              showResult && idx === exercise.correctAnswer
                ? "border-accent/50 bg-accent/10 text-accent"
                : showResult && idx === selected && !isCorrect
                ? "border-red-500/50 bg-red-500/10 text-red-400"
                : selected === idx
                ? "border-accent/50 bg-accent/5"
                : "border-surface-3 hover:border-surface-4 text-text-primary"
            )}
          >
            <span className="font-mono text-xs text-text-muted mr-2">
              {String.fromCharCode(65 + idx)}.
            </span>
            {option}
          </button>
        ))}
      </div>

      {showResult && (
        <div className={cn(
          "mt-4 rounded-lg p-3 text-sm",
          isCorrect ? "bg-accent/10 text-accent" : "bg-amber-500/10 text-amber-400"
        )}>
          <p className="font-medium">{isCorrect ? "Correct!" : "Not quite right."}</p>
          {exercise.explanation && <p className="mt-1 text-text-secondary">{exercise.explanation}</p>}
        </div>
      )}
    </div>
  );
}
