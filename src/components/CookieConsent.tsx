"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { X, ShieldCheck } from 'lucide-react';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent-accepted');
    if (!consent) {
      // Small delay for natural layout loading
      const timer = setTimeout(() => {
        setVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent-accepted', 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div 
      className="fixed bottom-4 left-4 right-4 z-50 max-w-md bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-2xl text-slate-300 md:left-auto md:right-4 transition-all duration-300 animate-in fade-in slide-in-from-bottom-5 no-print"
      id="cookie-consent-banner"
    >
      <div className="flex items-start space-x-3.5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
          <ShieldCheck className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold font-display text-white">We Respect Your Privacy</h4>
          <p className="mt-1 text-xs leading-relaxed text-slate-400">
            We use cookies to analyze our site traffic and optimize your calculator experience. By clicking "Accept All", you agree to our cookie policy.
          </p>
          <div className="mt-4 flex items-center space-x-3">
            <button
              onClick={handleAccept}
              className="rounded-lg bg-orange-500 hover:bg-orange-600 px-3.5 py-1.5 text-xs font-semibold text-white transition-colors duration-150"
              id="cookie-accept-btn"
            >
              Accept All
            </button>
            <button
              onClick={() => setVisible(false)}
              className="rounded-lg bg-slate-800 hover:bg-slate-700 px-3.5 py-1.5 text-xs font-semibold text-slate-300 transition-colors duration-150"
              id="cookie-close-btn"
            >
              Close
            </button>
          </div>
        </div>
        <button 
          onClick={() => setVisible(false)} 
          className="text-slate-500 hover:text-white transition-colors duration-150 shrink-0"
          aria-label="Close Consent Banner"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
