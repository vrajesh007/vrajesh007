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

function getAccountYears(now = new Date()) {
  const created = { year: 2018, month: 9, day: 9 };
  let years = now.getUTCFullYear() - created.year;
  const m = now.getUTCMonth() + 1;
  const d = now.getUTCDate();
  if (m < created.month || (m === created.month && d < created.day)) years -= 1;
  return Math.max(1, years);
}

const HERO_THEMES = {
  dark: {
    bg0: '#090D1C',
    bg1: '#11162F',
    bg2: '#151029',
    glowCyan: '#38BDF8',
    glowCyanOp: '0.22',
    glowViolet: '#8B5CF6',
    glowVioletOp: '0.26',
    grad0: '#38BDF8',
    grad1: '#818CF8',
    grad2: '#C084FC',
    borderOp: '0.45',
    dotBrand: '#38BDF8',
    ink: '#F8FAFC',
    surname: '#7DD3FC',
    divider: 'rgba(226, 232, 240, 0.16)',
    hRule: 'rgba(148, 163, 184, 0.16)',
    ageText: '#A5B4FC',
    liveDot: '#34D399',
    statusText: '#CBD5E1',
    bottomMuted: '#94A3B8',
    bottomDomain: '#A5B4FC',
    bpFill: 'rgba(15, 23, 42, 0.55)',
    bpStrap: 'rgba(56, 189, 248, 0.45)',
    bpInner: 'rgba(125, 211, 252, 0.35)',
    bpPhoneInner: 'rgba(165, 180, 252, 0.28)',
    bpCamera: '#7DD3FC',
    bpCrown: '#38BDF8',
    bpSync: '#818CF8',
    bpWinBar: 'rgba(129, 140, 248, 0.35)',
    bpSidepanel: 'rgba(129, 140, 248, 0.16)',
    bpLabel: '#94A3B8',
    primaryBtnGrad: ['#38BDF8', '#7C3AED'],
    primaryBtnBorder: '#60A5FA',
    primaryBtnText: '#FFFFFF',
    secondaryBtnBg: '#0F152B',
    secondaryBtnBorder: 'rgba(129, 140, 248, 0.34)',
    secondaryBtnText: '#E2E8F0',
    icons: {
      portfolio: '#FFFFFF',
      linkedin: '#38BDF8',
      email: '#A5B4FC',
      youtube: '#F87171',
      instagram: '#E879F9',
    },
  },
  light: {
    bg0: '#F5F8FF',
    bg1: '#EEF2FF',
    bg2: '#F4F1FF',
    glowCyan: '#0EA5E9',
    glowCyanOp: '0.11',
    glowViolet: '#7C3AED',
    glowVioletOp: '0.10',
    grad0: '#0284C7',
    grad1: '#4F46E5',
    grad2: '#7C3AED',
    borderOp: '0.35',
    dotBrand: '#0284C7',
    ink: '#0F172A',
    surname: '#0284C7',
    divider: 'rgba(15, 23, 42, 0.14)',
    hRule: 'rgba(15, 23, 42, 0.10)',
    ageText: '#4F46E5',
    liveDot: '#10B981',
    statusText: '#334155',
    bottomMuted: '#475569',
    bottomDomain: '#4338CA',
    bpFill: 'rgba(255, 255, 255, 0.80)',
    bpStrap: 'rgba(2, 132, 199, 0.45)',
    bpInner: 'rgba(2, 132, 199, 0.35)',
    bpPhoneInner: 'rgba(79, 70, 229, 0.28)',
    bpCamera: '#0284C7',
    bpCrown: '#0284C7',
    bpSync: '#4F46E5',
    bpWinBar: 'rgba(79, 70, 229, 0.28)',
    bpSidepanel: 'rgba(79, 70, 229, 0.11)',
    bpLabel: '#475569',
    primaryBtnGrad: ['#0284C7', '#6D28D9'],
    primaryBtnBorder: '#4F46E5',
    primaryBtnText: '#FFFFFF',
    secondaryBtnBg: '#FFFFFF',
    secondaryBtnBorder: 'rgba(79, 70, 229, 0.24)',
    secondaryBtnText: '#0F172A',
    icons: {
      portfolio: '#FFFFFF',
      linkedin: '#0284C7',
      email: '#4F46E5',
      youtube: '#DC2626',
      instagram: '#C026D3',
    },
  },
};

