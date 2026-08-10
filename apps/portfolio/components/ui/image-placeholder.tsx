import { cn } from "@/lib/utils";

interface ImagePlaceholderProps {
  /** Describes what real image belongs here — also used as the fallback alt text so this stays screen-reader friendly even before assets are swapped in. */
  label: string;
  aspect?: "video" | "square" | "portrait" | "wide";
  className?: string;
  tone?: 0 | 1 | 2 | 3;
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
 * [REPLACE]: swap the call site for next/image, e.g.
 *   <Image src="/images/case-studies/slug/hero.jpg" alt="<describe what's shown>" fill className="object-cover" />
 * Keep a real, descriptive `alt` — never leave it empty for meaningful images.
 */
export function ImagePlaceholder({ label, aspect = "video", className, tone = 0 }: ImagePlaceholderProps) {
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
        <span className="text-caption font-medium text-text-secondary">[REPLACE] {label}</span>
      </div>
    </div>
  );
}
