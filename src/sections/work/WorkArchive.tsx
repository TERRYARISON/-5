import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import FilterTabs from './FilterTabs';
import ProjectGroup from './ProjectGrid';
import Lightbox from './Lightbox';
import type { FilterKey } from './data';
import { GROUPS, itemsForFilter } from './data';

/**
 * Sections 2–4 orchestrator: sticky filter tabs, the grouped project grid,
 * and the lightbox. Owns the active filter and the open lightbox item so
 * prev/next always cycles within the currently filtered set (work.md §4).
 * Group blocks are separated by 8rem of whitespace.
 */
export default function WorkArchive() {
  const [filter, setFilter] = useState<FilterKey>('all');
  const [openId, setOpenId] = useState<string | null>(null);

  const items = useMemo(() => itemsForFilter(filter), [filter]);
  const visibleGroups = filter === 'all' ? GROUPS : GROUPS.filter((g) => g.key === filter);
  const openIndex = openId ? items.findIndex((item) => item.id === openId) : -1;

  return (
    <section id="work-grid" className="relative z-10 scroll-mt-[72px]">
      <FilterTabs filter={filter} onChange={setFilter} count={items.length} />

      <div className="mx-auto w-full max-w-[1280px] px-[clamp(1.25rem,5vw,4rem)] pb-28 pt-20">
        <AnimatePresence mode="wait">
          <motion.div key={filter} className="flex flex-col gap-32">
            {visibleGroups.map((group) => (
              <ProjectGroup
                key={group.key}
                group={group}
                items={items.filter((item) => item.group === group.key)}
                onOpen={setOpenId}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <Lightbox
        items={items}
        index={openIndex}
        onClose={() => setOpenId(null)}
        onNavigate={(i) => setOpenId(items[i].id)}
      />
    </section>
  );
}
