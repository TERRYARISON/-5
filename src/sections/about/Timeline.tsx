import { useRef } from 'react';
import type { CSSProperties } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Reveal from '@/components/Reveal';
import { TIMELINE, CREDENTIALS } from '@/content/profile';

gsap.registerPlugin(ScrollTrigger);

/**
 * About §3 — 简历时间线 (TIMELINE, 时间倒序六段). Max-width 760px single
 * column (mobile-native): 1px glass base rail with a sakura gradient fill
 * drawn downward on scroll (scaleY scrubbed); glowing sakura nodes pop in
 * (scale 0 → 1, spring) as each entry enters; entries slide in from the
 * right 24px, batched. Each entry: period eyebrow (neon) → role serif
 * 大标题 → org eyebrow → points list with sakura ticks. CREDENTIALS chip
 * row below. All content from src/content/profile.ts.
 */
export default function Timeline() {
  const rootRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Rail draws downward with scroll.
        gsap.fromTo(
          railRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: listRef.current,
              start: 'top 75%',
              end: 'bottom 55%',
              scrub: true,
            },
          },
        );

        // Nodes pop (scale 0 → 1, spring) as they enter.
        listRef.current?.querySelectorAll('[data-node]').forEach((node) => {
          gsap.fromTo(
            node,
            { scale: 0 },
            {
              scale: 1,
              duration: 0.6,
              ease: 'back.out(3)',
              scrollTrigger: {
                trigger: node,
                start: 'top 82%',
                once: true,
              },
            },
          );
        });

        // Entries slide in from the right 24px, staggered 0.1s per batch.
        const entries = gsap.utils.toArray<HTMLElement>('[data-entry]', listRef.current);
        gsap.set(entries, { opacity: 0, x: 24 });
        ScrollTrigger.batch(entries, {
          start: 'top 85%',
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              x: 0,
              duration: 0.9,
              stagger: 0.1,
              ease: 'power3.out',
              overwrite: true,
            }),
        });
      });
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} className="relative bg-abyss/40">
      <div className="mx-auto w-full max-w-[760px] px-[clamp(1.25rem,5vw,4rem)] py-[clamp(6rem,14vh,11rem)]">
        <Reveal>
          <p className="reveal-item eyebrow text-neon">Resume · 简历</p>
          <h2 className="reveal-item section-h2 mt-6 text-fog" style={{ '--reveal-delay': '0.08s' } as CSSProperties}>
            经历
          </h2>
        </Reveal>

        <div ref={listRef} className="relative mt-16">
          {/* 1px glass base rail + scroll-drawn sakura fill */}
          <span
            aria-hidden="true"
            className="absolute bottom-2 left-[3.5px] top-2 w-px bg-glass-border"
          />
          <span
            ref={railRef}
            aria-hidden="true"
            className="absolute bottom-2 left-[3.5px] top-2 w-px origin-top bg-gradient-to-b from-sakura to-sakura-deep"
          />

          {TIMELINE.map((entry) => (
            <article key={entry.period} data-entry className="relative pb-16 pl-12 last:pb-0">
              {/* Glowing sakura node */}
              <span
                data-node
                aria-hidden="true"
                className="absolute left-0 top-[0.55rem] h-2 w-2 rounded-full bg-sakura shadow-[0_0_12px_rgba(240,166,192,0.8)]"
              />
              <p className="eyebrow text-neon">{entry.period}</p>
              <h3 className="mt-4 font-serif text-[clamp(1.8rem,4vw,2.5rem)] font-light leading-[1.15] text-fog">
                {entry.role}
              </h3>
              <p className="eyebrow mt-3 text-ghost">{entry.org}</p>
              <ul className="mt-6 space-y-3">
                {entry.points.map((point) => (
                  <li key={point} className="body-text flex gap-3 text-[0.95rem]">
                    <span
                      aria-hidden="true"
                      className="mt-[0.72em] h-1 w-1 shrink-0 rounded-full bg-sakura/70"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {/* 学历与证书 — chip row */}
        <Reveal className="mt-20">
          <p className="reveal-item eyebrow text-ghost">学历与证书</p>
          <ul className="mt-6 flex flex-wrap gap-3">
            {CREDENTIALS.map((cred, i) => (
              <li
                key={cred}
                className="reveal-item rounded-full border border-glass-border bg-glass px-5 py-3 font-sans text-[0.8rem] font-light tracking-[0.08em] text-mist backdrop-blur-md"
                style={{ '--reveal-delay': `${0.08 + i * 0.08}s` } as CSSProperties}
              >
                {cred}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
