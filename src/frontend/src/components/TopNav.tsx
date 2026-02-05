import { Link, useRouterState } from '@tanstack/react-router';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAdminSession } from '@/hooks/useAdminSession';
import { useGetBrandingMedia } from '@/hooks/useQueries';
import { getLogoUrl } from '@/config/branding';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/programs', label: 'Programs' },
  { path: '/events', label: 'Events' },
  { path: '/clubs', label: 'Clubs' },
  { path: '/history', label: 'History' },
  { path: '/membership', label: 'Membership' },
  { path: '/contact', label: 'Contact' },
];

export default function TopNav() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouterState();
  const currentPath = router.location.pathname;
  const { isAdmin } = useAdminSession();
  const { data: branding } = useGetBrandingMedia();

  const meLink = isAdmin ? '/me/dashboard' : '/me';
  const logoUrl = getLogoUrl(branding?.logo);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logoUrl}
            alt="The Youth And Friends Organization Logo"
            className="h-10 w-10 rounded-lg object-cover"
          />
          <span className="text-xl font-bold text-primary hidden sm:inline">
            The Youth And Friends Organization
          </span>
          <span className="text-xl font-bold text-primary sm:hidden">
            The Youth And Friends Organization
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:gap-1">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path}>
              <Button
                variant={currentPath === link.path ? 'default' : 'ghost'}
                className="font-medium"
              >
                {link.label}
              </Button>
            </Link>
          ))}
          <Link to={meLink}>
            <Button
              variant={currentPath.startsWith('/me') ? 'default' : 'ghost'}
              className="font-medium"
            >
              Me
            </Button>
          </Link>
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px] sm:w-[320px]">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <img
                  src={logoUrl}
                  alt="The Youth And Friends Organization Logo"
                  className="h-10 w-10 rounded-lg object-cover"
                />
                <span className="text-xl font-bold text-primary">The Youth And Friends Organization</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)}>
                  <Button
                    variant={currentPath === link.path ? 'default' : 'ghost'}
                    className="w-full justify-start font-medium"
                  >
                    {link.label}
                  </Button>
                </Link>
              ))}
              <Link to={meLink} onClick={() => setIsOpen(false)}>
                <Button
                  variant={currentPath.startsWith('/me') ? 'default' : 'ghost'}
                  className="w-full justify-start font-medium"
                >
                  Me
                </Button>
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
