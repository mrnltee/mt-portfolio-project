import { forwardRef } from "react";
import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Consumes @mt/tokens semantic/component tokens (bg-action-primary, text-action-on-primary,
 * bg-background-surface, border-border-default, rounded-control, h-control-*) — theme- and
 * brand-aware via the --mt-* CSS variables.
 */
export const buttonVariants = cva(
  "focus-ring inline-flex items-center justify-center gap-2 rounded-control font-display font-semibold transition-colors duration-normal ease-standard disabled:pointer-events-none disabled:opacity-40",
  {
    variants: {
      variant: {
        primary: "bg-action-primary text-action-on-primary hover:bg-action-primary-hover",
        secondary: "border border-border-default bg-background-surface text-text-primary hover:bg-background-surface-subtle",
        ghost: "text-text-primary hover:bg-background-surface-subtle",
        link: "text-action-primary underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        sm: "h-control-sm px-3.5 text-body-sm",
        md: "h-control-md px-5 text-body",
        lg: "h-control-lg px-6 text-body-lg",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  )
);
Button.displayName = "Button";

interface ButtonLinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof buttonVariants> {}

export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ className, variant, size, ...props }, ref) => (
    <a ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  )
);
ButtonLink.displayName = "ButtonLink";
