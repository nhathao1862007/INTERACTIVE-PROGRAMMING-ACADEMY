"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowLeftRight, Copy, Check } from "lucide-react";

const comparisons = [
  {
    id: "variables",
    title: "Variables",
    python: `x = 10\nname = "Hàu"\nis_valid = True`,
    cpp: `int x = 10;\nstring name = "Hàu";\nbool is_valid = true;`,
    javascript: `let x = 10;\nconst name = "Hàu";\nconst isValid = true;`,
    sql: `-- SQL không có biến trong query\n-- Dùng CTE hoặc biến tại application`,
  },
  {
    id: "loops",
    title: "Loops",
    python: `for i in range(10):\n    print(i)\n\nfor item in items:\n    print(item)`,
    cpp: `for (int i = 0; i < 10; i++) {\n    cout << i << endl;\n}\n\nfor (auto& item : items) {\n    cout << item << endl;\n}`,
    javascript: `for (let i = 0; i < 10; i++) {\n    console.log(i);\n}\n\nfor (const item of items) {\n    console.log(item);\n}`,
    sql: `-- Dùng recursive CTE\nWITH RECURSIVE seq AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM seq WHERE n < 10\n)\nSELECT n FROM seq;`,
  },
  {
    id: "functions",
    title: "Functions",
    python: `def add(a, b):\n    return a + b\n\ndef greet(name):\n    return f"Xin chào, {name}!"`,
    cpp: `int add(int a, int b) {\n    return a + b;\n}\n\nstring greet(string name) {\n    return "Xin chào, " + name + "!";\n}`,
    javascript: `function add(a, b) {\n  return a + b;\n}\n\nconst greet = (name) => "Xin chào, " + name + "!";`,
    sql: `CREATE FUNCTION add(a INT, b INT)\nRETURNS INT AS $$\n  SELECT a + b;\n$$ LANGUAGE SQL;`,
  },
  {
    id: "arrays",
    title: "Arrays/Lists",
    python: `arr = [1, 2, 3, 4, 5]\narr.append(6)\narr[0]  # 1\nlen(arr)  # 6`,
    cpp: `int arr[] = {1, 2, 3, 4, 5};\nvector<int> vec = {1, 2, 3};\nvec.push_back(6);\nvec[0];  // 1\nvec.size();  // 4`,
    javascript: `const arr = [1, 2, 3, 4, 5];\narr.push(6);\narr[0];  // 1\narr.length;  // 6`,
    sql: `-- Không có array truyền thống\n-- Dùng bảng hoặc array type (PostgreSQL)\nSELECT ARRAY[1, 2, 3, 4, 5];`,
  },
  {
    id: "oop",
    title: "OOP",
    python: `class Animal:\n    def __init__(self, name):\n        self.name = name\n\n    def speak(self):\n        return "..."`,
    cpp: `class Animal {\nprivate:\n    string name;\npublic:\n    Animal(string n) : name(n) {}\n    virtual string speak() { return "..."; }\n};`,
    javascript: `class Animal {\n  constructor(name) {\n    this.name = name;\n  }\n  speak() {\n    return "...";\n  }\n}`,
    sql: `-- SQL không hỗ trợ OOP truyền thống\n-- Mô hình quan hệ thay thế`,
  },
  {
    id: "error",
    title: "Error Handling",
    python: `try:\n    result = 10 / 0\nexcept ZeroDivisionError as e:\n    print(f"Lỗi: {e}")\nfinally:\n    print("Done")`,
    cpp: `try {\n    int result = 10 / 0;\n} catch (const exception& e) {\n    cout << "Lỗi: " << e.what() << endl;\n}`,
    javascript: `try {\n  const result = 10 / 0;\n} catch (e) {\n  console.log("Lỗi:", e.message);\n} finally {\n  console.log("Done");\n}`,
    sql: `BEGIN;\n  -- operations\nEXCEPTION WHEN OTHERS THEN\n  ROLLBACK;\n  RAISE NOTICE 'Lỗi: %', SQLERRM;\nEND;`,
  },
];

export default function ComparePage() {
  const [selectedComparison, setSelectedComparison] = useState(comparisons[0]);
  const [copiedLang, setCopiedLang] = useState<string | null>(null);

  const copyCode = (code: string, lang: string) => {
    navigator.clipboard.writeText(code);
    setCopiedLang(lang);
    setTimeout(() => setCopiedLang(null), 2000);
  };

  const languages = [
    { key: "python", label: "Python", color: "#3776AB" },
    { key: "cpp", label: "C++", color: "#00599C" },
    { key: "javascript", label: "JavaScript", color: "#F7DF1E" },
    { key: "sql", label: "SQL", color: "#CC2927" },
  ] as const;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary mb-1 flex items-center gap-2">
          <ArrowLeftRight className="h-6 w-6 text-accent" strokeWidth={1.5} />
          Cross-Language Comparison
        </h1>
        <p className="text-text-secondary">So sánh syntax giữa Python, C++, JavaScript và SQL</p>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {comparisons.map((comp) => (
          <button
            key={comp.id}
            onClick={() => setSelectedComparison(comp)}
            className={cn(
              "press shrink-0 rounded-lg px-4 py-2 text-sm transition-colors cursor-pointer",
              selectedComparison.id === comp.id
                ? "bg-accent/10 text-accent"
                : "text-text-secondary hover:bg-surface-2"
            )}
          >
            {comp.title}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {languages.map((lang) => {
          const code = selectedComparison[lang.key as keyof typeof selectedComparison] as string;
          return (
            <div key={lang.key} className="rounded-xl border border-surface-3 bg-surface-1 overflow-hidden">
              <div className="flex items-center justify-between border-b border-surface-3 bg-surface-2 px-4 py-2">
                <span className="text-sm font-medium" style={{ color: lang.color }}>
                  {lang.label}
                </span>
                <button
                  onClick={() => copyCode(code, lang.key)}
                  className="press text-text-muted hover:text-text-secondary cursor-pointer"
                >
                  {copiedLang === lang.key ? (
                    <Check className="h-4 w-4 text-accent" strokeWidth={1.5} />
                  ) : (
                    <Copy className="h-4 w-4" strokeWidth={1.5} />
                  )}
                </button>
              </div>
              <pre className="p-4 text-xs font-mono text-text-secondary overflow-x-auto whitespace-pre-wrap">
                {code}
              </pre>
            </div>
          );
        })}
      </div>
    </div>
  );
}
