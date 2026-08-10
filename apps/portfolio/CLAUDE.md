# CLAUDE.md

Reference for future edits to this project — read this before adding pages or components.

## Stack

Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion. Static/Vercel-deployable,
no backend.

## Design token system

**Single source of truth:** `lib/tokens.ts`. Every color, type size, spacing value, radius,
shadow, and motion timing used anywhere in the UI is defined there once and consumed via
Tailwind (`tailwind.config.ts` imports directly from `lib/tokens.ts`). Never hardcode a hex
value, px size, or duration in a component — add or reuse a token instead.

### Primitive vs. semantic colors

- **Primitives** (`neutral`, `accent`, `success`, `warning`, `error` in `lib/tokens.ts`) are
  the raw color scale. They compile to Tailwind classes like `bg-neutral-100` or
  `bg-accent-500` and are safe for one-off decorative use.
- **Semantic tokens** (`semanticColor` in `lib/tokens.ts`) map a *role* — background, text,
  border, accent, status — to a primitive step, once per theme (light/dark). These are the
  ones components should actually use: `bg-page`, `bg-surface`, `bg-surface-muted`,
  `border-border` / `border-border-strong`, `text-ink` / `text-ink-secondary` / `text-ink-muted`,
  `bg-brand` / `bg-brand-hover` / `bg-brand-subtle` / `text-brand-on`, `text-status-success`,
  etc.
- Semantic tokens are implemented as CSS custom properties in `app/globals.css` (`:root` for
  light, `.dark` for dark — toggled by `next-themes` adding/removing the `dark` class on
  `<html>`). **If you change a primitive hex in `lib/tokens.ts`, update the matching
  `--color-*` custom property in `app/globals.css` to match** — these two files must stay in
  sync; there's no build step that generates one from the other.
- Always reach for a semantic class (`bg-surface`, `text-ink-secondary`) over a primitive one
  (`bg-neutral-0`, `text-neutral-600`) in component code, so dark mode "just works" without a
  `dark:` override.

### Other token scales

- **Typography** — `typeScale` in `lib/tokens.ts` defines named sizes (`display`, `h1`…`h4`,
  `body-lg`, `body`, `body-sm`, `caption`, `overline`), each feeding a Tailwind `fontSize` key
  (`text-h1`, `text-body`, etc.) with its line-height/letter-spacing baked in. Font *weight*
  and *family* are applied separately via `font-display`/`font-sans` + `font-bold`/`font-semibold`
  utilities — see `typeScale[name].weight/family` for the intended pairing and match it when
  using a given size.
- **Spacing** — intentionally *not* overridden; it equals Tailwind's default 4px-based scale.
  `spacingScale` in `lib/tokens.ts` exists only to drive the visualization on `/design-system`.
- **Radius** — `radiusScale` → Tailwind `borderRadius` (`rounded-sm` … `rounded-2xl`, `rounded-full`).
- **Shadow** — `shadowScale` → Tailwind `boxShadow` (`shadow-soft-sm/md/lg`), soft/diffused by
  design, no harsh drop shadows.
- **Motion** — `motionTokens` → `duration-fast/base/slow` (150/250/400ms) and `ease-soft`.
  Framer Motion spring interactions use `motionTokens.spring` (stiffness 260 / damping 24)
  directly in component code.

All of the above is rendered live on `/design-system` — that page reads directly from
`lib/tokens.ts`, so it can never drift out of sync with the actual system.

## Folder structure

```
app/                        Routes (App Router)
  page.tsx                  Home
  case-studies/page.tsx     Case study index (filterable grid)
  case-studies/[slug]/      Dynamic case study route, statically generated
  design-system/page.tsx    Live token + component documentation
  about/page.tsx
  contact/page.tsx
  how-this-was-built/page.tsx
  layout.tsx                Root layout: fonts, ThemeProvider, Header/Footer, PageTransition
  globals.css                Semantic color CSS custom properties + base styles

components/
  ui/                       Design-system primitives (Button, Input, Card, Tag, NavLink,
                             Avatar, SectionHeading, Divider, ThemeToggle, ImagePlaceholder)
  layout/                   Header, Footer, Container, Section
  sections/                 Page-specific composites (Hero, ProjectCard, ProjectGrid,
                             CaseStudyTemplate)
  design-system/            Sections specific to the /design-system page (color/type/
                             spacing/component showcases)
  how-it-was-built/         PromptPanel + CopyButton for /how-this-was-built
  motion/                   PageTransition, RevealOnScroll
  theme-provider.tsx        next-themes wrapper

lib/
  tokens.ts                 Design token source of truth (see above)
  utils.ts                  cn() class-merge helper
  color.ts                  hex→HSL formatter (used on /design-system)
  projects-data.ts          All case study content — the single place to edit project copy
  original-prompt.ts        Verbatim text shown on /how-this-was-built

types/
  project.ts                CaseStudy and related types
```

## Conventions

- **Editing project content**: change `lib/projects-data.ts` only — it drives the home page
  grid, the case-studies index, the filter tags, and every `/case-studies/[slug]` page. Don't
  hardcode project copy in components.
- **Placeholders**: anything meant to be replaced is marked with a visible `[REPLACE]` prefix
  in the rendered text (not just a code comment), so it's obvious when browsing the live site.
  Follow this convention for any new placeholder content you add.
- **Images**: there are no real image assets yet. `components/ui/image-placeholder.tsx`
  renders a labeled placeholder box instead of a broken `<img>`. When you have real assets,
  replace each `<ImagePlaceholder label="..." />` call with `next/image` — the component's
  doc comment shows the exact swap. Always write a real, descriptive `alt`.
- **Components**: variant/size APIs use `class-variance-authority` (see `components/ui/button.tsx`
  and `tag.tsx` for the pattern). Add new variants there rather than overriding with ad hoc
  `className` strings at call sites.
- **Dark mode**: never write a component-level `dark:` override for color — use the semantic
  tokens and it's automatic. `dark:` is fine for things that are genuinely non-color (e.g. an
  image swap), which this project doesn't currently need.
- **Motion**: keep it purposeful. Use `RevealOnScroll` sparingly (section-level, not every
  child), and prefer the existing `duration-*`/`ease-soft` tokens over inventing new timings.
- **Accessibility**: every interactive element uses the shared `.focus-ring` utility class
  (defined in `globals.css`) instead of relying on the browser default outline — keep using it
  on anything focusable you add. Respect `prefers-reduced-motion` (already handled globally in
  `globals.css` plus per-component `useReducedMotion()` checks in the motion components).
