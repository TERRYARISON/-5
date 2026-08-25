import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ChevronDown } from 'lucide-react';
import { NOVELS } from '@/content/novels';

gsap.registerPlugin(ScrollTrigger);

/**
 * 小说页页头 —— 全宽环境视频（/novels-hero.mp4，jpg 兜底 + poster），
 * 视频轻微模糊 + hero-scrim 压暗保证中文大标题可读。
 * 加载动画纯 CSS；滚动淡出视差用 GSAP，隔离在本文件内。
 */
export default function NovelsHero() {
  const rootRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.to(contentRef.current, {
          opacity: 0,
          y: -60,
          ease: 'none',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top top',
            end: () => `+=${window.innerHeight * 0.8}`,
            scrub: true,
          },
        });
      });
    },
    { scope: rootRef },
  );

  const scrollToWall = () => {
    document.getElementById('novel-wall')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={rootRef} className="relative flex min-h-[100dvh] items-center overflow-hidden">
      {/* Ambient video over a poster still (still = fallback + first frame) */}
      <div className="kenburns-frame">
        <img
          src="/novels-hero.jpg"
          alt="小说页头 —— 赛博樱花氛围影像"
          className="kenburns-img"
          style={{ objectPosition: '50% 35%' }}
          draggable={false}
        />
        <video
          src="/novels-hero.mp4"
          poster="/novels-hero.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full scale-[1.06] object-cover"
          style={{ objectPosition: '50% 35%', filter: 'blur(3px) brightness(0.72) saturate(1.05)' }}
          onError={(e) => {
            (e.currentTarget as HTMLVideoElement).style.display = 'none';
          }}
        />
        <div className="kenburns-vignette" />
      </div>

      {/* Legibility scrim (same recipe as home / work heroes) */}
      <div
        className="hero-scrim anim-fade absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, rgba(7,7,13,0.88) 0%, rgba(7,7,13,0.45) 45%, rgba(7,7,13,0.15) 75%)',
        }}
      />

      <div
        ref={contentRef}
        className="relative z-10 mx-auto w-full max-w-[1280px] px-[clamp(1.25rem,5vw,4rem)] pb-20 pt-[72px]"
      >
        <div className="max-w-[680px]">
          <p className="anim-rise eyebrow text-neon" style={{ animationDelay: '0.1s' }}>
            NOVELS · 长篇小说与片段
          </p>

          <h1
            className="anim-rise mt-6 font-serif font-light leading-[1.08] tracking-[-0.01em] text-fog"
            style={{ fontSize: 'clamp(2.6rem, 6.5vw, 5.6rem)', animationDelay: '0.25s' }}
          >
            我把人生
            <br />
            活成了<span className="text-sakura">小说</span>。
          </h1>

          <p className="anim-fade body-text mt-7 max-w-[46ch]" style={{ animationDelay: '0.7s' }}>
            曼谷的雨、海上的风、镜子里慢了半秒的自己——那些来不及过完的人生，都在这里继续。
            共 {NOVELS.length} 本长篇与合集，点开任意一册，读它的来历。
          </p>
        </div>
      </div>

      {/* Scroll cue — 44px touch target, smooth-scrolls to the cover wall */}
      <button
        type="button"
        onClick={scrollToWall}
        aria-label="向下滚动到封面墙"
        className="anim-fade group absolute bottom-8 left-1/2 z-10 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full border border-glass-border bg-glass text-mist transition-colors duration-300 hover:border-sakura/50 hover:text-sakura"
        style={{ animationDelay: '1.1s' }}
      >
        <ChevronDown size={18} strokeWidth={1.75} className="animate-bounce" />
      </button>
    </section>
  );
}
