/**
 * Build-time verification script for Google Search Console meta tag
 * Ensures the required verification tag is present in the built HTML output
 * Version 19 - Production readiness check with enhanced validation and diagnostics
 */

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const REQUIRED_META_TAG = '<meta name="google-site-verification" content="aAWOVaFESX_NA9kStpc5MH8M-HThgTsp3QJjaHX496o" />';
const PRODUCTION_URL = 'https://pd5nf-fqaaa-aaaan-qetaq-cai.icp0.io';

function verifyGSCMeta() {
  const distIndexPath = join(process.cwd(), 'dist', 'index.html');
  const sourceIndexPath = join(process.cwd(), 'index.html');
  
  console.log('🔍 Checking for Google Search Console verification meta tag...\n');

  // Check if dist/index.html exists
  if (!existsSync(distIndexPath)) {
    console.error('❌ CRITICAL ERROR: dist/index.html not found');
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.error(`   Expected file: ${distIndexPath}`);
    console.error('');
    console.error('   This means the build step did not complete successfully.');
    console.error('   Please run the build command first:');
    console.error('   → npm run build:skip-bindings');
    console.error('');
    process.exit(1);
  }

  console.log(`✓ Found dist/index.html at: ${distIndexPath}`);

  // Read the built HTML file
  const htmlContent = readFileSync(distIndexPath, 'utf-8');

  // Check if the required meta tag is present (exact match including closing />)
  if (!htmlContent.includes(REQUIRED_META_TAG)) {
    console.error('\n❌ CRITICAL ERROR: Google Search Console verification meta tag is MISSING or INCORRECT!');
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.error('');
    console.error('📋 REQUIRED META TAG (must match exactly):');
    console.error(`   ${REQUIRED_META_TAG}`);
    console.error('');
    console.error('📁 WHERE TO ADD IT:');
    console.error(`   File: ${sourceIndexPath}`);
    console.error('   Location: Inside the <head> section');
    console.error('');
    console.error('📝 EXAMPLE:');
    console.error('   <head>');
    console.error('     <meta charset="UTF-8" />');
    console.error('     <meta name="viewport" content="width=device-width, initial-scale=1.0" />');
    console.error(`     ${REQUIRED_META_TAG}`);
    console.error('     <title>Your Site Title</title>');
    console.error('     ...');
    console.error('   </head>');
    console.error('');
    console.error('⚠️  WHY THIS MATTERS:');
    console.error('   Without this meta tag, Google Search Console cannot verify site ownership.');
    console.error('   This blocks SEO features, search analytics, and sitemap submission.');
    console.error('');
    console.error('🔧 HOW TO FIX:');
    console.error(`   1. Open ${sourceIndexPath}`);
    console.error('   2. Add the meta tag shown above to the <head> section');
    console.error('   3. Save the file');
    console.error('   4. Re-run the build: npm run build:skip-bindings');
    console.error('   5. Re-run this verification script');
    console.error('');
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.error('');
    process.exit(1);
  }

  console.log('✓ GSC meta tag found in dist/index.html');
  console.log('✓ Meta tag content matches expected value\n');
  
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('✅ VERIFICATION PASSED');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('');
  console.log('🎉 Version 19 is ready for production deployment!');
  console.log('');
  console.log('📋 NEXT STEPS FOR DEPLOYMENT:');
  console.log('');
  console.log('  1. Deploy backend canister:');
  console.log('     → dfx deploy backend --network ic');
  console.log('');
  console.log('  2. Deploy frontend canister:');
  console.log('     → dfx deploy frontend --network ic');
  console.log('');
  console.log('  3. Visit your production site:');
  console.log(`     → ${PRODUCTION_URL}`);
  console.log('');
  console.log('  4. Verify the meta tag is live:');
  console.log('     → Right-click → View Page Source');
  console.log('     → Search for "google-site-verification"');
  console.log('');
  console.log('  5. Test enhanced share functionality:');
  console.log('     → Native Web Share API (mobile)');
  console.log('     → Clipboard fallback (desktop)');
  console.log('');
  console.log('  6. Complete Google Search Console verification:');
  console.log('     → Go to Google Search Console');
  console.log('     → Add property → HTML tag method');
  console.log('     → Verify ownership');
  console.log('');
  console.log('  7. Verify ads.txt accessibility (if using AdSense):');
  console.log(`     → ${PRODUCTION_URL}/ads.txt`);
  console.log('');
  console.log('💡 CACHE MANAGEMENT:');
  console.log('   After deployment, users may need to hard refresh to see updates:');
  console.log('   → Windows/Linux: Ctrl + Shift + R');
  console.log('   → Mac: Cmd + Shift + R');
  console.log('');
  console.log('📖 For detailed deployment instructions, see:');
  console.log('   → frontend/docs/production-deploy-google-search-console.md');
  console.log('');
}

verifyGSCMeta();
