"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-4 right-4 z-40 flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 hover:bg-orange-600 text-white shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 no-print"
      aria-label="Scroll to top of the page"
      id="scroll-to-top-button"
    >
      <ChevronUp className="h-5 w-5" />
    </button>
  );
}
