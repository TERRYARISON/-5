import LabHero from '@/sections/applab/LabHero';
import AppGrid from '@/sections/applab/AppGrid';
import OpenSource from '@/sections/applab/OpenSource';
import SectionNav from '@/components/SectionNav';

/**
 * App Lab — `/app-lab`。概念图 + GitHub 公开仓库 + 构想中占位。
 * 页头 → 项目卡 → 开源宣言 → 环线导航。
 */
export default function AppLab() {
  return (
    <>
      <LabHero />
      <AppGrid />
      <OpenSource />
      <SectionNav />
    </>
  );
}
