import CoinLogo from './CoinLogo';
import { AMULET } from '@/content/amulet';

/**
 * Section 1 — 泰瑞堂 hero。暖金光晕之上是巨大的 3D 双面金币（可拖拽），
 * serif 超大品牌名 + eyebrow + slogan，入场用模板的 anim-rise / anim-fade。
 */
export default function AmuletHero() {
  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-[clamp(1.25rem,5vw,4rem)] pb-16 pt-[96px] text-center">
      <p
        className="anim-rise eyebrow text-sakura-deep"
        style={{ animationDelay: '0.1s' }}
      >
        {AMULET.brandEn} · Since Bangkok
      </p>

      <h1
        className="anim-rise hero-h1 mt-5 text-fog"
        style={{ animationDelay: '0.26s' }}
      >
        {AMULET.brand}
      </h1>

      <p
        className="anim-fade eyebrow mt-6 text-ghost"
        style={{ animationDelay: '0.6s' }}
      >
        {AMULET.slogan}
      </p>

      <div className="anim-pop mt-14" style={{ animationDelay: '0.75s' }}>
        <CoinLogo />
      </div>

      <p
        className="anim-fade mt-9 font-sans text-[0.78rem] tracking-[0.24em] text-ghost"
        style={{ animationDelay: '1.05s' }}
      >
        拖一拖，转个缘
      </p>
    </section>
  );
}
