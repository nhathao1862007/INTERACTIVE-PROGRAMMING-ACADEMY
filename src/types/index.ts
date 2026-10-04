export type Difficulty = "beginner" | "intermediate" | "advanced";

export type LessonStatus = "locked" | "available" | "in_progress" | "completed" | "mastered";

export type ExerciseType =
  | "multiple_choice"
  | "predict_output"
  | "fill_code"
  | "debugging"
  | "code_challenge"
  | "algorithm_tracing"
  | "drag_drop"
  | "matching"
  | "sql_challenge"
  | "project_challenge";

export interface Section {
  id: string;
  type: "concept" | "syntax" | "example" | "playground" | "visualization" | "quiz" | "exercise" | "challenge" | "summary";
  title: string;
  content: string;
  code?: string;
  language?: string;
}

export interface Exercise {
  id: string;
  type: ExerciseType;
  title: string;
  description: string;
  difficulty: Difficulty;
  points: number;
  code?: string;
  language?: string;
  options?: string[];
  correctAnswer: string | number | string[];
  hint?: string;
  explanation?: string;
  testCases?: { input: string; expectedOutput: string }[];
}

export interface Lesson {
  id: string;
  chapterId: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  duration: number;
  objectives: string[];
  sections: Section[];
  exercises: Exercise[];
  codeExample?: string;
  language?: string;
}

export interface Chapter {
  id: string;
  courseId: string;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  language: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  level: string;
  chapters: Chapter[];
}

export interface AlgorithmStep {
  array: number[];
  comparing?: number[];
  swapping?: number[];
  swapped?: number[];
  sorted?: number[];
  pivot?: number;
  target?: number;
  found?: number;
  lineHighlight: number;
  description: string;
  variables: Record<string, number | string>;
}

export interface Algorithm {
  id: string;
  name: string;
  category: "sorting" | "searching" | "graph" | "dp" | "greedy";
  description: string;
  timeComplexity: { best: string; average: string; worst: string };
  spaceComplexity: string;
  code: string;
  language: string;
  steps: AlgorithmStep[];
}

export interface CareerPath {
  id: string;
  title: string;
  description: string;
  icon: string;
  roadmap: RoadmapNode[];
}

export interface RoadmapNode {
  id: string;
  title: string;
  description: string;
  level: "beginner" | "intermediate" | "advanced";
  prerequisites: string[];
  skills: string[];
  lessons: string[];
  exercises: string[];
  projects: string[];
  status: LessonStatus;
}

export interface UserProgress {
  userId: string;
  overallProgress: number;
  streak: number;
  xp: number;
  level: number;
  completedLessons: string[];
  solvedExercises: string[];
  masteredConcepts: string[];
  projectsCompleted: string[];
  achievements: string[];
  courseProgress: Record<string, number>;
  skillProgress: Record<string, number>;
  weakestSkills: { skill: string; score: number }[];
  dailyPlan: DailyPlanItem[];
}

export interface DailyPlanItem {
  id: string;
  type: "lesson" | "exercise" | "review" | "challenge";
  title: string;
  duration: number;
  completed: boolean;
  courseId?: string;
  lessonId?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  condition: string;
  xpReward: number;
}
