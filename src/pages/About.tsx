import PortraitHero from '@/sections/about/PortraitHero';
import StreetDiptych from '@/sections/about/StreetDiptych';
import Philosophy from '@/sections/about/Philosophy';
import Timeline from '@/sections/about/Timeline';
import AboutCta from '@/sections/about/AboutCta';

/** About — `/about` (about.md). Portrait-led personal page. */
export default function About() {
  return (
    <>
      <PortraitHero />
      <StreetDiptych />
      <Philosophy />
      <Timeline />
      <AboutCta />
    </>
  );
}
