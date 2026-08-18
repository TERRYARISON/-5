import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Viewport threshold that triggers the reveal. Default 0.15 (design.md §7). */
  threshold?: number;
}

/**
 * Standard section reveal (design.md §7): children marked with the
 * `reveal-item` class slide up 40px and fade in, staggered via their
 * `--reveal-delay` CSS variable, the first time the wrapper enters the
 * viewport. Fires once.
 *
 * Usage:
 *   <Reveal>
 *     <h2 className="reveal-item">…</h2>
 *     <p className="reveal-item" style={{ '--reveal-delay': '0.1s' }}>…</p>
 *   </Reveal>
 */
export default function Reveal({ children, className, threshold = 0.15 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('is-inview');
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add('is-inview');
            io.disconnect();
          }
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
