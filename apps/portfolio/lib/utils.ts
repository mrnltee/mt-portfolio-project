import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge, taught about the @mt/tokens custom `fontSize` scale so that a
 * font-size utility (e.g. `text-body`, `text-h1`) and a text-COLOR utility
 * (e.g. `text-action-on-primary`) are treated as DIFFERENT groups and both
 * survive a merge. Without this, twMerge conflates the two `text-*` classes and
 * drops the color (the pre-existing Stage-2C bug on Button primary labels).
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display",
            "h1",
            "h2",
            "h3",
            "h4",
            "body-lg",
            "body",
            "body-sm",
            "label",
            "caption",
            "overline",
            "code",
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
