import type { ReactNode } from "react";
import { ThemedImage } from "@/components/ui/themed-image";
import { ZoomableImage } from "@/components/ui/image-zoom";
import { cn } from "@/lib/utils";
import type { Tint } from "@/types/project";

/** Tint token per project (decorative panel behind screenshots; no text sits on it). */
export const TINT: Record<Tint, string> = {
  green: "bg-background-tint-green",
  blue: "bg-background-tint-blue",
  violet: "bg-background-tint-violet",
  neutral: "bg-background-surface-subtle",
};

type Shot = { src: string; srcDark?: string; label: string };

/** A phone screenshot in a dark device bezel. Width comes from the parent (className). */
export function PhoneShot({ shot, className, zoomable = false, sizes = "240px" }: { shot: Shot; className?: string; zoomable?: boolean; sizes?: string }) {
  const screen = "relative aspect-[390/844] w-full overflow-hidden rounded-field bg-background-surface";
  return (
    <div className={cn("rounded-container bg-background-inverse p-1.5 shadow-overlay", className)}>
      {zoomable ? (
        <ZoomableImage src={shot.src} srcDark={shot.srcDark} label={shot.label} sizes={sizes} className={screen} />
      ) : (
        <div className={screen}>
          <ThemedImage src={shot.src} srcDark={shot.srcDark} alt={shot.label} sizes={sizes} className="object-cover object-top" />
        </div>
      )}
    </div>
  );
}

/** A desktop screenshot in a minimal browser window. */
export function BrowserShot({ shot, className, zoomable = false, aspect = "aspect-[1440/1040]", sizes = "(max-width: 768px) 100vw, 560px" }: { shot: Shot; className?: string; zoomable?: boolean; aspect?: string; sizes?: string }) {
  const body = cn("relative w-full overflow-hidden", aspect);
  return (
    <div className={cn("overflow-hidden rounded-field border border-border-default bg-background-surface shadow-overlay", className)}>
      <div aria-hidden="true" className="flex items-center gap-1.5 border-b border-border-subtle bg-background-surface-subtle px-3 py-2.5">
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-2 w-2 rounded-pill bg-border-strong" />
        ))}
      </div>
      {zoomable ? (
        <ZoomableImage src={shot.src} srcDark={shot.srcDark} label={shot.label} sizes={sizes} className={body} />
      ) : (
        <div className={body}>
          <ThemedImage src={shot.src} srcDark={shot.srcDark} alt={shot.label} sizes={sizes} className="object-cover object-top" />
        </div>
      )}
    </div>
  );
}

/** Tinted panel that holds a project's figure, with an optional frame label in the corner. */
export function MediaPanel({ tint = "neutral", label, className, children }: { tint?: Tint; label?: ReactNode; className?: string; children: ReactNode }) {
  return (
    <div className={cn("relative flex items-center justify-center overflow-hidden", TINT[tint], className)}>
      {label ? <div className="absolute left-4 top-4 z-10">{label}</div> : null}
      {children}
    </div>
  );
}
