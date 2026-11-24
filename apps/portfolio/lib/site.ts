import type { overlays } from "@mt/tokens";

/** The portfolio's public address. Used for canonical URLs, the sitemap and structured data. */
export const SITE_URL = "https://merneldesign.dev";

export const SITE_NAME = "Mernel Tusoy";

export const LINKEDIN_URL = "https://www.linkedin.com/in/merneltusoy";

export const EMAIL = "mbtusoy@gmail.com";

export const CV_URL = "/MTusoy_Product_Designer_CV.pdf";

/**
 * SITE SETTING — Google Calendar booking page (Calendar → Create → Appointment schedule →
 * Share → copy the link). Paste it here and "Book a call" appears on the Contact page and in the
 * closing contact band. Leave it empty to hide the button everywhere.
 */
export const BOOKING_URL: string = "";

/** IANA zone for the "local time" card. */
export const TIME_ZONE = "Asia/Manila";

/** Every accent @mt/tokens ships. Each one passes WCAG AA in light and dark (enforced by `npm run validate`). */
export type Accent = (typeof overlays)["accent"]["values"][number];

/**
 * SITE SETTING — the portfolio's accent colour.
 *
 * Change this one value to repaint buttons, links, focus rings, tags and the brand mark:
 * "burnt-orange" | "terracotta" | "pine" | "oxblood" | "ochre" | "ink".
 * It is set as `<html data-accent>`; the type above rejects anything @mt/tokens doesn't ship.
 */
export const SITE_ACCENT: Accent = "burnt-orange";
