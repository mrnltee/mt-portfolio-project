"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Personal brand mark: a true 3D wireframe box (outlined indigo dashed edges,
 * no fill) with a trackball-style physics interaction.
 *
 * - Hover position sets angular VELOCITY: above center → spins downward, below →
 *   up; left → forward (toward you), right → backward. Speed scales with distance
 *   from center (edge = fast, dead center = still).
 * - Click → a velocity burst in the cursor's direction; the box flings and coasts
 *   with friction before settling.
 * - Mouse leave → eases back to the default isometric angle with a slow idle spin.
 *
 * Transforms are written straight to the DOM each frame (no React re-render).
 * Reduced-motion safe (static isometric pose, no interaction).
 */

const EDGE = 150; // cube edge (px)
const HALF = EDGE / 2;
const RX0 = -22; // default isometric tilt (X)
const RY0 = -32; // default isometric tilt (Y)
const MAXV = 4.2; // max deg/frame at the edge of the hit area
const FRICTION = 0.95; // coast decay per frame
const EASE_TILT = 0.05; // how fast X eases back to default at idle
const IDLE_SPIN = 0.25; // slow idle turntable spin (deg/frame)

const FACES = [
  `translateZ(${HALF}px)`, // front
  `rotateY(180deg) translateZ(${HALF}px)`, // back
  `rotateY(90deg) translateZ(${HALF}px)`, // right
  `rotateY(-90deg) translateZ(${HALF}px)`, // left
  `rotateX(90deg) translateZ(${HALF}px)`, // top
  `rotateX(-90deg) translateZ(${HALF}px)`, // bottom
];

// Morse "M T" (—— —) drawn as a dash pattern. Unit = 10px; one full cycle spans
// exactly one cube edge (EDGE px), so every edge reads M (dash dash) then T (dash).
const STROKE = 4; // edge thickness (bold)
const C = "var(--mt-color-indigo-500)";
const MORSE_STOPS = [
  `${C} 0px`, `${C} 30px`, //           M · dash 1
  `transparent 30px`, `transparent 40px`, //  intra gap
  `${C} 40px`, `${C} 70px`, //          M · dash 2
  `transparent 70px`, `transparent 100px`, // inter-letter gap
  `${C} 100px`, `${C} 130px`, //        T · dash
  `transparent 130px`, `transparent 150px`, // trailing gap
].join(", ");
const MH = `repeating-linear-gradient(to right, ${MORSE_STOPS})`; // horizontal edges
const MV = `repeating-linear-gradient(to bottom, ${MORSE_STOPS})`; // vertical edges
// Four Morse-patterned edges per face (top / bottom / left / right), transparent interior.
const MORSE_EDGES = [
  `${MH} left top / 100% ${STROKE}px no-repeat`,
  `${MH} left bottom / 100% ${STROKE}px no-repeat`,
  `${MV} left top / ${STROKE}px 100% no-repeat`,
  `${MV} right top / ${STROKE}px 100% no-repeat`,
].join(", ");

export function BrandMark() {
  const reduce = useReducedMotion() ?? false;
  const wrapRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);
  const s = useRef({ rx: RX0, ry: RY0, vx: 0, vy: 0, px: 0, py: 0, inside: false, fling: false });

  useEffect(() => {
    if (reduce) {
      if (cubeRef.current) cubeRef.current.style.transform = `rotateX(${RX0}deg) rotateY(${RY0}deg)`;
      return;
    }
    let raf = 0;
    const st = s.current;
    const tick = () => {
      if (st.fling) {
        // Coast with friction after a click burst.
        st.vx *= FRICTION;
        st.vy *= FRICTION;
        st.rx += st.vx;
        st.ry += st.vy;
        if (Math.abs(st.vx) < 0.04 && Math.abs(st.vy) < 0.04) st.fling = false;
      } else if (st.inside) {
        // Cursor position drives target angular velocity (trackball feel).
        const tvx = -st.py * MAXV; // above center (py<0) → spin downward
        const tvy = -st.px * MAXV; // left of center (px<0) → spin forward
        st.vx += (tvx - st.vx) * 0.15;
        st.vy += (tvy - st.vy) * 0.15;
        st.rx += st.vx;
        st.ry += st.vy;
      } else {
        // Idle: decay leftover velocity, ease tilt home, keep a slow spin.
        st.vx *= FRICTION;
        st.vy *= FRICTION;
        st.rx += (RX0 - st.rx) * EASE_TILT;
        st.ry += IDLE_SPIN + st.vy;
      }
      if (cubeRef.current) cubeRef.current.style.transform = `rotateX(${st.rx}deg) rotateY(${st.ry}deg)`;
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
      px: ((e.clientX - r.left) / r.width) * 2 - 1, // -1 (left) .. 1 (right)
      py: ((e.clientY - r.top) / r.height) * 2 - 1, // -1 (top) .. 1 (bottom)
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
  const onClick = (e: React.MouseEvent) => {
    const { px, py } = norm(e);
    const dist = Math.min(1, Math.hypot(px, py));
    const burst = 7 + dist * 16;
    s.current.vx += -py * burst;
    s.current.vy += -px * burst;
    s.current.fling = true;
  };

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="relative cursor-pointer select-none"
      style={{ width: 300, height: 300, maxWidth: "100%", perspective: 720 }}
      onMouseMove={reduce ? undefined : onMove}
      onMouseEnter={reduce ? undefined : onMove}
      onMouseLeave={reduce ? undefined : onLeave}
      onClick={reduce ? undefined : onClick}
    >
      <div
        ref={cubeRef}
        className="absolute left-1/2 top-1/2"
        style={{
          width: EDGE,
          height: EDGE,
          marginLeft: -HALF,
          marginTop: -HALF,
          transformStyle: "preserve-3d",
          transform: `rotateX(${RX0}deg) rotateY(${RY0}deg)`,
        }}
      >
        {FACES.map((t, i) => (
          <div
            key={i}
            className="absolute inset-0"
            style={{
              transform: t,
              background: MORSE_EDGES,
              backfaceVisibility: "visible",
            }}
          />
        ))}
      </div>
    </div>
  );
}
