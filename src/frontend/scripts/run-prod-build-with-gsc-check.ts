/**
 * Production build orchestrator script for Version 19
 * Runs the frontend build and enforces Google Search Console meta tag verification
 * Exits with non-zero status if verification fails
 * This is the required production build gate for Version 19
 */

import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { join } from 'path';

console.log('🚀 Starting Version 19 production build with GSC verification...\n');

try {
  // Step 1: Run the frontend build
  console.log('📦 Building frontend...');
  execSync('npm run build:skip-bindings', { 
    stdio: 'inherit',
    cwd: join(process.cwd())
  });
  console.log('✅ Frontend build completed\n');

  // Step 2: Verify dist exists
  const distPath = join(process.cwd(), 'dist');
  if (!existsSync(distPath)) {
    console.error('❌ Error: dist directory not found after build');
    process.exit(1);
  }

  // Step 3: Run GSC meta tag verification
  console.log('🔍 Verifying Google Search Console meta tag...');
  execSync('npx tsx scripts/verify-gsc-meta.ts', { 
    stdio: 'inherit',
    cwd: join(process.cwd())
  });

  console.log('\n✅ Version 19 production build complete and verified!');
  console.log('📋 Ready for deployment to Internet Computer\n');
  
} catch (error) {
  console.error('\n❌ Version 19 production build failed');
  if (error instanceof Error) {
    console.error(error.message);
  }
  process.exit(1);
}
