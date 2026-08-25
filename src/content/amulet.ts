/**
 * ┌──────────────────────────────────────────────────────────────┐
 * │  佛牌小店「泰瑞堂」配置                                        │
 * │  主介绍改 INTRO；展示位改 GALLERY（图放 public/，配一句话）。 │
 * │  注意：这里定位是「以牌会友 · 做功德」，不是卖货页面。        │
 * └──────────────────────────────────────────────────────────────┘
 */

export const AMULET = {
  brand: '泰瑞堂',
  brandEn: 'TAI RUI TANG',
  logoFront: '/amulet-logo-front.png', // 旋转 logo 正面（棕金）
  logoBack: '/amulet-logo-back.png',   // 旋转 logo 背面（浅金）
  slogan: '以牌会友 · 共修功德',
  intro: [
    '泰瑞堂不是一门生意，是一间小小的会客厅。',
    '这些年往返泰国，与佛牌结缘，收了一些、也请了一些。每一尊牌子背后都有师父、有法门、有一段因缘，值得被认真讲起。',
    '这里不以盈利为目的——只展示、只分享、只交流。如果你也对佛牌感兴趣，欢迎来坐坐，一起聊聊，权当一起做一场功德。',
  ],
  note: '展示分享 · 不以盈利为目的 · 欢迎交流',
};

/** 展示位：img 放 public/ 文件名，caption 一句话说明 */
export const AMULET_GALLERY = [
  { img: '/amulet-tray.jpg',    caption: '一方木盘，几尊常伴的牌子——每天从供奉开始。' },
  { img: '/amulet-window.jpg',  caption: '清晨的光落在牌面上，金色会慢慢活过来。' },
  { img: '/amulet-blessing.jpg',caption: '经文与朱砂，恭请前的祝福仪式。' },
  { img: '/amulet-merit.jpg',   caption: '功德箱旁的小角落，随缘随喜。' },
] as const;

/** 交流入口文案 */
export const AMULET_CTA = {
  title: '聊聊佛牌，做做功德',
  desc: '不议价、不推销。想交流法门、师父、恭请故事，或者只是好奇——都欢迎写信给我。',
};
