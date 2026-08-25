import type { CSSProperties } from 'react';
import Reveal from '@/components/Reveal';
import StarMark from '@/components/StarMark';
import { NOVELS } from '@/content/novels';
import type { Novel } from '@/content/novels';
import { statusMeta } from './novelStatus';

interface CoverWallProps {
  onOpen: (index: number) => void;
}

/** 无封面时的 2:3 占位卡 —— PlaceholderCard 风格（ink 底 + 樱花描边 + ✦）。 */
function CoverPlaceholder({ novel }: { novel: Novel }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-ink/95 p-5 text-center">
      <StarMark size={30} flat />
      <span className="font-serif text-lg font-light leading-snug text-fog">{novel.title}</span>
      <span className="eyebrow text-ghost">封面绘制中</span>
    </div>
  );
}

/**
 * 封面墙 —— 响应式网格（手机 2 列 / 平板 3 列 / 桌面 4 列 / 宽屏 5 列），
 * 封面统一 2:3 书封比例。Hover：上浮 + sakura 描边微光 + logline 浮现；
 * 左上角状态角标（已完结 / 连载中 / 创作中）。cover=null 渲染占位卡。
 */
export default function CoverWall({ onOpen }: CoverWallProps) {
  return (
    <section id="novel-wall" className="section-shell relative z-10">
      <Reveal>
        <p className="reveal-item eyebrow text-sakura">Shelf · 封面墙</p>
        <h2 className="reveal-item section-h2 mt-4 text-fog" style={{ '--reveal-delay': '0.08s' } as CSSProperties}>
          十册书，十种未过完的人生
        </h2>
        <p className="reveal-item body-text mt-5 max-w-[52ch]" style={{ '--reveal-delay': '0.16s' } as CSSProperties}>
          点开封面，读这本书的一句话简介与完整来历。还没有封面的，正在画。
        </p>
      </Reveal>

      <Reveal className="mt-12" threshold={0.05}>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-5 xl:grid-cols-5">
          {NOVELS.map((novel, i) => {
            const meta = statusMeta(novel);
            return (
              <li
                key={novel.id}
                className="reveal-item"
                style={{ '--reveal-delay': `${(i % 5) * 0.07}s` } as CSSProperties}
              >
                <button
                  type="button"
                  onClick={() => onOpen(i)}
                  aria-label={`查看《${novel.title}》详情`}
                  className="group relative block aspect-[2/3] w-full overflow-hidden rounded-[14px] border border-glass-border bg-ink text-left transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:border-sakura/60 hover:shadow-[0_18px_50px_rgba(240,166,192,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sakura"
                >
                  {novel.cover ? (
                    <img
                      src={novel.cover}
                      alt={`《${novel.title}》封面`}
                      loading="lazy"
                      draggable={false}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                    />
                  ) : (
                    <CoverPlaceholder novel={novel} />
                  )}

                  {/* 状态角标 */}
                  <span
                    className={`absolute left-2.5 top-2.5 rounded-full border px-2.5 py-1 font-sans text-[0.62rem] font-medium tracking-[0.14em] backdrop-blur-sm ${meta.className}`}
                  >
                    {meta.label}
                  </span>

                  {/* 底部渐隐 + 书名 / logline 浮现 */}
                  <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[rgba(7,7,13,0.92)] via-[rgba(7,7,13,0.45)] to-transparent px-3.5 pb-3.5 pt-14">
                    <span className="block font-serif text-base font-light leading-snug text-fog md:text-lg">
                      {novel.title}
                    </span>
                    <span className="mt-1.5 block font-sans text-[0.72rem] font-light leading-relaxed text-mist opacity-0 transition-all duration-500 [transform:translateY(8px)] group-hover:opacity-100 group-hover:[transform:translateY(0)] max-md:hidden">
                      {novel.logline}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </section>
  );
}
