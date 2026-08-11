import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Empty / no-results / error state. Pass a lucide icon, copy, and an optional action. */
export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center rounded-card border border-dashed border-border-default px-6 py-12 text-center",
        className,
      )}
    >
      {icon && (
        <div className="mb-4 grid h-12 w-12 place-items-center rounded-pill bg-background-surface-subtle text-text-tertiary">
          {icon}
        </div>
      )}
      <p className="font-display text-h4 font-semibold text-text-primary">{title}</p>
      {description && <p className="mt-1.5 max-w-sm text-body-sm text-text-secondary">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
