import type { SVGProps } from "react";

/**
 * Brand glyphs not shipped by lucide (it dropped brand icons). Inline SVG so it
 * inherits `currentColor` and sizes via className, like a lucide icon.
 */
export function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14ZM8.34 17V9.94H6V17h2.34Zm-1.17-8.1a1.36 1.36 0 1 0 0-2.72 1.36 1.36 0 0 0 0 2.72ZM18 17v-3.9c0-2.08-1.11-3.05-2.6-3.05-1.2 0-1.74.66-2.04 1.13V9.94h-2.34c.03.66 0 7.06 0 7.06h2.34v-3.94c0-.21.02-.42.08-.57.17-.42.55-.86 1.2-.86.85 0 1.19.64 1.19 1.59V17H18Z" />
    </svg>
  );
}
