import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import JournalHero from '@/sections/journal/JournalHero';
import FeaturedEssay from '@/sections/journal/FeaturedEssay';
import ArticleIndex from '@/sections/journal/ArticleIndex';
import ArticleReader from '@/sections/journal/ArticleReader';
import SubscribeStrip from '@/sections/journal/SubscribeStrip';
import { ARTICLES } from '@/sections/journal/articles';

/**
 * Journal — `/journal` (journal.md). Editorial long-form index with a
 * featured essay, hairline article rows, a full-screen reader overlay, and a
 * newsletter strip.
 */
export default function Journal() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <>
      <JournalHero />
      <FeaturedEssay onRead={() => setActive(0)} />
      <ArticleIndex onOpen={setActive} />
      <SubscribeStrip />

      <AnimatePresence>
        {active !== null && (
          <ArticleReader
            index={active}
            onClose={() => setActive(null)}
            onNext={() => setActive((v) => ((v ?? 0) + 1) % ARTICLES.length)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
