import { cn } from "@/lib/utils";

/** Determinate progress bar (0–max). Provide an accessible label. */
export function Progress({
  value,
  max = 100,
  label,
  className,
}: {
  value: number;
  max?: number;
  label?: string;
  className?: string;
}) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
      className={cn("h-2 w-full overflow-hidden rounded-pill bg-background-surface-subtle", className)}
    >
      <div
        className="h-full rounded-pill bg-action-primary transition-[width] duration-normal ease-standard"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
