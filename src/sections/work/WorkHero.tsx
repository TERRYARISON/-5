import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import ArrowButton from '@/components/ArrowButton';
import { WORK_HERO } from '@/content/work';

gsap.registerPlugin(ScrollTrigger);

/** 页头文字与背景在 src/content/work.ts 里改 */
const TITLE_WORDS = WORK_HERO.titleWords;

/** Section anchors the index counter tracks (hero = 01, then the four groups). */
const COUNTER_IDS = ['work-hero', 'group-digital', 'group-covers', 'group-art', 'group-studio'];

/**
 * Section 1 — page hero (work.md §1). 70vh, reclining portrait right-anchored
 * with a slow 20s Ken Burns (scale 1.0 → 1.08), heavy left scrim (same recipe
 * as the home hero), editorial copy left, and a `01 / 05` scroll-position
 * counter bottom-right. Load animations are CSS-only; the scroll-out
 * parallax fade (y -60, opacity → 0 over the first 80vh) is GSAP, isolated
 * to this file.
 */
export default function WorkHero() {
  const rootRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [groupIndex, setGroupIndex] = useState(1);

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
            end: () => `+=${window.innerHeight * 0.8}`,
            scrub: true,
          },
        });
      });
    },
    { scope: rootRef },
  );

  // Scroll-position index counter (01 = hero … 05 = studio group).
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const mid = window.innerHeight * 0.5;
      let current = 1;
      COUNTER_IDS.forEach((id, i) => {
        const el = document.getElementById(id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= mid && rect.bottom >= mid) current = i + 1;
      });
      setGroupIndex(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const scrollToGrid = () => {
    document.getElementById('work-grid')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={rootRef} id="work-hero" className="relative flex min-h-[70vh] items-center overflow-hidden">
      {/* Local 20s / 1.08 Ken Burns variant (shared keyframes are 24s / 1.12) */}
      <style>{`
        @keyframes work-hero-kb {
          from { transform: scale(1) translate(0, 0); }
          to { transform: scale(1.08) translate(-1%, -1.5%); }
        }
        .work-hero-kb-img { animation: work-hero-kb 20s ease-in-out infinite alternate; }
        @media (prefers-reduced-motion: reduce) {
          .work-hero-kb-img { animation: none; }
        }
      `}</style>

      <div className="kenburns-frame">
        <img
          src={WORK_HERO.img}
          alt="Biotech sakura concept film still"
          className="work-hero-kb-img h-full w-full object-cover will-change-transform"
          style={{ objectPosition: '50% 30%' }}
          draggable={false}
        />
        {WORK_HERO.video && (
          <video
            src={WORK_HERO.video}
            poster={WORK_HERO.img}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: '50% 30%' }}
            onError={(e) => {
              (e.currentTarget as HTMLVideoElement).style.display = 'none';
            }}
          />
        )}
        <div className="kenburns-vignette" />
      </div>

      {/* Heavy left legibility scrim (same recipe as home hero) */}
      <div
        className="hero-scrim anim-fade absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, rgba(7,7,13,0.85) 0%, rgba(7,7,13,0.35) 45%, transparent 70%)',
        }}
      />

      <div
        ref={contentRef}
        className="relative z-10 mx-auto w-full max-w-[1280px] px-[clamp(1.25rem,5vw,4rem)] pb-16 pt-[72px]"
      >
        <div className="max-w-[640px]">
          <p className="anim-rise eyebrow text-neon" style={{ animationDelay: '0.1s' }}>
            {WORK_HERO.eyebrow}
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

          <p className="anim-fade body-text mt-7 max-w-[46ch]" style={{ animationDelay: '0.7s' }}>
            {WORK_HERO.subtitle}
          </p>

          <div className="anim-pop mt-10" style={{ animationDelay: '0.9s' }}>
            <ArrowButton label={WORK_HERO.button} onClick={scrollToGrid} />
          </div>
        </div>
      </div>

      {/* Scroll-position index counter */}
      <p
        className="anim-fade eyebrow absolute bottom-8 right-[clamp(1.25rem,5vw,4rem)] z-10 text-ghost"
        style={{ animationDelay: '1.2s' }}
        aria-hidden="true"
      >
        {String(groupIndex).padStart(2, '0')} / 05
      </p>
    </section>
  );
}
