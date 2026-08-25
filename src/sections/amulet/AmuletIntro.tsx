import type { CSSProperties } from 'react';
import { Flower2 } from 'lucide-react';
import Reveal from '@/components/Reveal';
import { AMULET } from '@/content/amulet';

/**
 * Section 2 — 主介绍。AMULET.intro 三段以 manifesto 式大字号 serif 居中铺开，
 * Reveal 渐现；收尾是 AMULET.note 玻璃徽章，亮明「非盈利 · 以牌会友」立场。
 */
export default function AmuletIntro() {
  return (
    <section className="section-shell relative overflow-hidden text-center">
      {/* 背景暖光 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(217,123,158,0.09) 0%, transparent 62%)' }}
      />

      <Reveal className="relative mx-auto max-w-[900px]">
        <p className="reveal-item eyebrow text-neon">A Small Parlour · 以牌会友</p>

        <div className="mt-12 space-y-10">
          {AMULET.intro.map((line, i) => (
            <p
              key={line}
              className="reveal-item manifesto-text text-fog"
              style={{ '--reveal-delay': `${0.12 + i * 0.14}s` } as CSSProperties}
            >
              {line}
            </p>
          ))}
        </div>

        <div
          className="reveal-item mt-14"
          style={{ '--reveal-delay': '0.6s' } as CSSProperties}
        >
          <span className="inline-flex items-center gap-2.5 rounded-full border border-glass-border bg-glass px-6 py-3 backdrop-blur-md">
            <Flower2 size={15} strokeWidth={1.5} className="text-sakura" aria-hidden="true" />
            <span className="font-sans text-[0.82rem] tracking-[0.14em] text-mist">
              {AMULET.note}
            </span>
          </span>
        </div>
      </Reveal>
    </section>
  );
}
