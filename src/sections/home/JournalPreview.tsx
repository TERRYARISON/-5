import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Reveal from '@/components/Reveal';

const ROWS = [
  {
    src: '/journal-2.jpg',
    title: 'The Studio After Midnight',
    meta: 'Field Notes · Feb 2025 · 4 min',
  },
  {
    src: '/journal-3.jpg',
    title: 'What a Set Teaches You About Systems',
    meta: 'Essay · Jan 2025 · 7 min',
  },
];

/** Section 5 — journal preview (home.md §5): two-column editorial layout. */
export default function JournalPreview() {
  return (
    <section className="section-shell">
      <Reveal className="flex items-end justify-between gap-8">
        <div>
          <p className="reveal-item eyebrow text-neon">Journal</p>
          <h2 className="reveal-item section-h2 mt-4 text-fog" style={{ '--reveal-delay': '0.1s' } as CSSProperties}>
            Notes From the <em className="italic text-sakura">Night</em>.
          </h2>
        </div>
        <Link
          to="/journal"
          className="reveal-item eyebrow hidden shrink-0 text-ghost transition-colors duration-300 hover:text-sakura sm:block"
          style={{ '--reveal-delay': '0.2s' } as CSSProperties}
        >
          Read All →
        </Link>
      </Reveal>

      <div className="mt-16 grid grid-cols-1 gap-14 md:grid-cols-12">
        {/* Featured article */}
        <Reveal className="md:col-span-7" threshold={0.2}>
          <Link to="/journal" className="group block">
            <div className="clip-reveal overflow-hidden rounded-2xl">
              <img
                src="/journal-1.jpg"
                alt="Recording studio with a glowing ON AIR sign"
                className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                draggable={false}
              />
            </div>
            <p className="reveal-item eyebrow mt-7 text-ghost" style={{ '--reveal-delay': '0.15s' } as CSSProperties}>
              Essay · Mar 2025 · 5 min
            </p>
            <h3
              className="reveal-item mt-3 font-serif text-[2rem] font-light leading-snug text-fog transition-colors duration-300 group-hover:text-sakura"
              style={{ '--reveal-delay': '0.22s' } as CSSProperties}
            >
              Notes on Signal &amp; Silence
            </h3>
            <p className="reveal-item body-text mt-3 max-w-[52ch]" style={{ '--reveal-delay': '0.3s' } as CSSProperties}>
              What a recording studio taught me about attention — why the quietest channel in the
              room is usually the one carrying everything that matters.
            </p>
          </Link>
        </Reveal>

        {/* Compact rows */}
        <Reveal className="flex flex-col justify-center md:col-span-5" threshold={0.2}>
          {ROWS.map((row, i) => (
            <Link
              key={row.title}
              to="/journal"
              className={`reveal-item-x group flex items-center gap-6 py-7 ${i > 0 ? 'border-t border-glass-border' : ''}`}
              style={{ '--reveal-delay': `${0.15 + i * 0.15}s` } as CSSProperties}
            >
              <div className="h-[90px] w-[120px] shrink-0 overflow-hidden rounded-xl">
                <img
                  src={row.src}
                  alt={row.title}
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.08]"
                  draggable={false}
                />
              </div>
              <div className="min-w-0">
                <p className="eyebrow text-ghost">{row.meta}</p>
                <h4 className="mt-2 font-serif text-xl font-normal leading-snug text-fog transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-sakura">
                  {row.title}
                </h4>
              </div>
              <ArrowRight
                size={16}
                strokeWidth={1.5}
                className="ml-auto shrink-0 text-sakura opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
              />
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
