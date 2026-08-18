import type { CSSProperties } from 'react';
import { ArrowRight } from 'lucide-react';
import Reveal from '@/components/Reveal';
import StarMark from '@/components/StarMark';
import { ARTICLES } from './articles';
import type { Article } from './articles';

/**
 * Section 3 — article index (journal.md §3). 960px editorial list: hairline-
 * separated rows with serif index numbers, 160×110 thumbnails (or a
 * PlaceholderCard-style ✦ tile when no photo exists), hover sweep, and a
 * right-arrow that slides in. Click opens the Article Reader.
 */
export default function ArticleIndex({ onOpen }: { onOpen: (index: number) => void }) {
  const rows = ARTICLES.slice(1);

  return (
    <section className="section-shell pt-0">
      <Reveal className="mx-auto w-full max-w-[960px]">
        <p className="reveal-item eyebrow text-ghost">Index — All Entries</p>

        <div className="mt-10">
          {rows.map((article, i) => (
            <Row
              key={article.id}
              article={article}
              delay={0.1 + i * 0.12}
              onClick={() => onOpen(i + 1)}
            />
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function Row({
  article,
  delay,
  onClick,
}: {
  article: Article;
  delay: number;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="reveal-item group relative block w-full cursor-pointer overflow-hidden border-t border-glass-border py-8 text-left last:border-b"
      style={{ '--reveal-delay': `${delay}s` } as CSSProperties}
      aria-label={`Read: ${article.pre}${article.accent}${article.post ?? ''}`}
    >
      {/* Background sweep, left → right */}
      <span
        aria-hidden="true"
        className="absolute inset-0 origin-left scale-x-0 bg-[rgba(255,255,255,0.04)] transition-transform duration-500 ease-out group-hover:scale-x-100"
      />

      <span className="relative flex items-center gap-6 px-2 sm:gap-9 sm:px-4">
        <span className="hidden shrink-0 font-serif text-2xl font-light text-ghost sm:block">
          {article.index}
        </span>

        {/* Thumbnail 160×110 — photo or ✦ placeholder tile (journal.md §3) */}
        <span className="block h-[110px] w-[160px] shrink-0 overflow-hidden rounded-xl border border-glass-border">
          {article.image ? (
            <img
              src={article.image}
              alt={article.imageAlt}
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
              draggable={false}
            />
          ) : (
            <span className="flex h-full w-full flex-col items-center justify-center gap-2 border-sakura/30 bg-ink/90">
              <StarMark size={22} flat />
              <span className="eyebrow text-[0.55rem] text-ghost">Image Forthcoming</span>
            </span>
          )}
        </span>

        <span className="min-w-0">
          <span className="eyebrow block text-ghost">{article.eyebrow}</span>
          <span className="mt-2 block font-serif text-[1.5rem] font-light leading-snug text-fog transition-all duration-300 group-hover:translate-x-2 sm:text-[2.2rem]">
            {article.pre}
            <em className="italic transition-colors duration-300 group-hover:text-sakura">
              {article.accent}
            </em>
            {article.post ?? ''}
          </span>
          <span className="mt-2 block max-w-[52ch] font-sans text-[0.9rem] font-light leading-relaxed text-mist">
            {article.teaser}
          </span>
        </span>

        <ArrowRight
          size={22}
          strokeWidth={1.5}
          className="ml-auto hidden shrink-0 -translate-x-2.5 text-sakura opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 md:block"
        />
      </span>
    </button>
  );
}
