import { useEffect, useRef, useState } from 'react';
import type { TouchEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import type { CASES } from '@/content/profile';

export type CaseItem = (typeof CASES)[number];

interface CaseLightboxProps {
  /** The open case; null = closed. */
  item: CaseItem | null;
  onClose: () => void;
}

const EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number];
/** Minimum horizontal swipe distance (px) that triggers an image switch. */
const SWIPE_THRESHOLD = 48;

/**
 * 案例灯箱 (PRD F-003 修复包规格). Full-screen blurred overlay showing one
 * case's full `img` array, one image at a time:
 * - 右上「关闭」文字按钮（≥44px 触控区）+ ESC + 遮罩点击关闭
 * - 打开期间锁定 body 滚动
 * - 左右箭头循环切换 + 「第 N / 共 M」计数
 * - ←/→ 键盘切换；手机触摸左右滑动切换
 * - 大图下方带 title / kpi
 */
export default function CaseLightbox({ item, onClose }: CaseLightboxProps) {
  const [imgIndex, setImgIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const total = item?.img.length ?? 0;
  const prev = () => setImgIndex((i) => (i - 1 + total) % total);
  const next = () => setImgIndex((i) => (i + 1) % total);

  // Reset to the first image whenever another case is opened.
  useEffect(() => {
    setImgIndex(0);
  }, [item?.id]);

  // ESC / arrow keys + body scroll lock while open.
  useEffect(() => {
    if (!item) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item, total, onClose]);

  const onTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };
  const onTouchEnd = (e: TouchEvent) => {
    const start = touchStartX.current;
    touchStartX.current = null;
    if (start === null || total < 2) return;
    const dx = (e.changedTouches[0]?.clientX ?? start) - start;
    if (Math.abs(dx) < SWIPE_THRESHOLD) return;
    if (dx < 0) next();
    else prev();
  };

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          key="case-lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-[rgba(7,7,13,0.92)] p-5 backdrop-blur-[20px] sm:p-10"
          onClick={onClose}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          role="dialog"
          aria-modal="true"
          aria-label={item.title}
        >
          {/* 关闭 — text button, ≥44px touch target, top right */}
          <button
            type="button"
            aria-label="关闭灯箱"
            onClick={onClose}
            className="absolute right-4 top-4 z-10 flex min-h-[44px] items-center gap-2 rounded-full border border-glass-border bg-glass px-5 text-mist backdrop-blur-md transition-colors duration-300 hover:border-sakura/50 hover:text-fog sm:right-8 sm:top-8"
          >
            <span className="eyebrow">关闭</span>
            <X size={15} strokeWidth={1.75} />
          </button>

          {/* 计数 — 第 N / 共 M */}
          <p className="eyebrow absolute left-5 top-4 flex min-h-[44px] items-center text-ghost sm:left-8 sm:top-8">
            第 {imgIndex + 1} / 共 {total}
          </p>

          {/* Prev / Next — 44px violet circles, cycle within the case */}
          {total > 1 && (
            <>
              <button
                type="button"
                aria-label="上一张"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-violet to-violet-deep transition-all duration-300 hover:scale-[1.08] hover:shadow-[0_0_32px_rgba(167,139,250,0.45)] sm:left-8"
              >
                <ArrowLeft size={18} strokeWidth={1.75} className="text-void" />
              </button>
              <button
                type="button"
                aria-label="下一张"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-violet to-violet-deep transition-all duration-300 hover:scale-[1.08] hover:shadow-[0_0_32px_rgba(167,139,250,0.45)] sm:right-8"
              >
                <ArrowRight size={18} strokeWidth={1.75} className="text-void" />
              </button>
            </>
          )}

          <AnimatePresence mode="wait" initial={false}>
            <motion.figure
              key={`${item.id}-${imgIndex}`}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
              transition={{ duration: 0.5, ease: EXPO }}
              className="flex max-h-full w-full max-w-4xl flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={item.img[imgIndex]}
                alt={`${item.title} — ${imgIndex + 1}`}
                loading="lazy"
                draggable={false}
                className="max-h-[62vh] w-auto max-w-full rounded-[16px] border border-glass-border object-contain"
              />
              <motion.figcaption
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EXPO, delay: 0.15 }}
                className="mt-7 max-w-xl text-center"
              >
                <h3 className="card-title text-fog">{item.title}</h3>
                <p className="mt-3 font-sans text-[0.85rem] font-light tracking-[0.06em] text-neon">
                  {item.kpi}
                </p>
              </motion.figcaption>
            </motion.figure>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