const PILL_ICONS = {
  portfolio: `<path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm6.93 6h-3.17a15.65 15.65 0 0 0-1.38-3.56A8.03 8.03 0 0 1 18.93 8ZM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96ZM4.26 14a8.26 8.26 0 0 1 0-4h3.38a16.5 16.5 0 0 0-.14 2c0 .68.05 1.35.14 2Zm.82 2h3.17a15.65 15.65 0 0 0 1.38 3.56A8.03 8.03 0 0 1 5.08 16Zm3.17-8H5.08a8.03 8.03 0 0 1 4.55-3.56A15.65 15.65 0 0 0 8.25 8ZM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96ZM14.34 14H9.66a14.4 14.4 0 0 1-.16-2c0-.69.06-1.36.16-2h4.68c.1.64.16 1.31.16 2s-.06 1.36-.16 2Zm.29 5.56A15.65 15.65 0 0 0 16.01 16h3.17a8.03 8.03 0 0 1-4.55 3.56ZM16.36 14c.09-.65.14-1.32.14-2s-.05-1.35-.14-2h3.38a8.26 8.26 0 0 1 0 4Z"/>`,
  linkedin: `<path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z"/>`,
  email: `<path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2Zm0 4-8 5-8-5V6l8 5 8-5v2Z"/>`,
  youtube: `<path d="M21.58 7.19a2.75 2.75 0 0 0-1.94-1.94C17.93 4.8 12 4.8 12 4.8s-5.93 0-7.64.45a2.75 2.75 0 0 0-1.94 1.94A28.7 28.7 0 0 0 2 12a28.7 28.7 0 0 0 .42 4.81 2.75 2.75 0 0 0 1.94 1.94c1.71.45 7.64.45 7.64.45s5.93 0 7.64-.45a2.75 2.75 0 0 0 1.94-1.94A28.7 28.7 0 0 0 22 12a28.7 28.7 0 0 0-.42-4.81ZM10 15.08V8.92L15.27 12 10 15.08Z"/>`,
  instagram: `<path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3Z"/>`,
};

