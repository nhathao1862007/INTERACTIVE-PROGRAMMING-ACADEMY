/**
 * @module components/ui/sheet
 * Accessible slide-over drawer used for the mobile navigation.
 * Uses an interruptible transform transition (never a keyframe).
 */
"use client";

import * as React from "react";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

interface SheetProps {
  open: boolean;
  onClose: () => void;
  side?: "left" | "right";
  label: string;
  children: React.ReactNode;
  className?: string;
}

export function Sheet({
  open,
  onClose,
  side = "left",
  label,
  children,
  className,
}: SheetProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open, onClose]);

  return (
    <div
      className="fixed inset-0 z-50 lg:hidden"
      inert={!open}
      aria-hidden={!open}
    >
      <button
        type="button"
        tabIndex={-1}
        aria-label="Đóng menu"
        onClick={onClose}
        className={cn(
          "absolute inset-0 cursor-default bg-ink-0/70 backdrop-blur-sm transition-opacity duration-200 ease-signature",
          open ? "opacity-100" : "opacity-0"
        )}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={label}
        className={cn(
          "absolute top-0 h-full w-[17.5rem] max-w-[85vw] overflow-y-auto bg-ink-1 shadow-e4",
          "transition-transform duration-300 ease-signature",
          side === "left" ? "left-0" : "right-0",
          open
            ? "translate-x-0"
            : side === "left"
              ? "-translate-x-full"
              : "translate-x-full",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}
