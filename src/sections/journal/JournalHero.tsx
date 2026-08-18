import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import KenBurns from '@/components/KenBurns';

gsap.registerPlugin(ScrollTrigger);

const TITLE_WORDS: { text: string; accent?: boolean }[] = [
  { text: 'Thinking' },
  { text: 'Out' },
  { text: 'Loud.', accent: true },
];

/**
 * Section 1 — journal hero (journal.md §1). 60vh full-bleed `journal-2.jpg`
 * Ken Burns under a 0.7 dark scrim; centered editorial copy with word-split
 * load rise, then a scroll-out parallax fade (GSAP, isolated to this file).
 */
export default function JournalHero() {
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
    <section ref={rootRef} className="relative flex min-h-[60vh] overflow-hidden">
      <KenBurns src="/journal-2.jpg" alt="Studio at night, city glow" />
      {/* Dark scrim 0.7 (journal.md §1) on top of the Ken Burns vignette */}
      <div className="anim-fade absolute inset-0 bg-[rgba(7,7,13,0.7)]" />

      <div
        ref={contentRef}
        className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-col items-center justify-center px-[clamp(1.25rem,5vw,4rem)] pb-16 pt-[72px] text-center"
      >
        <p className="anim-rise eyebrow text-neon" style={{ animationDelay: '0.1s' }}>
          Journal · Field Notes
        </p>

        <h1 className="hero-h1 mt-6 text-fog">
          {TITLE_WORDS.map((word, i) => (
            <span key={word.text} className="inline-block overflow-hidden pb-1 align-bottom">
              <span
                className={`anim-rise inline-block ${word.accent ? 'italic text-sakura' : ''} ${
                  i < TITLE_WORDS.length - 1 ? 'mr-[0.24em]' : ''
                }`}
                style={{ animationDelay: `${0.25 + i * 0.09}s` }}
              >
                {word.text}
              </span>
            </span>
          ))}
        </h1>

        <p className="anim-fade body-text mt-6 max-w-[52ch]" style={{ animationDelay: '0.82s' }}>
          Essays and fragments on design, intelligence, and the quiet hours.
        </p>
      </div>
    </section>
  );
}
