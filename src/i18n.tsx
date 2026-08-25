/**
 * ┌──────────────────────────────────────────────────────────────┐
 * │  三语切换（中 / EN / ไทย）—— UI 框架文案的翻译字典与上下文    │
 * │  用法：组件里 `const { lang, setLang, t } = useLang();`       │
 * │  然后 `t('nav.novels')` 取词。加新词：在下面 DICT 加一条。    │
 * │  说明：长篇正文（小说简介、履历详情等）保持中文为主，          │
 * │        本字典只管按钮、导航、标签这类 UI 文案。               │
 * └──────────────────────────────────────────────────────────────┘
 */
import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

export type Lang = 'zh' | 'en' | 'th';

export const LANGS: { id: Lang; label: string; short: string }[] = [
  { id: 'zh', label: '中文', short: '中' },
  { id: 'en', label: 'English', short: 'EN' },
  { id: 'th', label: 'ไทย', short: 'ไทย' },
];

const DICT = {
  // —— 导航 ——
  'nav.work':    { zh: '作品', en: 'Work',   th: 'ผลงาน' },
  'nav.novels':  { zh: '小说', en: 'Novels', th: 'นิยาย' },
  'nav.amulet':  { zh: '佛牌', en: 'Amulet', th: 'พระเครื่อง' },
  'nav.app':     { zh: 'APP',  en: 'App',    th: 'แอป' },
  'nav.journal': { zh: '随笔', en: 'Journal',th: 'บันทึก' },
  'nav.about':   { zh: '关于', en: 'About',  th: 'เกี่ยวกับ' },
  'nav.contact': { zh: '联系', en: 'Contact',th: 'ติดต่อ' },
  'nav.home':    { zh: '首页', en: 'Home',   th: 'หน้าแรก' },

  // —— 通用按钮 ——
  'ui.close':      { zh: '关闭', en: 'Close', th: 'ปิด' },
  'ui.back':       { zh: '返回', en: 'Back',  th: 'กลับ' },
  'ui.prev':       { zh: '上一站', en: 'Previous', th: 'ก่อนหน้า' },
  'ui.next':       { zh: '下一站', en: 'Next',     th: 'ถัดไป' },
  'ui.prevArticle':{ zh: '上一篇', en: 'Previous essay', th: 'ก่อนหน้า' },
  'ui.nextArticle':{ zh: '下一篇', en: 'Next essay',     th: 'ถัดไป' },
  'ui.writeMe':    { zh: '写信给我', en: 'Write to me', th: 'เขียนถึงฉัน' },
  'ui.enter':      { zh: '走进去', en: 'Enter', th: 'เข้าไป' },
  'ui.keepScrolling': { zh: '继续滚动', en: 'Keep scrolling', th: 'เลื่อนต่อ' },
  'ui.youAreHere': { zh: '你在这里', en: 'You are here', th: 'คุณอยู่ที่นี่' },
  'ui.sitemap':    { zh: '全站地图', en: 'Site map', th: 'แผนผังเว็บ' },
  'ui.nextStation':{ zh: '下一站', en: 'Next stop', th: 'สถานีถัดไป' },

  // —— 页脚 ——
  'footer.navigate': { zh: '站点导航', en: 'Navigate', th: 'นำทาง' },
  'footer.connect':  { zh: '找到我', en: 'Connect', th: 'ติดตาม' },

  // —— 首页区块 ——
  'home.journey.eyebrow': { zh: '履历 · The Journey', en: 'The Journey · 履历', th: 'เส้นทาง · ประวัติ' },
  'home.journey.title':   { zh: '十六年，一路向南', en: 'Sixteen years on the road', th: 'สิบหกปีบนเส้นทาง' },
  'home.journey.more':    { zh: '看完整履历', en: 'Full résumé', th: 'ดูประวัติทั้งหมด' },
  'home.journey.cases':   { zh: '案例现场', en: 'From the field', th: 'ภาพจากหน้างาน' },
  'home.worlds.eyebrow':  { zh: '继续往里走', en: 'More worlds', th: 'โลกอีกสามใบ' },
  'home.worlds.novels':   { zh: '小说', en: 'Novels', th: 'นิยาย' },
  'home.worlds.amulet':   { zh: '佛牌小店', en: 'Amulet', th: 'พระเครื่อง' },
  'home.worlds.app':      { zh: 'APP', en: 'App Lab', th: 'แอปแล็บ' },

  // —— 404 ——
  'nf.title.a': { zh: '你走到了地图', en: 'You walked off', th: 'คุณหลุดออกจากแผนที่' },
  'nf.title.b': { zh: '以外的地方', en: 'the map', th: 'ไปแล้ว' },
  'nf.back':    { zh: '回到首页', en: 'Back home', th: 'กลับหน้าแรก' },

  // —— 灯箱 ——
  'lb.itemOf':   { zh: '第', en: 'No.', th: 'ชิ้นที่' }, // 组合用：见用法
  'lb.of':       { zh: '件 / 共', en: 'of', th: 'จาก' },
  'lb.discuss':  { zh: '聊聊这个方向', en: 'Talk about this', th: 'คุยเรื่องนี้' },
  'lb.count':    { zh: '本 / 共', en: 'of', th: 'จาก' },
} as const;

export type DictKey = keyof typeof DICT;

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (k: DictKey) => string;
}

const Ctx = createContext<LangCtx>({ lang: 'zh', setLang: () => {}, t: (k) => DICT[k].zh });

const STORAGE_KEY = 'zc-lang';

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      return v === 'en' || v === 'th' || v === 'zh' ? v : 'zh';
    } catch {
      return 'zh';
    }
  });

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* 隐私模式就算了 */
    }
  };

  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : lang;
  }, [lang]);

  const t = (k: DictKey) => DICT[k][lang];

  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
}

export function useLang() {
  return useContext(Ctx);
}
