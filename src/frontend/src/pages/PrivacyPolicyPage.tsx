import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PrivacyPolicyPage() {
  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-primary">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">
          Last updated: February 5, 2026
        </p>

        <Card>
          <CardContent className="pt-6">
            <ScrollArea className="h-[600px] pr-4">
              <div className="space-y-6">
                <section>
                  <h2 className="text-2xl font-semibold mb-3">Introduction</h2>
                  <p className="text-muted-foreground">
                    The Youth And Friends Organization ("we," "our," or "us") is committed to protecting your privacy. 
                    This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you 
                    visit our website and use our services.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-3">Information We Collect</h2>
                  <p className="text-muted-foreground mb-3">
                    We may collect information about you in a variety of ways. The information we may collect includes:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>Personal Data: Name, email address, phone number, and mailing address when you register for membership or contact us.</li>
                    <li>Usage Data: Information about how you access and use our website, including your IP address, browser type, and pages visited.</li>
                    <li>Cookies and Tracking Technologies: We may use cookies and similar tracking technologies to track activity on our website.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-3">How We Use Your Information</h2>
                  <p className="text-muted-foreground mb-3">
                    We use the information we collect in the following ways:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>To process membership registrations and manage your account</li>
                    <li>To communicate with you about programs, events, and updates</li>
                    <li>To improve our website and services</li>
                    <li>To respond to your inquiries and provide customer support</li>
                    <li>To comply with legal obligations</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-3">Disclosure of Your Information</h2>
                  <p className="text-muted-foreground">
                    We may share information we have collected about you in certain situations. Your information may be 
                    disclosed as follows:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mt-3">
                    <li>By Law or to Protect Rights: If we believe disclosure is necessary to comply with legal obligations or protect our rights.</li>
                    <li>Third-Party Service Providers: We may share your information with third parties that perform services for us.</li>
                    <li>With Your Consent: We may disclose your information for any other purpose with your consent.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-3">Security of Your Information</h2>
                  <p className="text-muted-foreground">
                    We use administrative, technical, and physical security measures to help protect your personal information. 
                    While we have taken reasonable steps to secure the personal information you provide to us, please be aware 
                    that no security measures are perfect or impenetrable.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-3">Your Data Protection Rights</h2>
                  <p className="text-muted-foreground mb-3">
                    Depending on your location, you may have the following rights regarding your personal information:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>The right to access – You have the right to request copies of your personal data.</li>
                    <li>The right to rectification – You have the right to request that we correct any information you believe is inaccurate.</li>
                    <li>The right to erasure – You have the right to request that we erase your personal data, under certain conditions.</li>
                    <li>The right to restrict processing – You have the right to request that we restrict the processing of your personal data.</li>
                    <li>The right to data portability – You have the right to request that we transfer your data to another organization.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-3">Children's Privacy</h2>
                  <p className="text-muted-foreground">
                    Our services are intended for individuals who are at least 13 years old. We do not knowingly collect 
                    personal information from children under 13. If you are a parent or guardian and believe your child has 
                    provided us with personal information, please contact us.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-3">Changes to This Privacy Policy</h2>
                  <p className="text-muted-foreground">
                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new 
                    Privacy Policy on this page and updating the "Last updated" date at the top of this Privacy Policy.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-3">Contact Us</h2>
                  <p className="text-muted-foreground">
                    If you have questions or comments about this Privacy Policy, please contact us at:
                  </p>
                  <div className="mt-3 text-muted-foreground">
                    <p>Email: theyouthandfriendsorganization@gmail.com</p>
                    <p>Phone: 0537190229</p>
                  </div>
                </section>

                <div className="pt-6 border-t">
                  <p className="text-sm text-muted-foreground italic">
                    Note: This is a template Privacy Policy. Please review and customize it according to your organization's 
                    specific practices and applicable laws in your jurisdiction. Consider consulting with a legal professional 
                    to ensure compliance with all relevant privacy regulations.
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
