// Checks that browser Back restores the scroll position on /case-studies.
//
//   npm run build               # static export to out/
//   npm run test:scroll         # serves out/ itself, then runs the check
//
// Pass a URL to test a site that is already running instead:
//   npm run test:scroll -- http://localhost:3000
//
// First time on a new machine: `npx playwright install chromium`.
//
// The card is clicked BY POSITION with page.mouse.click, like a person would.
// Do not switch to locator.click(): Playwright first scrolls the <a> (the
// title text, not its stretched ::after) into view. That moves the page from
// ~794 px to 256 px before the click, the browser saves 256 for Back, and the
// check reports a bug the site does not have.

import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const OUT_DIR = resolve(fileURLToPath(new URL("../out", import.meta.url)));
const VIEWPORT = { width: 1280, height: 800 };
const TOLERANCE_PX = 4;
const CONFIGS = [
  { theme: "light", reducedMotion: "no-preference" },
  { theme: "dark", reducedMotion: "no-preference" },
  { theme: "light", reducedMotion: "reduce" },
  { theme: "dark", reducedMotion: "reduce" },
];

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".ico": "image/x-icon",
  ".pdf": "application/pdf",
};

/** Minimal static server for out/, resolving /path to path, path.html or path/index.html. */
async function serveOut() {
  try {
    await stat(join(OUT_DIR, "case-studies.html"));
  } catch {
    throw new Error(`No static export in ${OUT_DIR}. Run \`npm run build\` first.`);
  }
  const server = createServer(async (req, res) => {
    const pathname = decodeURIComponent(new URL(req.url, "http://x").pathname);
    const base = normalize(join(OUT_DIR, pathname));
    if (!base.startsWith(OUT_DIR)) {
      res.writeHead(403).end();
      return;
    }
    for (const file of [base, `${base}.html`, join(base, "index.html")]) {
      try {
        if (!(await stat(file)).isFile()) continue;
        res.writeHead(200, { "Content-Type": MIME[extname(file)] ?? "application/octet-stream" });
        res.end(await readFile(file));
        return;
      } catch {
        // try the next candidate
      }
    }
    res.writeHead(404).end();
  });
  await new Promise((done) => server.listen(0, "127.0.0.1", done));
  return { server, url: `http://127.0.0.1:${server.address().port}` };
}

async function check(browser, baseUrl, { theme, reducedMotion }) {
  const ctx = await browser.newContext({ viewport: VIEWPORT, reducedMotion });
  // next-themes reads localStorage("theme") before first paint.
  await ctx.addInitScript((t) => localStorage.setItem("theme", t), theme);
  const page = await ctx.newPage();

  try {
    await page.goto(`${baseUrl}/case-studies`);
    await page.waitForLoadState("networkidle");

    // 1. Scroll down ~800 px with the wheel, then let smooth scrolling settle.
    await page.mouse.move(VIEWPORT.width / 2, VIEWPORT.height / 2);
    for (let i = 0; i < 8; i++) {
      await page.mouse.wheel(0, 100);
      await page.waitForTimeout(60);
    }
    await page.waitForTimeout(800);
    const before = await page.evaluate(() => window.scrollY);

    // 2. Click the first card where it is visible: below the sticky header, inside the viewport.
    const link = page.locator('main a[href^="/case-studies/"]').first();
    const href = await link.getAttribute("href");
    const point = await link.evaluate((a, viewportHeight) => {
      const card = a.closest(".group").getBoundingClientRect();
      const headerBottom = document.querySelector("header").getBoundingClientRect().bottom;
      const top = Math.max(card.top, headerBottom);
      const bottom = Math.min(card.bottom, viewportHeight);
      if (bottom - top < 4) return null;
      return { x: (card.left + card.right) / 2, y: (top + bottom) / 2 };
    }, VIEWPORT.height);
    if (!point) throw new Error(`first card is not visible at scrollY=${before}`);

    await page.mouse.click(point.x, point.y);
    // Client-side navigation fires no "load" event, so wait for the URL to commit.
    await page.waitForURL(`**${href}`, { waitUntil: "commit" });
    await page.waitForTimeout(1000);

    // 3. Back.
    await page.goBack({ waitUntil: "commit" });
    await page.waitForURL("**/case-studies", { waitUntil: "commit" });
    await page.waitForTimeout(1200);

    const after = await page.evaluate(() => window.scrollY);
    const appliedTheme = await page.evaluate(() => document.documentElement.dataset.theme);
    const ok = Math.abs(after - before) <= TOLERANCE_PX && appliedTheme === theme;
    console.log(
      `${ok ? "PASS" : "FAIL"}  ${theme.padEnd(5)} ${reducedMotion.padEnd(13)} ` +
        `before=${before} after=${after} theme=${appliedTheme}`,
    );
    return ok;
  } catch (error) {
    console.log(`FAIL  ${theme.padEnd(5)} ${reducedMotion.padEnd(13)} ${error.message}`);
    return false;
  } finally {
    await ctx.close();
  }
}

const target = process.argv[2];
const served = target ? null : await serveOut();
const baseUrl = (target ?? served.url).replace(/\/$/, "");
const browser = await chromium.launch();
let allOk = true;
try {
  for (const config of CONFIGS) {
    allOk = (await check(browser, baseUrl, config)) && allOk;
  }
} finally {
  await browser.close();
  served?.server.close();
}
process.exitCode = allOk ? 0 : 1;
