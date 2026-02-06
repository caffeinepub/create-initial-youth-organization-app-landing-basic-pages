import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AdminGuard } from '@/components/AdminGuard';
import { useGetBrandingMedia, useUpdateBrandingMedia } from '@/hooks/useQueries';
import { Loader2, Save, Image as ImageIcon } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import MediaPicker from '@/components/admin/MediaPicker';
import type { ExternalBlob } from '../backend';
import { Link } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';

function AdminBrandingContent() {
  const { data: branding, isLoading, isError } = useGetBrandingMedia();
  const updateMutation = useUpdateBrandingMedia();

  const [logo, setLogo] = useState<ExternalBlob | null>(null);
  const [organizationName, setOrganizationName] = useState<string>('The Youth And Friends Organization');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (branding) {
      if (branding.logo) {
        setLogo(branding.logo);
      }
      if (branding.name) {
        setOrganizationName(branding.name);
      }
    }
  }, [branding]);

  const handleSave = async () => {
    try {
      await updateMutation.mutateAsync({
        logo: logo || undefined,
        name: organizationName,
        otherMedia: undefined,
      });
      setSuccessMessage('Branding updated successfully!');
      setTimeout(() => setSuccessMessage(null), 5000);
    } catch (error) {
      console.error('Failed to update branding:', error);
    }
  };

  const isSaving = updateMutation.isPending;

  return (
    <div className="container py-12 md:py-16 lg:py-20">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Back Button */}
        <Link to="/me/dashboard">
          <Button variant="ghost">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>

        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <ImageIcon className="h-6 w-6" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight">
              Branding <span className="text-primary">Settings</span>
            </h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Update your organization's name, logo and branding
          </p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <Alert className="border-2 border-primary/50 bg-primary/5">
            <AlertTitle className="text-lg font-bold">Success!</AlertTitle>
            <AlertDescription>{successMessage}</AlertDescription>
          </Alert>
        )}

        {/* Error Message */}
        {updateMutation.isError && (
          <Alert variant="destructive">
            <AlertDescription>
              Failed to update branding. Please try again.
            </AlertDescription>
          </Alert>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {/* Error State */}
        {isError && (
          <Alert variant="destructive">
            <AlertDescription>
              Failed to load branding. Please try again later.
            </AlertDescription>
          </Alert>
        )}

        {/* Form */}
        {!isLoading && !isError && (
          <div className="space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-xl">Organization Name</CardTitle>
                <CardDescription>
                  Enter your organization's name that will appear throughout the site
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="org-name">Organization Name *</Label>
                  <Input
                    id="org-name"
                    value={organizationName}
                    onChange={(e) => setOrganizationName(e.target.value)}
                    placeholder="e.g., The Youth And Friends Organization"
                    disabled={isSaving}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-xl">Organization Logo</CardTitle>
                <CardDescription>
                  Upload a logo image that will appear in the header navigation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MediaPicker
                  label="Add picture or video"
                  value={logo}
                  onChange={setLogo}
                  accept="image"
                  disabled={isSaving}
                />
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/20 bg-primary/5">
              <CardContent className="pt-6">
                <Button
                  onClick={handleSave}
                  disabled={isSaving || !organizationName.trim()}
                  className="w-full"
                  size="lg"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-5 w-5" />
                      Save Branding
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminBrandingPage() {
  return (
    <AdminGuard>
      <AdminBrandingContent />
    </AdminGuard>
  );
}
