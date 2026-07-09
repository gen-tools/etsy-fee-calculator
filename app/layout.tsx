import type { Metadata } from 'next';
import LayoutShell from './layout-client';
import './globals.css';

export const metadata: Metadata = {
  title: 'Etsy Fee Calculator 2026 | Calculate Etsy Fees & Profit',
  description: 'Calculate Etsy fees, profit, and seller earnings instantly. Estimate listing, transaction, payment processing, shipping, and digital product fees for free.',
  metadataBase: new URL(process.env.APP_URL || 'https://etsyfeecalc.com'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='24' fill='url(%23g)'/><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0%25' stop-color='%23f59e0b'/><stop offset='100%25' stop-color='%23ea580c'/></linearGradient></defs><text y='.75em' x='.18em' font-size='55' font-family='system-ui,sans-serif' font-weight='900' fill='white'>%25</text></svg>",
        type: 'image/svg+xml',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  if (typeof window !== 'undefined' && 'fetch' in window) {
                    const originalFetch = window.fetch;
                    let currentFetch = originalFetch;
                    Object.defineProperty(window, 'fetch', {
                      get() { return currentFetch; },
                      set(value) { currentFetch = value; },
                      configurable: true,
                      enumerable: true,
                    });
                  }
                } catch (e) {}
                try {
                  const stored = localStorage.getItem('theme-dark-enabled');
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (stored === 'true' || (!stored && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
