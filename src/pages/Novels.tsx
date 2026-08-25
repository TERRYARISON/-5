import { useCallback, useState } from 'react';
import SectionNav from '@/components/SectionNav';
import { NOVELS } from '@/content/novels';
import NovelsHero from '@/sections/novels/NovelsHero';
import CoverWall from '@/sections/novels/CoverWall';
import NovelLightbox from '@/sections/novels/NovelLightbox';

/**
 * /novels — 小说页。视频页头 → 封面墙（2:3，含占位卡）→ 书籍详情灯箱
 *（F-003 修复包）→ 页底环线导航。花瓣画布、固定导航、平滑滚动与
 * 页面过渡均由共享 Layout 提供。
 */
export default function Novels() {
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const open = useCallback((i: number) => setLightboxIndex(i), []);
  const close = useCallback(() => setLightboxIndex(-1), []);
  const navigate = useCallback((i: number) => setLightboxIndex(i), []);

  return (
    <>
      <NovelsHero />
      <CoverWall onOpen={open} />
      <NovelLightbox items={NOVELS} index={lightboxIndex} onClose={close} onNavigate={navigate} />
      <SectionNav />
    </>
  );
}
