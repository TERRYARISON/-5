import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import ArrowButton from '@/components/ArrowButton';
import { BIO } from '@/content/profile';

gsap.registerPlugin(ScrollTrigger);

/** 「Zheng Chao」from nameEn (drop the 「· Terry」 alias) — accent on the last word. */
const NAME_WORDS = BIO.nameEn.split('·')[0]!.trim().split(/\s+/);

/**
 * About §1 — Portrait Hero + 简介块 (100dvh). Left: about-live.mp4 living
 * portrait in a 9:16 glass-bordered frame, neon glow bleed, 26s Ken Burns,
 * scroll parallax +40px. Right: eyebrow, word-split serif H1 (BIO.nameEn),
 * ✦-separated meta row (name/age/city), BIO.intro 两段, BIO.tags glass
 * pills, BIO.motto serif-italic sakura accent, ArrowButton → /work.
 * All copy comes from src/content/profile.ts. GSAP only.
 */
export default function PortraitHero() {
  const rootRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Keep the ambient clip playing even when the browser defers autoplay.
    const v = videoRef.current;
    if (!v) return;
    const tryPlay = () => v.play().catch(() => {});
    tryPlay();
    document.addEventListener('visibilitychange', tryPlay);
    return () => document.removeEventListener('visibilitychange', tryPlay);
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const words = rootRef.current?.querySelectorAll('[data-hero-word]');
        const lines = rootRef.current?.querySelectorAll('[data-hero-line]');

        // Gentle Ken Burns inside the frame (overflow hidden on frameRef).
        gsap.fromTo(
          imgRef.current,
          { scale: 1 },
          { scale: 1.06, duration: 26, ease: 'sine.inOut', yoyo: true, repeat: -1 },
        );

        // Load timeline: clip-reveal from bottom + glow bloom, then headline
        // words (0.08s stagger), then paragraph/meta lines (0.06s, 20px).
        const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
        tl.fromTo(
          frameRef.current,
          { clipPath: 'inset(100% 0 0 0)' },
          { clipPath: 'inset(0% 0 0 0)', duration: 1.1 },
        )
          .fromTo(
            glowRef.current,
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 1.5 },
            0.15,
          )
          .fromTo(
            words ?? [],
            { opacity: 0, y: 24, filter: 'blur(6px)' },
            { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9, stagger: 0.08, ease: 'power3.out' },
            0.35,
          )
          .fromTo(
            lines ?? [],
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.06, ease: 'power3.out' },
            0.75,
          );

        // Scroll: portrait drifts +40px slower than the text column.
        gsap.to(wrapRef.current, {
          y: 40,
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
    <section
      ref={rootRef}
      className="relative flex min-h-[100dvh] items-center overflow-hidden pt-[72px]"
    >
      <div className="mx-auto grid w-full max-w-[1280px] items-center gap-14 px-[clamp(1.25rem,5vw,4rem)] py-[clamp(4rem,10vh,7rem)] md:grid-cols-12 md:gap-0">
        {/* Left — living portrait (span 5) */}
        <div className="relative md:col-span-5">
          {/* Neon glow bleed behind the portrait (12% opacity) */}
          <div
            ref={glowRef}
            aria-hidden="true"
            className="pointer-events-none absolute -inset-12 rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(125,232,240,0.12) 0%, transparent 65%)',
            }}
          />
          <div ref={wrapRef} className="relative">
            <div
              ref={frameRef}
              className="relative mx-auto aspect-[9/16] max-h-[72vh] w-full overflow-hidden rounded-[20px] border border-glass-border"
            >
              <img
                ref={imgRef}
                src="/about-live.jpg"
                alt={`${BIO.name} — black-gold kintsugi portrait with sakura`}
                className="h-full w-full object-cover will-change-transform"
                draggable={false}
              />
              <video
                ref={videoRef}
                src="/about-live.mp4"
                poster="/about-live.jpg"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="absolute inset-0 h-full w-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLVideoElement).style.display = 'none';
                }}
              />
            </div>
          </div>
        </div>

        {/* Right — bio copy (span 6, offset 1) */}
        <div className="md:col-span-6 md:col-start-7">
          <p data-hero-line className="eyebrow text-neon">
            About · 关于
          </p>
          <h1 className="hero-h1 mt-6 text-fog">
            {NAME_WORDS.map((word, i) => (
              <span
                key={word}
                data-hero-word
                className={`mr-[0.24em] inline-block will-change-transform ${
                  i === NAME_WORDS.length - 1 ? 'italic text-sakura' : ''
                }`}
              >
                {word}
              </span>
            ))}
          </h1>

          {/* Meta row — name / age / city, ✦-separated */}
          <div data-hero-line className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
            <span className="eyebrow text-fog">{BIO.name}</span>
            <span aria-hidden="true" className="text-[0.7rem] text-sakura">
              ✦
            </span>
            <span className="eyebrow text-ghost">{BIO.age} 岁</span>
            <span aria-hidden="true" className="text-[0.7rem] text-sakura">
              ✦
            </span>
            <span className="eyebrow text-ghost">{BIO.city}</span>
          </div>

          {/* Tags — glass pills */}
          <div data-hero-line className="mt-8 flex flex-wrap gap-3">
            {BIO.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-glass-border bg-glass px-5 py-2.5 font-sans text-[0.78rem] font-light tracking-[0.12em] text-mist backdrop-blur-md"
              >
                {tag}
              </span>
            ))}
          </div>

          <p data-hero-line className="body-text mt-8">
            {BIO.intro[0]}
          </p>
          <p data-hero-line className="body-text mt-5">
            {BIO.intro[1]}
          </p>

          {/* Motto — English italic accent */}
          <p data-hero-line className="mt-8 font-serif text-xl font-light italic text-sakura">
            {BIO.motto}
          </p>

          <div data-hero-line className="mt-11">
            <ArrowButton label="See My Work" to="/work" />
          </div>
        </div>
      </div>
    </section>
  );
}
