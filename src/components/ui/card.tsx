/**
 * @module components/ui/card
 * Layered surface primitive. Elevation comes from layered shadows; a hairline
 * ring (not a heavy border) communicates structure.
 */
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva("relative", {
  variants: {
    elevation: {
      flat: "bg-ink-1 ring-edge",
      raised: "bg-ink-1 ring-edge shadow-e2",
      floating: "bg-ink-2 ring-edge shadow-e3",
      glow: "bg-ink-1 ring-edge shadow-glow",
    },
    radius: {
      card: "rounded-card",
      control: "rounded-control",
      none: "",
    },
    padding: {
      none: "",
      sm: "p-3",
      md: "p-5",
      lg: "p-7",
    },
  },
  defaultVariants: { elevation: "raised", radius: "card", padding: "md" },
});

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

export function Card({ className, elevation, radius, padding, ...props }: CardProps) {
  return (
    <div
      className={cn(cardVariants({ elevation, radius, padding }), className)}
      {...props}
    />
  );
}

export { cardVariants };
