import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AdminGuard } from '@/components/AdminGuard';
import { useGetAboutSections, useUpdateAboutSections } from '@/hooks/useQueries';
import { Loader2, Save, Info, Plus, Trash2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import MediaPicker from '@/components/admin/MediaPicker';
import type { AboutSection, ExternalBlob } from '../backend';

function AdminAboutContent() {
  const { data: aboutSections, isLoading, isError } = useGetAboutSections();
  const updateMutation = useUpdateAboutSections();

  const [sections, setSections] = useState<AboutSection[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (aboutSections && aboutSections.length > 0) {
      setSections(aboutSections);
    } else {
      // Initialize with default sections
      setSections([
        { title: 'Community Building', content: '', link: false, media: undefined },
        { title: 'Skill Development', content: '', link: false, media: undefined },
        { title: 'Events & Activities', content: '', link: false, media: undefined },
        { title: 'Our Programs', content: '', link: true, media: undefined },
        { title: 'Upcoming Events', content: '', link: true, media: undefined },
      ]);
    }
  }, [aboutSections]);

  const handleSave = async () => {
    try {
      await updateMutation.mutateAsync(sections);
      setSuccessMessage('About content updated successfully!');
      setTimeout(() => setSuccessMessage(null), 5000);
    } catch (error) {
      console.error('Failed to update about content:', error);
    }
  };

  const handleChange = (index: number, field: keyof AboutSection, value: string | boolean | ExternalBlob | null) => {
    const updated = [...sections];
    updated[index] = { ...updated[index], [field]: value };
    setSections(updated);
  };

  const handleAddSection = () => {
    setSections([...sections, { title: '', content: '', link: false, media: undefined }]);
  };

  const handleRemoveSection = (index: number) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  const isSaving = updateMutation.isPending;

  return (
    <div className="container py-12 md:py-16 lg:py-20">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Info className="h-6 w-6" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight">
              About <span className="text-primary">Content</span>
            </h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Manage About content that appears on the home page
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
              Failed to update about content. Please try again.
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
              Failed to load about content. Please try again later.
            </AlertDescription>
          </Alert>
        )}

        {/* Form */}
        {!isLoading && !isError && (
          <div className="space-y-6">
            {sections.map((section, index) => (
              <Card key={index} className="border-2">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-xl">Section {index + 1}</CardTitle>
                    {sections.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveSection(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor={`title-${index}`}>Title *</Label>
                    <Input
                      id={`title-${index}`}
                      value={section.title}
                      onChange={(e) => handleChange(index, 'title', e.target.value)}
                      placeholder="e.g., Community Building"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`content-${index}`}>
                      {section.link ? 'URL' : 'Content'} *
                    </Label>
                    {section.link ? (
                      <Input
                        id={`content-${index}`}
                        value={section.content}
                        onChange={(e) => handleChange(index, 'content', e.target.value)}
                        placeholder="e.g., /programs or https://example.com"
                        required
                      />
                    ) : (
                      <Textarea
                        id={`content-${index}`}
                        value={section.content}
                        onChange={(e) => handleChange(index, 'content', e.target.value)}
                        placeholder="Enter the content for this section"
                        rows={4}
                        required
                      />
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`link-${index}`}
                      checked={section.link}
                      onCheckedChange={(checked) =>
                        handleChange(index, 'link', checked === true)
                      }
                    />
                    <Label htmlFor={`link-${index}`} className="cursor-pointer">
                      This is a link (button)
                    </Label>
                  </div>

                  <MediaPicker
                    label="Add picture or video"
                    value={section.media}
                    onChange={(media) => handleChange(index, 'media', media)}
                    accept="both"
                    disabled={isSaving}
                  />
                </CardContent>
              </Card>
            ))}

            <Button variant="outline" onClick={handleAddSection} className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add Section
            </Button>

            <Card className="border-2 border-primary/20 bg-primary/5">
              <CardContent className="pt-6">
                <Button
                  onClick={handleSave}
                  disabled={isSaving || sections.some((s) => !s.title.trim() || !s.content.trim())}
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
                      Save About Content
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

export default function AdminAboutPage() {
  return (
    <AdminGuard>
      <AdminAboutContent />
    </AdminGuard>
  );
}
