"use client";

import { useParams } from "next/navigation";
import { sqlCourse } from "@/content/sql-course";
import { LessonView } from "@/components/lessons/LessonView";
import { notFound } from "next/navigation";

export default function SqlLessonPage() {
  const params = useParams();
  const lessonId = params.lessonId as string;

  const lesson = sqlCourse.chapters
    .flatMap((ch) => ch.lessons)
    .find((l) => l.id === lessonId);

  if (!lesson) notFound();

  const chapter = sqlCourse.chapters.find((ch) => ch.id === lesson.chapterId);

  return <LessonView lesson={lesson} chapterTitle={chapter?.title ?? ""} courseId="sql" />;
}
