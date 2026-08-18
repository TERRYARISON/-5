import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const WORDS: { text: string; accent?: boolean }[] = [
  { text: 'To' },
  { text: 'gracefully' },
  { text: 'cultivate' },
  { text: 'a' },
  { text: 'newly' },
  { text: 'balanced' },
  { text: 'ecosystem,', accent: true },
  { text: 'we' },
  { text: 'dissolve' },
  { text: 'all' },
  { text: 'boundaries' },
  { text: 'between' },
  { text: 'technology' },
  { text: 'and' },
  { text: 'nature.' },
];

/**
 * Section 3 — manifesto (home.md §3). Centered serif statement with one
 * violet italic keyword, flanked by sakura hairlines. Words rise in with a
 * blur-out on scroll entry; the accent word lands last with a violet glow
 * bloom. GSAP only.
 */
export default function Manifesto() {
  const rootRef = useRef<HTMLElement>(null);
  const blockRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLParagraphElement>(null);
  const accentRef = useRef<HTMLSpanElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const words = wordsRef.current?.querySelectorAll('[data-word]');
        if (!words || words.length === 0) return;

        gsap.set(words, { opacity: 0, y: 30, filter: 'blur(8px)' });
        gsap.set(linesRef.current?.querySelectorAll('[data-line]') ?? [], { scaleX: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top 70%',
            once: true,
          },
        });

        tl.to(words, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.9,
          stagger: 0.05,
          ease: 'power3.out',
        });
        tl.to(
          linesRef.current?.querySelectorAll('[data-line]') ?? [],
          { scaleX: 1, duration: 1.1, ease: 'power3.out' },
          0.2,
        );
        // Accent word lands last with a violet glow bloom (0 → 0.45 → 0.3).
        tl.to(
          accentRef.current,
          {
            keyframes: [
              { textShadow: '0 0 34px rgba(167,139,250,0.45)', duration: 0.5 },
              { textShadow: '0 0 26px rgba(167,139,250,0.3)', duration: 0.6 },
            ],
          },
          '-=0.35',
        );

        // Gentle parallax drift across the viewport transit.
        gsap.to(blockRef.current, {
          y: -40,
          ease: 'none',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} className="relative flex min-h-[90vh] items-center overflow-hidden">
      {/* Faint radial sakura glow behind the text */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(240,166,192,0.12) 0%, transparent 65%)' }}
      />

      <div ref={blockRef} className="relative mx-auto w-full max-w-[900px] px-[clamp(1.25rem,5vw,4rem)] text-center">
        <p className="eyebrow text-neon">Manifesto</p>

        <div ref={linesRef} className="mt-10 flex items-center justify-center gap-8">
          <span data-line className="hidden h-px w-16 origin-center bg-sakura/50 sm:block" />
          <p ref={wordsRef} className="manifesto-text text-fog">
            {WORDS.map((word) => (
              <span
                key={word.text}
                data-word
                ref={word.accent ? accentRef : undefined}
                className={`mr-[0.26em] inline-block will-change-transform ${
                  word.accent ? 'italic text-violet' : ''
                }`}
              >
                {word.text}
              </span>
            ))}
          </p>
          <span data-line className="hidden h-px w-16 origin-center bg-sakura/50 sm:block" />
        </div>

        <p className="eyebrow mt-10 text-ghost">— Zheng Chao</p>
      </div>
    </section>
  );
}
