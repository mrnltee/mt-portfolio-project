/**
 * Validation — Phase 0 scope: structural + alias-integrity checks over the
 * resolved permutations. Later phases extend this with full DTCG schema
 * validation, tier-reference rules (semantic → primitive/brand only; component →
 * semantic only), and WCAG contrast checks on role pairs.
 */
import { resolveAllPermutations, type Permutation } from '../resolver/resolve.js';

type Json = Record<string, unknown>;
const isObject = (v: unknown): v is Json =>
  typeof v === 'object' && v !== null && !Array.isArray(v);

/** Collect every declared token path and every alias reference in a token tree. */
function collect(node: Json, trail: string[], declared: Set<string>, refs: string[]): void {
  const value = (node as { $value?: unknown }).$value;
  if (value !== undefined) {
    declared.add(trail.join('.'));
    const scan = (v: unknown): void => {
      if (typeof v === 'string') {
        for (const m of v.matchAll(/\{([^}]+)\}/g)) refs.push(m[1]!);
      } else if (Array.isArray(v)) v.forEach(scan);
      else if (isObject(v)) Object.values(v).forEach(scan);
    };
    scan(value);
    return;
  }
  for (const [k, child] of Object.entries(node)) {
    if (k.startsWith('$')) continue;
    if (isObject(child)) collect(child, [...trail, k], declared, refs);
  }
}

function analyze(perm: Permutation): string[] {
  const declared = new Set<string>();
  const refs: string[] = [];
  collect(perm.tokens as Json, [], declared, refs);
  return refs.filter((r) => !declared.has(r)); // unresolved aliases
}

async function main(): Promise<void> {
  const perms = await resolveAllPermutations();
  let problems = 0;

  for (const perm of perms) {
    const unresolved = analyze(perm);
    if (unresolved.length) {
      problems += unresolved.length;
      console.warn(`  ✗ ${perm.name}: ${unresolved.length} unresolved alias(es): ${unresolved.join(', ')}`);
    } else {
      console.log(`  ✓ ${perm.name}: structure OK, aliases resolve`);
    }
  }

  // TODO (Phase 4): WCAG contrast checks on semantic role pairs.
  console.log(problems === 0 ? '\n✔ Validation passed' : `\n✗ Validation failed (${problems} issue(s))`);
  process.exit(problems === 0 ? 0 : 1);
}

main().catch((err) => {
  console.error('\n✗ Validation errored:\n', err);
  process.exit(1);
});
