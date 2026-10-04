"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Network, ChevronRight } from "lucide-react";

interface ConceptNode {
  id: string;
  label: string;
  x: number;
  y: number;
  color: string;
  description: string;
}

interface ConceptEdge {
  from: string;
  to: string;
}

const concepts: ConceptNode[] = [
  { id: "variable", label: "Variable", x: 400, y: 50, color: "#10b981", description: "Biến lưu trữ dữ liệu trong bộ nhớ" },
  { id: "memory", label: "Memory", x: 200, y: 150, color: "#3b82f6", description: "Bộ nhớ RAM — nơi lưu trữ dữ liệu" },
  { id: "pointer", label: "Pointer", x: 600, y: 150, color: "#8b5cf6", description: "Con trỏ lưu địa chỉ bộ nhớ" },
  { id: "reference", label: "Reference", x: 400, y: 250, color: "#f59e0b", description: "Tham chiếu đến biến khác" },
  { id: "array", label: "Array", x: 150, y: 350, color: "#ef4444", description: "Mảng — tập hợp cùng kiểu dữ liệu" },
  { id: "linkedlist", label: "Linked List", x: 350, y: 350, color: "#ec4899", description: "Danh sách liên kết — nodes nối nhau" },
  { id: "tree", label: "Tree", x: 550, y: 350, color: "#14b8a6", description: "Cây — cấu trúc phân cấp" },
  { id: "graph", label: "Graph", x: 750, y: 350, color: "#f97316", description: "Đồ thị — nodes và edges" },
  { id: "algorithm", label: "Algorithm", x: 300, y: 480, color: "#6366f1", description: "Thuật toán — giải thuật giải quyết vấn đề" },
  { id: "complexity", label: "Big-O", x: 550, y: 480, color: "#84cc16", description: "Độ phức tạp — đo lường hiệu năng" },
];

const edges: ConceptEdge[] = [
  { from: "variable", to: "memory" },
  { from: "variable", to: "pointer" },
  { from: "pointer", to: "reference" },
  { from: "memory", to: "array" },
  { from: "memory", to: "linkedlist" },
  { from: "linkedlist", to: "tree" },
  { from: "tree", to: "graph" },
  { from: "array", to: "algorithm" },
  { from: "tree", to: "algorithm" },
  { from: "algorithm", to: "complexity" },
];

export default function ConceptGraphPage() {
  const [selectedConcept, setSelectedConcept] = useState<ConceptNode | null>(null);
  const [hoveredConcept, setHoveredConcept] = useState<string | null>(null);

  const getNode = (id: string) => concepts.find((c) => c.id === id);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary mb-1 flex items-center gap-2">
          <Network className="h-6 w-6 text-accent" strokeWidth={1.5} />
          Concept Graph
        </h1>
        <p className="text-text-secondary">Khám phá mối quan hệ giữa các khái niệm lập trình</p>
      </div>

      <div className="rounded-xl border border-surface-3 bg-surface-1 overflow-hidden">
        <div className="border-b border-surface-3 bg-surface-2 px-5 py-3">
          <p className="text-sm text-text-secondary">Click vào node để xem chi tiết</p>
        </div>

        <div className="relative h-[500px] bg-surface-0 overflow-hidden">
          <svg className="absolute inset-0 w-full h-full">
            {edges.map((edge, idx) => {
              const from = getNode(edge.from);
              const to = getNode(edge.to);
              if (!from || !to) return null;

              const isHighlighted = hoveredConcept === edge.from || hoveredConcept === edge.to;

              return (
                <line
                  key={idx}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke={isHighlighted ? "#10b981" : "#3f3f46"}
                  strokeWidth={isHighlighted ? 2 : 1}
                  strokeDasharray={isHighlighted ? "0" : "4 4"}
                  className="transition-all duration-300"
                />
              );
            })}
          </svg>

          {concepts.map((concept) => (
            <button
              key={concept.id}
              onClick={() => setSelectedConcept(concept)}
              onMouseEnter={() => setHoveredConcept(concept.id)}
              onMouseLeave={() => setHoveredConcept(null)}
              className={cn(
                "press absolute transform -translate-x-1/2 -translate-y-1/2 rounded-xl border px-4 py-2 text-sm font-medium transition-all cursor-pointer",
                selectedConcept?.id === concept.id
                  ? "border-accent bg-accent/20 text-accent scale-110"
                  : hoveredConcept === concept.id
                  ? "border-surface-4 bg-surface-3 text-text-primary"
                  : "border-surface-3 bg-surface-2 text-text-secondary"
              )}
              style={{ left: concept.x, top: concept.y }}
            >
              {concept.label}
            </button>
          ))}
        </div>

        {selectedConcept && (
          <div className="border-t border-surface-3 bg-surface-2 p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: selectedConcept.color }} />
              <h3 className="font-semibold text-text-primary">{selectedConcept.label}</h3>
            </div>
            <p className="text-sm text-text-secondary">{selectedConcept.description}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {edges
                .filter((e) => e.from === selectedConcept.id || e.to === selectedConcept.id)
                .map((e, idx) => {
                  const otherId = e.from === selectedConcept.id ? e.to : e.from;
                  const other = getNode(otherId);
                  return (
                    <button
                      key={idx}
                      onClick={() => other && setSelectedConcept(other)}
                      className="press flex items-center gap-1 rounded-lg bg-surface-3 px-2.5 py-1 text-xs text-text-secondary hover:text-text-primary cursor-pointer"
                    >
                      <ChevronRight className="h-3 w-3" strokeWidth={1.5} />
                      {other?.label}
                    </button>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
