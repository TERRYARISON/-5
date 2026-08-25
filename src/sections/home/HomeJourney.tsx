import { Link } from 'react-router-dom';
import type { CSSProperties } from 'react';
import { ArrowRight } from 'lucide-react';
import Reveal from '@/components/Reveal';
import { TIMELINE } from '@/content/profile';
import { JOURNEY_SHOTS } from '@/content/home';
import { useLang } from '@/i18n';

/**
 * 首页「履历树」—— 中间竖向时间线（履历），左右两侧穿插案例现场图，
 * 像一棵树向两边伸出枝桠：文字和图同时进入视野，不用读完字才看到图。
 *
 * 桌面：左图 | 中间履历 | 右图 三栏，图与对应履历节点同行。
 * 手机：每个履历节点紧跟它的案例图，交替穿插。
 * 数据全部来自 src/content/profile.ts（TIMELINE），图片在 public/。
 */

/** 每段履历配一张案例现场图（与经历对应） */
/** 每段履历配一张案例现场图 —— 在 src/content/home.ts 的 JOURNEY_SHOTS 里改 */
const SHOTS = JOURNEY_SHOTS;

function Shot({ img, caption, delay, side }: { img: string; caption: string; delay: number; side: 'l' | 'r' }) {
  return (
    <figure
      className={`reveal-item group relative overflow-hidden rounded-2xl border border-glass-border ${
        side === 'l' ? 'md:-rotate-1' : 'md:rotate-1'
      } transition-transform duration-500 hover:rotate-0`}
      style={{ '--reveal-delay': `${delay}s` } as CSSProperties}
    >
      <img
        src={img}
        alt={caption}
        loading="lazy"
        draggable={false}
        className="aspect-[4/3] w-full object-cover opacity-80 transition-all duration-700 group-hover:scale-[1.04] group-hover:opacity-100"
      />
      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-void/90 to-transparent px-4 pb-3 pt-8 font-sans text-[0.72rem] tracking-[0.06em] text-mist">
        {caption}
      </figcaption>
    </figure>
  );
}

function Node({ i }: { i: number }) {
  const item = TIMELINE[i];
  return (
    <div className="relative pl-8 md:pl-0">
      {/* 节点圆点（桌面贴中线，手机贴左线） */}
      <span
        aria-hidden="true"
        className="absolute left-[5px] top-2 h-2.5 w-2.5 rounded-full border border-sakura bg-void shadow-[0_0_12px_rgba(240,166,192,0.7)] md:left-1/2 md:-translate-x-1/2"
      />
      <p className="eyebrow text-neon">{item.period}</p>
      <h3 className="mt-2 font-serif text-[1.55rem] font-light leading-snug text-fog">{item.role}</h3>
      <p className="mt-1 font-sans text-[0.85rem] font-light text-mist">{item.org}</p>
      <p className="mt-2.5 max-w-[38ch] font-sans text-[0.85rem] font-light leading-relaxed text-ghost md:mx-auto">
        {item.points[0]}
      </p>
    </div>
  );
}

export default function HomeJourney() {
  const { t } = useLang();
  return (
    <section className="relative overflow-hidden">
      {/* 背景微光 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-10rem] top-1/4 h-[30rem] w-[30rem] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.09) 0%, transparent 65%)' }}
      />
      <div className="section-shell">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[560px]">
            <p className="reveal-item eyebrow text-ghost">{t('home.journey.eyebrow')}</p>
            <h2 className="reveal-item section-h2 mt-4 text-fog">
              {t('home.journey.title')}
            </h2>
          </div>
          <p className="reveal-item body-text max-w-[36ch]" style={{ '--reveal-delay': '0.15s' } as CSSProperties}>
            {t('home.journey.cases')} —— 中间是履历，两边是现场。
          </p>
        </Reveal>

        {/* —— 桌面：三栏树状（左图 | 履历 | 右图） —— */}
        <Reveal className="mt-20 hidden md:block" threshold={0.05}>
          <div className="relative grid grid-cols-12 gap-x-8">
            {/* 中线 */}
            <span aria-hidden="true" className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-sakura/35 to-transparent" />
            {TIMELINE.map((_, i) => {
              const left = i % 2 === 0;
              return (
                <div key={i} className="reveal-item col-span-12 grid grid-cols-12 gap-x-8 pb-16" style={{ '--reveal-delay': `${i * 0.06}s` } as CSSProperties}>
                  <div className="col-span-3 flex items-center">
                    {left && <Shot img={SHOTS[i].img} caption={SHOTS[i].caption} delay={i * 0.06} side="l" />}
                  </div>
                  <div className="col-span-6 text-center">
                    <Node i={i} />
                  </div>
                  <div className="col-span-3 flex items-center">
                    {!left && <Shot img={SHOTS[i].img} caption={SHOTS[i].caption} delay={i * 0.06} side="r" />}
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>

        {/* —— 手机：履历与图交替穿插 —— */}
        <Reveal className="relative mt-14 md:hidden" threshold={0.05}>
          <span aria-hidden="true" className="absolute bottom-0 left-[9px] top-0 w-px bg-gradient-to-b from-transparent via-sakura/35 to-transparent" />
          {TIMELINE.map((_, i) => (
            <div key={i} className="reveal-item pb-12" style={{ '--reveal-delay': `${i * 0.05}s` } as CSSProperties}>
              <Node i={i} />
              <div className="mt-5 pl-8">
                <Shot img={SHOTS[i].img} caption={SHOTS[i].caption} delay={0.1} side={i % 2 === 0 ? 'l' : 'r'} />
              </div>
            </div>
          ))}
        </Reveal>

        <Reveal className="mt-4 flex justify-center md:mt-0">
          <Link
            to="/about"
            className="group inline-flex min-h-[48px] items-center gap-3 rounded-full border border-sakura/40 bg-sakura/10 px-8 py-3 font-sans text-sm text-sakura transition-all duration-300 hover:border-sakura hover:bg-sakura/20 hover:shadow-[0_0_32px_rgba(240,166,192,0.3)]"
          >
            {t('home.journey.more')}
            <ArrowRight size={15} strokeWidth={1.75} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
