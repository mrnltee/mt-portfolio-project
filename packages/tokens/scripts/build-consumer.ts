/**
 * Consumer artifact build (Stage 2A).
 *
 * Emits a clean, stable consumer API from the DTCG source — WITHOUT exposing the
 * internal per-permutation build layout:
 *
 *   build/consumer/tokens.css          layered CSS variables (--mt-*):
 *                                        :root            → primitives, components, non-color semantics
 *                                        [data-brand=a|b|c]→ brand foundation overrides
 *                                        [data-theme=…]    → semantic color overrides
 *                                      (brand-a + light are the attribute-less defaults)
 *   build/consumer/tailwind-preset.cjs var-based Tailwind preset (colors support <alpha-value>)
 *   build/consumer/index.js/.d.ts      typed var-reference map for JS/inline styles
 *
 * The layered model works because no token's *reference* varies on both axes at once:
 * brand tokens vary by brand, semantic colors vary by theme, everything else is invariant.
 * Composite shadows stay invariant (their member var()s recompose at runtime).
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fg from 'fast-glob';
import { resolveAllPermutations, type Permutation } from '../resolver/resolve.js';

const here = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.resolve(here, '../src');
const OUT = path.resolve(here, '../build/consumer');

type Json = Record<string, any>;
const isObj = (v: unknown): v is Json => typeof v === 'object' && v !== null && !Array.isArray(v);
const kebab = (p: string[]) => p.join('-');
const varName = (p: string[]) => `--mt-${kebab(p)}`;
const refToVar = (ref: string) => `--mt-${ref.replace(/[{}]/g, '').split('.').join('-')}`;
const SEMANTIC_COLOR_GROUPS = ['background', 'text', 'border', 'action', 'feedback', 'focus', 'overlay', 'shadow'];

/* ---------- value stringifiers (concrete literals) ---------- */
const dim = (v: any) => `${v.value}${v.unit}`;
const channels = (c: any) => c.components.map((n: number) => Math.round(n * 255)).join(' ');
const famToCss = (v: string[]) => v.map((f) => (/\s/.test(f) ? `"${f}"` : f)).join(', ');
function colorBase(v: any): string {
  if (v.alpha != null && v.alpha < 1) {
    const [r, g, b] = v.components.map((n: number) => Math.round(n * 255));
    return `rgba(${r}, ${g}, ${b}, ${v.alpha})`;
  }
  return v.hex;
}
function shadowCompose(v: any): string {
  const layers = Array.isArray(v) ? v : [v];
  const m = (x: any): string => (typeof x === 'string' && x.startsWith('{') ? `var(${refToVar(x)})` : typeof x === 'object' && 'value' in x ? dim(x) : String(x));
  return layers.map((l: any) => `${m(l.offsetX)} ${m(l.offsetY)} ${m(l.blur)} ${m(l.spread)} ${typeof l.color === 'string' && l.color.startsWith('{') ? `var(${refToVar(l.color)})` : colorBase(l.color)}`).join(', ');
}

/* ---------- flatten a permutation to path → { type, raw, ext } ---------- */
interface Leaf { type?: string; raw: any; ext?: any; }
function flatten(node: Json, trail: string[], out: Map<string, Leaf>, inherited?: string) {
  const type = (node.$type as string) ?? inherited;
  if ('$value' in node) { out.set(trail.join('.'), { type, raw: node.$value, ext: node.$extensions }); return; }
  for (const [k, v] of Object.entries(node)) if (!k.startsWith('$') && isObj(v)) flatten(v, [...trail, k], out, type);
}
function resolveTypes(map: Map<string, Leaf>) {
  const eff = (p: string, seen = new Set<string>()): string | undefined => {
    const l = map.get(p); if (!l) return undefined;
    if (l.type) return l.type;
    if (typeof l.raw === 'string' && !seen.has(p)) { seen.add(p); const m = l.raw.match(/^\{(.+)\}$/); if (m) return eff(m[1], seen); }
    return undefined;
  };
  for (const [p, l] of map) if (!l.type) l.type = eff(p);
}

