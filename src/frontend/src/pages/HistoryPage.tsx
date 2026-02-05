import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetHistoryContent } from '@/hooks/useQueries';
import { BookOpen, Loader2 } from 'lucide-react';

export default function HistoryPage() {
  const { data: historyContent, isLoading, error } = useGetHistoryContent();

  return (
    <div className="container py-12 md:py-16 lg:py-20">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mx-auto">
            <BookOpen className="h-8 w-8" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Our <span className="text-primary">History</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Learn about the journey and evolution of The Youth And Friends Organization.
          </p>
        </div>

        {/* Content */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-2xl">Our Story</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : error ? (
              <div className="text-center py-12 text-muted-foreground">
                <p>Unable to load history content. Please try again later.</p>
              </div>
            ) : !historyContent || historyContent.trim() === '' ? (
              <div className="text-center py-12 text-muted-foreground">
                <p className="text-lg">
                  Our history is being written every day through the amazing work of our members and community.
                </p>
                <p className="mt-4">
                  Check back soon for updates on our journey and milestones.
                </p>
              </div>
            ) : (
              <div className="prose prose-lg max-w-none text-muted-foreground whitespace-pre-wrap">
                {historyContent}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
