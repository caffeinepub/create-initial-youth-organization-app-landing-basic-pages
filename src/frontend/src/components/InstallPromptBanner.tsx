import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, X } from 'lucide-react';
import { usePwaInstallPrompt } from '@/hooks/usePwaInstallPrompt';

export default function InstallPromptBanner() {
  const { isInstallable, promptInstall, dismissPrompt } = usePwaInstallPrompt();

  if (!isInstallable) {
    return null;
  }

  return (
    <Card className="border-2 border-primary/30 bg-primary/5 relative">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 h-8 w-8"
        onClick={dismissPrompt}
        aria-label="Dismiss install prompt"
      >
        <X className="h-4 w-4" />
      </Button>
      <CardHeader>
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground flex-shrink-0">
            <Download className="h-6 w-6" />
          </div>
          <div className="flex-1 pr-8">
            <CardTitle className="text-xl mb-2">Install Our App</CardTitle>
            <CardDescription className="text-base">
              Get quick access to The Youth And Friends Organization. Install our app for a better experience on your device.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-3">
          <Button onClick={promptInstall} size="lg" className="flex-1 sm:flex-none">
            Install Now
          </Button>
          <Button onClick={dismissPrompt} variant="outline" size="lg" className="flex-1 sm:flex-none">
            Not Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
