import { SiFacebook, SiInstagram, SiX, SiLinkedin, SiYoutube, SiTiktok, SiWhatsapp } from 'react-icons/si';
import { Heart } from 'lucide-react';
import { useGetSocialMediaLinks } from '@/hooks/useQueries';

export default function Footer() {
  const { data: socialLinks } = useGetSocialMediaLinks();

  const socialPlatforms = [
    { name: 'Facebook', icon: SiFacebook, url: socialLinks?.facebook, label: 'Facebook' },
    { name: 'Instagram', icon: SiInstagram, url: socialLinks?.instagram, label: 'Instagram' },
    { name: 'X', icon: SiX, url: socialLinks?.twitter, label: 'X (Twitter)' },
    { name: 'LinkedIn', icon: SiLinkedin, url: socialLinks?.linkedin, label: 'LinkedIn' },
    { name: 'YouTube', icon: SiYoutube, url: socialLinks?.youtube, label: 'YouTube' },
    { name: 'TikTok', icon: SiTiktok, url: socialLinks?.tiktok, label: 'TikTok' },
    { name: 'WhatsApp', icon: SiWhatsapp, url: socialLinks?.whatsapp, label: 'WhatsApp' },
  ];

  const activeSocialLinks = socialPlatforms.filter((platform) => platform.url && platform.url.trim() !== '');

  return (
    <footer className="border-t border-border/40 bg-muted/30">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/assets/generated/yfo-logo.dim_512x512.png"
                alt="The Youth And Friends Organization Logo"
                className="h-10 w-10 rounded-lg"
              />
              <span className="text-xl font-bold text-primary">YFO</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Empowering young people to reach their full potential through
              community, learning, and growth.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="/about" className="hover:text-primary transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/programs" className="hover:text-primary transition-colors">
                  Our Programs
                </a>
              </li>
              <li>
                <a href="/clubs" className="hover:text-primary transition-colors">
                  Clubs
                </a>
              </li>
              <li>
                <a href="/history" className="hover:text-primary transition-colors">
                  History
                </a>
              </li>
              <li>
                <a href="/membership" className="hover:text-primary transition-colors">
                  Membership
                </a>
              </li>
              <li>
                <a href="/events" className="hover:text-primary transition-colors">
                  Upcoming Events
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-primary transition-colors">
                  Get in Touch
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Connect With Us</h3>
            {activeSocialLinks.length > 0 ? (
              <div className="flex gap-3 flex-wrap">
                {activeSocialLinks.map((platform) => {
                  const Icon = platform.icon;
                  return (
                    <a
                      key={platform.name}
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                      aria-label={platform.label}
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Social media links will appear here once configured.
              </p>
            )}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/40 text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-1 flex-wrap">
            © 2026. Built with{' '}
            <Heart className="h-4 w-4 text-primary fill-primary" /> using{' '}
            <a
              href="https://caffeine.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
