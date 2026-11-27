# Handover — for the next AI agent (any platform)

Written 26 Nov 2026 (last updated 27 Nov 2026) so another AI agent (or person) can review this repo and carry on with a
**refactor**. The owner is a product designer; work with them through plain-language summaries
and screenshots, not only diffs.

Read in this order:

1. This file: current state, rules, where to start.
2. [`apps/portfolio/CLAUDE.md`](apps/portfolio/CLAUDE.md): the full conventions for the app. It is
   named for Claude, but it applies to every agent. Treat it as binding.
3. [`packages/tokens/README.md`](packages/tokens/README.md): the token pipeline.

---

## 1. What this repo is

An npm-workspaces monorepo (Node ≥ 24, see `.nvmrc`) with two parts:

| Path | Package | What it is |
| --- | --- | --- |
| `packages/tokens` | `@mt/tokens` | The **MT Design System** tokens: DTCG 2025.10 JSON, built with Style Dictionary into CSS variables, TS, a Tailwind preset, Figma Variable payloads and `metadata.json`. Multi-brand (a/b/c) × light/dark, plus a runtime **accent** overlay. |
| `apps/portfolio` | `mernel-portfolio` | The owner's product-design portfolio: Next.js 16 (App Router), React 19, Tailwind 3, Framer Motion, Radix, Lenis. **Static export** to `out/`, hosted on Cloudflare Pages (every push to `main` deploys). |

The data flows one way: `packages/tokens/src/**` → build → `@mt/tokens` → the portfolio. The
portfolio never defines its own design values.

## 2. Baseline health (checked 26 Nov 2026, on `f135299`)

| Check | Command (from the repo root) | Result |
| --- | --- | --- |
| Install | `npm ci` | ✅ |
| Token validation | `npm run validate` | ✅ 907 tokens, 51 files, 6 permutations, 36 accent variants; WCAG AA holds |
| Typecheck | `cd apps/portfolio && npx tsc --noEmit` | ✅ no errors |
| Lint | `cd apps/portfolio && npm run lint` | ✅ no warnings |
| Static build | `npm run portfolio:build` | not re-run for this handover; CI builds it on every PR |
| Scroll-restore e2e | `npm run portfolio:test:scroll` (after a build) | runs in CI (`.github/workflows/scroll-check.yml`) |

**A refactor must leave every row green.** Run all of them before you call the work done.

## 3. Non-negotiable rules (summary of CLAUDE.md)

- **No hardcoded design values** in components: no hex, no px sizes, no durations. Use token
  classes (`bg-background-surface`, `text-body-sm`, `rounded-card`, `duration-normal`, …) or the
  `--mt-*` variables. To change a value, edit `packages/tokens/src/**` and rebuild. Never edit
  `packages/tokens/build/`, which is generated and git-ignored.
- **Semantic over primitive colours.** Primitive ramps (`bg-green-500`, `bg-burnt-orange-500`) only
  for one-off decoration, and never an accent ramp in a component.
- **No component-level `dark:` colour overrides.** Theme switching runs through `data-theme` and the
  semantic variables.
- **Variants go through `class-variance-authority`** (see `components/ui/button.tsx`, `tag.tsx`), not
  ad-hoc `className` strings.
- **Content lives in data files.** Case studies are in `lib/projects-data.ts` (keep exactly three
  `featured: true`). Shared copy is in `lib/content.ts`. Site settings (URL, email, `SITE_ACCENT`,
  `BOOKING_URL`) are in `lib/site.ts`.
- **Next 16 / React 19 gotchas:** route `params` is a Promise (`await params`, or every case study
  404s). Don't `setState` in `useEffect`; use `useMounted()` from `lib/use-mounted.ts`.
- **Accessibility:** every focusable element uses `.focus-ring`. All motion respects
  `prefers-reduced-motion`. Card-wide links stretch the title link and use no differing
  `aria-label`.
- **Scroll:** Lenis owns wheel scrolling (`components/motion/smooth-scroll.tsx`). Don't add CSS
  `scroll-behavior: smooth`, and give anchor targets `scroll-mt-*`.
- **Static export only:** no server actions, API routes or on-demand image optimisation
  (`images.unoptimized`).

## 4. Map of the code

```
packages/tokens/
  src/primitive|brand|semantic|component|accent/*.json   DTCG source (edit here)
  resolver/manifest.json + resolve.ts                    brand × theme composition, overlays
  scripts/build.ts, build-consumer.ts, validate.ts       build + 11 validation checks (incl. WCAG)
apps/portfolio/
  app/                 routes: home, about, contact, case-studies (+ [slug]), design-system, how-this-was-built
  components/ui/       ~45 design-system primitives (Radix + cva)
  components/sections/ page composites (Hero, WorkBand, CaseStudyTemplate, ProjectCard, BrandMark, …)
  components/design-system/  the live /design-system documentation page
  components/motion/   PageTransition, RevealOnScroll, SmoothScroll
  lib/                 data + helpers (projects-data, content, site, utils, color, use-mounted)
  types/project.ts     CaseStudy types
  scripts/check-scroll-restore.mjs   Playwright e2e
```

