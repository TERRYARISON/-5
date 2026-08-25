import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';
import StarMark from '../components/StarMark';
import { NAV_LINKS } from '../content/site';

/**
 * 404 引导页（PRD F-007：迷路时也要给人一条回去的路）。
 * 显示一条星空、一句抱歉，以及全部正经入口。
 */
export default function NotFound() {
  return (
    <div className="relative flex min-h-[100dvh] flex-col items-center justify-center px-6 py-32 text-center">
      <StarMark size={30} className="mb-10 opacity-80" />
      <p className="eyebrow mb-5 text-ghost">404 · 这里没有信号</p>
      <h1 className="max-w-[16ch] font-serif text-[clamp(2.4rem,6vw,4.5rem)] font-light leading-[1.08] text-fog">
        你走到了地图<span className="italic text-sakura">以外</span>的地方
      </h1>
      <p className="mt-6 max-w-[42ch] font-sans text-sm font-light leading-relaxed text-mist">
        这个页面还没有被创作出来——也许以后会。先去别处逛逛吧：
      </p>
      <div className="mt-12 flex max-w-[560px] flex-wrap items-center justify-center gap-3">
        <Link
          to="/"
          className="group inline-flex min-h-[44px] items-center gap-2 rounded-full border border-sakura/40 bg-sakura/10 px-6 py-3 font-sans text-sm text-sakura transition-all duration-300 hover:border-sakura hover:bg-sakura/20"
        >
          <Compass size={15} strokeWidth={1.5} />
          回到首页
        </Link>
        {NAV_LINKS.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className="inline-flex min-h-[44px] items-center rounded-full border border-glass-border bg-glass px-5 py-3 font-sans text-sm text-mist transition-all duration-300 hover:border-neon/40 hover:text-neon"
          >
            {l.zh}
          </Link>
        ))}
      </div>
    </div>
  );
}
