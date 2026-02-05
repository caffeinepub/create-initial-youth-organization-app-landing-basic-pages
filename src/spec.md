# Specification

## Summary
**Goal:** Deploy the latest production build to the Internet Computer and ensure the Google Search Console verification meta tag is present in the live site’s HTML head.

**Planned changes:**
- Deploy the latest frontend build to the production canisters so https://pd5nf-fqaaa-aaaan-qetaq-cai.icp0.io serves the current (non-stale) UI.
- Deploy the corresponding latest backend canister release alongside the frontend.
- Ensure the production build/deploy pipeline runs the existing Google Search Console meta-tag verification script and fails if the required meta tag is missing.
- Verify the deployed site’s rendered `<head>` includes the `google-site-verification` meta tag so Search Console can validate the live site.

**User-visible outcome:** Visiting https://pd5nf-fqaaa-aaaan-qetaq-cai.icp0.io loads the latest live production site, and Google Search Console can verify ownership using the meta tag present in the page source.
