import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ASSETS_DIR = join(__dirname, '..', 'assets');
mkdirSync(ASSETS_DIR, { recursive: true });

const FONTS = {
  serif: `Georgia, 'Times New Roman', Times, serif`,
  sans: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif`,
  mono: `'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace`,
};

const THEMES = {
  dark: {
    bgStart: '#14120F',
    bgEnd: '#0B0A08',
    panel: '#1A1713',
    border: 'rgba(246, 242, 234, 0.14)',
    borderSolid: '#2C2822',
    divider: 'rgba(246, 242, 234, 0.11)',
    accent: '#D4A359',
    accentGlow: '0.15',
    ink: '#F6F2EA',
    ink2: '#B8B1A4',
    muted: '#7D776C',
    pillBg: 'rgba(212, 163, 89, 0.14)',
    pillBorder: 'rgba(212, 163, 89, 0.34)',
    pillText: '#E2B770',
    primaryBtnBg: '#D4A359',
    primaryBtnText: '#14110B',
    primaryBtnBorder: '#D4A359',
    secondaryBtnBg: '#14120F',
    secondaryBtnText: '#F6F2EA',
    secondaryBtnBorder: '#3B352C',
    liveDot: '#D4A359',
    waveBar: '#D4A359',
  },
  light: {
    bgStart: '#F7F2E8',
    bgEnd: '#F3EDE2',
    panel: '#FFFFFF',
    border: 'rgba(23, 21, 18, 0.14)',
    borderSolid: '#DCD4C5',
    divider: 'rgba(23, 21, 18, 0.11)',
    accent: '#9F5A18',
    accentGlow: '0.10',
    ink: '#171512',
    ink2: '#4A453D',
    muted: '#6B6457',
    pillBg: 'rgba(159, 90, 24, 0.10)',
    pillBorder: 'rgba(159, 90, 24, 0.28)',
    pillText: '#8A4C12',
    primaryBtnBg: '#171512',
    primaryBtnText: '#F6F2EA',
    primaryBtnBorder: '#171512',
    secondaryBtnBg: '#FFFFFF',
    secondaryBtnText: '#171512',
    secondaryBtnBorder: '#CBC2B2',
    liveDot: '#9F5A18',
    waveBar: '#9F5A18',
  },
};

