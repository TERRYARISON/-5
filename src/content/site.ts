/**
 * ┌──────────────────────────────────────────────────────────────┐
 * │  站点全局配置 —— 导航、环线顺序、社交链接                     │
 * │  改这里 = 改全站。改完保存即可，不需要动别的文件。            │
 * └──────────────────────────────────────────────────────────────┘
 */

/** 顶部导航 + 手机菜单（顺序即显示顺序） */
export const NAV_LINKS = [
  { to: '/work',   label: 'Work',   zh: '作品' },
  { to: '/novels', label: 'Novels', zh: '小说' },
  { to: '/amulet', label: 'Amulet', zh: '佛牌' },
  { to: '/app-lab',label: 'App',    zh: 'APP' },
  { to: '/journal',label: 'Journal',zh: '随笔' },
  { to: '/about',  label: 'About',  zh: '关于' },
  { to: '/contact',label: 'Contact',zh: '联系' },
] as const;

/**
 * 页底「上一站 / 下一站」环线顺序（F-001 闭环动线）。
 * 想调整游览顺序，只改这个数组。
 */
export const LOOP: { to: string; zh: string }[] = [
  { to: '/',        zh: '首页' },
  { to: '/work',    zh: '作品' },
  { to: '/novels',  zh: '小说' },
  { to: '/amulet',  zh: '佛牌' },
  { to: '/app-lab', zh: 'APP' },
  { to: '/journal', zh: '随笔' },
  { to: '/about',   zh: '关于' },
  { to: '/contact', zh: '联系' },
];

/** 社交链接 —— 换成你自己的地址（F-006） */
export const SOCIALS = {
  github: 'https://github.com/TERRYARISON',
  email: '371225659@qq.com',
};

/** 一页式信息 */
export const SITE = {
  name: 'Zheng Chao',
  zhName: '郑超',
  tagline: '主持人 · 经纪人 · 写作者 · 创造者',
  email: SOCIALS.email,
};
