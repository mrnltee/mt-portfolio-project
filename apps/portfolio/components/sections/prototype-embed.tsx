"use client";

import { useState } from "react";
import { ArrowUpRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { ThemedImage } from "@/components/ui/themed-image";
import { DEVICE, MediaPanel, PHONE_BEZEL, PHONE_SCREEN, phoneFrame } from "@/components/sections/project-media";
import { cn } from "@/lib/utils";
import type { PrototypeFlow, PrototypePlatform, Tint } from "@/types/project";

const LABEL: Record<PrototypePlatform["platform"], string> = { ios: "iOS", android: "Android" };

/**
 * An interactive Figma prototype in a phone frame. It loads only when the visitor asks:
 * Figma's embed is heavy and sets third-party cookies, so the page shows a poster until then.
 * With more than one platform, a segmented control switches between them; with named flows, a
 * second one picks the story. Both keep the prototype loaded if it already is. (Figma's own flow
 * sidebar is too wide for a phone-sized frame, so the picker lives outside the iframe.)
 */
export function PrototypeEmbed({ platforms, flows = [], title, tint }: { platforms: PrototypePlatform[]; flows?: PrototypeFlow[]; title: string; tint?: Tint }) {
  const [loaded, setLoaded] = useState(false);
  const [platform, setPlatform] = useState<PrototypePlatform["platform"]>(platforms[0].platform);
  const [flowLabel, setFlowLabel] = useState(flows[0]?.label ?? "");
  const current = platforms.find((p) => p.platform === platform) ?? platforms[0];
  const flow = flows.find((f) => f.label === flowLabel);
  const link = flow?.links[current.platform] ?? { url: current.url, embedUrl: current.embedUrl };
  const screen = cn(PHONE_SCREEN, DEVICE[current.platform].aspect);

  return (
    <figure>
      <MediaPanel tint={tint} className="flex-col gap-6 rounded-card px-6 py-10 sm:py-14">
        {(platforms.length > 1 || flows.length > 1) && (
          <div className="relative z-10 flex max-w-full flex-wrap items-center justify-center gap-3">
            {platforms.length > 1 && (
              <SegmentedControl
                aria-label="Prototype platform"
                options={platforms.map((p) => ({ label: LABEL[p.platform], value: p.platform }))}
                value={current.platform}
                onValueChange={setPlatform}
              />
            )}
            {flows.length > 1 && (
              <SegmentedControl
                aria-label="Prototype flow"
                options={flows.map((f) => ({ label: f.label, value: f.label }))}
                value={flowLabel}
                onValueChange={setFlowLabel}
                className="max-w-full overflow-x-auto [&>button]:shrink-0 [&>button]:whitespace-nowrap"
              />
            )}
          </div>
        )}
        <div className={cn("w-72 sm:w-80", phoneFrame(current.platform))}>
        <div className={PHONE_BEZEL}>
          {loaded ? (
            <iframe key={link.embedUrl} src={link.embedUrl} title={`${title} (${LABEL[current.platform]}${flow ? `, ${flow.label}` : ""})`} className={screen} allow="fullscreen" />
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
        </div>
      </MediaPanel>
      <figcaption className="mt-2 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <span className="text-caption text-text-tertiary">Tap the dock, tiles, menu items and back buttons. Loads Figma, which may set cookies.</span>
        {link.url && (
          <a href={link.url} target="_blank" rel="noopener noreferrer" className="focus-ring inline-flex items-center gap-1.5 rounded-field font-display text-body-sm font-semibold text-text-link underline-offset-4 hover:underline">
            Open {LABEL[current.platform]} full screen <ArrowUpRight className="h-icon-sm w-icon-sm" aria-hidden="true" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        )}
      </figcaption>
    </figure>
  );
}
