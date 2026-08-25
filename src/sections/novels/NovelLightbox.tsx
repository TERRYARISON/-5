import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import StarMark from '@/components/StarMark';
import type { Novel } from '@/content/novels';
import { statusMeta } from './novelStatus';

interface NovelLightboxProps {
  items: Novel[];
  /** Index into `items`; -1 = closed. */
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number];
const SWIPE_THRESHOLD = 56;

/**
 * 书籍详情灯箱（PRD F-003 修复包）——
 * · 左封面（2:3，无封面显示占位卡），右侧 书名 / 状态 / tags / logline / synopsis 分段；
 * · 右上角文字「关闭」按钮 ≥44px，ESC 与点击遮罩关闭，打开时锁 body 滚动；
 * · 左右箭头循环切换 + 「第 N / 共 M 本」计数，手机端触摸滑动切换；
 * · framer-motion AnimatePresence 进出场。
 */
export default function NovelLightbox({ items, index, onClose, onNavigate }: NovelLightboxProps) {
  const open = index >= 0 && index < items.length;
  const item = open ? items[index] : null;
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate((index - 1 + items.length) % items.length);
      if (e.key === 'ArrowRight') onNavigate((index + 1) % items.length);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, index, items.length, onClose, onNavigate]);

  const goPrev = () => onNavigate((index - 1 + items.length) % items.length);
  const goNext = () => onNavigate((index + 1) % items.length);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          key="novel-lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-[rgba(7,7,13,0.92)] p-4 backdrop-blur-[20px] sm:p-8"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`《${item.title}》详情`}
        >
          {/* Close — 文字按钮，≥44px */}
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-20 flex h-11 items-center gap-2 rounded-full border border-glass-border bg-glass px-5 font-sans text-sm text-mist transition-colors duration-300 hover:border-sakura/50 hover:text-fog sm:right-8 sm:top-8"
          >
            <X size={16} strokeWidth={1.75} />
            关闭
          </button>

          {/* Prev / Next — ≥44px */}
          {items.length > 1 && (
            <>
              <button
                type="button"
                aria-label="上一本"
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
                className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-glass-border bg-glass text-mist backdrop-blur-sm transition-all duration-300 hover:scale-[1.08] hover:border-sakura/50 hover:text-sakura max-md:top-auto max-md:bottom-5 max-md:translate-y-0 sm:left-6"
              >
                <ArrowLeft size={18} strokeWidth={1.75} />
              </button>
              <button
                type="button"
                aria-label="下一本"
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
                className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-glass-border bg-glass text-mist backdrop-blur-sm transition-all duration-300 hover:scale-[1.08] hover:border-sakura/50 hover:text-sakura max-md:top-auto max-md:bottom-5 max-md:translate-y-0 max-md:right-16 sm:right-6"
              >
                <ArrowRight size={18} strokeWidth={1.75} />
              </button>
            </>
          )}

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.2 } }}
              transition={{ duration: 0.45, ease: EXPO }}
              className="flex max-h-[88dvh] w-full max-w-4xl flex-col gap-6 overflow-y-auto rounded-[20px] border border-glass-border bg-ink/80 p-5 pb-20 backdrop-blur-md sm:p-8 md:flex-row md:gap-10 md:pb-8"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={(e) => {
                touchStartX.current = e.touches[0]?.clientX ?? null;
              }}
              onTouchEnd={(e) => {
                if (touchStartX.current === null || items.length < 2) return;
                const dx = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
                touchStartX.current = null;
                if (Math.abs(dx) < SWIPE_THRESHOLD) return;
                if (dx > 0) goPrev();
                else goNext();
              }}
            >
              {/* 左：封面 2:3 */}
              <div className="mx-auto w-full max-w-[240px] shrink-0 md:mx-0 md:max-w-none md:basis-[38%]">
                <div className="relative aspect-[2/3] w-full overflow-hidden rounded-[14px] border border-glass-border bg-ink shadow-[0_24px_60px_rgba(0,0,0,0.5)]">
                  {item.cover ? (
                    <img
                      src={item.cover}
                      alt={`《${item.title}》封面`}
                      draggable={false}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 border-sakura/30 bg-ink/95 p-6 text-center">
                      <StarMark size={34} flat />
                      <span className="font-serif text-xl font-light leading-snug text-fog">
                        {item.title}
                      </span>
                      <span className="eyebrow text-ghost">封面绘制中</span>
                    </div>
                  )}
                </div>
              </div>

              {/* 右：分段详情 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EXPO, delay: 0.12 }}
                className="min-w-0 flex-1"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={`rounded-full border px-3 py-1 font-sans text-[0.68rem] font-medium tracking-[0.14em] ${statusMeta(item).className}`}
                  >
                    {statusMeta(item).label}
                  </span>
                  <span className="eyebrow text-ghost">{item.status}</span>
                </div>

                <h3 className="mt-4 font-serif text-3xl font-light leading-tight text-fog sm:text-4xl">
                  {item.title}
                </h3>

                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-glass-border bg-glass px-3 py-1 font-sans text-[0.72rem] font-light text-mist"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="mt-6 border-l-2 border-sakura/60 pl-4 font-serif text-lg font-light leading-relaxed text-sakura">
                  {item.logline}
                </p>

                <div className="mt-6 space-y-4">
                  {item.synopsis.map((para, i) => (
                    <p key={i} className="body-text text-[0.95rem]">
                      {para}
                    </p>
                  ))}
                </div>

                <p className="eyebrow mt-8 text-ghost/70">
                  第 {String(index + 1).padStart(2, '0')} 本 / 共 {String(items.length).padStart(2, '0')} 本
                </p>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
