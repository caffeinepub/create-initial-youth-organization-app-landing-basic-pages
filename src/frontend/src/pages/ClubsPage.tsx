import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';
import { Lightbulb, Loader2 } from 'lucide-react';
import { useGetClubs } from '@/hooks/useQueries';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function ClubsPage() {
  const { data: clubs, isLoading, isError } = useGetClubs();

  return (
    <div className="container py-12 md:py-16 lg:py-20">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Our <span className="text-primary">Clubs</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join one of our specialized clubs and connect with like-minded peers who share your interests and passions.
          </p>
        </div>

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
              Failed to load clubs. Please try again later.
            </AlertDescription>
          </Alert>
        )}

        {/* Empty State */}
        {!isLoading && !isError && clubs && clubs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              No clubs available at the moment. Check back soon!
            </p>
          </div>
        )}

        {/* Clubs Grid */}
        {!isLoading && !isError && clubs && clubs.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2">
            {clubs.map((club) => (
              <Card key={club.id.toString()} className="border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    {club.profilePicture ? (
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={club.profilePicture} alt={`${club.name} logo`} />
                        <AvatarFallback>
                          <Lightbulb className="h-6 w-6" />
                        </AvatarFallback>
                      </Avatar>
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Lightbulb className="h-6 w-6" />
                      </div>
                    )}
                  </div>
                  <CardTitle className="text-2xl">{club.name}</CardTitle>
                  <CardDescription className="text-base">
                    {club.aims || 'Explore and engage with this club.'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to="/clubs/$clubId" params={{ clubId: club.id.toString() }}>
                    <Button className="w-full">Learn More</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Call to Action */}
        <section className="bg-primary/5 rounded-3xl p-8 md:p-12 text-center space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">
            Interested in Joining?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Become a member and gain access to all our clubs and activities. Start your journey with us today!
          </p>
          <Link to="/membership">
            <Button size="lg">Register for Membership</Button>
          </Link>
        </section>
      </div>
    </div>
  );
}
