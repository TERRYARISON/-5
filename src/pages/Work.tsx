import WorkHero from '@/sections/work/WorkHero';
import WorkArchive from '@/sections/work/WorkArchive';
import WorkCTA from '@/sections/work/WorkCTA';

/**
 * /work — "Projects & Concepts" editorial archive (work.md).
 * Hero → sticky filter tabs → grouped glass-card grid → lightbox → CTA.
 * The petal canvas, fixed nav, smooth scroll, and page transition all come
 * from the shared Layout.
 */
export default function Work() {
  return (
    <>
      <WorkHero />
      <WorkArchive />
      <WorkCTA />
    </>
  );
}
