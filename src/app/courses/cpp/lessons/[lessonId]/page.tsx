"use client";

import { useParams } from "next/navigation";
import { cppCourse } from "@/content/cpp-course";
import { LessonView } from "@/components/lessons/LessonView";
import { notFound } from "next/navigation";

export default function CppLessonPage() {
  const params = useParams();
  const lessonId = params.lessonId as string;

  const lesson = cppCourse.chapters
    .flatMap((ch) => ch.lessons)
    .find((l) => l.id === lessonId);

  if (!lesson) notFound();

  const chapter = cppCourse.chapters.find((ch) => ch.id === lesson.chapterId);

  return <LessonView lesson={lesson} chapterTitle={chapter?.title ?? ""} courseId="cpp" />;
}
