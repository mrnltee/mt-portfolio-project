"use client";

import { forwardRef } from "react";
import type { ComponentPropsWithoutRef, ElementRef } from "react";
import * as ToolbarPrimitive from "@radix-ui/react-toolbar";
import { cn } from "@/lib/utils";

export const Toolbar = forwardRef<
  ElementRef<typeof ToolbarPrimitive.Root>,
  ComponentPropsWithoutRef<typeof ToolbarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <ToolbarPrimitive.Root
    ref={ref}
    className={cn("inline-flex items-center gap-1 rounded-control border border-border-default bg-background-surface p-1", className)}
    {...props}
  />
));
Toolbar.displayName = "Toolbar";

export const ToolbarButton = forwardRef<
  ElementRef<typeof ToolbarPrimitive.Button>,
  ComponentPropsWithoutRef<typeof ToolbarPrimitive.Button>
>(({ className, ...props }, ref) => (
  <ToolbarPrimitive.Button
    ref={ref}
    className={cn(
      "focus-ring grid h-8 w-8 place-items-center rounded-field text-text-secondary transition-colors hover:bg-background-surface-subtle hover:text-text-primary",
      "data-[state=on]:bg-background-surface-subtle data-[state=on]:text-text-primary",
      className,
    )}
    {...props}
  />
));
ToolbarButton.displayName = "ToolbarButton";

export const ToolbarSeparator = forwardRef<
  ElementRef<typeof ToolbarPrimitive.Separator>,
  ComponentPropsWithoutRef<typeof ToolbarPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <ToolbarPrimitive.Separator ref={ref} className={cn("mx-1 h-5 w-px bg-border-default", className)} {...props} />
));
ToolbarSeparator.displayName = "ToolbarSeparator";
