# HOME — `/`

The flagship page. Replicates the reference video: a full-screen cinematic hero with slow Ken Burns motion, a scroll-driven camera push into the portrait, an editorial manifesto, four floating glass project cards around the portrait, journal preview, and a closing CTA. Petal canvas runs behind everything.

---

## Section 1 — Hero (full viewport, 100vh)

**Layout**
- Full-bleed background: `portrait-hero.jpg` in `<KenBurns />` (scale 1.0→1.12, drift toward upper-left, 24s alternate). Image is positioned right-of-center (`object-position: 65% 30%`) so the figure breathes on the right while text occupies the left.
- Vignette overlay + left-side gradient scrim `linear-gradient(90deg, rgba(7,7,13,0.85) 0%, rgba(7,7,13,0.35) 45%, transparent 70%)` for text legibility.
- Content (left, vertically centered, max-width 640px):
  - Eyebrow: `PORTFOLIO — EST. 2025` (neon, 0.3em tracking)
  - H1 (serif): **"Building Meaningful Tech, From *Within*."** — *Within* in italic + sakura. Two/three natural line breaks.
  - Sub: "Exploring the intersection of identity, intelligence, and imagination — one system at a time." (body, mist, max 46ch)
  - `<ArrowButton />` label `EXPLORE PORTFOLIO` → routes to `/work`.
- Bottom-center: scroll cue — 1px vertical hairline (sakura, 48px tall) with a dot traveling down it on a 2s loop + `SCROLL` eyebrow text.

**Animation**
- Load: scrim fades in 0.8s; eyebrow slides up 20px (0.1s delay); H1 words split-rise (word-level, 0.08s stagger, 0.9s each, 2deg rotation settle); sub fades 0.6s later; button scales 0.9→1 with violet glow pulse once.
- Ken Burns runs continuously; petals drift over the scrim (canvas above image, below text).
- On scroll (first 100vh): hero content parallax-fades (opacity 1→0, y 0→-60px) while image scale continues — hands off to Section 2 pin.

---

## Section 2 — Camera Journey (pinned, 200vh scroll distance)

**Layout**: Full-viewport pinned stage. Frame A shows `portrait-recline.jpg` full-bleed. A glass caption card (bottom-left, max 380px) reads:
- Eyebrow: `THE PRACTICE`
- Serif line: "Where circuits learn to *bloom*."
- Small body: "Each project begins as a seed — a question about how we live with the systems we build."

**Animation (GSAP ScrollTrigger, pin, scrub 0.8)**
- 0%–60% of scroll: image scales 1.0 → 2.2 and translates to center on the figure's face/upper torso (transform-origin animated); caption card opacity 1→0, blur 0→10px, y +30px.
- 40%–70%: crossfade to `portrait-hero.jpg` detail crop (already scaled 2.2, aligned to hands/vines), continuing push to 2.4.
- 70%–100%: second caption fades in (top-right, eyebrow `DETAIL`, serif: "Every trace of light is *intentional*."), then whole stage fades to `void` for handoff.
- Reduced motion / <768px: unpin; show both images as a simple stacked crossfade on scroll (no scale).

---

## Section 3 — Manifesto (min-height 90vh, centered)

**Layout**: Centered column, max-width 900px, text-center.
- Eyebrow: `MANIFESTO` (neon)
- Serif manifesto (manifesto scale): "To gracefully cultivate a newly balanced *ecosystem*, we dissolve all boundaries between technology and nature." — *ecosystem* in **violet** italic; rest `fog`.
- Small signature line below: "— Zheng Chao" (ghost eyebrow style).
- Decorative: two thin sakura hairlines flanking the block, each 64px wide; a faint radial sakura glow behind text center (opacity 0.12).

**Animation**: Pin-free. On entering viewport (30% trigger): words rise in word-by-word (0.05s stagger, y 30px, blur 8→0). The word *ecosystem* lands last with a violet glow bloom (0→0.45→0.3 shadow intensity). Hairlines scaleX 0→1 from center. Parallax: block drifts y -40px across its viewport transit.

---

## Section 4 — Featured Work (the four floating glass cards)

**Layout**
- Header row (left-aligned): H2 **"Projects *&* Concepts"** (& italic sakura) + sub "A collection of ideas, products, and systems — where creativity meets technology." Right side: `<ArrowButton />` `EXPLORE PROJECTS` → `/work`.
- Below: asymmetric 12-col grid — cards float at staggered vertical offsets (desktop: col positions 1–5, 7–11, then 2–6 offset -40px, 8–12 offset +40px) to echo the video's "cards floating around the figure". Mobile: single column, no offsets.
- Cards (GlassCard, padding 28px):
  1. **Silicon Rituals** — eyebrow `DIGITAL ESSAY` + meta "Reading time · 6 min". Serif blurb: "On the habits we keep with machines." No image — uses a thin neon top-hairline ornament instead.
  2. **Bloom** — eyebrow `WELLNESS APP CONCEPT`. Body: "An ambient wellness experience that blends nature, technology, and mindful living."
  3. **Atelier** — eyebrow `AI CO-CREATION`. Body: "A creative companion for moodboarding, ideation, and visual exploration."
  4. **Fragments** — eyebrow `DESIGN SYSTEM`. Body: "UI components, interaction patterns, and visual language for digital storytellers."
- Each card: title (card-title serif), eyebrow/meta (ghost), 1–2 line body, bottom-right `→` in a 32px violet-ghost circle. Click → `/work` (anchor to project).

**Animation**: Section reveal per global §7 (stagger 0.12s, up 40px). Cards have continuous idle float: y ±6px sine, 5s period, phase-shifted per card (pause on hover — hover triggers GlassCard lift instead). Background: slow parallax sakura-glow blob drifting 10% of scroll delta.

---

## Section 5 — Journal Preview (two-column editorial)

**Layout**
- Header: eyebrow `JOURNAL` + H2 **"Notes From the *Night*."** (*Night* italic sakura). Right: text link `READ ALL →` → `/journal`.
- Left column (span 7): featured article — `journal-1.jpg` (16:10, rounded 16px) with hover zoom 1.05; below, eyebrow `ESSAY · MAR 2025 · 5 MIN`, serif title "Notes on Signal & Silence", 2-line excerpt.
- Right column (span 5): two compact rows — thumbnails `journal-2.jpg`, `journal-3.jpg` (120×90, rounded 12px) + titles "The Studio After Midnight" / "What a Set Teaches You About Systems" + meta eyebrows. Rows separated by glass hairlines.

**Animation**: Featured image clip-path reveal (inset 12%→0, 1s) on enter; right rows stagger 0.15s slide-in from right 30px. Row hover: thumbnail scales 1.08, title shifts 6px right, arrow appears.

---

## Section 6 — Closing CTA (60vh)

**Layout**: Centered. Background: `portrait-recline.jpg` at 14% opacity, heavily blurred (40px), dark scrim over.
- Serif line (section-H2 scale): "Let's build something that *blooms*."
- `<ArrowButton />` `GET IN TOUCH` → `/contact`.

**Animation**: Line splits in word-by-word on enter; button glow pulses gently (2.4s cycle) until hovered. Background blur image has inverse parallax (moves opposite scroll 30px).

---

## Assets used
`portrait-hero.jpg`, `portrait-recline.jpg`, `journal-1.jpg`, `journal-2.jpg`, `journal-3.jpg`, ✦ SVG logo, petal canvas (procedural), glass/blur CSS. Missing card imagery intentionally uses ornament/placeholder treatment per design.md §5.6.
