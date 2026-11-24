"use client";

import { useEffect, useState } from "react";
import { TIME_ZONE } from "@/lib/site";

const format = (d: Date) => new Intl.DateTimeFormat("en-US", { timeZone: TIME_ZONE, hour: "numeric", minute: "2-digit" }).format(d);

/**
 * The owner's current local time, so a remote hiring manager can tell the overlap at a glance.
 * Rendered after mount (the static export can't know the time), updated each minute, and
 * not announced to screen readers on every tick.
 */
export function LocalTime({ className }: { className?: string }) {
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => {
    const tick = () => setNow(format(new Date()));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);
  return (
    <time className={className} suppressHydrationWarning>
      {now ?? " "}
    </time>
  );
}
