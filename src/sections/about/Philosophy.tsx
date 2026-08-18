import { memo, useRef } from 'react';
import type { CSSProperties } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import GlassCard from '@/components/GlassCard';
import Reveal from '@/components/Reveal';

gsap.registerPlugin(ScrollTrigger);

const PILLS = [
  'SYSTEMS OVER SCREENS',
  'SILENCE IS UI',
  "BLOOM, DON'T BLINK",
  'CODE IS CLAY',
  'NIGHT IS A PALETTE',
  'NATURE IS THE ORIGINAL NETWORK',
  'SLOW IS SMOOTH',
  'STORY BEFORE FEATURE',
];

const PRINCIPLES = [
  {
    title: 'Systems over screens',
    body: 'Interfaces end; systems endure. I design the rules, not just the pixels.',
  },
  {
    title: 'Silence is UI',
    body: 'What a product refuses to say is part of its voice.',
  },
  {
    title: "Bloom, don't blink",
    body: 'Attention earned slowly lasts longer than attention seized.',
  },
];

/** Marquee keyframes — scoped class names, defined here (index.css is shared). */
const MARQUEE_CSS = `
.about-marquee {
  overflow: hidden;
  -webkit-mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
  mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
}
.about-marquee-track {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: max-content;
  animation: about-marquee 30s linear infinite;
  will-change: transform;
}
.about-marquee-reverse .about-marquee-track {
  animation-direction: reverse;
}
.about-marquee:hover .about-marquee-track {
  animation-play-state: paused;
}
@keyframes about-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
@media (prefers-reduced-motion: reduce) {
  .about-marquee-track { animation: none; }
}
`;

interface MarqueeRowProps {
  items: string[];
  reverse?: boolean;
}

/** Infinite pill loop — isolated + memoized so parent re-renders never reset it. */
const MarqueeRow = memo(function MarqueeRow({ items, reverse = false }: MarqueeRowProps) {
  const doubled = [...items, ...items];
  return (
    <div className={`about-marquee ${reverse ? 'about-marquee-reverse' : ''}`}>
      <div className="about-marquee-track py-1">
        {doubled.map((pill, i) => (
          <span key={`${pill}-${i}`} className="flex items-center gap-4">
            <span className="eyebrow whitespace-nowrap rounded-full border border-glass-border bg-glass px-6 py-3 text-mist backdrop-blur-md">
              {pill}
            </span>
            <span aria-hidden="true" className="text-[0.65rem] text-sakura/70">
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
});

/**
 * About §3 — Philosophy Tags. Neon eyebrow + word-split serif H2, two
 * glass-pill marquee rows (opposite directions, 30s loop, pause on hover),
 * then a 3-column GlassCard mini-grid (stagger 0.12s, up 40px).
 */
export default function Philosophy() {
  const rootRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const words = wordsRef.current?.querySelectorAll('[data-word]');
        if (!words || words.length === 0) return;
        gsap.set(words, { opacity: 0, y: 30, filter: 'blur(8px)' });
        gsap.to(words, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.9,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top 70%',
            once: true,
          },
        });
      });
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} className="relative overflow-hidden">
      <style>{MARQUEE_CSS}</style>
      <div className="mx-auto w-full max-w-[1280px] px-[clamp(1.25rem,5vw,4rem)] py-[clamp(6rem,14vh,11rem)]">
        <div className="flex flex-col items-center text-center">
          <p className="eyebrow text-neon">Operating Principles</p>
          <h2 ref={wordsRef} className="section-h2 mt-6 text-fog">
            <span data-word className="mr-[0.26em] inline-block will-change-transform">
              What
            </span>
            <span data-word className="mr-[0.26em] inline-block will-change-transform">
              I
            </span>
            <span
              data-word
              className="inline-block italic text-sakura will-change-transform"
            >
              Believe
            </span>
          </h2>
        </div>

        {/* Pill marquees — full-bleed within the section */}
        <div className="mt-16 flex flex-col gap-5">
          <MarqueeRow items={PILLS} />
          <MarqueeRow items={[...PILLS].reverse()} reverse />
        </div>

        {/* Principle cards */}
        <Reveal className="mt-20 grid gap-6 md:grid-cols-3">
          {PRINCIPLES.map((principle, i) => (
            <div
              key={principle.title}
              className="reveal-item"
              style={{ '--reveal-delay': `${i * 0.12}s` } as CSSProperties}
            >
              <GlassCard className="h-full p-8">
                <div className="flex h-full flex-col gap-4">
                  <h3 className="card-title text-fog">{principle.title}</h3>
                  <p className="body-text text-[0.95rem]">{principle.body}</p>
                </div>
              </GlassCard>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
