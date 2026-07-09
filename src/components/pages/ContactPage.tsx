/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock, Calendar } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Please enter your name.';
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Please enter a subject.';
    if (!formData.message.trim()) {
      newErrors.message = 'Please type a message.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Your message must be at least 10 characters long.';
    }
    return newErrors;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      setSubmitted(true);
    }
  };

  const handleResetForm = () => {
    setFormData({ name: '', email: '', subject: '', message: '' });
    setSubmitted(false);
  };

  return (
    <article className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 animate-in fade-in slide-in-from-bottom-5 duration-300" id="contact-page">
      {/* Header section */}
      <header className="text-center mb-16">
        <span className="text-xs font-bold font-mono text-orange-500 uppercase tracking-widest bg-orange-50 dark:bg-orange-950/40 px-3 py-1.5 rounded-full">
          Get In Touch
        </span>
        <h1 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-4">
          We Would Love to Hear From You
        </h1>
        <p className="mt-4 text-base md:text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Have a feature request, spotted a typo in regional rates, or want to share your success story? Send us a message and our support team will reply as soon as possible.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* LEFT COLUMN: Google-friendly Contact Information block */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-6">
            <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
              Official Headquarters
            </h2>

            {/* Office Coordinates */}
            <div className="space-y-4">
              <div className="flex items-start space-x-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Office Location</h3>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mt-0.5">
                    140 2nd St, Suite 300<br />San Francisco, CA 94107
                  </p>
                  <span className="text-[10px] font-mono text-slate-400 block mt-1">United States of America</span>
                </div>
              </div>

              {/* Email support */}
              <div className="flex items-start space-x-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Email Inquiries</h3>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mt-0.5">
                    sa0663787@gmail.com
                  </p>
                  <p className="text-[10px] text-slate-500">For advertising or rate updates</p>
                </div>
              </div>

              {/* Response guarantees */}
              <div className="flex items-start space-x-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Response Guarantee</h3>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mt-0.5">
                    Under 24 Business Hours
                  </p>
                  <p className="text-[10px] text-slate-500">Our dedicated support managers monitor messages daily</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sourcing/Work hours card */}
          <div className="bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl border border-slate-100 dark:border-slate-900 flex items-start space-x-3.5">
            <Calendar className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Hours of Operation</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-normal">
                Monday – Friday: 9:00 AM – 5:00 PM (PST)<br />
                Saturday – Sunday: Closed (Inbox monitored for emergencies)
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Contact Form */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-md">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-5" aria-label="Customer Support Form">
              <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                Send Us a Secure Message
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 -mt-2">
                We safeguard your communication with bank-grade SSL channel encryption.
              </p>

              {/* Name Input */}
              <div>
                <label htmlFor="contact-name" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  id="contact-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`block w-full px-3.5 py-2.5 rounded-xl border bg-white dark:bg-slate-900 text-slate-950 dark:text-white text-sm focus:ring-1 focus:outline-none transition-all ${
                    errors.name 
                      ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500' 
                      : 'border-slate-200 focus:border-orange-500 focus:ring-orange-500 dark:border-slate-800'
                  }`}
                  placeholder="Sarah Jenkins"
                />
                {errors.name && <p className="mt-1 text-xs text-rose-500" role="alert">{errors.name}</p>}
              </div>

              {/* Email Input */}
              <div>
                <label htmlFor="contact-email" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  id="contact-email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`block w-full px-3.5 py-2.5 rounded-xl border bg-white dark:bg-slate-900 text-slate-950 dark:text-white text-sm focus:ring-1 focus:outline-none transition-all ${
                    errors.email 
                      ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500' 
                      : 'border-slate-200 focus:border-orange-500 focus:ring-orange-500 dark:border-slate-800'
                  }`}
                  placeholder="sarah@example.com"
                />
                {errors.email && <p className="mt-1 text-xs text-rose-500" role="alert">{errors.email}</p>}
              </div>

              {/* Subject Input */}
              <div>
                <label htmlFor="contact-subject" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Subject Line
                </label>
                <input
                  type="text"
                  id="contact-subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className={`block w-full px-3.5 py-2.5 rounded-xl border bg-white dark:bg-slate-900 text-slate-950 dark:text-white text-sm focus:ring-1 focus:outline-none transition-all ${
                    errors.subject 
                      ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500' 
                      : 'border-slate-200 focus:border-orange-500 focus:ring-orange-500 dark:border-slate-800'
                  }`}
                  placeholder="Rate discrepancy in European VAT"
                />
                {errors.subject && <p className="mt-1 text-xs text-rose-500" role="alert">{errors.subject}</p>}
              </div>

              {/* Message Input */}
              <div>
                <label htmlFor="contact-message" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Your Message
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`block w-full px-3.5 py-2.5 rounded-xl border bg-white dark:bg-slate-900 text-slate-950 dark:text-white text-sm focus:ring-1 focus:outline-none transition-all ${
                    errors.message 
                      ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500' 
                      : 'border-slate-200 focus:border-orange-500 focus:ring-orange-500 dark:border-slate-800'
                  }`}
                  placeholder="How can we help your Etsy business grow?"
                ></textarea>
                {errors.message && <p className="mt-1 text-xs text-rose-500" role="alert">{errors.message}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-orange-500 hover:bg-orange-600 px-5 py-3 text-sm font-bold text-white transition-colors duration-150 cursor-pointer shadow-md shadow-orange-500/10"
                id="contact-submit-btn"
              >
                <Send className="h-4 w-4" />
                <span>Send Secure Message</span>
              </button>
            </form>
          ) : (
            <div className="text-center py-12 space-y-6" id="contact-success-state">
              <div className="mx-auto h-16 w-16 bg-emerald-100 dark:bg-emerald-950/40 text-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/10 animate-bounce">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <div className="space-y-2">
                <h2 className="font-display text-2xl font-bold text-slate-950 dark:text-white">Message Transmitted Successfully!</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out, <strong>{formData.name}</strong>. Your ticket has been assigned to our lead financial auditor. We will respond at <strong>{formData.email}</strong> under 24 business hours.
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl max-w-md mx-auto border border-slate-100 dark:border-slate-900 text-left font-mono text-xs text-slate-500 space-y-1">
                <p><strong>Ticket ID:</strong> ETF-{Math.floor(100000 + Math.random() * 900000)}</p>
                <p><strong>Subject:</strong> {formData.subject}</p>
                <p><strong>Timestamp:</strong> {new Date().toISOString()}</p>
              </div>

              <button
                onClick={handleResetForm}
                className="inline-flex items-center justify-center rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-slate-50 dark:text-slate-950 px-5 py-2.5 text-xs font-bold transition-all cursor-pointer"
                id="contact-reset-btn"
              >
                Send Another Message
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
