/**
 * Build-time verification script for Google Search Console meta tag
 * Ensures the required verification tag is present in the built HTML output
 * Version 10 - Production readiness check
 */

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const REQUIRED_META_TAG = '<meta name="google-site-verification" content="aAWOVaFESX_NA9kStpc5MH8M-HThgTsp3QJjaHX496o" />';

function verifyGSCMeta() {
  const distIndexPath = join(process.cwd(), 'dist', 'index.html');
  
  // Check if dist/index.html exists
  if (!existsSync(distIndexPath)) {
    console.error('❌ Error: dist/index.html not found. Please run build first.');
    console.error('   Run: npm run build');
    process.exit(1);
  }

  // Read the built HTML file
  const htmlContent = readFileSync(distIndexPath, 'utf-8');

  // Check if the required meta tag is present (exact match including closing />)
  if (!htmlContent.includes(REQUIRED_META_TAG)) {
    console.error('❌ Error: Google Search Console verification meta tag is missing or incorrect in dist/index.html');
    console.error(`   Expected: ${REQUIRED_META_TAG}`);
    console.error('');
    console.error('   The meta tag must be present exactly as shown above in frontend/index.html');
    process.exit(1);
  }

  console.log('✅ Google Search Console verification meta tag found in dist/index.html');
  console.log('✅ Version 10 is ready for production deployment');
  console.log('');
  console.log('Next steps:');
  console.log('  1. Deploy to production: dfx deploy --network ic');
  console.log('  2. Verify in Google Search Console using the HTML tag method');
  console.log('  3. URL to verify: https://pd5nf-fqaaa-aaaan-qetaq-cai.icp0.io');
}

verifyGSCMeta();
