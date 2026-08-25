import Hero from '@/sections/home/Hero';
import CameraJourney from '@/sections/home/CameraJourney';
import Manifesto from '@/sections/home/Manifesto';
import FeaturedWork from '@/sections/home/FeaturedWork';
import Worlds from '@/sections/home/Worlds';
import JournalPreview from '@/sections/home/JournalPreview';
import ClosingCTA from '@/sections/home/ClosingCTA';
import SectionNav from '@/components/SectionNav';

/** Home — `/` (home.md). The flagship cinematic landing page. */
export default function Home() {
  return (
    <>
      <Hero />
      <CameraJourney />
      <Manifesto />
      <FeaturedWork />
      <Worlds />
      <JournalPreview />
      <ClosingCTA />
      <SectionNav />
    </>
  );
}
