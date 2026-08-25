import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import StarMark from '@/components/StarMark';
import { ARTICLES } from './articles';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

interface ArticleReaderProps {
  index: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

/**
 * Section 4 — full-screen article reader overlay (journal.md §4). Own scroll
 * context (`data-lenis-prevent` opts out of the page Lenis instance), drop-cap
 * body copy, one serif pull-quote per essay, and a NEXT ESSAY link that
 * cycles through the index.
 */
export default function ArticleReader({ index, onClose, onNext, onPrev }: ArticleReaderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0); // F-004 阅读进度
  const article = ARTICLES[index];
  const next = ARTICLES[(index + 1) % ARTICLES.length];
  const prev = ARTICLES[(index - 1 + ARTICLES.length) % ARTICLES.length];

  // 阅读进度条：监听阅读器自己的滚动容器
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? Math.min(1, el.scrollTop / max) : 0);
    };
    onScroll();
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [index]);

  // Lock page scroll while the reader is open; reset reader scroll per essay.
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    scrollRef.current?.scrollTo({ top: 0 });
    return () => {
      document.body.style.overflow = '';
    };
  }, [index]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[70] bg-[rgba(7,7,13,0.97)]"
      role="dialog"
      aria-modal="true"
      aria-label={article.pre + article.accent}
    >
      <div ref={scrollRef} data-lenis-prevent className="h-full overflow-y-auto overscroll-contain">
        {/* F-004 顶部阅读进度条 */}
        <div className="fixed inset-x-0 top-0 z-20 h-[3px] bg-fog/10">
          <span
            className="block h-full bg-gradient-to-r from-sakura to-neon transition-[width] duration-150"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        {/* F-004 关闭 —— 文字按钮「关闭」，一眼即懂，≥44px */}
        <button
          type="button"
          onClick={onClose}
          className="fixed right-5 top-5 z-10 flex min-h-[44px] items-center gap-2 rounded-full border border-glass-border bg-glass px-5 text-mist backdrop-blur-[18px] transition-all duration-300 hover:border-sakura/50 hover:text-sakura hover:shadow-[0_0_40px_rgba(240,166,192,0.35)]"
        >
          <X size={16} strokeWidth={1.5} />
          <span className="eyebrow">关闭 · 返回列表</span>
        </button>

        <motion.article
          key={article.id}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mx-auto w-full max-w-[720px] px-[clamp(1.25rem,5vw,4rem)] py-28"
        >
          <p className="eyebrow text-ghost">
            <span className="text-neon">{article.index}</span> — {article.eyebrow}
          </p>

          <h1 className="mt-6 font-serif text-[3rem] font-light leading-[1.1] text-fog">
            {article.pre}
            <em className="italic text-sakura">{article.accent}</em>
            {article.post ?? ''}
          </h1>

          {/* Hero image 16:9 — or the ✦ placeholder tile when no photo exists */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.06 }}
            className="mt-10 overflow-hidden rounded-2xl border border-glass-border"
          >
            {article.image ? (
              <img
                src={article.image}
                alt={article.imageAlt}
                className="aspect-video w-full object-cover"
                draggable={false}
              />
            ) : (
              <div className="flex aspect-video w-full flex-col items-center justify-center gap-4 border-sakura/30 bg-ink/90">
                <StarMark size={36} flat />
                <p className="eyebrow text-ghost">Image Forthcoming</p>
              </div>
            )}
          </motion.div>

          {/* Body copy — Space Grotesk 1.05rem/1.85, drop-cap on paragraph one */}
          <div className="mt-12 flex flex-col gap-7">
            {article.paragraphs.map((paragraph, i) => (
              <motion.p
                key={paragraph.slice(0, 24)}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.06 * i }}
                className="font-sans text-[1.05rem] font-light leading-[1.85] tracking-[0.01em] text-mist"
              >
                {i === 0 ? (
                  <>
                    <span
                      aria-hidden="true"
                      className="float-left mr-3 mt-1 font-serif text-[4rem] font-light italic leading-[0.75] text-sakura"
                    >
                      {paragraph.charAt(0)}
                    </span>
                    {paragraph.slice(1)}
                  </>
                ) : (
                  paragraph
                )}
              </motion.p>
            ))}

            {/* Pull-quote — serif italic with sakura left border */}
            <motion.blockquote
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="border-l-2 border-sakura pl-7 font-serif text-[1.8rem] font-light italic leading-snug text-fog"
            >
              “{article.pullQuote}”
            </motion.blockquote>
          </div>

          {/* F-004 上一篇 / 下一篇 —— 永远有下一步，也有回头路 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-glass-border bg-glass-border/40 sm:grid-cols-2"
          >
            <button
              type="button"
              onClick={onPrev}
              className="group flex min-h-[88px] cursor-pointer flex-col justify-center gap-2 bg-abyss px-7 py-6 text-left transition-colors duration-300 hover:bg-ink"
            >
              <span className="eyebrow flex items-center gap-2 text-ghost transition-colors group-hover:text-neon">
                <ArrowLeft size={13} strokeWidth={1.5} className="transition-transform duration-300 group-hover:-translate-x-1" />
                上一篇
              </span>
              <span className="font-serif text-lg font-light leading-snug text-mist transition-colors duration-300 group-hover:text-fog">
                {prev.pre}
                <em className="italic">{prev.accent}</em>
                {prev.post ?? ''}
              </span>
            </button>
            <button
              type="button"
              onClick={onNext}
              className="group flex min-h-[88px] cursor-pointer flex-col items-end justify-center gap-2 bg-abyss px-7 py-6 text-right transition-colors duration-300 hover:bg-ink"
            >
              <span className="eyebrow flex items-center gap-2 text-ghost transition-colors group-hover:text-sakura">
                下一篇
                <ArrowRight size={13} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <span className="font-serif text-lg font-light leading-snug text-mist transition-colors duration-300 group-hover:text-fog">
                {next.pre}
                <em className="italic">{next.accent}</em>
                {next.post ?? ''}
              </span>
            </button>
          </motion.div>
        </motion.article>
      </div>
    </motion.div>
  );
}
