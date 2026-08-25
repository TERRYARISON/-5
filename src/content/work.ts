/**
 * ┌──────────────────────────────────────────────────────────────┐
 * │  作品页全部内容 —— 分组、筛选、每个项目的标题/简介/图片。     │
 * │  加项目：在 WORK_ITEMS 里照抄一条改内容；images 填 public/    │
 * │  里的文件名，images: [] 会显示「占位卡」。                    │
 * └──────────────────────────────────────────────────────────────┘
 */

export type GroupKey = 'digital' | 'covers' | 'art' | 'studio';
export type FilterKey = 'all' | GroupKey;

export interface WorkItem {
  id: string;
  group: GroupKey;
  title: string;
  eyebrow: string;
  body?: string;
  images: string[];
}

export interface WorkGroup {
  key: GroupKey;
  /** Display index used in the `01 · DIGITAL` eyebrow headers. */
  index: string;
  label: string;
}

export const GROUPS: WorkGroup[] = [
  { key: 'digital', index: '01', label: 'Digital' },
  { key: 'covers', index: '02', label: 'Covers' },
  { key: 'art', index: '03', label: 'Art' },
  { key: 'studio', index: '04', label: 'Studio' },
];

export const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'digital', label: 'Digital' },
  { key: 'covers', label: 'Covers' },
  { key: 'art', label: 'Art' },
  { key: 'studio', label: 'Studio' },
];

export const WORK_ITEMS: WorkItem[] = [
  // ---- 01 · DIGITAL ----
  {
    id: 'pulse',
    group: 'digital',
    title: 'Pulse — Fintech Reimagined',
    eyebrow: 'DIGITAL PRODUCT · UI CONCEPT',
    body: 'A dark-mode finance companion that treats money as energy flow.',
    images: ['/work-app-1.jpg', '/work-app-2.jpg', '/work-app-3.jpg'],
  },
  {
    id: 'silicon-rituals',
    group: 'digital',
    title: 'Silicon Rituals',
    eyebrow: 'DIGITAL ESSAY · 6 MIN',
    body: 'On the habits we keep with machines.',
    images: [],
  },
  {
    id: 'atelier',
    group: 'digital',
    title: 'Atelier',
    eyebrow: 'AI CO-CREATION',
    body: 'A creative companion for moodboarding, ideation, and visual exploration.',
    images: [],
  },
  {
    id: 'fragments',
    group: 'digital',
    title: 'Fragments',
    eyebrow: 'DESIGN SYSTEM',
    body: 'UI components, interaction patterns, and visual language for digital storytellers.',
    images: [],
  },
  {
    id: 'bloom',
    group: 'digital',
    title: 'Bloom',
    eyebrow: 'WELLNESS APP CONCEPT',
    body: 'An ambient wellness experience that blends nature, technology, and mindful living.',
    images: [],
  },

  // ---- 02 · COVERS ----
  {
    id: 'botanica-1',
    group: 'covers',
    title: 'Neon Botanica — Vol. I',
    eyebrow: 'PRINT · ART DIRECTION',
    body: 'A botany of light — three volumes on plants that grow after dark.',
    images: ['/work-book-1.jpg'],
  },
  {
    id: 'botanica-2',
    group: 'covers',
    title: 'Neon Botanica — Vol. II',
    eyebrow: 'PRINT · ART DIRECTION',
    images: ['/work-book-2.jpg'],
  },
  {
    id: 'botanica-3',
    group: 'covers',
    title: 'Neon Botanica — Vol. III',
    eyebrow: 'PRINT · ART DIRECTION',
    images: ['/work-book-3.jpg'],
  },

  // ---- 03 · ART ----
  {
    id: 'lumen-flora',
    group: 'art',
    title: 'Lumen Flora',
    eyebrow: 'DIGITAL ART',
    images: ['/work-neon-hero.jpg'],
  },
  {
    id: 'lumen-study-1',
    group: 'art',
    title: 'Lumen Flora — Study I',
    eyebrow: 'DIGITAL ART',
    images: ['/work-neon-1.jpg'],
  },
  {
    id: 'lumen-study-2',
    group: 'art',
    title: 'Lumen Flora — Study II',
    eyebrow: 'DIGITAL ART',
    images: ['/work-neon-2.jpg'],
  },
  {
    id: 'blossom-study',
    group: 'art',
    title: 'Blossom Study',
    eyebrow: 'AI PORTRAIT',
    body: 'Where the garden wears a face.',
    images: ['/work-floral-face.jpg'],
  },

  // ---- 04 · STUDIO ----
  {
    id: 'studio-works',
    group: 'studio',
    title: 'Studio Works',
    eyebrow: 'PRODUCTION ARCHIVE',
    images: ['/studio-cover.jpg'],
  },
  {
    id: 'kol-sessions',
    group: 'studio',
    title: 'KOL Sessions',
    eyebrow: 'PRODUCTION',
    images: ['/studio-kol.jpg'],
  },
  {
    id: 'on-set-1',
    group: 'studio',
    title: 'On Set I',
    eyebrow: 'PRODUCTION',
    images: ['/studio-prod-1.jpg'],
  },
  {
    id: 'on-set-2',
    group: 'studio',
    title: 'On Set II',
    eyebrow: 'PRODUCTION',
    images: ['/studio-prod-2.jpg'],
  },
  {
    id: 'on-set-3',
    group: 'studio',
    title: 'On Set III',
    eyebrow: 'PRODUCTION',
    images: ['/studio-prod-3.jpg'],
  },
  {
    id: 'talent-1',
    group: 'studio',
    title: 'Talent Series I',
    eyebrow: 'PORTRAIT',
    images: ['/studio-talent-1.jpg'],
  },
  {
    id: 'talent-2',
    group: 'studio',
    title: 'Talent Series II',
    eyebrow: 'PORTRAIT',
    images: ['/studio-talent-3.jpg'],
  },
  {
    id: 'talent-3',
    group: 'studio',
    title: 'Talent Series III',
    eyebrow: 'PORTRAIT',
    images: ['/studio-talent-8.jpg'],
  },
  {
    id: 'venues-1',
    group: 'studio',
    title: 'Venues I',
    eyebrow: 'SPACE',
    images: ['/studio-venue-2.jpg'],
  },
  {
    id: 'venues-2',
    group: 'studio',
    title: 'Venues II',
    eyebrow: 'SPACE',
    images: ['/studio-venue-7.jpg'],
  },
];

export function itemsForFilter(filter: FilterKey): WorkItem[] {
  return filter === 'all' ? WORK_ITEMS : WORK_ITEMS.filter((item) => item.group === filter);
}

/**
 * ┌──────────────────────────────────────────────────────────────┐
 * │  作品页页头（WorkHero）的背景视频与标题                       │
 * └──────────────────────────────────────────────────────────────┘
 */
export const WORK_HERO = {
  img: '/work-concept.jpg',
  video: '/work-concept.mp4' as string | null,
  eyebrow: 'Selected Works · 2023–2025',
  titleWords: [{ text: 'Projects' }, { text: '&', accent: true }, { text: 'Concepts' }] as {
    text: string;
    accent?: boolean;
  }[],
  subtitle:
    'Products, print, and pixels — a working archive of systems shipped and stories told.',
  button: 'Browse the Archive',
};
