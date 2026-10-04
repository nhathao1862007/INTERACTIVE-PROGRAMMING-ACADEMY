"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Play, Pause, RotateCcw, Plus, Trash2, Search } from "lucide-react";

type DataStructure = "array" | "linkedlist" | "stack" | "queue";

const dsConfig = {
  array: { name: "Array", icon: "📦", description: "Mảng tĩnh — truy cập O(1) theo index" },
  linkedlist: { name: "Linked List", icon: "🔗", description: "Danh sách liên kết — chèn/xóa O(1)" },
  stack: { name: "Stack", icon: "📚", description: "LIFO — Last In First Out" },
  queue: { name: "Queue", icon: "🎫", description: "FIFO — First In First Out" },
};

export default function DataStructuresPage() {
  const [selectedDS, setSelectedDS] = useState<DataStructure>("array");
  const [array, setArray] = useState<number[]>([10, 25, 30, 15, 20]);
  const [linkedList, setLinkedList] = useState<number[]>([10, 20, 30]);
  const [stack, setStack] = useState<number[]>([10, 20, 30]);
  const [queue, setQueue] = useState<number[]>([10, 20, 30]);
  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const addToArray = () => {
    const val = parseInt(inputValue);
    if (!isNaN(val)) {
      setArray([...array, val]);
      setInputValue("");
    }
  };

  const removeFromArray = (index: number) => {
    setArray(array.filter((_, i) => i !== index));
  };

  const pushStack = () => {
    const val = parseInt(inputValue);
    if (!isNaN(val)) {
      setStack([...stack, val]);
      setInputValue("");
    }
  };

  const popStack = () => {
    if (stack.length > 0) {
      setStack(stack.slice(0, -1));
    }
  };

  const enqueue = () => {
    const val = parseInt(inputValue);
    if (!isNaN(val)) {
      setQueue([...queue, val]);
      setInputValue("");
    }
  };

  const dequeue = () => {
    if (queue.length > 0) {
      setQueue(queue.slice(1));
    }
  };

  const search = () => {
    const val = parseInt(searchValue);
    const idx = array.indexOf(val);
    setSearchResult(idx >= 0 ? idx : null);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary mb-1">Data Structures Visualizer</h1>
        <p className="text-text-secondary">Trực quan hóa cấu trúc dữ liệu với animation</p>
      </div>

      <div className="flex gap-2 mb-6">
        {(Object.keys(dsConfig) as DataStructure[]).map((ds) => (
          <button
            key={ds}
            onClick={() => setSelectedDS(ds)}
            className={cn(
              "press rounded-lg px-4 py-2 text-sm transition-colors cursor-pointer",
              selectedDS === ds
                ? "bg-accent/10 text-accent"
                : "text-text-secondary hover:bg-surface-2"
            )}
          >
            {dsConfig[ds].icon} {dsConfig[ds].name}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-surface-3 bg-surface-1 overflow-hidden">
        <div className="border-b border-surface-3 bg-surface-2 px-5 py-3">
          <h2 className="font-semibold text-text-primary">{dsConfig[selectedDS].icon} {dsConfig[selectedDS].name}</h2>
          <p className="text-sm text-text-muted">{dsConfig[selectedDS].description}</p>
        </div>

        <div className="p-6">
          {selectedDS === "array" && (
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Nhập giá trị..."
                  className="rounded-lg border border-surface-3 bg-surface-0 px-3 py-2 text-sm text-text-primary outline-none focus:border-accent/50"
                />
                <button onClick={addToArray} className="press flex items-center gap-1 rounded-lg bg-accent px-3 py-2 text-sm text-surface-0 cursor-pointer">
                  <Plus className="h-4 w-4" /> Add
                </button>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Tìm kiếm..."
                  className="rounded-lg border border-surface-3 bg-surface-0 px-3 py-2 text-sm text-text-primary outline-none focus:border-accent/50"
                />
                <button onClick={search} className="press flex items-center gap-1 rounded-lg border border-surface-3 px-3 py-2 text-sm text-text-secondary cursor-pointer">
                  <Search className="h-4 w-4" /> Search
                </button>
                {searchResult !== null && (
                  <span className="text-sm text-accent">Found at index {searchResult}</span>
                )}
              </div>

              <div className="flex items-end gap-2 min-h-[120px] p-4 rounded-lg bg-surface-0">
                {array.map((val, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-1">
                    <span className="text-xs text-text-muted">{idx}</span>
                    <div
                      className={cn(
                        "w-12 h-12 rounded-lg border flex items-center justify-center text-sm font-mono transition-all",
                        searchResult === idx
                          ? "border-accent bg-accent/20 text-accent"
                          : "border-surface-3 bg-surface-2 text-text-primary"
                      )}
                    >
                      {val}
                    </div>
                    <button
                      onClick={() => removeFromArray(idx)}
                      className="press text-text-faint hover:text-red-400 cursor-pointer"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                {array.length === 0 && (
                  <p className="text-text-muted text-sm">Mảng trống — thêm phần tử để bắt đầu</p>
                )}
              </div>
            </div>
          )}

          {selectedDS === "linkedlist" && (
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Nhập giá trị..."
                  className="rounded-lg border border-surface-3 bg-surface-0 px-3 py-2 text-sm text-text-primary outline-none focus:border-accent/50"
                />
                <button
                  onClick={() => {
                    const val = parseInt(inputValue);
                    if (!isNaN(val)) {
                      setLinkedList([...linkedList, val]);
                      setInputValue("");
                    }
                  }}
                  className="press flex items-center gap-1 rounded-lg bg-accent px-3 py-2 text-sm text-surface-0 cursor-pointer"
                >
                  <Plus className="h-4 w-4" /> Append
                </button>
                <button
                  onClick={() => setLinkedList(linkedList.slice(0, -1))}
                  className="press flex items-center gap-1 rounded-lg border border-surface-3 px-3 py-2 text-sm text-text-secondary cursor-pointer"
                >
                  <Trash2 className="h-4 w-4" /> Remove
                </button>
              </div>

              <div className="flex items-center gap-0 min-h-[120px] p-4 rounded-lg bg-surface-0 overflow-x-auto">
                {linkedList.map((val, idx) => (
                  <div key={idx} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-lg border border-surface-3 bg-surface-2 flex items-center justify-center text-sm font-mono text-text-primary">
                        {val}
                      </div>
                      <span className="text-[10px] text-text-faint mt-1">{idx}</span>
                    </div>
                    {idx < linkedList.length - 1 && (
                      <div className="flex items-center mx-1">
                        <div className="w-8 h-0.5 bg-surface-4" />
                        <div className="w-0 h-0 border-t-4 border-b-4 border-l-8 border-t-transparent border-b-transparent border-l-surface-4" />
                      </div>
                    )}
                  </div>
                ))}
                {linkedList.length > 0 && (
                  <div className="flex items-center mx-1">
                    <div className="w-8 h-0.5 bg-surface-4" />
                    <span className="text-xs text-text-faint">NULL</span>
                  </div>
                )}
                {linkedList.length === 0 && (
                  <p className="text-text-muted text-sm">Danh sách trống</p>
                )}
              </div>
            </div>
          )}

          {selectedDS === "stack" && (
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Nhập giá trị..."
                  className="rounded-lg border border-surface-3 bg-surface-0 px-3 py-2 text-sm text-text-primary outline-none focus:border-accent/50"
                />
                <button onClick={pushStack} className="press flex items-center gap-1 rounded-lg bg-accent px-3 py-2 text-sm text-surface-0 cursor-pointer">
                  <Plus className="h-4 w-4" /> Push
                </button>
                <button onClick={popStack} className="press flex items-center gap-1 rounded-lg border border-surface-3 px-3 py-2 text-sm text-text-secondary cursor-pointer">
                  <Trash2 className="h-4 w-4" /> Pop
                </button>
              </div>

              <div className="flex flex-col-reverse items-center gap-1 min-h-[200px] p-4 rounded-lg bg-surface-0">
                {stack.map((val, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "w-24 h-10 rounded-lg border flex items-center justify-center text-sm font-mono transition-all",
                      idx === stack.length - 1
                        ? "border-accent bg-accent/20 text-accent"
                        : "border-surface-3 bg-surface-2 text-text-primary"
                    )}
                  >
                    {val}
                    {idx === stack.length - 1 && (
                      <span className="ml-2 text-[10px] text-accent">TOP</span>
                    )}
                  </div>
                ))}
                {stack.length === 0 && (
                  <p className="text-text-muted text-sm">Stack trống</p>
                )}
              </div>
            </div>
          )}

          {selectedDS === "queue" && (
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Nhập giá trị..."
                  className="rounded-lg border border-surface-3 bg-surface-0 px-3 py-2 text-sm text-text-primary outline-none focus:border-accent/50"
                />
                <button onClick={enqueue} className="press flex items-center gap-1 rounded-lg bg-accent px-3 py-2 text-sm text-surface-0 cursor-pointer">
                  <Plus className="h-4 w-4" /> Enqueue
                </button>
                <button onClick={dequeue} className="press flex items-center gap-1 rounded-lg border border-surface-3 px-3 py-2 text-sm text-text-secondary cursor-pointer">
                  <Trash2 className="h-4 w-4" /> Dequeue
                </button>
              </div>

              <div className="flex items-center gap-1 min-h-[120px] p-4 rounded-lg bg-surface-0 overflow-x-auto">
                <span className="text-xs text-text-muted mr-2">FRONT</span>
                {queue.map((val, idx) => (
                  <div key={idx} className="flex items-center">
                    <div
                      className={cn(
                        "w-12 h-12 rounded-lg border flex items-center justify-center text-sm font-mono transition-all",
                        idx === 0
                          ? "border-accent bg-accent/20 text-accent"
                          : idx === queue.length - 1
                          ? "border-amber-500/50 bg-amber-500/10 text-amber-400"
                          : "border-surface-3 bg-surface-2 text-text-primary"
                      )}
                    >
                      {val}
                    </div>
                    {idx < queue.length - 1 && (
                      <div className="w-4 h-0.5 bg-surface-4" />
                    )}
                  </div>
                ))}
                <span className="text-xs text-text-muted ml-2">REAR</span>
                {queue.length === 0 && (
                  <p className="text-text-muted text-sm">Queue trống</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
