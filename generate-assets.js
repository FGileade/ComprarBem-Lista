const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const pngToIco = require('png-to-ico').default || require('png-to-ico');

// Ensure output directories exist
const dirs = [
  'assets',
  'assets/svg',
  'assets/icons',
  'assets/logos',
  'assets/social',
  'assets/splash',
  'assets/jpg'
];

dirs.forEach(d => {
  const dirPath = path.join(__dirname, d);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
});

// Primary Brand Colors
const COLORS = {
  darkGreen: '#1F5A42',
  mainGreen: '#2F7D5A',
  lightGreen: '#DDF2E7',
  accentYellow: '#E7A93B',
  bgLight: '#F7F9F6',
  textDark: '#20302A',
  textMuted: '#667085',
  white: '#FFFFFF',
  black: '#111827',
  gray: '#64748B',
  grayLight: '#E2E8F0'
};

// Reusable SVG Symbol Builder
function getSymbolSvg(strokeColor = '#FFFFFF', leafColor = '#E7A93B', checkColor = strokeColor, size = 200) {
  return `
    <g class="cb-symbol">
      <!-- Handle -->
      <path d="M 68 86 V 56 C 68 38, 132 38, 132 56 V 86" 
            fill="none" 
            stroke="${strokeColor}" 
            stroke-width="14" 
            stroke-linecap="round" />
      
      <!-- Leaf Accent on Shoulder -->
      <path d="M 132 56 C 138 38, 162 38, 162 58 C 162 74, 142 78, 132 56 Z" 
            fill="${leafColor}" />
      
      <!-- Basket / Bag Body -->
      <rect x="42" y="86" width="116" height="90" rx="26" ry="26" 
            fill="none" 
            stroke="${strokeColor}" 
            stroke-width="14" />
      
      <!-- Checklist / Checkmark -->
      <path d="M 74 130 L 92 148 L 126 110" 
            fill="none" 
            stroke="${checkColor}" 
            stroke-width="14" 
            stroke-linecap="round" 
            stroke-linejoin="round" />
    </g>
  `;
}

// 1. Simbolo Isolado (SVG)
const simboloSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <style>
      .cb-symbol { transform-origin: center; }
    </style>
  </defs>
  ${getSymbolSvg(COLORS.mainGreen, COLORS.accentYellow, COLORS.mainGreen)}
</svg>`;

// 2. Simbolo PWA Quadrado com Cantos Arredondados (Maskable / App Icon)
const simboloPwaQuadradoSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect width="512" height="512" rx="128" ry="128" fill="${COLORS.darkGreen}" />
  <g transform="translate(106, 106) scale(1.5)">
    ${getSymbolSvg(COLORS.white, COLORS.accentYellow, COLORS.white)}
  </g>
</svg>`;

// 2b. Simbolo PWA Quadrado Puro (para Safe Area Maskable 512x512)
const simboloPwaMaskableSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect width="512" height="512" fill="${COLORS.darkGreen}" />
  <g transform="translate(131, 131) scale(1.25)">
    ${getSymbolSvg(COLORS.white, COLORS.accentYellow, COLORS.white)}
  </g>
</svg>`;

// 3. Simbolo PWA Circular (Avatar / Redes Sociais)
const simboloPwaCircularSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <circle cx="256" cy="256" r="256" fill="${COLORS.white}" />
  <circle cx="256" cy="256" r="248" fill="none" stroke="${COLORS.lightGreen}" stroke-width="8" />
  <g transform="translate(106, 106) scale(1.5)">
    ${getSymbolSvg(COLORS.darkGreen, COLORS.accentYellow, COLORS.darkGreen)}
  </g>
</svg>`;

// 4. Favicon SVG (Alta simplificação para 16px - 48px)
const faviconSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect width="64" height="64" rx="16" fill="${COLORS.mainGreen}" />
  <g transform="translate(6, 6) scale(0.26)">
    ${getSymbolSvg(COLORS.white, COLORS.accentYellow, COLORS.white)}
  </g>
