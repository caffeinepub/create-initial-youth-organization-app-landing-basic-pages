import { useState } from 'react';
import { useNavigate, useRouterState } from '@tanstack/react-router';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { primaryNavLinks, useMeLink } from '@/config/navLinks';

export default function HomeBottomNavMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const router = useRouterState();
  const currentPath = router.location.pathname;
  const meLink = useMeLink();

  const handleNavigate = (path: string) => {
    navigate({ to: path });
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            size="lg"
            className="h-14 w-14 rounded-full shadow-lg"
            aria-label="Open navigation menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[80vh]">
          <SheetHeader>
            <SheetTitle>Navigation</SheetTitle>
          </SheetHeader>
          <nav className="mt-6 flex flex-col gap-2">
            {primaryNavLinks.map((link) => (
              <Button
                key={link.path}
                variant={currentPath === link.path ? 'default' : 'ghost'}
                className="w-full justify-start text-lg h-12"
                onClick={() => handleNavigate(link.path)}
              >
                {link.label}
              </Button>
            ))}
            <Button
              variant={currentPath.startsWith('/me') ? 'default' : 'ghost'}
              className="w-full justify-start text-lg h-12"
              onClick={() => handleNavigate(meLink)}
            >
              Me
            </Button>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
