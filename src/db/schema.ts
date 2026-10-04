import { pgTable, pgEnum, uuid, text, integer, boolean, timestamp, jsonb, varchar, serial } from "drizzle-orm/pg-core";

export const difficultyEnum = pgEnum("difficulty", ["beginner", "intermediate", "advanced"]);
export const lessonStatusEnum = pgEnum("lesson_status", ["locked", "available", "in_progress", "completed", "mastered"]);
export const exerciseTypeEnum = pgEnum("exercise_type", [
  "multiple_choice", "predict_output", "fill_code", "debugging",
  "code_challenge", "algorithm_tracing", "drag_drop", "matching",
  "sql_challenge", "project_challenge",
]);

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  avatarUrl: text("avatar_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const courses = pgTable("courses", {
  id: uuid("id").defaultRandom().primaryKey(),
  language: varchar("language", { length: 50 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  icon: varchar("icon", { length: 50 }).notNull(),
  color: varchar("color", { length: 20 }).notNull(),
  level: varchar("level", { length: 50 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const chapters = pgTable("chapters", {
  id: uuid("id").defaultRandom().primaryKey(),
  courseId: uuid("course_id").notNull().references(() => courses.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  order: integer("order").notNull(),
});

export const lessons = pgTable("lessons", {
  id: uuid("id").defaultRandom().primaryKey(),
  chapterId: uuid("chapter_id").notNull().references(() => chapters.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  difficulty: difficultyEnum("difficulty").notNull(),
  duration: integer("duration").notNull(),
  objectives: jsonb("objectives").$type<string[]>().notNull(),
  sections: jsonb("sections").$type<unknown[]>().notNull(),
  codeExample: text("code_example"),
  language: varchar("language", { length: 50 }),
  order: integer("order").notNull(),
});

export const exercises = pgTable("exercises", {
  id: uuid("id").defaultRandom().primaryKey(),
  lessonId: uuid("lesson_id").notNull().references(() => lessons.id, { onDelete: "cascade" }),
  type: exerciseTypeEnum("type").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  difficulty: difficultyEnum("difficulty").notNull(),
  points: integer("points").notNull(),
  code: text("code"),
  language: varchar("language", { length: 50 }),
  options: jsonb("options").$type<string[]>(),
  correctAnswer: jsonb("correct_answer").$type<string | number | string[]>().notNull(),
  hint: text("hint"),
  explanation: text("explanation"),
  testCases: jsonb("test_cases").$type<{ input: string; expectedOutput: string }[]>(),
});

export const algorithms = pgTable("algorithms", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  category: varchar("category", { length: 50 }).notNull(),
  description: text("description").notNull(),
  timeComplexity: jsonb("time_complexity").$type<{ best: string; average: string; worst: string }>().notNull(),
  spaceComplexity: varchar("space_complexity", { length: 50 }).notNull(),
  code: text("code").notNull(),
  language: varchar("language", { length: 50 }).notNull(),
  steps: jsonb("steps").$type<unknown[]>().notNull(),
});

export const careerPaths = pgTable("career_paths", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  icon: varchar("icon", { length: 50 }).notNull(),
  roadmap: jsonb("roadmap").$type<unknown[]>().notNull(),
});

export const userProgress = pgTable("user_progress", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  overallProgress: integer("overall_progress").default(0).notNull(),
  streak: integer("streak").default(0).notNull(),
  xp: integer("xp").default(0).notNull(),
  level: integer("level").default(1).notNull(),
  completedLessons: jsonb("completed_lessons").$type<string[]>().default([]).notNull(),
  solvedExercises: jsonb("solved_exercises").$type<string[]>().default([]).notNull(),
  masteredConcepts: jsonb("mastered_concepts").$type<string[]>().default([]).notNull(),
  projectsCompleted: jsonb("projects_completed").$type<string[]>().default([]).notNull(),
  achievements: jsonb("achievements").$type<string[]>().default([]).notNull(),
  courseProgress: jsonb("course_progress").$type<Record<string, number>>().default({}).notNull(),
  skillProgress: jsonb("skill_progress").$type<Record<string, number>>().default({}).notNull(),
  weakestSkills: jsonb("weakest_skills").$type<{ skill: string; score: number }[]>().default([]).notNull(),
  dailyPlan: jsonb("daily_plan").$type<unknown[]>().default([]).notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const submissions = pgTable("submissions", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  exerciseId: uuid("exercise_id").notNull().references(() => exercises.id, { onDelete: "cascade" }),
  code: text("code").notNull(),
  language: varchar("language", { length: 50 }).notNull(),
  isCorrect: boolean("is_correct").notNull(),
  output: text("output"),
  executionTime: integer("execution_time"),
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
});

export const achievements = pgTable("achievements", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  icon: varchar("icon", { length: 50 }).notNull(),
  condition: varchar("condition", { length: 255 }).notNull(),
  xpReward: integer("xp_reward").notNull(),
});

export const studySessions = pgTable("study_sessions", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  date: timestamp("date").defaultNow().notNull(),
  duration: integer("duration").notNull(),
  lessonsCompleted: integer("lessons_completed").default(0).notNull(),
  exercisesSolved: integer("exercises_solved").default(0).notNull(),
  xpEarned: integer("xp_earned").default(0).notNull(),
});
