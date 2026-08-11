"use client";

import { useState } from "react";
import { Command } from "cmdk";
import { Check, ChevronsUpDown } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "./popover";
import { cn } from "@/lib/utils";

export interface ComboboxOption {
  label: string;
  value: string;
}

/** Autocomplete/combobox: Radix Popover + cmdk for accessible type-to-filter. */
export function Combobox({
  options,
  value,
  onValueChange,
  placeholder = "Select…",
  searchPlaceholder = "Search…",
  emptyText = "No results.",
  className,
}: {
  options: ComboboxOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "focus-ring inline-flex h-control-md w-full items-center justify-between gap-2 rounded-field border border-border-default bg-background-surface px-3.5 text-body transition-colors hover:border-border-strong",
            selected ? "text-text-primary" : "text-text-tertiary",
            className,
          )}
        >
          {selected ? selected.label : placeholder}
          <ChevronsUpDown className="h-4 w-4 shrink-0 text-text-tertiary" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
        <Command className="w-full">
          <div className="border-b border-border-default px-2">
            <Command.Input
              placeholder={searchPlaceholder}
              className="h-10 w-full bg-transparent text-body-sm text-text-primary outline-none placeholder:text-text-tertiary"
            />
          </div>
          <Command.List className="max-h-56 overflow-auto p-1">
            <Command.Empty className="px-2.5 py-6 text-center text-body-sm text-text-secondary">{emptyText}</Command.Empty>
            {options.map((o) => (
              <Command.Item
                key={o.value}
                value={o.label}
                onSelect={() => {
                  onValueChange?.(o.value);
                  setOpen(false);
                }}
                className="flex cursor-pointer items-center justify-between rounded-field px-2.5 py-1.5 text-body-sm text-text-primary data-[selected=true]:bg-background-surface-subtle"
              >
                {o.label}
                {value === o.value && <Check className="h-4 w-4 text-action-primary" />}
              </Command.Item>
            ))}
          </Command.List>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