</svg>`;

// 5. Logotipo Horizontal Principal com Slogan
const logoHorizontalSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 180" width="760" height="180">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@600;700;800;900&amp;display=swap');
      .font-brand { font-family: 'Nunito', system-ui, -apple-system, BlinkMacSystemFont, sans-serif; }
    </style>
  </defs>
  <!-- Símbolo -->
  <g transform="translate(20, 10) scale(0.88)">
    <rect width="180" height="180" rx="44" fill="${COLORS.darkGreen}" />
    <g transform="translate(15, 15) scale(0.75)">
      ${getSymbolSvg(COLORS.white, COLORS.accentYellow, COLORS.white)}
    </g>
  </g>
  <!-- Tipografia -->
  <g transform="translate(210, 84)">
    <text class="font-brand" font-size="52" font-weight="700" fill="${COLORS.textDark}" letter-spacing="-0.5">Compra<tspan font-weight="900" fill="${COLORS.mainGreen}">Bem</tspan></text>
  </g>
  <g transform="translate(212, 126)">
    <text class="font-brand" font-size="20" font-weight="600" fill="${COLORS.textMuted}" letter-spacing="0.2">Sua orientação aplicada às compras.</text>
  </g>
</svg>`;

// 6. Logotipo Horizontal Sem Slogan (Navbar)
const logoHorizontalSemSloganSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 140" width="540" height="140">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@600;700;800;900&amp;display=swap');
      .font-brand { font-family: 'Nunito', system-ui, -apple-system, BlinkMacSystemFont, sans-serif; }
    </style>
  </defs>
  <!-- Símbolo -->
  <g transform="translate(16, 12) scale(0.65)">
    <rect width="180" height="180" rx="44" fill="${COLORS.darkGreen}" />
    <g transform="translate(15, 15) scale(0.75)">
      ${getSymbolSvg(COLORS.white, COLORS.accentYellow, COLORS.white)}
    </g>
  </g>
  <!-- Tipografia -->
  <g transform="translate(156, 84)">
    <text class="font-brand" font-size="48" font-weight="700" fill="${COLORS.textDark}" letter-spacing="-0.5">Compra<tspan font-weight="900" fill="${COLORS.mainGreen}">Bem</tspan></text>
  </g>
</svg>`;

// 7. Logotipo Lockup "CompraBem Lista"
const logoCompraBemListaSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 780 200" width="780" height="200">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@600;700;800;900&amp;display=swap');
      .font-brand { font-family: 'Nunito', system-ui, -apple-system, BlinkMacSystemFont, sans-serif; }
    </style>
  </defs>
  <!-- Símbolo -->
  <g transform="translate(20, 20) scale(0.88)">
    <rect width="180" height="180" rx="44" fill="${COLORS.darkGreen}" />
    <g transform="translate(15, 15) scale(0.75)">
      ${getSymbolSvg(COLORS.white, COLORS.accentYellow, COLORS.white)}
    </g>
  </g>
  <!-- Tipografia -->
  <g transform="translate(210, 88)">
    <text class="font-brand" font-size="52" font-weight="700" fill="${COLORS.textDark}" letter-spacing="-0.5">Compra<tspan font-weight="900" fill="${COLORS.mainGreen}">Bem</tspan></text>
  </g>
  <!-- Badge Lista -->
  <g transform="translate(520, 48)">
    <rect width="105" height="42" rx="12" fill="${COLORS.lightGreen}" />
    <text class="font-brand" x="52.5" y="27" text-anchor="middle" font-size="20" font-weight="800" fill="${COLORS.darkGreen}">LISTA</text>
  </g>
  <!-- Slogan -->
  <g transform="translate(212, 134)">
    <text class="font-brand" font-size="20" font-weight="600" fill="${COLORS.textMuted}" letter-spacing="0.2">Sua orientação aplicada às compras.</text>
  </g>
</svg>`;

