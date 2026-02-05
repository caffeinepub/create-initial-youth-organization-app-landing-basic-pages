import { Outlet } from '@tanstack/react-router';
import TopNav from '../components/TopNav';
import Footer from '../components/Footer';

export default function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <TopNav />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
