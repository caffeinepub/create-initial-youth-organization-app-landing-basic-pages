# Production Deployment & Google Search Console Verification

This guide covers deploying Version 14 of your application to production on the Internet Computer and verifying ownership with Google Search Console.

## Prerequisites

- DFX CLI installed and configured
- Cycles wallet with sufficient balance
- Google Search Console account
- Production canister ID: `pd5nf-fqaaa-aaaan-qetaq-cai`

## Production URL

Your live site: **https://pd5nf-fqaaa-aaaan-qetaq-cai.icp0.io**

---

## Complete Deployment Workflow

### Pre-Deployment Checklist

Before deploying to production, verify:

- [ ] Google Search Console meta tag is present in `frontend/index.html`
- [ ] All code changes are committed
- [ ] Local build succeeds without errors
- [ ] Service worker version is updated (currently v14)
- [ ] You have sufficient cycles in your wallet

### Step 1: Build with Verification

From the `frontend/` directory, run the production build with automatic GSC verification:

