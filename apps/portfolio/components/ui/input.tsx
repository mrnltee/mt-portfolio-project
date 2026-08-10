import { forwardRef } from "react";
import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const fieldStyles =
  "focus-ring w-full rounded-field border border-border-default bg-background-surface px-3.5 py-2.5 text-body text-text-primary placeholder:text-text-tertiary transition-colors duration-normal hover:border-border-strong disabled:cursor-not-allowed disabled:opacity-40 aria-invalid:border-feedback-error aria-invalid:bg-feedback-error-surface";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => (
  <input ref={ref} className={cn(fieldStyles, className)} {...props} />
));
Input.displayName = "Input";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => (
  <textarea ref={ref} className={cn(fieldStyles, "min-h-32 resize-y", className)} {...props} />
));
Textarea.displayName = "Textarea";

export function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={cn("mb-1.5 block text-caption font-medium text-text-secondary", className)} {...props} />;
}
