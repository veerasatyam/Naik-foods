const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const outDir = path.join(process.cwd(), 'screenshots');
fs.mkdirSync(outDir, { recursive: true });

async function capture() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  // 1. Legacy site (try with fallback if offline)
  try {
    console.log('Capturing legacy site...');
    await page.goto('https://www.naikfoods.co.in/in', { waitUntil: 'networkidle2', timeout: 25000 });
    await page.screenshot({ path: path.join(outDir, '01_legacy_site.png') });
    console.log('Captured 01_legacy_site.png');
  } catch (err) {
    console.warn('Legacy site capture failed or timed out:', err.message);
  }

  // 2. Live Vercel Homepage Hero
  console.log('Capturing Vercel Home Hero...');
  await page.goto('https://naik-foods.vercel.app/', { waitUntil: 'networkidle2', timeout: 30000 });
  await page.screenshot({ path: path.join(outDir, '02_home_hero.png') });
  console.log('Captured 02_home_hero.png');

  // 3. Marathi Mode
  console.log('Capturing Marathi Mode...');
  // Click the Marathi button
  const marathiButtons = await page.$$('button');
  for (const btn of marathiButtons) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text && text.includes('मराठी')) {
      await btn.click();
      await new Promise(r => setTimeout(r, 1000));
      break;
    }
  }
  await page.screenshot({ path: path.join(outDir, '03_marathi_mode.png') });
  console.log('Captured 03_marathi_mode.png');

  // 4. Regional Explorer (scroll down)
  console.log('Capturing Regional Explorer...');
  await page.evaluate(() => {
    window.scrollTo(0, 650);
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outDir, '04_regional_explorer.png') });
  console.log('Captured 04_regional_explorer.png');

  // 5. Video Reels Section
  console.log('Capturing Video Reels Section...');
  await page.evaluate(() => {
    window.scrollTo(0, 1600);
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outDir, '05_video_reels.png') });
  console.log('Captured 05_video_reels.png');

  // 6. Store Catalog
  console.log('Capturing Store Catalog...');
  await page.goto('https://naik-foods.vercel.app/store', { waitUntil: 'networkidle2', timeout: 30000 });
  await page.screenshot({ path: path.join(outDir, '06_store_catalog.png') });
  console.log('Captured 06_store_catalog.png');

  // 7. Recipe Detail with Video
  console.log('Capturing Recipe Detail Page...');
  await page.goto('https://naik-foods.vercel.app/recipes/authentic-pune-misal', { waitUntil: 'networkidle2', timeout: 30000 });
  await page.screenshot({ path: path.join(outDir, '07_recipe_detail_video.png') });
  console.log('Captured 07_recipe_detail_video.png');

  // 8. Localhost Admin Dashboard (via localhost:3000)
  try {
    console.log('Capturing Admin Dashboard...');
    // Set localStorage auth
    await page.goto('http://localhost:3000/login', { waitUntil: 'networkidle2', timeout: 15000 });
    await page.evaluate(() => {
      localStorage.setItem('nf_user', JSON.stringify({
        id: 'usr_admin_1',
        name: 'Satyam (Admin)',
        email: 'satyamsvs788@gmail.com',
        phone: '9730046247',
        role: 'admin'
      }));
    });
    await page.goto('http://localhost:3000/admin', { waitUntil: 'networkidle2', timeout: 15000 });
    await page.screenshot({ path: path.join(outDir, '08_admin_dashboard.png') });
    console.log('Captured 08_admin_dashboard.png');

    // 9. Admin Add Product
    console.log('Capturing Admin New Product...');
    await page.goto('http://localhost:3000/admin/products/new', { waitUntil: 'networkidle2', timeout: 15000 });
    await page.screenshot({ path: path.join(outDir, '09_admin_new_product.png') });
    console.log('Captured 09_admin_new_product.png');
  } catch (err) {
    console.warn('Admin capture note:', err.message);
  }

  await browser.close();
  console.log('ALL SCREENSHOTS CAPTURED SUCCESSFULLY!');
}

capture().catch(err => {
  console.error('Fatal capture error:', err);
  process.exit(1);
});
