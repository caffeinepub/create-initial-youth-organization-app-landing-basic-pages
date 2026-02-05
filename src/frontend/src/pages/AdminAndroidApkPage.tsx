import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AdminGuard } from '@/components/AdminGuard';
import { useGetAndroidApkUrl, useSetAndroidApkUrl } from '@/hooks/useQueries';
import { Smartphone, Loader2, Save } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

function AdminAndroidApkContent() {
  const { data: currentUrl, isLoading } = useGetAndroidApkUrl();
  const setUrlMutation = useSetAndroidApkUrl();

  const [url, setUrl] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (currentUrl !== undefined) {
      setUrl(currentUrl);
    }
  }, [currentUrl]);

  const handleSave = async () => {
    setError(null);
    setSuccess(null);

    // Basic URL validation
    if (url.trim() !== '' && !url.startsWith('http://') && !url.startsWith('https://')) {
      setError('Please enter a valid URL starting with http:// or https://');
      return;
    }

    try {
      await setUrlMutation.mutateAsync(url.trim());
      setSuccess('Android APK URL updated successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to update Android APK URL');
    }
  };

  return (
    <div className="container py-12 md:py-16 lg:py-20">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Smartphone className="h-6 w-6" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight">
              Android <span className="text-primary">APK</span>
            </h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Configure the download URL for your Android APK
          </p>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <Alert>
            <AlertDescription className="text-green-600 font-medium">
              {success}
            </AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Configuration Card */}
        <Card>
          <CardHeader>
            <CardTitle>APK Download URL</CardTitle>
            <CardDescription>
              Enter the URL where users can download your Android APK file. Leave empty to hide the download option.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="apkUrl">APK Download URL</Label>
                  <Input
                    id="apkUrl"
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com/your-app.apk"
                  />
                  <p className="text-sm text-muted-foreground">
                    This URL will be used in the Settings panel for users to download the Android APK.
                  </p>
                </div>

                <Button
                  onClick={handleSave}
                  disabled={setUrlMutation.isPending}
                  className="w-full"
                >
                  {setUrlMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save URL
                    </>
                  )}
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-lg">How to use this feature</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>
              1. Build your Android APK using tools like Bubblewrap or Android Studio
            </p>
            <p>
              2. Upload the APK file to a hosting service (e.g., Google Drive, Dropbox, your own server)
            </p>
            <p>
              3. Get a direct download link to the APK file
            </p>
            <p>
              4. Paste the link above and save
            </p>
            <p className="pt-2 font-medium text-foreground">
              Once saved, users will see a "Download Android APK" button in the Settings panel.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function AdminAndroidApkPage() {
  return (
    <AdminGuard>
      <AdminAndroidApkContent />
    </AdminGuard>
  );
}
