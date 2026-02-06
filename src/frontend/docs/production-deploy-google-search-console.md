# Production Deployment & Google Search Console Verification

This guide covers deploying your application to production on the Internet Computer and verifying ownership with Google Search Console.

## Prerequisites

- DFX CLI installed and configured
- Cycles wallet with sufficient balance
- Google Search Console account
- Production canister ID: `pd5nf-fqaaa-aaaan-qetaq-cai`

## Production URLs

- **IC Canister URL (backup):** https://pd5nf-fqaaa-aaaan-qetaq-cai.icp0.io
- **Custom Domain (when configured):** https://yfo.org

---

## Complete Deployment Workflow

### Pre-Deployment Checklist

Before deploying to production, verify:

- [ ] Google Search Console meta tag is present in `frontend/index.html`
- [ ] All code changes are committed
- [ ] Local build succeeds without errors
- [ ] Service worker version is updated
- [ ] ads.txt file is configured (if using AdSense)
- [ ] You have sufficient cycles in your wallet
- [ ] Enhanced share functionality (native Web Share API + clipboard fallback) is working
- [ ] `VITE_PUBLIC_SITE_URL` is set if using custom domain

### Step 1: Configure Public Site URL (Optional)

If you have configured a custom domain (e.g., **yfo.org**), set the environment variable before building:

**Linux/macOS:**
