import { createRouter, RouterProvider, createRoute, createRootRoute } from '@tanstack/react-router';
import { useEffect } from 'react';
import AppLayout from './layouts/AppLayout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProgramsPage from './pages/ProgramsPage';
import EventsPage from './pages/EventsPage';
import ContactPage from './pages/ContactPage';
import ClubsPage from './pages/ClubsPage';
import ClubDetailPage from './pages/ClubDetailPage';
import HistoryPage from './pages/HistoryPage';
import MembershipRegistrationPage from './pages/MembershipRegistrationPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminHistoryEditorPage from './pages/AdminHistoryEditorPage';
import AdminMembershipReviewPage from './pages/AdminMembershipReviewPage';
import AdminClubsManagerPage from './pages/AdminClubsManagerPage';
import AdminSocialLinksPage from './pages/AdminSocialLinksPage';
import AdminAboutPage from './pages/AdminAboutPage';
import AdminHomePageEditorPage from './pages/AdminHomePageEditorPage';
import AdminBrandingPage from './pages/AdminBrandingPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import { updateSeoUrls } from './utils/seo';
import { injectAdSenseScript } from './utils/adsense';

const rootRoute = createRootRoute({
  component: AppLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: AboutPage,
});

const programsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/programs',
  component: ProgramsPage,
});

const eventsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/events',
  component: EventsPage,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: ContactPage,
});

const clubsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/clubs',
  component: ClubsPage,
});

const clubDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/clubs/$clubId',
  component: ClubDetailPage,
});

const historyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/history',
  component: HistoryPage,
});

const membershipRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/membership',
  component: MembershipRegistrationPage,
});

const privacyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/privacy',
  component: PrivacyPolicyPage,
});

const termsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/terms',
  component: TermsOfServicePage,
});

const adminLoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/me',
  component: AdminLoginPage,
});

const adminDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/me/dashboard',
  component: AdminDashboardPage,
});

const adminBrandingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/me/branding',
  component: AdminBrandingPage,
});

const adminHistoryEditorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/me/history-editor',
  component: AdminHistoryEditorPage,
});

const adminMembershipReviewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/me/membership-review',
  component: AdminMembershipReviewPage,
});

const adminClubsManagerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/me/clubs',
  component: AdminClubsManagerPage,
});

const adminSocialLinksRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/me/social-links',
  component: AdminSocialLinksPage,
});

const adminAboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/me/about',
  component: AdminAboutPage,
});

const adminHomePageEditorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/me/home',
  component: AdminHomePageEditorPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  programsRoute,
  eventsRoute,
  contactRoute,
  clubsRoute,
  clubDetailRoute,
  historyRoute,
  membershipRoute,
  privacyRoute,
  termsRoute,
  adminLoginRoute,
  adminDashboardRoute,
  adminBrandingRoute,
  adminHistoryEditorRoute,
  adminMembershipReviewRoute,
  adminClubsManagerRoute,
  adminSocialLinksRoute,
  adminAboutRoute,
  adminHomePageEditorRoute,
]);

const router = createRouter({ routeTree });

// Subscribe to router navigation changes to update SEO URLs
router.subscribe('onLoad', ({ toLocation }) => {
  updateSeoUrls(toLocation.pathname);
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  // Update SEO URLs and inject AdSense on initial load
  useEffect(() => {
    updateSeoUrls(window.location.pathname);
    injectAdSenseScript();
  }, []);

  return <RouterProvider router={router} />;
}
