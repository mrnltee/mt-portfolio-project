"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Personal brand mark: an isometric 3D box drawn as an OUTLINE whose edges are
 * rendered in Morse code spelling "M T" (M = dash dash, T = dash). Ported from
 * the Figma Make branding; adapted to the @mt indigo tokens (theme-aware) and a
 * bolder stroke. Edges draw themselves in, then the morse dashes "march".
 * Text/legend intentionally omitted — the animated box only. Reduced-motion safe.
 */

// Morse "M T" encoded as a stroke dash pattern. Unit = 10px.
const MORSE_DASH = 30;
const MORSE_INTRA = 10; // gap within a letter
const MORSE_INTER = 30; // gap between letters
const MORSE_TRAIL = 20; // gap before the pattern repeats
const DASH_ARRAY = [MORSE_DASH, MORSE_INTRA, MORSE_DASH, MORSE_INTER, MORSE_DASH, MORSE_TRAIL].join(" ");
const CYCLE = MORSE_DASH + MORSE_INTRA + MORSE_DASH + MORSE_INTER + MORSE_DASH + MORSE_TRAIL; // 170

const STROKE = 5.5; // bolder outline

// Isometric box geometry
const CX = 200;
const TOP_Y = 52;
const A = 120; // edge length
const DX = A * Math.cos(Math.PI / 6);
const DY_ISO = A * Math.sin(Math.PI / 6);
const H = A;
const SVG_W = 400;
const SVG_H = TOP_Y + DY_ISO + H + A + 32;

type Vertex = [number, number];

const V: Record<string, Vertex> = {
  top: [CX, TOP_Y],
  rMid: [CX + DX, TOP_Y + DY_ISO],
  lMid: [CX - DX, TOP_Y + DY_ISO],
  center: [CX, TOP_Y + A],
  rBot: [CX + DX, TOP_Y + DY_ISO + H],
  lBot: [CX - DX, TOP_Y + DY_ISO + H],
  bot: [CX, TOP_Y + A + H],
};

const edges: Array<{ a: Vertex; b: Vertex; face: "top" | "left" | "right" }> = [
  // Top face
  { a: V.top, b: V.rMid, face: "top" },
  { a: V.top, b: V.lMid, face: "top" },
  { a: V.rMid, b: V.center, face: "top" },
  { a: V.lMid, b: V.center, face: "top" },
  // Left face
  { a: V.lMid, b: V.lBot, face: "left" },
  { a: V.center, b: V.bot, face: "left" },
  { a: V.lBot, b: V.bot, face: "left" },
  // Right face
  { a: V.rMid, b: V.rBot, face: "right" },
  { a: V.rBot, b: V.bot, face: "right" },
];

// Face brightness conveys the 3D form; indigo token with per-face alpha (theme-aware).
const faceColor: Record<"top" | "left" | "right", string> = {
  top: "rgb(var(--mt-color-indigo-500-rgb) / 1)",
  right: "rgb(var(--mt-color-indigo-500-rgb) / 0.78)",
  left: "rgb(var(--mt-color-indigo-500-rgb) / 0.55)",
};

const edgeLength = (a: Vertex, b: Vertex) => Math.hypot(b[0] - a[0], b[1] - a[1]);
const edgePath = (a: Vertex, b: Vertex) => `M ${a[0]} ${a[1]} L ${b[0]} ${b[1]}`;

function MorseEdge({
  a,
  b,
  face,
  drawDelay,
  marching,
  reduce,
}: {
  a: Vertex;
  b: Vertex;
  face: "top" | "left" | "right";
  drawDelay: number;
  marching: boolean;
  reduce: boolean;
}) {
  const len = edgeLength(a, b);
  const [offset, setOffset] = useState(reduce ? 0 : len + CYCLE);
  const [marchOffset, setMarchOffset] = useState(0);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number | null>(null);
  const marchRef = useRef<number>(0);

  // Draw-in
  useEffect(() => {
    if (reduce) return;
    const timer = setTimeout(() => {
      const duration = 900;
      const from = len + CYCLE;
      const animate = (ts: number) => {
        if (!startRef.current) startRef.current = ts;
        const progress = Math.min((ts - startRef.current) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        setOffset(from + (0 - from) * ease);
        if (progress < 1) rafRef.current = requestAnimationFrame(animate);
      };
      rafRef.current = requestAnimationFrame(animate);
    }, drawDelay);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(rafRef.current);
    };
  }, [len, drawDelay, reduce]);

  // Marching ants
  useEffect(() => {
    if (!marching || reduce) return;
    let running = true;
    const step = () => {
      if (!running) return;
      marchRef.current = (marchRef.current + 0.5) % CYCLE;
      setMarchOffset(marchRef.current);
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
    };
  }, [marching, reduce]);

  return (
    <path
      d={edgePath(a, b)}
      stroke={faceColor[face]}
      strokeWidth={STROKE}
      strokeLinecap="round"
      strokeDasharray={DASH_ARRAY}
      strokeDashoffset={offset + marchOffset}
      fill="none"
    />
  );
}

export function BrandMark() {
  const reduceMotion = useReducedMotion() ?? false;
  const [marching, setMarching] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;
    const t = setTimeout(() => setMarching(true), 2000);
    return () => clearTimeout(t);
  }, [reduceMotion]);

  return (
    <div aria-hidden="true" className="relative w-[300px] max-w-full sm:w-[340px]">
      <svg
        width="100%"
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Isometric box outlined in Morse code for M and T"
      >
        {edges.map((e, i) => (
          <MorseEdge key={i} a={e.a} b={e.b} face={e.face} drawDelay={160 + i * 90} marching={marching} reduce={reduceMotion} />
        ))}
      </svg>
    </div>
  );
}
