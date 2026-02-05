# Specification

## Summary
**Goal:** Fix production Share link behavior, clarify Share vs Install UX, add an admin-configurable Android APK download pathway, and implement admin-managed Events (CRUD) with public read-only rendering.

**Planned changes:**
- Fix and verify Share link actions across all existing entry points (TopNav mobile menu, Settings, Footer) on the production site, using Web Share API with clipboard fallback and English feedback.
- Update UI copy/structure to clearly separate “Share link” from “Install”, keeping the existing PWA install flow available.
- Add backend support for an admin-configurable Android APK URL with a public read method and an admin-only update method; surface this in Settings with a “Download Android APK” action (or an English “not available yet” message when unset).
- Add backend Events storage with stable persistence: public list API plus admin-only create/update/delete with English Unauthorized traps.
- Add React Query hooks for Events (query + create/update/delete mutations) following existing hook patterns and invalidating the Events query on success.
- Replace the static Events page content with backend-fetched events, including loading/error/empty states and clear event card rendering.
- Add an admin-gated Events Manager page (CRUD UI) linked from the Admin Dashboard.

**User-visible outcome:** Sharing works consistently on production from the menu, Settings, and Footer; users can install via PWA as before and can download an Android APK when available; admins can manage Events in an admin page and the public Events page reflects those backend-managed events.
