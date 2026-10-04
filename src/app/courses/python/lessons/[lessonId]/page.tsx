"use client";

import { useParams } from "next/navigation";
import { pythonCourse } from "@/content/python-course";
import { LessonView } from "@/components/lessons/LessonView";
import { notFound } from "next/navigation";

export default function LessonPage() {
  const params = useParams();
  const lessonId = params.lessonId as string;

  const lesson = pythonCourse.chapters
    .flatMap((ch) => ch.lessons)
    .find((l) => l.id === lessonId);

  if (!lesson) notFound();

  const chapter = pythonCourse.chapters.find((ch) => ch.id === lesson.chapterId);

  return <LessonView lesson={lesson} chapterTitle={chapter?.title ?? ""} courseId="python" />;
}
