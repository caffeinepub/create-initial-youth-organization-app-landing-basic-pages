// Branding configuration with fallback logo
export const DEFAULT_LOGO_PATH = '/assets/Green and Black Minimalist Education Logo 1 (1).png';

export function getLogoUrl(brandingLogo?: { getDirectURL: () => string } | null): string {
  if (brandingLogo) {
    return brandingLogo.getDirectURL();
  }
  return DEFAULT_LOGO_PATH;
}