function renderHero(themeName) {
  const h = HERO_THEMES[themeName];
  const accountYears = getAccountYears();

  return `<svg xmlns="http://www.w3.org/2000/svg" width="840" height="254" viewBox="0 0 840 254" role="img" aria-label="Vrajesh Trivedi — Software built from the ground up, tested on real hardware, and shipped.">
  <defs>
    <linearGradient id="hero-bg-${themeName}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${h.bg0}"/>
      <stop offset="52%" stop-color="${h.bg1}"/>
      <stop offset="100%" stop-color="${h.bg2}"/>
    </linearGradient>
    <radialGradient id="hero-glow-cyan-${themeName}" cx="0.15" cy="0.15" r="0.60">
      <stop offset="0%" stop-color="${h.glowCyan}" stop-opacity="${h.glowCyanOp}"/>
      <stop offset="100%" stop-color="${h.glowCyan}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="hero-glow-violet-${themeName}" cx="0.85" cy="0.82" r="0.62">
      <stop offset="0%" stop-color="${h.glowViolet}" stop-opacity="${h.glowVioletOp}"/>
      <stop offset="100%" stop-color="${h.glowViolet}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="hero-aurora-${themeName}" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${h.grad0}"/>
      <stop offset="55%" stop-color="${h.grad1}"/>
      <stop offset="100%" stop-color="${h.grad2}"/>
    </linearGradient>
    <clipPath id="hero-clip-${themeName}">
      <rect x="0.5" y="0.5" width="839" height="253" rx="14"/>
    </clipPath>
    <style>
      @keyframes pulseDot {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.35; }
      }
      @keyframes syncPulse {
        0%, 100% { opacity: 0.35; }
        50% { opacity: 0.95; }
      }
      .live-dot {
        animation: pulseDot 2.8s ease-in-out infinite;
      }
      .sync-link {
        animation: syncPulse 2.6s ease-in-out infinite;
      }
      @media (prefers-reduced-motion: reduce) {
        .live-dot, .sync-link { animation: none; opacity: 0.75; }
      }
    </style>
  </defs>

  <g clip-path="url(#hero-clip-${themeName})">
    <rect x="0" y="0" width="840" height="254" fill="url(#hero-bg-${themeName})"/>
    <rect x="0" y="0" width="840" height="254" fill="url(#hero-glow-cyan-${themeName})"/>
    <rect x="0" y="0" width="840" height="254" fill="url(#hero-glow-violet-${themeName})"/>
  </g>
  <rect x="0.5" y="0.5" width="839" height="253" rx="14" fill="none" stroke="url(#hero-aurora-${themeName})" stroke-opacity="${h.borderOp}" stroke-width="1"/>

  <!-- Top header row -->
  <circle cx="38" cy="36" r="4.5" fill="${h.dotBrand}"/>
  <text x="52" y="41" font-family="${FONTS.serif}" font-size="18" fill="${h.ink}" letter-spacing="-0.2">Vrajesh <tspan font-style="italic" fill="${h.surname}">Trivedi</tspan></text>
  <line x1="186" y1="27" x2="186" y2="45" stroke="${h.divider}" stroke-width="1"/>
  <text x="198" y="40" font-family="${FONTS.mono}" font-size="10.2" fill="${h.ageText}" letter-spacing="0.9">${accountYears}+ YRS ON GITHUB · SINCE 2018</text>

  <circle class="live-dot" cx="556" cy="36" r="3.5" fill="${h.liveDot}"/>
  <text x="568" y="40" font-family="${FONTS.mono}" font-size="10.6" fill="${h.statusText}" letter-spacing="1.0">OPEN TO WORK · BENGALURU, INDIA</text>

  <line x1="34" y1="60" x2="806" y2="60" stroke="${h.hRule}" stroke-width="1"/>

  <!-- Editorial headline -->
  <text x="34" y="108" font-family="${FONTS.serif}" font-size="31.5" font-weight="400" fill="${h.ink}" letter-spacing="-0.6">Software built from the</text>
  <text x="34" y="146" font-family="${FONTS.serif}" font-size="31.5" font-weight="400" fill="${h.ink}" letter-spacing="-0.6">ground up, <tspan font-style="italic" fill="url(#hero-aurora-${themeName})">tested on real</tspan></text>
  <text x="34" y="184" font-family="${FONTS.serif}" font-size="31.5" font-weight="400" fill="${h.ink}" letter-spacing="-0.6"><tspan font-style="italic" fill="url(#hero-aurora-${themeName})">hardware</tspan>, and shipped.</text>

  <!-- Architectural device blueprint: Wear OS ↔ Android + Chrome MV3 Side Panel -->
  <rect x="583" y="92" width="18" height="7" rx="2" fill="none" stroke="${h.bpStrap}" stroke-width="1"/>
  <rect x="583" y="141" width="18" height="7" rx="2" fill="none" stroke="${h.bpStrap}" stroke-width="1"/>
  <circle cx="592" cy="120" r="21" fill="${h.bpFill}" stroke="url(#hero-aurora-${themeName})" stroke-width="1.2"/>
  <circle cx="592" cy="120" r="15.5" fill="none" stroke="${h.bpInner}" stroke-width="0.9"/>
  <line x1="613" y1="117" x2="615" y2="123" stroke="${h.bpCrown}" stroke-width="1.6" stroke-linecap="round"/>
  <text x="592" y="170" text-anchor="middle" font-family="${FONTS.mono}" font-size="8.6" fill="${h.bpLabel}" letter-spacing="0.8">WEAR OS</text>

  <line class="sync-link" x1="619" y1="120" x2="638" y2="120" stroke="${h.bpSync}" stroke-width="1" stroke-dasharray="2.5 3"/>

  <rect x="642" y="88" width="38" height="64" rx="7" fill="${h.bpFill}" stroke="url(#hero-aurora-${themeName})" stroke-width="1.2"/>
  <rect x="645.5" y="93" width="31" height="54" rx="4" fill="none" stroke="${h.bpPhoneInner}" stroke-width="0.8"/>
  <circle cx="661" cy="96.5" r="1.2" fill="${h.bpCamera}"/>
  <text x="661" y="170" text-anchor="middle" font-family="${FONTS.mono}" font-size="8.6" fill="${h.bpLabel}" letter-spacing="0.8">ANDROID</text>

  <rect x="698" y="88" width="106" height="64" rx="7" fill="${h.bpFill}" stroke="url(#hero-aurora-${themeName})" stroke-width="1.2"/>
  <line x1="698" y1="99" x2="804" y2="99" stroke="${h.bpWinBar}" stroke-width="0.9"/>
  <circle cx="706" cy="93.5" r="1.3" fill="${h.grad0}" opacity="0.75"/>
  <circle cx="712" cy="93.5" r="1.3" fill="${h.grad1}" opacity="0.75"/>
  <circle cx="718" cy="93.5" r="1.3" fill="${h.grad2}" opacity="0.75"/>
  <rect x="771" y="99" width="33" height="53" rx="0" fill="${h.bpSidepanel}"/>
  <line x1="771" y1="99" x2="771" y2="152" stroke="url(#hero-aurora-${themeName})" stroke-width="1"/>
  <text x="751" y="170" text-anchor="middle" font-family="${FONTS.mono}" font-size="8.6" fill="${h.bpLabel}" letter-spacing="0.8">CHROME MV3</text>

  <line x1="34" y1="202" x2="806" y2="202" stroke="${h.hRule}" stroke-width="1"/>

  <!-- Bottom strip -->
  <text x="34" y="230" font-family="${FONTS.mono}" font-size="10.8" fill="${h.bottomMuted}" letter-spacing="0.9">ANDROID &amp; WEAR OS  ·  CHROME MV3  ·  AI TRANSCRIPTION  ·  LOCAL-FIRST</text>
  <text x="806" y="230" text-anchor="end" font-family="${FONTS.mono}" font-size="11" font-weight="600" fill="${h.bottomDomain}" letter-spacing="1.1">VRAJESHLABS.COM</text>
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
    width: 114,
    primary: false,
    aria: 'Vrajesh Trivedi on LinkedIn',
  },
  {
    id: 'email',
    label: 'Email',
    width: 98,
    primary: false,
    aria: 'Email Vrajesh Trivedi',
  },
  {
    id: 'youtube',
    label: 'YouTube',
    width: 114,
    primary: false,
    aria: 'Vrajesh Trivedi on YouTube',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    width: 124,
    primary: false,
    aria: 'Vrajesh Trivedi on Instagram',
  },
];

function renderButton(btn, themeName) {
  const h = HERO_THEMES[themeName];
  const gradDef = btn.primary
    ? `<defs><linearGradient id="btn-g-${btn.id}-${themeName}" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="${h.primaryBtnGrad[0]}"/><stop offset="100%" stop-color="${h.primaryBtnGrad[1]}"/></linearGradient></defs>`
    : '';
  const bg = btn.primary ? `url(#btn-g-${btn.id}-${themeName})` : h.secondaryBtnBg;
  const border = btn.primary ? h.primaryBtnBorder : h.secondaryBtnBorder;
  const fg = btn.primary ? h.primaryBtnText : h.secondaryBtnText;
  const iconColor = h.icons[btn.id];
  const weight = btn.primary ? '600' : '500';
  const textX = 35 + (btn.width - 49) / 2;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${btn.width}" height="36" viewBox="0 0 ${btn.width} 36" role="img" aria-label="${esc(btn.aria)}">
  ${gradDef}
  <rect x="0.5" y="0.5" width="${btn.width - 1}" height="35" rx="17.5" fill="${bg}" stroke="${border}" stroke-width="1"/>
  <svg x="14" y="10.5" width="15" height="15" viewBox="0 0 24 24" fill="${iconColor}">${PILL_ICONS[btn.id]}</svg>
  <text x="${textX}" y="22.5" text-anchor="middle" font-family="${FONTS.sans}" font-size="12.5" font-weight="${weight}" fill="${fg}" letter-spacing="0.1">${esc(btn.label)}</text>
</svg>`;
}

const CHAPTERS = [
  {
    fileIndex: '01',
    index: '01',
    status: 'GOOGLE PLAY · LIVE',
    title: 'Audio Rewind',
    category: 'ANDROID · WEAR OS · AI',
    pitch: 'Rolling 15s or 30s audio window in memory on Wear OS and Android.',
    highlights: [
      { value: '15s / 30s', label: 'In-memory' },
      { value: 'Zero alloc', label: 'Ring buffer' },
      { value: 'Watch + Phone', label: 'Either owns mic' },
    ],
  },
  {
    fileIndex: '02',
    index: '02',
    status: 'CWS · V1.1.0 CANDIDATE',
    title: 'GPhotos Unleashed',
    category: 'CHROME EXTENSION · LOCAL-FIRST',
    pitch: 'Exact-photo previews, confirmed batches, and verified recovery receipts.',
    highlights: [
      { value: '9 src · 23 ops', label: 'Preview first' },
      { value: 'IndexedDB', label: 'Readback undo' },
      { value: '1M-item gate', label: 'Bounded queue' },
    ],
  },
  {
    fileIndex: '03',
    index: '03',
    status: 'WEB + MV3 · IN PROGRESS',
    title: 'May The Job Be With You',
    category: 'CHROME EXTENSION · TYPESCRIPT',
    pitch: 'Side Panel assistant mapping forms from a browser-local profile.',
    highlights: [
      { value: 'Local-only', label: 'IndexedDB' },
      { value: 'Confidence', label: 'Flags uncertain' },
      { value: 'Manual submit', label: 'Never submits' },
    ],
  },
  {
    fileIndex: '04',
    index: '04',
    status: 'CHROME WEB STORE · LIVE',
    title: 'Bulk Unsaver for Insta',
    category: 'CHROME EXTENSION · AUTOMATION',
    pitch: 'Clears large Instagram Saved collections across tab switches.',
    highlights: [
      { value: 'Background', label: 'Tab switches' },
      { value: 'Resumable', label: 'Every step' },
      { value: 'Locale-safe', label: 'DOM structure' },
    ],
  },
];

function renderChapter(ch, themeName) {
  const t = THEMES[themeName];
  const badgeWidth = Math.max(112, Math.round(ch.status.length * 6.4 + 20));
  const categoryX = 52 + badgeWidth + 14;
  const colPositions = [510, 616, 722];

  const highlightNodes = ch.highlights
    .map((h, idx) => {
      const x = colPositions[idx];
      return `  <text x="${x}" y="72" font-family="${FONTS.mono}" font-size="11.2" font-weight="600" fill="${t.accent}">${esc(h.value)}</text>
  <text x="${x}" y="91" font-family="${FONTS.sans}" font-size="10.5" fill="${t.muted}">${esc(h.label)}</text>`;
    })
    .join('\n');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="840" height="118" viewBox="0 0 840 118" role="img" aria-label="${esc(ch.title)} — ${esc(ch.category)}">
  <defs>
    <linearGradient id="ch-bg-${ch.fileIndex}-${themeName}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${t.bgStart}"/>
      <stop offset="100%" stop-color="${t.bgEnd}"/>
    </linearGradient>
    <clipPath id="ch-clip-${ch.fileIndex}-${themeName}">
      <rect x="0.5" y="0.5" width="839" height="117" rx="12"/>
    </clipPath>
  </defs>

  <g clip-path="url(#ch-clip-${ch.fileIndex}-${themeName})">
    <rect x="0" y="0" width="840" height="118" fill="url(#ch-bg-${ch.fileIndex}-${themeName})"/>
  </g>
  <rect x="0.5" y="0.5" width="839" height="117" rx="12" fill="none" stroke="${t.border}" stroke-width="1"/>

  <!-- Top metadata bar -->
  <text x="26" y="29" font-family="${FONTS.mono}" font-size="11.5" font-weight="600" fill="${t.accent}" letter-spacing="0.8">${esc(ch.index)}</text>
  <rect x="52" y="15" width="${badgeWidth}" height="20" rx="10" fill="${t.pillBg}" stroke="${t.pillBorder}" stroke-width="0.8"/>
  <text x="${52 + badgeWidth / 2}" y="28.5" text-anchor="middle" font-family="${FONTS.mono}" font-size="9.2" font-weight="600" fill="${t.pillText}" letter-spacing="0.5">${esc(ch.status)}</text>
  <text x="${categoryX}" y="28.5" font-family="${FONTS.mono}" font-size="10" fill="${t.muted}" letter-spacing="0.8">${esc(ch.category)}</text>
  <text x="814" y="28.5" text-anchor="end" font-family="${FONTS.mono}" font-size="9.5" fill="${t.muted}" letter-spacing="0.7">PRIVATE SOURCE</text>

  <line x1="26" y1="43" x2="814" y2="43" stroke="${t.divider}" stroke-width="1"/>

  <!-- Title + 1-line pitch -->
  <text x="26" y="72" font-family="${FONTS.serif}" font-size="22.5" font-weight="400" fill="${t.ink}" letter-spacing="-0.4">${esc(ch.title)}</text>
  <text x="26" y="95" font-family="${FONTS.sans}" font-size="12" fill="${t.ink2}">${esc(ch.pitch)}</text>

  <!-- Vertical divider + 3-column invariant strip -->
  <line x1="494" y1="54" x2="494" y2="102" stroke="${t.divider}" stroke-width="1"/>
${highlightNodes}
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
  for (const ch of CHAPTERS) {
    writeSvg(`chapter-${ch.fileIndex}-${themeName}.svg`, renderChapter(ch, themeName));
  }
  writeSvg(`stack-${themeName}.svg`, renderStack(themeName));
  writeSvg(`footer-${themeName}.svg`, renderFooter(themeName));
}

console.log('Generated SVGs in', ASSETS_DIR);
