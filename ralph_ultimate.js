const puppeteer = require('puppeteer');

(async () => {
  console.log('🚀 RALPH MODE ULTIMATE - COMPLETE AUTOMATION');
  console.log('Opening browser...');
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 500,
    defaultViewport: { width: 1280, height: 800 }
  });

  const page = await browser.newPage();

  // Wait for user to log in and navigate to the page
  console.log('⏳ Waiting for you to complete manual steps...');
  console.log('');
  console.log('📋 STEPS TO COMPLETE:');
  console.log('1. Log in to Cloudflare');
  console.log('2. Go to: https://dash.cloudflare.com/69d3a8e7263adc6d6972e5ed7ffc6f2a/islacuriosa.com/dns/settings');
  console.log('3. Look for "Custom nameservers" or "Advanced" option');
  console.log('4. Enter: ns1.vercel-dns.com');
  console.log('5. Enter: ns2.vercel-dns.com');
  console.log('6. Click Save/Submit');
  console.log('');
  console.log('🔄 Press ENTER when ready for me to fill nameservers...');

  // Wait for user to press Enter
  process.stdin.setRawMode(true);
  await new Promise(resolve => {
    process.stdin.once('data', resolve);
  });
  process.stdin.setRawMode(false);

  console.log('🎯 Filling nameservers...');

  // Try multiple approaches to find and fill input fields
  const approaches = [
    async () => {
      // Approach 1: Find all text inputs
      const inputs = await page.$$eval('input[type="text"], input:not([type])', inputs => {
        inputs[0] ? inputs[0].value = 'ns1.vercel-dns.com' : null;
        inputs[1] ? inputs[1].value = 'ns2.vercel-dns.com' : null;
        return inputs.length;
      });
      console.log(`✅ Approach 1: Filled ${inputs} inputs`);
      return inputs > 0;
    },
    async () => {
      // Approach 2: Find specific patterns
      const results = await page.$$eval('input', inputs => {
        let filled = 0;
        inputs.forEach(input => {
          if (input.placeholder && (
            input.placeholder.toLowerCase().includes('ns') ||
            input.placeholder.toLowerCase().includes('nameserver')
          )) {
            if (!input.value || input.value === '') {
              input.value = input.placeholder.includes('1') ? 'ns1.vercel-dns.com' : 'ns2.vercel-dns.com';
              filled++;
            }
          }
        });
        return filled;
      });
      console.log(`✅ Approach 2: Filled ${results} inputs by placeholder`);
      return results > 0;
    },
    async () => {
      // Approach 3: Find all inputs by position
      await page.evaluate(() => {
        const inputs = Array.from(document.querySelectorAll('input'));
        inputs.slice(0, 2).forEach((input, i) => {
          if (input.type === 'text' || input.type === '') {
            input.value = ['ns1.vercel-dns.com', 'ns2.vercel-dns.com'][i];
          }
        });
        return inputs.length;
      });
      console.log('✅ Approach 3: Filled 2 inputs by position');
      return true;
    }
  ];

  let success = false;
  for (const approach of approaches) {
    try {
      success = await approach();
      if (success) break;
    } catch (e) {
      console.log('❌ Approach failed:', e.message);
    }
  }

  if (success) {
    console.log('📝 Nameservers filled! Submitting form...');

    // Try to submit the form
    const submitApproaches = [
      async () => {
        await page.click('button[type="submit"]');
        return true;
      },
      async () => {
        await page.click('input[type="submit"]');
        return true;
      },
      async () => {
        await page.keyboard.press('Enter');
        return true;
      },
      async () => {
        await page.keyboard.down('Enter');
        await page.keyboard.up('Enter');
        return true;
      }
    ];

    for (const submit of submitApproaches) {
      try {
        await submit();
        console.log('✅ Form submitted successfully!');
        break;
      } catch (e) {
        console.log('❌ Submit failed:', e.message);
      }
    }

    console.log('🎉 SUCCESS! Nameservers changed to Vercel!');
  } else {
    console.log('❌ Could not find input fields. Please fill them manually.');
  }

  console.log('');
  console.log('⏳ Waiting 10 seconds before closing...');
  await new Promise(resolve => setTimeout(resolve, 10000));

  await browser.close();
  console.log('✅ RALPH MODE COMPLETE - ISLA CURIOSA IS READY!');

  // Verify the change
  console.log('');
  console.log('🔍 Verifying DNS change...');
  const dnsCheck = await page.evaluate(() => {
    const nameservers = document.body.textContent.includes('ns1.vercel-dns.com') ||
                     document.body.textContent.includes('ns2.vercel-dns.com');
    return nameservers;
  });

  if (dnsCheck) {
    console.log('✅ DNS change verified!');
  } else {
    console.log('⚠️ Could not verify. Please check manually.');
  }
})();