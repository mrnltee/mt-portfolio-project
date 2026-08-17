"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

/**
 * A next/image that swaps its source with the active theme. Renders a single
 * <img> (the light source by default), switching to `srcDark` once mounted in
 * dark mode — so only the needed asset is fetched, and a theme toggle reliably
 * loads the other variant instead of leaving a hidden image blank.
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
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const showDark = mounted && resolvedTheme === "dark" && Boolean(srcDark);

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
