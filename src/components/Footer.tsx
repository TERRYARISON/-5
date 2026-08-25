import { Link } from 'react-router-dom';
import { Github, Mail } from 'lucide-react';
import StarMark from './StarMark';
import { NAV_LINKS, SOCIALS as SOCIAL_LINKS } from '../content/site';

const LINKS = NAV_LINKS;

/** 真实社交链接（PRD F-006） */
const SOCIALS = [
  { icon: Github, label: 'GitHub', href: SOCIAL_LINKS.github },
  { icon: Mail, label: 'Email', href: `mailto:${SOCIAL_LINKS.email}` },
];

/** Shared footer (design.md §6): three columns over `abyss`, "ZC" watermark. */
export default function Footer() {
  return (
    <footer className="relative z-10 overflow-hidden border-t border-glass-border bg-abyss">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 right-0 select-none font-serif text-[22rem] font-light leading-none text-fog/[0.045]"
      >
        ZC
      </span>

      <div className="relative mx-auto grid w-full max-w-[1280px] gap-14 px-[clamp(1.25rem,5vw,4rem)] py-20 md:grid-cols-3">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <StarMark size={22} />
            <span className="font-sans text-[0.8rem] font-medium uppercase tracking-[0.3em] text-fog">
              Zheng Chao
            </span>
          </div>
          <p className="font-serif text-xl font-light italic text-mist">
            "Building meaningful tech, from <span className="text-sakura">within</span>."
          </p>
        </div>

        <nav className="flex flex-col gap-4" aria-label="Footer">
          <p className="eyebrow text-ghost">Navigate</p>
          {LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="w-fit font-sans text-sm font-light text-mist transition-colors duration-300 hover:text-sakura"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-4">
          <p className="eyebrow text-ghost">Connect</p>
          <div className="flex items-center gap-4">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-glass-border bg-glass text-mist transition-all duration-300 hover:border-neon/50 hover:text-neon hover:shadow-[0_0_24px_rgba(125,232,240,0.3)]"
              >
                <s.icon size={17} strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="relative mx-auto flex w-full max-w-[1280px] flex-col gap-2 border-t border-glass-border px-[clamp(1.25rem,5vw,4rem)] py-7 sm:flex-row sm:items-center sm:justify-between">
        <p className="eyebrow text-ghost">© 2026 Zheng Chao</p>
        <p className="eyebrow text-ghost">Crafted under neon sakura</p>
      </div>
    </footer>
  );
}