// 8. Logotipo Vertical / Empilhado
const logoVerticalSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 420" width="400" height="420">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@600;700;800;900&amp;display=swap');
      .font-brand { font-family: 'Nunito', system-ui, -apple-system, BlinkMacSystemFont, sans-serif; }
    </style>
  </defs>
  <!-- Símbolo Centralizado -->
  <g transform="translate(120, 36) scale(0.88)">
    <rect width="180" height="180" rx="44" fill="${COLORS.darkGreen}" />
    <g transform="translate(15, 15) scale(0.75)">
      ${getSymbolSvg(COLORS.white, COLORS.accentYellow, COLORS.white)}
    </g>
  </g>
  <!-- Nome -->
  <g transform="translate(200, 268)">
    <text class="font-brand" text-anchor="middle" font-size="46" font-weight="700" fill="${COLORS.textDark}" letter-spacing="-0.5">Compra<tspan font-weight="900" fill="${COLORS.mainGreen}">Bem</tspan></text>
  </g>
  <!-- Subtítulo / Badge -->
  <g transform="translate(155, 296)">
    <rect width="90" height="30" rx="8" fill="${COLORS.lightGreen}" />
    <text class="font-brand" x="45" y="21" text-anchor="middle" font-size="16" font-weight="800" fill="${COLORS.darkGreen}">LISTA</text>
  </g>
  <!-- Slogan -->
  <g transform="translate(200, 368)">
    <text class="font-brand" text-anchor="middle" font-size="17" font-weight="600" fill="${COLORS.textMuted}">Sua orientação aplicada às compras.</text>
  </g>
</svg>`;

// 9. Logotipo Compacto
const logoCompactoSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 100" width="420" height="100">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@600;700;800;900&amp;display=swap');
      .font-brand { font-family: 'Nunito', system-ui, -apple-system, BlinkMacSystemFont, sans-serif; }
    </style>
  </defs>
  <g transform="translate(10, 10) scale(0.44)">
    <rect width="180" height="180" rx="44" fill="${COLORS.darkGreen}" />
    <g transform="translate(15, 15) scale(0.75)">
      ${getSymbolSvg(COLORS.white, COLORS.accentYellow, COLORS.white)}
    </g>
  </g>
  <g transform="translate(110, 60)">
    <text class="font-brand" font-size="38" font-weight="700" fill="${COLORS.textDark}">Compra<tspan font-weight="900" fill="${COLORS.mainGreen}">Bem</tspan></text>
  </g>
</svg>`;

// 10. Monocromático Preto
const logoMonoPretoSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 180" width="760" height="180">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@600;700;800;900&amp;display=swap');
      .font-brand { font-family: 'Nunito', system-ui, -apple-system, BlinkMacSystemFont, sans-serif; }
    </style>
  </defs>
  <g transform="translate(20, 10) scale(0.88)">
    <rect width="180" height="180" rx="44" fill="${COLORS.black}" />
    <g transform="translate(15, 15) scale(0.75)">
      ${getSymbolSvg(COLORS.white, COLORS.white, COLORS.white)}
    </g>
  </g>
  <g transform="translate(210, 84)">
    <text class="font-brand" font-size="52" font-weight="700" fill="${COLORS.black}" letter-spacing="-0.5">Compra<tspan font-weight="900" fill="${COLORS.black}">Bem</tspan></text>
  </g>
  <g transform="translate(212, 126)">
    <text class="font-brand" font-size="20" font-weight="600" fill="${COLORS.black}" letter-spacing="0.2">Sua orientação aplicada às compras.</text>
  </g>
</svg>`;

// 11. Monocromático Branco (Para fundos escuros)
const logoMonoBrancoSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 180" width="760" height="180">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@600;700;800;900&amp;display=swap');
      .font-brand { font-family: 'Nunito', system-ui, -apple-system, BlinkMacSystemFont, sans-serif; }
    </style>
  </defs>
  <g transform="translate(20, 10) scale(0.88)">
    <rect width="180" height="180" rx="44" fill="none" stroke="${COLORS.white}" stroke-width="8" />
    <g transform="translate(15, 15) scale(0.75)">
      ${getSymbolSvg(COLORS.white, COLORS.white, COLORS.white)}
    </g>
  </g>
  <g transform="translate(210, 84)">
    <text class="font-brand" font-size="52" font-weight="700" fill="${COLORS.white}" letter-spacing="-0.5">Compra<tspan font-weight="900" fill="${COLORS.white}">Bem</tspan></text>
  </g>
  <g transform="translate(212, 126)">
    <text class="font-brand" font-size="20" font-weight="600" fill="${COLORS.white}" opacity="0.85" letter-spacing="0.2">Sua orientação aplicada às compras.</text>
  </g>
</svg>`;

