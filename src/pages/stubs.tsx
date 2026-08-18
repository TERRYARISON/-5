import type { ReactNode } from 'react';

/**
 * Temporary route stubs — replaced by the page agents. Styled to sit
 * correctly under the fixed overlay nav (72px) with the shared petal canvas
 * behind.
 */
function Stub({ children }: { children: ReactNode }) {
  return (
    <section className="section-shell flex min-h-[70vh] flex-col items-start justify-center pt-[calc(72px+clamp(6rem,14vh,11rem))]">
      <p className="eyebrow text-neon">Coming Soon</p>
      <h1 className="section-h2 mt-5 text-fog">{children}</h1>
    </section>
  );
}

export function Work() {
  return (
    <Stub>
      Projects <em className="italic text-sakura">&</em> Concepts
    </Stub>
  );
}

export function Journal() {
  return (
    <Stub>
      Notes From the <em className="italic text-sakura">Night</em>.
    </Stub>
  );
}

export function About() {
  return (
    <Stub>
      From <em className="italic text-sakura">Within</em>.
    </Stub>
  );
}

export function Contact() {
  return (
    <Stub>
      Let&apos;s build from <em className="italic text-sakura">within</em>.
    </Stub>
  );
}
