# CYBERPUNK SAKURA — Zheng Chao Portfolio
## Global Design Document

A cinematic, editorial, dark cyberpunk-sakura personal showcase site for **Zheng Chao (郑超)**. The design replicates a reference video's core experience: a full-screen living portrait with slow Ken Burns motion, a scroll-driven camera journey that pushes into the portrait, frosted-glass cards floating over falling sakura petals, and editorial serif typography. All site copy is **English**.

---

## 1. Design Concept & Mood

**"Cyber-organic bloom"** — a porcelain human form wrapped in glowing circuit vines, cherry blossoms drifting through a midnight city forest. Technology and nature dissolve into one ecosystem.

Mood keywords: cinematic, nocturnal, editorial, serene, luminous, bioluminescent, poetic.

Every page shares the same atmospheric system: near-black deep-space background, a fixed canvas of falling sakura petals + faint neon motes, frosted-glass surfaces, oversized serif display type with one word highlighted in italic pink, and a persistent violet arrow-button motif.

---

## 2. Color Palette

| Token | Hex | Usage |
|---|---|---|
| `void` | `#07070D` | Primary page background |
| `abyss` | `#0B0B14` | Section alternation, footer |
| `ink` | `#12121E` | Card solid fallback, borders on hover |
| `sakura` | `#F0A6C0` | Italic accent words, glows, small highlights, petal midtone |
| `sakura-deep` | `#D97B9E` | Petal shadows, hover states, gradient end |
| `neon` | `#7DE8F0` | Secondary accent — micro labels, particle motes, circuit glow |
| `violet` | `#A78BFA` | Primary buttons, highlighted manifesto word, focus rings |
| `violet-deep` | `#8B5CF6` | Button gradient end |
| `fog` | `#EDEDF5` | Primary text (high emphasis) |
| `mist` | `rgba(237,237,245,0.62)` | Secondary text |
| `ghost` | `rgba(237,237,245,0.38)` | Captions, meta, eyebrows |
| `glass` | `rgba(255,255,255,0.08)` | Card fill (8–12% white) |
| `glass-border` | `rgba(255,255,255,0.15)` | 1px card stroke |

**Glows** (used sparingly, one per viewport region):
- Sakura glow: `0 0 40px rgba(240,166,192,0.35)`
- Neon glow: `0 0 24px rgba(125,232,240,0.3)`
- Violet glow: `0 0 32px rgba(167,139,250,0.45)`

**Forbidden**: cheap multi-stop rainbow gradients, pure white backgrounds, default-blue links, saturated red/green.

---

## 3. Typography

Google Fonts (loaded via `index.html` or CSS import):

- **Display serif**: `Cormorant Garamond` — weights 300, 400, italic 300/400. Used for all headlines, manifesto lines, and pull quotes.
- **Body sans**: `Space Grotesk` — weights 300, 400, 500. Body copy, UI labels, buttons.
- **Fallback**: `Playfair Display` acceptable for serif; `Inter` acceptable for sans if loading issues occur.

### Type Scale (desktop / mobile)

| Role | Font | Size | Weight | Line-height | Letter-spacing | Notes |
|---|---|---|---|---|---|---|
| Hero H1 | Cormorant Garamond | clamp(3.2rem, 7.5vw, 7rem) | 300 | 1.02 | -0.01em | One key word in italic + `sakura` |
| Section H2 | Cormorant Garamond | clamp(2.4rem, 5vw, 4.5rem) | 300 | 1.05 | 0 | Ampersand/keyword italic + sakura |
| Manifesto | Cormorant Garamond | clamp(2rem, 4.2vw, 3.8rem) | 300 | 1.25 | 0 | One word in violet italic |
| Card title | Cormorant Garamond | 1.6rem | 400 | 1.2 | 0 | |
| Eyebrow / meta | Space Grotesk | 0.72rem | 500 | 1.4 | 0.3em, UPPERCASE | Color `ghost` or `neon` |
| Body | Space Grotesk | 1rem / 0.95rem | 300 | 1.75 | 0.01em | Color `mist` |
| Button label | Space Grotesk | 0.78rem | 500 | 1 | 0.22em, UPPERCASE | |

**Rules**: Headlines are never bold; elegance comes from size and whitespace. Italic serif + sakura pink is THE signature accent — use exactly once per headline.

---

## 4. Layout System

- **Max content width**: 1280px, centered, `padding-inline: clamp(1.25rem, 5vw, 4rem)`.
- **Section vertical rhythm**: `padding-block: clamp(6rem, 14vh, 11rem)`.
- **Grid**: 12-col on desktop; cards typically span 3/4/6. Mobile collapses to single column with 1.25rem gutters.
- **Radius**: Cards 20px, pills 999px, images 16px.
- **Breakpoints**: 640 / 768 / 1024 / 1280.

---

## 5. Signature Visual Systems (Global)

