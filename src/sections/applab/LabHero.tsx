import { memo, useEffect, useState } from 'react';
import Reveal from '@/components/Reveal';

/** 循环打字机：敲出 `> hello, world`，停顿后清空重来。reduced-motion 时直接显示全句。 */
const TypewriterLine = memo(function TypewriterLine() {
  const full = '> hello, world';
  const [n, setN] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setN(full.length);
      return;
    }
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      setN((cur) => {
        if (cur >= full.length) {
          // 停在完整输出上 2.2s，然后清空重来
          timer = setTimeout(() => setN(0), 2200);
          return cur;
        }
        timer = setTimeout(tick, 90);
        return cur + 1;
      });
    };
    timer = setTimeout(tick, 600);
    return () => clearTimeout(timer);
  }, [full.length]);

  return (
    <p
      aria-hidden="true"
      className="mt-8 inline-flex items-center rounded-md border border-glass-border/70 bg-abyss/80 px-4 py-2 font-sans text-[0.82rem] tracking-[0.08em] text-neon"
    >
      <span className="text-ghost">$&nbsp;</span>
      {full.slice(0, n)}
      <span className="animate-caret-blink ml-1 inline-block h-[1em] w-[7px] translate-y-[1px] bg-neon/80" />
    </p>
  );
});

/**
 * App Lab 页头 —— 实验室/终端气质：eyebrow + serif 大标题 + 中文引言，
 * 加一个克制的终端式打字机小元素（循环 `> hello, world` + 闪烁光标）。
 */
export default function LabHero() {
  return (
    <section className="section-shell pt-[calc(72px+clamp(4rem,10vh,7rem))] pb-[clamp(3rem,7vh,5rem)]">
      <Reveal>
        <p className="reveal-item eyebrow text-neon">APP Lab · 应用实验室</p>
        <h1 className="reveal-item hero-h1 mt-6 text-fog" style={{ '--reveal-delay': '0.12s' } as React.CSSProperties}>
          把想法写成<span className="text-sakura">应用</span>
        </h1>
        <p
          className="reveal-item body-text mt-7 max-w-[46ch]"
          style={{ '--reveal-delay': '0.24s' } as React.CSSProperties}
        >
          不写宏大的产品计划，只做自己真的会天天用的小工具。想到、动手、上线、开源——一个都不少。
        </p>
        <div className="reveal-item" style={{ '--reveal-delay': '0.36s' } as React.CSSProperties}>
          <TypewriterLine />
        </div>
      </Reveal>
    </section>
  );
}
