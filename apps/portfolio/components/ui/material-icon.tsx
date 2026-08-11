import "material-symbols/outlined.css";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

/**
 * Material Symbols (outlined) glyph — the companion set to lucide. Pass a symbol
 * name, e.g. <MaterialIcon name="home" />. The font is loaded via material-symbols;
 * it's a full icon font, so subset it for production if bundle size matters.
 */
export function MaterialIcon({
  name,
  className,
  style,
}: {
  name: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span className={cn("material-symbols-outlined leading-none", className)} style={style} aria-hidden="true">
      {name}
    </span>
  );
}
