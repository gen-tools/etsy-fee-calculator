/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ShieldCheck, Mail, MapPin } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 animate-in fade-in slide-in-from-bottom-5 duration-300" id="privacy-policy-page">
      {/* Header section */}
      <header className="mb-12 border-b border-slate-100 dark:border-slate-800 pb-6">
        <span className="text-xs font-bold font-mono text-orange-500 uppercase tracking-widest bg-orange-50 dark:bg-orange-950/40 px-3 py-1.5 rounded-full flex items-center gap-1.5 w-fit">
          <ShieldCheck className="h-4 w-4" />
          Regulatory Compliance
        </span>
        <h1 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-4">
          Privacy Policy & Cookie Disclosures
        </h1>
        <p className="mt-2 text-xs text-slate-400 font-mono">
          Last Updated: July 9, 2026 | Effective Date: January 1, 2026
        </p>
      </header>

      {/* Main Legal Content Container */}
      <div className="markdown-body space-y-8 leading-relaxed text-slate-600 dark:text-slate-300">
        
        <section className="space-y-3">
          <h2>1. Overview and Scope</h2>
          <p>
            Welcome to EtsyFeeCalc. This Privacy Policy outlines our strict protocols regarding the collection, storage, usage, and safeguarding of any information when you visit and interact with our web platform (including all calculators, tools, blog articles, and contact structures). 
          </p>
          <p>
            Your trust is our most valuable asset. We do not sell your personal or financial data. This platform functions primarily as a local client-side calculating utility, ensuring that your inputs (such as pricing, shipping charges, and material costs) are processed instantly on your own machine.
          </p>
        </section>

        <section className="space-y-3">
          <h2>2. Information We Collect</h2>
          <p>
            We process two categories of data:
          </p>
          <ul>
            <li>
              <strong>Non-Personal Input Data:</strong> The numerical figures you type into our calculator fields (item prices, costs, locations) are used strictly to run local calculation simulations. These parameters are not transmitted to or stored on our servers unless you explicitly share results using our custom parameter links.
            </li>
            <li>
              <strong>Voluntarily Provided Personal Data:</strong> When you contact our support team using our secure contact interface, we collect your name, email address, and any details you provide inside your message. This data is used solely to respond to your ticket.
            </li>
            <li>
              <strong>Technical Usage Logs:</strong> To maintain secure operation and page responsiveness, we automatically capture minimal technical metadata such as IP addresses, web browser agents, and time stamp queries.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2>3. Cookies and Tracking Mechanisms</h2>
          <p>
            Cookies are small cryptographic files stored on your local browser folder. We utilize cookies for two core purposes:
          </p>
          <ol>
            <li>
              <strong>Utility State Synchronization:</strong> Remembering your local theme preferences (light/dark mode) and your primary region setting so you do not have to reset them on subsequent visits.
            </li>
            <li>
              <strong>Aggregated Web Performance:</strong> Understanding which blog articles are popular and tracking general user interactions to optimize core loading speeds.
            </li>
          </ol>
          <p>
            You can disable cookies at any time inside your browser settings or reject tracking flags in our cookie consent banner.
          </p>
        </section>

        <section className="space-y-3">
          <h2>4. Third-Party Analytics and Advertising</h2>
          <p>
            We partner with reliable third-party networks (such as Google Analytics and Google AdSense) to keep our platform free for creators. These services use cookies to deliver contextually relevant advertisements and analyze aggregate user patterns.
          </p>
          <p>
            Our partners adhere strictly to the Digital Advertising Alliance (DAA) standards. You can choose to opt out of personalized third-party ad targeting by visiting the official Google Ads Settings dashboards.
          </p>
        </section>

        <section className="space-y-3">
          <h2>5. GDPR and CCPA Compliance</h2>
          <p>
            We extend bank-grade privacy rights to all users globally. Depending on your home country (specifically inside the European Economic Area under GDPR and California under CCPA), you possess the following legal rights:
          </p>
          <ul>
            <li><strong>Right to Know:</strong> Review exactly what personal data we have recorded.</li>
            <li><strong>Right to Erasure (Forget Me):</strong> Request that we purge all personal details or message records from our support servers.</li>
            <li><strong>Right to Opt Out:</strong> Instruct us to stop processing analytics or ad targeting flags immediately.</li>
          </ul>
          <p>
            To activate any of these privacy safeguards, please transmit a digital request to our chief data protection officer at <strong>support@etsy-fee-calculator-c.vercel.app</strong>.
          </p>
        </section>

        <section className="space-y-3">
          <h2>6. Data Protection Protocols</h2>
          <p>
            All communications with our server, including contact messages and support tickets, are encrypted in transit using industry-standard **256-bit TLS (Transport Layer Security)**. We host our assets in highly secure, containerized cloud services that undergo regular vulnerability testing and security scans to prevent data breaches.
          </p>
        </section>

        <section className="space-y-3">
          <h2>7. Contact Information</h2>
          <p>
            If you have any questions about this privacy statement, please contact us at:
          </p>
          <div className="bg-slate-50 dark:bg-slate-950 p-5 rounded-2xl border border-slate-100 dark:border-slate-900 font-sans text-xs space-y-2 mt-4">
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-orange-500" />
              <span>support@etsy-fee-calculator-c.vercel.app</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-orange-500" />
              <span>Data Protection Officer, 140 2nd St, Suite 300, San Francisco, CA 94107</span>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}
