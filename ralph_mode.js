const puppeteer = require('puppeteer');

(async () => {
  console.log('🚀 RALPH MODE ACTIVATED - FULL AUTOMATION');
  console.log('Opening browser...');
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1280, height: 800 }
  });

  const page = await browser.newPage();

  console.log('🔗 Navigating to Cloudflare...');
  await page.goto('https://dash.cloudflare.com/login');

  // Wait for login
  console.log('⏳ Waiting 30s for login...');
  await new Promise(resolve => setTimeout(resolve, 30000));

  console.log('🔍 Looking for islacuriosa.com...');
  try {
    // Direct navigation to domain DNS settings
    console.log('📍 Direct navigation to DNS settings...');
    await page.goto('https://dash.cloudflare.com/69d3a8e7263adc6d6972e5ed7ffc6f2a/islacuriosa.com/dns/settings');
    await new Promise(resolve => setTimeout(resolve, 3000));

    console.log('⚙️ Looking for nameserver options...');

    // Take screenshot to see current state
    await page.screenshot({ path: '/tmp/cloudflare_dns.png' });
    console.log('📸 Screenshot saved to /tmp/cloudflare_dns.png');

    // Look for any button or link that mentions nameservers
    const found = await page.evaluate(() => {
      const elements = Array.from(document.querySelectorAll('*'));
      const results = [];

      elements.forEach(el => {
        if (el.textContent) {
          const text = el.textContent.toLowerCase();
          if (text.includes('nameserver') ||
              text.includes('change nameservers') ||
              text.includes('custom nameservers') ||
              text.includes('transfer') ||
              text.includes('advanced')) {
            results.push({
              tag: el.tagName,
              text: el.textContent.trim().substring(0, 50),
              selector: el.className ? '.' + el.className.split(' ')[0] : null
            });
          }
        }
      });

      return results;
    });

    console.log('🔍 Found elements:', found);

    // Try to click on first relevant element
    if (found.length > 0) {
      for (const element of found) {
        try {
          if (element.tag === 'BUTTON' || element.tag === 'A') {
            console.log('🖱️  Clicking on:', element.text);
            await page.click(element.selector || 'button');
            await new Promise(resolve => setTimeout(resolve, 2000));
            break;
          }
        } catch (e) {
          console.log('Failed to click:', e.message);
        }
      }
    }

    // Look for input fields and fill them
    const inputsFilled = await page.evaluate(() => {
      const inputs = Array.from(document.querySelectorAll('input[type="text"], input:not([type])'));
      let filled = 0;

      if (inputs[0]) {
        inputs[0].value = 'ns1.vercel-dns.com';
        filled++;
      }
      if (inputs[1]) {
        inputs[1].value = 'ns2.vercel-dns.com';
        filled++;
      }

      return filled;
    });

    console.log(`✅ Filled ${inputsFilled} input fields with nameservers`);

    // Look for submit/save button
    await new Promise(resolve => setTimeout(resolve, 2000));
    const submitted = await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button[type="submit"], input[type="submit"]'));
      let clicked = false;

      buttons.forEach(btn => {
        if (!clicked) {
          btn.click();
          clicked = true;
        }
      });

      return clicked;
    });

    if (submitted) {
      console.log('💾 Submitted form!');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  }

  await new Promise(resolve => setTimeout(resolve, 10000));
  await browser.close();
  console.log('✅ RALPH MODE COMPLETE');
})();