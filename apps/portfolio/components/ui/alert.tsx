import type { HTMLAttributes } from "react";
import { Info, CheckCircle2, AlertTriangle, AlertCircle } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const alertVariants = cva("flex gap-3 rounded-card p-4 text-body-sm", {
  variants: {
    variant: {
      info: "bg-feedback-info-surface text-feedback-on-info",
      success: "bg-feedback-success-surface text-feedback-on-success",
      warning: "bg-feedback-warning-surface text-feedback-on-warning",
      error: "bg-feedback-error-surface text-feedback-on-error",
    },
  },
  defaultVariants: { variant: "info" },
});

const ICONS = { info: Info, success: CheckCircle2, warning: AlertTriangle, error: AlertCircle } as const;
const ICON_COLOR = {
  info: "text-feedback-info",
  success: "text-feedback-success",
  warning: "text-feedback-warning",
  error: "text-feedback-error",
} as const;

export interface AlertProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertVariants> {
  title?: string;
}

/** Inline alert/message with a semantic icon per status. */
export function Alert({ className, variant, title, children, ...props }: AlertProps) {
  const v = variant ?? "info";
  const Icon = ICONS[v];
  return (
    <div role="alert" className={cn(alertVariants({ variant: v }), className)} {...props}>
      <Icon aria-hidden="true" className={cn("mt-0.5 h-5 w-5 shrink-0", ICON_COLOR[v])} />
      <div className="min-w-0">
        {title && <p className="font-semibold">{title}</p>}
        {children != null && <div className={cn(title && "mt-0.5")}>{children}</div>}
      </div>
    </div>
  );
}
