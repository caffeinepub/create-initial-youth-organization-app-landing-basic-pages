import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Palette, Code, Music, Trophy, Lightbulb } from 'lucide-react';
import { Link } from '@tanstack/react-router';

const programs = [
  {
    icon: BookOpen,
    title: 'Academic Support',
    description:
      'Tutoring, homework help, and study groups to help you excel in school and prepare for your future.',
    age: '12-18',
    schedule: 'Mon-Thu, 4-6 PM',
  },
  {
    icon: Palette,
    title: 'Arts & Creativity',
    description:
      'Express yourself through painting, drawing, crafts, and multimedia projects in our creative studio.',
    age: '10-17',
    schedule: 'Tue & Thu, 3-5 PM',
  },
  {
    icon: Code,
    title: 'Tech & Coding',
    description:
      'Learn programming, web development, and digital skills to prepare for careers in technology.',
    age: '13-18',
    schedule: 'Wed & Fri, 4-6 PM',
  },
  {
    icon: Music,
    title: 'Music & Performance',
    description:
      'Discover your musical talents through lessons, band practice, and performance opportunities.',
    age: '11-18',
    schedule: 'Mon & Wed, 5-7 PM',
  },
  {
    icon: Trophy,
    title: 'Sports & Fitness',
    description:
      'Stay active and build teamwork skills through basketball, soccer, and other recreational activities.',
    age: '10-18',
    schedule: 'Tue & Sat, 3-5 PM',
  },
  {
    icon: Lightbulb,
    title: 'Leadership Development',
    description:
      'Build confidence, communication skills, and leadership abilities through workshops and mentorship.',
    age: '14-18',
    schedule: 'Thu, 6-8 PM',
  },
];

export default function ProgramsPage() {
  return (
    <div className="container py-12 md:py-16 lg:py-20">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Our <span className="text-primary">Programs</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our diverse range of programs designed to help you discover
            your passions, develop new skills, and connect with others.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((program) => {
            const Icon = program.icon;
            return (
              <Card key={program.title} className="border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                    <Icon className="h-6 w-6" />
                  </div>
                  <CardTitle>{program.title}</CardTitle>
                  <CardDescription className="text-base">
                    {program.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex gap-2">
                    <Badge variant="secondary">Ages {program.age}</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {program.schedule}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <section className="bg-primary/5 rounded-3xl p-8 md:p-12 text-center space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">
            Ready to Join a Program?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            All programs are free and open to youth in our community. Contact us
            to learn more about registration and get started today!
          </p>
          <Link to="/contact">
            <Button size="lg">Get Started</Button>
          </Link>
        </section>
      </div>
    </div>
  );
}
