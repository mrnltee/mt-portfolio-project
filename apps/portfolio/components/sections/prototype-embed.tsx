"use client";

import { useState } from "react";
import { ArrowUpRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemedImage } from "@/components/ui/themed-image";
import { MediaPanel } from "@/components/sections/project-media";
import type { Tint } from "@/types/project";

/**
 * An interactive Figma prototype in a phone frame. It loads only when the visitor asks:
 * Figma's embed is heavy and sets third-party cookies, so the page shows a poster until then.
 */
export function PrototypeEmbed({
  embedUrl,
  openUrl,
  title,
  poster,
  posterDark,
  tint,
}: {
  embedUrl: string;
  openUrl?: string;
  title: string;
  poster?: string;
  posterDark?: string;
  tint?: Tint;
}) {
  const [loaded, setLoaded] = useState(false);
  const screen = "relative aspect-[390/844] w-full overflow-hidden rounded-field bg-background-surface";

  return (
    <figure>
      <MediaPanel tint={tint} className="flex-col gap-6 rounded-card px-6 py-10 sm:py-14">
        <div className="w-72 rounded-container bg-background-inverse p-1.5 shadow-overlay sm:w-80">
          {loaded ? (
            <iframe src={embedUrl} title={title} className={screen} allow="fullscreen" />
          ) : (
            <div className={screen}>
              {poster && <ThemedImage src={poster} srcDark={posterDark} alt="" sizes="320px" className="object-cover object-top opacity-60" />}
              <div className="absolute inset-0 flex items-center justify-center bg-overlay-scrim">
                <Button onClick={() => setLoaded(true)}>
                  <Play className="h-icon-sm w-icon-sm" aria-hidden="true" />
                  Load the prototype
                </Button>
              </div>
            </div>
          )}
        </div>
      </MediaPanel>
      <figcaption className="mt-2 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <span className="text-caption text-text-tertiary">Tap the dock, tiles, menu items and back buttons. Loads Figma, which may set cookies.</span>
        {openUrl && (
          <a href={openUrl} target="_blank" rel="noopener noreferrer" className="focus-ring inline-flex items-center gap-1.5 rounded-field font-display text-body-sm font-semibold text-text-link underline-offset-4 hover:underline">
            Open full screen <ArrowUpRight className="h-icon-sm w-icon-sm" aria-hidden="true" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        )}
      </figcaption>
    </figure>
  );
}
