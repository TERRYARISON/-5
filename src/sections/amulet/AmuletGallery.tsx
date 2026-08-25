import type { CSSProperties } from 'react';
import Reveal from '@/components/Reveal';
import { AMULET_GALLERY } from '@/content/amulet';

/**
 * Section 3 — 展示格。AMULET_GALLERY 四张图：桌面 2×2 / 手机单列，
 * kenburns 缓慢缩放 + 图下一句 caption，图片 lazy 加载。
 */
export default function AmuletGallery() {
  return (
    <section className="section-shell">
      <Reveal className="max-w-[640px]">
        <p className="reveal-item eyebrow text-sakura-deep">Gallery · 案头清供</p>
        <h2
          className="reveal-item section-h2 mt-4 text-fog"
          style={{ '--reveal-delay': '0.1s' } as CSSProperties}
        >
          与牌相处的日常
        </h2>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2">
        {AMULET_GALLERY.map((item, i) => (
          <Reveal key={item.img} threshold={0.2}>
            <figure>
              <div
                className="reveal-item relative aspect-[4/3] overflow-hidden rounded-2xl border border-glass-border bg-ink"
                style={{ '--reveal-delay': `${(i % 2) * 0.12}s` } as CSSProperties}
              >
                <div className="kenburns-frame">
                  <img
                    src={item.img}
                    alt={item.caption}
                    loading="lazy"
                    className="kenburns-img"
                  />
                </div>
              </div>
              <figcaption
                className="reveal-item body-text mt-4 text-[0.92rem]"
                style={{ '--reveal-delay': `${(i % 2) * 0.12 + 0.1}s` } as CSSProperties}
              >
                {item.caption}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
