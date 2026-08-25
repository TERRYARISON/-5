import { Github, Sparkles } from 'lucide-react';
import Reveal from '@/components/Reveal';
import { APPS } from '@/content/apps';
import type { AppProject } from '@/content/apps';

function StatusBadge({ status }: { status: AppProject['status'] }) {
  const tone =
    status === '开发中'
      ? 'border-neon/60 text-neon'
      : status === '已上线'
        ? 'border-sakura/60 text-sakura'
        : 'border-glass-border text-ghost';
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-sans text-[0.7rem] font-medium uppercase tracking-[0.18em] ${tone}`}
    >
      {status === '开发中' && (
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-neon" aria-hidden="true" />
      )}
      {status}
    </span>
  );
}

function TagPills({ tags }: { tags: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="标签">
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-full bg-glass px-3 py-1 font-sans text-[0.72rem] tracking-[0.08em] text-mist"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

/** 有概念图的项目卡：16:9 glass 边框包裹大图（hover 微放大）+ 信息栏。 */
function ProjectCard({ app, index }: { app: AppProject; index: number }) {
  return (
    <Reveal className="h-full">
      <article
        className="reveal-item flex h-full flex-col gap-6"
        style={{ '--reveal-delay': `${index * 0.12}s` } as React.CSSProperties}
      >
        {app.conceptImg && (
          <div className="group overflow-hidden rounded-[20px] border border-glass-border bg-glass p-2 transition-colors duration-500 hover:border-neon/40">
            <div className="relative aspect-video overflow-hidden rounded-[14px]">
              <img
                src={app.conceptImg}
                alt={`${app.name} 概念图`}
                loading="lazy"
                draggable={false}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/50 via-transparent to-transparent" />
            </div>
          </div>
        )}

        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <h3 className="card-title text-fog">
              {app.name}
              {app.zhName && <span className="ml-3 font-sans text-[0.85rem] font-light tracking-[0.06em] text-mist">{app.zhName}</span>}
            </h3>
            <StatusBadge status={app.status} />
          </div>

          <p className="body-text max-w-[56ch]">{app.desc}</p>

          <TagPills tags={app.tags} />

          {app.repo && (
            <div className="mt-2">
              <a
                href={app.repo}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex min-h-[44px] items-center gap-3 rounded-full border border-glass-border bg-glass px-5 py-2.5 font-sans text-[0.8rem] font-medium uppercase tracking-[0.2em] text-fog transition-all duration-300 hover:border-neon/60 hover:text-neon hover:shadow-[0_0_24px_rgba(125,232,240,0.25)]"
              >
                <Github size={17} strokeWidth={1.5} className="transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110" />
                GitHub 仓库
              </a>
            </div>
          )}
        </div>
      </article>
    </Reveal>
  );
}

/** 占位卡：虚线描边，居中「留位 · 待补充」+ desc，留给以后的点子。 */
function PlaceholderCard({ app, index }: { app: AppProject; index: number }) {
  return (
    <Reveal className="h-full">
      <article
        className="reveal-item flex h-full min-h-[280px] flex-col items-center justify-center gap-4 rounded-[20px] border border-dashed border-glass-border/80 px-6 py-12 text-center transition-colors duration-500 hover:border-sakura/40"
        style={{ '--reveal-delay': `${index * 0.12}s` } as React.CSSProperties}
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-glass-border/60 bg-glass text-ghost">
          <Sparkles size={18} strokeWidth={1.5} />
        </span>
        <p className="eyebrow text-ghost">留位 · 待补充</p>
        <h3 className="card-title text-mist">{app.name}</h3>
        <p className="body-text max-w-[44ch]">{app.desc}</p>
      </article>
    </Reveal>
  );
}

/** 项目陈列 —— 渲染 APPS：有概念图出大卡，'构想中'/无图出占位卡。 */
export default function AppGrid() {
  return (
    <section id="applab-projects" className="section-shell pt-0">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-8">
        {APPS.map((app, i) =>
          app.conceptImg && app.status !== '构想中' ? (
            <ProjectCard key={app.id} app={app} index={i} />
          ) : (
            <PlaceholderCard key={app.id} app={app} index={i} />
          ),
        )}
      </div>
    </section>
  );
}
