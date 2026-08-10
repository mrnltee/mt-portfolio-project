import metadata from "@mt/tokens/metadata";
import { hexToHsl } from "@/lib/color";

/**
 * Documents the @mt/tokens color system. All names, relationships and resolved
 * values come from `@mt/tokens/metadata` (single source of truth); live swatches
 * render through the `--mt-*` CSS variables, so they update with the theme toggle.
 */
interface Tok {
  name: string;
  path: string[];
  type?: string;
  tier?: string;
  reference?: string;
  cssVar: string;
  values: Record<string, string>;
}
const tokens = (metadata as { tokens: Tok[] }).tokens;
const cleanRef = (r?: string) => (r ? r.replace(/[{}]/g, "") : "—");

function PrimitiveRow({ name, hex }: { name: string; hex: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 shrink-0 rounded-field border border-border-default" style={{ backgroundColor: hex }} aria-hidden="true" />
      <div className="min-w-0">
        <p className="truncate text-caption font-medium text-text-primary">{name}</p>
        <p className="truncate text-caption text-text-secondary">{hex} · {hexToHsl(hex)}</p>
      </div>
    </div>
  );
}

/**
 * Compact swatch for narrow, multi-up layouts (e.g. the 3-up status ramps): the
 * step number sits *beneath* the chip instead of beside it, so nothing clips when
 * the column is too narrow to fit a label alongside the swatch. Hex is on hover.
 */
function PrimitiveChip({ step, hex }: { step: string; hex: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5" title={`${hex} · ${hexToHsl(hex)}`}>
      <div className="aspect-square w-full rounded-field border border-border-default" style={{ backgroundColor: hex }} aria-hidden="true" />
      <span className="text-caption text-text-secondary">{step}</span>
    </div>
  );
}

function PrimitiveScale({ title, ramp, compact = false }: { title: string; ramp: string; compact?: boolean }) {
  const steps = tokens
    .filter((t) => t.tier === "primitive" && t.type === "color" && t.path[0] === "color" && t.path[1] === ramp && t.path.length === 3)
    .sort((a, b) => Number(a.path[2]) - Number(b.path[2]));
  if (!steps.length) return null;
  return (
    <div>
      <h3 className="font-display text-h4 font-semibold text-text-primary">{title}</h3>
      {compact ? (
        <div className="mt-4 grid grid-cols-5 gap-2">
          {steps.map((t) => (
            <PrimitiveChip key={t.name} step={t.path[2]} hex={t.values["a-light"]} />
          ))}
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {steps.map((t) => (
            <PrimitiveRow key={t.name} name={`${ramp}-${t.path[2]}`} hex={t.values["a-light"]} />
          ))}
        </div>
      )}
    </div>
  );
}

const STATUS: [string, string][] = [
  ["Success", "green"],
  ["Warning", "amber"],
  ["Error", "red"],
];

export function ColorSection() {
  const semantic = tokens.filter((t) => t.tier === "semantic" && t.type === "color" && t.path[0] === "color");
  return (
    <div className="space-y-14">
      <div>
        <p className="max-w-2xl text-body text-text-secondary">
          Colors follow the <strong className="text-text-primary">Primitive → Brand → Semantic</strong> architecture from{" "}
          <code className="rounded bg-background-surface-subtle px-1.5 py-0.5 text-caption text-text-primary">@mt/tokens</code>. Primitives
          are the raw ramps; semantic tokens map a role to a brand/primitive value per theme, so the same token resolves
          differently in light and dark. Toggle the theme switcher to see the semantic swatches update live.
        </p>
      </div>

      <div className="space-y-10">
        <PrimitiveScale title="Neutral" ramp="sand" />
        <PrimitiveScale title="Accent" ramp="indigo" />
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {STATUS.map(([label, ramp]) => (
            <PrimitiveScale key={ramp} title={label} ramp={ramp} compact />
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-display text-h4 font-semibold text-text-primary">Semantic tokens</h3>
        <p className="mt-2 max-w-2xl text-body-sm text-text-secondary">
          Swatches render via{" "}
          <code className="rounded bg-background-surface-subtle px-1.5 py-0.5 text-caption text-text-primary">var(--mt-color-*)</code> —
          live-updating with the theme toggle. Light / dark values and the brand/primitive each token references come from{" "}
          <code className="rounded bg-background-surface-subtle px-1.5 py-0.5 text-caption text-text-primary">@mt/tokens/metadata</code>.
        </p>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left text-body-sm">
            <thead>
              <tr className="border-b border-border-default text-caption uppercase tracking-wide text-text-secondary">
                <th className="py-2 pr-4 font-medium">Swatch</th>
                <th className="py-2 pr-4 font-medium">Token</th>
                <th className="py-2 pr-4 font-medium">Light</th>
                <th className="py-2 pr-4 font-medium">Dark</th>
                <th className="py-2 font-medium">References</th>
              </tr>
            </thead>
            <tbody>
              {semantic.map((t) => (
                <tr key={t.name} className="border-b border-border-default/60">
                  <td className="py-3 pr-4">
                    <div className="h-8 w-8 rounded-field border border-border-default" style={{ backgroundColor: `var(${t.cssVar})` }} aria-hidden="true" />
                  </td>
                  <td className="py-3 pr-4 font-mono text-caption text-text-primary">{t.cssVar}</td>
                  <td className="py-3 pr-4 text-text-secondary">{t.values["a-light"]}</td>
                  <td className="py-3 pr-4 text-text-secondary">{t.values["a-dark"]}</td>
                  <td className="py-3 font-mono text-caption text-text-secondary">{cleanRef(t.reference)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
