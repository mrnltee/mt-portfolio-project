# Portfolio Refactor Guide

**Purpose:** This is the phased execution plan for a maintainability refactor across the portfolio in `apps/portfolio`. `HANDOVER.md` remains the source for repository facts, baseline checks, history, and project rules. Its §5 candidate list is historical analysis, not a second plan. Read and follow it for rules; use this guide for the refactor sequence.

Repository: https://github.com/mrnltee/mt-portfolio-project

## Project context

This npm workspaces monorepo contains:

- `apps/portfolio`: a product design portfolio built with Next.js 16 App Router, React 19, TypeScript, Tailwind CSS, Framer Motion, Radix UI, and Lenis. It is a static export to `out/`, hosted on Cloudflare Pages.
- `packages/tokens`: `@mt/tokens`, the multi-brand design token source and build pipeline. The portfolio consumes it; do not create a parallel source of design values.

The handover's baseline was checked on `f135299`; current code may differ. Verify the current checkout and CI before relying on historical results.

## Required reading

1. `AGENTS.md`
2. This guide
3. `HANDOVER.md` — repo facts, baseline, history, rules, and exploratory candidates
4. `apps/portfolio/CLAUDE.md` — binding app conventions for every agent
5. `packages/tokens/README.md`
6. Relevant source files and scripts; verify documentation against code

The root README and token README have outdated phase-status text. The current code and handover indicate the token values and portfolio integration are implemented. Verify actual imports, package exports, and scripts, then correct the stale status documentation without implying Figma integration is complete.

## Refactor intent

Assess and plan the whole portfolio app for maintainability. Preserve visible design, behavior, accessibility, routes, and owner-authored content unless the owner approves a product or visual change. Include the token package in the assessment, but change token architecture or values only when necessary and within the owner's intent.

The candidate list in `HANDOVER.md` §5 contains observations, not approved tasks. Map routes, layouts, components, content/data, token dependencies, motion/scroll, accessibility, static-export constraints, CI, and deployment before prioritizing. Do not assume file size alone makes something a refactor priority.

## Guardrails

- Never push to `main`; every push deploys to production. Use a branch and draft PR.
- Keep static export. Do not add server actions, API routes, backend services, or on-demand image optimization without owner approval.
- Token source lives in `packages/tokens/src/**`. Never edit generated `packages/tokens/build/**`; do not add local token files. Prefer semantic token utilities and `--mt-*` variables.
- No component-level `dark:` color overrides. Theme switching uses semantic variables and `data-theme`.
- Preserve case-study copy and factual highlights. Keep exactly three featured projects unless the owner directs otherwise. Use visible `[REPLACE]` markers for information the owner must provide.
- Owner-only decisions include About tools/skills, featured projects, `SITE_ACCENT`, `BOOKING_URL`, and Figma scope.
- Preserve `.focus-ring`, reduced-motion support, accessible link behavior, Lenis scroll ownership, anchor offsets, and scroll restoration. Do not add CSS `scroll-behavior: smooth`.
- Await Next.js 16 route `params`; follow existing React 19 hydration/state conventions.
- Use `class-variance-authority` for component variants.
- Search all references before deleting files. Do not move `components/ui/` into a future `@mt/react` package unless the owner asks.

## Phased plan

### Phase 0 — baseline and assessment

1. Confirm checkout, branch, commit, and working tree. Preserve existing changes.
2. Read required docs and verify them against source, scripts, and CI. Record discrepancies.
3. Run the checks required by `AGENTS.md` from the repository root:

   ```sh
   npm run validate
   cd apps/portfolio && npx tsc --noEmit && npm run lint
   cd ../..
   npm run portfolio:build
   ```

4. Run `npm run portfolio:test:scroll` after the build. On a new machine, first install its browser once with `npx playwright install chromium`.
5. Record actual outcomes; distinguish passed, failed, skipped, and not run. Do not report historical baseline results as current.
6. Capture baseline screenshots of `/`, `/case-studies`, one case study, `/about`, `/contact`, and `/design-system`, in light and dark themes.
7. Map the whole app and propose a prioritized, phased plan with risks and dependencies. Review the plan with the owner before broad structural changes.

### Phase 1 — reviewable slices

- Make one coherent refactor theme per branch/PR; avoid speculative abstractions and unrelated cleanup.
- Preserve routes, content, behavior, accessibility, and visuals.
- After token source edits, run `npm run validate`.
- Update imports, tests, docs, and maps alongside structure changes.
- Re-run relevant checks per slice and all required checks before calling the work done.
- Compare after screenshots to the same routes/themes; explain any approved visual difference.

### Phase 2 — final review

Review the diff for unintended content, route, styling, accessibility, performance, and deployment changes. Summarize changed areas, checks actually run, screenshot comparison, risks, and follow-up work in plain language. Keep work on a branch and open a draft PR; do not merge or push to `main`. Update handoff docs to match verified code.

## Session continuity when credits run out

At the end of each work session, and immediately if Claude Code credits or session time run out, create or update `docs/REFACTOR_HANDOFF.md` (or the repository's established handoff file). Record:

1. Date, branch, commit SHA, and working-tree state.
2. Objective, agreed scope, and out-of-scope work.
3. Completed changes with paths and rationale.
4. Current in-progress state and ordered next steps.
5. Commands run and actual outcomes.
6. Before/after screenshot references and visual differences needing review.
7. Open decisions, blockers, risks, and owner input needed.
8. Documentation that may be stale.
9. A restart prompt telling the next agent to reread instructions, inspect current git state, verify notes against code, preserve uncommitted changes, and continue without repeating completed work.

Do not claim unfinished phases are complete. Preserve uncommitted work and leave Claude Code a clear review and continuation path.

## Claude Code kickoff prompt

```text
You are the chief developer planning a maintainability refactor across the portfolio in this repository.

Read AGENTS.md, docs/refactor-guide.md, HANDOVER.md, apps/portfolio/CLAUDE.md, and packages/tokens/README.md. Use docs/refactor-guide.md as the sole phased refactor plan; use HANDOVER.md for repository facts and rules. Verify documentation against the current code, especially the stale token phase-status statements.

First inspect the current branch, commit, git status, scripts, routes, token integration, and CI. Preserve user changes. Run the required baseline checks and record actual results; on a new machine install Chromium with npx playwright install chromium before the scroll test. Capture before screenshots for /, /case-studies, one case study, /about, /contact, and /design-system in light and dark. Map the entire app and present a prioritized phased plan for owner review before broad structural changes.

Preserve the static export, current UI and behavior, accessibility, routes, and owner-authored copy. Follow all constraints in CLAUDE.md and HANDOVER.md. Do not push to main. After approval, make one coherent change at a time, verify it, update relevant docs, and use branches and draft PRs.

If credits or session time run out, immediately update docs/REFACTOR_HANDOFF.md with branch/SHA/status, completed and unfinished work, next steps, real check results, screenshots, open decisions/risks, and a restart prompt. Preserve uncommitted work and never mark incomplete work as complete.
```
