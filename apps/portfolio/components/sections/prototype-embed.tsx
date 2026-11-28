"use client";

import { useState } from "react";
import { ArrowUpRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { ThemedImage } from "@/components/ui/themed-image";
import { MediaPanel } from "@/components/sections/project-media";
import { cn } from "@/lib/utils";
import type { PrototypePlatform, Tint } from "@/types/project";

/** Screen proportions per platform: iPhone 390×844, Pixel 412×915. */
const SCREEN: Record<PrototypePlatform["platform"], string> = {
  ios: "aspect-[390/844]",
  android: "aspect-[412/915]",
};
const LABEL: Record<PrototypePlatform["platform"], string> = { ios: "iOS", android: "Android" };

/**
 * An interactive Figma prototype in a phone frame. It loads only when the visitor asks:
 * Figma's embed is heavy and sets third-party cookies, so the page shows a poster until then.
 * With more than one platform, a segmented control switches between them (the choice keeps the
 * prototype loaded if it already is).
 */
export function PrototypeEmbed({ platforms, title, tint }: { platforms: PrototypePlatform[]; title: string; tint?: Tint }) {
  const [loaded, setLoaded] = useState(false);
  const [platform, setPlatform] = useState<PrototypePlatform["platform"]>(platforms[0].platform);
  const current = platforms.find((p) => p.platform === platform) ?? platforms[0];
  const screen = cn("relative w-full overflow-hidden rounded-field bg-background-surface", SCREEN[current.platform]);

  return (
    <figure>
      <MediaPanel tint={tint} className="flex-col gap-6 rounded-card px-6 py-10 sm:py-14">
        {platforms.length > 1 && (
          <SegmentedControl
            aria-label="Prototype platform"
            options={platforms.map((p) => ({ label: LABEL[p.platform], value: p.platform }))}
            value={current.platform}
            onValueChange={setPlatform}
            className="relative z-10"
          />
        )}
        <div className="w-72 rounded-container bg-background-inverse p-1.5 shadow-overlay sm:w-80">
          {loaded ? (
            <iframe key={current.platform} src={current.embedUrl} title={`${title} (${LABEL[current.platform]})`} className={screen} allow="fullscreen" />
          ) : (
            <div className={screen}>
              {current.poster && <ThemedImage src={current.poster} srcDark={current.posterDark} alt="" sizes="320px" className="object-cover object-top opacity-60" />}
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
        {current.url && (
          <a href={current.url} target="_blank" rel="noopener noreferrer" className="focus-ring inline-flex items-center gap-1.5 rounded-field font-display text-body-sm font-semibold text-text-link underline-offset-4 hover:underline">
            Open {LABEL[current.platform]} full screen <ArrowUpRight className="h-icon-sm w-icon-sm" aria-hidden="true" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        )}
      </figcaption>
    </figure>
  );
}
