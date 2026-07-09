import { Metadata } from 'next';
import { Shield, Eye, Lock, FileText, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy & CCPA compliance - EtsyFeeCalc',
  description: 'Understand how we protect your handmade storefront business data. Read our CCPA, GDPR, cookies, secure 256-bit pricing encryption, and zero tracking guarantees.',
  alternates: {
    canonical: '/privacy-policy',
  },
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 animate-in fade-in slide-in-from-bottom-5 duration-300" id="privacy-page">
      {/* Header section */}
      <header className="text-center mb-16">
        <span className="text-xs font-bold font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-widest bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1.5 rounded-full">
          CCPA & GDPR Audited
        </span>
        <h1 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-4">
          Privacy Policy & Data Safeguards
        </h1>
        <p className="mt-4 text-base text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
          Effective Date: January 1, 2026. We respect your business privacy. Read how we protect your e-commerce calculation history and listing parameter inputs with bank-grade encryption protocols.
        </p>
      </header>

      {/* Trust Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col space-y-2">
          <Eye className="h-6 w-6 text-emerald-500" />
          <h2 className="font-display text-sm font-bold text-slate-900 dark:text-white">No Registration Required</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            We never force you to register an account or link your Etsy shop to use our calculations. Your calculations remain yours alone.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col space-y-2">
          <Lock className="h-6 w-6 text-emerald-500" />
          <h2 className="font-display text-sm font-bold text-slate-900 dark:text-white">Local Storage Architecture</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            All custom inputs and calculations are processed on your local device. We never store your transaction details on our servers.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col space-y-2">
          <Shield className="h-6 w-6 text-emerald-500" />
          <h2 className="font-display text-sm font-bold text-slate-900 dark:text-white">No Selling of Business Data</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            We comply fully with CCPA standards. We never rent, distribute, or sell your product pricing configurations or earnings history to third parties.
          </p>
        </div>
      </section>

      {/* Policy Details */}
      <section className="prose dark:prose-invert max-w-none space-y-8 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
        <div className="space-y-3">
          <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="h-5 w-5 text-emerald-500" />
            1. Information We Collect
          </h2>
          <p>
            When you visit our website, we do not require you to supply any personally identifiable information (PII). We only process the product parameters, quantities, ad ratios, and shipping charges that you enter into our calculation module. These numbers are handled entirely in your browser&apos;s memory via client-side javascript routines and are discarded when you close the tab unless saved to your local browser storage.
          </p>
          <p>
            If you contact us using our contact form, we collect your name, email address, and ticket content so that we can respond to your request. This data is handled via secure SSL channels and is deleted after the ticket is resolved.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-emerald-500" />
            2. Cookie Policy & Advertising Consent
          </h2>
          <p>
            We use minimal cookies to save your regional preference selection (such as UK, US, or CA layouts) and to remember if you have agreed to our cookie policy banner.
          </p>
          <p>
            We may partner with third-party networks (such as Google AdSense) to display relevant banner ads that keep this calculator free. These advertising partners may use cookies or web beacons to serve ads based on your visit to this site. You can choose to disable or selectively turn off our cookies in your browser settings.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Shield className="h-5 w-5 text-emerald-500" />
            3. California Consumer Privacy Act (CCPA) Rights
          </h2>
          <p>
            If you are a California resident, you have the right to request that we disclose what personal data we collect, use, and share. Since we do not collect or store any PII during your calculations, we do not compile databases of user parameters.
          </p>
          <p>
            Furthermore, you have the right to opt-out of the &quot;sale&quot; of your personal information. We do not sell your personal information. If you wish to ensure that your local storage history is wiped, you can simply clear your browser cache or click the &quot;Reset Calculator&quot; option in the app layout.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Lock className="h-5 w-5 text-emerald-500" />
            4. Security of Data Transmission
          </h2>
          <p>
            We deploy secure 256-bit Pricing Model Data Encryption on all our servers to protect any data in transit. Even if you use our URL sharing feature to email your calculations to a business partner, the parameters are embedded in the browser URL hash fragment, meaning they never travel to our backend servers as plain database records.
          </p>
        </div>

        <div className="space-y-3 border-t border-slate-200 dark:border-slate-800 pt-8">
          <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
            5. Contact Privacy Officers
          </h2>
          <p>
            For any queries regarding GDPR, CCPA, or data security, please feel free to email our privacy compliance team at <strong>sa0663787@gmail.com</strong>.
          </p>
        </div>
      </section>
    </article>
  );
}
