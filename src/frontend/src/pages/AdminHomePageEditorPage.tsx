import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AdminGuard } from '@/components/AdminGuard';
import { useGetHomePageSections, useUpdateHomePageSections } from '@/hooks/useQueries';
import { Loader2, Save, Home, Plus, Trash2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import MediaPicker from '@/components/admin/MediaPicker';
import type { HomePageSection, ExternalBlob } from '../backend';

function AdminHomePageEditorContent() {
  const { data: homePageSections, isLoading, isError } = useGetHomePageSections();
  const updateMutation = useUpdateHomePageSections();

  const [sections, setSections] = useState<HomePageSection[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (homePageSections && homePageSections.length > 0) {
      setSections(homePageSections);
    } else {
      // Initialize with default sections
      setSections([
        {
          title: 'Community Building',
          description: 'Connect with peers, build friendships, and develop a strong sense of belonging in a welcoming environment.',
          image: undefined,
        },
        {
          title: 'Skill Development',
          description: 'Learn new skills through workshops, mentorship programs, and hands-on activities that prepare you for the future.',
          image: undefined,
        },
        {
          title: 'Events & Activities',
          description: 'Participate in exciting events, social gatherings, and community service projects throughout the year.',
          image: undefined,
        },
      ]);
    }
  }, [homePageSections]);

  const handleSave = async () => {
    try {
      await updateMutation.mutateAsync(sections);
      setSuccessMessage('Home page content updated successfully!');
      setTimeout(() => setSuccessMessage(null), 5000);
    } catch (error) {
      console.error('Failed to update home page content:', error);
    }
  };

  const handleChange = (index: number, field: keyof HomePageSection, value: string | ExternalBlob | null) => {
    const updated = [...sections];
    updated[index] = { ...updated[index], [field]: value };
    setSections(updated);
  };

  const handleAddSection = () => {
    setSections([...sections, { title: '', description: '', image: undefined }]);
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
              <Home className="h-6 w-6" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight">
              Home Page <span className="text-primary">Editor</span>
            </h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Customize the "What We Do" section on the home page
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
              Failed to update home page content. Please try again.
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
              Failed to load home page content. Please try again later.
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
                    <CardTitle className="text-xl">Card {index + 1}</CardTitle>
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
                  <CardDescription>
                    Configure the content for this "What We Do" card
                  </CardDescription>
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
                    <Label htmlFor={`description-${index}`}>Description *</Label>
                    <Textarea
                      id={`description-${index}`}
                      value={section.description}
                      onChange={(e) => handleChange(index, 'description', e.target.value)}
                      placeholder="Enter a brief description"
                      rows={3}
                      required
                    />
                  </div>

                  <MediaPicker
                    label="Add picture or video"
                    value={section.image}
                    onChange={(image) => handleChange(index, 'image', image)}
                    accept="both"
                    disabled={isSaving}
                  />
                </CardContent>
              </Card>
            ))}

            <Button variant="outline" onClick={handleAddSection} className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add Card
            </Button>

            <Card className="border-2 border-primary/20 bg-primary/5">
              <CardContent className="pt-6">
                <Button
                  onClick={handleSave}
                  disabled={isSaving || sections.some((s) => !s.title.trim() || !s.description.trim())}
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
                      Save Home Page Content
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

export default function AdminHomePageEditorPage() {
  return (
    <AdminGuard>
      <AdminHomePageEditorContent />
    </AdminGuard>
  );
}
