import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Twitter, Instagram, Mail } from 'lucide-react';
import StarMark from './StarMark';

const LINKS = [
  { to: '/work', label: 'Work' },
  { to: '/journal', label: 'Journal' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

const SOCIALS = [
  { icon: Github, label: 'GitHub', href: 'https://github.com' },
  { icon: Twitter, label: 'X', href: 'https://x.com' },
  { icon: Instagram, label: 'Instagram', href: 'https://instagram.com' },
  { icon: Mail, label: 'Email', href: 'mailto:hello@zhengchao.dev' },
];

/**
 * Fixed overlay nav (design.md §6): transparent at top, gains a blurred
 * void background + hairline after 60px of scroll. 72px tall. Pages with
 * full-bleed heroes sit underneath it — Layout adds no top padding.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 h-[72px] transition-all duration-500 ${
          scrolled
            ? 'border-b border-glass-border bg-[rgba(7,7,13,0.6)] backdrop-blur-[16px]'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-full w-full max-w-[1280px] items-center justify-between px-[clamp(1.25rem,5vw,4rem)]">
          <Link to="/" className="flex items-center gap-3" aria-label="Zheng Chao — home">
            <StarMark size={22} />
            <span className="font-sans text-[0.8rem] font-medium uppercase tracking-[0.3em] text-fog">
              Zheng Chao
            </span>
          </Link>

          <nav className="hidden items-center gap-9 md:flex" aria-label="Primary">
            {LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `nav-link eyebrow text-ghost transition-colors duration-300 hover:text-fog ${isActive ? 'nav-active' : ''}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="relative flex h-10 w-10 flex-col items-center justify-center gap-[7px] md:hidden"
          >
            <span
              className={`block h-px w-6 bg-fog transition-all duration-300 ${open ? 'translate-y-[4px] rotate-45' : ''}`}
            />
            <span
              className={`block h-px w-6 bg-fog transition-all duration-300 ${open ? '-translate-y-[4px] -rotate-45' : ''}`}
            />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-[rgba(7,7,13,0.82)] px-8 pb-12 pt-32 backdrop-blur-[24px] md:hidden"
          >
            <nav className="flex flex-col gap-7" aria-label="Mobile">
              {[{ to: '/', label: 'Home' }, ...LINKS].map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.07 * i + 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  <NavLink
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `font-serif text-[2.6rem] font-light leading-none ${isActive ? 'italic text-sakura' : 'text-fog'}`
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex items-center gap-4"
            >
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-glass-border bg-glass text-mist transition-colors hover:text-neon"
                >
                  <s.icon size={16} strokeWidth={1.5} />
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
