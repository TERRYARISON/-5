import type { CSSProperties } from 'react';
import ArrowButton from '@/components/ArrowButton';
import Reveal from '@/components/Reveal';

/**
 * Section 5 — footer CTA strip (work.md §5): centered eyebrow, serif line
 * with the accent word in italic sakura, and a pulsing violet arrow button
 * to the journal. Standard section reveal.
 */
export default function WorkCTA() {
  return (
    <section className="relative z-10">
      <Reveal className="section-shell flex flex-col items-center gap-10 text-center">
        <p className="reveal-item eyebrow text-ghost">Next</p>
        <h2
          className="reveal-item section-h2 text-fog"
          style={{ '--reveal-delay': '0.1s' } as CSSProperties}
        >
          Curious about the <em className="italic text-sakura">process</em>?
        </h2>
        <div className="reveal-item" style={{ '--reveal-delay': '0.3s' } as CSSProperties}>
          <ArrowButton label="Read the Journal" to="/journal" pulse />
        </div>
      </Reveal>
    </section>
  );
}
