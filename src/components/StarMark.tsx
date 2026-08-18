interface StarMarkProps {
  size?: number;
  className?: string;
  /** Use a flat sakura stroke instead of the sakura→neon gradient. */
  flat?: boolean;
}

/**
 * Four-point star ✦ — the site logo mark.
 * Sakura → neon gradient stroke, 1.5px (design.md §6 / §9).
 */
export default function StarMark({ size = 24, className, flat = false }: StarMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <linearGradient id="star-mark-grad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F0A6C0" />
          <stop offset="100%" stopColor="#7DE8F0" />
        </linearGradient>
      </defs>
      <path
        d="M12 2 C12.9 7.1 16.9 11.1 22 12 C16.9 12.9 12.9 16.9 12 22 C11.1 16.9 7.1 12.9 2 12 C7.1 11.1 11.1 7.1 12 2 Z"
        stroke={flat ? '#F0A6C0' : 'url(#star-mark-grad)'}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
