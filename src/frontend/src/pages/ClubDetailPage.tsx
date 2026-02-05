import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link, useParams } from '@tanstack/react-router';
import { ArrowLeft, Lightbulb, Loader2 } from 'lucide-react';
import { useGetClubById } from '@/hooks/useQueries';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function ClubDetailPage() {
  const { clubId } = useParams({ from: '/clubs/$clubId' });
  
  // Parse clubId to BigInt
  let parsedId: bigint | null = null;
  try {
    parsedId = BigInt(clubId);
  } catch (error) {
    console.error('Invalid club ID:', error);
  }

  const { data: club, isLoading, isError } = useGetClubById(parsedId);

  // Loading State
  if (isLoading) {
    return (
      <div className="container py-12 md:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto">
          <Link to="/clubs">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Clubs
            </Button>
          </Link>
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (isError) {
    return (
      <div className="container py-12 md:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto space-y-6">
          <Link to="/clubs">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Clubs
            </Button>
          </Link>
          <Alert variant="destructive">
            <AlertDescription>
              Failed to load club details. Please try again later.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  // Not Found State
  if (!club) {
    return (
      <div className="container py-12 md:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-4xl font-bold">Club Not Found</h1>
          <p className="text-lg text-muted-foreground">
            The club you're looking for doesn't exist.
          </p>
          <Link to="/clubs">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Clubs
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12 md:py-16 lg:py-20">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Back Button */}
        <Link to="/clubs">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Clubs
          </Button>
        </Link>

        {/* Header */}
        <div className="space-y-4">
          {club.profilePicture ? (
            <Avatar className="h-16 w-16">
              <AvatarImage src={club.profilePicture} alt={`${club.name} logo`} />
              <AvatarFallback>
                <Lightbulb className="h-8 w-8" />
              </AvatarFallback>
            </Avatar>
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Lightbulb className="h-8 w-8" />
            </div>
          )}
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {club.name}
          </h1>
          {club.slogan && (
            <p className="text-xl text-muted-foreground italic">
              "{club.slogan}"
            </p>
          )}
        </div>

        {/* Club Details */}
        <div className="space-y-6">
          {club.aims && (
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl">Aims</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {club.aims}
                </p>
              </CardContent>
            </Card>
          )}

          {club.motto && (
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl">Motto</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {club.motto}
                </p>
              </CardContent>
            </Card>
          )}

          {club.program && (
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl">Program</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {club.program}
                </p>
              </CardContent>
            </Card>
          )}

          {club.activities && (
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl">Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {club.activities}
                </p>
              </CardContent>
            </Card>
          )}

          {club.achievements && (
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl">Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {club.achievements}
                </p>
              </CardContent>
            </Card>
          )}

          {club.history && (
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl">History</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {club.history}
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Call to Action */}
        <Card className="bg-primary/5 border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl">Ready to Join?</CardTitle>
            <CardDescription className="text-base">
              Become a member to participate in this club and all our other activities.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/membership">
              <Button size="lg" className="w-full sm:w-auto">
                Register for Membership
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
