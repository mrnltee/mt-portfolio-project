# MT Design System

An **independent, reusable, multi-brand design system**. The design system is the source of
truth; applications consume its generated outputs as a package. It is **not** coupled to any
single application.

```
DTCG source tokens  →  Style Dictionary  →  CSS / TypeScript / Tailwind  →  @mt/tokens  →  products
                    ↘                                                                     (e.g. mernel-portfolio)
                      Figma Variables  →  Figma components        (same token architecture, second target)
```

## Architecture

Token tiers are **Primitive → Semantic → Component**. **Brand** (A/B/C) and **theme**
(light/dark) are *theming dimensions*, not tiers — they select which primitives the semantic
layer resolves to. Component tokens reference semantic tokens only, so the same component
architecture holds across every brand.

- **Spec:** DTCG 2025.10. Core token files stay tool-agnostic; Figma- and Style-Dictionary-
  specific metadata is quarantined under `$extensions`.
- **Source of truth:** the DTCG JSON in `packages/tokens/src/`. Both the code outputs and the
  Figma Variables are *generated* from it — no design value is maintained twice by hand.

## Packages

- [`@mt/tokens`](packages/tokens) — DTCG source tokens + generated CSS/TS/Tailwind/Figma outputs.

Future (not created yet): `@mt/react` (components) → consumes `@mt/tokens`.

## Getting started

```bash
nvm use
npm install
npm run build      # resolve brand×theme permutations → packages/tokens/build/
npm run validate   # structural + alias-integrity checks
```

## Figma target (Phase 3)

- Team: **Actimai / DocThread Projects** (Professional) — `team::1298465090200970625`
- Project: **MT Design System** — `637232137`

No Figma file is created until Phase 3.

## Status

**Phase 0 — scaffolding.** Repository, workspace, Style Dictionary pipeline, DTCG directory
structure, resolver/manifest, and validation tooling are in place. Token *values* are added in
Phase 1. See [`packages/tokens/README.md`](packages/tokens/README.md) for the pipeline detail.
