import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage();
const files = process.argv.slice(2);
for (const f of files) {
  await page.goto('file:///' + f.replace(/\/g, '/'));
  const dim = await page.evaluate(async () => {
    const img = document.querySelector('img');
    return img.naturalWidth + 'x' + img.naturalHeight;
  });
  console.log(f.split('/').pop(), dim);
}
await browser.close();
