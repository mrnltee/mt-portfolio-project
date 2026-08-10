import metadata from "@mt/tokens/metadata";

/**
 * Documents the @mt/tokens spacing, radius and elevation roles (Brand A resolved).
 * All values come from `@mt/tokens/metadata`; elevation swatches render live via the
 * @mt shadow utilities.
 */
interface Tok {
  name: string;
  path: string[];
  type?: string;
  tier?: string;
  values: Record<string, string>;
}
const tokens = (metadata as { tokens: Tok[] }).tokens;
const px = (v: string) => parseFloat(v);

export function SpacingSection() {
  const space = tokens.filter((t) => t.path[0] === "space" && t.tier === "semantic");
  const radius = tokens.filter((t) => t.path[0] === "shape" && t.path[1] === "radius");
  const elevation = tokens.filter((t) => t.path[0] === "elevation");
  const maxPx = Math.max(...space.map((s) => px(s.values["a-light"])));

  return (
    <div className="space-y-14">
      <div>
        <h3 className="font-display text-h4 font-semibold text-text-primary">Spacing</h3>
        <p className="mt-2 max-w-2xl text-body-sm text-text-secondary">
          Semantic spacing roles from @mt/tokens (density-scaled per brand). Layout composition still uses Tailwind&apos;s
          native 4px scale; these roles back component padding and gaps.
        </p>
        <div className="mt-6 space-y-2.5">
          {space.map((s) => (
            <div key={s.name} className="flex items-center gap-4">
              <span className="w-24 shrink-0 font-mono text-caption text-text-secondary">{s.path.join("-")}</span>
              <div className="h-3 rounded-field bg-action-primary" style={{ width: `${(px(s.values["a-light"]) / maxPx) * 100}%`, minWidth: 4 }} aria-hidden="true" />
              <span className="text-caption text-text-secondary">{s.values["a-light"]}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-display text-h4 font-semibold text-text-primary">Radius</h3>
        <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {radius.map((r) => (
            <div key={r.name} className="flex flex-col items-center gap-2">
              <div className="h-16 w-16 border-2 border-action-primary bg-action-accent-subtle" style={{ borderRadius: r.values["a-light"] }} aria-hidden="true" />
              <span className="font-mono text-caption text-text-secondary">radius-{r.path[2]}</span>
              <span className="text-caption text-text-secondary">{r.values["a-light"]}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-display text-h4 font-semibold text-text-primary">Elevation</h3>
        <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {elevation.map((e) => (
            <div key={e.name} className="flex flex-col items-center gap-3">
              <div className="h-20 w-full rounded-control bg-background-surface" style={{ boxShadow: e.values["a-light"] }} aria-hidden="true" />
              <span className="font-mono text-caption text-text-secondary">elevation-{e.path[1]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