## 5. Refactor candidates (observations, not decisions)

The owner wants a maintainability refactor across the whole portfolio website. Use the
[refactor guide](docs/refactor-guide.md) as the single phased plan; this section records
exploratory candidates, not a competing sequence. Confirm detailed priorities with the owner
before broad structural changes. These are observations from a quick review, not approved tasks:

1. **`components/design-system/component-library.tsx` (662 lines)** is the biggest file. It holds
   every demo for `/design-system` in one component, with local helpers (`Category`, `Demo`, `Field`,
   `ToastDemo`) and icon arrays. It could be split into one demo file per category, with the TOC in
   `component-toc.ts` kept in sync.
2. **`lib/projects-data.ts` (475 lines)** holds all the case-study content in one array. It could be
   split into one file per study (e.g. `lib/projects/<slug>.ts`) with an index that keeps the order.
   The `CaseStudy` type in `types/project.ts` must stay the contract.
3. **`components/sections/case-study-template.tsx` (~280 lines)** could be broken into smaller
   section components.
4. **Bracketed one-off sizes** that may deserve tokens or a documented exception:
   - `backdrop-blur-[2px]` and `bg-black/50` in `components/ui/dialog.tsx`; an overlay token exists
     (`overlay` group).
   - `min-w-[720px]` in `components/design-system/color-section.tsx`.
   - `max-h-[680px]` and `bg-white` in `components/design-system/mt-design-overview.tsx`.
   - `h-[3px]` and `max-w-[140px]` in `components/sections/brand-story.tsx`.
   - `w-[300px] sm:w-[320px]` in `components/sections/brand-mark.tsx`.
5. **Possibly unused components:** `BrandStory`, `CareerTimeline` and `LinkList` are referenced only
   by their own files or the design-system demo. Check with a full search before you delete any
   of them.
6. **The CLAUDE.md folder list for `components/ui/`** names about 10 primitives, but there are now
   about 45. Update the doc as part of any refactor.
7. **Future package `@mt/react`** (noted in the root README): moving `components/ui/` into a
   workspace package. This is a large change. Only do it if the owner asks.

## 6. How to work in this repo

- **Branch and PR:** don't push to `main`, because it deploys to production. Work on a branch and
  open a **draft** PR. CI runs the build and the scroll check on every PR.
- **Small, verifiable steps:** one refactor theme per PR. A refactor should not change the UI.
  Compare screenshots of `/`, `/case-studies`, one case study, `/about`, `/contact` and
  `/design-system`, in light and dark, before and after.
- **Visual check:** `npm run portfolio:build && npx serve apps/portfolio/out`, or
  `npm run portfolio:dev`.
- **Token changes:** run `npm run validate` after every edit in `packages/tokens/src`.
- **Copy and content:** don't rewrite the owner's case-study wording or the "highlight" facts.
  Leave visible `[REPLACE]` markers for anything that needs their input.
- **Owner-only decisions:** which tools and skills are listed on About, which projects are
  featured, `SITE_ACCENT`, `BOOKING_URL`, and the Figma target (Phase 3 in the root README).

## 7. Recent history (newest first)

- Per-image **System / Light / Dark switch** on case-study screenshots that have both a light and a dark file
  (cover, Process figures, Solution gallery; the enlarged view follows it). System = the browser/OS colour scheme.
  Files: `lib/image-mode.tsx`, `components/ui/image-mode-toggle.tsx`, `components/ui/themed-image.tsx`,
  `components/sections/case-study-template.tsx`; `FrameLabel` now truncates beside the switch. Open question for the
  owner: should "System" follow the site's header toggle instead of the browser? It's one line in `ThemedImage`.
  Today Autosweep shows 2 switches and Extractly 6; screenshots with no dark file (e.g. Autosweep's low-balance Home)
  show none. Add an `imageDark`/`coverDark` file to give them one.

- #13 Refreshed the House of Retrievers screenshots from the live site
- #12 House of Retrievers PH featured on the home page, replacing MayBahaBa
- #11, #10 Scroll-restore check (`test:scroll`) and its GitHub Actions workflow
- #9 Fixed a hydration mismatch (React #418) in `PageTransition` under reduced motion
- #8 Lenis smooth scrolling
- #7 Upgrade to Next.js 16 and React 19 (security advisories), plus the Book a call button
- #6 About page: grouped Tools I use and Skills
- #5 Portfolio redesign and the switchable accent (Burnt orange is the default)

## 8. Handover checklist for the receiving agent

- [ ] Read this file, `apps/portfolio/CLAUDE.md` and `packages/tokens/README.md`
- [ ] Run the baseline commands in §2 and confirm they're green
- [ ] Agree the refactor scope with the owner (see §5)
- [ ] Take "before" screenshots
- [ ] Make the changes in small PRs; keep every check green
- [ ] Take "after" screenshots; there should be no visual difference unless the owner asked for one
- [ ] Update `CLAUDE.md` and this file to match the new structure
