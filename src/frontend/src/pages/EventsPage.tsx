import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Clock, Loader2 } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { useGetEvents } from '@/hooks/useQueries';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function EventsPage() {
  const { data: events, isLoading, error } = useGetEvents();

  // Parse dateTime to extract date and time
  const parseDateTime = (dateTime: string) => {
    try {
      const date = new Date(dateTime);
      return {
        date: date.toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }),
        time: date.toLocaleTimeString('en-US', { 
          hour: 'numeric', 
          minute: '2-digit',
          hour12: true 
        }),
      };
    } catch {
      return { date: dateTime, time: '' };
    }
  };

  return (
    <div className="container py-12 md:py-16 lg:py-20">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Upcoming <span className="text-primary">Events</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay connected with our community through exciting events, workshops,
            and activities throughout the year.
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {/* Error State */}
        {error && (
          <Alert variant="destructive">
            <AlertDescription>
              Failed to load events. Please try again later.
            </AlertDescription>
          </Alert>
        )}

        {/* Empty State */}
        {!isLoading && !error && events && events.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              No upcoming events yet. Check back soon!
            </p>
          </div>
        )}

        {/* Events List */}
        {!isLoading && !error && events && events.length > 0 && (
          <div className="space-y-6">
            {events.map((event) => {
              const { date, time } = parseDateTime(event.dateTime);
              return (
                <Card key={event.id.toString()} className="border-2 hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <CardTitle className="text-2xl">{event.title}</CardTitle>
                          {event.organizer && (
                            <Badge variant="outline">
                              {event.organizer}
                            </Badge>
                          )}
                        </div>
                        <CardDescription className="text-base">
                          {event.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3 sm:grid-cols-3 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span>{date}</span>
                      </div>
                      {time && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="h-4 w-4 text-primary" />
                          <span>{time}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Call to Action */}
        <section className="bg-primary/5 rounded-3xl p-8 md:p-12 text-center space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">
            Want to Stay Updated?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Contact us to join our mailing list and never miss an event or
            opportunity to get involved with The Youth And Friends Organization.
          </p>
          <Link to="/contact">
            <Button size="lg">Contact Us</Button>
          </Link>
        </section>
      </div>
    </div>
  );
}
