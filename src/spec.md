# Specification

## Summary
**Goal:** Rebuild with up-to-date production-ready SEO/indexing settings and add Android-installable PWA support with a Home page install prompt.

**Planned changes:**
- Update/parameterize SEO/indexing configuration so canonical URL, sitemap.xml, and robots.txt reflect the actual deployed production URL (and keep admin routes excluded from crawling).
- Add PWA support for the Vite + React frontend: web app manifest, local PWA icon assets in the public directory, and production service worker registration.
- Add an install prompt/banner on the public Home page that appears only when install is supported and the app is not already installed; includes English text, triggers the browser install flow, and supports dismiss-within-session behavior.
- Add repository documentation describing how to produce an Android APK wrapper for the deployed PWA URL (e.g., via Trusted Web Activity), including prerequisites, steps, and limitations.

**User-visible outcome:** The site can be correctly crawled/indexed by Google at its deployed URL, Android users can install it as a PWA, see an install prompt on the Home page when eligible, and follow docs to generate an APK wrapper for distribution.
