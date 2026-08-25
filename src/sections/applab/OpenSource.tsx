import type { CSSProperties } from 'react';
import { Github, Star } from 'lucide-react';
import Reveal from '@/components/Reveal';
import { GITHUB_HOME } from '@/content/apps';

/**
 * 开源宣言小节 —— ink→void 渐变卡片，角落霓虹/樱花光晕，
 * 一颗「代码公开，欢迎围观」的诚恳心。
 */
export default function OpenSource() {
  return (
    <section className="section-shell pt-0">
      <Reveal threshold={0.2}>
        <div
          className="reveal-item relative overflow-hidden rounded-[24px] border border-glass-border bg-gradient-to-b from-ink to-void px-8 py-14 text-center sm:px-12"
        >
          {/* 角落光晕 */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(125,232,240,0.12) 0%, transparent 65%)' }}
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(240,166,192,0.12) 0%, transparent 65%)' }}
          />

          <p className="eyebrow text-neon">Open Source · 开源</p>
          <h2 className="mx-auto mt-5 max-w-[20ch] font-serif text-[clamp(1.9rem,4vw,2.8rem)] font-light leading-snug text-fog">
            代码摊在阳光下，<span className="text-sakura">欢迎围观</span>
          </h2>
          <p
            className="reveal-item body-text mx-auto mt-6 max-w-[52ch]"
            style={{ '--reveal-delay': '0.15s' } as CSSProperties}
          >
            这些小应用的源码都公开在 GitHub：可以读、可以抄、可以提 issue，更欢迎顺手点一颗 Star——那是对独立创作者最便宜的打赏。
          </p>

          <div className="reveal-item mt-10 flex justify-center" style={{ '--reveal-delay': '0.28s' } as CSSProperties}>
            <a
              href={GITHUB_HOME}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex min-h-[48px] items-center gap-3 rounded-full border border-neon/50 bg-neon/10 px-8 py-3 font-sans text-sm text-neon transition-all duration-300 hover:border-neon hover:bg-neon/20 hover:shadow-[0_0_32px_rgba(125,232,240,0.3)]"
            >
              <Github size={17} strokeWidth={1.5} className="transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110" />
              github.com/TERRYARISON
              <Star size={14} strokeWidth={1.5} className="opacity-60 transition-opacity group-hover:opacity-100" />
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
