/**
 * Architecture-enforcing validator for @mt/tokens.
 *
 * Enforces (not just JSON syntax):
 *  1. DTCG structure       — a node is a token (has $value) XOR a group (has children); no mixed.
 *  2. $type presence       — every token resolves a $type (self or inherited).
 *  3. Unresolved refs      — every {alias} points to a declared token.
 *  4. Circular refs        — no reference cycles.
 *  5. Tier edges           — primitive=literal; brand→primitive; semantic→primitive|brand|semantic;
 *                            component→semantic ONLY (flags component→primitive/brand directly).
 *  6. Conflicts            — no leaf path written by two files within one permutation.
 *  7. Theme symmetry       — color.light and color.dark declare identical path sets.
 *  8. Required roles       — every permutation exposes the required semantic contract.
 *  9. Brand/theme matrix   — all 6 permutations resolve cleanly.
 * 10. WCAG AA contrast     — required text/UI role pairs meet AA in every permutation.
 */
import fg from 'fast-glob';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { loadManifest, resolveAllPermutations, type Permutation } from '../resolver/resolve.js';

const here = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.resolve(here, '../src');

type Tier = 'primitive' | 'brand' | 'semantic' | 'component';
type Json = Record<string, any>;
const isObject = (v: unknown): v is Json => typeof v === 'object' && v !== null && !Array.isArray(v);
const isToken = (v: unknown): v is Json => isObject(v) && '$value' in v;

const problems: string[] = [];
const fail = (msg: string) => problems.push(msg);

interface Leaf { pathStr: string; tier: Tier; type?: string; value: unknown; file: string; }
const leaves: Leaf[] = [];
const pathTier = new Map<string, Tier>();
const pathType = new Map<string, string | undefined>();

/* ---- 1,2: walk raw source files for structure + $type, collect leaves ---- */
function walk(node: Json, trail: string[], tier: Tier, file: string, inheritedType?: string) {
  const type = (node.$type as string) ?? inheritedType;
  const childKeys = Object.keys(node).filter((k) => !k.startsWith('$'));
  if ('$value' in node) {
    if (childKeys.length) fail(`[structure] ${file}: "${trail.join('.')}" has both $value and children`);
    const pathStr = trail.join('.');
    leaves.push({ pathStr, tier, type, value: node.$value, file });
    pathTier.set(pathStr, tier);
    pathType.set(pathStr, type);
    return;
  }
  for (const k of childKeys) {
    const child = node[k];
    if (!isObject(child)) { fail(`[structure] ${file}: "${[...trail, k].join('.')}" is not a group or token`); continue; }
    walk(child, [...trail, k], tier, file, type);
  }
}

/* ---- reference extraction ---- */
const REF = /\{([^}]+)\}/g;
function refsIn(value: unknown, out: string[] = []): string[] {
  if (typeof value === 'string') for (const m of value.matchAll(REF)) out.push(m[1]!);
  else if (Array.isArray(value)) value.forEach((v) => refsIn(v, out));
  else if (isObject(value)) Object.values(value).forEach((v) => refsIn(v, out));
  return out;
}

/* ---- 5: tier edge rules ---- */
const allowed: Record<Tier, Tier[]> = {
  primitive: [],
  brand: ['primitive'],
  semantic: ['primitive', 'brand', 'semantic'],
  component: ['semantic'],
};

/* ---- 10: WCAG contrast helpers ---- */
type ColorObj = { components: number[]; alpha?: number; hex?: string };
const chan = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const lum = ([r, g, b]: number[]) => 0.2126 * chan(r) + 0.7152 * chan(g) + 0.0722 * chan(b);
const ratio = (a: number[], b: number[]) => {
  const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
};
function resolveColor(tokens: Json, pathStr: string, seen = new Set<string>()): ColorObj | undefined {
  if (seen.has(pathStr)) return undefined;
  seen.add(pathStr);
  const node = pathStr.split('.').reduce<any>((n, k) => (n ? n[k] : undefined), tokens);
  const v = node?.$value;
  if (typeof v === 'string') { const m = v.match(/^\{(.+)\}$/); return m ? resolveColor(tokens, m[1]!, seen) : undefined; }
  if (isObject(v) && Array.isArray(v.components)) return v as ColorObj;
  return undefined;
}
const CONTRAST: Array<[string, string, number, string]> = [
  ['color.text.primary', 'color.background.canvas', 4.5, 'text primary / canvas'],
  ['color.text.primary', 'color.background.surface', 4.5, 'text primary / surface'],
  ['color.text.secondary', 'color.background.canvas', 4.5, 'text secondary / canvas'],
  ['color.text.tertiary', 'color.background.canvas', 4.5, 'text tertiary / canvas'],
  ['color.text.link', 'color.background.canvas', 4.5, 'link / canvas'],
  ['color.text.inverse', 'color.background.inverse', 4.5, 'text inverse / inverse'],
  ['color.action.on-primary', 'color.action.primary', 4.5, 'on-primary / primary'],
  ['color.action.on-secondary', 'color.action.secondary', 4.5, 'on-secondary / secondary'],
  ['color.action.on-destructive', 'color.action.destructive', 4.5, 'on-destructive / destructive'],
  ['color.feedback.on-success', 'color.feedback.success-surface', 4.5, 'on-success / success-surface'],
  ['color.feedback.on-warning', 'color.feedback.warning-surface', 4.5, 'on-warning / warning-surface'],
  ['color.feedback.on-error', 'color.feedback.error-surface', 4.5, 'on-error / error-surface'],
  ['color.feedback.on-info', 'color.feedback.info-surface', 4.5, 'on-info / info-surface'],
  ['color.focus.ring', 'color.background.surface', 3.0, 'focus ring / surface'],
  ['color.border.focus', 'color.background.canvas', 3.0, 'border focus / canvas'],
];

