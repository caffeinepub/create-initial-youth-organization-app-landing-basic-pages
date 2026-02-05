/**
 * Build-time verification script for Google Search Console meta tag
 * Ensures the required verification tag is present in the built HTML output
 * Version 19 - Production readiness check with enhanced validation
 */

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const REQUIRED_META_TAG = '<meta name="google-site-verification" content="aAWOVaFESX_NA9kStpc5MH8M-HThgTsp3QJjaHX496o" />';
const PRODUCTION_URL = 'https://pd5nf-fqaaa-aaaan-qetaq-cai.icp0.io';

function verifyGSCMeta() {
  const distIndexPath = join(process.cwd(), 'dist', 'index.html');
  
  // Check if dist/index.html exists
  if (!existsSync(distIndexPath)) {
    console.error('❌ Error: dist/index.html not found. Please run build first.');
    console.error('   Run: npm run build:skip-bindings');
    process.exit(1);
  }

  // Read the built HTML file
  const htmlContent = readFileSync(distIndexPath, 'utf-8');

  // Check if the required meta tag is present (exact match including closing />)
  if (!htmlContent.includes(REQUIRED_META_TAG)) {
    console.error('❌ CRITICAL ERROR: Google Search Console verification meta tag is missing or incorrect!');
    console.error('');
    console.error(`   Expected in dist/index.html:`);
    console.error(`   ${REQUIRED_META_TAG}`);
    console.error('');
    console.error('   This meta tag MUST be present in frontend/index.html before building.');
    console.error('   Without it, Google Search Console verification will fail.');
    console.error('');
    console.error('   Fix: Add the meta tag to frontend/index.html in the <head> section');
    process.exit(1);
  }

  console.log('✅ Google Search Console verification meta tag verified in dist/index.html');
  console.log('✅ Version 19 is ready for production deployment');
  console.log('');
  console.log('📋 Next steps for deployment:');
  console.log('  1. Deploy backend: dfx deploy backend --network ic');
  console.log('  2. Deploy frontend: dfx deploy frontend --network ic');
  console.log(`  3. Visit production URL: ${PRODUCTION_URL}`);
  console.log('  4. Verify the meta tag is live (view page source)');
  console.log('  5. Test enhanced share functionality (native + clipboard fallback)');
  console.log('  6. Complete verification in Google Search Console');
  console.log('  7. Verify /ads.txt is accessible at the site root');
  console.log('');
  console.log('💡 Tip: After deployment, users may need to hard refresh (Ctrl+Shift+R)');
  console.log('   to see the latest version due to browser caching.');
}

verifyGSCMeta();
