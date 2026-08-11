import type { HTMLAttributes, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const bannerVariants = cva("flex flex-wrap items-center gap-3 px-4 py-3 text-body-sm", {
  variants: {
    variant: {
      neutral: "bg-background-surface-subtle text-text-primary",
      info: "bg-feedback-info-surface text-feedback-on-info",
      warning: "bg-feedback-warning-surface text-feedback-on-warning",
    },
  },
  defaultVariants: { variant: "neutral" },
});

export interface BannerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof bannerVariants> {
  action?: ReactNode;
}

/** Full-width contextual banner (page/section level), optionally with a trailing action. */
export function Banner({ className, variant, action, children, ...props }: BannerProps) {
  return (
    <div className={cn(bannerVariants({ variant }), className)} {...props}>
      <div className="min-w-0 flex-1">{children}</div>
      {action}
    </div>
  );
}
