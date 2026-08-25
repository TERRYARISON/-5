import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Reveal from '@/components/Reveal';
import { PORTRAIT_MEDIA } from '@/content/profile';

gsap.registerPlugin(ScrollTrigger);

/**
 * About §2 — Street Diptych. Full-width photography interlude: centered
 * ghost eyebrow, two differently-proportioned frames (market 4:5 span 7,
 * tattoo 3:4 span 5 offset down 60px) with serif italic sakura captions.
 * Scroll-driven split parallax (left y −50, right y +50, scrubbed);
 * captions fade up 20px at 30% viewport. Hover: zoom 1.05 + sakura border.
 */
export default function StreetDiptych() {
  const rootRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLElement>(null);
  const rightRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Split parallax across the transit (scrub).
        gsap.fromTo(
          leftRef.current,
          { y: 0 },
          {
            y: -50,
            ease: 'none',
            scrollTrigger: {
              trigger: rootRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        );
        gsap.fromTo(
          rightRef.current,
          { y: 0 },
          {
            y: 50,
            ease: 'none',
            scrollTrigger: {
              trigger: rootRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        );

        // Captions fade up 20px when their figure is 30% into the viewport.
        rootRef.current?.querySelectorAll('[data-caption]').forEach((caption) => {
          gsap.fromTo(
            caption,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: caption,
                start: 'top 70%',
                once: true,
              },
            },
          );
        });
      });
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-abyss/40">
      <div className="section-shell">
        <Reveal className="flex justify-center">
          <p className="reveal-item eyebrow text-ghost">Field Observations</p>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-12">
          {/* Left — market (span 7, 4:5) */}
          <figure ref={leftRef} className="will-change-transform md:col-span-7">
            <div className="group overflow-hidden rounded-2xl border border-glass-border transition-colors duration-500 hover:border-sakura/50">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={PORTRAIT_MEDIA.streetLeft}
                  alt="Street photography — market light and shadow"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  draggable={false}
                />
              </div>
            </div>
            <figcaption
              data-caption
              className="mt-5 font-serif text-xl font-light italic text-sakura"
            >
              &quot;Markets are interfaces too.&quot;
            </figcaption>
          </figure>

          {/* Right — tattoo (span 5, 3:4, offset down 60px) */}
          <figure
            ref={rightRef}
            className="will-change-transform md:col-span-5 md:mt-[60px]"
          >
            <div className="group overflow-hidden rounded-2xl border border-glass-border transition-colors duration-500 hover:border-sakura/50">
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={PORTRAIT_MEDIA.streetRight}
                  alt="Street photography — tattooed arm in a Bangkok market"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  draggable={false}
                />
              </div>
            </div>
            <figcaption
              data-caption
              className="mt-5 font-serif text-xl font-light italic text-sakura"
            >
              &quot;Skin, ink, neon.&quot;
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