// 12. Monocromático Verde Único (#2F7D5A)
const logoMonoVerdeSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 180" width="760" height="180">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@600;700;800;900&amp;display=swap');
      .font-brand { font-family: 'Nunito', system-ui, -apple-system, BlinkMacSystemFont, sans-serif; }
    </style>
  </defs>
  <g transform="translate(20, 10) scale(0.88)">
    <rect width="180" height="180" rx="44" fill="${COLORS.mainGreen}" />
    <g transform="translate(15, 15) scale(0.75)">
      ${getSymbolSvg(COLORS.white, COLORS.white, COLORS.white)}
    </g>
  </g>
  <g transform="translate(210, 84)">
    <text class="font-brand" font-size="52" font-weight="700" fill="${COLORS.mainGreen}" letter-spacing="-0.5">Compra<tspan font-weight="900" fill="${COLORS.mainGreen}">Bem</tspan></text>
  </g>
  <g transform="translate(212, 126)">
    <text class="font-brand" font-size="20" font-weight="600" fill="${COLORS.mainGreen}" letter-spacing="0.2">Sua orientação aplicada às compras.</text>
  </g>
</svg>`;

// 13. Escala de Cinza
const logoEscalaCinzaSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 180" width="760" height="180">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@600;700;800;900&amp;display=swap');
      .font-brand { font-family: 'Nunito', system-ui, -apple-system, BlinkMacSystemFont, sans-serif; }
    </style>
  </defs>
  <g transform="translate(20, 10) scale(0.88)">
    <rect width="180" height="180" rx="44" fill="#334155" />
    <g transform="translate(15, 15) scale(0.75)">
      ${getSymbolSvg(COLORS.white, '#94A3B8', COLORS.white)}
    </g>
  </g>
  <g transform="translate(210, 84)">
    <text class="font-brand" font-size="52" font-weight="700" fill="#334155" letter-spacing="-0.5">Compra<tspan font-weight="900" fill="#1E293B">Bem</tspan></text>
  </g>
  <g transform="translate(212, 126)">
    <text class="font-brand" font-size="20" font-weight="600" fill="#64748B" letter-spacing="0.2">Sua orientação aplicada às compras.</text>
  </g>
</svg>`;

// 14. Splash Screen PWA Dark (Fundo Verde Escuro #1F5A42)
const splashDarkSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1920" width="1080" height="1920">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@600;700;800;900&amp;display=swap');
      .font-brand { font-family: 'Nunito', system-ui, -apple-system, BlinkMacSystemFont, sans-serif; }
    </style>
  </defs>
  <rect width="1080" height="1920" fill="${COLORS.darkGreen}" />
  <!-- Composição Centralizada -->
  <g transform="translate(390, 680) scale(1.5)">
    <rect width="200" height="200" rx="50" fill="${COLORS.mainGreen}" />
    <g transform="translate(10, 10) scale(0.9)">
      ${getSymbolSvg(COLORS.white, COLORS.accentYellow, COLORS.white)}
    </g>
  </g>
  <g transform="translate(540, 1080)">
    <text class="font-brand" text-anchor="middle" font-size="76" font-weight="700" fill="${COLORS.white}" letter-spacing="-1">Compra<tspan font-weight="900" fill="${COLORS.lightGreen}">Bem</tspan></text>
  </g>
  <g transform="translate(540, 1140)">
    <text class="font-brand" text-anchor="middle" font-size="34" font-weight="700" fill="${COLORS.accentYellow}" letter-spacing="3">LISTA</text>
  </g>
  <g transform="translate(480, 1180)">
    <rect width="120" height="4" rx="2" fill="${COLORS.accentYellow}" />
  </g>
  <g transform="translate(540, 1260)">
    <text class="font-brand" text-anchor="middle" font-size="28" font-weight="500" fill="${COLORS.lightGreen}" opacity="0.9">Sua orientação aplicada às compras.</text>
  </g>