/* ---------- CSS value + optional -rgb companion for a leaf ---------- */
function cssFor(name: string[], leaf: Leaf): string[] {
  const { type, raw, ext } = leaf;
  const lines: string[] = [];
  const isAlias = typeof raw === 'string' && raw.startsWith('{');
  let base: string;
  if (isAlias) base = `var(${refToVar(raw)})`;
  else if (type === 'color') base = colorBase(raw);
  else if (type === 'dimension' || type === 'duration') base = dim(raw);
  else if (type === 'cubicBezier') base = `cubic-bezier(${raw.join(', ')})`;
  else if (type === 'fontFamily') base = famToCss(raw);
  else if (type === 'shadow') base = shadowCompose(raw);
  else if (type === 'number') base = ext?.['org.mt']?.cssUnit ? `${raw}${ext['org.mt'].cssUnit}` : String(raw);
  else base = String(raw);
  lines.push(`  ${varName(name)}: ${base};`);
  if (type === 'color') lines.push(`  ${varName(name)}-rgb: ${isAlias ? `var(${refToVar(raw)}-rgb)` : channels(raw)};`);
  return lines;
}

/* ---------- variance classification across the 6 permutations ---------- */
type Axis = 'root' | 'brand' | 'theme' | 'perm';
function classify(vals: Map<string, string>, brands: string[], themes: string[]): Axis {
  const uniq = new Set(vals.values());
  if (uniq.size === 1) return 'root';
  const brandOnly = brands.every((b) => new Set(themes.map((t) => vals.get(`${b}|${t}`))).size === 1);
  if (brandOnly) return 'brand';
  const themeOnly = themes.every((t) => new Set(brands.map((b) => vals.get(`${b}|${t}`))).size === 1);
  if (themeOnly) return 'theme';
  return 'perm';
}

