import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const ENTRIES: { year: string; role: string; body: string; current?: boolean; offset: string }[] = [
  {
    year: '2025',
    role: 'Independent Practice',
    body: 'Building products, essays, and images under one roof — this site is the roof.',
    current: true,
    offset: '',
  },
  {
    year: '2023',
    role: 'Design Engineer',
    body: 'Shipped design systems and AI-assisted creative tools.',
    offset: 'mt-20',
  },
  {
    year: '2021',
    role: 'Studio Director',
    body: 'Ran productions for brands and artists; learned systems from film sets.',
    offset: 'mt-28',
  },
  {
    year: '2019',
    role: 'First Light',
    body: 'First camera, first line of code, first all-nighter — in the same month.',
    offset: 'mt-24',
  },
];

/**
 * About §4 — Timeline. Max-width 760px vertical rail: 1px glass base line
 * with a sakura gradient fill that draws downward on scroll (scaleY
 * scrubbed). Glowing 8px sakura nodes pop in (scale 0 → 1, spring) as they
 * enter; entries slide in from the right 24px, staggered 0.1s.
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

        // Entries slide in from the right 24px, staggered 0.1s.
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
        <div ref={listRef} className="relative">
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

          {ENTRIES.map((entry) => (
            <article key={entry.year} data-entry className={`relative pl-12 ${entry.offset}`}>
              {/* Glowing sakura node */}
              <span
                data-node
                aria-hidden="true"
                className="absolute left-0 top-[0.9rem] h-2 w-2 rounded-full bg-sakura shadow-[0_0_12px_rgba(240,166,192,0.8)]"
              />
              <p
                className={`font-serif text-[2rem] font-light leading-none ${
                  entry.current ? 'text-sakura' : 'text-fog'
                }`}
              >
                {entry.year}
              </p>
              <p className="eyebrow mt-3 text-neon">{entry.role}</p>
              <p className="body-text mt-3 text-[0.95rem]">{entry.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
