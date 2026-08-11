import type { HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const badgeVariants = cva("inline-flex items-center gap-1 rounded-pill px-2 py-0.5 text-caption font-medium", {
  variants: {
    variant: {
      neutral: "bg-background-surface-subtle text-text-secondary",
      accent: "bg-action-accent-subtle text-action-on-accent-subtle",
      success: "bg-feedback-success-surface text-feedback-on-success",
      warning: "bg-feedback-warning-surface text-feedback-on-warning",
      error: "bg-feedback-error-surface text-feedback-on-error",
    },
  },
  defaultVariants: { variant: "neutral" },
});

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

/** Small status label (distinct from Tag, which is an uppercase category chip). */
export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
