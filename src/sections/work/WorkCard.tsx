import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import GlassCard from '@/components/GlassCard';
import PlaceholderCard from '@/components/PlaceholderCard';
import type { WorkItem } from './data';

/**
 * Card motion (work.md §2/§3): enter = standard reveal (up 40px, staggered
 * 0.08s within each group), exit on filter switch = opacity 0, y 20,
 * scale 0.97, stagger 0.04s, 0.3s.
 */
export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.9, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
  exit: (i: number) => ({
    opacity: 0,
    y: 20,
    scale: 0.97,
    transition: { delay: i * 0.04, duration: 0.3, ease: 'easeIn' },
  }),
};

interface CardWrapperProps {
  item: WorkItem;
  index: number;
  onOpen: (id: string) => void;
  className?: string;
  children: ReactNode;
}

/** Motion + keyboard-accessible wrapper shared by every work card. */
export function CardWrapper({ item, index, onOpen, className, children }: CardWrapperProps) {
  return (
    <motion.div
      variants={cardVariants}
      custom={index}
      initial="hidden"
      whileInView="show"
      exit="exit"
      viewport={{ once: true, amount: 0.15 }}
      role="button"
      tabIndex={0}
      aria-label={`Open ${item.title} in lightbox`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen(item.id);
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function CardMeta({ item, compact = false }: { item: WorkItem; compact?: boolean }) {
  return (
    <div className={compact ? 'px-4 pb-5 pt-4' : 'px-5 pb-6 pt-5'}>
      <p className="eyebrow text-ghost">{item.eyebrow}</p>
      <h3 className={`card-title mt-3 text-fog ${compact ? 'text-[1.3rem]' : ''}`}>{item.title}</h3>
      {item.body && <p className="body-text mt-3 text-[0.95rem]">{item.body}</p>}
    </div>
  );
}

interface ImageCardProps {
  item: WorkItem;
  index: number;
  onOpen: (id: string) => void;
  /** Aspect utility for the image well, e.g. "aspect-[2/3]". */
  aspect: string;
  className?: string;
  compact?: boolean;
  /** 2px RGB-split chromatic shimmer on hover (Lumen Flora feature). */
  shimmer?: boolean;
}

/** Standard glass card: image top (16px rounded, 8px inset), meta below. */
export function ImageCard({ item, index, onOpen, aspect, className, compact, shimmer }: ImageCardProps) {
  return (
    <CardWrapper item={item} index={index} onOpen={onOpen} className={className}>
      <GlassCard onClick={() => onOpen(item.id)} className="group cursor-pointer p-2">
        <div className={`overflow-hidden rounded-[16px] ${aspect}`}>
          <img
            src={item.images[0]}
            alt={item.title}
            loading="lazy"
            draggable={false}
            className={`h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.06] ${
              shimmer
                ? 'group-hover:[filter:drop-shadow(2px_0_0_rgba(240,80,120,0.45))_drop-shadow(-2px_0_0_rgba(125,232,240,0.45))] group-hover:duration-[0.4s]'
                : ''
            }`}
          />
        </div>
        <CardMeta item={item} compact={compact} />
      </GlassCard>
    </CardWrapper>
  );
}

/** Concept project without imagery — CSS placeholder + body copy below. */
export function ConceptCard({
  item,
  index,
  onOpen,
  className,
}: {
  item: WorkItem;
  index: number;
  onOpen: (id: string) => void;
  className?: string;
}) {
  return (
    <CardWrapper item={item} index={index} onOpen={onOpen} className={className}>
      <div onClick={() => onOpen(item.id)} className="cursor-pointer">
        <PlaceholderCard title={item.title} eyebrow={item.eyebrow} />
        {item.body && <p className="body-text mt-4 text-[0.95rem]">{item.body}</p>}
      </div>
    </CardWrapper>
  );
}

/** Pulse triptych — three 4:5 screens in a ±4deg fan, outer cards lift on hover. */
export function TriptychCard({
  item,
  index,
  onOpen,
  className,
}: {
  item: WorkItem;
  index: number;
  onOpen: (id: string) => void;
  className?: string;
}) {
  return (
    <CardWrapper item={item} index={index} onOpen={onOpen} className={className}>
      <GlassCard onClick={() => onOpen(item.id)} className="group cursor-pointer p-2">
        <div className="flex items-center gap-3 p-2 sm:gap-4">
          {item.images.map((src, i) => (
            <div
              key={src}
              className={`aspect-[4/5] flex-1 overflow-hidden rounded-[16px] transition-transform duration-500 ease-out ${
                i === 0
                  ? 'rotate-[-4deg] group-hover:-translate-y-2'
                  : i === item.images.length - 1
                    ? 'rotate-[4deg] group-hover:-translate-y-2'
                    : ''
              }`}
            >
              <img
                src={src}
                alt={`${item.title} — screen ${i + 1}`}
                loading="lazy"
                draggable={false}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
        <CardMeta item={item} />
      </GlassCard>
    </CardWrapper>
  );
}

/** Studio Works banner — 12-col 21:9 crop, title overlaid on a bottom scrim. */
export function BannerCard({
  item,
  index,
  onOpen,
  className,
}: {
  item: WorkItem;
  index: number;
  onOpen: (id: string) => void;
  className?: string;
}) {
  return (
    <CardWrapper item={item} index={index} onOpen={onOpen} className={className}>
      <GlassCard onClick={() => onOpen(item.id)} className="group cursor-pointer p-0">
        <div className="relative aspect-[21/9] overflow-hidden rounded-[19px]">
          <img
            src={item.images[0]}
            alt={item.title}
            loading="lazy"
            draggable={false}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(0deg, rgba(7,7,13,0.85) 0%, rgba(7,7,13,0.25) 45%, transparent 70%)',
            }}
          />
          <div className="absolute bottom-0 left-0 p-6 sm:p-9">
            <p className="eyebrow text-neon">{item.eyebrow}</p>
            <h3 className="mt-3 font-serif text-[clamp(1.8rem,3.5vw,2.8rem)] font-light leading-[1.05] text-fog">
              {item.title}
            </h3>
          </div>
        </div>
      </GlassCard>
    </CardWrapper>
  );
}
