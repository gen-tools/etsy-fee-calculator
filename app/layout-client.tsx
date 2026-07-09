'use client';

import { ThemeProvider } from './providers';
import Navigation from '@/src/components/Navigation';
import Footer from '@/src/components/Footer';
import CookieConsent from '@/src/components/CookieConsent';
import ScrollToTop from '@/src/components/ScrollToTop';
import { usePathname } from 'next/navigation';
import { PageRoute } from '@/src/types';

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Map pathname to PageRoute for compatibility with Navigation and Footer components
  let currentRoute: PageRoute = 'home';
  if (pathname === '/about') currentRoute = 'about';
  else if (pathname === '/contact') currentRoute = 'contact';
  else if (pathname === '/privacy-policy') currentRoute = 'privacy';
  else if (pathname === '/blog') currentRoute = 'blog';
  else if (pathname?.startsWith('/blog/')) currentRoute = 'blog-post';

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300">
        <Navigation currentRoute={currentRoute} />
        <main className="flex-grow">{children}</main>
        <CookieConsent />
        <ScrollToTop />
        <Footer currentRoute={currentRoute} />
      </div>
    </ThemeProvider>
  );
}