function esc(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function writeSvg(filename, content) {
  writeFileSync(join(ASSETS_DIR, filename), content.trim() + '\n', 'utf8');
}

function renderHero(themeName) {
  const t = THEMES[themeName];
  const waveHeights = [18, 34, 52, 28, 62, 40, 22];
  const waveBars = waveHeights
    .map((h, i) => {
      const x = 698 + i * 14;
      const y = Math.round(134 - h / 2);
      const delay = (i * 0.22).toFixed(2);
      return `<rect class="wave-bar" x="${x}" y="${y}" width="5" height="${h}" rx="2.5" fill="${t.waveBar}" style="animation-delay: ${delay}s" />`;
    })
    .join('\n    ');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="840" height="248" viewBox="0 0 840 248" role="img" aria-label="Vrajesh Trivedi — Software built from the ground up, tested on real hardware, and shipped.">
  <defs>
    <linearGradient id="hero-bg-${themeName}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${t.bgStart}"/>
      <stop offset="100%" stop-color="${t.bgEnd}"/>
    </linearGradient>
    <radialGradient id="hero-glow-${themeName}" cx="0.08" cy="0.08" r="0.68">
      <stop offset="0%" stop-color="${t.accent}" stop-opacity="${t.accentGlow}"/>
      <stop offset="100%" stop-color="${t.accent}" stop-opacity="0"/>
    </radialGradient>
    <clipPath id="hero-clip-${themeName}">
      <rect x="0.5" y="0.5" width="839" height="247" rx="14"/>
    </clipPath>
    <style>
      @keyframes pulseDot {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.32; }
      }
      @keyframes wavePulse {
        0%, 100% { opacity: 0.22; }
        50% { opacity: 0.72; }
      }
      .live-dot {
        animation: pulseDot 2.8s ease-in-out infinite;
      }
      .wave-bar {
        animation: wavePulse 3.2s ease-in-out infinite;
      }
      @media (prefers-reduced-motion: reduce) {
        .live-dot, .wave-bar { animation: none; opacity: 0.55; }
      }
    </style>
  </defs>

  <g clip-path="url(#hero-clip-${themeName})">
    <rect x="0" y="0" width="840" height="248" fill="url(#hero-bg-${themeName})"/>
    <rect x="0" y="0" width="840" height="248" fill="url(#hero-glow-${themeName})"/>
  </g>
  <rect x="0.5" y="0.5" width="839" height="247" rx="14" fill="none" stroke="${t.border}" stroke-width="1"/>

  <!-- Top header row -->
  <circle cx="38" cy="36" r="4.5" fill="${t.accent}"/>
  <text x="52" y="41" font-family="${FONTS.serif}" font-size="18" fill="${t.ink}" letter-spacing="-0.2">Vrajesh <tspan font-style="italic" fill="${t.accent}">Trivedi</tspan></text>

  <circle class="live-dot" cx="550" cy="36" r="3.5" fill="${t.liveDot}"/>
  <text x="562" y="40" font-family="${FONTS.mono}" font-size="11" fill="${t.muted}" letter-spacing="1.1">OPEN TO WORK · BENGALURU, INDIA</text>

  <line x1="34" y1="60" x2="806" y2="60" stroke="${t.divider}" stroke-width="1"/>

  <!-- Editorial headline -->
  <text x="34" y="114" font-family="${FONTS.serif}" font-size="35" font-weight="400" fill="${t.ink}" letter-spacing="-0.8">Software built from the ground up,</text>
  <text x="34" y="160" font-family="${FONTS.serif}" font-size="35" font-weight="400" fill="${t.ink}" letter-spacing="-0.8"><tspan font-style="italic" fill="${t.accent}">tested on real hardware</tspan>, and shipped.</text>

  <!-- Subtle telemetry / waveform accent -->
  <g>
    ${waveBars}
  </g>

  <line x1="34" y1="194" x2="806" y2="194" stroke="${t.divider}" stroke-width="1"/>

  <!-- Bottom strip -->
  <text x="34" y="222" font-family="${FONTS.mono}" font-size="11" fill="${t.muted}" letter-spacing="0.9">ANDROID &amp; WEAR OS  ·  CHROME MV3  ·  AI TRANSCRIPTION  ·  LOCAL-FIRST</text>
  <text x="806" y="222" text-anchor="end" font-family="${FONTS.mono}" font-size="11" fill="${t.accent}" letter-spacing="1.1">VRAJESHLABS.COM</text>
</svg>`;
}

const BUTTONS = [
  {
    id: 'portfolio',
    label: 'vrajeshlabs.com ↗',
    width: 174,
    primary: true,
    aria: 'Visit vrajeshlabs.com portfolio',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    width: 108,
    primary: false,
    aria: 'Vrajesh Trivedi on LinkedIn',
  },
  {
    id: 'email',
    label: 'Email',
    width: 92,
    primary: false,
    aria: 'Email Vrajesh Trivedi',
  },
  {
    id: 'youtube',
    label: 'YouTube',
    width: 108,
    primary: false,
    aria: 'Vrajesh Trivedi on YouTube',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    width: 116,
    primary: false,
    aria: 'Vrajesh Trivedi on Instagram',
  },
];

function renderButton(btn, themeName) {
  const t = THEMES[themeName];
  const bg = btn.primary ? t.primaryBtnBg : t.secondaryBtnBg;
  const fg = btn.primary ? t.primaryBtnText : t.secondaryBtnText;
  const border = btn.primary ? t.primaryBtnBorder : t.secondaryBtnBorder;
  const weight = btn.primary ? '600' : '500';
  const cx = btn.width / 2;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${btn.width}" height="34" viewBox="0 0 ${btn.width} 34" role="img" aria-label="${esc(btn.aria)}">
  <rect x="0.5" y="0.5" width="${btn.width - 1}" height="33" rx="16.5" fill="${bg}" stroke="${border}" stroke-width="1"/>
  <text x="${cx}" y="21.5" text-anchor="middle" font-family="${FONTS.sans}" font-size="12.5" font-weight="${weight}" fill="${fg}" letter-spacing="0.1">${esc(btn.label)}</text>
</svg>`;
}

