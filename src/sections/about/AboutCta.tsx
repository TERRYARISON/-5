import type { CSSProperties } from 'react';
import ArrowButton from '@/components/ArrowButton';
import Reveal from '@/components/Reveal';

const WORDS = ['Still', 'curious?'];

/**
 * About §5 — CTA. Centered serif line ("Still *curious*?", sakura italic
 * accent) + pulsing violet ArrowButton → /contact. Standard reveal.
 */
export default function AboutCta() {
  return (
    <section className="relative overflow-hidden">
      <Reveal className="section-shell flex flex-col items-center gap-12 text-center">
        <h2 className="section-h2 text-fog">
          {WORDS.map((word, i) => (
            <span
              key={word}
              className={`reveal-item mr-[0.26em] inline-block ${
                word === 'curious?' ? 'italic text-sakura' : ''
              }`}
              style={{ '--reveal-delay': `${i * 0.08}s` } as CSSProperties}
            >
              {word}
            </span>
          ))}
        </h2>
        <div className="reveal-item" style={{ '--reveal-delay': '0.3s' } as CSSProperties}>
          <ArrowButton label="Get in Touch" to="/contact" pulse />
        </div>
      </Reveal>
    </section>
  );
}
