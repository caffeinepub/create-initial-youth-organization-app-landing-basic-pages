# Specification

## Summary
**Goal:** Ensure the correct logo is shown consistently across the site (including admin) and add a reusable, consistent “Add picture or video” media upload control across key admin editors, with persisted media attachments.

**Planned changes:**
- Replace any hardcoded/incorrect header logo filename usage with a single canonical logo source shared across public and admin pages, with a safe fallback to the existing generated logo asset if no configured logo is set.
- Add backend support for an admin-managed branding configuration (including a logo media field) that is publicly readable and admin-only writable.
- Add an admin page in the existing admin area to update the app branding logo, including an English-labeled media button (logo constrained to images), preview, and save.
- Implement a reusable “Add picture or video” media picker control for admin workflows that supports local image/video selection, preview, and clearing before save.
- Extend the History editor, About editor, and Home page editor to include the same media picker control and persist/load selected media; ensure public pages render saved images/videos read-only.
- Update backend models/APIs to persist media attachments for History content, About sections, and Home page sections with public read and admin-only write access.
- Add a conditional Motoko stable-state migration so upgrades preserve existing stored data and safely default new branding/media fields when absent.

**User-visible outcome:** Admins can update the site logo in the admin area and attach images/videos while editing History, About, and Home content using a consistent “Add picture or video” control; saved media and the updated logo persist after refresh and appear correctly on public pages.
