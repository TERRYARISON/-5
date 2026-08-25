import { Link } from 'react-router-dom';
import type { CSSProperties } from 'react';
import { ArrowRight, BookOpen, Sparkles, TerminalSquare } from 'lucide-react';
import Reveal from '@/components/Reveal';
import { useLang } from '@/i18n';
import type { DictKey } from '@/i18n';
import { WORLDS_CONTENT } from '@/content/home';

interface World {
  to: string;
  eyebrow: string;
  titleKey: DictKey;
  desc: string;
  img: string;
  icon: typeof BookOpen;
  accentText: string;   // 完整类名（JIT 需要）
  accentLine: string;
  accentGlow: string;
  layout: string;
}

/** 三个世界的图片与文案在 src/content/home.ts 的 WORLDS_CONTENT 里改 */
const WORLDS: World[] = [
  {
    to: '/novels',
    eyebrow: WORLDS_CONTENT.entries.novels.eyebrow,
    titleKey: 'home.worlds.novels',
    desc: WORLDS_CONTENT.entries.novels.desc,
    img: WORLDS_CONTENT.entries.novels.img,
    icon: BookOpen,
    accentText: 'text-sakura',
    accentLine: 'border-sakura/50 group-hover:border-sakura',
    accentGlow: 'group-hover:border-sakura/35',
    layout: 'md:col-span-7 md:row-span-2 min-h-[420px] md:min-h-[560px]',
  },
  {
    to: '/amulet',
    eyebrow: WORLDS_CONTENT.entries.amulet.eyebrow,
    titleKey: 'home.worlds.amulet',
    desc: WORLDS_CONTENT.entries.amulet.desc,
    img: WORLDS_CONTENT.entries.amulet.img,
    icon: Sparkles,
    accentText: 'text-neon',
    accentLine: 'border-neon/50 group-hover:border-neon',
    accentGlow: 'group-hover:border-neon/35',
    layout: 'md:col-span-5 min-h-[280px]',
  },
  {
    to: '/app-lab',
    eyebrow: WORLDS_CONTENT.entries.app.eyebrow,
    titleKey: 'home.worlds.app',
    desc: WORLDS_CONTENT.entries.app.desc,
    img: WORLDS_CONTENT.entries.app.img,
    icon: TerminalSquare,
    accentText: 'text-violet',
    accentLine: 'border-violet/50 group-hover:border-violet',
    accentGlow: 'group-hover:border-violet/35',
    layout: 'md:col-span-5 min-h-[280px]',
  },
];

/**
 * 首页「三个世界」入口 —— 小说 / 佛牌 / APP。
 * 大图 + 压暗 + hover 位移微光，一眼即懂，细看有心机。
 */
export default function Worlds() {
  const { t } = useLang();
  return (
    <section className="relative">
      <div className="section-shell">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[560px]">
            <p className="reveal-item eyebrow text-ghost">More Worlds · {t('home.worlds.eyebrow')}</p>
            <h2 className="reveal-item section-h2 mt-4 text-fog">
              {WORLDS_CONTENT.titlePre}<em className="italic text-sakura">{WORLDS_CONTENT.titleAccent}</em>
            </h2>
          </div>
          <p className="reveal-item body-text max-w-[36ch]" style={{ '--reveal-delay': '0.15s' } as CSSProperties}>
            {WORLDS_CONTENT.subtitle}
          </p>
        </Reveal>

        <Reveal className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-12" threshold={0.08}>
          {WORLDS.map((w, i) => (
            <div
              key={w.to}
              className={`reveal-item ${w.layout}`}
              style={{ '--reveal-delay': `${i * 0.14}s` } as CSSProperties}
            >
              <Link
                to={w.to}
                className="group relative flex h-full min-h-[inherit] flex-col justify-end overflow-hidden rounded-2xl border border-glass-border bg-abyss"
              >
                {/* 背景图 */}
                <img
                  src={w.img}
                  alt={t(w.titleKey)}
                  loading="lazy"
                  draggable={false}
                  className="absolute inset-0 h-full w-full object-cover opacity-55 transition-all duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.045] group-hover:opacity-75"
                />
                {/* 压暗 + 底部长渐变 */}
                <div className="absolute inset-0 bg-gradient-to-t from-void via-void/45 to-void/10 transition-opacity duration-700 group-hover:via-void/30" />

                {/* 内容 */}
                <div className="relative z-10 flex flex-col gap-3 p-7 sm:p-9">
                  <p className="eyebrow flex items-center gap-2 text-fog/60">
                    <w.icon size={14} strokeWidth={1.5} className={w.accentText} />
                    {w.eyebrow}
                  </p>
                  <h3 className="font-serif text-[clamp(2rem,4vw,3rem)] font-light leading-none text-fog">
                    {t(w.titleKey)}
                  </h3>
                  <p className="body-text max-w-[44ch] text-[0.95rem] opacity-0 transition-all duration-500 group-hover:opacity-100 md:translate-y-2 md:group-hover:translate-y-0">
                    {w.desc}
                  </p>
                  <span
                    className={`mt-3 inline-flex w-fit items-center gap-2 border-b pb-1 font-sans text-[0.8rem] uppercase tracking-[0.2em] transition-all duration-300 group-hover:gap-3.5 ${w.accentText} ${w.accentLine}`}
                  >
                    {t('ui.enter')} <ArrowRight size={14} strokeWidth={1.75} />
                  </span>
                </div>

                {/* hover 时整卡描边微光 */}
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-0 rounded-2xl border border-transparent transition-all duration-500 group-hover:shadow-[inset_0_0_60px_rgba(240,166,192,0.06)] ${w.accentGlow}`}
                />
              </Link>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
