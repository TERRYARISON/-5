import type { CSSProperties } from 'react';
import Reveal from '@/components/Reveal';

const WORDS: { text: string; violet?: boolean }[] = [
  { text: 'Every' },
  { text: 'great' },
  { text: 'system' },
  { text: 'began' },
  { text: 'as' },
  { text: 'a' },
  { text: 'conversation.', violet: true },
];

/**
 * Section 3 — pre-footer manifesto echo (contact.md §3). Word-split rise on
 * scroll; the violet word lands last with a glow bloom, mirroring the Home
 * manifesto treatment.
 */
export default function FooterNote() {
  return (
    <section className="section-shell pt-0 text-center">
      <Reveal className="mx-auto max-w-[900px]" threshold={0.35}>
        <h2 className="manifesto-text text-fog">
          {WORDS.map((word, i) => (
            <span
              key={word.text}
              className="reveal-item inline-block"
              style={{ '--reveal-delay': `${0.06 * i}s` } as CSSProperties}
            >
              <span
                className={
                  word.violet
                    ? 'italic text-violet [text-shadow:0_0_32px_rgba(167,139,250,0.45)]'
                    : undefined
                }
              >
                {word.text}
              </span>
              {i < WORDS.length - 1 ? ' ' : ''}
            </span>
          ))}
        </h2>
        <p
          className="reveal-item eyebrow mt-8 text-ghost"
          style={{ '--reveal-delay': '0.55s' } as CSSProperties}
        >
          Response Time · Within 48 Hours
        </p>
      </Reveal>
    </section>
  );
}
