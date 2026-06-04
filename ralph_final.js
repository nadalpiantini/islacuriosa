const puppeteer = require('puppeteer');

(async () => {
  console.log('🚀 RALPH MODE FINAL ATTEMPT');
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1280, height: 800 }
  });

  const page = await browser.newPage();

  // Enable console logging
  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));

  console.log('🔗 Navigating to Cloudflare...');
  await page.goto('https://dash.cloudflare.com/login');

  // Wait for manual login
  console.log('⏳ PLEASE LOG IN MANUALLY. Browser will wait...');
  await page.waitForSelector('body', { timeout: 60000 });

  // Check if we're logged in
  const isLoggedIn = await page.evaluate(() => {
    return !document.querySelector('input[type="email"]');
  });

  if (!isLoggedIn) {
    console.log('❌ Not logged in. Please try again.');
    await browser.close();
    return;
  }

  console.log('✅ Logged in! Continuing...');

  // Try different URLs
  const urls = [
    'https://dash.cloudflare.com/69d3a8e7263adc6d6972e5ed7ffc6f2a/islacuriosa.com',
    'https://dash.cloudflare.com/69d3a8e7263adc6d6972e5ed7ffc6f2a/islacuriosa.com/dns',
    'https://dash.cloudflare.com/69d3a8e7263adc6d6972e5ed7ffc6f2a/islacuriosa.com/dns/settings',
    'https://dash.cloudflare.com/islacuriosa.com/dns/settings',
    'https://dash.cloudflare.com/islacuriosa.com/settings/dns'
  ];

  let dnsPageFound = false;
  for (const url of urls) {
    try {
      console.log(`📍 Trying URL: ${url}`);
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 10000 });
      dnsPageFound = true;
      break;
    } catch (e) {
      console.log(`URL failed: ${e.message}`);
    }
  }

  if (!dnsPageFound) {
    console.log('❌ Could not find DNS settings page');
    await browser.close();
    return;
  }

  console.log('✅ DNS settings page found!');

  // Look for all clickable elements
  const clickable = await page.evaluate(() => {
    const elements = Array.from(document.querySelectorAll('a, button, [onclick]'));
    return elements.map(el => ({
      tag: el.tagName,
      text: el.textContent?.trim().substring(0, 30),
      href: el.href,
      onclick: el.onclick ? 'has onclick' : null,
      className: el.className,
      id: el.id
    })).filter(el => el.text);
  });

  // Filter for relevant elements
  const relevant = clickable.filter(el =>
    el.text.toLowerCase().includes('nameserver') ||
    el.text.toLowerCase().includes('change') ||
    el.text.toLowerCase().includes('custom') ||
    el.text.toLowerCase().includes('transfer') ||
    el.text.toLowerCase().includes('advanced') ||
    el.text.toLowerCase().includes('dns') ||
    el.text.toLowerCase().includes('setting')
  );

  console.log('🔍 Relevant elements found:', relevant.length);
  relevant.forEach((el, i) => {
    console.log(`  ${i + 1}. [${el.tag}] ${el.text} (class: ${el.className || 'none'})`);
  });

  // Try clicking relevant elements
  for (const el of relevant) {
    try {
      console.log(`🖱️  Clicking: ${el.text}`);
      if (el.href) {
        await page.goto(el.href);
      } else {
        await page.click(el);
      }
      await page.waitForTimeout(2000);

      // Look for input fields
      const hasInputs = await page.evaluate(() => {
        return document.querySelectorAll('input[type="text"], input:not([type])').length > 0;
      });

      if (hasInputs) {
        console.log('✅ Found input fields!');
        break;
      }
    } catch (e) {
      console.log(`Click failed: ${e.message}`);
    }
  }

  // Final attempt to find and fill inputs
  const inputResults = await page.evaluate(() => {
    const inputs = Array.from(document.querySelectorAll('input[type="text"], input:not([type])'));
    const results = [];

    inputs.slice(0, 2).forEach((input, i) => {
      const result = {
        index: i,
        type: input.type,
        placeholder: input.placeholder,
        value: input.value,
        id: input.id,
        className: input.className
      };
      results.push(result);
    });

    return results;
  });

  console.log('📝 Input fields found:', inputResults);

  if (inputResults.length > 0) {
    await page.evaluate(() => {
      const inputs = Array.from(document.querySelectorAll('input[type="text"], input:not([type])'));
      inputs[0].value = 'ns1.vercel-dns.com';
      if (inputs[1]) {
        inputs[1].value = 'ns2.vercel-dns.com';
      }
    });
    console.log('✅ Nameservers entered!');

    // Look for submit button
    await page.waitForTimeout(1000);
    const submitClicked = await page.evaluate(() => {
      const submits = Array.from(document.querySelectorAll('button[type="submit"], input[type="submit"], button:not([type])'));
      let clicked = false;

      for (const btn of submits) {
        const text = btn.textContent.toLowerCase();
        if (text.includes('save') || text.includes('submit') || text.includes('continue') || text.includes('apply')) {
          btn.click();
          clicked = true;
          break;
        }
      }

      return clicked;
    });

    if (submitClicked) {
      console.log('💾 Form submitted!');
    }
  }

  console.log('⏳ Waiting 5 seconds...');
  await page.waitForTimeout(5000);

  await browser.close();
  console.log('✅ RALPH MODE COMPLETE');
})();