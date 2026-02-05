import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, BookOpen, Calendar, Heart } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-background z-0" />
        <div className="container relative z-10 py-16 md:py-24 lg:py-32">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Empowering Youth,{' '}
                <span className="text-primary">Building Futures</span>
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl max-w-2xl">
                Join a vibrant community where young people learn, grow, and make
                lasting connections. Discover programs designed to unlock your
                potential and shape tomorrow's leaders.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/programs">
                  <Button size="lg" className="w-full sm:w-auto text-base">
                    Explore Programs
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto text-base">
                    Get Involved
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-accent/30 rounded-3xl blur-3xl" />
              <img
                src="/assets/generated/youth-hero.dim_1600x900.png"
                alt="Youth community activities"
                className="relative rounded-3xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="container py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            What We Do
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We provide a supportive environment where young people can thrive
            through diverse programs and activities.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                <Users className="h-6 w-6" />
              </div>
              <CardTitle>Community Building</CardTitle>
              <CardDescription>
                Connect with peers, build friendships, and develop a strong sense
                of belonging in a welcoming environment.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                <BookOpen className="h-6 w-6" />
              </div>
              <CardTitle>Skill Development</CardTitle>
              <CardDescription>
                Learn new skills through workshops, mentorship programs, and
                hands-on activities that prepare you for the future.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                <Calendar className="h-6 w-6" />
              </div>
              <CardTitle>Events & Activities</CardTitle>
              <CardDescription>
                Participate in exciting events, social gatherings, and community
                service projects throughout the year.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary/5 border-y border-border/40">
        <div className="container py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Heart className="h-12 w-12 text-primary mx-auto" />
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to Make a Difference?
            </h2>
            <p className="text-lg text-muted-foreground">
              Whether you're looking to join our programs, volunteer, or support
              our mission, there are many ways to get involved with YouthHub.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/programs">
                <Button size="lg" className="w-full sm:w-auto">
                  View Programs
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
