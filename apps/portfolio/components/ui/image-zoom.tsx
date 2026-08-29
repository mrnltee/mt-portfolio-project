"use client";

import { Maximize2 } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./dialog";
import { ThemedImage } from "./themed-image";
import { cn } from "@/lib/utils";

/**
 * Click-to-enlarge wrapper for a case study screenshot.
 *
 * The detail that makes a writeup legible — confidence scores, field labels,
 * depth terms — is unreadable at the size these sit at in the page flow, so the
 * image opens full-size in a dialog. Radix supplies the focus trap, Escape
 * handling, and scroll lock; the trigger is a real button so it is keyboard
 * reachable.
 *
 * Only used for real images. A dashed `ImagePlaceholder` has nothing to enlarge
 * and stays inert.
 */
export function ZoomableImage({
  src,
  srcDark,
  label,
  sizes,
  priority,
  className,
}: {
  src: string;
  srcDark?: string;
  label: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          aria-label={`Enlarge image: ${label}`}
          className={cn("focus-ring group block w-full cursor-zoom-in text-left", className)}
        >
          <ThemedImage
            src={src}
            srcDark={srcDark}
            alt={label}
            sizes={sizes}
            priority={priority}
            className="object-cover object-top transition-transform duration-normal ease-standard group-hover:scale-[1.02]"
          />
          {/* Affordance: only shows on hover/focus, so it never sits over the artwork at rest. */}
          <span
            aria-hidden="true"
            className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-field bg-background-surface/90 text-text-secondary opacity-0 shadow-raised backdrop-blur transition-opacity duration-normal group-hover:opacity-100 group-focus-visible:opacity-100"
          >
            <Maximize2 className="h-4 w-4" />
          </span>
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-6xl p-0 sm:p-0">
        {/* Doubles as the dialog's accessible name and the close button's row. */}
        <DialogTitle className="px-5 py-3.5 pr-14 text-body-sm font-medium text-text-primary">
          {label}
        </DialogTitle>
        <div className="relative h-[72dvh] w-full border-t border-border-default bg-background-surface-subtle">
          <ThemedImage
            src={src}
            srcDark={srcDark}
            alt={label}
            sizes="(max-width: 1280px) 100vw, 1200px"
            className="object-contain"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
