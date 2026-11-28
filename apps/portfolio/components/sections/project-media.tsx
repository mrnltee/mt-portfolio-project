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

/** Which phone a screenshot comes from; decides the frame's corner radius. */
export type Device = "ios" | "android";

/**
 * Device geometry, as proportions of the screen width so it holds at any frame size:
 * iPhone 390×844 with ~55pt screen corners (14.1%), Pixel 412×915 with ~28dp corners (6.8%).
 * `radius` sets `--screen-r` on a container-query parent; the bezel adds its padding to it so the
 * screen and bezel curves are concentric.
 */
export const DEVICE: Record<Device, { aspect: string; radius: string }> = {
  ios: { aspect: "aspect-[390/844]", radius: "[--screen-r:14.1cqw]" },
  android: { aspect: "aspect-[412/915]", radius: "[--screen-r:6.8cqw]" },
};

/** Outer frame (width + radius variable) and bezel classes shared by every phone frame. */
export const phoneFrame = (device: Device) => cn("[container-type:inline-size]", DEVICE[device].radius);
export const PHONE_BEZEL = "rounded-[calc(var(--screen-r)+theme(spacing.75))] bg-background-inverse p-75 shadow-overlay";
export const PHONE_SCREEN = "relative w-full overflow-hidden rounded-[var(--screen-r)] bg-background-surface";

type Shot = { src: string; srcDark?: string; label: string; device?: Device };

/**
 * A phone screenshot in a dark device bezel. Width comes from the parent (className). The screen keeps
 * the 390×844 proportion of the exports; `shot.device` only changes the corner radius.
 */
export function PhoneShot({ shot, className, zoomable = false, sizes = "240px" }: { shot: Shot; className?: string; zoomable?: boolean; sizes?: string }) {
  const screen = cn(PHONE_SCREEN, "aspect-[390/844]");
  return (
    <div className={cn(phoneFrame(shot.device ?? "ios"), className)}>
      <div className={PHONE_BEZEL}>
        {zoomable ? (
          <ZoomableImage src={shot.src} srcDark={shot.srcDark} label={shot.label} sizes={sizes} className={screen} />
        ) : (
          <div className={screen}>
            <ThemedImage src={shot.src} srcDark={shot.srcDark} alt={shot.label} sizes={sizes} className="object-cover object-top" />
          </div>
        )}
      </div>
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
      {/* Inside an ImageModeScope the label leaves room for the theme switch on the right (and truncates). */}
      {label ? (
        <div className="absolute left-4 top-4 z-10 flex max-w-[calc(100%-2rem)] group-data-[image-mode]/image-mode:max-w-[calc(100%-9.5rem)]">
          {label}
        </div>
      ) : null}
      {children}
    </div>
  );
}
