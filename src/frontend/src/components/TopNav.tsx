import { Link, useRouterState, useNavigate } from '@tanstack/react-router';
import { Menu, Settings, X, LogOut, Share2, Check } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { useAdminSession } from '@/hooks/useAdminSession';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useGetBrandingMedia } from '@/hooks/useQueries';
import { getLogoUrl } from '@/config/branding';
import { primaryNavLinks, useMeLink } from '@/config/navLinks';
import SettingsSheet from './SettingsSheet';
import { useQueryClient } from '@tanstack/react-query';
import { PUBLIC_SITE_URL } from '@/config/publicSite';
import { shareUrl } from '@/utils/share';

export default function TopNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [shareMessage, setShareMessage] = useState<string | null>(null);
  const router = useRouterState();
  const navigate = useNavigate();
  const currentPath = router.location.pathname;
  const { isAdmin, logout: adminLogout } = useAdminSession();
  const { identity, clear: clearIdentity } = useInternetIdentity();
  const { data: branding } = useGetBrandingMedia();
  const queryClient = useQueryClient();

  const meLink = useMeLink();
  const logoUrl = getLogoUrl(branding?.logo);
  const isAuthenticated = !!identity;

  const handleOpenSettings = () => {
    setIsOpen(false);
    setIsSettingsOpen(true);
  };

  const handleShareLink = async () => {
    const result = await shareUrl(PUBLIC_SITE_URL, 'The Youth And Friends Organization');
    
    if (result.success && result.method === 'clipboard') {
      setShareMessage('Link copied to clipboard');
      setTimeout(() => setShareMessage(null), 2000);
    }
  };

  const handleLogout = async () => {
    setIsOpen(false);
    
    // Clear Internet Identity if logged in
    if (isAuthenticated) {
      await clearIdentity();
    }
    
    // Clear admin session if active
    if (isAdmin) {
      adminLogout();
    }
    
    // Clear all cached data
    queryClient.clear();
    
    // Navigate to home
    navigate({ to: '/' });
  };

  return (
    <>
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
            {primaryNavLinks.map((link) => (
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

          {/* Mobile Hamburger Menu */}
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
                  <span className="text-lg font-bold text-primary">YFO</span>
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
                <Button
                  variant="ghost"
                  className="w-full justify-start text-base h-12"
                  onClick={handleOpenSettings}
                >
                  <Settings className="mr-3 h-5 w-5" />
                  Settings
                </Button>
                
                <Button
                  variant="ghost"
                  className="w-full justify-start text-base h-12"
                  onClick={handleShareLink}
                >
                  {shareMessage ? (
                    <>
                      <Check className="mr-3 h-5 w-5 text-green-600" />
                      <span className="text-green-600">{shareMessage}</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="mr-3 h-5 w-5" />
                      Share link
                    </>
                  )}
                </Button>
                
                <Separator className="my-2" />
                
                <Button
                  variant="ghost"
                  className="w-full justify-start text-base h-12"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="mr-3 h-5 w-5" />
                  Close
                </Button>
                
                <Button
                  variant="ghost"
                  className="w-full justify-start text-base h-12 text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-3 h-5 w-5" />
                  Logout
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Settings Sheet */}
      <SettingsSheet open={isSettingsOpen} onOpenChange={setIsSettingsOpen} />
    </>
  );
}
