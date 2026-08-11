"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/** Numbered pagination with prev/next. Controlled via page + onPageChange. */
export function Pagination({
  page,
  pageCount,
  onPageChange,
  className,
}: {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  className?: string;
}) {
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);
  const cell = "focus-ring grid h-9 min-w-9 place-items-center rounded-field px-2 text-body-sm";
  const quiet = "text-text-secondary hover:bg-background-surface-subtle disabled:pointer-events-none disabled:opacity-40";

  return (
    <nav aria-label="Pagination" className={cn("flex items-center gap-1", className)}>
      <button type="button" aria-label="Previous page" disabled={page <= 1} onClick={() => onPageChange(page - 1)} className={cn(cell, quiet)}>
        <ChevronLeft className="h-4 w-4" />
      </button>
      {pages.map((p) => (
        <button
          key={p}
          type="button"
          aria-current={p === page ? "page" : undefined}
          onClick={() => onPageChange(p)}
          className={cn(cell, p === page ? "bg-action-primary text-action-on-primary" : quiet)}
        >
          {p}
        </button>
      ))}
      <button type="button" aria-label="Next page" disabled={page >= pageCount} onClick={() => onPageChange(page + 1)} className={cn(cell, quiet)}>
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
}
