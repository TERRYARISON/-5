import { useRef } from 'react';
import type { CSSProperties } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import ArrowButton from '@/components/ArrowButton';
import Reveal from '@/components/Reveal';
import { ARTICLES } from './articles';

gsap.registerPlugin(ScrollTrigger);

const FEATURED = ARTICLES[0];

/**
 * Section 2 — featured essay (journal.md §2). Sticky 4:5 image on the left
 * with clip-reveal + micro-parallax (y ±20px, GSAP scrub); editorial copy on
 * the right with the standard reveal stagger.
 */
export default function FeaturedEssay({ onRead }: { onRead: () => void }) {
  const rootRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference) and (min-width: 768px)', () => {
        gsap.fromTo(
          imgRef.current,
          { y: -20 },
          {
            y: 20,
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
    <section ref={rootRef} className="section-shell">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:items-start md:gap-10">
        {/* Left — sticky image (span 6) */}
        <Reveal className="md:sticky md:top-[104px] md:col-span-6" threshold={0.2}>
          <div className="group clip-reveal overflow-hidden rounded-2xl">
            <img
              ref={imgRef}
              src={FEATURED.image ?? undefined}
              alt={FEATURED.imageAlt}
              className="aspect-[4/5] w-full scale-[1.08] object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.13]"
              draggable={false}
            />
          </div>
        </Reveal>

        {/* Right — copy (span 5, offset 1) */}
        <Reveal className="flex flex-col justify-center md:col-span-5 md:col-start-8" threshold={0.2}>
          <p className="reveal-item eyebrow text-ghost">
            <span className="text-neon">FEATURED ESSAY</span> · MAR 12, 2025 · 5 MIN READ
          </p>
          <h2
            className="reveal-item section-h2 mt-5 text-fog"
            style={{ '--reveal-delay': '0.1s' } as CSSProperties}
          >
            {FEATURED.pre}
            <em className="italic text-sakura">{FEATURED.accent}</em>
          </h2>
          <p
            className="reveal-item body-text mt-6"
            style={{ '--reveal-delay': '0.2s' } as CSSProperties}
          >
            The studio teaches you to listen before you speak. Between the ON AIR light and the
            take, there is a silence that does the real work — the same silence good interfaces
            leave between a question and an answer.
          </p>
          <p
            className="reveal-item body-text mt-5"
            style={{ '--reveal-delay': '0.28s' } as CSSProperties}
          >
            Every channel competes for attention — the talkback, the metering bridge, the
            producer’s quiet cough behind the glass. The engineer’s craft is knowing which channel
            to mute.
          </p>
          <p
            className="reveal-item body-text mt-5"
            style={{ '--reveal-delay': '0.36s' } as CSSProperties}
          >
            Interfaces fail the same way mixes do: not from too little signal, but from too much of
            it, all at once, all insisting.
          </p>
          <div
            className="reveal-item mt-10"
            style={{ '--reveal-delay': '0.44s' } as CSSProperties}
          >
            <ArrowButton label="Read Essay" onClick={onRead} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
