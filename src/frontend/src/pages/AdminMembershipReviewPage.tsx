import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useGetAllMembershipRegistrations } from '@/hooks/useQueries';
import { Link } from '@tanstack/react-router';
import { ArrowLeft, Loader2, Mail, Phone, MapPin, FileText } from 'lucide-react';
import { AdminGuard } from '@/components/AdminGuard';

function AdminMembershipReviewContent() {
  const { data: registrations, isLoading, error } = useGetAllMembershipRegistrations();

  return (
    <div className="container py-12 md:py-16 lg:py-20">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Back Button */}
        <Link to="/me/dashboard">
          <Button variant="ghost">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>

        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">
            Membership <span className="text-primary">Review</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Review and manage membership registration submissions.
          </p>
        </div>

        {/* Registrations List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <Card className="border-2">
            <CardContent className="py-12 text-center text-muted-foreground">
              <p>Unable to load registrations. Please try again later.</p>
            </CardContent>
          </Card>
        ) : !registrations || registrations.length === 0 ? (
          <Card className="border-2">
            <CardContent className="py-12 text-center text-muted-foreground">
              <p className="text-lg">No membership registrations yet.</p>
              <p className="mt-2">New applications will appear here.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            <p className="text-sm text-muted-foreground">
              Total registrations: {registrations.length}
            </p>
            {registrations.map((registration, index) => (
              <Card key={index} className="border-2">
                <CardHeader>
                  <CardTitle className="text-2xl">{registration.name}</CardTitle>
                  <CardDescription className="text-base">
                    Registration #{registrations.length - index}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Email</p>
                        <p className="text-sm text-muted-foreground">{registration.email}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Phone</p>
                        <p className="text-sm text-muted-foreground">{registration.phone}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Address</p>
                        <p className="text-sm text-muted-foreground">{registration.address}</p>
                      </div>
                    </div>

                    {registration.additionalInfo && (
                      <div className="flex items-start gap-3 md:col-span-2">
                        <FileText className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Additional Information</p>
                          <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                            {registration.additionalInfo}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminMembershipReviewPage() {
  return (
    <AdminGuard>
      <AdminMembershipReviewContent />
    </AdminGuard>
  );
}
