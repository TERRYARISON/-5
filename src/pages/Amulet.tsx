import AmuletHero from '@/sections/amulet/AmuletHero';
import AmuletIntro from '@/sections/amulet/AmuletIntro';
import AmuletGallery from '@/sections/amulet/AmuletGallery';
import AmuletCta from '@/sections/amulet/AmuletCta';
import SectionNav from '@/components/SectionNav';

/**
 * Amulet — `/amulet`。佛牌小店「泰瑞堂」：非盈利、以牌会友、聊佛牌做功德。
 * 可旋转 3D 双面金币 hero → manifesto 式主介绍 → 2×2 展示格 → 写信 CTA → 环线导航。
 */
export default function Amulet() {
  return (
    <>
      <AmuletHero />
      <AmuletIntro />
      <AmuletGallery />
      <AmuletCta />
      <SectionNav />
    </>
  );
}
