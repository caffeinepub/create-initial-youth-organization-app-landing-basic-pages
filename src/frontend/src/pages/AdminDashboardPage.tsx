import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';
import { useAdminSession } from '@/hooks/useAdminSession';
import { BookOpen, Users, LogOut, Shield, Sparkles, Share2, Info, Home } from 'lucide-react';
import { AdminGuard } from '@/components/AdminGuard';

function AdminDashboardContent() {
  const { logout } = useAdminSession();

  return (
    <div className="container py-12 md:py-16 lg:py-20">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Shield className="h-6 w-6" />
              </div>
              <h1 className="text-4xl font-bold tracking-tight">
                Admin <span className="text-primary">Dashboard</span>
              </h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Manage your organization's content and review membership applications
            </p>
          </div>
          <Button variant="outline" onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Admin Tools */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                <Home className="h-6 w-6" />
              </div>
              <CardTitle className="text-2xl">Home Page</CardTitle>
              <CardDescription className="text-base">
                Customize the home page "What We Do" section with your own content and images.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/me/home">
                <Button className="w-full">Edit Home Page</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                <Info className="h-6 w-6" />
              </div>
              <CardTitle className="text-2xl">About</CardTitle>
              <CardDescription className="text-base">
                Manage About content including Community Building, Skill Development, Events & Activities, and links.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/me/about">
                <Button className="w-full">Edit About</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                <BookOpen className="h-6 w-6" />
              </div>
              <CardTitle className="text-2xl">History Editor</CardTitle>
              <CardDescription className="text-base">
                Add or edit the organization's history content that appears on the public History page.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/me/history-editor">
                <Button className="w-full">Edit History</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                <Users className="h-6 w-6" />
              </div>
              <CardTitle className="text-2xl">Membership Review</CardTitle>
              <CardDescription className="text-base">
                Review and manage membership registration submissions from new applicants.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/me/membership-review">
                <Button className="w-full">Review Applications</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                <Sparkles className="h-6 w-6" />
              </div>
              <CardTitle className="text-2xl">Minor Clubs Manager</CardTitle>
              <CardDescription className="text-base">
                Create, edit, and manage information about each minor club including aims, motto, and activities.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/me/clubs">
                <Button className="w-full">Manage Clubs</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                <Share2 className="h-6 w-6" />
              </div>
              <CardTitle className="text-2xl">Social Media Links</CardTitle>
              <CardDescription className="text-base">
                Manage your organization's social media accounts and update links displayed on the website.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/me/social-links">
                <Button className="w-full">Manage Links</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <AdminGuard>
      <AdminDashboardContent />
    </AdminGuard>
  );
}
