import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="container py-12 md:py-16 lg:py-20">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Get in <span className="text-primary">Touch</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions or want to learn more about our programs? We'd love to
            hear from you! Reach out using any of the methods below.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-2">
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                <Mail className="h-6 w-6" />
              </div>
              <CardTitle>Email Us</CardTitle>
              <CardDescription className="text-base">
                Send us an email and we'll get back to you within 24 hours.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <a
                href="mailto:theyouthandfriendsorganization@gmail.com"
                className="text-primary hover:underline font-medium"
              >
                theyouthandfriendsorganization@gmail.com
              </a>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                <Phone className="h-6 w-6" />
              </div>
              <CardTitle>Call Us</CardTitle>
              <CardDescription className="text-base">
                Speak with a team member during our office hours.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <a
                href="tel:0537190229"
                className="text-primary hover:underline font-medium"
              >
                0537190229
              </a>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                <MapPin className="h-6 w-6" />
              </div>
              <CardTitle>Visit Us</CardTitle>
              <CardDescription className="text-base">
                Stop by our community center to learn more in person.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <address className="not-italic text-muted-foreground">
                123 Community Street
                <br />
                Your City, ST 12345
              </address>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                <Clock className="h-6 w-6" />
              </div>
              <CardTitle>Office Hours</CardTitle>
              <CardDescription className="text-base">
                Our team is available during these times.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-1 text-muted-foreground">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Info */}
        <section className="bg-primary/5 rounded-3xl p-8 md:p-12 space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">
            Interested in Volunteering or Partnering?
          </h2>
          <p className="text-muted-foreground">
            We're always looking for passionate individuals and organizations to
            join our mission. Whether you want to volunteer your time, become a
            mentor, or explore partnership opportunities, we'd love to connect with
            you. Please reach out using any of the contact methods above and let us
            know how you'd like to get involved.
          </p>
        </section>
      </div>
    </div>
  );
}
