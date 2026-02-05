import { useAdminSession } from '@/hooks/useAdminSession';

export interface NavLink {
  path: string;
  label: string;
}

export const primaryNavLinks: NavLink[] = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/programs', label: 'Programs' },
  { path: '/events', label: 'Events' },
  { path: '/clubs', label: 'Clubs' },
  { path: '/history', label: 'History' },
  { path: '/membership', label: 'Membership' },
  { path: '/contact', label: 'Contact' },
];

export function useMeLink(): string {
  const { isAdmin } = useAdminSession();
  return isAdmin ? '/me/dashboard' : '/me';
}