</svg>`;

// 15. Splash Screen PWA Light (Fundo Claro #F7F9F6)
const splashLightSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1920" width="1080" height="1920">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@600;700;800;900&amp;display=swap');
      .font-brand { font-family: 'Nunito', system-ui, -apple-system, BlinkMacSystemFont, sans-serif; }
    </style>
  </defs>
  <rect width="1080" height="1920" fill="${COLORS.bgLight}" />
  <!-- Composição Centralizada -->
  <g transform="translate(390, 680) scale(1.5)">
    <rect width="200" height="200" rx="50" fill="${COLORS.darkGreen}" />
    <g transform="translate(10, 10) scale(0.9)">
      ${getSymbolSvg(COLORS.white, COLORS.accentYellow, COLORS.white)}
    </g>
  </g>
  <g transform="translate(540, 1080)">
    <text class="font-brand" text-anchor="middle" font-size="76" font-weight="700" fill="${COLORS.textDark}" letter-spacing="-1">Compra<tspan font-weight="900" fill="${COLORS.mainGreen}">Bem</tspan></text>
  </g>
  <g transform="translate(540, 1140)">
    <text class="font-brand" text-anchor="middle" font-size="34" font-weight="800" fill="${COLORS.darkGreen}" letter-spacing="3">LISTA</text>
  </g>
  <g transform="translate(480, 1180)">
    <rect width="120" height="4" rx="2" fill="${COLORS.accentYellow}" />
  </g>
  <g transform="translate(540, 1260)">
    <text class="font-brand" text-anchor="middle" font-size="28" font-weight="600" fill="${COLORS.textMuted}">Sua orientação aplicada às compras.</text>
  </g>
</svg>`;

// Map of SVGs to save
const svgFiles = {
  'assets/svg/simbolo.svg': simboloSvg,
  'assets/svg/simbolo-pwa-quadrado.svg': simboloPwaQuadradoSvg,
  'assets/svg/simbolo-pwa-maskable.svg': simboloPwaMaskableSvg,
  'assets/svg/simbolo-pwa-circular.svg': simboloPwaCircularSvg,
  'assets/svg/favicon.svg': faviconSvg,
  'assets/svg/logo-horizontal.svg': logoHorizontalSvg,
  'assets/svg/logo-horizontal-sem-slogan.svg': logoHorizontalSemSloganSvg,
  'assets/svg/logo-comprabem-lista.svg': logoCompraBemListaSvg,
  'assets/svg/logo-vertical.svg': logoVerticalSvg,
  'assets/svg/logo-compacto.svg': logoCompactoSvg,
  'assets/svg/logo-mono-preto.svg': logoMonoPretoSvg,
  'assets/svg/logo-mono-branco.svg': logoMonoBrancoSvg,
  'assets/svg/logo-mono-verde.svg': logoMonoVerdeSvg,
  'assets/svg/logo-escala-cinza.svg': logoEscalaCinzaSvg,
  'assets/svg/splash-dark.svg': splashDarkSvg,
  'assets/svg/splash-light.svg': splashLightSvg
};

// Write all SVGs
for (const [relPath, content] of Object.entries(svgFiles)) {
  fs.writeFileSync(path.join(__dirname, relPath), content.trim());
}
console.log('✓ All SVGs generated successfully.');

// Sizes required by prompt
const REQUIRED_SIZES = [
  16, 24, 32, 48, 64, 72, 96, 128, 144, 152, 180, 192, 256, 384, 512, 1024, 2048
];

