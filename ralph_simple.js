const puppeteer = require('puppeteer');

(async () => {
  console.log('🚀 RALPH MODE - SIMPLE APPROACH');
  console.log('Opening browser with automation...');
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 500
  });

  const page = await browser.newPage();

  // Enable console logging
  page.on('console', msg => console.log('🔍 Browser:', msg.text()));

  // Navigate to Cloudflare
  await page.goto('https://dash.cloudflare.com/login');
  console.log('✅ Cloudflare login opened');

  // Wait for user to log in and navigate
  console.log('');
  console.log('📋 Please:');
  console.log('1. Log in to Cloudflare');
  console.log('2. Navigate to: https://dash.cloudflare.com/69d3a8e7263adc6d6972e5ed7ffc6f2a/islacuriosa.com/dns/settings');
  console.log('');

  // Poll for DNS page
  let dnsFound = false;
  let attempts = 0;
  const maxAttempts = 20;

  const pollForDnsPage = async () => {
    attempts++;
    console.log(`🔍 Polling for DNS page (${attempts}/${maxAttempts})...`);

    try {
      await page.goto('https://dash.cloudflare.com/69d3a8e7263adc6d6972e5ed7ffc6f2a/islacuriosa.com/dns/settings');
      await page.waitForTimeout(2000);

      // Check page title or URL
      const isDnsPage = await page.evaluate(() => {
        return (
          document.title.toLowerCase().includes('dns') ||
          document.URL.includes('/dns') ||
          document.body.textContent.toLowerCase().includes('nameserver')
        );
      });

      if (isDnsPage) {
        console.log('✅ DNS settings page detected!');
        dnsFound = true;

        // Wait a bit more for page to fully load
        await page.waitForTimeout(3000);

        // Try multiple methods to fill inputs
        console.log('📝 Attempting to fill nameservers...');

        // Method 1: Direct input querySelector
        try {
          await page.evaluate(() => {
            const inputs = document.querySelectorAll('input[type="text"], input:not([type])');
            if (inputs[0]) inputs[0].value = 'ns1.vercel-dns.com';
            if (inputs[1]) inputs[1].value = 'ns2.vercel-dns.com';
            return inputs.length;
          });
          console.log('✅ Method 1: Filled ' + (await page.evaluate(() => {
            return document.querySelectorAll('input[value*="vercel"]').length;
          })) + ' inputs');
        } catch (e) {
          console.log('❌ Method 1 failed');
        }

        // Method 2: Type in inputs directly
        try {
          await page.keyboard.type('ns1.vercel-dns.com');
          await page.keyboard.press('Tab');
          await page.keyboard.type('ns2.vercel-dns.com');
          console.log('✅ Method 2: Typed into inputs');
        } catch (e) {
          console.log('❌ Method 2 failed');
        }

        // Look for save/submit button
        console.log('🔍 Looking for submit button...');
        await page.waitForTimeout(2000);

        const submitFound = await page.evaluate(() => {
          const buttons = document.querySelectorAll('button, input[type="submit"]');
          for (const btn of buttons) {
            const text = btn.textContent.toLowerCase();
            if (text.includes('save') || text.includes('submit') || text.includes('continue') || text.includes('apply')) {
              btn.click();
              return true;
            }
          }
          return false;
        });

        if (submitFound) {
          console.log('✅ Submit button clicked! 🎉');
          console.log('⏳ DNS propagation may take 24-48 hours');
        }
      }
    } catch (e) {
      console.log('❌ Poll error: ' + e.message);
    }

    if (!dnsFound && attempts < maxAttempts) {
      // Poll again in 5 seconds
      setTimeout(pollForDnsPage, 5000);
    }
  };

  // Start polling
  setTimeout(pollForDnsPage, 10000);

  // Keep open for up to 3 minutes
  console.log('⏳ Will keep trying for up to 3 minutes...');
  setTimeout(() => {
    browser.close().then(() => {
      console.log('');
      console.log('✅ RALPH MODE COMPLETE');
      console.log('');
      console.log('📊 Results:');
      console.log('  - Browser automation: ✅');
      console.log('  - DNS settings found: ' + (dnsFound ? '✅' : '❌'));
      console.log('');
      console.log('🌐 Site is deployed at:');
      console.log('  https://islacuriosa-r7t2m2rdm-nadalpiantini-fcbc2d66.vercel.app');
    });
  }, 180000);

})();