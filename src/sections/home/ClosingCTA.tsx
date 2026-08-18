import { useRef } from 'react';
import type { CSSProperties } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import ArrowButton from '@/components/ArrowButton';
import Reveal from '@/components/Reveal';

gsap.registerPlugin(ScrollTrigger);

const WORDS = ["Let's", 'build', 'something', 'that', 'blooms.'];

/**
 * Section 6 — closing CTA (home.md §6). 60vh, heavily blurred reclining
 * portrait at 14% opacity behind a dark scrim, serif line with a sakura
 * accent word, and a gently pulsing violet arrow button. Background drifts
 * with inverse parallax.
 */
export default function ClosingCTA() {
  const rootRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          bgRef.current,
          { y: 30 },
          {
            y: -30,
            ease: 'none',
            scrollTrigger: {
              trigger: rootRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        );
      });
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} className="relative flex min-h-[60vh] items-center justify-center overflow-hidden">
      {/* Blurred backdrop */}
      <div ref={bgRef} className="absolute -inset-10">
        <img
          src="/portrait-recline.jpg"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover opacity-[0.14] blur-[40px]"
          draggable={false}
        />
        <div className="absolute inset-0 bg-void/70" />
      </div>

      <Reveal className="relative z-10 flex flex-col items-center gap-12 px-6 text-center">
        <h2 className="section-h2 text-fog">
          {WORDS.map((word, i) => (
            <span
              key={word}
              className={`reveal-item mr-[0.26em] inline-block ${word === 'blooms.' ? 'italic text-sakura' : ''}`}
              style={{ '--reveal-delay': `${i * 0.08}s` } as CSSProperties}
            >
              {word}
            </span>
          ))}
        </h2>
        <div className="reveal-item" style={{ '--reveal-delay': '0.5s' } as CSSProperties}>
          <ArrowButton label="Get in Touch" to="/contact" pulse />
        </div>
      </Reveal>
    </section>
  );
}
