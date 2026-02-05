import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { Link } from '@tanstack/react-router';

const upcomingEvents = [
  {
    title: 'Spring Community Festival',
    date: 'March 15, 2026',
    time: '2:00 PM - 6:00 PM',
    location: 'Community Center',
    description:
      'Join us for our annual spring celebration with games, food, music, and fun activities for all ages.',
    type: 'Community',
  },
  {
    title: 'Youth Leadership Summit',
    date: 'March 22, 2026',
    time: '9:00 AM - 4:00 PM',
    location: 'Main Hall',
    description:
      'A full-day workshop focused on developing leadership skills, public speaking, and team building.',
    type: 'Workshop',
  },
  {
    title: 'Art Exhibition Opening',
    date: 'April 5, 2026',
    time: '5:00 PM - 8:00 PM',
    location: 'Gallery Space',
    description:
      'Celebrate the creativity of our youth artists with an exhibition showcasing their latest works.',
    type: 'Arts',
  },
  {
    title: 'Tech Hackathon',
    date: 'April 12-13, 2026',
    time: '10:00 AM - 6:00 PM',
    location: 'Tech Lab',
    description:
      'A weekend coding challenge where teams collaborate to build innovative projects and compete for prizes.',
    type: 'Technology',
  },
  {
    title: 'Community Service Day',
    date: 'April 20, 2026',
    time: '8:00 AM - 2:00 PM',
    location: 'Various Locations',
    description:
      'Give back to the community through volunteer projects including park cleanup, food drives, and more.',
    type: 'Service',
  },
  {
    title: 'Summer Program Kickoff',
    date: 'May 1, 2026',
    time: '3:00 PM - 7:00 PM',
    location: 'Outdoor Field',
    description:
      'Launch our summer programs with outdoor games, BBQ, and information sessions about upcoming activities.',
    type: 'Community',
  },
];

const typeColors: Record<string, string> = {
  Community: 'default',
  Workshop: 'secondary',
  Arts: 'outline',
  Technology: 'default',
  Service: 'secondary',
};

export default function EventsPage() {
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

        {/* Events List */}
        <div className="space-y-6">
          {upcomingEvents.map((event) => (
            <Card key={event.title} className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <CardTitle className="text-2xl">{event.title}</CardTitle>
                      <Badge variant={typeColors[event.type] as any}>
                        {event.type}
                      </Badge>
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
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

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
