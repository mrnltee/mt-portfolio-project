import { cn } from "@/lib/utils";

/** Loading placeholder. Size it with width/height utilities. */
export function Skeleton({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn("animate-pulse rounded-field bg-background-surface-subtle", className)} />;
}
