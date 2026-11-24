# Mernel Tusoy — Portfolio

Product design portfolio built with Next.js 16 (App Router, React 19), TypeScript, Tailwind CSS, and
Framer Motion. Fully static, no backend required.

See [`CLAUDE.md`](./CLAUDE.md) for the design token system, folder structure, and editing
conventions before making changes.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Where content lives

- **Case studies** — edit `lib/projects-data.ts` (drives the home page grid, the case-studies
  index, filter tags, and every `/case-studies/[slug]` page). Add each new study as an object
  in `caseStudies`.
- **About / Contact copy** — `app/about/page.tsx`, `app/contact/page.tsx`.
- **Images** — case-study screenshots live in `public/images/`; pass `src`/`srcDark` to
  `<ImagePlaceholder />` for theme-aware rendering (see the doc comment in
  `components/ui/image-placeholder.tsx`).
- **Contact links** — the email and LinkedIn URL in `app/contact/page.tsx` and
  `components/layout/footer.tsx`.
- **Metadata** — `app/layout.tsx` `metadata` export (title/description), plus per-page
  `metadata` exports.

## Scripts

```bash
npm run dev      # start the dev server
npm run build    # static export to out/
npx serve out    # preview the exported site locally
npm run lint     # eslint
```

## Deploying

The app is a **static export** (`output: "export"` in `next.config.mjs`): `npm run build`
writes a plain HTML/CSS/JS site to `out/`. It is hosted on **Cloudflare Pages**, connected to
this GitHub repo, so every push to `main` deploys.

Cloudflare Pages build settings (project root = the monorepo root):

| Setting | Value |
| --- | --- |
| Framework preset | None |
| Build command | `npm run portfolio:build` |
| Build output directory | `apps/portfolio/out` |
| Root directory | *(leave empty)* |
| Environment variable | `NODE_VERSION` = `24` |

Analytics: turn on **Web Analytics** in the Pages project (no code needed). Vercel Analytics
only loads when the site is built on Vercel.

No environment variables, API routes, or database are required. Because nothing runs on a
server, image optimisation is off: resize screenshots before adding them to `public/`.
