import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const iconButtonVariants = cva(
  "focus-ring inline-flex items-center justify-center rounded-control transition-colors disabled:pointer-events-none disabled:opacity-40",
  {
    variants: {
      variant: {
        ghost: "text-text-secondary hover:bg-background-surface-subtle hover:text-text-primary",
        secondary:
          "border border-border-default bg-background-surface text-text-primary hover:bg-background-surface-subtle",
        primary: "bg-action-primary text-action-on-primary hover:bg-action-primary-hover",
      },
      size: { sm: "h-8 w-8", md: "h-10 w-10", lg: "h-11 w-11" },
    },
    defaultVariants: { variant: "ghost", size: "md" },
  },
);

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  /** Icon-only buttons must be labeled for assistive tech. */
  "aria-label": string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size, type = "button", ...props }, ref) => (
    <button ref={ref} type={type} className={cn(iconButtonVariants({ variant, size }), className)} {...props} />
  ),
);
IconButton.displayName = "IconButton";
