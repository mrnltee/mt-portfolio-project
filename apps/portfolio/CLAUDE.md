# CLAUDE.md

Reference for future edits to this project — read this before adding pages or components.

## Stack

Next.js 16 (App Router, React 19) + TypeScript + Tailwind CSS + Framer Motion. Static export (`out/`), hosted on Cloudflare Pages,
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
  before `next build`, so CI/Cloudflare Pages always has fresh output.

### Primitive vs. semantic colors

- **Semantic classes are what components use** (grouped `background` / `text` / `border` /
  `action` / `feedback` / `focus` / `overlay`):
  `bg-background-canvas` (page), `bg-background-surface`, `bg-background-surface-subtle`;
  `text-text-primary` / `text-text-secondary` / `text-text-tertiary` / `text-text-inverse`;
  `border-border-default` / `-subtle` / `-strong` / `-focus`;
  `bg-action-primary` / `text-action-primary`;
  `text-feedback-error` / `-warning` / `-success` / `-info`, `bg-feedback-error-surface`, etc.
- **Primitive ramps** (`sand`, `burnt-orange`, `green`, `amber`, `red`, …) compile to classes like
  `bg-green-500` and are for one-off decorative use only. Prefer a semantic class so theming and the
  accent setting "just work" (the brand mark strokes use `--mt-color-action-primary`).
- **Roles added in the Nov 2026 redesign:** `text-text-link` (eyebrows, links), `border-border-control`
  (input boundaries, ≥3:1), `bg-background-logo-plate` + `text-text-on-logo-plate` (employer logos),
  `bg-background-tint-green|blue|violet` (decorative panels behind project screenshots; never put text
  on them). The current nav item is `text-action-on-accent-subtle` on `bg-action-accent-subtle`.

### Theming (light/dark + brand)

- **Light/dark:** `next-themes` (`ThemeProvider`, `attribute={["class","data-theme"]}`,
  `defaultTheme="light"`, wired via `components/theme-provider.tsx` + `ThemeToggle`) sets
  `data-theme` on `<html>`, and the semantic `--mt-*` variables flip automatically. A `dark`
  class is emitted too (so Tailwind `dark:` utilities work), but you almost never need it — use
  semantic classes. **Never write a component-level `dark:` color override.**
- **Brand:** `<html data-brand="a">` pins the app to Brand A. The token system is multi-brand
  (`a`/`b`/`c`); the portfolio consumes one brand.
- **Accent (site setting):** `<html data-accent={SITE_ACCENT}>`, set in `lib/site.ts`. Change that one
  value to repaint buttons, links, focus rings, tags, the nav highlight and the brand mark:
  `"burnt-orange"` (default) | `"terracotta"` | `"pine"` | `"oxblood"` | `"ochre"` | `"ink"`. The type comes
  from `@mt/tokens` (`overlays.accent.values`), so a value the tokens don't ship fails `tsc`, and
  `npm run validate` checks every accent against the WCAG AA pairs in light and dark. Never use a
  primitive accent ramp (e.g. `bg-burnt-orange-500`) in a component; use the semantic classes.

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
  page.tsx                  Home (bento hero, teams strip, three work bands, what I bring, contact)
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
  sections/                 Page composites (Hero, TeamsStrip, WorkBand, WhatIBring, ContactBand, ToolsGrid,
                             ProjectCard, ProjectGrid, CaseStudyTemplate, project-media,
                             BrandMark — the interactive 3D Morse-wireframe hero mark)
  design-system/            Sections for the /design-system page (color/type/spacing/component)
  how-it-was-built/         PromptPanel + CopyButton for /how-this-was-built
  motion/                   PageTransition, RevealOnScroll
  theme-provider.tsx        next-themes wrapper

lib/
  utils.ts                  cn() class-merge helper
  color.ts                  hex→HSL formatter (used on /design-system)
  projects-data.ts          All case study content — the single place to edit project copy
  content.ts                Copy shared by pages (What I bring, employers, About tools + skills)
  site.ts                   Site settings: URL, email, CV path, time zone, SITE_ACCENT
  use-mounted.ts            useMounted(): false on the server/hydration, true after (theme-dependent UI)
  original-prompt.ts        Verbatim scaffolding prompt shown on /how-this-was-built

types/
  project.ts                CaseStudy and related types
```

Design tokens live **outside** this app, in `packages/tokens` (`@mt/tokens`).

## Conventions

- **Editing project content**: change `lib/projects-data.ts` only — it drives the home work bands,
  the case-studies index, filter tags, and every `/case-studies/[slug]` page. `featured: true` (keep it
  to three) puts a project on the home page and needs `band` (media + one `highlight`, which may only
  restate a fact the study makes). `tint` picks the screenshot panel colour; `contribution` adds the
  "What I did" list. Copy shared by pages (What I bring, employers) lives in `lib/content.ts`.
- **About → Tools I use / Skills**: `TOOL_GROUPS` and `SKILLS` in `lib/content.ts`, rendered by
  `ToolsGrid` (static, grouped; it replaced the marquee once the list grew past ~20). A tool's `icon`
  is a `<symbol id>` in `public/tool-logos.svg` (Simple Icons paths, CC0); use `mark` (a short
  monogram) when no logo is available. Only list tools the owner actually uses.
- **Page structure**: Home = `Hero` (bento) → `TeamsStrip` → `WorkBand`s → `WhatIBring` → `ContactBand`.
  Every case study ends with `ContactBand`, then Next case study (wraps to the first) and All work.
  Screenshot framing: `components/sections/project-media.tsx` (`PhoneShot`, `BrowserShot`,
  `MediaPanel`) with a decorative `FrameLabel`. Card-wide links put the link on the title and stretch
  it with `after:absolute after:inset-0` (never an `aria-label` that differs from the visible text).
- **Book a call**: set `BOOKING_URL` in `lib/site.ts` to the Google Calendar booking page link. It adds a
  "Video call" card on Contact and a "Book a call" button in `ContactBand` (two rows of buttons on wide
  screens). Empty hides both. It's a link out to Google's page, not an embed.
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
- **Next.js 16 / React 19** (upgraded Nov 2026 for security advisories): route `params` are a Promise, so
  `await params` in pages and `generateMetadata` (a plain `params.slug` is undefined and every case study 404s).
  Lint is `npm run lint` → `eslint .` with `eslint.config.mjs` (flat config; `next lint` no longer exists).
  Don't `setState` inside `useEffect` (the React hooks rule fails the lint): for "only after hydration"
  use `useMounted()` from `lib/use-mounted.ts`; to reset state when a value changes, compare it during render.
- **Scroll restore check**: `npm run test:scroll` (after `npm run build`) runs `scripts/check-scroll-restore.mjs`:
  scroll `/case-studies`, click a card, press Back, in light/dark with and without reduced motion. It clicks the
  card by position on purpose; `locator.click()` scrolls the title into view first and fakes a 256 px restore.
- **Accessibility**: every focusable element uses the shared `.focus-ring` utility (in
  `globals.css`) instead of the browser default outline. The ring follows the element's own radius;
  don't add a `border-radius` to `.focus-ring`.
