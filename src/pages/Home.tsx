import Hero from '@/sections/home/Hero';
import CameraJourney from '@/sections/home/CameraJourney';
import Manifesto from '@/sections/home/Manifesto';
import HomeJourney from '@/sections/home/HomeJourney';
import FeaturedWork from '@/sections/home/FeaturedWork';
import Worlds from '@/sections/home/Worlds';
import JournalPreview from '@/sections/home/JournalPreview';
import ClosingCTA from '@/sections/home/ClosingCTA';
import SectionNav from '@/components/SectionNav';

/**
 * Home — `/`。动线：Hero → 镜头旅程 → 宣言 → 履历树（中间履历左右案例）
 * → 精选作品 → 三个世界入口（小说/佛牌/APP）→ 随笔 → 收尾 CTA → 环线导航。
 * APP 入口刻意放在后半段，先看人与作品，再看应用。
 */
export default function Home() {
  return (
    <>
      <Hero />
      <CameraJourney />
      <Manifesto />
      <HomeJourney />
      <FeaturedWork />
      <Worlds />
      <JournalPreview />
      <ClosingCTA />
      <SectionNav />
    </>
  );
}
