/** 文章数据已迁移到 src/content/journal.ts —— 改文章请去那个文件。此文件保留标题组件与兼容导出。 */
import type { Article } from '@/content/journal';
export { ARTICLES } from '@/content/journal';
export type { Article } from '@/content/journal';

/** Full serif title in parts, with the accent word in italic sakura. */
export function ArticleTitle({ article, className }: { article: Article; className?: string }) {
  return (
    <span className={className}>
      {article.pre}
      <em className="italic text-sakura">{article.accent}</em>
      {article.post ?? ''}
    </span>
  );
}
