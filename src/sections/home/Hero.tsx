import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import KenBurns from '@/components/KenBurns';
import ArrowButton from '@/components/ArrowButton';

gsap.registerPlugin(ScrollTrigger);

const TITLE_WORDS: { text: string; accent?: boolean }[] = [
  { text: 'Building' },
  { text: 'Meaningful' },
  { text: 'Tech,' },
  { text: 'From' },
  { text: 'Within.', accent: true },
];

/**
 * Section 1 — full-viewport hero (home.md §1). Ken Burns portrait right of
 * center, editorial copy on the left, scroll cue at bottom. Load animations
 * are CSS-only; the scroll parallax-fade is GSAP (isolated to this file).
 */
export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.to(contentRef.current, {
          opacity: 0,
          y: -60,
          ease: 'none',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      });
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} className="relative min-h-[100dvh] overflow-hidden">
      <KenBurns src="/portrait-hero.jpg" video="/hero-loop.mp4" alt="Zheng Chao — cyberpunk sakura portrait" position="65% 30%" />

      {/* Left legibility scrim */}
      <div
        className="anim-fade absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, rgba(7,7,13,0.85) 0%, rgba(7,7,13,0.35) 45%, transparent 70%)',
        }}
      />

      <div
        ref={contentRef}
        className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-[1280px] items-center px-[clamp(1.25rem,5vw,4rem)]"
      >
        <div className="max-w-[640px]">
          <p className="anim-rise eyebrow text-neon" style={{ animationDelay: '0.1s' }}>
            Portfolio — Est. 2025
          </p>

          <h1 className="hero-h1 mt-6 text-fog">
            {TITLE_WORDS.map((word, i) => (
              <span key={word.text} className="inline-block overflow-hidden pb-1 align-bottom">
                <span
                  className={`anim-rise inline-block ${word.accent ? 'italic text-sakura' : ''} ${
                    i < TITLE_WORDS.length - 1 ? 'mr-[0.24em]' : ''
                  }`}
                  style={{ animationDelay: `${0.25 + i * 0.08}s` }}
                >
                  {word.text}
                </span>
              </span>
            ))}
          </h1>

          <p className="anim-fade body-text mt-7 max-w-[46ch]" style={{ animationDelay: '0.85s' }}>
            Exploring the intersection of identity, intelligence, and imagination — one system at a
            time.
          </p>

          <div className="anim-pop mt-10" style={{ animationDelay: '1.05s' }}>
            <ArrowButton label="Explore Portfolio" to="/work" />
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        className="anim-fade absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
        style={{ animationDelay: '1.4s' }}
      >
        <span className="eyebrow text-ghost">Scroll</span>
        <span className="relative block h-12 w-px bg-sakura/40">
          <span className="scroll-cue-dot absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-sakura" />
        </span>
      </div>
    </section>
  );
}
