/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import { useState, useEffect, MouseEvent } from 'react';
import { PageRoute, BlogPost } from '../../types';
import { getBlogPostBySlug, getRelatedBlogPosts } from '../../data/blogPosts';
import { ChevronRight, Calendar, User, Clock, Copy, Link as LinkIcon, Share2, ArrowLeft, BookOpen, MessageSquare, AlertCircle } from 'lucide-react';
import FAQAccordion from '../FAQAccordion';

interface BlogPostPageProps {
  slug: string;
  setRoute: (route: PageRoute, blogSlug?: string) => void;
}

export default function BlogPostPage({ slug, setRoute }: BlogPostPageProps) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [linkCopied, setLinkCopied] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState<BlogPost[]>([]);

  // 1. Fetch post and sync recently viewed
  useEffect(() => {
    const fetchedPost = getBlogPostBySlug(slug);
    if (fetchedPost) {
      setPost(fetchedPost);

      // Manage recently viewed in localStorage
      try {
        const stored = localStorage.getItem('recently-viewed-blogs') || '[]';
        const list: string[] = JSON.parse(stored);
        
        // Remove current if exists, and push to front
        const filtered = list.filter(s => s !== slug);
        const updated = [slug, ...filtered].slice(0, 4);
        
        localStorage.setItem('recently-viewed-blogs', JSON.stringify(updated));
        
        // Fetch full objects
        const fullObjects = updated
          .map(s => getBlogPostBySlug(s))
          .filter((p): p is BlogPost => p !== undefined && p.slug !== slug);
        setRecentlyViewed(fullObjects);
      } catch (e) {
        console.error('Recently viewed storage error', e);
      }
    }
  }, [slug]);

  // 2. Reading Progress Bar listener
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!post) {
    return (
      <div className="mx-auto max-w-xl text-center py-20 px-4">
        <AlertCircle className="mx-auto h-12 w-12 text-rose-500 animate-pulse" />
        <h1 className="font-display text-2xl font-bold mt-4 text-slate-900 dark:text-white">Article Not Found</h1>
        <p className="text-slate-500 mt-2 text-sm">The article slug may have been moved or updated. Please return to the blog catalog.</p>
        <button 
          onClick={() => setRoute('blog')}
          className="mt-6 rounded-xl bg-orange-500 hover:bg-orange-600 px-5 py-2.5 text-xs font-bold text-white transition-colors cursor-pointer"
        >
          Return to Blog Catalog
        </button>
      </div>
    );
  }

  // Related articles
  const relatedPosts = getRelatedBlogPosts(post.slug, 3);

  // Copy Article Link Action
  const handleCopyLink = () => {
    const fullUrl = `${window.location.protocol}//${window.location.host}/blog/${post.slug}`;
    navigator.clipboard.writeText(fullUrl);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  // Structured schemas compiler
  const generateSchema = () => {
    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.description,
      "image": post.featuredImage,
      "datePublished": post.date,
      "author": {
        "@type": "Person",
        "name": post.author.split(',')[0],
        "jobTitle": post.author.split(',')[1]?.trim() || "E-commerce Specialist"
      },
      "publisher": {
        "@type": "Organization",
        "name": "EtsyFeeCalc",
        "logo": {
          "@type": "ImageObject",
          "url": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=200"
        }
      }
    };

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": post.faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };

    return JSON.stringify([articleSchema, faqSchema]);
  };

  // Smooth scroll to ToC element helper
  const handleTocClick = (e: MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90; // account for sticky header height
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <article className="animate-in fade-in duration-300" id="blog-post-view">
      
      {/* 1. TOP STICKY READING PROGRESS BAR */}
      <div className="fixed top-16 left-0 right-0 h-1 z-50 bg-slate-100 dark:bg-slate-900 no-print">
        <div 
          className="h-full bg-orange-500 transition-all duration-100"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* Hero Banner */}
      <div className="relative bg-slate-900 text-white py-16 md:py-20 overflow-hidden no-print">
        {/* Background Overlay */}
        <div className="absolute inset-0 opacity-40 bg-cover bg-center" style={{ backgroundImage: `url(${post.featuredImage})` }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-slate-900/45"></div>

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center space-x-1.5 text-xs text-slate-400 mb-6 font-mono" aria-label="Breadcrumb">
            <button onClick={() => setRoute('home')} className="hover:text-orange-400">Home</button>
            <ChevronRight className="h-3 w-3" />
            <button onClick={() => setRoute('blog')} className="hover:text-orange-400">Blog</button>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white font-semibold truncate max-w-xs">{post.title}</span>
          </nav>

          <span className="rounded-lg bg-orange-500 text-white font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-1">
            {post.category}
          </span>

          <h1 className="font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mt-4 leading-tight">
            {post.title}
          </h1>

          <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
            {post.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-8 pt-6 border-t border-slate-800 text-xs">
            <div className="flex items-center space-x-2">
              <div className="h-7 w-7 rounded-full bg-slate-800 flex items-center justify-center font-bold text-orange-400 text-[10px]">
                {post.author.charAt(0)}
              </div>
              <span className="text-slate-200 font-semibold">{post.author}</span>
            </div>
            <span className="text-slate-500">|</span>
            <div className="flex items-center space-x-1.5 text-slate-300">
              <Calendar className="h-4 w-4 text-orange-400" />
              <span>{post.date}</span>
            </div>
            <span className="text-slate-500">|</span>
            <div className="flex items-center space-x-1.5 text-slate-300">
              <Clock className="h-4 w-4 text-orange-400" />
              <span>{post.readingTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Body Grid Container */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: Article Content Column (Col span 8) */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Share Toolbar */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 no-print">
              <button 
                onClick={() => setRoute('blog')}
                className="flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-orange-500 dark:text-slate-400 dark:hover:text-orange-400 cursor-pointer"
                id="blog-post-back-btn"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Catalog
              </button>

              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">Share Article:</span>
                <button
                  onClick={handleCopyLink}
                  className="rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 p-2 text-slate-600 hover:text-slate-900 dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-slate-800 dark:text-slate-400 dark:hover:text-white transition-all cursor-pointer relative"
                  aria-label="Copy article Link"
                  id="blog-share-copy"
                >
                  <LinkIcon className="h-3.5 w-3.5" />
                  {linkCopied && (
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-orange-500 text-white font-sans text-[10px] px-2 py-0.5 rounded font-bold whitespace-nowrap">
                      Link Copied!
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Structured JSON-LD script tag injection (Injected inline safely!) */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: generateSchema() }} />

            {/* Rich text Content container */}
            <div 
              className="markdown-body text-slate-700 dark:text-slate-200" 
              dangerouslySetInnerHTML={{ __html: post.content }} 
            />

            {/* Specific Post FAQs Section */}
            {post.faqs.length > 0 && (
              <div className="pt-8 border-t border-slate-100 dark:border-slate-800">
                <FAQAccordion 
                  items={post.faqs} 
                  title="Article Frequently Asked Questions" 
                  subtitle="Get fast answers to critical themes touched on inside this guide." 
                />
              </div>
            )}

            {/* Return CTA */}
            <div className="bg-slate-50 dark:bg-slate-900/40 p-6 sm:p-8 rounded-3xl border border-slate-100 dark:border-slate-800 text-center space-y-4 no-print">
              <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">Ready to Model Your Own Profits?</h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
                Don't guess your prices. Input your item price, shipping fees, and material expenses into our ultimate fee calculator to protect your hard-earned margins today.
              </p>
              <button
                onClick={() => { setRoute('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-orange-500 hover:bg-orange-600 px-5 py-3 text-xs font-bold text-white transition-all cursor-pointer shadow-md shadow-orange-500/10"
                id="blog-post-calc-cta"
              >
                <span>Launch Interactive Fee Calculator</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

          </div>

          {/* RIGHT: Table of Contents & Sticky Sidebar (Col span 4) */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-6 no-print">
            
            {/* Table of Contents card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 rounded-2xl shadow-sm">
              <h3 className="font-display text-xs font-extrabold uppercase tracking-widest text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-2 mb-3">
                Table of Contents
              </h3>
              <nav aria-label="Article Outline">
                <ul className="space-y-2.5">
                  {post.tableOfContents.map((item) => (
                    <li 
                      key={item.id} 
                      style={{ paddingLeft: `${(item.level - 2) * 12}px` }}
                    >
                      <a 
                        href={`#${item.id}`}
                        onClick={(e) => handleTocClick(e, item.id)}
                        className="text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors leading-relaxed block"
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Recently viewed blogs sidebar */}
            {recentlyViewed.length > 0 && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 rounded-2xl shadow-sm space-y-4">
                <h3 className="font-display text-xs font-extrabold uppercase tracking-widest text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-2">
                  Recently Viewed
                </h3>
                <ul className="space-y-3">
                  {recentlyViewed.map((item) => (
                    <li key={item.slug}>
                      <button 
                        onClick={() => setRoute('blog-post', item.slug)}
                        className="group block text-left hover:text-orange-500 transition-colors"
                      >
                        <p className="text-[9px] font-mono text-slate-400 uppercase">{item.category}</p>
                        <h4 className="text-xs font-semibold leading-tight text-slate-800 dark:text-slate-300 group-hover:text-orange-500 mt-0.5 line-clamp-2">
                          {item.title}
                        </h4>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Related posts */}
            {relatedPosts.length > 0 && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 rounded-2xl shadow-sm space-y-4">
                <h3 className="font-display text-xs font-extrabold uppercase tracking-widest text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-2">
                  Related Recommendations
                </h3>
                <ul className="space-y-3.5">
                  {relatedPosts.map((item) => (
                    <li key={item.slug}>
                      <button 
                        onClick={() => setRoute('blog-post', item.slug)}
                        className="group block text-left hover:text-orange-500 transition-colors"
                      >
                        <p className="text-[10px] font-mono text-orange-400">{item.category}</p>
                        <h4 className="text-xs font-bold leading-snug text-slate-800 dark:text-slate-200 group-hover:text-orange-500 mt-0.5 line-clamp-2">
                          {item.title}
                        </h4>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>

        </div>
      </div>
    </article>
  );
}
