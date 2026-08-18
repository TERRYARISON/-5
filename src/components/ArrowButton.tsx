import { useRef } from 'react';
import type { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface ArrowButtonProps {
  label: string;
  to?: string;
  onClick?: () => void;
  /** Gentle infinite glow pulse (used on the closing CTA). */
  pulse?: boolean;
  className?: string;
}

/**
 * Violet arrow button (design.md §5.5): uppercase label + 44px gradient
 * circle with an arrow that slides on hover. Subtle 6px magnetic attraction
 * on desktop pointers.
 */
export default function ArrowButton({ label, to, onClick, pulse = false, className }: ArrowButtonProps) {
  const ref = useRef<HTMLSpanElement>(null);

  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el || window.matchMedia('(pointer: coarse)').matches) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    const dist = Math.hypot(dx, dy) || 1;
    const pull = Math.min(6, dist * 0.08);
    el.style.transform = `translate(${(dx / dist) * pull}px, ${(dy / dist) * pull}px)`;
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = 'translate(0, 0)';
  };

  const content = (
    <span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`group inline-flex cursor-pointer items-center gap-4 transition-transform duration-300 ease-out ${className ?? ''}`}
    >
      <span className="font-sans text-[0.78rem] font-medium uppercase tracking-[0.22em] text-fog">
        {label}
      </span>
      <span
        className={`flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-violet to-violet-deep transition-all duration-300 group-hover:scale-[1.08] group-hover:shadow-[0_0_32px_rgba(167,139,250,0.45)] ${pulse ? 'glow-pulse' : ''}`}
      >
        <ArrowRight
          size={18}
          strokeWidth={1.75}
          className="text-void transition-transform duration-300 group-hover:translate-x-1"
        />
      </span>
    </span>
  );

  if (to) {
    return (
      <Link to={to} onClick={onClick} className="inline-block">
        {content}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className="inline-block bg-transparent p-0">
      {content}
    </button>
  );
}
