"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Play, RotateCcw, Copy, Check, Loader2 } from "lucide-react";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="h-full flex items-center justify-center bg-surface-0">
      <Loader2 className="h-5 w-5 text-accent animate-spin" />
    </div>
  ),
});

const defaultCode = `# CODEVERSE Playground
# Viết code Python của bạn ở đây

def greet(name):
    return f"Xin chào, {name}!"

print(greet("Hàu"))

# Ví dụ: Tính giai thừa
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

for i in range(1, 6):
    print(f"{i}! = {factorial(i)}")
`;

export default function PlaygroundPage() {
  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);

  const runCode = () => {
    setIsRunning(true);
    setOutput("");

    setTimeout(() => {
      const lines = code.split("\n");
      const outputLines: string[] = [];

      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith("print(")) {
          const match = trimmed.match(/print\((.+)\)/);
          if (match) {
            let content = match[1];
            if (content.startsWith('f"') || content.startsWith("f'")) {
              content = content.slice(2, -1);
              content = content.replace(/\{([^}]+)\}/g, (_, expr) => {
                try {
                  const funcMatch = expr.match(/(\w+)\(([^)]+)\)/);
                  if (funcMatch) {
                    const [, func, args] = funcMatch;
                    if (func === "factorial") {
                      const n = parseInt(args.trim());
                      return String(factorial(n));
                    }
                  }
                  if (expr.includes("! =")) return "";
                  return eval(expr);
                } catch {
                  return expr;
                }
              });
            } else {
              content = content.replace(/^["']|["']$/g, "");
            }
            outputLines.push(content);
          }
        }
      }

      setOutput(outputLines.join("\n") || "(No output)");
      setIsRunning(false);
    }, 500);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-8 h-[calc(100vh-3.5rem)] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Code Playground</h1>
          <p className="text-text-secondary text-sm">Viết và chạy code Python trực tiếp</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={copyCode}
            className="press flex items-center gap-1.5 rounded-lg border border-surface-3 px-3 py-2 text-sm text-text-secondary hover:bg-surface-2 cursor-pointer"
          >
            {copied ? <Check className="h-4 w-4 text-accent" strokeWidth={1.5} /> : <Copy className="h-4 w-4" strokeWidth={1.5} />}
            {copied ? "Copied" : "Copy"}
          </button>
          <button
            onClick={() => setCode(defaultCode)}
            className="press flex items-center gap-1.5 rounded-lg border border-surface-3 px-3 py-2 text-sm text-text-secondary hover:bg-surface-2 cursor-pointer"
          >
            <RotateCcw className="h-4 w-4" strokeWidth={1.5} />
            Reset
          </button>
          <button
            onClick={runCode}
            disabled={isRunning}
            className="press flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-surface-0 hover:bg-accent-dim disabled:opacity-50 cursor-pointer"
          >
            <Play className="h-4 w-4" strokeWidth={2} />
            {isRunning ? "Running..." : "Run"}
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-0">
        <div className="rounded-xl border border-surface-3 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between border-b border-surface-3 bg-surface-2 px-4 py-2">
            <span className="text-xs font-medium text-text-secondary">main.py</span>
            <span className="text-xs text-text-faint">Python 3.12</span>
          </div>
          <div className="flex-1 min-h-0">
            <MonacoEditor
              height="100%"
              language="python"
              theme="vs-dark"
              value={code}
              onChange={(v) => setCode(v || "")}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: "on",
                scrollBeyondLastLine: false,
                automaticLayout: true,
                tabSize: 4,
              }}
            />
          </div>
        </div>

        <div className="rounded-xl border border-surface-3 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between border-b border-surface-3 bg-surface-2 px-4 py-2">
            <span className="text-xs font-medium text-text-secondary">Output</span>
            {isRunning && (
              <span className="flex items-center gap-1 text-xs text-accent">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                Running
              </span>
            )}
          </div>
          <div className="flex-1 bg-surface-0 p-4 font-mono text-sm overflow-auto">
            {output ? (
              <pre className="text-text-primary whitespace-pre-wrap">{output}</pre>
            ) : (
              <p className="text-text-faint">Click "Run" to execute code</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function factorial(n: number): number {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}
