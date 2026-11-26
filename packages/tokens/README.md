# @mt/tokens

DTCG source tokens and generated outputs for the MT Design System.

## Pipeline

```
src/**.json (DTCG 2025.10)
   → resolver/  (compose brand × theme permutations)
      → Style Dictionary
         → build/css/     brand-<b>-<theme>.css   (CSS custom properties, scoped by [data-brand][data-theme])
         → build/ts/      brand-<b>-<theme>.ts     (TypeScript token object)
         → build/tailwind/brand-<b>-<theme>.cjs    (Tailwind preset)
         → build/figma/   brand-<b>-<theme>.json   (Figma Variable importer payload)
```

`build/` is generated and git-ignored — never hand-edit it.

## Source layout (`src/`)

| Dir | Tier / role |
|-----|-------------|
| `primitive/` | Global, brand/theme-agnostic raw ramps (color, space, size, radius, border, typography, duration, easing, opacity). |
| `brand/brand-{a,b,c}/` | Per-brand **foundations** — the brandable axes: color ramp, font families, radius base, density. Identical token paths across brands; values differ. |
| `semantic/` | Role tokens referencing primitives/brand. Color splits into `color.light.json` / `color.dark.json`; other roles are theme-invariant. |
| `component/` | Thin component tokens that alias **semantic only** — so components stay identical across brands. |

## Theming model

`Primitive → Semantic → Component`. **Brand** and **theme** are theming *dimensions*, not
tiers, composed by `resolver/manifest.json`:

- `brand ∈ {a, b, c}` × `theme ∈ {light, dark}` → 6 permutations.
- Composition order (`compose`): `primitive → brand → semantic-base → semantic-theme → component`.

### Runtime overlays (accent)

`resolver/manifest.json → overlays` declares sets that switch at runtime by an HTML attribute,
without new permutations. Today there is one: **accent** (`data-accent`), values `burnt-orange`
(default; Brand A's own accent), `terracotta`, `pine`, `oxblood`, `ochre`, `ink`, each in
`src/accent/<value>.json` backed by a primitive ramp in `primitive/color.json`.

- An overlay file may only declare paths in its `scope` (`brand.color.accent*`). Neutral, feedback
  and everything else stay untouchable.
- `tokens.css` gets one `[data-accent="<value>"]` block per value, emitted after the brand blocks.
  Semantic colours alias the brand vars with `var()`, so put the attribute on `<html>` (the same
  element that declares them) and everything follows.
- `validate.ts` (check 11) composes every value into every brand×theme and runs the full WCAG pair
  list: 36 variants. A failing colour or an out-of-scope path fails the build.
- `@mt/tokens` exports `overlays` with literal types, so an app can type its setting
  (`(typeof overlays)["accent"]["values"][number]`).

To add an accent: add a 50–900 ramp plus `hover` to `primitive/color.json`, copy an
`src/accent/*.json`, add the value to `overlays.accent.values`, then `npm run validate`.

## Commands

```bash
npm run build      # resolve permutations → build/
npm run validate   # DTCG structure, tier edges, refs, theme symmetry, invariants, WCAG AA
npm run clean      # remove build/
```

## Conventions & invariants

### Letter-spacing (tracking) is a unitless `number`, rendered as `em`
DTCG 2025.10 restricts the `dimension` unit set to `px`/`rem`, which cannot express tracking that
scales with font size. So tracking tokens are authored as a **standards-conformant unitless
`number`** (an em-multiplier) carrying an extension:

```json
"tighter": { "$value": -0.02, "$extensions": { "org.mt": { "cssUnit": "em", "role": "tracking" } } }
```

The `mt/number-unit` Style Dictionary transform appends the unit for **CSS/TS** (`-0.02em`),
preserving the font-size-relative relationship. **Figma** output keeps the raw `number`
(Phase 3 maps it to Figma's letter-spacing percent = value × 100). The DTCG source never uses a
non-conformant unit.

### Feedback/status is brand-invariant (system-level)
Brand identity may vary **accent, neutral, typography, shape, scale, and elevation** foundations.
`success` / `warning` / `error` / `info` semantics are **brand-invariant** and resolve to the
primitive status ramps (`green`/`amber`/`red`/`blue`). This is declared in
[`resolver/manifest.json`](resolver/manifest.json) under `invariants` and **enforced by
`validate.ts`**:

- semantic `color.feedback.*` may only reference primitive status ramps (never `brand.*`);
- no brand file may (re)define a feedback/status role.

Overriding this requires a deliberate, accessibility-reviewed change to the manifest — it cannot
happen by adding a brand.

## Consumer API (Stage 2A)

Consumers import stable subpaths — never the internal `build/` layout:

```ts
// tailwind.config.ts
import mtPreset from '@mt/tokens/tailwind';
export default { presets: [mtPreset], /* … */ };
```
```css
/* globals.css */
@import '@mt/tokens/css';   /* layered runtime tokens */
```
```ts
import { tokens } from '@mt/tokens'; // tokens.color.action.primary === 'var(--mt-color-action-primary)'
```

- **`@mt/tokens/css`** → `build/consumer/tokens.css`: layered `--mt-*` variables.
  - `:root` — primitives, component tokens, non-color semantics (invariant).
  - `[data-brand="a|b|c"]` — brand foundation overrides. **`a` is the attribute-less default.**
  - `[data-theme="light|dark"]` — semantic color overrides. **`light` is the default.**
  - Set `<html data-brand="b" data-theme="dark">` to switch; brand-A/light render with no attributes.
- **`@mt/tokens/tailwind`** → var-based preset. Colors are emitted as
  `rgb(var(--mt-…-rgb) / <alpha-value>)`, so opacity modifiers (`bg-action-primary/50`) work;
  spacing/radius/shadow/fontSize/fontFamily map to `var(--mt-…)`. Alpha tokens
  (`overlay.scrim`, `shadow.color`, `background.transparent`) map to `var()` directly.
- **`@mt/tokens`** (default) → typed `tokens` object of CSS-var references (theme/brand-agnostic).
- **Advanced:** `@mt/tokens/permutations/css/<name>.css` and `/permutations/figma/<name>.json`
  expose the fully-resolved per-permutation files (for static single-brand builds / Figma).

`prepare` runs the build, so a `file:` dependency generates `build/` on install. Color vars are
published as **both** `--mt-x` (hex/rgba, for direct CSS use) and `--mt-x-rgb` (channels, for
Tailwind alpha).

## Phase status

**Phase 1 (token architecture).** Complete. The DTCG source and resolver/build pipeline are in place.

**Phase 2A (consumer infrastructure).** Complete. Stable package exports, the `prepare` build,
layered runtime CSS, and the variable-based Tailwind preset are implemented; Tailwind alpha-modifier
behavior is verified.

**Phase 2B (portfolio integration).** Complete. The portfolio at `apps/portfolio` consumes
`@mt/tokens` through the npm workspace. See [`apps/portfolio/CLAUDE.md`](../../apps/portfolio/CLAUDE.md)
for the app's token integration conventions.

**Phase 3 (Figma integration).** Not started. No Figma file or components have been created.

## Figma target (Phase 3)

Team **Actimai / DocThread Projects** (Professional, `team::1298465090200970625`), project
**MT Design System** (`637232137`). Collection/mode strategy: Primitives (1 mode) · Brand
(3 modes) · Semantic (2 modes) · Component (1 mode); Variables primary, Styles as composites.
