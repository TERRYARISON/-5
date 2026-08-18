# WORK — `/work`

Editorial project archive: "Projects & Concepts". Grouped glass-card grid with filter tabs and a lightbox. Dark, floating, luminous — same petal canvas and glass language as Home.

---

## Section 1 — Page Hero (70vh)

**Layout**
- Background: `portrait-recline.jpg` right-anchored (`object-position: 75% 20%`), Ken Burns (scale 1.0→1.08, 20s), heavy left scrim (same gradient recipe as Home hero).
- Content (left, vertically centered):
  - Eyebrow: `SELECTED WORKS · 2023–2025` (neon)
  - H1: **"Projects *&* Concepts"** — & italic sakura.
  - Sub: "A collection of ideas, products, and systems — where creativity meets technology."
  - `<ArrowButton />` `EXPLORE PROJECTS` — smooth-scrolls to the grid below.
- Bottom-right of hero: small index counter `01 / 05` (ghost) indicating scroll position groups.

**Animation**: Load — eyebrow up 20px, H1 word-split rise (0.08s stagger), sub fade +0.3s, button scale in. On scroll-out: content parallax fade (y -60, opacity→0 over first 80vh).

---

## Section 2 — Filter Tabs (sticky sub-nav)

**Layout**: Sticky below navbar (top: 72px, z-40, backdrop-blur, `rgba(7,7,13,0.55)`). Centered pill row:
`ALL · DIGITAL · COVERS · ART · STUDIO` — eyebrow-style pills in glass; active pill = violet gradient fill + violet glow + `fog` text. Right side (desktop): result count, e.g. `14 PIECES` (ghost).

**Animation**: Tab switch — grid items animate out (opacity 0, y 20px, scale 0.97, stagger 0.04s, 0.3s) then new set in (reverse). Active pill uses Framer Motion `layoutId` underline/dot slide.

---

## Section 3 — Project Grid (grouped)

Masonry-feel 12-col grid, cards = GlassCard with image top (rounded 16px inset 8px), then title/eyebrow/body below. Every card click opens the Lightbox (§4). Cards without imagery use `<PlaceholderCard />`.

### Group A — DIGITAL (eyebrow header `01 · DIGITAL`)
1. **Pulse — Fintech Reimagined** (`DIGITAL PRODUCT · UI CONCEPT`): triptych card spanning 8 cols showing `work-app-1.jpg`, `work-app-2.jpg`, `work-app-3.jpg` side by side (each 4:5, slight 3D fan: outer cards rotate ±4deg, lift on hover). Body: "A dark-mode finance companion that treats money as energy flow."
2. **Silicon Rituals** (`DIGITAL ESSAY · 6 MIN`): PlaceholderCard (no image) — serif title, ✦, sakura border. Body: "On the habits we keep with machines."
3. **Atelier** (`AI CO-CREATION`): PlaceholderCard. Body: "A creative companion for moodboarding, ideation, and visual exploration."
4. **Fragments** (`DESIGN SYSTEM`): PlaceholderCard. Body: "UI components, interaction patterns, and visual language for digital storytellers."
5. **Bloom** (`WELLNESS APP CONCEPT`): PlaceholderCard. Body: "An ambient wellness experience that blends nature, technology, and mindful living."

### Group B — COVERS (header `02 · COVERS`)
6. **Neon Botanica — Cover Series** (`PRINT · ART DIRECTION`): three vertical cards `work-book-1/2/3.jpg` (2:3 each, 4-col spans). Body on first: "A botany of light — three volumes on plants that grow after dark."

### Group C — ART (header `03 · ART`)
7. **Lumen Flora** (`DIGITAL ART`): wide feature card, 12 cols, `work-neon-hero.jpg` (16:9) with hover chromatic shimmer (2px RGB-split on hover, 0.4s). 
8. **Lumen Flora — Study I** `work-neon-1.jpg` (6 cols)
9. **Lumen Flora — Study II** `work-neon-2.jpg` (6 cols)
10. **Blossom Study** (`AI PORTRAIT`): `work-floral-face.jpg` (6 cols). Body: "Where the garden wears a face."

### Group D — STUDIO (header `04 · STUDIO`)
11. **Studio Works** banner card: `studio-cover.jpg` 12-col wide (21:9 crop) — header card for the group, title overlaid on scrim.
12. Grid of 3-col square cards: `studio-kol.jpg` (**KOL Sessions**), `studio-prod-1.jpg` / `studio-prod-2.jpg` / `studio-prod-3.jpg` (**On Set I–III**), `studio-talent-1.jpg` / `studio-talent-3.jpg` / `studio-talent-8.jpg` (**Talent Series**), `studio-venue-2.jpg` / `studio-venue-7.jpg` (**Venues**). Each: title + `PRODUCTION` / `PORTRAIT` / `SPACE` eyebrow.

**Animation**: Group headers reveal with hairline scaleX + eyebrow fade. Cards: standard section reveal (stagger 0.08s within each group, up 40px). Hover per GlassCard §5.4; images inside zoom 1.06 with 0.7s ease. Group blocks separated by 8rem whitespace.

---

## Section 4 — Lightbox (interaction)

- Click any card → full-screen overlay: `rgba(7,7,13,0.9)` + backdrop-blur 20px; image centered (max 85vh), caption below (title serif + eyebrow + body). Prev/Next arrow buttons (violet circles) cycle within filtered set; ESC/backdrop click closes.
- Animation: overlay fade 0.3s; image scales 0.92→1 with 0.5s expo; caption slides up 20px delayed 0.15s. Framer Motion `AnimatePresence`.

---

## Section 5 — Footer CTA strip

**Layout**: centered: eyebrow `NEXT`, serif H2 **"Curious about the *process*?"** (*process* italic sakura), ArrowButton `READ THE JOURNAL` → `/journal`.

**Animation**: standard reveal; button idle pulse.

---

## Assets used
`portrait-recline.jpg`, `work-app-1/2/3.jpg`, `work-book-1/2/3.jpg`, `work-neon-hero.jpg`, `work-neon-1.jpg`, `work-neon-2.jpg`, `work-floral-face.jpg`, `studio-cover.jpg`, `studio-kol.jpg`, `studio-prod-1/2/3.jpg`, `studio-talent-1/3/8.jpg`, `studio-venue-2/7.jpg`, ✦ SVG (placeholder cards), petal canvas.