/* ---- 8: required semantic contract ---- */
const REQUIRED = [
  'color.background.canvas', 'color.background.surface', 'color.background.surface-subtle', 'color.background.inverse', 'color.background.disabled',
  'color.text.primary', 'color.text.secondary', 'color.text.tertiary', 'color.text.disabled', 'color.text.inverse', 'color.text.link',
  'color.border.default', 'color.border.subtle', 'color.border.strong', 'color.border.focus',
  'color.action.primary', 'color.action.primary-hover', 'color.action.primary-pressed', 'color.action.secondary', 'color.action.destructive',
  'color.feedback.success', 'color.feedback.warning', 'color.feedback.error', 'color.feedback.info',
  'color.focus.ring',
];
const hasPath = (tokens: Json, p: string) => isToken(p.split('.').reduce<any>((n, k) => (n ? n[k] : undefined), tokens));

/* ================================================================ run ==== */
async function main() {
  const files = (await fg('**/*.json', { cwd: SRC })).sort();
  for (const rel of files) {
    const tier = rel.split('/')[0] as Tier;
    const json = JSON.parse(await readFile(path.join(SRC, rel), 'utf8')) as Json;
    walk(json, [], tier, rel);
  }

  // 2: resolve each token's $type (self, inherited, or via alias — valid DTCG for aliases)
  const leafByPath = new Map(leaves.map((l) => [l.pathStr, l]));
  const effType = (p: string, seen = new Set<string>()): string | undefined => {
    const l = leafByPath.get(p);
    if (!l) return undefined;
    if (l.type) return l.type;
    if (typeof l.value === 'string' && !seen.has(p)) {
      seen.add(p);
      const m = (l.value as string).match(/^\{(.+)\}$/);
      if (m) return effType(m[1]!, seen);
    }
    return undefined;
  };
  for (const l of leaves) {
    if (!l.type) {
      const t = effType(l.pathStr);
      if (t) l.type = t;
      else fail(`[type] ${l.file}: "${l.pathStr}" has no resolvable $type (self, inherited, or via alias)`);
    }
  }

  // 3,4,5: resolve refs against the global declared set
  const declared = new Set(pathTier.keys());
  const graph = new Map<string, string[]>();
  for (const leaf of leaves) {
    const refs = refsIn(leaf.value);
    graph.set(leaf.pathStr, refs);
    for (const ref of refs) {
      if (!declared.has(ref)) { fail(`[unresolved] ${leaf.file}: "${leaf.pathStr}" → {${ref}} not declared`); continue; }
      const tgt = pathTier.get(ref)!;
      if (!allowed[leaf.tier].includes(tgt)) {
        const extra = leaf.tier === 'component' && tgt !== 'semantic' ? ' (component tokens must reference semantic, not ' + tgt + ')' : '';
        fail(`[tier] ${leaf.pathStr} (${leaf.tier}) → ${ref} (${tgt}) violates ${leaf.tier}→${allowed[leaf.tier].join('|') || 'literal only'}${extra}`);
      }
    }
  }
  // circular
  const state = new Map<string, number>(); // 0=visiting,1=done
  const dfs = (n: string, stack: string[]): void => {
    if (state.get(n) === 1) return;
    if (state.get(n) === 0) { fail(`[circular] ${[...stack, n].join(' → ')}`); return; }
    state.set(n, 0);
    for (const r of graph.get(n) ?? []) if (declared.has(r)) dfs(r, [...stack, n]);
    state.set(n, 1);
  };
  for (const n of graph.keys()) dfs(n, []);

  // 6: conflicts within each permutation (provenance merge over the perm's files)
  const manifest = await loadManifest();
  const sub = (p: string, v: Record<string, string>) => p.replace(/\{(\w+)\}/g, (_, k) => v[k] ?? `{${k}}`);
  for (const brand of manifest.dimensions.brand) {
    for (const theme of manifest.dimensions.theme) {
      const seen = new Map<string, string>();
      for (const setName of manifest.compose) {
        const patterns = manifest.sets[setName].map((p) => sub(p, { brand, theme }));
        const permFiles = (await fg(patterns, { cwd: SRC })).sort();
        for (const rel of permFiles) {
          for (const leaf of leaves.filter((l) => l.file === rel)) {
            if (seen.has(leaf.pathStr) && seen.get(leaf.pathStr) !== rel) fail(`[conflict] ${brand}/${theme}: "${leaf.pathStr}" defined by both ${seen.get(leaf.pathStr)} and ${rel}`);
            seen.set(leaf.pathStr, rel);
          }
        }
      }
    }
  }

  // 6b: brand-invariant roles (status/feedback) — declared in manifest.invariants
  const inv = (manifest as any).invariants as { brandInvariantRoles?: string[]; statusRampRoots?: string[] } | undefined;
  if (inv?.brandInvariantRoles) {
    const roots = new Set(inv.statusRampRoots ?? []);
    for (const role of inv.brandInvariantRoles) {
      const leafName = role.split('.').pop()!;
      // (a) semantic tokens under the role must reference primitive status ramps only
      for (const leaf of leaves.filter((l) => l.tier === 'semantic' && (l.pathStr === role || l.pathStr.startsWith(role + '.')))) {
        for (const ref of refsIn(leaf.value)) {
          const tgtTier = pathTier.get(ref);
          const hue = ref.split('.')[1];
          if (tgtTier !== 'primitive' || !roots.has(hue))
            fail(`[invariant] brand-invariant role "${leaf.pathStr}" must reference a primitive status ramp (${[...roots].join('/')}); found {${ref}} (${tgtTier ?? 'unknown'})`);
        }
      }
      // (b) no brand token may (re)define the invariant role
      for (const leaf of leaves.filter((l) => l.tier === 'brand' && l.pathStr.includes('.' + leafName)))
        fail(`[invariant] brand token "${leaf.pathStr}" must not define brand-invariant role "${role}" (feedback/status is system-level)`);
    }
  }

  // 7: theme symmetry
  const setOf = (file: string) => new Set(leaves.filter((l) => l.file === file).map((l) => l.pathStr));
  const light = setOf('semantic/color.light.json');
  const dark = setOf('semantic/color.dark.json');
  for (const p of light) if (!dark.has(p)) fail(`[theme-symmetry] "${p}" in color.light but missing in color.dark`);
  for (const p of dark) if (!light.has(p)) fail(`[theme-symmetry] "${p}" in color.dark but missing in color.light`);

  // 8,9,10: per-permutation required roles + contrast
  const perms = await resolveAllPermutations();
  const contrastRows: string[] = [];
  for (const perm of perms) {
    for (const req of REQUIRED) if (!hasPath(perm.tokens as Json, req)) fail(`[required] ${perm.name}: missing required role "${req}"`);
    for (const [fgP, bgP, min, label] of CONTRAST) {
      const f = resolveColor(perm.tokens as Json, fgP);
      const b = resolveColor(perm.tokens as Json, bgP);
      if (!f || !b) { fail(`[contrast] ${perm.name}: cannot resolve ${label}`); continue; }
      const r = ratio(f.components, b.components);
      if (r < min) fail(`[contrast] ${perm.name}: ${label} = ${r.toFixed(2)} < AA ${min}`);
      if (process.env.MT_CONTRAST) contrastRows.push(`${perm.name.padEnd(14)} ${label.padEnd(34)} ${r.toFixed(2)} (min ${min})`);
    }
  }
  if (process.env.MT_CONTRAST) console.log(contrastRows.join('\n'));

  // report
  console.log(`\nChecked ${leaves.length} tokens across ${files.length} files, ${perms.length} permutations.`);
  if (problems.length === 0) {
    console.log('✔ Validation passed — architecture, references, theme symmetry, and WCAG AA all hold.');
    process.exit(0);
  }
  console.log(`✗ Validation failed (${problems.length} issue(s)):`);
  for (const p of problems) console.log('  ' + p);
  process.exit(1);
}

main().catch((err) => { console.error('\n✗ Validation errored:\n', err); process.exit(1); });
