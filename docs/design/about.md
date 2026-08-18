# ABOUT — `/about`

Portrait-led personal page: the neon-constellation profile portrait, a poetic bio, street-photography diptych, philosophy tags, and a career timeline.

---

## Section 1 — Portrait Hero (100vh)

**Layout** (12-col, vertically centered):
- Left (span 5): `portrait-profile.jpg` (9:16, rounded 20px, subtle 1px glass-border) with a soft neon glow bleed behind it (radial `neon` at 12% opacity). Image has gentle Ken Burns 1.0→1.06/26s *inside* its frame (overflow hidden).
- Right (span 6, offset 1):
  - Eyebrow: `ABOUT · ZHENG CHAO` (neon)
  - H1: **"A Mind Wired for *Wonder*."** (*Wonder* italic sakura)
  - Body (2 paragraphs): "I'm Zheng Chao — a designer-engineer working where identity, intelligence, and imagination intersect. I build products, write essays, and direct images; the common thread is systems that feel alive." / "By day I shape interfaces and narratives; by night I walk cities with a camera, collecting light the way others collect answers."
  - Meta row (ghost eyebrows, separated by ✦ glyphs): `SHANGHAI / REMOTE` ✦ `DESIGN × CODE × STORY`
  - ArrowButton `SEE MY WORK` → `/work`.

**Animation**: Load — portrait clip-reveal from bottom (inset 100% 0 0 0 → 0, 1.1s expo) with glow bloom; right column word-split headline (0.08s) then paragraph lines stagger up (0.06s, 20px). Scroll: portrait parallax y +40px slower than text.

---

## Section 2 — Street Diptych (photography interlude)

**Layout**: full-width band. Eyebrow header centered: `FIELD OBSERVATIONS` (ghost). Two images side by side with a 24px gap, different heights for editorial rhythm:
- `street-market.jpg` (span 7, 4:5 crop, rounded 16px) — caption below: *"Markets are interfaces too."* (serif italic, sakura)
- `street-tattoo.jpg` (span 5, 3:4 crop, offset down 60px) — caption: *"Skin, ink, neon."*

**Animation**: Scroll-driven split parallax — left image y -50px, right image y +50px across transit (scrub). Captions fade up 20px at 30% viewport. Hover: image zoom 1.05 + sakura border fade-in.

---

## Section 3 — Philosophy Tags (marquee + grid)

**Layout**: centered block.
- Eyebrow: `OPERATING PRINCIPLES` (neon)
- Serif H2: **"What I *Believe*"** (*Believe* italic sakura)
- Two rows of glass pills (marquee, opposite directions, 30s loop, pause on hover): `SYSTEMS OVER SCREENS` · `SILENCE IS UI` · `BLOOM, DON'T BLINK` · `CODE IS CLAY` · `NIGHT IS A PALETTE` · `NATURE IS THE ORIGINAL NETWORK` · `SLOW IS SMOOTH` · `STORY BEFORE FEATURE`
- Below: 3-column mini-grid (GlassCards) expanding three principles with 2-line bodies:
  1. **Systems over screens** — "Interfaces end; systems endure. I design the rules, not just the pixels."
  2. **Silence is UI** — "What a product refuses to say is part of its voice."
  3. **Bloom, don't blink** — "Attention earned slowly lasts longer than attention seized."

**Animation**: Marquee infinite CSS/JS loop; H2 word-split reveal; cards standard stagger reveal (0.12s, up 40px).

---

## Section 4 — Timeline (vertical)

**Layout**: max-width 760px, left rail: 1px glass vertical line with sakura dot nodes (8px, glowing). Entries alternate spacing, each: year (serif, 2rem, sakura for current) + eyebrow role + 1–2 line body.
- **2025** — `INDEPENDENT PRACTICE` — "Building products, essays, and images under one roof — this site is the roof."
- **2023** — `DESIGN ENGINEER` — "Shipped design systems and AI-assisted creative tools."
- **2021** — `STUDIO DIRECTOR` — "Ran productions for brands and artists; learned systems from film sets."
- **2019** — `FIRST LIGHT` — "First camera, first line of code, first all-nighter — in the same month."

**Animation**: Rail draws downward with scroll (scaleY scrubbed). Nodes pop (scale 0→1, spring) as they enter; entries slide in from right 24px, stagger 0.1s.

---

## Section 5 — CTA

**Layout**: centered: serif H2 **"Still *curious*?"** + ArrowButton `GET IN TOUCH` → `/contact`.

**Animation**: standard reveal; button pulse.

---

## Assets used
`portrait-profile.jpg`, `street-market.jpg`, `street-tattoo.jpg`, ✦ glyphs (CSS/SVG), petal canvas.