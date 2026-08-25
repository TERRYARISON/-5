import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

/**
 * Section 2 — scroll camera journey (home.md §2). A pinned 100dvh stage with
 * 200vh of scroll distance: portrait-recline pushes from scale 1.0 → 2.2
 * toward the figure's face while its glass caption blurs out, crossfades to a
 * portrait-hero detail crop that continues to 2.4, a second caption lands,
 * and the whole stage fades to void.
 * Fallback (<768px or reduced motion): un-pinned, simple stacked crossfade.
 */
export default function CameraJourney() {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const frameARef = useRef<HTMLDivElement>(null);
  const frameBRef = useRef<HTMLDivElement>(null);
  const captionARef = useRef<HTMLDivElement>(null);
  const captionBRef = useRef<HTMLDivElement>(null);
  const frameAVideoRef = useRef<HTMLVideoElement>(null);
  // F-008 镜头旅程滚动提示：进度条 + “继续滚动”
  const hintRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const v = frameAVideoRef.current;
    if (!v) return;
    const tryPlay = () => v.play().catch(() => {});
    tryPlay();
    document.addEventListener('visibilitychange', tryPlay);
    return () => document.removeEventListener('visibilitychange', tryPlay);
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.set(frameBRef.current, { opacity: 0 });
        gsap.set(captionBRef.current, { opacity: 0, y: -20 });

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top top',
            end: '+=200%',
            scrub: 0.8,
            pin: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              if (progressRef.current) {
                progressRef.current.style.transform = `scaleX(${self.progress})`;
              }
              if (hintRef.current) {
                // 快走完时淡出提示
                hintRef.current.style.opacity = self.progress > 0.9 ? '0' : '1';
              }
            },
          },
        });

        // 0%–60%: push into frame A toward the face/upper torso.
        tl.fromTo(
          frameARef.current,
          { scale: 1, transformOrigin: '50% 38%' },
          { scale: 2.2, duration: 0.6 },
          0,
        );
        tl.to(captionARef.current, { opacity: 0, y: 30, filter: 'blur(10px)', duration: 0.5 }, 0);

        // 40%–70%: crossfade to the hero detail crop, keep pushing to 2.4.
        tl.to(frameBRef.current, { opacity: 1, duration: 0.3 }, 0.4);
        tl.fromTo(
          frameBRef.current,
          { scale: 2.2, transformOrigin: '50% 62%' },
          { scale: 2.4, duration: 0.6 },
          0.4,
        );

        // 70%–100%: second caption lands, then the stage fades to void.
        tl.to(captionBRef.current, { opacity: 1, y: 0, duration: 0.2, ease: 'power1.out' }, 0.72);
        tl.to(stageRef.current, { opacity: 0, duration: 0.12 }, 0.88);
      });

      mm.add('(max-width: 767px), (prefers-reduced-motion: reduce)', () => {
        gsap.set(frameBRef.current, { opacity: 0 });
        gsap.to(frameBRef.current, {
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top 70%',
            end: 'center center',
            scrub: true,
          },
        });
        gsap.fromTo(
          captionBRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            scrollTrigger: {
              trigger: rootRef.current,
              start: 'center 60%',
              end: 'center 40%',
              scrub: true,
            },
          },
        );
      });
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} className="relative bg-void">
      <div ref={stageRef} className="relative h-[100dvh] overflow-hidden">
        {/* Frame A — reclining portrait (ambient motion video over the still) */}
        <div ref={frameARef} className="absolute inset-0 will-change-transform">
          <img
            src="/journey-live.jpg"
            alt="Zheng Chao from behind, neon wings beneath the sakura trees"
            className="h-full w-full object-cover"
            style={{ objectPosition: '50% 30%' }}
            draggable={false}
          />
          <video
            ref={frameAVideoRef}
            src="/journey-live.mp4"
            poster="/journey-live.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: '50% 30%' }}
            onError={(e) => {
              (e.currentTarget as HTMLVideoElement).style.opacity = '0';
            }}
          />
        </div>

        {/* Frame B — hero portrait detail crop */}
        <div ref={frameBRef} className="absolute inset-0 will-change-transform">
          <img
            src="/portrait-hero.jpg"
            alt="Detail — crystal vines and circuit light"
            className="h-full w-full object-cover"
            style={{ objectPosition: '50% 55%' }}
            draggable={false}
          />
        </div>

        {/* Vignette */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 52%, rgba(7,7,13,0.72) 100%)',
          }}
        />

        {/* Caption A — bottom-left glass card */}
        <div
          ref={captionARef}
          className="glass-card absolute bottom-[10%] left-[clamp(1.25rem,5vw,4rem)] z-10 max-w-[380px] p-7"
        >
          <p className="eyebrow text-neon">The Practice</p>
          <p className="mt-4 font-serif text-[1.9rem] font-light leading-snug text-fog">
            Where circuits learn to <em className="italic text-sakura">bloom</em>.
          </p>
          <p className="body-text mt-4 text-[0.95rem]">
            Each project begins as a seed — a question about how we live with the systems we build.
          </p>
        </div>

        {/* Caption B — top-right */}
        <div
          ref={captionBRef}
          className="absolute right-[clamp(1.25rem,5vw,4rem)] top-[16%] z-10 max-w-[340px] text-right"
        >
          <p className="eyebrow text-neon">Detail</p>
          <p className="mt-4 font-serif text-[2rem] font-light leading-snug text-fog">
            Every trace of light is <em className="italic text-sakura">intentional</em>.
          </p>
        </div>

        {/* F-008 旅程进度提示 —— 告诉访客：继续滚动，镜头还没走完 */}
        <div
          ref={hintRef}
          className="pointer-events-none absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 transition-opacity duration-500"
        >
          <span className="eyebrow text-ghost">继续滚动 · Keep Scrolling</span>
          <span className="block h-px w-28 overflow-hidden bg-fog/15">
            <span
              ref={progressRef}
              className="block h-full w-full origin-left bg-sakura"
              style={{ transform: 'scaleX(0)' }}
            />
          </span>
        </div>
      </div>
    </section>
  );
}