### 5.1 Sakura Petal Canvas (`<PetalField />`)
- Full-viewport `<canvas>` fixed behind content (`z-index: 1`), pointer-events none. Content layers sit at `z-index: 10`+.
- 40–60 petals on desktop, 20–28 on mobile. Each petal: small bezier petal shape (two arcs), size 6–16px, fill gradient between `#F0A6C0` (alpha .5–.9) and `#D97B9E` (alpha .3–.6); ~10% of particles are tiny 1.5px `neon`-colored glowing motes with blur shadow.
- Motion: slow fall (0.3–0.9 px/frame vertical), horizontal sinusoidal sway (amplitude 20–60px, period 3–7s), continuous rotation. Petals respawn at top when leaving viewport bottom. Wind drift: subtle global x-offset oscillation.
- DPR-aware, `requestAnimationFrame`, pause when tab hidden. Reduced-motion: render 8 static petals, no animation.

### 5.2 Ken Burns Living Image (`<KenBurns />`)
- Full-bleed image with `transform: scale(1.0 → 1.12)` + slow translate (e.g. `translate(0,0) → translate(-1.5%, -2%)`) over **24s**, `ease-in-out`, `alternate infinite`.
- Overlaid vignette: radial-gradient `transparent 55% → rgba(7,7,13,0.75) 100%` plus bottom linear fade to `void` for seamless section transitions.

### 5.3 Scroll Camera Journey (`<CameraJourney />`)
- A pinned section (GSAP ScrollTrigger, pin duration 200vh) where a full-screen portrait scales 1.0 → 2.4 and translates to push into a detail (face → hands), while a content overlay fades/blurs out (opacity 1→0, blur 0→12px) and a second caption fades in near the end. Scrubbed to scroll progress (scrub: 0.8). Fallback for reduced-motion / touch-small screens: static image with simple crossfade.

### 5.4 Frosted Glass Card (`<GlassCard />`)
- `background: rgba(255,255,255,0.08)`, `backdrop-filter: blur(18px) saturate(1.4)`, `border: 1px solid rgba(255,255,255,0.15)`, `border-radius: 20px`.
- Hover: `translateY(-8px)`, border-color → `rgba(240,166,192,0.5)`, sakura glow shadow, inner sheen (a rotated linear-gradient pseudo-element sweeping across in 0.6s). Transition `0.45s cubic-bezier(0.22, 1, 0.36, 1)`.
- CSS fallback when `backdrop-filter` unsupported: `background: rgba(18,18,30,0.92)`.

### 5.5 Violet Arrow Button (`<ArrowButton />`)
- Composition: uppercase small label + circular 44px button containing `→`. Circle: gradient `violet → violet-deep`, violet glow on hover; arrow slides 4px right on hover, circle scales 1.08. Whole group has magnetic hover (subtle 6px cursor attraction) on desktop.

### 5.6 CSS Placeholder Card (`<PlaceholderCard />`)
Used wherever a work image is missing (per user request). Deep `ink` background, centered four-point star ✦ (SVG, sakura stroke), thin sakura 1px border, project title in serif, eyebrow "IMAGE FORTHCOMING" in `ghost`. Same hover physics as GlassCard.

---

## 6. Navigation & Footer

### Navbar (fixed, shared)
- Transparent at top; after 60px scroll adds `backdrop-blur(16px)` + `rgba(7,7,13,0.6)` background + 1px bottom `glass-border`. Height 72px.
- Left: four-point star logo ✦ (SVG, sakura→neon gradient stroke) + wordmark "ZHENG CHAO" (Space Grotesk 500, 0.3em tracking, uppercase, 0.8rem).
- Right (desktop): WORK / JOURNAL / ABOUT / CONTACT — eyebrow style links; hover shows animated sakura underline (scaleX 0→1 from left); active route link gets sakura color + persistent underline.
- Mobile: hamburger (two lines morphing to X) opens a full-screen overlay menu — dark glass background, huge serif links (2.6rem) staggered in from bottom (0.07s stagger), petals visible behind, social links at bottom.
- Route changes: scroll to top; page transition = 0.5s fade + 24px upward drift (Framer Motion `AnimatePresence`).

### Footer (shared)
- `abyss` background, top hairline border. Three columns:
  1. Logo ✦ + "Building meaningful tech, from within." (serif italic, sakura on "within")
  2. Nav links (WORK / JOURNAL / ABOUT / CONTACT)
  3. Socials: GitHub, X, Instagram, Email — icon buttons, glass circle, neon glow on hover
- Bottom row: "© 2025 Zheng Chao" + "Crafted under neon sakura" in ghost eyebrow type. A single oversized serif watermark "ZC" at 18% opacity behind, parallax-shifted on scroll.

---

## 7. Animation & Scroll Behavior

