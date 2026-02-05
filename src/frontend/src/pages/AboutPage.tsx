import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Eye, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="container py-12 md:py-16 lg:py-20">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            About <span className="text-primary">YouthHub</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're dedicated to creating opportunities for young people to learn,
            grow, and thrive in a supportive community environment.
          </p>
        </div>

        {/* Our Story */}
        <section className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">Our Story</h2>
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p>
              YouthHub was founded with a simple yet powerful vision: to create a
              space where every young person feels valued, supported, and empowered
              to reach their full potential. What started as a small community
              initiative has grown into a thriving organization serving hundreds of
              youth each year.
            </p>
            <p>
              Through our diverse programs and dedicated team, we provide young
              people with the tools, resources, and mentorship they need to succeed.
              From academic support to leadership development, from creative
              expression to community service, we offer pathways for every interest
              and aspiration.
            </p>
          </div>
        </section>

        {/* Mission, Vision, Values */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-2">
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                <Target className="h-6 w-6" />
              </div>
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                To empower young people through education, mentorship, and
                community engagement, fostering personal growth and positive social
                impact.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                <Eye className="h-6 w-6" />
              </div>
              <CardTitle>Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                A world where every young person has access to opportunities that
                help them discover their potential and become confident, capable
                leaders.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                <Award className="h-6 w-6" />
              </div>
              <CardTitle>Our Values</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Inclusivity, respect, integrity, and excellence guide everything we
                do. We believe in the power of community and the potential of every
                individual.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Impact Stats */}
        <section className="bg-primary/5 rounded-3xl p-8 md:p-12">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-8">
            Our Impact
          </h2>
          <div className="grid gap-8 md:grid-cols-3 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Youth Served Annually</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">25+</div>
              <div className="text-muted-foreground">Active Programs</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">100+</div>
              <div className="text-muted-foreground">Community Partners</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
