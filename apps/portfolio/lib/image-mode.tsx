"use client";

import { createContext, useContext, useSyncExternalStore, type ReactNode } from "react";

/**
 * Per-image theme for case study screenshots that ship in light and dark.
 * - `system`: follow the visitor's browser/OS colour scheme (prefers-color-scheme)
 * - `light` / `dark`: pin that variant
 * Outside an `ImageModeProvider` (mode `null`), images follow the site theme as before.
 */
export type ImageMode = "system" | "light" | "dark";

/** What a screenshot shows before the visitor touches its toggle. */
export const DEFAULT_IMAGE_MODE: ImageMode = "system";

const ImageModeContext = createContext<ImageMode | null>(null);

export function ImageModeProvider({ mode, children }: { mode: ImageMode; children: ReactNode }) {
  return <ImageModeContext.Provider value={mode}>{children}</ImageModeContext.Provider>;
}

export function useImageMode(): ImageMode | null {
  return useContext(ImageModeContext);
}

const QUERY = "(prefers-color-scheme: dark)";

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

/** True when the browser/OS prefers dark. False on the server and during hydration. */
export function usePrefersDark(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}
