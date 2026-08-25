import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, MessageCircle, X } from 'lucide-react';
import PlaceholderCard from '@/components/PlaceholderCard';
import { SITE } from '@/content/site';
import type { WorkItem } from './data';

interface LightboxProps {
  items: WorkItem[];
  /** Index into `items`; -1 = closed. */
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number];

/**
 * Section 4 — lightbox (work.md §4). Full-screen blurred overlay; image
 * scales 0.92 → 1 with an expo ease, caption slides up 20px delayed 0.15s.
 * Prev/Next violet circles cycle within the filtered set; ESC / backdrop
 * click closes; ←/→ keys navigate. Concept items without imagery show the
 * placeholder panel.
 */
export default function Lightbox({ items, index, onClose, onNavigate }: LightboxProps) {
  const open = index >= 0 && index < items.length;
  const item = open ? items[index] : null;

  // F-003 手机触摸滑动切换
  const touchX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null || items.length < 2) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) < 48) return; // 短滑不算
    if (dx < 0) onNavigate((index + 1) % items.length);
    else onNavigate((index - 1 + items.length) % items.length);
  };

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

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          key="work-lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-[rgba(7,7,13,0.9)] p-5 backdrop-blur-[20px] sm:p-10"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={item.title}
        >
          {/* F-003 关闭 —— 文字按钮，≥44px */}
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-20 flex min-h-[44px] items-center gap-2 rounded-full border border-glass-border bg-glass px-5 text-mist backdrop-blur-[12px] transition-colors duration-300 hover:border-sakura/50 hover:text-fog sm:right-8 sm:top-8"
          >
            <X size={16} strokeWidth={1.75} />
            <span className="eyebrow">关闭</span>
          </button>

          {/* Prev / Next */}
          {items.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous piece"
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate((index - 1 + items.length) % items.length);
                }}
                className="absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-violet to-violet-deep transition-all duration-300 hover:scale-[1.08] hover:shadow-[0_0_32px_rgba(167,139,250,0.45)] sm:left-8"
              >
                <ArrowLeft size={18} strokeWidth={1.75} className="text-void" />
              </button>
              <button
                type="button"
                aria-label="Next piece"
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate((index + 1) % items.length);
                }}
                className="absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-violet to-violet-deep transition-all duration-300 hover:scale-[1.08] hover:shadow-[0_0_32px_rgba(167,139,250,0.45)] sm:right-8"
              >
                <ArrowRight size={18} strokeWidth={1.75} className="text-void" />
              </button>
            </>
          )}

          <AnimatePresence mode="wait" initial={false}>
            <motion.figure
              key={item.id}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
              transition={{ duration: 0.5, ease: EXPO }}
              className="flex max-h-full w-full max-w-5xl touch-pan-y flex-col items-center"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              {item.images.length > 0 ? (
                <div className="flex max-h-[70vh] items-center justify-center gap-3 sm:gap-5">
                  {item.images.map((src, i) => (
                    <img
                      key={src}
                      src={src}
                      alt={item.images.length > 1 ? `${item.title} — ${i + 1}` : item.title}
                      draggable={false}
                      className="max-h-[70vh] w-auto max-w-full rounded-[16px] border border-glass-border object-contain"
                    />
                  ))}
                </div>
              ) : (
                <PlaceholderCard
                  title={item.title}
                  eyebrow={item.eyebrow}
                  aspect="h-[46vh] w-full max-w-md"
                />
              )}

              <motion.figcaption
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EXPO, delay: 0.15 }}
                className="mt-7 max-w-xl text-center"
              >
                <p className="eyebrow text-ghost">{item.eyebrow}</p>
                <h3 className="card-title mt-3 text-fog">{item.title}</h3>
                {item.body && <p className="body-text mt-3 text-[0.95rem]">{item.body}</p>}
                <p className="eyebrow mt-5 text-ghost/70">
                  第 {index + 1} 件 / 共 {items.length} 件
                </p>

                {/* F-003 「聊聊这个方向」—— 灯箱里也有下一步 */}
                <a
                  href={`mailto:${SITE.email}?subject=${encodeURIComponent(`聊聊这个方向：${item.title}`)}`}
                  className="group/mail mt-6 inline-flex min-h-[44px] items-center gap-2.5 rounded-full border border-sakura/35 bg-sakura/10 px-6 py-2.5 font-sans text-[0.85rem] text-sakura transition-all duration-300 hover:border-sakura hover:bg-sakura/20 hover:shadow-[0_0_28px_rgba(240,166,192,0.25)]"
                >
                  <MessageCircle size={15} strokeWidth={1.5} />
                  聊聊这个方向
                </a>
              </motion.figcaption>
            </motion.figure>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
