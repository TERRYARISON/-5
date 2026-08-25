import { useEffect, useRef, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown, Loader2 } from 'lucide-react';
import GlassCard from '@/components/GlassCard';
import Reveal from '@/components/Reveal';
import StarMark from '@/components/StarMark';
import { SITE } from '@/content/site';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];
const SUBJECTS = ['PROJECT', 'COLLABORATION', 'COMMISSION', 'OTHER'] as const;
type Subject = (typeof SUBJECTS)[number];

type Errors = Partial<Record<'name' | 'email' | 'message', string>>;

/**
 * Section 2 — contact form (contact.md §2). Centered glass panel with
 * pill inputs, a custom glass subject dropdown (violet highlight), inline
 * validation, and a success morph to the "Signal received." state.
 */
export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState<Subject>('PROJECT');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const validate = (): Errors => {
    const next: Errors = {};
    if (!name.trim()) next.name = 'A name helps me say hello properly.';
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) next.email = 'That address won’t reach me.';
    if (message.trim().length < 10) next.message = 'Give the signal a little more body.';
    return next;
  };

  /**
   * PRD F-005：表单真实化。没有后端收件服务，就不假装提交成功——
   * 校验通过后组装 mailto:，唤起访客自己的邮件客户端，信由他亲手发出。
   */
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setSending(true);
    const body = [
      `称呼：${name.trim()}`,
      `回信邮箱：${email.trim()}`,
      '',
      message.trim(),
    ].join('\n');
    const href = `mailto:${SITE.email}?subject=${encodeURIComponent(`[网站来信 · ${subject}] ${name.trim()}`)}&body=${encodeURIComponent(body)}`;
    window.setTimeout(() => {
      window.location.href = href;
      setSending(false);
      setSent(true);
    }, 400);
  };

  const reset = () => {
    setName('');
    setEmail('');
    setSubject('PROJECT');
    setMessage('');
    setErrors({});
    setSent(false);
  };

  const fieldClass = (hasError?: string) =>
    `w-full rounded-full border bg-glass px-6 py-3.5 font-sans text-[0.95rem] font-light text-fog placeholder:text-ghost focus:outline-none transition-all duration-300 ${
      hasError
        ? 'border-sakura-deep/70'
        : 'border-glass-border focus:border-sakura/60 focus:shadow-[0_0_24px_rgba(240,166,192,0.25)]'
    }`;

  return (
    <section className="section-shell pt-0">
      <Reveal threshold={0.2}>
        <GlassCard className="reveal-item mx-auto w-full max-w-[680px] p-8 sm:p-10">
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, filter: 'blur(8px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, filter: 'blur(8px)' }}
                transition={{ duration: 0.4, ease: EASE }}
                className="flex min-h-[420px] flex-col items-center justify-center gap-6 text-center"
              >
                <StarMark size={40} />
                <p className="font-serif text-[2rem] font-light italic leading-snug text-sakura">
                  已为你打开邮件应用，点发送我就收得到。
                </p>
                <p className="max-w-[36ch] font-sans text-[0.85rem] font-light leading-relaxed text-ghost">
                  如果没有自动打开，也可以直接写信到 {SITE.email}
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className="eyebrow cursor-pointer text-ghost underline decoration-glass-border underline-offset-8 transition-colors duration-300 hover:text-fog"
                >
                  再写一封
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={submit}
                noValidate
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, filter: 'blur(8px)' }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <p className="eyebrow text-neon">Transmission</p>
                <h3 className="mt-3 font-serif text-[2rem] font-light text-fog">
                  Send a <em className="italic text-sakura">signal</em>.
                </h3>

                <div className="mt-9 flex flex-col gap-6">
                  <Field
                    label="Name"
                    error={errors.name}
                    delay={0.05}
                    control={
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        className={fieldClass(errors.name)}
                      />
                    }
                  />
                  <Field
                    label="Email"
                    error={errors.email}
                    delay={0.1}
                    control={
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className={fieldClass(errors.email)}
                      />
                    }
                  />
                  <Field
                    label="Subject"
                    delay={0.15}
                    control={<SubjectSelect value={subject} onChange={setSubject} />}
                  />
                  <Field
                    label="Message"
                    error={errors.message}
                    delay={0.2}
                    control={
                      <textarea
                        rows={5}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell me about the project, the idea, the signal…"
                        className={`${fieldClass(errors.message)} resize-none rounded-2xl`}
                      />
                    }
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="group mt-9 flex w-full cursor-pointer items-center justify-center gap-4 rounded-full bg-gradient-to-br from-violet to-violet-deep py-4 transition-all duration-300 hover:shadow-[0_0_32px_rgba(167,139,250,0.45)] disabled:cursor-wait disabled:opacity-80 sm:w-auto sm:px-10"
                >
                  <span className="font-sans text-[0.78rem] font-medium uppercase tracking-[0.22em] text-void">
                    {sending ? 'Sending' : 'Send Signal'}
                  </span>
                  {sending ? (
                    <Loader2 size={16} strokeWidth={2} className="animate-spin text-void" />
                  ) : (
                    <ArrowRight
                      size={16}
                      strokeWidth={2}
                      className="text-void transition-transform duration-300 group-hover:translate-x-1"
                    />
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </GlassCard>
      </Reveal>
    </section>
  );
}

function Field({
  label,
  error,
  delay,
  control,
}: {
  label: string;
  error?: string;
  delay: number;
  control: ReactNode;
}) {
  return (
    <motion.label
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.5, ease: EASE, delay }}
      className="block"
    >
      <span className="eyebrow mb-2.5 block text-ghost">{label}</span>
      {control}
      {error && (
        <span className="mt-2 block font-sans text-[0.75rem] font-light text-ghost">{error}</span>
      )}
    </motion.label>
  );
}

/** Custom glass dropdown with violet highlight (contact.md §2). */
function SubjectSelect({
  value,
  onChange,
}: {
  value: Subject;
  onChange: (v: Subject) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`flex w-full cursor-pointer items-center justify-between rounded-full border bg-glass px-6 py-3.5 transition-all duration-300 ${
          open
            ? 'border-sakura/60 shadow-[0_0_24px_rgba(240,166,192,0.25)]'
            : 'border-glass-border hover:border-sakura/40'
        }`}
      >
        <span className="eyebrow text-fog">{value}</span>
        <ChevronDown
          size={15}
          strokeWidth={1.5}
          className={`text-ghost transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="absolute inset-x-0 top-[calc(100%+8px)] z-20 overflow-hidden rounded-2xl border border-glass-border bg-ink/95 p-2 backdrop-blur-[18px]"
          >
            {SUBJECTS.map((option) => (
              <li key={option}>
                <button
                  type="button"
                  role="option"
                  aria-selected={option === value}
                  onClick={() => {
                    onChange(option);
                    setOpen(false);
                  }}
                  className={`eyebrow flex w-full cursor-pointer items-center justify-between rounded-xl px-4 py-3 text-left transition-colors duration-200 ${
                    option === value
                      ? 'bg-violet/15 text-violet'
                      : 'text-mist hover:bg-violet/10 hover:text-violet'
                  }`}
                >
                  {option}
                  {option === value && <StarMark size={12} />}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
