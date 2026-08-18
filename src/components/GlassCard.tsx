import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  /** Optional destination — renders the whole card as a link. */
  to?: string;
  onClick?: () => void;
}

/**
 * Frosted glass card (design.md §5.4). Visuals + hover physics (lift, sakura
 * border, glow, sheen sweep) live in the `.glass-card` class in index.css.
 */
export default function GlassCard({ children, className, to, onClick }: GlassCardProps) {
  const cls = `glass-card block ${className ?? ''}`;
  if (to) {
    return (
      <Link to={to} className={cls} onClick={onClick}>
        {children}
      </Link>
    );
  }
  return (
    <div className={cls} onClick={onClick}>
      {children}
    </div>
  );
}
