import { ThemedImage } from "./themed-image";
import { ZoomableImage } from "./image-zoom";
import { cn } from "@/lib/utils";

interface ImagePlaceholderProps {
  /** Describes what real image belongs here — also used as the fallback alt text so this stays screen-reader friendly even before assets are swapped in. */
  label: string;
  /** Real image path (in /public). When set, a next/image is rendered instead of the dashed placeholder. Treated as the light-theme image. */
  src?: string;
  /** Optional dark-theme image path. When set, it is shown in dark mode and `src` is shown in light mode. */
  srcDark?: string;
  aspect?: "video" | "square" | "portrait" | "wide";
  className?: string;
  tone?: 0 | 1 | 2 | 3;
  /** Hint next/image to eager-load (use for above-the-fold covers). */
  priority?: boolean;
  /** Responsive `sizes` hint for next/image. */
  sizes?: string;
  /** Make a real image click-to-enlarge. Ignored in placeholder mode, and must
   * stay off wherever the image already sits inside a link or other control. */
  zoomable?: boolean;
}

const ASPECT: Record<NonNullable<ImagePlaceholderProps["aspect"]>, string> = {
  video: "aspect-video",
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  wide: "aspect-[21/9]",
};

const TONE = [
  "from-action-accent-subtle to-background-surface-subtle",
  "from-feedback-warning-surface to-background-surface-subtle",
  "from-feedback-success-surface to-background-surface-subtle",
  "from-background-surface-subtle to-action-accent-subtle",
];

/**
 * Visual stand-in for a real screenshot/photo. Renders as a labeled,
 * dashed-border box so it reads unmistakably as a placeholder rather than
 * a broken image.
 *
 * When no `src` is passed it draws the labeled box; pass `src`/`srcDark` to
 * render a real theme-aware next/image instead. Keep a descriptive `label`
 * (it becomes the alt text) — never leave it empty for meaningful images.
 */
export function ImagePlaceholder({
  label,
  src,
  srcDark,
  aspect = "video",
  className,
  tone = 0,
  priority,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px",
  zoomable = false,
}: ImagePlaceholderProps) {
  // Real image mode: render a theme-aware next/image (swaps source in dark mode).
  if (src) {
    const frame = cn(
      "relative overflow-hidden rounded-card border border-border-default bg-background-surface-subtle",
      ASPECT[aspect],
      className
    );

    if (zoomable) {
      return (
        <ZoomableImage
          src={src}
          srcDark={srcDark}
          label={label}
          sizes={sizes}
          priority={priority}
          className={frame}
        />
      );
    }

    return (
      <div className={frame}>
        <ThemedImage
          src={src}
          srcDark={srcDark}
          alt={label}
          sizes={sizes}
          priority={priority}
          className="object-cover object-top"
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={`Placeholder image: ${label}`}
      className={cn(
        "flex items-center justify-center rounded-card border-2 border-dashed border-border-strong bg-gradient-to-br p-6 text-center",
        ASPECT[aspect],
        TONE[tone],
        className
      )}
    >
      <div className="flex flex-col items-center gap-2">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-text-tertiary" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="M21 15l-5-5L5 21" />
        </svg>
        <span className="text-caption font-medium text-text-secondary">{label}</span>
      </div>
    </div>
  );
}
