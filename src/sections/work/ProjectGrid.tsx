import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import type { WorkGroup, WorkItem } from './data';
import { BannerCard, ConceptCard, ImageCard, TriptychCard } from './WorkCard';

/** Group header reveal (work.md §3): eyebrow fade + hairline scaleX. */
const headerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
};

const eyebrowVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const hairlineVariants: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

function GroupHeader({ group }: { group: WorkGroup }) {
  return (
    <motion.div
      variants={headerVariants}
      initial="hidden"
      whileInView="show"
      exit="exit"
      viewport={{ once: true, amount: 0.6 }}
      className="mb-12 flex items-center gap-6"
    >
      <motion.p variants={eyebrowVariants} className="eyebrow shrink-0 text-ghost">
        {group.index} · {group.label}
      </motion.p>
      <motion.span
        variants={hairlineVariants}
        className="h-px flex-1 origin-left bg-glass-border"
        aria-hidden="true"
      />
    </motion.div>
  );
}

interface ProjectGroupProps {
  group: WorkGroup;
  items: WorkItem[];
  onOpen: (id: string) => void;
}

/**
 * Section 3 — one group's block of the project grid (work.md §3). 12-col
 * masonry-feel layout; every card opens the lightbox.
 */
export default function ProjectGroup({ group, items, onOpen }: ProjectGroupProps) {
  const byId = (id: string) => items.find((item) => item.id === id)!;
  const idx = (id: string) => items.findIndex((item) => item.id === id);

  return (
    <div id={`group-${group.key}`} className="scroll-mt-[140px]">
      <GroupHeader group={group} />

      {group.key === 'digital' && (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-x-10">
          <TriptychCard item={byId('pulse')} index={idx('pulse')} onOpen={onOpen} className="md:col-span-8" />
          <ConceptCard item={byId('silicon-rituals')} index={idx('silicon-rituals')} onOpen={onOpen} className="md:col-span-4" />
          <ConceptCard item={byId('atelier')} index={idx('atelier')} onOpen={onOpen} className="md:col-span-4" />
          <ConceptCard item={byId('fragments')} index={idx('fragments')} onOpen={onOpen} className="md:col-span-4" />
          <ConceptCard item={byId('bloom')} index={idx('bloom')} onOpen={onOpen} className="md:col-span-4" />
        </div>
      )}

      {group.key === 'covers' && (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-12 md:gap-x-10">
          {items.map((item, i) => (
            <ImageCard
              key={item.id}
              item={item}
              index={i}
              onOpen={onOpen}
              aspect="aspect-[2/3]"
              className="md:col-span-4"
            />
          ))}
        </div>
      )}

      {group.key === 'art' && (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-x-10">
          <ImageCard
            item={byId('lumen-flora')}
            index={idx('lumen-flora')}
            onOpen={onOpen}
            aspect="aspect-video"
            shimmer
            className="md:col-span-12"
          />
          <ImageCard item={byId('lumen-study-1')} index={idx('lumen-study-1')} onOpen={onOpen} aspect="aspect-[4/3]" className="md:col-span-6" />
          <ImageCard item={byId('lumen-study-2')} index={idx('lumen-study-2')} onOpen={onOpen} aspect="aspect-[4/3]" className="md:col-span-6" />
          <ImageCard item={byId('blossom-study')} index={idx('blossom-study')} onOpen={onOpen} aspect="aspect-[4/3]" className="md:col-span-6" />
        </div>
      )}

      {group.key === 'studio' && (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-12 md:gap-x-10">
          <BannerCard item={byId('studio-works')} index={idx('studio-works')} onOpen={onOpen} className="md:col-span-12" />
          {items
            .filter((item) => item.id !== 'studio-works')
            .map((item) => (
              <ImageCard
                key={item.id}
                item={item}
                index={idx(item.id)}
                onOpen={onOpen}
                aspect="aspect-square"
                compact
                className="md:col-span-3"
              />
            ))}
        </div>
      )}
    </div>
  );
}
