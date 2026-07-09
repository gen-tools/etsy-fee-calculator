import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import LayoutShell from './layout-client';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Etsy Fee Calculator 2026 | Calculate Etsy Fees & Profit',
  description: 'Calculate Etsy fees, profit, and seller earnings instantly. Estimate listing, transaction, payment processing, shipping, and digital product fees for free.',
  metadataBase: new URL(process.env.APP_URL || 'https://etsy-fee-calculator-c.vercel.app'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: 'iYhD3GQqnatWWaAejnJSUeiLbpnq0YaYmKEM0v3DbxI',
  },
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='24' fill='url(%23g)'/><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0%25' stop-color='%23f59e0b'/><stop offset='100%25' stop-color='%23ea580c'/></linearGradient></defs><text x='50' y='52' font-size='58' font-family='system-ui,sans-serif' font-weight='900' fill='white' text-anchor='middle' dominant-baseline='central'>%25</text></svg>",
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
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
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
