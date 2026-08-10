# CLAUDE.md

Reference for future edits to this project — read this before adding pages or components.

## Stack

Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion. Static/Vercel-deployable,
no backend. This app lives in the **`mt-design-system` monorepo** as `apps/portfolio` and
consumes the `@mt/tokens` workspace package (`packages/tokens`). Run it with
`npm run portfolio:dev` from the monorepo root (or `npm run dev` from this folder).

## Design token system

**Single source of truth:** the **`@mt/tokens`** package (`packages/tokens` in the monorepo) —
NOT a local file. Tokens are authored as DTCG JSON in `packages/tokens/src/**` across four tiers
(**Primitive → Brand → Semantic → Component**) and built into consumer artifacts. There is no
`lib/tokens.ts` — do not recreate one. Never hardcode a hex, px size, or duration in a component;
use a token class or `--mt-*` CSS variable.

### How tokens reach the app

- **Tailwind preset** — `tailwind.config.ts` imports `@mt/tokens/tailwind`, which supplies the
  `colors`, `fontSize`, `borderRadius`, `boxShadow`, `spacing`/`sizing`, and motion
  `duration`/`easing` scales as utility classes.
- **Runtime CSS variables** — `app/layout.tsx` imports `@mt/tokens/css`, exposing layered
  `--mt-color-*` (and other `--mt-*`) variables under `:root`, `[data-theme="light|dark"]`, and
  `[data-brand="a|b|c"]`. `app/globals.css` reads these (e.g. the body background/text, the
  default `border-color`, the `.focus-ring` outline) — it no longer defines any `--color-*`
  blocks itself.
- **To change a token value:** edit `packages/tokens/src/**` and rebuild with
  `npm run tokens:build` (monorepo root). The portfolio's `prebuild` script also rebuilds tokens
  before `next build`, so CI/Vercel always has fresh output.

### Primitive vs. semantic colors

- **Semantic classes are what components use** (grouped `background` / `text` / `border` /
  `action` / `feedback` / `focus` / `overlay`):
  `bg-background-canvas` (page), `bg-background-surface`, `bg-background-surface-subtle`;
  `text-text-primary` / `text-text-secondary` / `text-text-tertiary` / `text-text-inverse`;
  `border-border-default` / `-subtle` / `-strong` / `-focus`;
  `bg-action-primary` / `text-action-primary`;
  `text-feedback-error` / `-warning` / `-success` / `-info`, `bg-feedback-error-surface`, etc.
- **Primitive ramps** (`sand`, `indigo`, `green`, `amber`, `red`, …) compile to classes like
  `bg-indigo-500` and are for one-off decorative use only (e.g. the hero brand mark). Prefer a
  semantic class so theming "just works".

### Theming (light/dark + brand)

- **Light/dark:** `next-themes` (`ThemeProvider`, `attribute={["class","data-theme"]}`,
  `defaultTheme="light"`, wired via `components/theme-provider.tsx` + `ThemeToggle`) sets
  `data-theme` on `<html>`, and the semantic `--mt-*` variables flip automatically. A `dark`
  class is emitted too (so Tailwind `dark:` utilities work), but you almost never need it — use
  semantic classes. **Never write a component-level `dark:` color override.**
- **Brand:** `<html data-brand="a">` pins the app to Brand A. The token system is multi-brand
  (`a`/`b`/`c`); the portfolio consumes one brand.

### Other scales

- **Typography** — `text-display`, `text-h1`…`text-h4`, `text-body-lg`, `text-body`,
  `text-body-sm`, `text-label`, `text-caption`, `text-overline`, `text-code` (line-height and
  letter-spacing baked in). Apply weight/family separately via `font-display`/`font-sans`/
  `font-mono` + `font-bold`/`font-semibold`.
- **Radius** — `rounded-control` / `-field` / `-card` / `-container` / `-dialog` / `-pill`.
- **Shadow** — `shadow-surface` / `-raised` / `-overlay` / `-modal` (elevation scale).
- **Motion** — `duration-fast` / `-normal` / `-slow` and `ease-standard` / `-emphasized` for CSS;
  Framer Motion reads raw values from `@mt/tokens/motion` (`motion.duration`, `motion.easing`).

`/design-system` renders all of the above **live** from `@mt/tokens/metadata`, so it can't drift
out of sync with the real system.

## Folder structure

```
app/                        Routes (App Router)
  page.tsx                  Home (hero + filterable featured project grid)
  case-studies/page.tsx     Case study index (filterable grid)
  case-studies/[slug]/      Dynamic case study route, statically generated
  design-system/page.tsx    Live token + component documentation (reads @mt/tokens/metadata)
  about/page.tsx
  contact/page.tsx
  how-this-was-built/page.tsx
  layout.tsx                Root layout: fonts, data-brand, ThemeProvider, @mt/tokens/css, chrome
  globals.css               Base styles + .focus-ring utility (colors come from @mt, not here)

components/
  ui/                       Design-system primitives (Button, Input, Card, Tag, NavLink,
                             Avatar, SectionHeading, Divider, ThemeToggle, ImagePlaceholder)
  layout/                   Header, Footer, Container, Section
  sections/                 Page composites (Hero, ProjectCard, ProjectGrid, CaseStudyTemplate,
                             BrandMark — the interactive 3D Morse-wireframe hero mark)
  design-system/            Sections for the /design-system page (color/type/spacing/component)
  how-it-was-built/         PromptPanel + CopyButton for /how-this-was-built
  motion/                   PageTransition, RevealOnScroll
  theme-provider.tsx        next-themes wrapper

lib/
  utils.ts                  cn() class-merge helper
  color.ts                  hex→HSL formatter (used on /design-system)
  projects-data.ts          All case study content — the single place to edit project copy
  original-prompt.ts        Verbatim scaffolding prompt shown on /how-this-was-built

types/
  project.ts                CaseStudy and related types
```

Design tokens live **outside** this app, in `packages/tokens` (`@mt/tokens`).

## Conventions

- **Editing project content**: change `lib/projects-data.ts` only — it drives the home grid, the
  case-studies index, filter tags, and every `/case-studies/[slug]` page.
- **Placeholders**: mark anything to be replaced with a visible `[REPLACE]` prefix in the rendered
  text, not just a code comment.
- **Images**: `components/ui/image-placeholder.tsx` renders a labeled box; swap each
  `<ImagePlaceholder />` for `next/image` when you have real assets, with a real `alt`.
- **Components**: variant/size APIs use `class-variance-authority` (see `button.tsx`, `tag.tsx`).
  Add variants there, not ad hoc `className` strings. Form fields flag errors with
  `aria-invalid` — the Input's `aria-invalid:*` classes plus the `.focus-ring[aria-invalid]`
  rule in `globals.css` give the red border/ring/surface (see `input.tsx`).
- **Dark mode**: use semantic classes; never a component-level `dark:` color override.
- **Motion**: keep it purposeful. Use `RevealOnScroll` sparingly; prefer the `duration-*`/`ease-*`
  tokens; drive Framer Motion from `@mt/tokens/motion`. All motion respects
  `prefers-reduced-motion` (globally in `globals.css` and per-component `useReducedMotion()`).
- **Accessibility**: every focusable element uses the shared `.focus-ring` utility (in
  `globals.css`) instead of the browser default outline.