- **Lenis** smooth scrolling globally (lerp 0.09, wheel multiplier 1). Sync with GSAP ticker.
- **GSAP + ScrollTrigger** for pinned journeys, parallax, and section reveals.
- **Framer Motion** for route transitions, hover/tap micro-interactions, staggered list reveals.
- **Standard section reveal** (used site-wide): elements get `data-reveal`; on entering viewport at 15%, children stagger 0.1s, slide up 40px, opacity 0→1, duration 0.9s, `cubic-bezier(0.22,1,0.36,1)`. Trigger once.
- **Headline treatment**: word-level split (not character — display serif deserves word granularity); each word rises with slight rotation (2deg) and blur-out removal.
- **Performance guardrails**: max ~8 simultaneously animating elements per viewport; petal canvas + max ONE heavy scroll effect (pin or shader) per section; all heavy effects have CSS-only reduced-motion fallbacks.
- **Cursor**: default arrow, but interactive elements get `cursor: pointer`; on desktop, a custom 12px sakura dot cursor with 36px trailing ring (lerp 0.15) that expands to 56px + violet tint over links/buttons. Hidden on touch. (If scope pressure, drop custom cursor — lowest priority feature.)

---

## 8. Page List

| Route | File | Description |
|---|---|---|
| `/` | `home.md` | Cinematic Ken Burns hero (portrait-hero.jpg), scroll camera journey, manifesto, featured 4 glass project cards, journal preview, CTA |
| `/work` | `work.md` | "Projects & Concepts" editorial header + grouped project grid (apps, book covers, neon floral art, studio series) with glass cards, filter tabs, lightbox, placeholders |
| `/journal` | `journal.md` | Editorial article list — 3 entries with serif headlines, meta eyebrows, hover image reveals + featured opening essay layout |
| `/about` | `about.md` | portrait-profile.jpg intro, bio, street-photography diptych, philosophy tags, timeline |
| `/contact` | `contact.md` | portrait-studio.jpg + big serif CTA "Let's build from within.", contact form, social links |

---

## 9. Assets

All assets already exist in `/mnt/agents/output/assets/`. The implementation team must copy them to the site `public/` root and reference as `/<filename>`. No new image generation needed; missing work images use the CSS `<PlaceholderCard />` (§5.6).

| Filename | Description | Used on | Dimensions | Type |
|---|---|---|---|---|
| `portrait-hero.jpg` | User's cyberpunk-sakura AI portrait: standing pose, glass/crystal vines wrapping shoulders and neck, glowing circuit lines, sakura forest at night | Home hero (Ken Burns), camera journey end frame | 1122×1402 (4:5) | Image |
| `portrait-recline.jpg` | Same character reclining against a tree, crystal vines, petals drifting | Home camera journey section / Work page side image | 1122×1402 (4:5) | Image |
| `portrait-profile.jpg` | Side-profile contemplative pose, hand to chin, neon constellation circuit lines on skin | About page hero, home manifesto side | 900×1600 (9:16) | Image |
| `portrait-studio.jpg` | Clean studio portrait, grey backdrop, navy tee, front-facing | Contact page | 2000×1478 (~4:3) | Image |
| `street-market.jpg` | Street photography, market light and shadow | About page diptych | 912×1157 | Image |
| `street-tattoo.jpg` | Street photography, Bangkok market, tattooed arm with pink bandana | About page diptych | 1348×1800 | Image |
| `work-app-1.jpg` / `work-app-2.jpg` / `work-app-3.jpg` | Dark fintech app UI concept screens (vertical) | Work grid — "Pulse" app concept | 3 vertical screens | Image |
| `work-book-1.jpg` / `work-book-2.jpg` / `work-book-3.jpg` | Dark botanical neon book-cover series | Work grid — "Neon Botanica" covers | 3 vertical covers | Image |
| `work-neon-hero.jpg` | Luminous neon floral digital art, wide | Work grid — featured "Lumen Flora" | 1600×900 (16:9) | Image |
| `work-neon-1.jpg` / `work-neon-2.jpg` | Additional neon floral artworks | Work grid — "Lumen Flora" companions | Image | Image |
| `work-floral-face.jpg` | AI floral portrait poster — flower-covered face, very on-theme | Work grid — "Blossom Study" | Image | Image |
| `studio-cover.jpg` | Studio banner image | Work grid — "Studio Works" group header | Image | Image |
| `studio-kol.jpg` | KOL shoot production still | Work grid — Studio Works | Image | Image |
| `studio-prod-1/2/3.jpg` | Behind-the-scenes production stills | Work grid — Studio Works | Image | Image |
| `studio-talent-1/3/8.jpg` | Talent studio portraits | Work grid — Studio Works | Image | Image |
| `studio-venue-2/7.jpg` | Event venue photography | Work grid — Studio Works | Image | Image |
| `journal-1.jpg` | Recording studio, ON AIR sign glowing | Journal — "Notes on Signal & Silence" | Image | Image |
| `journal-2.jpg` | Studio at night, city glow | Journal — "The Studio After Midnight" | Image | Image |
| `journal-3.jpg` | On-set production scene | Journal — "What a Set Teaches You" | Image | Image |
| ✦ logo | Four-point star, sakura→neon gradient stroke, 1.5px | Navbar, footer, placeholder cards | vector | SVG |

---

## 10. Dependencies

`react`, `react-dom`, `react-router-dom` (BrowserRouter), `gsap` (+ ScrollTrigger), `lenis`, `framer-motion`, `tailwindcss` v3.4, `shadcn/ui` (only primitives if useful — button, dialog for lightbox), `lucide-react` (icons). Fonts: Google Fonts `Cormorant Garamond` + `Space Grotesk`.