/* ================================================================ build ==== */
export async function buildConsumer(): Promise<{ vars: number; permWarnings: string[] }> {
  const perms = await resolveAllPermutations();
  const brands = [...new Set(perms.map((p) => p.brand))];
  const themes = [...new Set(perms.map((p) => p.theme))];
  const flat = new Map<string, Map<string, Leaf>>();
  for (const p of perms) { const m = new Map<string, Leaf>(); flatten(p.tokens as Json, [], m); resolveTypes(m); flat.set(`${p.brand}|${p.theme}`, m); }
  const anyKey = `${brands[0]}|${themes[0]}`;
  const paths = [...flat.get(anyKey)!.keys()];

  const buckets = { root: [] as string[], brand: { a: [] as string[], b: [] as string[], c: [] as string[] } as Record<string, string[]>, theme: { light: [] as string[], dark: [] as string[] } as Record<string, string[]> };
  const permWarnings: string[] = [];
  let varCount = 0;

  for (const pathStr of paths) {
    const p = pathStr.split('.');
    const rendered = new Map<string, string>(); // "brand|theme" → css lines joined
    for (const [key, m] of flat) rendered.set(key, cssFor(p, m.get(pathStr)!).join('\n'));
    const axis = classify(rendered, brands, themes);
    varCount++;
    if (axis === 'root') buckets.root.push(rendered.get(anyKey)!);
    else if (axis === 'brand') for (const b of brands) buckets.brand[b].push(rendered.get(`${b}|${themes[0]}`)!);
    else if (axis === 'theme') for (const t of themes) buckets.theme[t].push(rendered.get(`${brands[0]}|${t}`)!);
    else { permWarnings.push(pathStr); buckets.root.push(rendered.get(anyKey)!); }
  }

  const block = (sel: string, lines: string[]) => (lines.length ? `${sel} {\n${lines.join('\n')}\n}\n` : '');
  const css =
    `/** Generated by @mt/tokens. Layered runtime tokens. Do not edit. */\n` +
    `/** Defaults (no attributes) = brand A / light. Set data-brand + data-theme to switch. */\n\n` +
    block(':root', buckets.root) + '\n' +
    block(':root,\n[data-brand="a"]', buckets.brand.a) +
    block('[data-brand="b"]', buckets.brand.b) +
    block('[data-brand="c"]', buckets.brand.c) + '\n' +
    block(':root,\n[data-theme="light"]', buckets.theme.light) +
    block('[data-theme="dark"]', buckets.theme.dark);

  await mkdir(OUT, { recursive: true });
  await writeFile(path.join(OUT, 'tokens.css'), css, 'utf8');

  /* ---------------- Tailwind preset (var-based, <alpha-value> aware) ---------------- */
  const rep = flat.get('a|light')!;
  const repDark = flat.get('a|dark')!;
  const isAlphaColor = (pathStr: string): boolean => {
    for (const m of [rep, repDark]) {
      let cur: any = m.get(pathStr); // follow alias to leaf to read alpha
      const seen = new Set<string>();
      while (cur && typeof cur.raw === 'string' && cur.raw.startsWith('{')) { const t = cur.raw.slice(1, -1); if (seen.has(t)) break; seen.add(t); cur = m.get(t); }
      if (cur && cur.type === 'color' && isObj(cur.raw) && cur.raw.alpha != null && cur.raw.alpha < 1) return true;
    }
    return false;
  };
  const setDeep = (o: Json, keys: string[], val: any) => { let n = o; keys.forEach((k, i) => (i === keys.length - 1 ? (n[k] = val) : (n = n[k] = n[k] ?? {}))); };
  const colors: Json = {}, spacing: Json = {}, borderRadius: Json = {}, boxShadow: Json = {}, fontFamily: Json = {}, fontSize: Json = {}, sizing: Json = {};
  const transitionDuration: Json = {}, transitionTimingFunction: Json = {};
  for (const pathStr of paths) {
    const p = pathStr.split('.');
    const n = varName(p);
    if (p[0] === 'color' && SEMANTIC_COLOR_GROUPS.includes(p[1]) && rep.get(pathStr)!.type === 'color')
      setDeep(colors, p.slice(1), isAlphaColor(pathStr) ? `var(${n})` : `rgb(var(${n}-rgb) / <alpha-value>)`);
    else if (p[0] === 'space') spacing[p.slice(1).join('-')] = `var(${n})`;
    else if (p[0] === 'shape' && p[1] === 'radius') borderRadius[p[2]] = `var(${n})`;
    else if (p[0] === 'elevation') boxShadow[p[1]] = `var(${n})`;
    else if (p[0] === 'brand' && p[1] === 'font' && p[2] === 'family') fontFamily[p[3]] = [`var(${n})`];
    else if (p[0] === 'size' && (p[1] === 'control' || p[1] === 'icon')) sizing[`${p[1]}-${p[2]}`] = `var(${n})`;
    else if (p[0] === 'motion' && p[1] === 'duration') transitionDuration[p[2]] = `var(${n})`;
    else if (p[0] === 'motion' && p[1] === 'easing') transitionTimingFunction[p[2]] = `var(${n})`;
    else if (p[0] === 'text' && p[2] === 'font-size') {
      const role = p[1];
      fontSize[role] = [`var(--mt-text-${role}-font-size)`, { lineHeight: `var(--mt-text-${role}-line-height)`, letterSpacing: `var(--mt-text-${role}-letter-spacing)` }];
    }
  }
  // Control/icon sizes → height/width/size utilities; motion → duration-*/ease-* utilities.
  const preset = { theme: { extend: { colors, spacing, borderRadius, boxShadow, fontFamily, fontSize, height: sizing, width: sizing, minHeight: sizing, size: sizing, transitionDuration, transitionTimingFunction } } };
  await writeFile(path.join(OUT, 'tailwind-preset.cjs'), `/** Generated by @mt/tokens. Var-based Tailwind preset. Do not edit. */\nmodule.exports = ${JSON.stringify(preset, null, 2)};\n`, 'utf8');

  /* ---------------- TS var-reference map (semantic + component only) ---------------- */
  const files = await fg(['semantic/**/*.json', 'component/**/*.json'], { cwd: SRC });
  const tsRoot: Json = {};
  for (const rel of files) {
    const json = JSON.parse(await readFile(path.join(SRC, rel), 'utf8'));
    const collect = (node: Json, trail: string[]) => {
      if ('$value' in node) { setDeep(tsRoot, trail, `var(${varName(trail)})`); return; }
      for (const [k, v] of Object.entries(node)) if (!k.startsWith('$') && isObj(v)) collect(v, [...trail, k]);
    };
    collect(json, []);
  }
  const body = JSON.stringify(tsRoot, null, 2);
  await writeFile(path.join(OUT, 'index.js'), `// Generated by @mt/tokens. CSS var references (theme/brand-agnostic). Do not edit.\nexport const tokens = ${body};\n`, 'utf8');
  await writeFile(path.join(OUT, 'index.d.ts'), `// Generated by @mt/tokens. Do not edit.\nexport declare const tokens: ${body.replace(/"var\([^)]*\)"/g, 'string')};\n`, 'utf8');

  /* ---------------- metadata.json (documentation API) ---------------- *
   * One record per token: name, path, type, tier, description, reference (the
   * semantic→brand/primitive relationship), the runtime CSS var, and the RESOLVED
   * display value for every brand×theme permutation. Derived entirely from the
   * generated figma payloads + DTCG source — no duplicated token values.        */
  const permNames = perms.map((p) => `${p.brand}-${p.theme}`);
  const payloads: Record<string, any[]> = {};
  for (const p of perms) payloads[`${p.brand}-${p.theme}`] = JSON.parse(await readFile(path.resolve(here, `../build/figma/${p.name}.json`), 'utf8')).tokens;
  // tier + description from source
  const tierOf = new Map<string, string>();
  const descOf = new Map<string, string>();
  const srcAll = await fg('**/*.json', { cwd: SRC });
  for (const rel of srcAll) {
    const tier = rel.split('/')[0];
    const json = JSON.parse(await readFile(path.join(SRC, rel), 'utf8'));
    const w = (node: Json, trail: string[]) => {
      if ('$value' in node) { const nm = trail.join('-'); tierOf.set(nm, tier); if (node.$description) descOf.set(nm, node.$description); return; }
      for (const [k, v] of Object.entries(node)) if (!k.startsWith('$') && isObj(v)) w(v, [...trail, k]);
    };
    w(json, []);
  }
  const fmt = (type: string | undefined, value: any): string => {
    if (value == null) return '';
    if (type === 'color') return value.alpha != null && value.alpha < 1 ? `rgba(${value.components.map((n: number) => Math.round(n * 255)).join(', ')}, ${value.alpha})` : value.hex;
    if (type === 'dimension' || type === 'duration') return typeof value === 'object' ? `${value.value}${value.unit}` : String(value);
    if (type === 'fontFamily') return Array.isArray(value) ? value.join(', ') : String(value);
    if (type === 'cubicBezier') return `cubic-bezier(${(value as number[]).join(', ')})`;
    if (type === 'shadow') return shadowCompose(value);
    return String(value);
  };
  const base = payloads[permNames[0]];
  const metaTokens = base.map((t) => {
    const values: Record<string, string> = {};
    for (const pn of permNames) { const tt = payloads[pn].find((x) => x.name === t.name); values[pn] = fmt(tt?.type, tt?.value); }
    return { name: t.name, path: t.path, type: t.type, tier: tierOf.get(t.name), ...(descOf.get(t.name) ? { description: descOf.get(t.name) } : {}), ...(t.reference ? { reference: t.reference } : {}), cssVar: `--mt-${t.name}`, values };
  });
  await writeFile(path.join(OUT, 'metadata.json'), JSON.stringify({ brands, themes, permutations: permNames, tokens: metaTokens }, null, 2) + '\n', 'utf8');

  /* ---------------- @mt/tokens/motion (raw values for JS / Framer Motion) ---------------- *
   * Motion is brand- and theme-invariant, so one flat object of raw numbers/arrays — NOT CSS
   * var references (Framer needs actual values). Duration is milliseconds; easing is a
   * cubic-bezier control-point array. Derived from the semantic motion tokens.               */
  const motionDur: Record<string, number> = {};
  const motionEase: Record<string, number[]> = {};
  for (const t of metaTokens) {
    if (t.path[0] !== 'motion') continue;
    const key = t.path[2];
    const v = t.values[permNames[0]];
    if (t.path[1] === 'duration') motionDur[key] = parseFloat(v); // "250ms" → 250
    else if (t.path[1] === 'easing') motionEase[key] = (v.match(/-?\d*\.?\d+/g) || []).map(Number); // "cubic-bezier(a,b,c,d)" → [a,b,c,d]
  }
  const motionObj = { duration: motionDur, easing: motionEase };
  const motionBody = JSON.stringify(motionObj, null, 2);
  await writeFile(path.join(OUT, 'motion.js'), `// Generated by @mt/tokens. Raw motion values (ms + cubic-bezier arrays) for JS/Framer. Do not edit.\nexport const motion = ${motionBody};\n`, 'utf8');
  await writeFile(
    path.join(OUT, 'motion.d.ts'),
    `// Generated by @mt/tokens. Do not edit.\nexport declare const motion: {\n  duration: { ${Object.keys(motionDur).map((k) => `${k}: number`).join('; ')} };\n  easing: { ${Object.keys(motionEase).map((k) => `${k}: [number, number, number, number]`).join('; ')} };\n};\n`,
    'utf8',
  );

  return { vars: varCount, permWarnings };
}
