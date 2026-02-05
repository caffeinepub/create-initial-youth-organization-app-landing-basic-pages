/**
 * Google AdSense script injection utility
 * Injects the AdSense script tag into document head when configured
 */

let adsenseInjected = false;

export function injectAdSenseScript(): void {
  // Only inject once
  if (adsenseInjected) {
    return;
  }

  // Read AdSense client ID from Vite environment variable
  const adsenseClientId = import.meta.env.VITE_ADSENSE_CLIENT_ID;

  // If no client ID is configured, do nothing
  if (!adsenseClientId || adsenseClientId.trim() === '') {
    return;
  }

  // Create and inject the AdSense script tag
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`;
  script.crossOrigin = 'anonymous';
  
  document.head.appendChild(script);
  adsenseInjected = true;
}
