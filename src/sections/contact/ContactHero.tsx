import { useState } from 'react';
import { motion } from 'framer-motion';
import { AtSign, Copy, ExternalLink, Github } from 'lucide-react';
import StarMark from '@/components/StarMark';
import { SOCIALS } from '@/content/site';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];
/** 真实邮箱（PRD F-005/F-006）——在 src/content/site.ts 里统一改 */
const EMAIL = SOCIALS.email;

const TITLE_WORDS: { text: string; accent?: boolean }[] = [
  { text: 'Let’s' },
  { text: 'Build' },
  { text: 'From' },
  { text: 'Within.', accent: true },
];

/**
 * Section 1 — contact hero (contact.md §1). 100vh split: word-split serif
 * invitation + direct channels + availability chip on the left; studio
 * portrait with clip-reveal, violet glow bleed, and a 28s Ken Burns on the
 * right. Load animations only — CSS word-split + Framer Motion UI reveals.
 */
export default function ContactHero() {
  return (
    <section className="relative flex min-h-[100dvh] items-center overflow-hidden">
      <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 items-center gap-16 px-[clamp(1.25rem,5vw,4rem)] pb-20 pt-[calc(72px+3rem)] md:grid-cols-12">
        {/* Left — copy + channels (span 6) */}
        <div className="md:col-span-6">
          <p className="anim-rise eyebrow text-neon" style={{ animationDelay: '0.1s' }}>
            Contact · Say Hello
          </p>

          <h1 className="hero-h1 mt-6 text-fog">
            {TITLE_WORDS.map((word, i) => (
              <span key={word.text} className="inline-block overflow-hidden pb-1 align-bottom">
                <span
                  className={`anim-rise inline-block ${word.accent ? 'italic text-sakura' : ''} ${
                    i < TITLE_WORDS.length - 1 ? 'mr-[0.24em]' : ''
                  }`}
                  style={{ animationDelay: `${0.22 + i * 0.08}s` }}
                >
                  {word.text}
                </span>
              </span>
            ))}
          </h1>

          <p className="anim-fade body-text mt-7 max-w-[46ch]" style={{ animationDelay: '0.7s' }}>
            项目、合作、约稿，或者只是想聊聊小说、佛牌和那些发光的系统——都欢迎。
          </p>

          {/* Direct channels */}
          <div className="anim-rise mt-11" style={{ animationDelay: '0.85s' }}>
            <EmailRow />
            <ChannelLink
              icon={Github}
              label="GITHUB"
              value="github.com/TERRYARISON"
              href={SOCIALS.github}
              last
            />
          </div>

          {/* Availability chip */}
          <div className="anim-pop mt-9" style={{ animationDelay: '1.05s' }}>
            <span className="inline-flex items-center gap-3 rounded-full border border-glass-border bg-glass px-5 py-2.5 backdrop-blur-[18px]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-neon" />
              </span>
              <span className="eyebrow text-ghost">Open for Projects — 2026</span>
            </span>
          </div>
        </div>

        {/* Right — studio portrait (span 5, offset 1) */}
        <div className="relative md:col-span-5 md:col-start-8">
          {/* Soft violet glow bleed */}
          <div
            aria-hidden="true"
            className="anim-fade absolute -inset-10 rounded-[48px] bg-violet/20 blur-3xl"
            style={{ animationDelay: '0.9s' }}
          />
          <motion.div
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            animate={{ clipPath: 'inset(0 0% 0 0)' }}
            transition={{ duration: 1, ease: EASE, delay: 0.5 }}
            className="relative overflow-hidden rounded-[20px] border border-glass-border"
          >
            {/* Inner Ken Burns 1.0 → 1.05 / 28s (contact.md §1) */}
            <motion.img
              src="/portrait-studio.jpg"
              alt="Zheng Chao — studio portrait"
              draggable={false}
              className="aspect-[4/5] w-full object-cover"
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.05] }}
              transition={{ duration: 28, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror' }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/** EMAIL row — click-to-copy with COPY / COPIED ✦ chip. */
function EmailRow() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      const el = document.createElement('textarea');
      el.value = EMAIL;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      el.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="group flex w-full cursor-pointer items-center gap-5 border-t border-glass-border py-5 text-left"
      aria-label={`Copy email address ${EMAIL}`}
    >
      <AtSign size={16} strokeWidth={1.5} className="shrink-0 text-ghost" />
      <span className="eyebrow w-24 shrink-0 text-ghost">Email</span>
      <span className="min-w-0 truncate font-sans text-[0.95rem] font-light text-mist transition-colors duration-300 group-hover:text-fog">
        {EMAIL}
      </span>
      <span
        className={`ml-auto flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 transition-all duration-300 ${
          copied
            ? 'border-sakura/50 text-sakura opacity-100'
            : 'border-glass-border text-ghost opacity-0 group-hover:opacity-100'
        }`}
      >
        {copied ? (
          <>
            <span className="eyebrow text-[0.6rem] text-sakura">Copied</span>
            <StarMark size={10} flat />
          </>
        ) : (
          <>
            <Copy size={11} strokeWidth={1.5} />
            <span className="eyebrow text-[0.6rem]">Copy</span>
          </>
        )}
      </span>
    </button>
  );
}

function ChannelLink({
  icon: Icon,
  label,
  value,
  href,
  last = false,
}: {
  icon: typeof Github;
  label: string;
  value: string;
  href: string;
  last?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`group flex items-center gap-5 border-t border-glass-border py-5 ${last ? 'border-b' : ''}`}
    >
      <Icon size={16} strokeWidth={1.5} className="shrink-0 text-ghost" />
      <span className="eyebrow w-24 shrink-0 text-ghost">{label}</span>
      <span className="min-w-0 truncate font-sans text-[0.95rem] font-light text-mist transition-colors duration-300 group-hover:text-fog">
        {value}
      </span>
      <ExternalLink
        size={14}
        strokeWidth={1.5}
        className="ml-auto shrink-0 text-ghost transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neon"
      />
    </a>
  );
}
