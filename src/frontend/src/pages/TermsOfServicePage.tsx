import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';

export default function TermsOfServicePage() {
  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-primary">Terms of Service</h1>
        <p className="text-muted-foreground mb-8">
          Last updated: February 5, 2026
        </p>

        <Card>
          <CardContent className="pt-6">
            <ScrollArea className="h-[600px] pr-4">
              <div className="space-y-6">
                <section>
                  <h2 className="text-2xl font-semibold mb-3">Agreement to Terms</h2>
                  <p className="text-muted-foreground">
                    By accessing or using The Youth And Friends Organization website and services, you agree to be bound by 
                    these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, 
                    you are prohibited from using or accessing this site.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-3">Use License</h2>
                  <p className="text-muted-foreground mb-3">
                    Permission is granted to temporarily access the materials (information or software) on The Youth And Friends 
                    Organization's website for personal, non-commercial transitory viewing only. This is the grant of a license, 
                    not a transfer of title, and under this license you may not:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>Modify or copy the materials</li>
                    <li>Use the materials for any commercial purpose or for any public display</li>
                    <li>Attempt to decompile or reverse engineer any software contained on the website</li>
                    <li>Remove any copyright or other proprietary notations from the materials</li>
                    <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-3">Membership and Registration</h2>
                  <p className="text-muted-foreground">
                    When you register for membership with The Youth And Friends Organization, you agree to provide accurate, 
                    current, and complete information. You are responsible for maintaining the confidentiality of your account 
                    information and for all activities that occur under your account.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-3">User Conduct</h2>
                  <p className="text-muted-foreground mb-3">
                    You agree not to use our services to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>Violate any applicable laws or regulations</li>
                    <li>Infringe upon the rights of others</li>
                    <li>Transmit any harmful, threatening, abusive, or offensive content</li>
                    <li>Interfere with or disrupt the services or servers</li>
                    <li>Attempt to gain unauthorized access to any portion of the website</li>
                    <li>Impersonate any person or entity</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-3">Intellectual Property</h2>
                  <p className="text-muted-foreground">
                    The content, organization, graphics, design, compilation, and other matters related to the website are 
                    protected under applicable copyrights, trademarks, and other proprietary rights. The copying, redistribution, 
                    use, or publication of any such matters or any part of the website is prohibited without our express written permission.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-3">Disclaimer</h2>
                  <p className="text-muted-foreground">
                    The materials on The Youth And Friends Organization's website are provided on an 'as is' basis. We make no 
                    warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without 
                    limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or 
                    non-infringement of intellectual property or other violation of rights.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-3">Limitations of Liability</h2>
                  <p className="text-muted-foreground">
                    In no event shall The Youth And Friends Organization or its suppliers be liable for any damages (including, 
                    without limitation, damages for loss of data or profit, or due to business interruption) arising out of the 
                    use or inability to use the materials on our website, even if we or our authorized representative has been 
                    notified orally or in writing of the possibility of such damage.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-3">Links to Third-Party Sites</h2>
                  <p className="text-muted-foreground">
                    Our website may contain links to third-party websites or services that are not owned or controlled by 
                    The Youth And Friends Organization. We have no control over, and assume no responsibility for, the content, 
                    privacy policies, or practices of any third-party websites or services.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-3">Termination</h2>
                  <p className="text-muted-foreground">
                    We may terminate or suspend your access to our services immediately, without prior notice or liability, 
                    for any reason whatsoever, including without limitation if you breach these Terms of Service.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-3">Governing Law</h2>
                  <p className="text-muted-foreground">
                    These terms shall be governed and construed in accordance with the laws of the jurisdiction in which 
                    The Youth And Friends Organization operates, without regard to its conflict of law provisions.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-3">Changes to Terms</h2>
                  <p className="text-muted-foreground">
                    We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision 
                    is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What 
                    constitutes a material change will be determined at our sole discretion.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-3">Contact Information</h2>
                  <p className="text-muted-foreground">
                    If you have any questions about these Terms of Service, please contact us at:
                  </p>
                  <div className="mt-3 text-muted-foreground">
                    <p>Email: theyouthandfriendsorganization@gmail.com</p>
                    <p>Phone: 0537190229</p>
                  </div>
                </section>

                <div className="pt-6 border-t">
                  <p className="text-sm text-muted-foreground italic">
                    Note: This is a template Terms of Service document. Please review and customize it according to your 
                    organization's specific needs and applicable laws in your jurisdiction. Consider consulting with a legal 
                    professional to ensure compliance with all relevant regulations.
                  </p>
                </div>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
