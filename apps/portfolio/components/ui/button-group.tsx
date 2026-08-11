import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/**
 * Joins a row of related buttons into one segmented control-style group.
 * Put plain <button>/<Button variant="ghost"> children inside — the group
 * strips their individual borders/radius and adds dividers.
 */
export function ButtonGroup({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      role="group"
      className={cn(
        "inline-flex divide-x divide-border-default overflow-hidden rounded-control border border-border-default",
        "[&>button]:rounded-none [&>button]:border-0",
        className,
      )}
      {...props}
    />
  );
}
