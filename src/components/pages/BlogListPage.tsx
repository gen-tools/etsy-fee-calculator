/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import { useState, FormEvent } from 'react';
import { PageRoute, BlogPost } from '../../types';
import { BLOG_POSTS } from '../../data/blogPosts';
import { Search, Calendar, User, Clock, ChevronRight, BookOpen, Send, CheckCircle2 } from 'lucide-react';

interface BlogListPageProps {
  setRoute: (route: PageRoute, blogSlug?: string) => void;
}

export default function BlogListPage({ setRoute }: BlogListPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [emailInput, setEmailInput] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Get unique categories
  const categories = ['All', ...Array.from(new Set(BLOG_POSTS.map(post => post.category)))];

  // Filter posts
  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handlePostClick = (slug: string) => {
    setRoute('blog-post', slug);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (emailInput.trim() && /\S+@\S+\.\S+/.test(emailInput)) {
      setNewsletterSubscribed(true);
      setEmailInput('');
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 animate-in fade-in slide-in-from-bottom-5 duration-300" id="blog-list-page">
      
      {/* Top Breadcrumbs */}
      <nav className="flex items-center space-x-1.5 text-xs text-slate-500 mb-8 font-mono" aria-label="Breadcrumb">
        <button onClick={() => setRoute('home')} className="hover:text-orange-500 font-medium">Home</button>
        <ChevronRight className="h-3 w-3" />
        <span className="text-slate-900 dark:text-white font-bold">Blog</span>
      </nav>

      {/* Header section */}
      <header className="mb-12 max-w-3xl">
        <span className="text-xs font-bold font-mono text-orange-500 uppercase tracking-widest bg-orange-50 dark:bg-orange-950/40 px-3 py-1.5 rounded-full flex items-center gap-1.5 w-fit">
          <BookOpen className="h-4 w-4" />
          Seller Education Base
        </span>
        <h1 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-4">
          The Ultimate Etsy Fee & Pricing Intelligence Blog
        </h1>
        <p className="mt-4 text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          Original, mathematical guides designed specifically for creative entrepreneurs. Gain absolute topical authority over listing renewal algorithms, card swiping logistics, and pricing markup strategies.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT: Articles List + Search Filters (Col span 8) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Controls: Search and Categories */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 rounded-2xl shadow-sm space-y-4">
            {/* Search Input */}
            <div className="relative rounded-xl shadow-sm">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                <Search className="h-4.5 w-4.5" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-950 dark:text-white text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all"
                placeholder="Search articles on offsite ads, transaction commission, listings..."
                id="blog-search-input"
              />
            </div>

            {/* Category selection */}
            <div className="flex flex-wrap gap-1.5 pt-1" aria-label="Filter by Category">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold cursor-pointer transition-all ${
                    selectedCategory === cat
                      ? 'bg-orange-500 text-white'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-800'
                  }`}
                  id={`cat-filter-btn-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Articles list */}
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 gap-8">
              {filteredPosts.map((post) => (
                <article 
                  key={post.slug} 
                  className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden hover:shadow-md hover:border-slate-350 dark:hover:border-slate-700 transition-all duration-350 flex flex-col md:flex-row group"
                  id={`blog-card-${post.slug}`}
                >
                  {/* cover image */}
                  <div className="md:w-2/5 relative h-48 md:h-auto shrink-0 bg-slate-100 overflow-hidden">
                    <img 
                      src={post.featuredImage} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-3 left-3 rounded-lg bg-slate-900/90 text-white font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-1 backdrop-blur-sm">
                      {post.category}
                    </span>
                  </div>

                  {/* text metadata */}
                  <div className="p-6 flex flex-col justify-between flex-1">
                    <div className="space-y-2.5">
                      <div className="flex items-center space-x-3.5 text-[10px] font-mono text-slate-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5 text-orange-500" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5 text-orange-500" />
                          {post.readingTime}
                        </span>
                      </div>
                      <h2 
                        onClick={() => handlePostClick(post.slug)}
                        className="font-display text-lg sm:text-xl font-bold text-slate-900 dark:text-white cursor-pointer hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-150 line-clamp-2"
                      >
                        {post.title}
                      </h2>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                        {post.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-50 dark:border-slate-850 mt-4">
                      <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                        <User className="h-3.5 w-3.5 text-orange-400" />
                        {post.author.split(',')[0]}
                      </span>
                      <button 
                        onClick={() => handlePostClick(post.slug)}
                        className="text-xs font-bold text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300 flex items-center gap-0.5 cursor-pointer"
                        id={`blog-card-read-more-${post.slug}`}
                      >
                        Read Article
                        <ChevronRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6">
              <p className="text-base text-slate-500 dark:text-slate-400 font-semibold font-display">No articles found matching your query.</p>
              <button 
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                className="mt-4 inline-flex items-center justify-center rounded-xl bg-orange-500 text-white px-4 py-2 text-xs font-bold transition-all"
              >
                Clear Search & Filters
              </button>
            </div>
          )}
        </div>

        {/* RIGHT: Sidebar (Col span 4) */}
        <aside className="lg:col-span-4 space-y-6">
          
          {/* Newsletter Signup widget */}
          <div className="bg-gradient-to-b from-slate-900 to-slate-950 text-white border border-slate-800 p-6 rounded-2xl shadow-lg relative overflow-hidden">
            <div className="absolute -right-12 -top-12 h-28 w-28 rounded-full bg-orange-500/10 blur-2xl"></div>
            
            {!newsletterSubscribed ? (
              <form onSubmit={handleNewsletterSubmit} className="space-y-4" aria-label="Newsletter Signup">
                <h3 className="font-display text-lg font-bold text-white">Get Weekly Pricing Audits</h3>
                <p className="text-xs text-slate-400 leading-normal">
                  Subscribe to receive real-world pricing examples, fee updates, and profitability checklists delivered straight to your inbox.
                </p>
                <div className="space-y-2.5">
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="block w-full bg-slate-950 border border-slate-850 px-3.5 py-2.5 rounded-xl text-xs text-white placeholder-slate-500 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                    placeholder="sarah@example.com"
                    id="newsletter-email-input"
                  />
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-orange-500 hover:bg-orange-600 px-4 py-2.5 text-xs font-bold text-white transition-colors cursor-pointer"
                    id="newsletter-submit-btn"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>Join Free Newsletter</span>
                  </button>
                </div>
                <p className="text-[10px] text-slate-500 text-center">
                  Zero spam. Unsubscribe in just one click.
                </p>
              </form>
            ) : (
              <div className="text-center py-6 space-y-4 animate-in fade-in" id="newsletter-success-state">
                <div className="mx-auto h-12 w-12 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <div>
                  <h4 className="font-display text-sm font-bold text-white">You Are Subscribed!</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed mt-1">
                    Check your inbox shortly for our <strong>"Etsy Profit Margin Roadmap Checklist"</strong> guide.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Recently Viewed articles or hot topics */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 rounded-2xl shadow-sm space-y-4">
            <h3 className="font-display text-xs font-extrabold uppercase tracking-widest text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-2">
              Trending Guides
            </h3>
            <ul className="space-y-3.5">
              {BLOG_POSTS.slice(0, 4).map((post) => (
                <li key={post.slug}>
                  <button 
                    onClick={() => handlePostClick(post.slug)}
                    className="group block text-left hover:text-orange-500 transition-colors duration-150"
                  >
                    <p className="text-[10px] font-mono text-orange-400">{post.category}</p>
                    <h4 className="text-xs font-semibold leading-snug text-slate-800 dark:text-slate-200 group-hover:text-orange-500 mt-0.5 line-clamp-2">
                      {post.title}
                    </h4>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

      </div>
    </div>
  );
}
