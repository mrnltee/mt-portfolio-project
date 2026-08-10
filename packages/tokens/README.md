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
npm run validate   # structural + alias-integrity checks (contrast checks land later)
npm run clean      # remove build/
```

## Phase status

**Phase 0 (scaffold).** Structure, pipeline, resolver and validation are in place; token files
are DTCG **stubs with no values** (taxonomy only) — the build resolves all 6 permutations and
emits valid, empty scoped outputs. The `mt/tailwind-preset` and `mt/figma-payload` formats are
Phase-0 stubs. Phase 1 populates real primitive/brand/semantic/component values.

## Figma target (Phase 3)

Team **Actimai / DocThread Projects** (Professional, `team::1298465090200970625`), project
**MT Design System** (`637232137`). Collection/mode strategy: Primitives (1 mode) · Brand
(3 modes) · Semantic (2 modes) · Component (1 mode); Variables primary, Styles as composites.
