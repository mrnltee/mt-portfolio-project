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

## Phase status

**Phase 1 (token architecture).** Real primitive/brand/semantic/component values authored;
6 permutations build to CSS/TS/Tailwind/Figma; full validation (architecture + WCAG AA) passes.
Not yet consumed by any app (Phase 2) and not yet in Figma (Phase 3).

## Figma target (Phase 3)

Team **Actimai / DocThread Projects** (Professional, `team::1298465090200970625`), project
**MT Design System** (`637232137`). Collection/mode strategy: Primitives (1 mode) · Brand
(3 modes) · Semantic (2 modes) · Component (1 mode); Variables primary, Styles as composites.
