import type { ButtonHTMLAttributes, HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/** Consumes @mt/tokens: bg-background-surface-subtle, bg-action-accent-subtle / text-action-on-accent-subtle
 *  (the accent pair resolves to an AA-safe value per theme — no per-component dark: override needed). */
export const tagVariants = cva(
  "inline-flex items-center gap-1.5 rounded-pill text-overline uppercase transition-colors duration-normal",
  {
    variants: {
      variant: {
        neutral: "bg-background-surface-subtle text-text-secondary",
        accent: "bg-action-accent-subtle text-action-on-accent-subtle",
      },
      size: {
        sm: "px-2.5 py-1",
        md: "px-3 py-1.5",
      },
    },
    defaultVariants: { variant: "neutral", size: "sm" },
  }
);

interface TagProps extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof tagVariants> {}

export function Tag({ className, variant, size, ...props }: TagProps) {
  return <span className={cn(tagVariants({ variant, size }), className)} {...props} />;
}

interface FilterTagProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

/** Interactive variant used by the home page project filter — same visual family as Tag, with pressed/active state. */
export function FilterTag({ active, className, ...props }: FilterTagProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={cn(
        tagVariants({ variant: active ? "accent" : "neutral", size: "md" }),
        "focus-ring normal-case tracking-normal hover:bg-background-surface-subtle",
        active && "hover:bg-action-accent-subtle",
        className
      )}
      {...props}
    />
  );
}
