import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type RadioProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

/** Accessible radio: a real <input> (appearance-none) with a token-styled ring + inner dot. */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(({ className, ...props }, ref) => (
  <span className="relative inline-grid place-items-center">
    <input
      ref={ref}
      type="radio"
      className={cn(
        "focus-ring peer h-5 w-5 shrink-0 cursor-pointer appearance-none rounded-pill border-[1.5px] border-border-strong bg-background-surface transition-colors",
        "checked:border-action-primary",
        "disabled:cursor-not-allowed disabled:opacity-40",
        className,
      )}
      {...props}
    />
    <span className="pointer-events-none absolute h-2 w-2 rounded-pill bg-action-primary opacity-0 peer-checked:opacity-100" />
  </span>
));
Radio.displayName = "Radio";
