import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useSubmitMembershipRegistration } from '@/hooks/useQueries';
import { Loader2, CheckCircle2, UserPlus, Shield } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Link } from '@tanstack/react-router';

export default function MembershipRegistrationPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    additionalInfo: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const submitMutation = useSubmitMembershipRegistration();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitMutation.mutateAsync(formData);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        additionalInfo: '',
      });
    } catch (error) {
      console.error('Failed to submit registration:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (submitted) {
    return (
      <div className="container py-12 md:py-16 lg:py-20">
        <div className="max-w-2xl mx-auto">
          <Alert className="border-2 border-primary/50 bg-primary/5">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            <AlertTitle className="text-xl font-bold">Registration Submitted!</AlertTitle>
            <AlertDescription className="text-base mt-2">
              Thank you for registering with The Youth And Friends Organization. Your application has been received and will be reviewed by our team.
            </AlertDescription>
          </Alert>
          <div className="mt-8 text-center">
            <Button onClick={() => setSubmitted(false)} size="lg">
              Submit Another Registration
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12 md:py-16 lg:py-20">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mx-auto">
            <UserPlus className="h-8 w-8" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Membership <span className="text-primary">Registration</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Join The Youth And Friends Organization and become part of our vibrant community.
          </p>
        </div>

        {/* Admin Login Link */}
        <div className="flex justify-center">
          <Link to="/me">
            <Button variant="outline" size="sm">
              <Shield className="mr-2 h-4 w-4" />
              Admin Login
            </Button>
          </Link>
        </div>

        {/* Registration Form */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-2xl">Registration Form</CardTitle>
            <CardDescription className="text-base">
              Fill out the form below to apply for membership. All fields are required.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="0537190229"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address *</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your address"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="additionalInfo">Additional Information</Label>
                <Textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  placeholder="Tell us about your interests, why you want to join, or any questions you have..."
                  rows={5}
                />
              </div>

              {submitMutation.isError && (
                <Alert variant="destructive">
                  <AlertDescription>
                    Failed to submit registration. Please try again.
                  </AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={submitMutation.isPending}
              >
                {submitMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Registration'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
