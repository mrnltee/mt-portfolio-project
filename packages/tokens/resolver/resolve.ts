/**
 * Resolver — expands the manifest's {brand} × {theme} dimensions into concrete
 * token sets by composing (deep-merging) the DTCG source files in `compose` order.
 *
 * Tool-agnostic: this reads plain DTCG JSON and produces a plain merged token
 * object per permutation. It knows nothing about Style Dictionary or Figma — those
 * are downstream consumers of the output.
 */
import fg from 'fast-glob';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.resolve(here, '../src');
const MANIFEST = path.resolve(here, './manifest.json');

export interface Manifest {
  name: string;
  version: string;
  dimensions: Record<string, string[]>;
  sets: Record<string, string[]>;
  compose: string[];
  output: { permutationName: string };
}

export interface Permutation {
  brand: string;
  theme: string;
  name: string;
  tokens: Record<string, unknown>;
}

type Json = Record<string, unknown>;

const isObject = (v: unknown): v is Json =>
  typeof v === 'object' && v !== null && !Array.isArray(v);

/** Deep-merge plain objects; later sources win on scalar conflicts. */
function deepMerge(a: Json, b: Json): Json {
  const out: Json = { ...a };
  for (const [k, v] of Object.entries(b)) {
    const prev = out[k];
    out[k] = isObject(prev) && isObject(v) ? deepMerge(prev, v) : v;
  }
  return out;
}

function substitute(pattern: string, vars: Record<string, string>): string {
  return pattern.replace(/\{(\w+)\}/g, (_, key: string) => vars[key] ?? `{${key}}`);
}

export async function loadManifest(): Promise<Manifest> {
  return JSON.parse(await readFile(MANIFEST, 'utf8')) as Manifest;
}

async function resolvePermutation(m: Manifest, vars: Record<string, string>): Promise<Json> {
  let merged: Json = {};
  for (const setName of m.compose) {
    const patterns = (m.sets[setName] ?? []).map((p) => substitute(p, vars));
    const files = (await fg(patterns, { cwd: SRC, absolute: true })).sort();
    for (const file of files) {
      const json = JSON.parse(await readFile(file, 'utf8')) as Json;
      merged = deepMerge(merged, json);
    }
  }
  return merged;
}

export async function resolveAllPermutations(): Promise<Permutation[]> {
  const m = await loadManifest();
  const brands = m.dimensions.brand ?? [];
  const themes = m.dimensions.theme ?? [];
  const perms: Permutation[] = [];
  for (const brand of brands) {
    for (const theme of themes) {
      const vars = { brand, theme };
      const tokens = await resolvePermutation(m, vars);
      perms.push({ brand, theme, name: substitute(m.output.permutationName, vars), tokens });
    }
  }
  return perms;
}
