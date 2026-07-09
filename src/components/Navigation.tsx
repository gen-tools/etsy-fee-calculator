"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Link from 'next/link';
import { PageRoute } from '../types';
import { useTheme } from '@/app/providers';
import { Sun, Moon, Menu, X, Calculator, Percent, BookOpen, Info, Mail, ShieldAlert } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'home' as PageRoute, label: 'Calculator', icon: Calculator, path: '/' },
  { id: 'blog' as PageRoute, label: 'Blog', icon: BookOpen, path: '/blog' },
  { id: 'about' as PageRoute, label: 'About', icon: Info, path: '/about' },
  { id: 'contact' as PageRoute, label: 'Contact', icon: Mail, path: '/contact' },
  { id: 'privacy' as PageRoute, label: 'Privacy', icon: ShieldAlert, path: '/privacy-policy' },
];

interface NavigationProps {
  currentRoute: PageRoute;
}

export default function Navigation({ currentRoute }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useTheme();

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/95 transition-colors duration-300 no-print">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link 
          href="/" 
          onClick={handleNavClick}
          className="flex cursor-pointer items-center space-x-2.5 group"
          id="nav-logo"
        >
          <div className="flex h-10 w-10 items-center justify-between rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 p-2 shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform duration-200">
            <Percent className="h-6 w-6 text-white" aria-hidden="true" />
          </div>
          <div>
            <span className="font-display text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              EtsyFee<span className="text-orange-500 font-extrabold">Calculator</span>
            </span>
            <span className="block text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest -mt-1 font-medium">
              Ultimate Edition
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1.5" aria-label="Main Navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = currentRoute === item.id || (item.id === 'blog' && currentRoute === 'blog-post');
            return (
              <Link
                key={item.id}
                href={item.path}
                className={`flex items-center space-x-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-orange-50/80 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white'
                }`}
                aria-current={isActive ? 'page' : undefined}
                id={`nav-link-${item.id}`}
              >
                <item.icon className="h-4 w-4" aria-hidden="true" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center space-x-2">
          {/* Theme Toggle */}
          <button
            onClick={toggleDarkMode}
            className="rounded-lg p-2.5 text-slate-500 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-white transition-colors duration-200"
            aria-label={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            id="theme-toggle-button"
          >
            {darkMode ? <Sun className="h-5 w-5 text-amber-400" aria-hidden="true" /> : <Moon className="h-5 w-5 text-slate-600" aria-hidden="true" />}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2.5 text-slate-500 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-white md:hidden transition-colors duration-200"
            aria-label="Toggle Mobile Menu"
            aria-expanded={mobileMenuOpen}
            id="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-3 space-y-1 transition-all duration-300">
          {NAV_ITEMS.map((item) => {
            const isActive = currentRoute === item.id || (item.id === 'blog' && currentRoute === 'blog-post');
            return (
              <Link
                key={item.id}
                href={item.path}
                onClick={handleNavClick}
                className={`flex w-full items-center space-x-3 rounded-lg px-4 py-3 text-base font-medium transition-all ${
                  isActive
                    ? 'bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white'
                }`}
                id={`mobile-nav-link-${item.id}`}
              >
                <item.icon className="h-5 w-5" aria-hidden="true" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
