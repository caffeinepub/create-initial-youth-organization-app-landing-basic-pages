/**
 * Shared public production URL configuration
 * Supports environment override via VITE_PUBLIC_SITE_URL while defaulting to the IC canister URL
 * Used across Settings and public UI to ensure consistency
 * 
 * To use a custom domain (e.g., https://yfo.org), set VITE_PUBLIC_SITE_URL=https://yfo.org before building
 */
export const PUBLIC_SITE_URL = 
  import.meta.env.VITE_PUBLIC_SITE_URL || 
  'https://pd5nf-fqaaa-aaaan-qetaq-cai.icp0.io';
