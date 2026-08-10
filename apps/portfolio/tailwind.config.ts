import type { Config } from "tailwindcss";
// All design tokens (colors, fontSize, borderRadius, boxShadow, spacing, sizing, and now motion
// duration/easing) come from @mt/tokens via the preset, backed by --mt-* variables. Font families
// are the next/font loading stacks (--font-* vars, not design-token values).
import mtPreset from "@mt/tokens/tailwind";

const fontFamily = {
  display: ["var(--font-display)", "system-ui", "sans-serif"],
  sans: ["var(--font-sans)", "system-ui", "sans-serif"],
  mono: ["var(--font-mono)", "ui-monospace", "monospace"],
};

const config: Config = {
  // `mtPreset` is a generated .cjs; its literal fontSize tuples are valid at runtime but infer
  // too narrowly for Config under allowJs, so cast through unknown (per TS guidance).
  presets: [mtPreset as unknown as Partial<Config>],
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily,
      // Tailwind's default aria variants omit `invalid`; enable it so
      // `aria-invalid:*` utilities (e.g. the Input error border) generate.
      aria: {
        invalid: 'invalid="true"',
      },
    },
  },
  plugins: [],
};
export default config;
