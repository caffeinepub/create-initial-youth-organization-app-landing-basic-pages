/**
 * SEO utility functions for managing canonical URLs and meta tags
 */

/**
 * Updates the canonical URL to match the current page
 * @param path - The current route path (e.g., '/about', '/programs')
 */
export function updateCanonicalUrl(path: string): void {
  const canonicalLink = document.getElementById('canonical-link') as HTMLLinkElement;
  if (canonicalLink) {
    const origin = window.location.origin;
    const fullUrl = `${origin}${path}`;
    canonicalLink.href = fullUrl;
  }
}

/**
 * Updates Open Graph URL meta tag
 * @param path - The current route path
 */
export function updateOgUrl(path: string): void {
  let ogUrlMeta = document.querySelector('meta[property="og:url"]') as HTMLMetaElement;
  if (!ogUrlMeta) {
    ogUrlMeta = document.createElement('meta');
    ogUrlMeta.setAttribute('property', 'og:url');
    document.head.appendChild(ogUrlMeta);
  }
  const origin = window.location.origin;
  const fullUrl = `${origin}${path}`;
  ogUrlMeta.content = fullUrl;
}

/**
 * Updates all SEO-related URLs for the current page
 * @param path - The current route path
 */
export function updateSeoUrls(path: string): void {
  updateCanonicalUrl(path);
  updateOgUrl(path);
}
