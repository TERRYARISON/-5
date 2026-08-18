# CONTACT — `/contact`

Quiet, confident closing page: studio portrait, oversized serif invitation, a glass contact form, and direct channels.

---

## Section 1 — Contact Hero (100vh)

**Layout** (12-col, vertically centered):
- Left (span 6):
  - Eyebrow: `CONTACT · SAY HELLO` (neon)
  - H1 (hero scale): **"Let's Build From *Within*."** (*Within* italic sakura)
  - Sub: "Projects, collaborations, commissions — or just a good conversation about systems and sakura."
  - Direct channels (stacked rows, glass hairlines between):
    - `EMAIL` — hello@zhengchao.design (click-to-copy; hover shows `COPY` chip, success chip reads `COPIED ✦`)
    - `GITHUB` — github.com/zhengchao (external-link icon, neon on hover)
    - `INSTAGRAM` — @zhengchao.studio
  - Availability chip: glass pill with pulsing neon dot + `OPEN FOR PROJECTS — 2025` (ghost).
- Right (span 5, offset 1): `portrait-studio.jpg` (4:3 crop to 4:5, rounded 20px, glass-border, soft violet glow bleed behind). Inner Ken Burns 1.0→1.05/28s.

**Animation**: Load — left column word-split H1 (0.08s stagger), channel rows stagger up (0.1s, 24px); portrait clip-reveal right-to-left (1s expo) + glow bloom. Availability dot pulses 2s loop continuously.

---

## Section 2 — Contact Form (glass panel)

**Layout**: centered GlassCard, max-width 680px, padding 40px.
- Header inside card: eyebrow `TRANSMISSION` + serif H3 (2rem): "Send a *signal*." (*signal* italic sakura)
- Fields (glass pill inputs, 1px glass-border → sakura border + glow on focus; labels as floating eyebrow text):
  1. `NAME` — text input
  2. `EMAIL` — email input
  3. `SUBJECT` — select pill: `PROJECT / COLLABORATION / COMMISSION / OTHER` (custom dropdown, glass list, violet highlight)
  4. `MESSAGE` — textarea (5 rows, rounded 16px)
- Submit: ArrowButton-style wide pill `SEND SIGNAL →` (violet gradient, full-width on mobile).
- Validation: error = field border `sakura-deep` + tiny ghost message; success = form morphs (opacity/blur swap) to centered state: ✦ + serif italic "Signal received. I'll reply within two nights." + `SEND ANOTHER` text link.

**Animation**: Card reveal up 40px at 20% viewport. Fields stagger in 0.08s. Submit: button ripple + loading = arrow rotates into a spinner ring; success swap 0.4s crossfade.

---

## Section 3 — Footer Note (pre-footer)

**Layout**: centered, generous whitespace.
- Serif manifesto-scale line: "Every great system began as a *conversation*." (*conversation* violet italic — echoing the Home manifesto highlight).
- Ghost eyebrow below: `RESPONSE TIME · WITHIN 48 HOURS`

**Animation**: word-split rise, violet word lands last with glow bloom (same recipe as Home §3).

---

## Assets used
`portrait-studio.jpg`, ✦ SVG, petal canvas. No generated assets needed.