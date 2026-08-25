import type { CSSProperties } from 'react';
import { Mail } from 'lucide-react';
import GlassCard from '@/components/GlassCard';
import Reveal from '@/components/Reveal';
import { SITE } from '@/content/site';

/**
 * 「写信给我」（PRD F-009：撤掉假订阅，换成真实可抵达的联系）。
 * 没有后端收件服务，就不假装有——直接打开访客的邮件客户端。
 */
export default function SubscribeStrip() {
  return (
    <section className="section-shell pt-0">
      <Reveal threshold={0.2}>
        <GlassCard className="reveal-item mx-auto w-full max-w-[640px] p-10 text-center sm:p-12">
          <p className="eyebrow text-neon">Write to Me</p>
          <h2 className="mt-4 font-serif text-[2.2rem] font-light leading-tight text-fog sm:text-[2.6rem]">
            读完有想法？<em className="italic text-sakura">写信</em>给我。
          </h2>
          <p className="body-text mx-auto mt-5 max-w-[40ch] text-[0.95rem]">
            没有订阅机器人，也没有营销邮件。只有一个人，和一个真的会看的邮箱。
          </p>

          <div className="mt-9 flex justify-center">
            <a
              href={`mailto:${SITE.email}?subject=${encodeURIComponent('来自你的网站 · 读后感')}`}
              className="group inline-flex min-h-[48px] items-center gap-3 rounded-full border border-violet/40 bg-violet/10 px-8 py-3 font-sans text-sm text-fog transition-all duration-300 hover:border-violet hover:bg-violet/20 hover:shadow-[0_0_32px_rgba(167,139,250,0.35)]"
            >
              <Mail size={16} strokeWidth={1.5} className="text-violet transition-transform duration-300 group-hover:-translate-y-0.5" />
              {SITE.email}
            </a>
          </div>

          <p
            className="reveal-item mt-5 font-sans text-[0.8rem] font-light text-ghost"
            style={{ '--reveal-delay': '0.15s' } as CSSProperties}
          >
            点击会打开你自己的邮件应用。
          </p>
        </GlassCard>
      </Reveal>
    </section>
  );
}
