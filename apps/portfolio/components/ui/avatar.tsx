import Image from "next/image";
import { cn } from "@/lib/utils";

interface AvatarProps {
  src?: string;
  alt: string;
  size?: number;
  className?: string;
}

/** [REPLACE] src with a real headshot in /public/images. Falls back to initials on the @mt accent-subtle token. */
export function Avatar({ src, alt, size = 96, className }: AvatarProps) {
  if (!src) {
    const initials = alt
      .split(" ")
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
    return (
      <div
        role="img"
        aria-label={alt}
        style={{ width: size, height: size }}
        className={cn(
          "flex items-center justify-center rounded-pill bg-action-accent-subtle font-display text-h3 font-semibold text-action-on-accent-subtle",
          className
        )}
      >
        {initials}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={cn("rounded-pill object-cover", className)}
    />
  );
}