const CARDS = [
  {
    fileIndex: '01',
    index: '01',
    status: 'GOOGLE PLAY · LIVE',
    title: 'Audio Rewind',
    category: 'ANDROID · WEAR OS · AI',
    line1: 'Rolling 15s or 30s audio window in memory on Wear OS',
    line2: 'and Android, ready to replay and transcribe.',
    highlights: [
      { value: '15s / 30s', label: 'In-memory window' },
      { value: 'Zero alloc', label: 'Preallocated buffer' },
      { value: 'Watch + Phone', label: 'Either owns mic' },
    ],
    footerTech: 'Kotlin · Wearable APIs · Device E2E',
  },
  {
    fileIndex: '02',
    index: '02',
    status: 'CWS · V1.1.0 CANDIDATE',
    title: 'GPhotos Unleashed',
    category: 'CHROME EXTENSION · LOCAL-FIRST',
    line1: 'Organize Google Photos via exact-photo previews,',
    line2: 'confirmed batches, and verified recovery receipts.',
    highlights: [
      { value: '9 src · 23 ops', label: 'Preview before write' },
      { value: 'IndexedDB', label: 'Readback & undo' },
      { value: '1M-item gate', label: 'Bounded local queue' },
    ],
    footerTech: 'JavaScript · MV3 · Playwright',
  },
  {
    fileIndex: '03',
    index: '03',
    status: 'WEB + MV3 · IN PROGRESS',
    title: 'May The Job Be With You',
    category: 'CHROME EXTENSION · TYPESCRIPT',
    line1: 'Side Panel assistant mapping job forms from a',
    line2: 'browser-local profile with confidence scoring.',
    highlights: [
      { value: 'Local-only', label: 'IndexedDB profile' },
      { value: 'Confidence', label: 'Uncertain flagged' },
      { value: 'Manual submit', label: 'Never auto-submits' },
    ],
    footerTech: 'TypeScript · Vite · Dexie',
  },
  {
    fileIndex: '04',
    index: '04',
    status: 'CHROME WEB STORE · LIVE',
    title: 'Bulk Unsaver for Insta',
    category: 'CHROME EXTENSION · AUTOMATION',
    line1: 'Clears large Instagram Saved collections across',
    line2: 'tab switches, with progress saved on every step.',
    highlights: [
      { value: 'Background', label: 'Across tab switches' },
      { value: 'Resumable', label: 'Saved every step' },
      { value: 'Locale-safe', label: 'DOM structure keys' },
    ],
    footerTech: 'JavaScript · MV3 · chrome.storage',
  },
];

