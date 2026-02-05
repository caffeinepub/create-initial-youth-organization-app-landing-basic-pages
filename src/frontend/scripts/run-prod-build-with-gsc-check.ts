/**
 * Production build orchestrator script for Version 19
 * Runs the frontend build and enforces Google Search Console meta tag verification
 * Exits with non-zero status if verification fails
 * Enhanced with detailed step logging and error capture
 */

import { execSync } from 'child_process';
import { existsSync, writeFileSync, appendFileSync } from 'fs';
import { join } from 'path';

const LOG_FILE = join(process.cwd(), 'production-build.log');
const TIMESTAMP = new Date().toISOString();

function log(message: string) {
  console.log(message);
  appendFileSync(LOG_FILE, `${message}\n`, 'utf-8');
}

function logError(message: string) {
  console.error(message);
  appendFileSync(LOG_FILE, `${message}\n`, 'utf-8');
}

// Initialize log file
writeFileSync(LOG_FILE, `=== Production Build Log ===\nStarted: ${TIMESTAMP}\n\n`, 'utf-8');

log('🚀 Starting Version 19 production build with GSC verification...\n');

try {
  // Step 1: Run the frontend build
  log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  log('STEP 1: Building frontend');
  log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  log('Command: npm run build:skip-bindings\n');
  
  try {
    execSync('npm run build:skip-bindings', { 
      stdio: 'inherit',
      cwd: join(process.cwd())
    });
    log('\n✅ STEP 1 COMPLETE: Frontend build succeeded\n');
  } catch (buildError) {
    logError('\n❌ STEP 1 FAILED: Frontend build error');
    logError('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    if (buildError instanceof Error) {
      logError(`Error: ${buildError.message}`);
    }
    logError(`\n📋 Full error details saved to: ${LOG_FILE}`);
    logError('\n💡 Troubleshooting tips:');
    logError('  - Check for TypeScript compilation errors');
    logError('  - Verify all dependencies are installed (npm install)');
    logError('  - Check for syntax errors in React components');
    logError('  - Review the log file for complete error output\n');
    throw buildError;
  }

  // Step 2: Verify dist exists
  log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  log('STEP 2: Verifying dist directory');
  log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  const distPath = join(process.cwd(), 'dist');
  if (!existsSync(distPath)) {
    logError('❌ STEP 2 FAILED: dist directory not found after build');
    logError(`Expected path: ${distPath}`);
    logError('\n💡 This usually means the build step failed silently.');
    logError(`📋 Check the log file for details: ${LOG_FILE}\n`);
    process.exit(1);
  }
  log(`✅ STEP 2 COMPLETE: dist directory exists at ${distPath}\n`);

  // Step 3: Run GSC meta tag verification
  log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  log('STEP 3: Verifying Google Search Console meta tag');
  log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  try {
    execSync('npx tsx scripts/verify-gsc-meta.ts', { 
      stdio: 'inherit',
      cwd: join(process.cwd())
    });
    log('\n✅ STEP 3 COMPLETE: GSC meta tag verification passed\n');
  } catch (verifyError) {
    logError('\n❌ STEP 3 FAILED: GSC meta tag verification error');
    logError('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    logError(`📋 Full error details saved to: ${LOG_FILE}`);
    logError('\n💡 Fix: Ensure the GSC meta tag is in frontend/index.html\n');
    throw verifyError;
  }

  log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  log('✅ ALL STEPS COMPLETE');
  log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  log('\n🎉 Version 19 production build complete and verified!');
  log('📋 Ready for deployment to Internet Computer');
  log(`📄 Build log saved to: ${LOG_FILE}\n`);
  
} catch (error) {
  logError('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  logError('❌ PRODUCTION BUILD FAILED');
  logError('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  if (error instanceof Error) {
    logError(`\nError: ${error.message}`);
  }
  logError(`\n📋 Complete error log saved to: ${LOG_FILE}`);
  logError('📖 Review the log file for full error output and troubleshooting guidance\n');
  process.exit(1);
}
