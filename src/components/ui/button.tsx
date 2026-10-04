/**
 * @module components/ui/button
 * Core button — 6 variants, 4 sizes. Interruptible CSS transitions plus an
 * optical press scale. Focus ring is always visible for keyboard users.
 */
"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-control",
    "font-medium tracking-tight outline-none",
    "transition-[transform,background-color,color,box-shadow,border-color] duration-150 ease-signature",
    "focus-visible:ring-2 focus-visible:ring-phosphor/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-0",
    "disabled:pointer-events-none disabled:opacity-45",
    "active:not-disabled:scale-[0.96] motion-reduce:active:scale-100",
  ].join(" "),
  {
    variants: {
      variant: {
        primary: "bg-phosphor text-ink-0 shadow-e2 hover:bg-phosphor-dim",
        secondary: "bg-ink-3 text-text-strong hover:bg-ink-4",
        outline:
          "ring-edge bg-transparent text-text-body hover:bg-ink-2 hover:text-text-strong",
        ghost: "text-text-body hover:bg-ink-2 hover:text-text-strong",
        danger: "bg-danger text-white hover:opacity-90",
        link: "text-phosphor underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-[15px]",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
);
Button.displayName = "Button";

export { buttonVariants };
