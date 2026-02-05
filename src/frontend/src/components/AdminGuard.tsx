import { ReactNode, useEffect } from 'react';
import { useAdminSession } from '@/hooks/useAdminSession';
import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShieldAlert } from 'lucide-react';

interface AdminGuardProps {
  children: ReactNode;
}

export function AdminGuard({ children }: AdminGuardProps) {
  const { isAdmin } = useAdminSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) {
      navigate({ to: '/me' });
    }
  }, [isAdmin, navigate]);

  if (!isAdmin) {
    return (
      <div className="container py-12 md:py-16 lg:py-20">
        <div className="max-w-2xl mx-auto">
          <Card className="border-2 border-destructive/50">
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-destructive/10 text-destructive mb-4">
                <ShieldAlert className="h-6 w-6" />
              </div>
              <CardTitle className="text-2xl">Access Denied</CardTitle>
              <CardDescription className="text-base">
                You need to be logged in as an administrator to access this page.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => navigate({ to: '/me' })}>
                Go to Login
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