async function generateRasters() {
  console.log('Generating raster files with Sharp...');

  // 1. Generate PWA App Icons (Square maskable & rounded)
  for (const size of REQUIRED_SIZES) {
    // Standard square app icon
    await sharp(Buffer.from(simboloPwaQuadradoSvg))
      .resize(size, size)
      .png({ quality: 100 })
      .toFile(path.join(__dirname, `assets/icons/icon-${size}x${size}.png`));

    // WebP version
    await sharp(Buffer.from(simboloPwaQuadradoSvg))
      .resize(size, size)
      .webp({ quality: 95 })
      .toFile(path.join(__dirname, `assets/icons/icon-${size}x${size}.webp`));

    // Maskable icon specifically for PWA
    if ([72, 96, 128, 144, 152, 192, 384, 512].includes(size)) {
      await sharp(Buffer.from(simboloPwaMaskableSvg))
        .resize(size, size)
        .png({ quality: 100 })
        .toFile(path.join(__dirname, `assets/icons/icon-maskable-${size}x${size}.png`));
    }

    // Circular avatar version
    await sharp(Buffer.from(simboloPwaCircularSvg))
      .resize(size, size)
      .png({ quality: 100 })
      .toFile(path.join(__dirname, `assets/social/avatar-circular-${size}x${size}.png`));
  }
  console.log('✓ App icons & avatars generated across all 17 required sizes.');

  // 2. Generate Favicon .ICO (16, 32, 48)
  const icoBuffers = [
    path.join(__dirname, 'assets/icons/icon-16x16.png'),
    path.join(__dirname, 'assets/icons/icon-32x32.png'),
    path.join(__dirname, 'assets/icons/icon-48x48.png')
  ];
  try {
    const ico = await pngToIco(icoBuffers);
    fs.writeFileSync(path.join(__dirname, 'assets/icons/favicon.ico'), ico);
    fs.writeFileSync(path.join(__dirname, 'favicon.ico'), ico); // Root favicon
    console.log('✓ Multi-resolution favicon.ico generated.');
  } catch (err) {
    console.warn('ICO generation notice:', err.message);
  }

  // 3. Logos in PNG, WebP, JPG
  const logoEntries = [
    { name: 'logo-horizontal', svg: logoHorizontalSvg, width: 760, height: 180 },
    { name: 'logo-horizontal-sem-slogan', svg: logoHorizontalSemSloganSvg, width: 540, height: 140 },
    { name: 'logo-comprabem-lista', svg: logoCompraBemListaSvg, width: 780, height: 200 },
    { name: 'logo-vertical', svg: logoVerticalSvg, width: 400, height: 420 },
    { name: 'logo-compacto', svg: logoCompactoSvg, width: 420, height: 100 },
    { name: 'logo-mono-preto', svg: logoMonoPretoSvg, width: 760, height: 180 },
    { name: 'logo-mono-branco', svg: logoMonoBrancoSvg, width: 760, height: 180 },
    { name: 'logo-mono-verde', svg: logoMonoVerdeSvg, width: 760, height: 180 },
    { name: 'logo-escala-cinza', svg: logoEscalaCinzaSvg, width: 760, height: 180 },
    { name: 'simbolo', svg: simboloSvg, width: 512, height: 512 }
  ];

  for (const item of logoEntries) {
    // 2x HiDPI PNG
    await sharp(Buffer.from(item.svg))
      .resize(item.width * 2, item.height * 2)
      .png({ quality: 100 })
      .toFile(path.join(__dirname, `assets/logos/${item.name}.png`));

    // WebP version
    await sharp(Buffer.from(item.svg))
      .resize(item.width * 2, item.height * 2)
      .webp({ quality: 95 })
      .toFile(path.join(__dirname, `assets/logos/${item.name}.webp`));

    // Solid JPG for presentations/headers (Light background)
    if (item.name !== 'logo-mono-branco') {
      await sharp(Buffer.from(item.svg))
        .flatten({ background: COLORS.bgLight })
        .resize(item.width * 2, item.height * 2)
        .jpeg({ quality: 95 })
        .toFile(path.join(__dirname, `assets/jpg/${item.name}-light.jpg`));
    }

    // Solid JPG on dark green background for white logo
    if (item.name === 'logo-mono-branco') {
      await sharp(Buffer.from(item.svg))
        .flatten({ background: COLORS.darkGreen })
        .resize(item.width * 2, item.height * 2)
        .jpeg({ quality: 95 })
        .toFile(path.join(__dirname, `assets/jpg/${item.name}-dark.jpg`));
    }
  }
  console.log('✓ All logo variants exported to PNG, WebP and JPG.');

  // 4. Social Media Pack
  // Cover Header: 1200 x 630 (OG Image / LinkedIn / Facebook)
  const socialCoverSvg = `<?xml version="1.0" encoding="UTF-8"?>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
    <defs>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@600;700;800;900&amp;display=swap');
        .font-brand { font-family: 'Nunito', system-ui, -apple-system, BlinkMacSystemFont, sans-serif; }
      </style>
    </defs>
    <rect width="1200" height="630" fill="${COLORS.darkGreen}" />
    <circle cx="1100" cy="100" r="300" fill="${COLORS.mainGreen}" opacity="0.25" />
    <circle cx="150" cy="550" r="250" fill="${COLORS.mainGreen}" opacity="0.15" />
    <g transform="translate(180, 180) scale(1.2)">
      <g transform="translate(0, 0) scale(0.9)">
        <rect width="180" height="180" rx="44" fill="${COLORS.mainGreen}" />
        <g transform="translate(15, 15) scale(0.75)">
          ${getSymbolSvg(COLORS.white, COLORS.accentYellow, COLORS.white)}
        </g>
      </g>
      <g transform="translate(200, 78)">
        <text class="font-brand" font-size="56" font-weight="700" fill="${COLORS.white}" letter-spacing="-0.5">Compra<tspan font-weight="900" fill="${COLORS.lightGreen}">Bem</tspan></text>
      </g>
      <g transform="translate(530, 42)">
        <rect width="115" height="44" rx="12" fill="${COLORS.lightGreen}" />
        <text class="font-brand" x="57.5" y="29" text-anchor="middle" font-size="22" font-weight="800" fill="${COLORS.darkGreen}">LISTA</text>
      </g>
      <g transform="translate(202, 126)">
        <text class="font-brand" font-size="24" font-weight="600" fill="${COLORS.lightGreen}" opacity="0.9">Sua orientação aplicada às compras.</text>
      </g>
    </g>
  </svg>`;

  await sharp(Buffer.from(socialCoverSvg))
    .resize(1200, 630)
    .png()
    .toFile(path.join(__dirname, 'assets/social/cover-horizontal-1200x630.png'));

  await sharp(Buffer.from(socialCoverSvg))
    .resize(1200, 630)
    .jpeg({ quality: 95 })
    .toFile(path.join(__dirname, 'assets/social/cover-horizontal-1200x630.jpg'));

  // Instagram Post Square 1080x1080
  const socialPostSquareSvg = `<?xml version="1.0" encoding="UTF-8"?>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1080" width="1080" height="1080">
    <defs>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@600;700;800;900&amp;display=swap');
        .font-brand { font-family: 'Nunito', system-ui, -apple-system, BlinkMacSystemFont, sans-serif; }
      </style>
    </defs>
    <rect width="1080" height="1080" fill="${COLORS.bgLight}" />
    <g transform="translate(390, 240) scale(1.5)">
      <rect width="200" height="200" rx="50" fill="${COLORS.darkGreen}" />
      <g transform="translate(10, 10) scale(0.9)">
        ${getSymbolSvg(COLORS.white, COLORS.accentYellow, COLORS.white)}
      </g>
    </g>
    <g transform="translate(540, 640)">
      <text class="font-brand" text-anchor="middle" font-size="76" font-weight="700" fill="${COLORS.textDark}">Compra<tspan font-weight="900" fill="${COLORS.mainGreen}">Bem</tspan></text>
    </g>
    <g transform="translate(540, 710)">
      <text class="font-brand" text-anchor="middle" font-size="36" font-weight="800" fill="${COLORS.darkGreen}" letter-spacing="3">LISTA</text>
    </g>
    <g transform="translate(480, 750)">
      <rect width="120" height="4" rx="2" fill="${COLORS.accentYellow}" />
    </g>
    <g transform="translate(540, 830)">
      <text class="font-brand" text-anchor="middle" font-size="32" font-weight="600" fill="${COLORS.textMuted}">Sua orientação aplicada às compras.</text>
    </g>
  </svg>`;

  await sharp(Buffer.from(socialPostSquareSvg))
    .resize(1080, 1080)
    .png()
    .toFile(path.join(__dirname, 'assets/social/post-quadrado-1080x1080.png'));

  // Stories 1080x1920
  await sharp(Buffer.from(splashDarkSvg))
    .resize(1080, 1920)
    .png()
    .toFile(path.join(__dirname, 'assets/social/stories-1080x1920.png'));

  // Splash Screens Mobile PNG
  await sharp(Buffer.from(splashDarkSvg))
    .resize(1080, 1920)
    .png()
    .toFile(path.join(__dirname, 'assets/splash/splash-dark-1080x1920.png'));

  await sharp(Buffer.from(splashLightSvg))
    .resize(1080, 1920)
    .png()
    .toFile(path.join(__dirname, 'assets/splash/splash-light-1080x1920.png'));

  console.log('✓ Social media and splash screens exported.');
}

generateRasters().then(() => {
  console.log('✨ All visual identity assets compiled successfully!');
}).catch(err => {
  console.error('Error compiling assets:', err);
});
