import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  page.on('console', (msg) => {
    console.log(`[PAGE LOG] ${msg.type().toUpperCase()}: ${msg.text()}`);
  });
  page.on('pageerror', (err) => {
    console.log(`[PAGE ERROR]: ${err.toString()}`);
  });
  page.on('requestfailed', (request) => {
    console.log(`[NETWORK ERROR] ${request.url()}: ${request.failure()?.errorText}`);
  });

  console.log("Navigating to http://localhost:4321...");
  await page.goto('http://localhost:4321', { waitUntil: 'networkidle2', timeout: 10000 }).catch(e => console.log("Navigation timeout"));

  await new Promise(r => setTimeout(r, 2000));
  
  // Click next button
  console.log("Clicking next button...");
  await page.evaluate(() => {
    const btn = document.getElementById('testimonial-next');
    if (btn) btn.click();
    else console.log("testimonial-next button not found!");
  });

  await new Promise(r => setTimeout(r, 1000));
  await browser.close();
  console.log("Done.");
})();
