import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type SwitchProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "role">;

/**
 * Toggle switch: a real checkbox (appearance-none) styled as a track; the thumb
 * is a ::after pseudo-element that slides on `:checked`. Reflects disabled/focus.
 */
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    type="checkbox"
    role="switch"
    className={cn(
      "focus-ring relative h-6 w-11 shrink-0 cursor-pointer appearance-none rounded-pill border border-border-strong bg-border-strong transition-colors",
      "checked:border-action-primary checked:bg-action-primary",
      "disabled:cursor-not-allowed disabled:opacity-40",
      // thumb
      "after:absolute after:left-0.5 after:top-1/2 after:h-5 after:w-5 after:-translate-y-1/2 after:rounded-pill after:bg-background-surface after:shadow-raised after:transition-transform after:content-['']",
      "checked:after:translate-x-5",
      className,
    )}
    {...props}
  />
));
Switch.displayName = "Switch";
