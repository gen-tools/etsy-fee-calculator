import { Metadata } from 'next';
import Link from 'next/link';
import FeeCalculator from '@/src/components/FeeCalculator';
import EtsyGuide from '@/src/components/EtsyGuide';
import { REGIONS } from '@/src/data/regions';
import { BLOG_POSTS } from '@/src/data/blogPosts';
import { Calculator, Percent, ChevronRight, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Etsy Fee Calculator 2026 | Calculate Etsy Fees & Profit',
  description: 'Calculate Etsy fees, profit, and seller earnings instantly. Estimate listing, transaction, payment processing, shipping, and digital product fees for free.',
  alternates: {
    canonical: '/',
  },
};

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function HomePage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const selectedRegion = typeof resolvedParams.location === 'string' ? resolvedParams.location : 'US';

  return (
    <div className="space-y-16 py-12 md:py-16">
      {/* HOME SECTION 1: Gradient Hero */}
      <header className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center" id="home-hero">
        <span className="text-xs font-bold font-mono text-orange-500 uppercase tracking-widest bg-orange-50 dark:bg-orange-950/40 px-3.5 py-2 rounded-full border border-orange-100 dark:border-orange-900/40">
          ⭐ Rated #1 Etsy Fee Calculator for 2026
        </span>
        <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-950 dark:text-white mt-5 max-w-4xl mx-auto leading-none">
          Etsy Fee Calculator
        </h1>
        <p className="mt-5 text-sm sm:text-base md:text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Take complete control of your e-commerce pricing. Calculate listing renewals, transaction commissions, regional card processing, and offsite ad rates to protect your margins and scale your profits instantly.
        </p>
      </header>

      {/* HOME SECTION 2: Sticky Calculator + Outputs Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FeeCalculator initialRegionCode={selectedRegion} />
      </section>

      {/* HOME SECTION 3: Etsy Fee Calculator Guide Content */}
      <EtsyGuide />

      {/* HOME SECTION 4: Related Regional Calculators selection */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center no-print" id="regional-links-section">
        <div className="bg-slate-100 dark:bg-slate-900/60 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800">
          <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
            Need a Specific Location?
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 max-w-md mx-auto">
            Click on any region below to instantly reload the calculator with default fees adjusted for that country&apos;s currency.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            {Object.entries(REGIONS).map(([code, region]) => (
              <Link
                key={code}
                href={`/?location=${code}`}
                className={`flex items-center space-x-1.5 rounded-xl border px-4 py-2.5 text-xs font-bold cursor-pointer transition-all duration-150 ${
                  selectedRegion === code
                    ? 'bg-orange-500 border-orange-600 text-white shadow-md'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-300 dark:hover:border-slate-700'
                }`}
                id={`regional-selector-${code}`}
              >
                <span className="font-mono uppercase text-[9px] bg-slate-100 dark:bg-slate-900 text-slate-500 px-1.5 py-0.5 rounded mr-1">
                  {code}
                </span>
                <span>Etsy {region.name} Calculator</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* HOME SECTION 8: Latest Blog Posts Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 no-print">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-3">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-950 dark:text-white">
              Latest Seller Knowledge Articles
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Stay educated with our deep dives on e-commerce, transaction mathematics, and pricing policies.
            </p>
          </div>
          <Link
            href="/blog"
            className="text-sm font-bold text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-350 flex items-center gap-0.5 cursor-pointer self-start sm:self-center"
            id="home-blog-more-btn"
          >
            <span>Browse All Guides</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.slice(0, 3).map((post) => (
            <Link
              href={`/blog/${post.slug}`}
              key={post.slug}
              className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden hover:shadow-md transition-all group cursor-pointer flex flex-col h-full justify-between"
            >
              <div>
                <div className="h-44 overflow-hidden relative bg-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-3 left-3 bg-slate-900/90 text-white font-mono text-[9px] font-bold uppercase px-2 py-0.5 rounded backdrop-blur-sm">
                    {post.category}
                  </span>
                </div>
                <div className="p-5 space-y-2">
                  <p className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-orange-500" />
                    {post.readingTime}
                  </p>
                  <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white group-hover:text-orange-500 transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {post.description}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-3 border-t border-slate-50 dark:border-slate-850/40 text-[11px] font-semibold text-slate-500 flex items-center justify-between mt-auto">
                <span>{post.date}</span>
                <span className="text-orange-600 dark:text-orange-400 group-hover:translate-x-0.5 transition-transform duration-150 flex items-center gap-0.5 font-bold">
                  Read Guide
                  <ChevronRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* HOME SECTION 9: CTA */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 no-print" id="home-cta">
        <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-3xl p-8 sm:p-12 text-center text-white shadow-xl shadow-orange-500/15 relative overflow-hidden">
          <div className="absolute -left-12 -top-12 h-36 w-36 rounded-full bg-white/5 blur-2xl"></div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
            Stop Guessing. Know Your Profit Margin.
          </h2>
          <p className="mt-3 text-sm text-orange-100 max-w-xl mx-auto leading-relaxed">
            Join thousands of high-volume Etsy sellers who protect their hard-earned revenues with our audited, real-time transaction ledger. Plan your prices with absolute financial clarity today.
          </p>
          <Link
            href="#etsy-fee-calculator-app"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-white hover:bg-slate-50 px-6 py-3.5 text-sm font-bold text-orange-600 transition-all shadow-lg cursor-pointer hover:scale-101 active:scale-99"
            id="home-cta-scroll-btn"
          >
            <Calculator className="h-4.5 w-4.5" />
            <span>Configure Calculator Inputs Now</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
