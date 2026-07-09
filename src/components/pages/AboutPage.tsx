/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PageRoute } from '../../types';
import { ShieldCheck, Target, Calculator, UserCheck, Mail } from 'lucide-react';

interface AboutPageProps {
  setRoute: (route: PageRoute) => void;
}

export default function AboutPage({ setRoute }: AboutPageProps) {
  return (
    <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 animate-in fade-in slide-in-from-bottom-5 duration-300" id="about-page">
      {/* Header section */}
      <header className="text-center mb-16">
        <span className="text-xs font-bold font-mono text-orange-500 uppercase tracking-widest bg-orange-50 dark:bg-orange-950/40 px-3 py-1.5 rounded-full">
          About EtsyFeeCalc
        </span>
        <h1 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-4">
          Empowering Etsy Sellers with Absolute Financial Clarity
        </h1>
        <p className="mt-4 text-base md:text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          We build robust, mathematical tools to help handmade craft artists, vintage collectors, and digital creators understand their numbers, set profitable prices, and succeed on Etsy.
        </p>
      </header>

      {/* Grid: Core value pillars */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col space-y-3">
          <div className="h-10 w-10 rounded-xl bg-orange-100 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 flex items-center justify-center">
            <Target className="h-5 w-5" />
          </div>
          <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">Our Mission</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Many independent makers shut down within their first year, not due to lack of talent, but because they miscalculate their platform fees and underprice their inventory. Our mission is to bridge this accounting gap, turning complex formulas into intuitive, real-time insights.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col space-y-3">
          <div className="h-10 w-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">Our Accuracy Statement</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Etsy's fee standard is a moving target. Our algorithm is regularly audited and synchronized to match the latest April 2026 transaction rates, regional card-swiping guidelines, sales tax structures, and currency exchange surcharges.
          </p>
        </div>
      </section>

      {/* Narrative Section: Why We Built This */}
      <section className="prose dark:prose-invert max-w-none mb-16 space-y-6">
        <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Why We Built This Calculator</h2>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          As former e-commerce sellers ourselves, we remembers the frustration of looking at our monthly Etsy payment ledger. The list of small deductions—$0.20 renewal here, 6.5% transaction fee there, 3% card swipe over here—made it incredibly tedious to calculate the actual net profit of our sales.
        </p>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          We realized that simple spreadsheets often overlook critical variables like multi-quantity renewal rules, sales tax processing bases, and offsite advertising surcharges. We built this interactive, single-page calculator in 2026 to offer a seamless, high-performance interface that solves these complex variables in real-time.
        </p>
      </section>

      {/* Narrative Section: How calculations work */}
      <section className="bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-900 rounded-3xl p-6 sm:p-8 mb-16">
        <div className="flex items-start space-x-4">
          <div className="h-10 w-10 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center shrink-0">
            <Calculator className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">How Our Calculations Work</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
              When you enter your product parameters, our calculator performs a sequential multi-stage transaction simulation:
            </p>
            <ul className="list-disc pl-5 mt-3 space-y-1.5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              <li>Applies any item-level discounts (percentage or flat currency) to determine the baseline item listing subtotal.</li>
              <li>Multiplies the discounted subtotal by the quantity sold to establish the product gross revenue.</li>
              <li>Computes Etsy's 6.5% transaction commission on the sum of product revenues, shipping charged, and customization fees.</li>
              <li>Incorporates the regional card payment processing rate (such as 3.0% + $0.25 in the US) on top of the buyer's invoice total (including estimated sales tax).</li>
              <li>Subtracts raw material COGS and actual postage expenses to calculate the final net profit, ROI, and break-even item pricing.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Meet the creator profile */}
      <section className="border-t border-slate-200 dark:border-slate-800 pt-12 flex flex-col sm:flex-row items-center gap-6 mb-16 text-center sm:text-left">
        <div className="h-20 w-20 rounded-full bg-gradient-to-tr from-orange-400 to-indigo-500 p-1 shrink-0">
          <div className="h-full w-full rounded-full bg-slate-900 flex items-center justify-center text-white font-display font-bold text-xl">
            SJ
          </div>
        </div>
        <div>
          <h4 className="font-display text-lg font-bold text-slate-900 dark:text-white flex items-center justify-center sm:justify-start gap-1.5">
            <UserCheck className="h-4.5 w-4.5 text-orange-500" />
            Sarah Jenkins, Founder & Chief Auditor
          </h4>
          <p className="text-xs font-mono text-orange-500 uppercase tracking-wider font-semibold mt-0.5">
            E-commerce Accountant & Handcraft Enthusiast
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
            Sarah has spent over a decade helping creative entrepreneurs scale their digital storefronts. She audits our pricing models daily to guarantee that EtsyFeeCalc remains the most precise e-commerce ledger simulation on the web.
          </p>
        </div>
      </section>

      {/* CTA section */}
      <section className="bg-gradient-to-r from-orange-500 to-red-600 rounded-3xl p-8 text-center text-white shadow-xl shadow-orange-500/10">
        <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight">
          Have Questions or Feedback?
        </h2>
        <p className="mt-2 text-sm text-orange-100 max-w-lg mx-auto">
          We love hearing from creative business owners! If you find a regional rate that needs updating or want to suggest a feature, let us know.
        </p>
        <button
          onClick={() => setRoute('contact')}
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-white hover:bg-slate-50 px-5 py-3 text-sm font-bold text-orange-600 transition-all cursor-pointer"
          id="about-cta-contact"
        >
          <Mail className="h-4 w-4" />
          <span>Contact Our Support Team</span>
        </button>
      </section>
    </article>
  );
}
