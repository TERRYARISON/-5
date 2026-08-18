import { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  swayAmp: number;
  swayPeriod: number;
  phase: number;
  rotation: number;
  rotSpeed: number;
  alpha: number;
  deep: boolean;
  mote: boolean;
}

/**
 * Full-viewport fixed canvas of falling sakura petals + faint neon motes
 * (design.md §5.1). Sits behind content (z-index 1), pointer-events none.
 * DPR-aware, pauses when the tab is hidden, renders 8 static petals under
 * prefers-reduced-motion.
 */
export default function PetalField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = 0;
    let height = 0;
    let raf = 0;
    let running = true;
    let petals: Petal[] = [];

    const spawn = (initial: boolean): Petal => {
      const mote = Math.random() < 0.1;
      return {
        x: Math.random() * width,
        y: initial ? Math.random() * height : -20 - Math.random() * 40,
        size: mote ? 2 : 8 + Math.random() * 12,
        speedY: mote ? 0.3 + Math.random() * 0.3 : 0.55 + Math.random() * 0.85,
        swayAmp: 20 + Math.random() * 40,
        swayPeriod: 3 + Math.random() * 4,
        phase: Math.random() * Math.PI * 2,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.02,
        alpha: mote ? 0.5 + Math.random() * 0.4 : 0.5 + Math.random() * 0.4,
        deep: Math.random() < 0.45,
        mote,
      };
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const target = reduced ? 8 : width < 768 ? 32 + Math.floor(Math.random() * 11) : 70 + Math.floor(Math.random() * 31);
      petals = Array.from({ length: target }, () => spawn(true));
    };

    const drawPetal = (p: Petal, t: number) => {
      const sway = Math.sin((t / 1000 / p.swayPeriod) * Math.PI * 2 + p.phase) * p.swayAmp;
      const wind = Math.sin(t / 9000) * 14;
      const x = p.x + sway * 0.4 + wind;
      ctx.save();
      ctx.translate(x, p.y);
      ctx.rotate(p.rotation);
      if (p.mote) {
        ctx.shadowColor = 'rgba(125,232,240,0.8)';
        ctx.shadowBlur = 8;
        ctx.fillStyle = `rgba(125,232,240,${p.alpha})`;
        ctx.beginPath();
        ctx.arc(0, 0, p.size, 0, Math.PI * 2);
        ctx.fill();
      } else {
        const a = p.deep ? p.alpha * 0.7 : p.alpha;
        const c1 = p.deep ? `rgba(217,123,158,${a})` : `rgba(240,166,192,${a})`;
        const c2 = p.deep ? `rgba(240,166,192,${a * 0.55})` : `rgba(217,123,158,${a * 0.55})`;
        const g = ctx.createLinearGradient(0, -p.size, 0, p.size);
        g.addColorStop(0, c1);
        g.addColorStop(1, c2);
        ctx.fillStyle = g;
        const s = p.size;
        ctx.beginPath();
        ctx.moveTo(0, -s);
        ctx.bezierCurveTo(s * 0.7, -s * 0.55, s * 0.55, s * 0.45, 0, s);
        ctx.bezierCurveTo(-s * 0.55, s * 0.45, -s * 0.7, -s * 0.55, 0, -s);
        ctx.fill();
      }
      ctx.restore();
    };

    const frame = (t: number) => {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);
      for (const p of petals) {
        p.y += p.speedY;
        p.rotation += p.rotSpeed;
        if (p.y > height + 24) Object.assign(p, spawn(false));
        drawPetal(p, t);
      }
      raf = requestAnimationFrame(frame);
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of petals) drawPetal(p, 0);
    };

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!reduced) {
        running = true;
        raf = requestAnimationFrame(frame);
      }
    };

    resize();
    if (reduced) {
      drawStatic();
    } else {
      raf = requestAnimationFrame(frame);
    }
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none',
      }}
    />
  );
}
