import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useGetHistoryContent, useUpdateHistoryContent } from '@/hooks/useQueries';
import { Link } from '@tanstack/react-router';
import { ArrowLeft, Loader2, Save, CheckCircle2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AdminGuard } from '@/components/AdminGuard';
import MediaPicker from '@/components/admin/MediaPicker';
import type { ExternalBlob } from '../backend';

function AdminHistoryEditorContent() {
  const { data: historyData, isLoading } = useGetHistoryContent();
  const updateMutation = useUpdateHistoryContent();
  const [content, setContent] = useState('');
  const [media, setMedia] = useState<ExternalBlob | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (historyData) {
      setContent(historyData.content || '');
      setMedia(historyData.media || null);
    }
  }, [historyData]);

  const handleSave = async () => {
    try {
      await updateMutation.mutateAsync({ content, media });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Failed to save history:', error);
    }
  };

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
          <h1 className="text-4xl font-bold tracking-tight">
            History <span className="text-primary">Editor</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Edit the organization's history content that appears on the public History page.
          </p>
        </div>

        {/* Editor */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-2xl">History Content</CardTitle>
            <CardDescription className="text-base">
              Write or edit the history of The Youth And Friends Organization. This content will be visible to all visitors.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="history-content">History Text</Label>
                  <Textarea
                    id="history-content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Enter the organization's history here..."
                    rows={15}
                    className="font-mono text-sm"
                  />
                  <p className="text-sm text-muted-foreground">
                    {content.length} characters
                  </p>
                </div>

                <MediaPicker
                  label="Add picture or video"
                  value={media}
                  onChange={setMedia}
                  accept="both"
                  disabled={updateMutation.isPending}
                />

                {saved && (
                  <Alert className="border-primary/50 bg-primary/5">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <AlertDescription>
                      History content saved successfully!
                    </AlertDescription>
                  </Alert>
                )}

                {updateMutation.isError && (
                  <Alert variant="destructive">
                    <AlertDescription>
                      Failed to save history content. Please try again.
                    </AlertDescription>
                  </Alert>
                )}

                <Button
                  onClick={handleSave}
                  size="lg"
                  className="w-full sm:w-auto"
                  disabled={updateMutation.isPending}
                >
                  {updateMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-5 w-5" />
                      Save Changes
                    </>
                  )}
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function AdminHistoryEditorPage() {
  return (
    <AdminGuard>
      <AdminHistoryEditorContent />
    </AdminGuard>
  );
}
