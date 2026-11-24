import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/**
 * False during the server render and hydration, true on the client after that.
 * Use it to hold back output that depends on browser-only state (e.g. the resolved theme),
 * so the first client render matches the static HTML.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(noopSubscribe, () => true, () => false);
}
