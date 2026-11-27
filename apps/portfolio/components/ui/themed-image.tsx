"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useMounted } from "@/lib/use-mounted";
import { useImageMode, usePrefersDark } from "@/lib/image-mode";

/**
 * A next/image that swaps its source with the active theme. Renders a single
 * <img> (the light source by default), switching to `srcDark` once mounted in
 * dark mode — so only the needed asset is fetched, and a theme toggle reliably
 * loads the other variant instead of leaving a hidden image blank.
 *
 * Inside an `ImageModeScope` (case study screenshots) the visitor's per-image choice wins:
 * System follows the browser's colour scheme, Light/Dark pin a variant.
 */
export function ThemedImage({
  src,
  srcDark,
  alt,
  sizes,
  priority,
  className,
}: {
  src: string;
  srcDark?: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();

  const imageMode = useImageMode();
  const prefersDark = usePrefersDark();

  const wantsDark = imageMode === null ? resolvedTheme === "dark" : imageMode === "dark" || (imageMode === "system" && prefersDark);
  const showDark = mounted && wantsDark && Boolean(srcDark);

  return (
    <Image
      src={showDark ? (srcDark as string) : src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={className}
    />
  );
}
