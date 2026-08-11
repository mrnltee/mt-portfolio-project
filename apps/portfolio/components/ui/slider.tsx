"use client";

import { forwardRef } from "react";
import type { ComponentPropsWithoutRef, ElementRef } from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

export const Slider = forwardRef<
  ElementRef<typeof SliderPrimitive.Root>,
  ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn("relative flex w-full touch-none select-none items-center", className)}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-pill bg-background-surface-subtle">
      <SliderPrimitive.Range className="absolute h-full rounded-pill bg-action-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      aria-label="Value"
      className="focus-ring block h-4 w-4 rounded-pill border-2 border-action-primary bg-background-surface shadow-raised disabled:pointer-events-none"
    />
  </SliderPrimitive.Root>
));
Slider.displayName = "Slider";
