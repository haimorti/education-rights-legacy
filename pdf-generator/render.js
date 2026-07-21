// render.js <input.html> <outDir>/<slug>
// Produces three deliverables per doc:
//   <outDir>/print/<slug>.pdf    — desktop styling, A4 paginated (for workers to print)
//   <outDir>/desktop/<slug>.pdf  — desktop styling, single long page (insured, on-screen, no page cuts)
//   <outDir>/mobile/<slug>.pdf   — mobile styling, single long page (insured, phone)
const { chromium } = require('playwright-core');
const path = require('path');
const fs = require('fs');

const CHROME = process.env.CHROME_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';

// variant = CSS styling key (data-variant: "desktop"|"mobile"); outName = output subfolder.
async function renderVariant(browser, fileUrl, outPrefix, variant, outName, widthPx, paginate) {
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

  // measure full content height at this width (screen media)
  const height = await page.evaluate(() => {
    const el = document.querySelector('.page') || document.body;
    return Math.ceil(el.getBoundingClientRect().height);
  });

  const outDir = path.dirname(outPrefix);
  const slug = path.basename(outPrefix);
  const variantDir = path.join(outDir, outName);
  fs.mkdirSync(variantDir, { recursive: true });
  const pdfPath = path.join(variantDir, `${slug}.pdf`);

  if (paginate) {
    // A4 pagination (print) — page numbers in the bottom margin.
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
    // Single long page (no pagination, no page cuts) — screen media.
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
  const pr = await renderVariant(browser, fileUrl, outPrefix, 'desktop', 'print',   794, true);   // A4 paginated -> workers/print
  const d  = await renderVariant(browser, fileUrl, outPrefix, 'desktop', 'desktop', 794, false);  // single long page -> insured desktop
  const m  = await renderVariant(browser, fileUrl, outPrefix, 'mobile',  'mobile',  320, false);  // single long page -> insured mobile
  await browser.close();
  console.log(`OK ${path.basename(outPrefix)} | print ${pr}px | desktop ${d}px | mobile ${m}px`);
})().catch(e => { console.error(e); process.exit(1); });
