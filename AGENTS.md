# AGENTS.md

Instructions for any AI coding agent (Codex, Cursor, Gemini, Copilot, Claude, …).

1. Read [`HANDOVER.md`](HANDOVER.md) for repository state, baseline checks, and project rules.
2. Follow [`docs/refactor-guide.md`](docs/refactor-guide.md) as the single phased plan for the
   portfolio refactor; it supersedes the exploratory candidate list in `HANDOVER.md` §5.
3. Follow [`apps/portfolio/CLAUDE.md`](apps/portfolio/CLAUDE.md): binding conventions for the app and every coding agent.
4. For token work, read [`packages/tokens/README.md`](packages/tokens/README.md).

Before calling anything done, run from the repo root: `npm run validate`, then
`cd apps/portfolio && npx tsc --noEmit && npm run lint`, then `npm run portfolio:build`.
Never push to `main`, because it deploys to production. Use a branch and a draft PR.
