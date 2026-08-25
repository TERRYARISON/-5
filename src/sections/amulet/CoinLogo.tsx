import { memo, useEffect, useRef } from 'react';
import type { PointerEvent } from 'react';
import { AMULET } from '@/content/amulet';

/** 自动旋转角速度：约 14 秒一圈（deg / ms） */
const AUTO_SPEED = 360 / 14000;
/** 拖拽跟手系数：1px 水平位移 = 0.5deg */
const DRAG_GAIN = 0.5;

/**
 * 泰瑞堂双面金币 logo —— 本页灵魂。
 * 父容器 perspective + 内层 preserve-3d，正面棕金 / 背面浅金（rotateY 180°），
 * 默认缓慢自转，支持鼠标 / 触摸拖拽加速，松手后惯性衰减回自动旋转。
 * rAF 直接写 transform，不走 React state；prefers-reduced-motion 时静止。
 * memo 隔离永续动画，父级重渲染不会重置。
 */
const CoinLogo = memo(function CoinLogo() {
  const coinRef = useRef<HTMLDivElement>(null);
  const angle = useRef(0);
  const spinVel = useRef(0); // 拖拽赋予的附加角速度（deg / ms）
  const dragging = useRef(false);
  const lastX = useRef(0);
  const lastT = useRef(0);

  useEffect(() => {
    const coin = coinRef.current;
    if (!coin) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      coin.style.transform = 'rotateY(18deg)';
      return;
    }
    let raf = 0;
    let prev = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(64, now - prev);
      prev = now;
      if (!dragging.current) {
        angle.current += (AUTO_SPEED + spinVel.current) * dt;
        // 惯性指数衰减，回落到纯自动旋转
        spinVel.current *= Math.exp(-dt / 420);
        if (Math.abs(spinVel.current) < 0.0008) spinVel.current = 0;
      }
      coin.style.transform = `rotateY(${angle.current}deg)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    spinVel.current = 0;
    lastX.current = e.clientX;
    lastT.current = performance.now();
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    const now = performance.now();
    const dt = now - lastT.current;
    const dx = e.clientX - lastX.current;
    angle.current += dx * DRAG_GAIN;
    if (dt > 0) {
      const v = (dx * DRAG_GAIN) / dt;
      spinVel.current = spinVel.current * 0.6 + v * 0.4;
    }
    lastX.current = e.clientX;
    lastT.current = now;
  };

  const endDrag = () => {
    dragging.current = false;
  };

  return (
    <div
      role="img"
      aria-label="泰瑞堂双面金币 logo，可拖拽旋转"
      className="relative mx-auto w-[min(52vw,340px)] cursor-grab touch-pan-y select-none active:cursor-grabbing"
      style={{ perspective: '900px' }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      {/* 暖金光晕 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[135%] w-[135%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(217,123,158,0.32) 0%, rgba(240,166,192,0.12) 42%, transparent 68%)',
        }}
      />
      <div
        ref={coinRef}
        className="relative aspect-square w-full will-change-transform"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* 正面（棕金） */}
        <img
          src={AMULET.logoFront}
          alt=""
          draggable={false}
          className="absolute inset-0 h-full w-full rounded-full"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        />
        {/* 背面（浅金） */}
        <img
          src={AMULET.logoBack}
          alt=""
          draggable={false}
          className="absolute inset-0 h-full w-full rounded-full"
          style={{
            transform: 'rotateY(180deg)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        />
      </div>
    </div>
  );
});

export default CoinLogo;
