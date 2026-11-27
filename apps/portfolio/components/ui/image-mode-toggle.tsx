"use client";

import { useState, type ReactNode } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { DEFAULT_IMAGE_MODE, ImageModeProvider, type ImageMode } from "@/lib/image-mode";
import { cn } from "@/lib/utils";

const OPTIONS: { value: ImageMode; label: string; Icon: typeof Sun }[] = [
  { value: "system", label: "Match system", Icon: Monitor },
  { value: "light", label: "Light", Icon: Sun },
  { value: "dark", label: "Dark", Icon: Moon },
];

/** Three-way System / Light / Dark switch for one screenshot. A group of toggle buttons (aria-pressed). */
export function ImageModeToggle({
  value,
  onValueChange,
  className,
}: {
  value: ImageMode;
  onValueChange: (v: ImageMode) => void;
  className?: string;
}) {
  return (
    <div
      role="group"
      aria-label="Screenshot theme"
      className={cn(
        "inline-flex items-center gap-0.5 rounded-pill border border-border-default bg-background-surface p-0.5 shadow-raised",
        className,
      )}
    >
      {OPTIONS.map(({ value: v, label, Icon }) => {
        const selected = v === value;
        return (
          <button
            key={v}
            type="button"
            aria-pressed={selected}
            aria-label={label}
            title={label}
            onClick={() => onValueChange(v)}
            className={cn(
              "focus-ring inline-flex h-8 w-8 items-center justify-center rounded-pill transition-colors duration-fast ease-standard",
              selected
                ? "bg-action-accent-subtle text-action-on-accent-subtle"
                : "text-text-secondary hover:bg-background-surface-subtle hover:text-text-primary",
            )}
          >
            <Icon className="h-icon-sm w-icon-sm" aria-hidden="true" />
          </button>
        );
      })}
    </div>
  );
}

/**
 * Wraps one screenshot (and its enlarged view, which inherits the context through the portal)
 * with its own theme switch in the top-right corner. Renders children untouched when the image
 * has no dark variant, so there is nothing to switch.
 */
export function ImageModeScope({
  enabled,
  className,
  toggleClassName,
  children,
}: {
  enabled: boolean;
  className?: string;
  toggleClassName?: string;
  children: ReactNode;
}) {
  const [mode, setMode] = useState<ImageMode>(DEFAULT_IMAGE_MODE);
  if (!enabled) return <>{children}</>;
  return (
    <ImageModeProvider mode={mode}>
      <div data-image-mode={mode} className={cn("group/image-mode relative", className)}>
        {children}
        <ImageModeToggle value={mode} onValueChange={setMode} className={cn("absolute right-4 top-4 z-10", toggleClassName)} />
      </div>
    </ImageModeProvider>
  );
}