function renderCard(card, themeName) {
  const t = THEMES[themeName];
  const badgeWidth = Math.max(112, Math.round(card.status.length * 6.4 + 20));
  const colPositions = [24, 152, 280];

  const highlightNodes = card.highlights
    .map((h, idx) => {
      const x = colPositions[idx];
      return `  <text x="${x}" y="180" font-family="${FONTS.mono}" font-size="11.5" font-weight="600" fill="${t.accent}">${esc(h.value)}</text>
  <text x="${x}" y="197" font-family="${FONTS.sans}" font-size="10.5" fill="${t.muted}">${esc(h.label)}</text>`;
    })
    .join('\n');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="420" height="260" viewBox="0 0 420 260" role="img" aria-label="${esc(card.title)} — ${esc(card.category)}">
  <defs>
    <linearGradient id="card-bg-${card.fileIndex}-${themeName}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${t.bgStart}"/>
      <stop offset="100%" stop-color="${t.bgEnd}"/>
    </linearGradient>
    <clipPath id="card-clip-${card.fileIndex}-${themeName}">
      <rect x="0.5" y="0.5" width="419" height="259" rx="12"/>
    </clipPath>
  </defs>

  <g clip-path="url(#card-clip-${card.fileIndex}-${themeName})">
    <rect x="0" y="0" width="420" height="260" fill="url(#card-bg-${card.fileIndex}-${themeName})"/>
  </g>
  <rect x="0.5" y="0.5" width="419" height="259" rx="12" fill="none" stroke="${t.border}" stroke-width="1"/>

  <!-- Top metadata bar -->
  <text x="24" y="34" font-family="${FONTS.mono}" font-size="11.5" font-weight="600" fill="${t.accent}" letter-spacing="0.8">${esc(card.index)}</text>
  <rect x="48" y="20" width="${badgeWidth}" height="20" rx="10" fill="${t.pillBg}" stroke="${t.pillBorder}" stroke-width="0.8"/>
  <text x="${48 + badgeWidth / 2}" y="33.5" text-anchor="middle" font-family="${FONTS.mono}" font-size="9.2" font-weight="600" fill="${t.pillText}" letter-spacing="0.5">${esc(card.status)}</text>
  <text x="396" y="33.5" text-anchor="end" font-family="${FONTS.mono}" font-size="9.5" fill="${t.muted}" letter-spacing="0.7">PRIVATE SOURCE</text>

  <!-- Title & category -->
  <text x="24" y="76" font-family="${FONTS.serif}" font-size="24" font-weight="400" fill="${t.ink}" letter-spacing="-0.4">${esc(card.title)}</text>
  <text x="24" y="96" font-family="${FONTS.mono}" font-size="10" fill="${t.accent}" letter-spacing="0.9">${esc(card.category)}</text>

  <!-- Two-line pitch -->
  <text x="24" y="124" font-family="${FONTS.sans}" font-size="12.5" fill="${t.ink2}">${esc(card.line1)}</text>
  <text x="24" y="142" font-family="${FONTS.sans}" font-size="12.5" fill="${t.ink2}">${esc(card.line2)}</text>

  <line x1="24" y1="158" x2="396" y2="158" stroke="${t.divider}" stroke-width="1"/>

  <!-- 3-column invariants -->
${highlightNodes}

  <line x1="24" y1="214" x2="396" y2="214" stroke="${t.divider}" stroke-width="1"/>

  <!-- Footer -->
  <text x="24" y="238" font-family="${FONTS.mono}" font-size="10.2" fill="${t.muted}">${esc(card.footerTech)}</text>
  <text x="396" y="238" text-anchor="end" font-family="${FONTS.sans}" font-size="11.5" font-weight="600" fill="${t.accent}">Case study ↗</text>
</svg>`;
}

const STACK_COLUMNS = [
  {
    title: 'ANDROID & WEAR OS',
    items: [
      'Kotlin & Coroutines',
      'Tiles & Complications',
      'Foreground Audio Services',
      'Wearable Transport APIs',
      'Preallocated Ring Buffers',
      'Physical-Device E2E Suites',
    ],
  },
  {
    title: 'BROWSER & MV3',
    items: [
      'TypeScript & JavaScript',
      'Chrome Manifest V3',
      'Side Panel API',
      'Service Worker Lifecycle',
      'Isolated DOM Adapters',
      'Locale-Safe Selectors',
    ],
  },
  {
    title: 'LOCAL-FIRST DATA',
    items: [
      'IndexedDB & Dexie',
      'Explicit Schema Migrations',
      'Per-Photo Readback Ledgers',
      'Step-Level Checkpoints',
      'Export / Import Durability',
      'Zero-Server Privacy Model',
    ],
  },
  {
    title: 'TESTING & DELIVERY',
    items: [
      'Playwright E2E Harnesses',
      'Protocol Mutation Testing',
      'Failure Injection Suites',
      'Astro 5 & Vite',
      'Cloudflare Pages',
      'Play & Web Store Releases',
    ],
  },
];

const PIPELINE_STEPS = [
  { num: '01', label: 'Problem', width: 68 },
  { num: '02', label: 'Product', width: 68 },
  { num: '03', label: 'Architecture', width: 92 },
  { num: '04', label: 'Build', width: 52 },
  { num: '05', label: 'Test', width: 48 },
  { num: '06', label: 'Ship', width: 50 },
  { num: '07', label: 'Improve', width: 64 },
];

function renderStack(themeName) {
  const t = THEMES[themeName];
  const colWidth = 196;
  const startX = 34;

  const colSvg = STACK_COLUMNS.map((col, colIdx) => {
    const x = startX + colIdx * colWidth;
    const divider =
      colIdx > 0
        ? `<line x1="${x - 14}" y1="74" x2="${x - 14}" y2="232" stroke="${t.divider}" stroke-width="1"/>`
        : '';
    const itemNodes = col.items
      .map((item, rowIdx) => {
        const y = 108 + rowIdx * 22;
        return `<text x="${x}" y="${y}" font-family="${FONTS.sans}" font-size="12" fill="${t.ink2}">${esc(item)}</text>`;
      })
      .join('\n  ');
    return `${divider}
  <text x="${x}" y="82" font-family="${FONTS.mono}" font-size="10.5" font-weight="600" fill="${t.accent}" letter-spacing="0.9">${esc(col.title)}</text>
  ${itemNodes}`;
  }).join('\n');

  let cursorX = 136;
  const stepNodes = PIPELINE_STEPS.map((step, idx) => {
    const x = cursorX;
    const arrowX = x + step.width + 6;
    const arrow =
      idx < PIPELINE_STEPS.length - 1
        ? `<text x="${arrowX}" y="284" font-family="${FONTS.mono}" font-size="11" fill="${t.muted}">→</text>`
        : '';
    cursorX = arrowX + 22;
    return `<text x="${x}" y="284" font-family="${FONTS.mono}" font-size="10.5" fill="${t.accent}">${step.num}</text>
  <text x="${x + 19}" y="284" font-family="${FONTS.sans}" font-size="11.5" font-weight="500" fill="${t.ink}">${esc(step.label)}</text>
  ${arrow}`;
  }).join('\n  ');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="840" height="318" viewBox="0 0 840 318" role="img" aria-label="Capabilities, technical stack, and 7-step build process">
  <defs>
    <linearGradient id="stack-bg-${themeName}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${t.bgStart}"/>
      <stop offset="100%" stop-color="${t.bgEnd}"/>
    </linearGradient>
    <clipPath id="stack-clip-${themeName}">
      <rect x="0.5" y="0.5" width="839" height="317" rx="14"/>
    </clipPath>
  </defs>

  <g clip-path="url(#stack-clip-${themeName})">
    <rect x="0" y="0" width="840" height="318" fill="url(#stack-bg-${themeName})"/>
  </g>
  <rect x="0.5" y="0.5" width="839" height="317" rx="14" fill="none" stroke="${t.border}" stroke-width="1"/>

  <text x="34" y="37" font-family="${FONTS.mono}" font-size="11" font-weight="600" fill="${t.ink}" letter-spacing="1.1">CAPABILITIES &amp; TECHNICAL STACK</text>
  <text x="806" y="37" text-anchor="end" font-family="${FONTS.mono}" font-size="10.2" fill="${t.muted}" letter-spacing="0.9">NO BACKEND BY DEFAULT · TESTED UNDER FAILURE</text>

  <line x1="34" y1="54" x2="806" y2="54" stroke="${t.divider}" stroke-width="1"/>

  ${colSvg}

  <line x1="34" y1="252" x2="806" y2="252" stroke="${t.divider}" stroke-width="1"/>

  <text x="34" y="284" font-family="${FONTS.mono}" font-size="10.2" font-weight="600" fill="${t.muted}" letter-spacing="1">HOW I BUILD</text>
  ${stepNodes}
</svg>`;
}

