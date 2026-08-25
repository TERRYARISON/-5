import { useState } from 'react';
import type { CSSProperties } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Reveal from '@/components/Reveal';
import { CASES } from '@/content/profile';
import CaseLightbox from './CaseLightbox';
import type { CaseItem } from './CaseLightbox';

/**
 * About §4 — 精选案例墙 (CASES 四条). Two-column editorial grid (single
 * column on mobile): 首图大图 (hover: zoom 1.05 + sakura border + corner
 * affordance, opens the F-003 案例灯箱) → title serif → kpi neon 强调 →
 * role eyebrow → desc. Per-card Reveal stagger. Images loading="lazy".
 * All content from src/content/profile.ts.
 */
export default function CaseWall() {
  const [openCase, setOpenCase] = useState<CaseItem | null>(null);

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto w-full max-w-[1280px] px-[clamp(1.25rem,5vw,4rem)] py-[clamp(6rem,14vh,11rem)]">
        <Reveal>
          <p className="reveal-item eyebrow text-neon">Selected Cases · 精选案例</p>
          <h2
            className="reveal-item section-h2 mt-6 text-fog"
            style={{ '--reveal-delay': '0.08s' } as CSSProperties}
          >
            案例
          </h2>
        </Reveal>

        <Reveal className="mt-16 grid gap-x-10 gap-y-20 md:grid-cols-2">
          {CASES.map((item, i) => (
            <article
              key={item.id}
              className="reveal-item"
              style={{ '--reveal-delay': `${(i % 2) * 0.12}s` } as CSSProperties}
            >
              {/* 首图 — click opens the case lightbox */}
              <button
                type="button"
                aria-label={`查看「${item.title}」组图，共 ${item.img.length} 张`}
                onClick={() => setOpenCase(item)}
                className="group relative block w-full cursor-pointer overflow-hidden rounded-2xl border border-glass-border text-left transition-colors duration-500 hover:border-sakura/50"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={item.img[0]}
                    alt={item.title}
                    loading="lazy"
                    draggable={false}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                {/* 图数 chip */}
                <span className="eyebrow absolute bottom-4 left-4 rounded-full border border-glass-border bg-void/60 px-4 py-2 text-fog backdrop-blur-md">
                  共 {item.img.length} 张
                </span>
                {/* hover affordance — 44px circle */}
                <span
                  aria-hidden="true"
                  className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-glass-border bg-void/60 text-fog opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100"
                >
                  <ArrowUpRight size={16} strokeWidth={1.75} />
                </span>
              </button>

              <div className="mt-7">
                <h3 className="card-title text-fog">{item.title}</h3>
                <p className="mt-3 font-sans text-[0.9rem] font-light tracking-[0.06em] text-neon">
                  {item.kpi}
                </p>
                <p className="eyebrow mt-3 text-ghost">{item.role}</p>
                <p className="body-text mt-4 text-[0.95rem]">{item.desc}</p>
                <button
                  type="button"
                  onClick={() => setOpenCase(item)}
                  className="eyebrow mt-6 flex min-h-[44px] items-center gap-2 text-sakura transition-colors duration-300 hover:text-fog"
                >
                  查看组图
                  <ArrowUpRight size={14} strokeWidth={1.75} />
                </button>
              </div>
            </article>
          ))}
        </Reveal>
      </div>

      <CaseLightbox item={openCase} onClose={() => setOpenCase(null)} />
    </section>
  );
}
