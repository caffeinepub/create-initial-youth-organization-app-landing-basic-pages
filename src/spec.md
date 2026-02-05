# Specification

## Summary
**Goal:** Make primary navigation accessible from a Home bottom menu, repurpose the mobile hamburger menu for account actions, and add a Settings UI with theme control, a shareable link, and an install-app entry point.

**Planned changes:**
- Move primary navigation links out of the mobile hamburger menu and add a bottom-positioned Home button that opens a keyboard-accessible menu/sheet containing the main navigation links.
- Update the mobile hamburger menu to show only: “Settings”, “Close”, and “Logout”, with the specified behaviors (open Settings, close menu, log out and return to a public route).
- Add a Settings UI that includes:
  - A Light/Dark theme toggle that applies immediately and persists across reloads.
  - A shareable link display using `https://pd5nf-fqaaa-aaaan-qetaq-cai.icp0.io` with a “Copy link” action and a visible success confirmation.
  - An “Install app” action that triggers the existing PWA install flow when available, otherwise shows English guidance to use the browser’s “Add to Home screen”.
- Update `frontend/docs/android-apk-from-pwa.md` to reference the production PWA URL as Bubblewrap input and clarify what is/is not supported for Google Play distribution.

**User-visible outcome:** On mobile, users open site navigation from a Home bottom menu, use the hamburger menu for Settings/Close/Logout only, can change and persist theme, copy a shareable public link, access install guidance/prompt from Settings, and have clearer documentation for generating an Android APK from the deployed PWA.
