/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Link from 'next/link';
import { PageRoute } from '../types';
import { BLOG_POSTS } from '../data/blogPosts';
import { REGIONS } from '../data/regions';
import { Percent, Mail, MapPin, ExternalLink, ShieldCheck } from 'lucide-react';

interface FooterProps {
  currentRoute: PageRoute;
}

export default function Footer({ currentRoute }: FooterProps) {
  const latestPosts = BLOG_POSTS.slice(0, 3);

  const pathMap = {
    home: '/',
    blog: '/blog',
    about: '/about',
    contact: '/contact',
    privacy: '/privacy-policy'
  };

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 transition-colors duration-300 no-print" id="app-footer">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand & Bio */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2.5 cursor-pointer">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-600 p-1.5 shadow-lg shadow-orange-500/10">
                <Percent className="h-5 w-5 text-white" />
              </div>
              <span className="font-display text-lg font-bold tracking-tight text-white">
                EtsyFee<span className="text-orange-500">Calculator</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              The premier interactive fee calculator for Etsy sellers globally. Built in 2026 to help creative business owners optimize pricing, account for shipping, and safeguard their profit margins.
            </p>
            <div className="space-y-2 pt-2 text-xs">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-orange-400" />
                <span className="text-slate-300">sa0663787@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-orange-400" />
                <span className="text-slate-300">San Francisco, CA 94107</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">Quick Navigation</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-orange-400 transition-colors duration-150">
                  Fee Calculator
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-orange-400 transition-colors duration-150">
                  Seller Knowledge Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-orange-400 transition-colors duration-150">
                  About Our Platform
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-orange-400 transition-colors duration-150">
                  Get in Touch (Support)
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-orange-400 transition-colors duration-150">
                  Privacy Policy & CCPA
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Location Shortcuts */}
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">Regional Shortcuts</h3>
            <p className="mt-2 text-xs text-slate-500 leading-normal mb-4">
              Click below to instantly load regional calculation parameters:
            </p>
            <ul className="space-y-2 text-sm">
              {Object.entries(REGIONS).map(([code, region]) => (
                <li key={code}>
                  <Link 
                    href={`/?location=${code}`} 
                    className="flex items-center space-x-1.5 hover:text-orange-400 transition-colors duration-150"
                  >
                    <span className="text-[10px] font-bold bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded font-mono">
                      {code}
                    </span>
                    <span>Etsy {region.name} Calculator</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Latest Articles */}
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">Featured Guides</h3>
            <ul className="mt-4 space-y-3.5">
              {latestPosts.map((post) => (
                <li key={post.slug}>
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="group block text-left hover:text-orange-400 transition-colors duration-150"
                  >
                    <p className="text-xs font-mono text-orange-400 font-medium">{post.date}</p>
                    <p className="text-xs leading-snug text-slate-300 font-semibold group-hover:text-orange-400 line-clamp-2 mt-0.5">
                      {post.title}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-800 pt-8 flex flex-col md:flex-row md:items-center md:justify-between text-xs">
          <p className="text-slate-500">
            &copy; {new Date().getFullYear()} EtsyFeeCalculator. All rights reserved. This utility is an independent calculation tool and is not officially affiliated with or endorsed by Etsy, Inc.
          </p>
          <div className="mt-4 md:mt-0 flex items-center space-x-1 text-slate-400">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            <span>Secure 256-bit Pricing Model Data Encryption</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
