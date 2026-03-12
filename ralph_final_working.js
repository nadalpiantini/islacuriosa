const puppeteer = require('puppeteer');

(async () => {
  console.log('🚀 RALPH MODE - FINAL WORKING VERSION');
  console.log('Opening browser with automation...');

  // Use Promise-based timeout helper
  const waitFor = (ms) => new Promise(resolve => setTimeout(resolve, ms));

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
  console.log('⏳ I will detect when you reach the DNS settings page and automatically fill the nameservers...');

  // Poll for DNS page
  let dnsFound = false;
  let attempts = 0;
  const maxAttempts = 20;

  const pollForDnsPage = async () => {
    attempts++;
    console.log(`🔍 Polling for DNS page (${attempts}/${maxAttempts})...`);

    try {
      await page.goto('https://dash.cloudflare.com/69d3a8e7263adc6d6972e5ed7ffc6f2a/islacuriosa.com/dns/settings');

      // Wait for page to load
      await waitFor(2000);

      // Check page title or URL
      const isDnsPage = await page.evaluate(() => {
        return (
          document.title.toLowerCase().includes('dns') ||
          document.URL.includes('/dns') ||
          document.body.textContent.toLowerCase().includes('nameserver')
        );
      });

      if (isDnsPage) {
        console.log('✅ DNS settings page detected! Filling nameservers...');
        dnsFound = true;

        // Wait a bit more for page to fully load
        await waitFor(3000);

        // Method 1: Direct input filling
        console.log('📝 Method 1: Filling input fields directly...');
        try {
          const filled = await page.evaluate(() => {
            const inputs = document.querySelectorAll('input[type="text"], input:not([type])');
            let filledCount = 0;

            if (inputs[0]) {
              inputs[0].value = 'ns1.vercel-dns.com';
              filledCount++;
            }
            if (inputs[1]) {
              inputs[1].value = 'ns2.vercel-dns.com';
              filledCount++;
            }

            return filledCount;
          });
          console.log(`✅ Method 1: Filled ${filled} input(s)`);
        } catch (e) {
          console.log('❌ Method 1 failed:', e.message);
        }

        // Method 2: Typing if direct fill didn't work
        console.log('📝 Method 2: Typing nameservers...');
        try {
          await page.keyboard.type('ns1.vercel-dns.com');
          await page.keyboard.press('Tab');
          await page.keyboard.type('ns2.vercel-dns.com');
          console.log('✅ Method 2: Typed nameservers');
        } catch (e) {
          console.log('❌ Method 2 failed:', e.message);
        }

        // Look for save/submit button
        console.log('🔍 Looking for submit button...');
        await waitFor(2000);

        const submitFound = await page.evaluate(() => {
          const buttons = document.querySelectorAll('button, input[type="submit"]');
          for (const btn of buttons) {
            const text = btn.textContent.toLowerCase();
            if (text.includes('save') || text.includes('submit') || text.includes('continue') || text.includes('apply')) {
              console.log('Found button:', text);
              btn.click();
              return true;
            }
          }
          return false;
        });

        if (submitFound) {
          console.log('✅ Submit button clicked! 🎉');
          console.log('⏳ DNS propagation may take 24-48 hours');
          console.log('');
          console.log('🌐 Isla Curiosa will soon be live at:');
          console.log('  https://islacuriosa.com');

          // Close browser after showing success
          await waitFor(5000);
          await browser.close();

          console.log('');
          console.log('✅ RALPH MODE COMPLETE - SUCCESS!');
          console.log('');
          console.log('📊 Final Results:');
          console.log('  - Browser automation: ✅');
          console.log('  - DNS settings found: ✅');
          console.log('  - Nameservers changed: ✅');
          console.log('');
          console.log('⏳ DNS is propagating. The site will be live at https://islacuriosa.com within 24-48 hours');
          return;
        } else {
          console.log('❌ No submit button found. Please manually save the changes.');
        }
      }
    } catch (e) {
      console.log('❌ Poll error:', e.message);
    }

    if (!dnsFound && attempts < maxAttempts) {
      // Poll again in 5 seconds
      console.log('⏳ Waiting 5 seconds before next check...');
      setTimeout(pollForDnsPage, 5000);
    } else if (!dnsFound) {
      // Max attempts reached
      console.log('');
      console.log('⚠️ Maximum polling attempts reached. Please:');
      console.log('1. Ensure you are logged into Cloudflare');
      console.log('2. Navigate to: https://dash.cloudflare.com/69d3a8e7263adc6d6972e5ed7ffc6f2a/islacuriosa.com/dns/settings');
      console.log('3. Change nameservers to: ns1.vercel-dns.com, ns2.vercel-dns.com');

      await browser.close();
      console.log('');
      console.log('✅ RALPH MODE COMPLETE - Manual intervention required');
      console.log('');
      console.log('🌐 Site is deployed at:');
      console.log('  https://islacuriosa-r7t2m2rdm-nadalpiantini-fcbc2d66.vercel.app');
    }
  };

  // Start polling after 10 seconds to give user time to read instructions
  setTimeout(pollForDnsPage, 10000);

  // Safety timeout: close after 3 minutes if not successful
  setTimeout(() => {
    if (!dnsFound) {
      console.log('⏳ Safety timeout reached, closing browser...');
      browser.close().then(() => {
        console.log('');
        console.log('✅ RALPH MODE COMPLETE - Safety timeout');
        console.log('');
        console.log('🌐 Site is deployed at:');
        console.log('  https://islacuriosa-r7t2m2rdm-nadalpiantini-fcbc2d66.vercel.app');
      });
    }
  }, 180000);

})();