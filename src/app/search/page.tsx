"use client";

import { useState, useMemo } from "react";
import { pythonCourse } from "@/content/python-course";
import { cppCourse } from "@/content/cpp-course";
import { sqlCourse } from "@/content/sql-course";
import { algorithms } from "@/content/algorithms";
import { careerPaths } from "@/content/career-paths";
import { Search, BookOpen, Zap, Code2, Map, ArrowRight } from "lucide-react";
import Link from "next/link";

interface SearchResult {
  type: "lesson" | "algorithm" | "concept" | "exercise" | "project" | "roadmap";
  title: string;
  description: string;
  href: string;
  icon: React.ElementType;
}

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const results = useMemo((): SearchResult[] => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    const all: SearchResult[] = [];

    for (const course of [pythonCourse, cppCourse, sqlCourse]) {
      for (const chapter of course.chapters) {
        for (const lesson of chapter.lessons) {
          if (lesson.title.toLowerCase().includes(q) || lesson.description.toLowerCase().includes(q)) {
            all.push({
              type: "lesson",
              title: lesson.title,
              description: `${course.title} — ${chapter.title}`,
              href: `/courses/${course.id}/lessons/${lesson.id}`,
              icon: BookOpen,
            });
          }
          for (const ex of lesson.exercises) {
            if (ex.title.toLowerCase().includes(q) || ex.description.toLowerCase().includes(q)) {
              all.push({
                type: "exercise",
                title: ex.title,
                description: lesson.title,
                href: `/courses/${course.id}/lessons/${lesson.id}`,
                icon: Code2,
              });
            }
          }
        }
      }
    }

    for (const algo of algorithms) {
      if (algo.name.toLowerCase().includes(q) || algo.description.toLowerCase().includes(q)) {
        all.push({
          type: "algorithm",
          title: algo.name,
          description: algo.description,
          href: "/algorithms",
          icon: Zap,
        });
      }
    }

    for (const path of careerPaths) {
      if (path.title.toLowerCase().includes(q)) {
        all.push({
          type: "roadmap",
          title: path.title,
          description: path.description,
          href: `/roadmap?path=${path.id}`,
          icon: Map,
        });
      }
    }

    const concepts = ["Variable", "Function", "Loop", "Array", "Pointer", "Recursion", "OOP", "SQL", "Algorithm", "Data Structure"];
    for (const concept of concepts) {
      if (concept.toLowerCase().includes(q)) {
        all.push({
          type: "concept",
          title: concept,
          description: "Programming concept",
          href: "/concept-graph",
          icon: Code2,
        });
      }
    }

    return all.slice(0, 20);
  }, [query]);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-primary mb-1 flex items-center gap-2">
          <Search className="h-6 w-6 text-accent" strokeWidth={1.5} />
          Search
        </h1>
        <p className="text-text-secondary">Tìm kiếm lessons, algorithms, concepts, exercises</p>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-text-muted" strokeWidth={1.5} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search: recursion, bubble sort, SQL..."
          className="w-full rounded-xl border border-surface-3 bg-surface-1 py-3 pl-12 pr-4 text-text-primary placeholder:text-text-muted outline-none transition-colors focus:border-accent/50 focus:ring-1 focus:ring-accent/20"
          autoFocus
        />
      </div>

      {query && (
        <div className="space-y-2">
          <p className="text-sm text-text-muted mb-4">
            {results.length} results for &quot;{query}&quot;
          </p>
          {results.map((result, idx) => (
            <Link
              key={idx}
              href={result.href}
              className="press card-hover flex items-center gap-3 rounded-xl border border-surface-3 bg-surface-1 p-4 cursor-pointer"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-2">
                <result.icon className="h-5 w-5 text-accent" strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-text-primary">{result.title}</h3>
                <p className="text-sm text-text-muted">{result.description}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-text-faint" strokeWidth={1.5} />
            </Link>
          ))}
          {results.length === 0 && (
            <div className="text-center py-12">
              <p className="text-text-muted">No results found</p>
              <p className="text-sm text-text-faint mt-1">Try different keywords</p>
            </div>
          )}
        </div>
      )}

      {!query && (
        <div className="space-y-4">
          <h2 className="text-sm font-medium text-text-muted uppercase tracking-wider">Popular searches</h2>
          <div className="flex flex-wrap gap-2">
            {["recursion", "bubble sort", "SQL JOIN", "pointer", "OOP", "binary search", "function", "loop"].map((term) => (
              <button
                key={term}
                onClick={() => setQuery(term)}
                className="press rounded-lg border border-surface-3 px-3 py-1.5 text-sm text-text-secondary hover:bg-surface-2 cursor-pointer"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
