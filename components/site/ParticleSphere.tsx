"use client";

import { useEffect, useRef } from "react";

const POINT_COUNT = 1100;
const TILT = 0.38;
const SPEED = 0.0022;
const TAU = Math.PI * 2;

/**
 * Bioluminescent data orb: a rotating Fibonacci sphere of ~1,100 points drawn
 * on a 2D canvas. Teal at the back, aqua/white at the front, a lavender tint
 * on the rim. Pauses when off-screen or when the tab is hidden, and renders a
 * single still frame when the visitor prefers reduced motion.
 */
export default function ParticleSphere({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Unit sphere, evenly distributed.
    const points = new Float32Array(POINT_COUNT * 3);
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < POINT_COUNT; i++) {
      const y = 1 - (i / (POINT_COUNT - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = golden * i;
      points[i * 3] = Math.cos(theta) * r;
      points[i * 3 + 1] = y;
      points[i * 3 + 2] = Math.sin(theta) * r;
    }

    // Pre-built palette: 24 depth buckets × {core, rim}.
    const BUCKETS = 24;
    const core: string[] = [];
    const rim: string[] = [];
    const lerp = (a: number, b: number, t: number) => Math.round(a + (b - a) * t);
    for (let b = 0; b < BUCKETS; b++) {
      const t = b / (BUCKETS - 1); // 0 = back, 1 = front
      const alpha = 0.22 + t * 0.78;
      // teal (0,130,124) → aqua (203,255,252) → white
      const r = t < 0.7 ? lerp(0, 203, t / 0.7) : lerp(203, 255, (t - 0.7) / 0.3);
      const g = t < 0.7 ? lerp(130, 255, t / 0.7) : 255;
      const bl = t < 0.7 ? lerp(124, 252, t / 0.7) : lerp(252, 255, (t - 0.7) / 0.3);
      core.push(`rgba(${r},${g},${bl},${alpha.toFixed(3)})`);
      // lavender rim (250,209,255)
      rim.push(
        `rgba(${lerp(r, 250, 0.75)},${lerp(g, 209, 0.75)},${lerp(bl, 255, 0.75)},${alpha.toFixed(3)})`
      );
    }

    let width = 0;
    let height = 0;
    let angle = 0;
    let raf = 0;
    let visible = true;
    let pageVisible = !document.hidden;

    const cosT = Math.cos(TILT);
    const sinT = Math.sin(TILT);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const radius = Math.min(width, height) * 0.42;
      const cx = width / 2;
      const cy = height / 2;
      const ca = Math.cos(angle);
      const sa = Math.sin(angle);

      for (let i = 0; i < POINT_COUNT; i++) {
        const x = points[i * 3];
        const y = points[i * 3 + 1];
        const z = points[i * 3 + 2];

        // Rotate around Y, then tilt around X.
        const x1 = x * ca + z * sa;
        const z1 = -x * sa + z * ca;
        const y1 = y * cosT - z1 * sinT;
        const z2 = y * sinT + z1 * cosT;

        const depth = (z2 + 1) / 2; // 0 back → 1 front
        const scale = 0.86 + depth * 0.28; // light perspective
        const px = cx + x1 * radius * scale;
        const py = cy + y1 * radius * scale;
        const size = 0.55 + depth * 1.45;
        const onRim = x1 * x1 + y1 * y1 > 0.84;

        const bucket = Math.min(BUCKETS - 1, Math.floor(depth * BUCKETS));
        ctx.fillStyle = onRim ? rim[bucket] : core[bucket];
        ctx.beginPath();
        ctx.arc(px, py, size, 0, TAU);
        ctx.fill();
      }
    };

    const tick = () => {
      if (!visible || !pageVisible) {
        raf = 0;
        return;
      }
      angle += SPEED;
      draw();
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (reduceMotion) {
        draw();
        return;
      }
      if (!raf && visible && pageVisible) raf = requestAnimationFrame(tick);
    };

    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
        else stop();
      },
      { threshold: 0.05 }
    );
    io.observe(canvas);

    const onVisibility = () => {
      pageVisible = !document.hidden;
      if (pageVisible) start();
      else stop();
    };
    document.addEventListener("visibilitychange", onVisibility);

    start();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
