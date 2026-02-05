import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AdminGuard } from '@/components/AdminGuard';
import { useGetSocialMediaLinks, useSetSocialMediaLinks } from '@/hooks/useQueries';
import { Link } from '@tanstack/react-router';
import { ArrowLeft, Save, Loader2, CheckCircle2, Share2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import type { SocialMediaLinks } from '../backend';

function AdminSocialLinksContent() {
  const { data: socialLinks, isLoading } = useGetSocialMediaLinks();
  const setSocialLinks = useSetSocialMediaLinks();

  const [formData, setFormData] = useState<SocialMediaLinks>({
    facebook: '',
    instagram: '',
    twitter: '',
    linkedin: '',
    youtube: '',
    tiktok: '',
    whatsapp: '',
  });

  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (socialLinks) {
      setFormData(socialLinks);
    }
  }, [socialLinks]);

  const handleChange = (field: keyof SocialMediaLinks, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(false);

    try {
      await setSocialLinks.mutateAsync(formData);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to save social media links:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="container py-12 md:py-16 lg:py-20">
        <div className="max-w-3xl mx-auto flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12 md:py-16 lg:py-20">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <Link to="/me/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Share2 className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight">
                Social Media <span className="text-primary">Links</span>
              </h1>
              <p className="text-lg text-muted-foreground mt-1">
                Manage your organization's social media presence
              </p>
            </div>
          </div>
        </div>

        {/* Success Alert */}
        {showSuccess && (
          <Alert className="border-green-500/50 bg-green-500/10">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-600">
              Social media links saved successfully!
            </AlertDescription>
          </Alert>
        )}

        {/* Error Alert */}
        {setSocialLinks.isError && (
          <Alert variant="destructive">
            <AlertDescription>
              Failed to save social media links. Please try again.
            </AlertDescription>
          </Alert>
        )}

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle>Social Media Accounts</CardTitle>
            <CardDescription>
              Enter the full URLs for your social media profiles. Leave blank to hide a platform.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="facebook">Facebook</Label>
                  <Input
                    id="facebook"
                    type="url"
                    placeholder="https://facebook.com/yourpage"
                    value={formData.facebook}
                    onChange={(e) => handleChange('facebook', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input
                    id="instagram"
                    type="url"
                    placeholder="https://instagram.com/yourprofile"
                    value={formData.instagram}
                    onChange={(e) => handleChange('instagram', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="twitter">X (Twitter)</Label>
                  <Input
                    id="twitter"
                    type="url"
                    placeholder="https://x.com/yourhandle"
                    value={formData.twitter}
                    onChange={(e) => handleChange('twitter', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    type="url"
                    placeholder="https://linkedin.com/company/yourcompany"
                    value={formData.linkedin}
                    onChange={(e) => handleChange('linkedin', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="youtube">YouTube</Label>
                  <Input
                    id="youtube"
                    type="url"
                    placeholder="https://youtube.com/@yourchannel"
                    value={formData.youtube}
                    onChange={(e) => handleChange('youtube', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tiktok">TikTok</Label>
                  <Input
                    id="tiktok"
                    type="url"
                    placeholder="https://tiktok.com/@youraccount"
                    value={formData.tiktok}
                    onChange={(e) => handleChange('tiktok', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="whatsapp">WhatsApp</Label>
                  <Input
                    id="whatsapp"
                    type="url"
                    placeholder="https://wa.me/1234567890"
                    value={formData.whatsapp}
                    onChange={(e) => handleChange('whatsapp', e.target.value)}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={setSocialLinks.isPending}
              >
                {setSocialLinks.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function AdminSocialLinksPage() {
  return (
    <AdminGuard>
      <AdminSocialLinksContent />
    </AdminGuard>
  );
}
