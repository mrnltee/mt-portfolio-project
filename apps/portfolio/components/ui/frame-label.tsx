import { cn } from "@/lib/utils";

/**
 * Figma-style frame name shown on a screenshot ("autosweep / home.png"). Purely decorative:
 * it is aria-hidden, and the image keeps its own alt text.
 */
export function FrameLabel({ children, className }: { children: string; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none inline-flex min-w-0 max-w-full items-center gap-1.5 rounded-pill border border-border-default bg-background-surface px-2 py-1 font-mono text-caption text-text-secondary",
        className,
      )}
    >
      <span className="h-2 w-2 shrink-0 rounded-sm bg-action-primary" />
      <span className="truncate">{children}</span>
    </span>
  );
}

/** "autosweep / home.png" from a /public image path. */
export function frameName(project: string, src: string) {
  const file = src.split("/").pop()?.replace("-light", "") ?? src;
  return `${project.toLowerCase()} / ${file}`;
}
