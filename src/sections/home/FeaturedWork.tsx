import type { CSSProperties } from 'react';
import { ArrowRight } from 'lucide-react';
import GlassCard from '@/components/GlassCard';
import ArrowButton from '@/components/ArrowButton';
import Reveal from '@/components/Reveal';

interface Project {
  title: string;
  eyebrow: string;
  meta?: string;
  body: string;
  ornament?: boolean;
  offset: string;
}

const PROJECTS: Project[] = [
  {
    title: 'Silicon Rituals',
    eyebrow: 'Digital Essay',
    meta: 'Reading time · 6 min',
    body: 'On the habits we keep with machines.',
    ornament: true,
    offset: 'md:col-start-1 md:col-span-5',
  },
  {
    title: 'Bloom',
    eyebrow: 'Wellness App Concept',
    body: 'An ambient wellness experience that blends nature, technology, and mindful living.',
    offset: 'md:col-start-7 md:col-span-5',
  },
  {
    title: 'Atelier',
    eyebrow: 'AI Co-Creation',
    body: 'A creative companion for moodboarding, ideation, and visual exploration.',
    offset: 'md:col-start-2 md:col-span-5 md:-mt-10',
  },
  {
    title: 'Fragments',
    eyebrow: 'Design System',
    body: 'UI components, interaction patterns, and visual language for digital storytellers.',
    offset: 'md:col-start-8 md:col-span-5 md:mt-10',
  },
];

/**
 * Section 4 — featured work (home.md §4). Four floating glass cards on an
 * asymmetric 12-col grid with staggered vertical offsets, continuous idle
 * float, and a drifting sakura-glow blob behind.
 */
export default function FeaturedWork() {
  return (
    <section className="relative overflow-hidden">
      {/* Slow-drifting sakura glow blob */}
      <div
        aria-hidden="true"
        className="float-slow pointer-events-none absolute -left-40 top-1/3 h-[34rem] w-[34rem] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(240,166,192,0.1) 0%, transparent 65%)',
          animationDuration: '9s',
        }}
      />

      <div className="section-shell relative">
        <Reveal className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[560px]">
            <h2 className="reveal-item section-h2 text-fog">
              Projects <em className="italic text-sakura">&</em> Concepts
            </h2>
            <p className="reveal-item body-text mt-5" style={{ '--reveal-delay': '0.1s' } as CSSProperties}>
              A collection of ideas, products, and systems — where creativity meets technology.
            </p>
          </div>
          <div className="reveal-item" style={{ '--reveal-delay': '0.2s' } as CSSProperties}>
            <ArrowButton label="Explore Projects" to="/work" />
          </div>
        </Reveal>

        <Reveal className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-x-10" threshold={0.1}>
          {PROJECTS.map((project, i) => (
            <div
              key={project.title}
              className={`reveal-item ${project.offset}`}
              style={{ '--reveal-delay': `${i * 0.12}s` } as CSSProperties}
            >
              <div className="float-slow" style={{ animationDelay: `${i * 1.25}s` }}>
                <GlassCard to="/work" className="p-7">
                  {project.ornament && (
                    <span className="mb-6 block h-px w-full bg-gradient-to-r from-neon/70 via-neon/25 to-transparent" />
                  )}
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="eyebrow text-ghost">{project.eyebrow}</p>
                    {project.meta && <p className="eyebrow text-ghost/70">{project.meta}</p>}
                  </div>
                  <h3 className="card-title mt-4 text-fog">{project.title}</h3>
                  <p className={`body-text mt-3 text-[0.95rem] ${project.ornament ? 'font-serif text-lg italic text-mist' : ''}`}>
                    {project.body}
                  </p>
                  <div className="mt-8 flex justify-end">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-violet/40 text-violet transition-all duration-300 group-hover:bg-violet/10">
                      <ArrowRight size={14} strokeWidth={1.75} />
                    </span>
                  </div>
                </GlassCard>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
