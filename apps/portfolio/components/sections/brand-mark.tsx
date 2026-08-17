"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { BrandStoryDialog } from "./brand-story";

/**
 * Personal brand mark: a 3D wireframe box whose 12 edges are crisp SVG strokes
 * dashed in Morse "M T" (—— —). Each frame the 8 cube vertices are rotated by the
 * physics angles and projected; the <line> endpoints are updated directly (no
 * React re-render). Drawing real strokes — instead of CSS 3D face planes — avoids
 * z-fighting, doubled/soft edges, and foreshortening artifacts.
 *
 * Interaction (trackball): hover position sets angular velocity (above→down,
 * below→up, left→forward, right→back; speed scales with distance from center);
 * mouse leave eases the tilt home and keeps a slow idle spin. Click or Enter/Space
 * opens the brand-story modal. Reduced-motion safe.
 */

const HALF = 70; // half edge (px)
const CX = 150; // viewBox center
const CY = 150;
const PERSP = 480; // perspective focal length
const VIEW = 300;

const RX0 = -0.38; // default isometric pitch (rad ≈ -22°)
const RY0 = -0.56; // default isometric yaw   (rad ≈ -32°)
const MAXV = 0.07; // max angular velocity at the edge (rad/frame ≈ 4°)
const FRICTION = 0.95;
const EASE_TILT = 0.05;
const IDLE_SPIN = 0.004; // slow idle yaw (rad/frame)

const STROKE = 4;
const DASH = "30 10 30 30 30 20"; // Morse M(—— ) T(—) over pathLength=150 → one per edge
const MARCH = 0.5; // marching-ants speed (pathLength units/frame)

// 8 vertices, 12 edges
const VERTS: Array<[number, number, number]> = [
  [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
  [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1],
].map((v) => [v[0] * HALF, v[1] * HALF, v[2] * HALF]) as Array<[number, number, number]>;

const EDGES: Array<[number, number]> = [
  [0, 1], [1, 2], [2, 3], [3, 0],
  [4, 5], [5, 6], [6, 7], [7, 4],
  [0, 4], [1, 5], [2, 6], [3, 7],
];

function rotate([x, y, z]: [number, number, number], rx: number, ry: number): [number, number, number] {
  const cy = Math.cos(ry), sy = Math.sin(ry);
  const x1 = x * cy + z * sy;
  const z1 = -x * sy + z * cy;
  const cx = Math.cos(rx), sx = Math.sin(rx);
  const y1 = y * cx - z1 * sx;
  const z2 = y * sx + z1 * cx;
  return [x1, y1, z2];
}

function project(p: [number, number, number]): [number, number, number] {
  const s = PERSP / (PERSP - p[2]);
  return [CX + p[0] * s, CY + p[1] * s, p[2]];
}

const defaultPts = VERTS.map((v) => project(rotate(v, RX0, RY0)));

export function BrandMark() {
  const reduce = useReducedMotion() ?? false;
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(SVGLineElement | null)[]>([]);
  const s = useRef({ rx: RX0, ry: RY0, vx: 0, vy: 0, px: 0, py: 0, inside: false, march: 0 });

  useEffect(() => {
    if (reduce) return;
    let raf = 0;
    const st = s.current;
    const draw = () => {
      const pts = VERTS.map((v) => project(rotate(v, st.rx, st.ry)));
      for (let i = 0; i < EDGES.length; i++) {
        const line = lineRefs.current[i];
        if (!line) continue;
        const a = pts[EDGES[i][0]];
        const b = pts[EDGES[i][1]];
        line.setAttribute("x1", a[0].toFixed(2));
        line.setAttribute("y1", a[1].toFixed(2));
        line.setAttribute("x2", b[0].toFixed(2));
        line.setAttribute("y2", b[1].toFixed(2));
        line.setAttribute("stroke-dashoffset", (-st.march).toFixed(2)); // marching ants
        // Depth cue: nearer edges brighter.
        const z = (a[2] + b[2]) / 2;
        const t = Math.max(0, Math.min(1, (z + HALF * 1.75) / (HALF * 3.5)));
        line.setAttribute("stroke-opacity", (0.4 + t * 0.6).toFixed(3));
      }
    };
    const tick = () => {
      st.march = (st.march + MARCH) % 150; // morse dashes crawl along the edges
      if (st.inside) {
        const tvx = -st.py * MAXV; // above center → spin downward
        const tvy = -st.px * MAXV; // left of center → spin forward
        st.vx += (tvx - st.vx) * 0.15;
        st.vy += (tvy - st.vy) * 0.15;
        st.rx += st.vx;
        st.ry += st.vy;
      } else {
        st.vx *= FRICTION;
        st.vy *= FRICTION;
        st.rx += (RX0 - st.rx) * EASE_TILT;
        st.ry += IDLE_SPIN + st.vy;
      }
      draw();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  const norm = (e: { clientX: number; clientY: number }) => {
    const el = wrapRef.current;
    if (!el) return { px: 0, py: 0 };
    const r = el.getBoundingClientRect();
    return {
      px: ((e.clientX - r.left) / r.width) * 2 - 1,
      py: ((e.clientY - r.top) / r.height) * 2 - 1,
    };
  };
  const onMove = (e: React.MouseEvent) => {
    const { px, py } = norm(e);
    s.current.px = px;
    s.current.py = py;
    s.current.inside = true;
  };
  const onLeave = () => {
    s.current.inside = false;
  };
  const openStory = () => setOpen(true);

  return (
    <>
      <div
        ref={wrapRef}
        role="button"
        tabIndex={0}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label="Open the story behind this brand mark"
        className="focus-ring brand-glow group relative w-[300px] max-w-full cursor-pointer select-none rounded-card sm:w-[320px]"
        onMouseMove={reduce ? undefined : onMove}
        onMouseEnter={reduce ? undefined : onMove}
        onMouseLeave={reduce ? undefined : onLeave}
        onClick={openStory}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openStory();
          }
        }}
      >
        {/* Hover / focus hint, anchored above the top-right corner. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-1 top-1 z-10 -translate-y-full rounded-field border border-border-default bg-background-surface px-3 py-2 text-right opacity-0 shadow-overlay transition-opacity duration-200 delay-500 group-hover:opacity-100 group-hover:delay-0 group-focus:opacity-100 group-focus:delay-0"
        >
          <p className="whitespace-nowrap text-caption text-text-secondary">curious about the box?</p>
          <p className="text-caption font-medium text-action-primary underline underline-offset-2">click here</p>
        </div>

        <svg
          width="100%"
          viewBox={`0 0 ${VIEW} ${VIEW}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {EDGES.map((e, i) => (
            <line
              key={i}
              ref={(el) => {
                lineRefs.current[i] = el;
              }}
              x1={defaultPts[e[0]][0]}
              y1={defaultPts[e[0]][1]}
              x2={defaultPts[e[1]][0]}
              y2={defaultPts[e[1]][1]}
              stroke="var(--mt-color-indigo-500)"
              strokeWidth={STROKE}
              strokeLinecap="round"
              pathLength={150}
              strokeDasharray={DASH}
            />
          ))}
        </svg>
      </div>

      <BrandStoryDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
