import PortraitHero from '@/sections/about/PortraitHero';
import StreetDiptych from '@/sections/about/StreetDiptych';
import Timeline from '@/sections/about/Timeline';
import CaseWall from '@/sections/about/CaseWall';
import AboutCta from '@/sections/about/AboutCta';
import SectionNav from '@/components/SectionNav';

/**
 * About — `/about`. 叙事动线：人像氛围引言（living portrait + 简介块，
 * BIO 数据）→ 街拍间奏 → 简历时间线（TIMELINE + CREDENTIALS）→
 * 精选案例墙（CASES + F-003 案例灯箱）→ CTA → 页底环线导航。
 */
export default function About() {
  return (
    <>
      <PortraitHero />
      <StreetDiptych />
      <Timeline />
      <CaseWall />
      <AboutCta />
      <SectionNav />
    </>
  );
}
