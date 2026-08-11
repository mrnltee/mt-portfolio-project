"use client";

import "react-day-picker/style.css";
import { useState } from "react";
import type { CSSProperties } from "react";
import { DayPicker } from "react-day-picker";
import { CalendarDays } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "./popover";
import { cn } from "@/lib/utils";

/** Date picker: a token-styled react-day-picker calendar in a Popover. */
export function DatePicker({
  value,
  onChange,
  placeholder = "Pick a date",
  className,
}: {
  value?: Date;
  onChange?: (date?: Date) => void;
  placeholder?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const rdpTheme = {
    "--rdp-accent-color": "var(--mt-color-action-primary)",
    "--rdp-accent-background-color": "var(--mt-color-action-accent-subtle)",
    "--rdp-day_button-border-radius": "0.5rem",
  } as CSSProperties;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "focus-ring inline-flex h-control-md items-center gap-2 rounded-field border border-border-default bg-background-surface px-3.5 text-body transition-colors hover:border-border-strong",
            value ? "text-text-primary" : "text-text-tertiary",
            className,
          )}
        >
          <CalendarDays className="h-4 w-4 text-text-tertiary" />
          {value ? value.toLocaleDateString() : placeholder}
        </button>
      </PopoverTrigger>
      <PopoverContent className="p-3 text-body-sm text-text-primary" style={rdpTheme}>
        <DayPicker
          mode="single"
          selected={value}
          onSelect={(d) => {
            onChange?.(d);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
