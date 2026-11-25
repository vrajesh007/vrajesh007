import { execFileSync } from 'node:child_process';
import { mkdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const ASSETS = join(ROOT, 'assets');
const DEMOS = '/Users/vrajesh/portfolio/public/demos';
const SCREENSHOT_MTJ = '/Users/vrajesh/portfolio/src/assets/may-the-job-be-with-you/1.png';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const TMP = '/tmp/vrajesh007-demos';

mkdirSync(ASSETS, { recursive: true });
rmSync(TMP, { recursive: true, force: true });
mkdirSync(TMP, { recursive: true });

function run(cmd, args) {
  execFileSync(cmd, args, { stdio: 'pipe' });
}

function renderStagePng(html, width, height, outPng, transparent = false) {
  const htmlPath = join(TMP, 'stage.html');
  writeFileSync(htmlPath, html, 'utf8');
  const args = [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    ...(transparent ? ['--default-background-color=00000000'] : []),
    `--window-size=${width},${height}`,
    `--screenshot=${outPng}`,
    `file://${htmlPath}`,
  ];
  run(CHROME, args);
}

function makeRoundedMask(width, height, radius, outPng) {
  run('magick', [
    '-size',
    `${width}x${height}`,
    'xc:black',
    '-fill',
    'white',
    '-draw',
    `roundrectangle 0,0,${width - 1},${height - 1},${radius},${radius}`,
    outPng,
  ]);
}

function makeCircleMask(size, outPng) {
  const c = size / 2;
  run('magick', [
    '-size',
    `${size}x${size}`,
    'xc:black',
    '-fill',
    'white',
    '-draw',
    `circle ${c},${c} ${c},0.5`,
    outPng,
  ]);
}

function encodeGifFromVideo(inputMov, outGif, attempts) {
  const rawGif = join(TMP, 'raw.gif');
  for (const { fps, colors } of attempts) {
    const palette = join(TMP, 'palette.png');
    run('ffmpeg', [
      '-y',
      '-i',
      inputMov,
      '-vf',
      `fps=${fps},palettegen=max_colors=${colors}:stats_mode=diff:reserve_transparent=1`,
      palette,
    ]);
    run('ffmpeg', [
      '-y',
      '-i',
      inputMov,
      '-i',
      palette,
      '-lavfi',
      `fps=${fps}[x];[x][1:v]paletteuse=dither=bayer:bayer_scale=3:diff_mode=rectangle:alpha_threshold=128`,
      '-loop',
      '0',
      rawGif,
    ]);
    run('magick', [rawGif, '-layers', 'Optimize', outGif]);
    const mb = statSync(outGif).size / (1024 * 1024);
    console.log(`  encoded ${outGif} @ ${fps}fps, ${colors} colors -> ${mb.toFixed(2)} MB`);
    if (mb <= 3.1) return;
  }
}

/* =========================================================================
   01. Audio Rewind (800 x 390) — Watch + Phone side-by-side
   ========================================================================= */
function buildAudioRewind() {
  console.log('Building demo-audio-rewind.gif...');
  const W = 800;
  const H = 390;
  const bgPng = join(TMP, 'ar-bg.png');
  const fgPng = join(TMP, 'ar-fg.png');
  const watchMask = join(TMP, 'ar-watch-mask.png');
  const phoneMask = join(TMP, 'ar-phone-mask.png');
  const compMov = join(TMP, 'ar-comp.mov');

  renderStagePng(
    `<!doctype html><html><body style="margin:0;width:${W}px;height:${H}px;overflow:hidden;background:transparent;">
      <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
        <defs>
          <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#14120F"/><stop offset="100%" stop-color="#0B0A08"/>
          </linearGradient>
          <radialGradient id="glow" cx="0.16" cy="0.18" r="0.65">
            <stop offset="0%" stop-color="#D4A359" stop-opacity="0.14"/>
            <stop offset="100%" stop-color="#D4A359" stop-opacity="0"/>
          </radialGradient>
          <radialGradient id="watchBezel" cx="0.35" cy="0.3" r="0.7">
            <stop offset="0%" stop-color="#5E4C2F"/><stop offset="65%" stop-color="#2F2617"/><stop offset="100%" stop-color="#151108"/>
          </radialGradient>
          <linearGradient id="phoneBezel" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#2F3330"/><stop offset="50%" stop-color="#181A18"/><stop offset="100%" stop-color="#0E0F0E"/>
          </linearGradient>
          <linearGradient id="strap" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#252A26"/><stop offset="100%" stop-color="#161916"/>
          </linearGradient>
        </defs>
        <rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" rx="14" fill="url(#bg)" stroke="#2C2822"/>
        <rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" rx="14" fill="url(#glow)"/>

        <!-- Watch straps, crown & button -->
        <rect x="178" y="34" width="92" height="42" rx="10" fill="url(#strap)" stroke="rgba(224,168,60,0.2)"/>
        <rect x="178" y="272" width="92" height="42" rx="10" fill="url(#strap)" stroke="rgba(224,168,60,0.2)"/>
        <rect x="334" y="156" width="12" height="36" rx="5" fill="#5A492C" stroke="#241D11"/>
        <rect x="320" y="102" width="6" height="20" rx="3" transform="rotate(36 323 112)" fill="#4D3E25"/>
        <!-- Watch circular bezel -->
        <circle cx="224" cy="174" r="114" fill="url(#watchBezel)" stroke="rgba(224,168,60,0.34)" stroke-width="1.2"/>
        <circle cx="224" cy="174" r="103" fill="#050505"/>

        <!-- Phone side keys & titanium frame -->
        <rect x="650" y="96" width="4" height="30" rx="2" fill="#323532"/>
        <rect x="650" y="138" width="4" height="56" rx="2" fill="#323532"/>
        <rect x="501" y="25" width="150" height="298" rx="24" fill="url(#phoneBezel)" stroke="rgba(255,255,255,0.16)" stroke-width="1"/>
        <rect x="556" y="28.5" width="40" height="2.5" rx="1.25" fill="#070807"/>
        <rect x="509" y="33" width="134" height="282" rx="18" fill="#050505"/>

        <!-- Bottom hardware labels -->
        <text x="224" y="362" text-anchor="middle" font-family="'SFMono-Regular',Consolas,Menlo,monospace" font-size="10.5" fill="#9E9586" letter-spacing="0.9">PIXEL WATCH 4 (45MM) · WEAR OS</text>
        <text x="576" y="362" text-anchor="middle" font-family="'SFMono-Regular',Consolas,Menlo,monospace" font-size="10.5" fill="#9E9586" letter-spacing="0.9">PIXEL 10 PRO · ANDROID COMPANION</text>
      </svg>
    </body></html>`,
    W,
    H,
    bgPng,
    true,
  );

  renderStagePng(
    `<!doctype html><html><body style="margin:0;width:${W}px;height:${H}px;overflow:hidden;background:transparent;">
      <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
        <circle cx="576" cy="42" r="3.6" fill="#08090C" stroke="rgba(255,255,255,0.12)" stroke-width="0.6"/>
        <circle cx="224" cy="174" r="102" fill="none" stroke="rgba(255,255,255,0.14)" stroke-width="1"/>
      </svg>
    </body></html>`,
    W,
    H,
    fgPng,
    true,
  );

  makeCircleMask(204, watchMask);
  makeRoundedMask(134, 282, 18, phoneMask);

  run('ffmpeg', [
    '-y',
    '-loop', '1', '-t', '12', '-i', bgPng,
    '-ss', '4', '-t', '18', '-i', join(DEMOS, 'audio-rewind-watch.mp4'),
    '-ss', '8', '-t', '24', '-i', join(DEMOS, 'audio-rewind-phone.mp4'),
    '-loop', '1', '-t', '12', '-i', watchMask,
    '-loop', '1', '-t', '12', '-i', phoneMask,
    '-loop', '1', '-t', '12', '-i', fgPng,
    '-filter_complex',
    [
      '[1:v]setpts=PTS/1.5,fps=10,scale=204:204,format=rgba[w]',
      '[3:v]format=gray[wm]',
      '[w][wm]alphamerge[wc]',
      '[2:v]setpts=PTS/2.0,fps=10,scale=134:282,format=rgba[p]',
      '[4:v]format=gray[pm]',
      '[p][pm]alphamerge[pc]',
      '[0:v]format=rgba[b]',
      '[b][wc]overlay=122:72:shortest=1[s1]',
      '[s1][pc]overlay=509:33:shortest=1[s2]',
      '[s2][5:v]overlay=0:0:shortest=1,tpad=stop_mode=clone:stop_duration=1.5,format=rgba[out]',
    ].join(';'),
    '-map', '[out]',
    '-c:v', 'png',
    compMov,
  ]);

  encodeGifFromVideo(compMov, join(ASSETS, 'demo-audio-rewind.gif'), [
    { fps: 8, colors: 192 },
    { fps: 7, colors: 160 },
    { fps: 6, colors: 128 },
  ]);
}

/* =========================================================================
   02 & 04. Studio Browser Stage (780 x 456)
   ========================================================================= */
function buildBrowserStage({ name, inputFile, ss, duration, speed, caption, outGif }) {
  console.log(`Building ${name}...`);
  const W = 780;
  const H = 456;
  const SW = 748;
  const SH = 420;
  const bgPng = join(TMP, `${name}-bg.png`);
  const maskPng = join(TMP, `${name}-mask.png`);
  const compMov = join(TMP, `${name}-comp.mov`);

  renderStagePng(
    `<!doctype html><html><body style="margin:0;width:${W}px;height:${H}px;overflow:hidden;background:transparent;">
      <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
        <defs>
          <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#1A1713"/><stop offset="100%" stop-color="#0B0A08"/>
          </linearGradient>
        </defs>
        <rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" rx="14" fill="url(#bg)" stroke="#2C2822"/>
        <rect x="16" y="12" width="${SW}" height="${SH}" rx="10" fill="#070706" stroke="rgba(255,255,255,0.1)"/>
        <text x="${W / 2}" y="446" text-anchor="middle" font-family="'SFMono-Regular',Consolas,Menlo,monospace" font-size="10.2" fill="#9E9586" letter-spacing="0.9">${caption}</text>
      </svg>
    </body></html>`,
    W,
    H,
    bgPng,
    true,
  );

  makeRoundedMask(SW, SH, 10, maskPng);
  const targetLen = (duration / speed).toFixed(2);

  run('ffmpeg', [
    '-y',
    '-loop', '1', '-t', targetLen, '-i', bgPng,
    '-ss', String(ss), '-t', String(duration), '-i', join(DEMOS, inputFile),
    '-loop', '1', '-t', targetLen, '-i', maskPng,
    '-filter_complex',
    [
      `[1:v]setpts=PTS/${speed},fps=8,scale=${SW}:${SH}:flags=lanczos,format=rgba[v]`,
      '[2:v]format=gray[m]',
      '[v][m]alphamerge[vc]',
      '[0:v]format=rgba[b]',
      '[b][vc]overlay=16:12:shortest=1,tpad=stop_mode=clone:stop_duration=1.5,format=rgba[out]',
    ].join(';'),
    '-map', '[out]',
    '-c:v', 'png',
    compMov,
  ]);

  encodeGifFromVideo(compMov, join(ASSETS, outGif), [
    { fps: 7, colors: 192 },
    { fps: 6, colors: 160 },
    { fps: 5, colors: 128 },
  ]);
}

/* =========================================================================
   03. May The Job Be With You (800 x 420) — Side Panel + LinkedIn Companion
   ========================================================================= */
function buildMayTheJob() {
  console.log('Building demo-may-the-job.gif...');
  const W = 800;
  const H = 420;
  const bgPng = join(TMP, 'mtj-bg.png');
  const spMask = join(TMP, 'mtj-sp-mask.png');
  const shotMask = join(TMP, 'mtj-shot-mask.png');
  const compMov = join(TMP, 'mtj-comp.mov');

  renderStagePng(
    `<!doctype html><html><body style="margin:0;width:${W}px;height:${H}px;overflow:hidden;background:transparent;">
      <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
        <defs>
          <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#14120F"/><stop offset="100%" stop-color="#0B0A08"/>
          </linearGradient>
        </defs>
        <rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" rx="14" fill="url(#bg)" stroke="#2C2822"/>

        <!-- Left Chrome Side Panel frame -->
        <rect x="18" y="14" width="172" height="384" rx="14" fill="#1A1B1E" stroke="rgba(255,255,255,0.14)"/>
        <circle cx="30" cy="28" r="3.5" fill="#22C55E"/>
        <text x="39" y="31.5" font-family="'SFMono-Regular',Consolas,Menlo,monospace" font-size="8.2" fill="#B8B1A4" letter-spacing="0.4">SIDE PANEL · LOCAL-FIRST</text>
        <rect x="26" y="42" width="156" height="348" rx="8" fill="#141416"/>

        <!-- Right LinkedIn companion frame -->
        <rect x="202" y="14" width="584" height="368" rx="12" fill="#181A1C" stroke="rgba(255,255,255,0.14)"/>
        <rect x="206" y="18" width="576" height="360" rx="8" fill="#0B0B0C"/>
        <text x="494" y="401" text-anchor="middle" font-family="'SFMono-Regular',Consolas,Menlo,monospace" font-size="10.2" fill="#9E9586" letter-spacing="0.8">SIDE PANEL RUNNING BESIDE LIVE LINKEDIN EASY APPLY FORM</text>
      </svg>
    </body></html>`,
    W,
    H,
    bgPng,
    true,
  );

  makeRoundedMask(156, 348, 8, spMask);
  makeRoundedMask(576, 360, 8, shotMask);

  run('ffmpeg', [
    '-y',
    '-loop', '1', '-t', '12', '-i', bgPng,
    '-ss', '12', '-t', '24', '-i', join(DEMOS, 'may-the-job-demo.mp4'),
    '-loop', '1', '-t', '12', '-i', SCREENSHOT_MTJ,
    '-loop', '1', '-t', '12', '-i', spMask,
    '-loop', '1', '-t', '12', '-i', shotMask,
    '-filter_complex',
    [
      '[1:v]crop=270:599:534:72,setpts=PTS/2.0,fps=10,scale=156:348:flags=lanczos,format=rgba[sp]',
      '[3:v]format=gray[spm]',
      '[sp][spm]alphamerge[spc]',
      '[2:v]scale=576:360:flags=lanczos,format=rgba[sh]',
      '[4:v]format=gray[shm]',
      '[sh][shm]alphamerge[shc]',
      '[0:v]format=rgba[b]',
      '[b][spc]overlay=26:42:shortest=1[s1]',
      '[s1][shc]overlay=206:18:shortest=1,tpad=stop_mode=clone:stop_duration=1.5,format=rgba[out]',
    ].join(';'),
    '-map', '[out]',
    '-c:v', 'png',
    compMov,
  ]);

  encodeGifFromVideo(compMov, join(ASSETS, 'demo-may-the-job.gif'), [
    { fps: 8, colors: 192 },
    { fps: 7, colors: 160 },
    { fps: 6, colors: 128 },
  ]);
}

buildAudioRewind();
buildBrowserStage({
  name: 'gphotos',
  inputFile: 'gphotos-unleashed-demo.mp4',
  ss: 56,
  duration: 30,
  speed: 2.5,
  caption: 'GOOGLE PHOTOS · MV3 SIDE PANEL — PREVIEW, CONFIRM, VERIFY',
  outGif: 'demo-gphotos-unleashed.gif',
});
buildMayTheJob();
buildBrowserStage({
  name: 'bulk-unsaver',
  inputFile: 'bulk-unsaver-demo.mp4',
  ss: 26,
  duration: 28,
  speed: 2.33,
  caption: 'INSTAGRAM SAVED · MV3 SIDE PANEL — SEQUENTIAL, RESUMABLE RUN',
  outGif: 'demo-bulk-unsaver.gif',
});

rmSync(TMP, { recursive: true, force: true });
console.log('Done building all 4 polished demo GIFs.');
