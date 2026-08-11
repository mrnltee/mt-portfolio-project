import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

/** Accessible checkbox: a real <input> (appearance-none) with a token-styled box + check glyph. */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({ className, ...props }, ref) => (
  <span className="relative inline-grid place-items-center">
    <input
      ref={ref}
      type="checkbox"
      className={cn(
        "focus-ring peer h-5 w-5 shrink-0 cursor-pointer appearance-none rounded-control border-[1.5px] border-border-strong bg-background-surface transition-colors",
        "checked:border-action-primary checked:bg-action-primary",
        "disabled:cursor-not-allowed disabled:opacity-40",
        className,
      )}
      {...props}
    />
    <Check
      aria-hidden="true"
      strokeWidth={3}
      className="pointer-events-none absolute h-3.5 w-3.5 text-action-on-primary opacity-0 peer-checked:opacity-100"
    />
  </span>
));
Checkbox.displayName = "Checkbox";
