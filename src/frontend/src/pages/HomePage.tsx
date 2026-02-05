import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, BookOpen, Calendar, Heart } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { useGetAboutSections, useGetHomePageSections } from '@/hooks/useQueries';
import InstallPromptBanner from '@/components/InstallPromptBanner';

export default function HomePage() {
  const { data: aboutSections } = useGetAboutSections();
  const { data: homePageSections } = useGetHomePageSections();

  // Use backend data if available, otherwise use defaults
  const whatWeDoSections = homePageSections && homePageSections.length > 0
    ? homePageSections
    : [
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
      ];

  const getIconForSection = (title: string) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('community')) return Users;
    if (lowerTitle.includes('skill')) return BookOpen;
    if (lowerTitle.includes('event') || lowerTitle.includes('activit')) return Calendar;
    return Users;
  };

  // Filter About sections into content and links
  const aboutContentSections = aboutSections?.filter((s) => !s.link) || [];
  const aboutLinkSections = aboutSections?.filter((s) => s.link) || [];

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

      {/* Install Prompt Banner */}
      <section className="container py-6">
        <InstallPromptBanner />
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
          {whatWeDoSections.map((section, index) => {
            const IconComponent = getIconForSection(section.title);
            const imageUrl = section.image?.getDirectURL();
            return (
              <Card key={index} className="border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  {imageUrl ? (
                    <div className="mb-4 rounded-lg overflow-hidden">
                      <img src={imageUrl} alt={section.title} className="w-full h-32 object-cover" />
                    </div>
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                      <IconComponent className="h-6 w-6" />
                    </div>
                  )}
                  <CardTitle>{section.title}</CardTitle>
                  <CardDescription>{section.description}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </section>

      {/* About Content Section (if configured) */}
      {aboutContentSections.length > 0 && (
        <section className="bg-muted/30 border-y border-border/40">
          <div className="container py-16 md:py-24">
            <div className="max-w-5xl mx-auto space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                  About Our Organization
                </h2>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {aboutContentSections.map((section, index) => {
                  const mediaUrl = section.media?.getDirectURL();
                  return (
                    <Card key={index} className="border-2">
                      <CardHeader>
                        {mediaUrl && (
                          <div className="mb-4 rounded-lg overflow-hidden">
                            <img src={mediaUrl} alt={section.title} className="w-full h-32 object-cover" />
                          </div>
                        )}
                        <CardTitle className="text-xl">{section.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground whitespace-pre-wrap">
                          {section.content}
                        </p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
              {aboutLinkSections.length > 0 && (
                <div className="flex flex-wrap gap-4 justify-center pt-6">
                  {aboutLinkSections.map((section, index) => (
                    <Link key={index} to={section.content}>
                      <Button size="lg" variant="outline">
                        {section.title}
                      </Button>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

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
              our mission, there are many ways to get involved with The Youth And Friends Organization.
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
