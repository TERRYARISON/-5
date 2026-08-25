import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Compass, X } from 'lucide-react';
import { LOOP } from '../content/site';
import { useLang } from '../i18n';
import type { DictKey } from '../i18n';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

/** 路径 → 字典 key 映射 */
const KEY_OF: Record<string, DictKey> = {
  '/': 'nav.home',
  '/work': 'nav.work',
  '/novels': 'nav.novels',
  '/amulet': 'nav.amulet',
  '/app-lab': 'nav.app',
  '/journal': 'nav.journal',
  '/about': 'nav.about',
  '/contact': 'nav.contact',
};

/**
 * 「指南针」—— 固定在右下角的导航救命按钮（PRD 三铁律：
 * 永远知道自己在哪 / 永远有下一步 / 永远有回头路）。
 * 点开是一张小地图：当前位置高亮 + 全站入口 + 下一站大按钮。
 */
export default function CompassNav() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { t } = useLang();

  const idx = LOOP.findIndex((s) => s.to === pathname);
  const cur = idx === -1 ? 0 : idx;
  const next = LOOP[(cur + 1) % LOOP.length];

  // 路由一变就收起面板
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      {/* 触发按钮 —— 始终待在右下角，≥44px */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t('ui.sitemap')}
        className="group fixed bottom-6 right-6 z-[60] flex h-12 w-12 items-center justify-center rounded-full border border-glass-border bg-void/70 text-mist backdrop-blur-[14px] transition-all duration-300 hover:border-sakura/60 hover:text-sakura hover:shadow-[0_0_28px_rgba(240,166,192,0.35)]"
      >
        <Compass
          size={20}
          strokeWidth={1.5}
          className="transition-transform duration-700 ease-out group-hover:rotate-[135deg]"
        />
        <span className="absolute -left-1 -top-1 h-2.5 w-2.5 rounded-full bg-sakura shadow-[0_0_10px_rgba(240,166,192,0.9)]" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70] flex items-end justify-center bg-[rgba(7,7,13,0.72)] backdrop-blur-[10px] sm:items-center"
            onClick={() => setOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label={t('ui.sitemap')}
          >
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="w-full max-w-md rounded-t-[24px] border border-glass-border bg-ink/95 p-7 shadow-[0_-20px_80px_rgba(0,0,0,0.5)] sm:rounded-[24px]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 头部：当前位置 + 关闭 */}
              <div className="flex items-start justify-between">
                <div>
                  <p className="eyebrow text-ghost">{t('ui.youAreHere')}</p>
                  <p className="mt-2 font-serif text-2xl font-light text-sakura">
                    {t(KEY_OF[pathname] ?? 'nav.home')}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex min-h-[44px] items-center gap-2 rounded-full border border-glass-border px-4 text-mist transition-colors hover:border-sakura/50 hover:text-sakura"
                >
                  <X size={15} strokeWidth={1.5} />
                  <span className="eyebrow">{t('ui.close')}</span>
                </button>
              </div>

              {/* 全站地图 */}
              <nav aria-label={t('ui.sitemap')} className="mt-6 grid grid-cols-2 gap-2">
                {LOOP.map((s) => {
                  const active = s.to === pathname || (pathname === '/' && s.to === '/');
                  return (
                    <Link
                      key={s.to}
                      to={s.to}
                      className={`flex min-h-[48px] items-center justify-between rounded-xl border px-4 py-3 font-sans text-sm transition-all duration-300 ${
                        active
                          ? 'border-sakura/60 bg-sakura/10 text-sakura'
                          : 'border-glass-border bg-glass text-mist hover:border-neon/40 hover:text-neon'
                      }`}
                    >
                      {t(KEY_OF[s.to] ?? 'nav.home')}
                      {active && <span className="h-1.5 w-1.5 rounded-full bg-sakura" />}
                    </Link>
                  );
                })}
              </nav>

              {/* 下一站大按钮 */}
              <Link
                to={next.to}
                className="group mt-5 flex min-h-[56px] items-center justify-between rounded-2xl border border-violet/40 bg-violet/10 px-5 transition-all duration-300 hover:border-violet hover:bg-violet/20 hover:shadow-[0_0_32px_rgba(167,139,250,0.3)]"
              >
                <span>
                  <span className="eyebrow block text-ghost">{t('ui.nextStation')}</span>
                  <span className="mt-1 block font-serif text-xl font-light text-fog">
                    {t(KEY_OF[next.to] ?? 'nav.home')}
                  </span>
                </span>
                <ArrowRight
                  size={20}
                  strokeWidth={1.5}
                  className="text-violet transition-transform duration-300 group-hover:translate-x-1.5"
                />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
