import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code, language } = body as { code: string; language: string };

    if (!code || !language) {
      return NextResponse.json(
        { error: "Missing code or language" },
        { status: 400 }
      );
    }

    const startTime = Date.now();

    if (language === "python") {
      const output = executePython(code);
      const executionTime = Date.now() - startTime;

      return NextResponse.json({
        output,
        executionTime,
        language,
      });
    }

    return NextResponse.json(
      { error: `Language ${language} not yet supported` },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Execution failed" },
      { status: 500 }
    );
  }
}

function executePython(code: string): string {
  const lines = code.split("\n");
  const output: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("print(")) {
      const match = trimmed.match(/print\((.+)\)/);
      if (match) {
        let content = match[1];
        if (content.startsWith('f"') || content.startsWith("f'")) {
          content = content.slice(2, -1);
          content = content.replace(/\{([^}]+)\}/g, (_, expr: string) => {
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
              return String(eval(expr));
            } catch {
              return expr;
            }
          });
        } else {
          content = content.replace(/^["']|["']$/g, "");
        }
        output.push(content);
      }
    }
  }

  return output.join("\n") || "(No output)";
}

function factorial(n: number): number {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}
