import { motion } from 'framer-motion';
import type { FilterKey } from './data';
import { FILTERS } from './data';

interface FilterTabsProps {
  filter: FilterKey;
  onChange: (filter: FilterKey) => void;
  count: number;
}

/**
 * Section 2 — sticky filter tabs (work.md §2). Sits directly under the fixed
 * 72px navbar with a blurred void background. Glass pills; the active pill
 * gets a violet gradient fill + glow that slides between tabs via Framer
 * Motion `layoutId`. Desktop-only result count on the right.
 */
export default function FilterTabs({ filter, onChange, count }: FilterTabsProps) {
  return (
    <div className="sticky top-[72px] z-40 border-b border-glass-border/60 bg-[rgba(7,7,13,0.55)] backdrop-blur-[16px]">
      <div className="relative mx-auto flex w-full max-w-[1280px] items-center justify-center px-[clamp(1.25rem,5vw,4rem)] py-4">
        <nav className="flex flex-wrap items-center justify-center gap-2 sm:gap-3" aria-label="Filter projects">
          {FILTERS.map(({ key, label }) => {
            const active = filter === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => onChange(key)}
                aria-pressed={active}
                className={`relative rounded-full border px-5 py-2.5 transition-colors duration-300 ${
                  active ? 'border-violet/60' : 'border-glass-border bg-glass hover:border-sakura/40'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="work-filter-active"
                    className="absolute inset-0 rounded-full bg-gradient-to-br from-violet to-violet-deep shadow-[0_0_32px_rgba(167,139,250,0.45)]"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.55 }}
                  />
                )}
                <span
                  className={`eyebrow relative z-10 transition-colors duration-300 ${
                    active ? 'text-fog' : 'text-ghost hover:text-fog'
                  }`}
                >
                  {label}
                </span>
              </button>
            );
          })}
        </nav>

        <p className="eyebrow absolute right-[clamp(1.25rem,5vw,4rem)] hidden text-ghost lg:block">
          {count} Pieces
        </p>
      </div>
    </div>
  );
}
