import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { LOOP } from '../content/site';
import { useLang } from '../i18n';
import type { DictKey } from '../i18n';

const KEY_OF: Record<string, DictKey> = {
  '/': 'nav.home', '/work': 'nav.work', '/novels': 'nav.novels', '/amulet': 'nav.amulet',
  '/app-lab': 'nav.app', '/journal': 'nav.journal', '/about': 'nav.about', '/contact': 'nav.contact',
};

/**
 * 页底环线导航（PRD F-001：每一页都要有“下一步”和“回头路”）。
 * 用法：在每个页面最底部放 <SectionNav />，它会按 LOOP 顺序
 * 自动算出上一站 / 下一站。当前页不在环线里时默认回首页。
 */
export default function SectionNav() {
  const { pathname } = useLocation();
  const { t } = useLang();
  const idx = LOOP.findIndex((s) => s.to === pathname);
  const cur = idx === -1 ? 0 : idx;
  const prev = LOOP[(cur - 1 + LOOP.length) % LOOP.length];
  const next = LOOP[(cur + 1) % LOOP.length];

  return (
    <nav
      aria-label="继续游览"
      className="relative z-10 mx-auto grid w-full max-w-[1280px] grid-cols-2 gap-px overflow-hidden border-t border-glass-border bg-glass-border/40"
    >
      <Link
        to={prev.to}
        className="group flex min-h-[96px] flex-col justify-center gap-1.5 bg-abyss px-[clamp(1.25rem,5vw,4rem)] py-8 transition-colors duration-300 hover:bg-ink"
      >
        <span className="eyebrow flex items-center gap-2 text-ghost transition-colors group-hover:text-neon">
          <ArrowLeft size={13} strokeWidth={1.5} className="transition-transform duration-300 group-hover:-translate-x-1" />
          {t('ui.prev')}
        </span>
        <span className="font-serif text-xl font-light text-mist transition-colors duration-300 group-hover:text-fog sm:text-2xl">
          {t(KEY_OF[prev.to] ?? 'nav.home')}
        </span>
      </Link>
      <Link
        to={next.to}
        className="group flex min-h-[96px] flex-col items-end justify-center gap-1.5 bg-abyss px-[clamp(1.25rem,5vw,4rem)] py-8 text-right transition-colors duration-300 hover:bg-ink"
      >
        <span className="eyebrow flex items-center gap-2 text-ghost transition-colors group-hover:text-sakura">
          {t('ui.next')}
          <ArrowRight size={13} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-1" />
        </span>
        <span className="font-serif text-xl font-light text-mist transition-colors duration-300 group-hover:text-fog sm:text-2xl">
          {t(KEY_OF[next.to] ?? 'nav.home')}
        </span>
      </Link>
    </nav>
  );
}
