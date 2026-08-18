import { useState } from 'react';
import type { CSSProperties, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import GlassCard from '@/components/GlassCard';
import Reveal from '@/components/Reveal';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

/**
 * Section 5 — newsletter strip (journal.md §5). Centered glass card with a
 * glass-pill email input + violet circular submit. Success morphs the input
 * row into an italic sakura serif welcome line.
 */
export default function SubscribeStrip() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) return;
    setDone(true);
  };

  return (
    <section className="section-shell pt-0">
      <Reveal threshold={0.2}>
        <GlassCard className="reveal-item mx-auto w-full max-w-[640px] p-10 text-center sm:p-12">
          <p className="eyebrow text-neon">Newsletter</p>
          <h2 className="mt-4 font-serif text-[2.2rem] font-light leading-tight text-fog sm:text-[2.6rem]">
            Letters from the <em className="italic text-sakura">night shift</em>.
          </h2>

          <div className="mt-9 min-h-[60px]">
            <AnimatePresence mode="wait">
              {done ? (
                <motion.p
                  key="done"
                  initial={{ opacity: 0, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="py-3 font-serif text-2xl font-light italic text-sakura"
                >
                  Welcome to the night shift.
                </motion.p>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={submit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, filter: 'blur(6px)' }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="flex items-center gap-3"
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    aria-label="Email address"
                    className="w-full min-w-0 rounded-full border border-glass-border bg-glass px-6 py-3.5 font-sans text-[0.95rem] font-light text-fog placeholder:text-ghost focus:border-sakura/60 focus:shadow-[0_0_24px_rgba(240,166,192,0.25)] focus:outline-none"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet to-violet-deep transition-all duration-300 hover:scale-[1.08] hover:shadow-[0_0_32px_rgba(167,139,250,0.45)] active:scale-95"
                  >
                    <ArrowRight size={18} strokeWidth={1.75} className="text-void" />
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          <p
            className="reveal-item mt-5 font-sans text-[0.8rem] font-light text-ghost"
            style={{ '--reveal-delay': '0.15s' } as CSSProperties}
          >
            One letter a month. No noise, only signal.
          </p>
        </GlassCard>
      </Reveal>
    </section>
  );
}
