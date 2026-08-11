import { useId } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Label } from "./input";

export interface FormFieldChildProps {
  id: string;
  "aria-invalid"?: true;
  "aria-describedby"?: string;
}

/**
 * Wrapper that wires a label + hint + error + required marker to a control and
 * manages the a11y ids. The control is a render prop so it receives the right
 * `id` / `aria-invalid` / `aria-describedby`.
 */
export function FormField({
  label,
  hint,
  error,
  required,
  className,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: (props: FormFieldChildProps) => ReactNode;
}) {
  const id = useId();
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={cn("flex flex-col", className)}>
      <Label htmlFor={id}>
        {label}
        {required && (
          <span className="text-feedback-error" aria-hidden="true">
            {" *"}
          </span>
        )}
      </Label>
      {hint && !error && (
        <p id={hintId} className="mb-1.5 text-caption text-text-secondary">
          {hint}
        </p>
      )}
      {children({ id, "aria-invalid": error ? true : undefined, "aria-describedby": describedBy })}
      {error && (
        <p id={errorId} className="mt-1.5 text-caption text-feedback-error">
          {error}
        </p>
      )}
    </div>
  );
}
