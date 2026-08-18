# JOURNAL — `/journal`

Editorial long-form index: big serif headlines, generous whitespace, meta eyebrows. Three essays using the journal images, plus a featured opening layout. Reading-focused: calmer motion than Home.

---

## Section 1 — Page Hero (60vh)

**Layout**
- Background: `journal-2.jpg` (studio at night) full-bleed, Ken Burns 1.0→1.09/22s, dark scrim 0.7 + vignette.
- Content centered:
  - Eyebrow: `JOURNAL · FIELD NOTES` (neon)
  - H1: **"Thinking Out *Loud*."** (*Loud* italic sakura)
  - Sub: "Essays and fragments on design, intelligence, and the quiet hours."

**Animation**: Load — H1 word-split rise (0.09s stagger), sub fade +0.3s. Scroll-out parallax fade as global pattern.

---

## Section 2 — Featured Essay (split editorial)

**Layout** (12-col):
- Left (span 6, sticky while text scrolls on desktop): `journal-1.jpg` full-height image (4:5, rounded 16px) with hover slow-zoom 1.04.
- Right (span 5, offset 1):
  - Eyebrow: `FEATURED ESSAY · MAR 12, 2025 · 5 MIN READ` (ghost; "FEATURED ESSAY" in neon)
  - Serif H2: "Notes on Signal & Silence"
  - Excerpt (body, 3 paragraphs max shown): "The studio teaches you to listen before you speak. Between the ON AIR light and the take, there is a silence that does the real work — the same silence good interfaces leave between a question and an answer…"
  - ArrowButton `READ ESSAY` → opens Article Reader (§4).

**Animation**: Image clip-reveal (inset 10%→0, 1s, expo); right column standard reveal stagger 0.1s. Sticky image has micro-parallax (y ±20px across scroll).

---

## Section 3 — Article Index (list)

**Layout**: max-width 960px centered. Rows separated by 1px glass hairlines; each row is a full-width hover target:
- Row structure: index number `02` (serif, ghost) · thumbnail (160×110, rounded 12px) · title (H2-scale serif, 2.2rem) + eyebrow meta · right-aligned `→` that appears on hover.

Rows:
1. **02 — "The Studio After Midnight"** — `journal-2.jpg` — eyebrow `ESSAY · FEB 2025 · 4 MIN` — teaser: "What the city looks like when only the monitors are awake."
2. **03 — "What a Set Teaches You About Systems"** — `journal-3.jpg` — eyebrow `FIELD NOTE · JAN 2025 · 6 MIN` — teaser: "Fifty people, one clock, zero ambiguity. Production is interface design with bodies."
3. **04 — "Sakura Protocol"** — **no image** → row uses a PlaceholderCard-style tile (✦ + sakura border, 160×110) — eyebrow `MANIFESTO · DEC 2024 · 3 MIN` — teaser: "A short protocol for growing ideas the way branches grow blossoms."

**Animation**: Rows stagger in (0.12s, up 30px, trigger 20%). Hover: row background `rgba(255,255,255,0.04)` sweeps in left→right, thumbnail scales 1.06, title shifts x +8px and gains sakura tint on the italic word, arrow slides in from -10px. Click → Article Reader.

---

## Section 4 — Article Reader (overlay modal)

- Full-screen reader overlay (Framer Motion): `void` background (opacity 0.97), max-width 720px centered column, close `×` top-right (glass circle).
- Article header: eyebrow meta, serif H1 (3rem), hero image (16:9, rounded 16px), then body copy — body serif-adjacent reading experience: body text in Space Grotesk 1.05rem/1.85, drop-cap first letter in Cormorant italic sakura (4rem).
- 3–5 short placeholder paragraphs per essay (lorem-quality editorial copy on the essay's theme), one pull-quote in serif italic with sakura left border: *"Silence is the interface between intention and attention."*
- Bottom: `NEXT ESSAY →` link cycling to the next row.

**Animation**: Overlay fades + column slides up 40px (0.5s expo); body blocks stagger 0.06s as they enter viewport while scrolling inside overlay (own scroll context, Lenis disabled underneath). Close reverses.

---

## Section 5 — Subscribe strip

**Layout**: centered GlassCard (max 640px): eyebrow `NEWSLETTER`, serif line **"Letters from the *night shift*."**, email input (glass pill, `ghost` placeholder "your@email.com") + violet circular `→` submit. Success state: input replaced by "Welcome to the night shift." in italic sakura serif.

**Animation**: card reveal up 40px; input focus = sakura border glow; submit button ripple + label morph.

---

## Assets used
`journal-1.jpg`, `journal-2.jpg`, `journal-3.jpg`, ✦ SVG placeholder tile, petal canvas.