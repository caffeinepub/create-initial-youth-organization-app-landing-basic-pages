import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useTheme } from '@/hooks/useTheme';
import { usePwaInstallPrompt } from '@/hooks/usePwaInstallPrompt';
import { Copy, Check, Download, Sun, Moon } from 'lucide-react';

interface SettingsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SHARE_URL = 'https://pd5nf-fqaaa-aaaan-qetaq-cai.icp0.io';

export default function SettingsSheet({ open, onOpenChange }: SettingsSheetProps) {
  const { theme, toggleTheme, isDark } = useTheme();
  const { isInstallable, promptInstall } = usePwaInstallPrompt();
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(SHARE_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  };

  const handleInstall = async () => {
    await promptInstall();
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[320px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
          <SheetDescription>
            Customize your app experience and access sharing options.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Theme Toggle */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Theme</Label>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-3">
                {isDark ? (
                  <Moon className="h-5 w-5 text-primary" />
                ) : (
                  <Sun className="h-5 w-5 text-primary" />
                )}
                <div>
                  <p className="font-medium">{isDark ? 'Dark Mode' : 'Light Mode'}</p>
                  <p className="text-sm text-muted-foreground">
                    Switch to {isDark ? 'light' : 'dark'} theme
                  </p>
                </div>
              </div>
              <Switch checked={isDark} onCheckedChange={toggleTheme} />
            </div>
          </div>

          <Separator />

          {/* Share Link */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Share Link</Label>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Share this link with colleagues to invite them to the app:
              </p>
              <div className="flex items-center gap-2">
                <div className="flex-1 rounded-md border bg-muted/50 px-3 py-2 text-sm">
                  {SHARE_URL}
                </div>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={handleCopyLink}
                  className="shrink-0"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                  <span className="sr-only">Copy link</span>
                </Button>
              </div>
              {copied && (
                <p className="text-sm text-green-600 font-medium">Link copied to clipboard!</p>
              )}
            </div>
          </div>

          <Separator />

          {/* Install App */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Install App</Label>
            {isInstallable ? (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Install this app on your device for quick access and a native app experience.
                </p>
                <Button onClick={handleInstall} className="w-full" variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Install App
                </Button>
              </div>
            ) : (
              <div className="rounded-lg border bg-muted/30 p-4">
                <p className="text-sm text-muted-foreground">
                  To add this app to your home screen:
                </p>
                <ol className="mt-2 space-y-1 text-sm text-muted-foreground list-decimal list-inside">
                  <li>Tap the browser menu (⋮ or ⋯)</li>
                  <li>Select "Add to Home screen"</li>
                  <li>Follow the prompts to install</li>
                </ol>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