function renderFooter(themeName) {
  const t = THEMES[themeName];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="840" height="76" viewBox="0 0 840 76" role="img" aria-label="Under this sky, I dream. Then I build. — vrajeshlabs.com">
  <defs>
    <linearGradient id="footer-bg-${themeName}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${t.bgStart}"/>
      <stop offset="100%" stop-color="${t.bgEnd}"/>
    </linearGradient>
    <clipPath id="footer-clip-${themeName}">
      <rect x="0.5" y="0.5" width="839" height="75" rx="12"/>
    </clipPath>
  </defs>

  <g clip-path="url(#footer-clip-${themeName})">
    <rect x="0" y="0" width="840" height="76" fill="url(#footer-bg-${themeName})"/>
  </g>
  <rect x="0.5" y="0.5" width="839" height="75" rx="12" fill="none" stroke="${t.border}" stroke-width="1"/>

  <circle cx="34" cy="38" r="4" fill="${t.accent}"/>
  <text x="48" y="43" font-family="${FONTS.serif}" font-size="17" font-style="italic" fill="${t.ink}">Under this sky, I dream. <tspan fill="${t.accent}">Then I build.</tspan></text>
  <text x="806" y="42" text-anchor="end" font-family="${FONTS.mono}" font-size="10.5" fill="${t.muted}" letter-spacing="0.8">VRAJESHLABS.COM · TRIVEDI.VRAJESH2597@GMAIL.COM</text>
</svg>`;
}

for (const themeName of ['dark', 'light']) {
  writeSvg(`hero-${themeName}.svg`, renderHero(themeName));
  for (const btn of BUTTONS) {
    writeSvg(`btn-${btn.id}-${themeName}.svg`, renderButton(btn, themeName));
  }
  for (const card of CARDS) {
    writeSvg(`card-${card.fileIndex}-${themeName}.svg`, renderCard(card, themeName));
  }
  writeSvg(`stack-${themeName}.svg`, renderStack(themeName));
  writeSvg(`footer-${themeName}.svg`, renderFooter(themeName));
}

console.log('Generated SVGs in', ASSETS_DIR);
