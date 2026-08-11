import { Fragment } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Step {
  label: string;
}

/** Horizontal stepper. `current` is the 0-based index of the active step. */
export function Stepper({ steps, current, className }: { steps: Step[]; current: number; className?: string }) {
  return (
    <ol className={cn("flex flex-wrap items-center", className)}>
      {steps.map((step, i) => {
        const state = i < current ? "complete" : i === current ? "current" : "upcoming";
        return (
          <Fragment key={i}>
            <li className="flex items-center gap-2">
              <span
                aria-current={state === "current" ? "step" : undefined}
                className={cn(
                  "grid h-7 w-7 shrink-0 place-items-center rounded-pill text-caption font-semibold",
                  state === "complete" && "bg-action-primary text-action-on-primary",
                  state === "current" && "border-2 border-action-primary text-action-primary",
                  state === "upcoming" && "border border-border-strong text-text-tertiary",
                )}
              >
                {state === "complete" ? <Check className="h-4 w-4" /> : i + 1}
              </span>
              <span className={cn("text-body-sm", state === "upcoming" ? "text-text-tertiary" : "text-text-primary")}>{step.label}</span>
            </li>
            {i < steps.length - 1 && (
              <span className={cn("mx-3 h-px w-8 shrink-0", i < current ? "bg-action-primary" : "bg-border-default")} aria-hidden="true" />
            )}
          </Fragment>
        );
      })}
    </ol>
  );
}
