import type { CSSProperties } from 'react';
import { Mail } from 'lucide-react';
import Reveal from '@/components/Reveal';
import { AMULET_CTA } from '@/content/amulet';
import { SOCIALS } from '@/content/site';

/**
 * Section 4 — 交流 CTA。标题 + 描述 + 「写信给我」大按钮（mailto，邮箱取自
 * site.ts 的 SOCIALS.email）。hover 有微光扫过与轻微上浮，触控高度 ≥44px。
 */
export default function AmuletCta() {
  return (
    <section className="section-shell relative overflow-hidden text-center">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(240,166,192,0.1) 0%, transparent 60%)' }}
      />

      <Reveal className="relative mx-auto max-w-[720px]">
        <p className="reveal-item eyebrow text-neon">Correspondence · 结缘</p>
        <h2
          className="reveal-item section-h2 mt-5 text-fog"
          style={{ '--reveal-delay': '0.1s' } as CSSProperties}
        >
          {AMULET_CTA.title}
        </h2>
        <p
          className="reveal-item body-text mx-auto mt-6 max-w-[46ch]"
          style={{ '--reveal-delay': '0.2s' } as CSSProperties}
        >
          {AMULET_CTA.desc}
        </p>

        <div className="reveal-item mt-12" style={{ '--reveal-delay': '0.32s' } as CSSProperties}>
          <a
            href={`mailto:${SOCIALS.email}?subject=${encodeURIComponent('泰瑞堂 · 聊聊佛牌')}`}
            className="group relative inline-flex min-h-[52px] items-center gap-3 overflow-hidden rounded-full bg-gradient-to-br from-sakura to-sakura-deep px-9 py-4 font-sans text-[0.86rem] font-medium tracking-[0.18em] text-void transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_44px_rgba(217,123,158,0.5)]"
          >
            {/* 微光扫过 */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
            />
            <Mail
              size={17}
              strokeWidth={1.75}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:-translate-y-0.5"
            />
            写信给我
          </a>
          <p className="eyebrow mt-6 text-ghost">{SOCIALS.email}</p>
        </div>
      </Reveal>
    </section>
  );
}
