import { forwardRef } from "react";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/** Consumes @mt/tokens: bg-background-surface, border-border-default, rounded-card, shadow-raised. */
export const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-card border border-border-default bg-background-surface shadow-raised transition-shadow duration-normal",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

export function CardBody({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6", className)} {...props} />;
}
