/**
 * Build entry point. Resolves every brand×theme permutation and runs one
 * Style Dictionary build per permutation, emitting CSS / TS / Tailwind / Figma
 * artifacts into ../build.
 */
import StyleDictionary from 'style-dictionary';
import { rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { resolveAllPermutations } from '../resolver/resolve.js';
import { registerMtHooks, makeConfig } from '../config/style-dictionary.js';
import { buildConsumer } from './build-consumer.js';

const here = path.dirname(fileURLToPath(import.meta.url));
const BUILD = path.resolve(here, '../build');

async function main(): Promise<void> {
  registerMtHooks();
  await rm(BUILD, { recursive: true, force: true });

  const perms = await resolveAllPermutations();
  for (const perm of perms) {
    const sd = new StyleDictionary(makeConfig(perm, BUILD));
    await sd.buildAllPlatforms();
    const count = (perm.tokens && Object.keys(perm.tokens).length) || 0;
    console.log(`  ✓ ${perm.name.padEnd(16)} (${count} top-level group(s))`);
  }
  console.log(`\n✔ Built ${perms.length} permutation(s) → ${path.relative(process.cwd(), BUILD)}`);

  const { vars, permWarnings } = await buildConsumer();
  console.log(`✔ Consumer API → build/consumer/ (tokens.css · tailwind-preset.cjs · index.js) — ${vars} tokens layered`);
  if (permWarnings.length) console.warn(`  ⚠ ${permWarnings.length} token(s) vary on both brand & theme (emitted to :root): ${permWarnings.join(', ')}`);
}

main().catch((err) => {
  console.error('\n✗ Build failed:\n', err);
  process.exit(1);
});
