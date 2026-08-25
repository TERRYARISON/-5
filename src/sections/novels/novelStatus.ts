import type { Novel } from '@/content/novels';

/**
 * 把 novels.ts 里自由文本的 status 归并成封面角标用的三种状态：
 * 已完结 / 连载中 / 创作中（PRD F-003）。自由文本优先原样展示在详情里，
 * 角标只显示归并后的短标签。
 */
export interface StatusMeta {
  label: string;
  /** Tailwind classes for the badge chip. */
  className: string;
}

export function statusMeta(novel: Novel): StatusMeta {
  const s = novel.status;
  if (s.includes('创作中')) {
    return {
      label: '创作中',
      className: 'border-violet/50 bg-violet/15 text-violet',
    };
  }
  if (s.includes('连载')) {
    return {
      label: '连载中',
      className: 'border-neon/50 bg-neon/10 text-neon',
    };
  }
  return {
    label: '已完结',
    className: 'border-sakura/50 bg-sakura/15 text-sakura',
  };
}
