// render.js <input.html> <outDir>/<slug>
// Produces <outDir>/desktop/<slug>.pdf (+ .png) and <outDir>/mobile/<slug>.pdf (+ .png)
// Single long page (no pagination) for mobile; A4 pagination for desktop.
const { chromium } = require('playwright-core');
const path = require('path');
const fs = require('fs');

const CHROME = process.env.CHROME_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';

async function renderVariant(browser, fileUrl, outPrefix, variant, widthPx, paginate) {
  const ctx = await browser.newContext({
    viewport: { width: widthPx, height: 1200 },
    deviceScaleFactor: 2,
  });
  const page = await ctx.newPage();
  await page.addInitScript((v) => { window.__VARIANT__ = v; }, variant);
  await page.goto(fileUrl, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate((v) => { document.documentElement.setAttribute('data-variant', v); }, variant);
  await page.waitForTimeout(150);

  // measure full content height at this width
  const height = await page.evaluate(() => {
    const el = document.querySelector('.page') || document.body;
    return Math.ceil(el.getBoundingClientRect().height);
  });

  // organize deliverables into per-variant folders: <outDir>/<variant>/<slug>.pdf
  const outDir = path.dirname(outPrefix);
  const slug = path.basename(outPrefix);
  const variantDir = path.join(outDir, variant);
  fs.mkdirSync(variantDir, { recursive: true });
  const pdfPath = path.join(variantDir, `${slug}.pdf`);

  if (paginate) {
    // Desktop: flow content across A4 pages -> stays crisp on desktop viewers.
    // Page numbers ("X / Y") in the bottom margin — desktop only (mobile is one long page).
    await page.emulateMedia({ media: 'print' });
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: '<div></div>',
      footerTemplate: '<div style="width:100%;font-size:9px;color:#9aa3af;text-align:center;font-family:Arial,Helvetica,sans-serif;"><span class="pageNumber"></span> / <span class="totalPages"></span></div>',
      margin: { top: '15mm', bottom: '15mm', left: '0', right: '0' },
    });
  } else {
    // Mobile: single long page (no pagination)
    await page.pdf({
      path: pdfPath,
      width: `${widthPx}px`,
      height: `${height}px`,
      printBackground: true,
      margin: { top: '0', bottom: '0', left: '0', right: '0' },
      pageRanges: '1',
    });
  }

  // optional full-page PNG preview (set RENDER_PNG=1) — for visual review, not a deliverable
  if (process.env.RENDER_PNG) {
    await page.emulateMedia({ media: 'screen' });
    await page.setViewportSize({ width: widthPx, height });
    await page.screenshot({ path: path.join(variantDir, `${slug}.png`), fullPage: true });
  }

  await ctx.close();
  return height;
}

(async () => {
  const [, , input, outPrefix] = process.argv;
  if (!input || !outPrefix) { console.error('usage: render.js <input.html> <outPrefix>'); process.exit(1); }
  const fileUrl = 'file://' + path.resolve(input);
  const browser = await chromium.launch({ executablePath: CHROME, args: ['--no-sandbox', '--disable-gpu'] });
  const d = await renderVariant(browser, fileUrl, outPrefix, 'desktop', 794, true);   // desktop -> A4 paginated (crisp)
  const m = await renderVariant(browser, fileUrl, outPrefix, 'mobile', 390, false);   // mobile -> single long page
  await browser.close();
  console.log(`OK ${path.basename(outPrefix)} | desktop ${d}px | mobile ${m}px`);
})().catch(e => { console.error(e); process.exit(1); });
