/**
 * ┌──────────────────────────────────────────────────────────────┐
 * │  随笔页全部文章 —— 标题、摘要、配图、正文段落都在这里改。     │
 * │  加文章：照抄一条 { ... }；image 填 public/ 里的文件名，      │
 * │  image: null 会显示「图片 forthcoming」占位。                 │
 * └──────────────────────────────────────────────────────────────┘
 */
export interface Article {
  id: string;
  index: string;
  /** Title rendered as: pre + italic-sakura accent + post. */
  pre: string;
  accent: string;
  post?: string;
  eyebrow: string;
  /** "FEATURED ESSAY" portion of the eyebrow is highlighted neon in §2. */
  eyebrowLead?: string;
  teaser: string;
  image: string | null;
  imageAlt: string;
  paragraphs: string[];
  pullQuote: string;
}

export const ARTICLES: Article[] = [
  {
    id: 'signal-and-silence',
    index: '01',
    pre: 'Notes on Signal & ',
    accent: 'Silence',
    eyebrow: 'FEATURED ESSAY · MAR 12, 2025 · 5 MIN READ',
    eyebrowLead: 'FEATURED ESSAY',
    teaser:
      'The studio teaches you to listen before you speak. Between the ON AIR light and the take, there is a silence that does the real work — the same silence good interfaces leave between a question and an answer…',
    image: '/journal-1.jpg',
    imageAlt: 'Recording studio with a glowing ON AIR sign',
    paragraphs: [
      'The studio teaches you to listen before you speak. Between the ON AIR light and the take, there is a silence that does the real work — the same silence good interfaces leave between a question and an answer. I used to think of design as the art of filling space. The studio corrected me: design is the art of protecting it.',
      'Every channel in the room competes for attention — the talkback, the metering bridge, the producer’s quiet cough behind the glass. The engineer’s craft is knowing which channel to mute. Interfaces fail the same way mixes do: not from too little signal, but from too much of it, all at once, all insisting.',
      'I started keeping a log of the silences. The half-second before a vocalist commits. The pause after a client says “almost there.” These are not absences; they are loading states for meaning. The best products I have built treat waiting the same way — a held breath, not an error.',
      'So now, when a screen asks for one more modal, one more banner, one more badge, I hear the room before the take. The red light is on. The tape is rolling. The most generous thing an interface can say is nothing at all.',
    ],
    pullQuote: 'Silence is the interface between intention and attention.',
  },
  {
    id: 'studio-after-midnight',
    index: '02',
    pre: 'The Studio After ',
    accent: 'Midnight',
    eyebrow: 'ESSAY · FEB 2025 · 4 MIN',
    teaser: 'What the city looks like when only the monitors are awake.',
    image: '/journal-2.jpg',
    imageAlt: 'Studio at night, city glow through the windows',
    paragraphs: [
      'What the city looks like when only the monitors are awake. After midnight the studio stops being a workplace and becomes an observatory — every window a dark mirror, every LED a small, patient star.',
      'The night shift has its own physics. Distances stretch; the chat channels go quiet; the commit history slows to a heartbeat. It is the only time the city’s noise floor drops low enough to hear your own thinking — the design equivalent of cutting the room tone to check whether the recording is actually clean.',
      'I do my most honest work between one and four in the morning. Not because the hours are magical, but because they are unclaimed. Nobody is watching the dashboard. The notifications stop auditioning. What remains is the artifact and the person making it, alone in a fair fight.',
      'By dawn the monitors dim and the city resumes its broadcast. The night shift never asks for credit. It just leaves the work a little quieter, a little truer, than it found it.',
    ],
    pullQuote: 'The night doesn’t give you more time. It gives you less noise.',
  },
  {
    id: 'what-a-set-teaches-you',
    index: '03',
    pre: 'What a Set Teaches You About ',
    accent: 'Systems',
    eyebrow: 'FIELD NOTE · JAN 2025 · 6 MIN',
    teaser:
      'Fifty people, one clock, zero ambiguity. Production is interface design with bodies.',
    image: '/journal-3.jpg',
    imageAlt: 'On-set production scene with crew and equipment',
    paragraphs: [
      'Fifty people, one clock, zero ambiguity. A film set is the most honest system I have ever worked inside: every role legible, every handoff rehearsed, every failure visible in real time. Production is interface design with bodies.',
      'Watch a first AD run a day and you see information architecture in its purest form. The call sheet is a sitemap. “Quiet on set” is a global state change. The slate is a transaction commit — scene, take, timestamp — and once it claps, the whole system agrees on reality.',
      'What sets understand that most software teams don’t: latency is a moral issue. When a grip waits on a cable, fifty people wait on a grip. So the system is designed backwards from the bottleneck — the same way a good checkout flow is designed backwards from the payment call.',
      'I took three rules home from set life. Name every state out loud. Make the next action physically obvious. And never, ever let the clock become invisible. The rest is commentary.',
    ],
    pullQuote: 'A set is a user interface you can walk through.',
  },
  {
    id: 'sakura-protocol',
    index: '04',
    pre: 'Sakura ',
    accent: 'Protocol',
    eyebrow: 'MANIFESTO · DEC 2024 · 3 MIN',
    teaser: 'A short protocol for growing ideas the way branches grow blossoms.',
    image: null,
    imageAlt: 'Image forthcoming — Sakura Protocol',
    paragraphs: [
      'A short protocol for growing ideas the way branches grow blossoms. First: ideas are not built, they are budded. You do not ship a blossom; you create the conditions — light, patience, a little cold — and the branch does the rest.',
      'Second: prune early, prune kindly. A branch that keeps every bud blooms poorly. The protocol asks one question of every feature, every sentence, every ambition: does removing you make the others brighter?',
      'Third: bloom in public, briefly. Sakura is famous precisely because it does not last. Ship the small beautiful thing while it is alive, let it fall, and let the falling be part of the work. Permanence is a storage problem, not a design goal.',
      'Fourth: the tree outlives the season. Keep the roots — the habits, the notes, the quiet nightly practice — even when nothing is blooming. Especially then. The protocol is not about the flowers. It is about being the kind of tree that flowers.',
    ],
    pullQuote: 'Grow the tree. The blossoms are a side effect of health.',
  },
];


/** 随笔页页头与精选视频的配图 */
export const JOURNAL_MEDIA = {
  heroImg: '/journal-2.jpg',
  featuredImg: '/journal-concept.jpg',
  featuredVideo: '/journal-concept.mp4' as string | null,
};
