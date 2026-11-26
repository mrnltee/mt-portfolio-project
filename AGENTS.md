# AGENTS.md

Instructions for any AI coding agent (Codex, Cursor, Gemini, Copilot, Claude, …).

1. Read [`HANDOVER.md`](HANDOVER.md) first: current state, baseline checks, refactor candidates.
2. Follow [`apps/portfolio/CLAUDE.md`](apps/portfolio/CLAUDE.md): the binding conventions for the
   app. It is named for Claude, but it applies to every agent.
3. Token work: [`packages/tokens/README.md`](packages/tokens/README.md).

Before calling anything done, run from the repo root: `npm run validate`, then
`cd apps/portfolio && npx tsc --noEmit && npm run lint`, then `npm run portfolio:build`.
Never push to `main`, because it deploys to production. Use a branch and a draft PR.
