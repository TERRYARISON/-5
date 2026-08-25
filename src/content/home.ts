/**
 * ┌──────────────────────────────────────────────────────────────┐
 * │  首页全部内容 —— 开屏视频、大标题、镜头旅程、宣言、           │
 * │  精选项目、随笔预告、三个世界入口、结尾按钮，都在这里改。     │
 * │  图片/视频：把文件放进 public/ 文件夹，这里写 '/文件名'。     │
 * │  视频不想用了：把 video 改成 null 就会只显示图片。            │
 * └──────────────────────────────────────────────────────────────┘
 */

/** ① 开屏（第一屏） */
export const HERO = {
  /** 开屏视频（主页最上面的动态画面） */
  video: '/hero-main.mp4' as string | null,
  /** 视频封面图 / 视频加载失败时的兜底图 */
  img: '/hero-main.jpg',
  /** 画面重心（裁剪时对准的位置）：水平% 垂直% */
  position: '50% 35%',
  eyebrow: 'Portfolio — Est. 2025',
  /** 大标题（逐词出现；accent: true 的词用樱花粉斜体） */
  titleWords: [
    { text: 'Building' },
    { text: 'Meaningful' },
    { text: 'Tech,' },
    { text: 'From' },
    { text: 'Within.', accent: true },
  ] as { text: string; accent?: boolean }[],
  subtitle:
    'Exploring the intersection of identity, intelligence, and imagination — one system at a time.',
  button: 'Explore Portfolio',
};

/** ② 镜头旅程（跟着滚动推进的两段画面） */
export const JOURNEY = {
  frameA: {
    img: '/journey-live.jpg',
    video: '/journey-live.mp4' as string | null,
    alt: 'Zheng Chao from behind, neon wings beneath the sakura trees',
  },
  frameB: {
    img: '/portrait-main.jpg',
    alt: '郑超 — 个人照片',
  },
  captionA: {
    eyebrow: 'The Practice',
    titlePre: 'Where circuits learn to ',
    titleAccent: 'bloom',
    body: 'Each project begins as a seed — a question about how we live with the systems we build.',
  },
  captionB: {
    eyebrow: 'Detail',
    titlePre: 'Every trace of light is ',
    titleAccent: 'intentional',
  },
};

/** ③ 宣言（大字宣言，accent: true 的词用紫色斜体） */
export const MANIFESTO = {
  eyebrow: 'Manifesto',
  words: [
    { text: 'To' },
    { text: 'gracefully' },
    { text: 'cultivate' },
    { text: 'a' },
    { text: 'newly' },
    { text: 'balanced' },
    { text: 'ecosystem,', accent: true },
    { text: 'we' },
    { text: 'dissolve' },
    { text: 'all' },
    { text: 'boundaries' },
    { text: 'between' },
    { text: 'technology' },
    { text: 'and' },
    { text: 'nature.' },
  ] as { text: string; accent?: boolean }[],
  signature: '— Zheng Chao',
};

/** ④ 履历树两侧的案例现场图（与 profile.ts 的 TIMELINE 一一对应） */
export const JOURNEY_SHOTS: { img: string; caption: string }[] = [
  { img: '/case-event-mahb.jpg', caption: 'MAHB 年度先生盛典 · 现场' },
  { img: '/case-drama-cqq.jpg', caption: '《传闻中的陈芊芊》· 剧照' },
  { img: '/case-yuzhe-1.jpg', caption: '《语者 PERS》· 录制现场' },
  { img: '/case-event-fashionweek.jpg', caption: '时装周 · 后台统筹' },
  { img: '/case-event-swarovski.jpg', caption: '品牌活动 · 现场' },
  { img: '/case-event-tvfestival.jpg', caption: '电视节 · 红毯' },
];

/** ⑤ 精选项目（四张悬浮卡片，点击进作品页） */
export const FEATURED = {
  titlePre: 'Projects ',
  titleAccent: '&',
  titlePost: ' Concepts',
  subtitle: 'A collection of ideas, products, and systems — where creativity meets technology.',
  button: 'Explore Projects',
  projects: [
    {
      title: 'Silicon Rituals',
      eyebrow: 'Digital Essay',
      meta: 'Reading time · 6 min',
      body: 'On the habits we keep with machines.',
      ornament: true,
      offset: 'md:col-start-1 md:col-span-5',
    },
    {
      title: 'Bloom',
      eyebrow: 'Wellness App Concept',
      body: 'An ambient wellness experience that blends nature, technology, and mindful living.',
      offset: 'md:col-start-7 md:col-span-5',
    },
    {
      title: 'Atelier',
      eyebrow: 'AI Co-Creation',
      body: 'A creative companion for moodboarding, ideation, and visual exploration.',
      offset: 'md:col-start-2 md:col-span-5 md:-mt-10',
    },
    {
      title: 'Fragments',
      eyebrow: 'Design System',
      body: 'UI components, interaction patterns, and visual language for digital storytellers.',
      offset: 'md:col-start-8 md:col-span-5 md:mt-10',
    },
  ],
};

/** ⑥ 随笔预告（首页底部的文章预览） */
export const JOURNAL_PREVIEW = {
  eyebrow: 'Journal',
  titlePre: 'Notes From the ',
  titleAccent: 'Night',
  readAll: 'Read All →',
  featured: {
    img: '/journal-1.jpg',
    imgAlt: 'Recording studio with a glowing ON AIR sign',
    meta: 'Essay · Mar 2025 · 5 min',
    title: 'Notes on Signal & Silence',
    teaser:
      'What a recording studio taught me about attention — why the quietest channel in the room is usually the one carrying everything that matters.',
  },
  rows: [
    { img: '/journal-2.jpg', title: 'The Studio After Midnight', meta: 'Field Notes · Feb 2025 · 4 min' },
    { img: '/journal-3.jpg', title: 'What a Set Teaches You About Systems', meta: 'Essay · Jan 2025 · 7 min' },
  ],
};

/** ⑦ 三个世界入口（小说 / 佛牌 / APP 的图片和介绍） */
export const WORLDS_CONTENT = {
  titlePre: '字、牌、与',
  titleAccent: '代码',
  subtitle: '工作之外，我把余生的热情分给这三件事。',
  entries: {
    novels: {
      img: '/novels-hero.jpg',
      eyebrow: 'Novels · 长篇小说',
      desc: '九部长篇与一本灵感合集——曼谷的雨、AI 时代的隐形人、风里才生效的契约。',
    },
    amulet: {
      img: '/amulet-window.jpg',
      eyebrow: 'Amulet · 泰瑞堂',
      desc: '一枚可以拖着转的金币，几尊有故事的牌子。不以盈利，只为以牌会友、共修功德。',
    },
    app: {
      img: '/app-ptg.jpg',
      eyebrow: 'App Lab · 应用实验室',
      desc: '把想法写成应用。PTG 概念原型与公开仓库，更多小玩意儿在路上。',
    },
  },
};

/** ⑧ 结尾行动按钮（首页最底部） */
export const CLOSING = {
  bgImg: '/portrait-recline.jpg',
  words: ["Let's", 'build', 'something', 'that', 'blooms.'],
  accentWord: 'blooms.',
  button: 'Get in Touch',
};
