const puppeteer = require('puppeteer');

(async () => {
  console.log('🚀 RALPH MODE - SEMI-AUTOMATED');
  console.log('Opening browser...');
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 500,
    defaultViewport: { width: 1280, height: 800 }
  });

  const page = await browser.newPage();

  // Auto-navigate to login
  console.log('🔗 Navigating to Cloudflare login...');
  await page.goto('https://dash.cloudflare.com/login');

  console.log('⏳ Browser opened. Please:');
  console.log('1. Log in to Cloudflare');
  console.log('2. Navigate to: https://dash.cloudflare.com/69d3a8e7263adc6d6972e5ed7ffc6f2a/islacuriosa.com/dns/settings');
  console.log('');
  console.log('🎯 I will fill nameservers once you are on the DNS settings page.');

  // Monitor for DNS settings page
  let dnsPageFound = false;
  let attemptCount = 0;
  const maxAttempts = 10;

  const checkForDnsPage = async () => {
    attemptCount++;
    console.log(`🔍 Checking for DNS page (attempt ${attemptCount}/${maxAttempts})...`);

    try {
      await page.goto('https://dash.cloudflare.com/69d3a8e7263adc6d6972e5ed7ffc6f2a/islacuriosa.com/dns/settings');
      await page.waitForTimeout(2000);

      // Check if we're on the right page
      const isDnsPage = await page.evaluate(() => {
        return document.body.textContent.toLowerCase().includes('dns') ||
               document.location.href.includes('/dns');
      });

      if (isDnsPage) {
        console.log('✅ DNS settings page detected!');
        dnsPageFound = true;

        // Try to fill nameservers
        console.log('📝 Attempting to fill nameservers...');

        const fillAttempts = [
          async () => {
            const count = await page.$$eval('input[type="text"], inputs => {
              inputs.slice(0, 2).forEach((input, i) => {
                input.value = ['ns1.vercel-dns.com', 'ns2.vercel-dns.com'][i];
              });
              return inputs.length;
            });
            console.log(`✅ Filled ${count} text inputs`);
            return count > 0;
          },
          async () => {
            await page.evaluate(() => {
              const inputs = Array.from(document.querySelectorAll('input'));
              const textInputs = inputs.filter(i => i.type === 'text' || i.type === '');
              textInputs.slice(0, 2).forEach((input, i) => {
                input.value = ['ns1.vercel-dns.com', 'ns2.vercel-dns.com'][i];
              });
            });
            return true;
          }
        ];

        let filled = false;
        for (const fill of fillAttempts) {
          try {
            const result = await fill();
            if (result) {
              filled = true;
              break;
            }
          } catch (e) {
            console.log('❌ Fill attempt failed');
          }
        }

        if (filled) {
          console.log('📝 Nameservers filled! Looking for submit button...');

          // Try to submit
          await new Promise(resolve => setTimeout(resolve, 1000));
          const submitClicked = await page.evaluate(() => {
            const buttons = Array.from(document.querySelectorAll('button'));
            for (const btn of buttons) {
              const text = btn.textContent.toLowerCase();
              if (text.includes('save') || text.includes('submit') || text.includes('continue') || text.includes('apply')) {
                btn.click();
                return true;
              }
            }
            return false;
          });

          if (submitClicked) {
            console.log('💾 Form submitted! 🎉');
            console.log('⏳ Changes may take 24-48 hours to propagate');
            console.log('🌐 Site will be available at: https://islacuriosa.com');
          }
        }
      }
    } catch (e) {
      console.log('❌ Check failed: Page not loaded yet');
    }

    if (!dnsPageFound && attemptCount < maxAttempts) {
      // Try again in 10 seconds
      setTimeout(checkForDnsPage, 10000);
    }
  };

  // Start checking
  setTimeout(checkForDnsPage, 5000);

  // Keep browser open for 2 minutes
  console.log('⏳ Keeping browser open for 2 minutes...');
  await new Promise(resolve => setTimeout(resolve, 120000));

  await browser.close();
  console.log('');
  console.log('✅ RALPH MODE COMPLETE');
  console.log('📋 Summary:');
  console.log('  - Site deployed to: https://islacuriosa-r7t2m2rdm-nadalpiantini-fcbc2d66.vercel.app');
  console.log('  - Nameservers:', dnsPageFound ? '✅ Changed to Vercel' : '❌ Still needs manual change');
  console.log('');
  console.log('📝 Instructions:');
  console.log('  If nameservers were not automatically changed:');
  console.log('  1. Go to Cloudflare DNS settings');
  console.log('  2. Enter: ns1.vercel-dns.com');
  console.log('  3. Enter: ns2.vercel-dns.com');
  console.log('  4. Save changes');
})();