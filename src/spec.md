# Specification

## Summary
**Goal:** Promote Draft Version 19 to production so the enhanced Share behavior is live on the public site.

**Planned changes:**
- Publish/promote the Draft Version 19 frontend bundle to the production Internet Computer frontend canister so https://pd5nf-fqaaa-aaaan-qetaq-cai.icp0.io serves Version 19 assets.
- Publish/promote the corresponding backend canister to production only if Draft Version 19 includes backend changes.
- Run the existing production build verification that checks for the Google Search Console verification meta tag, and block promotion if the tag is missing.
- Verify the enhanced Share behavior on production: use the native Web Share API when available, otherwise copy the production public URL to the clipboard and show an English success message.

**User-visible outcome:** Visiting https://pd5nf-fqaaa-aaaan-qetaq-cai.icp0.io loads the Draft Version 19 build, includes the Google Search Console verification meta tag in page source, and Share uses native sharing when supported (or copies the production URL when not).
