"use client";

import { useState } from 'react';
import { 
  BookOpen, Calculator, Globe, AlertTriangle, HelpCircle, 
  ChevronDown, ChevronUp, DollarSign, ArrowRight, Percent, Info, MapPin
} from 'lucide-react';
import etsyFeeIllustration from '@/src/assets/images/etsy_fee_calculator_illustration_1783597039536.jpg';

export default function EtsyGuide() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "Is an Etsy fee calculator free to use?",
      a: "Most are. Independent tools built by sellers or third-party sites are typically free, since they're simple calculators rather than full software platforms."
    },
    {
      q: "Does Etsy have its own built-in fee calculator?",
      a: "Etsy doesn't provide a public calculator on the seller dashboard, though your Shop Manager does show itemized fees after each sale under the Finances tab. A calculator is more useful for planning prices before you list, rather than reviewing them after the fact."
    },
    {
      q: "Do fees change in 2026?",
      a: "Etsy occasionally adjusts fee percentages, so it's worth checking Etsy's official Seller Handbook or Fees page for the current rates rather than relying on older figures, since even small percentage changes affect pricing decisions across an entire shop."
    },
    {
      q: "Does the calculator work for an Excel spreadsheet version too?",
      a: "Yes. Many sellers prefer building their own version in Excel or Google Sheets so they can track fees across their whole catalog at once, rather than one item at a time. The same formulas a calculator uses (listing fee, transaction percentage, processing percentage plus fixed amount) can be replicated in a spreadsheet with basic formulas."
    },
    {
      q: "Why is my payout lower than what the calculator shows?",
      a: "Double-check whether Offsite Ads fees, currency conversion, or a sale/discount code affected that specific order. Calculators typically assume a standard sale unless you specify otherwise."
    },
    {
      q: "Should I include my own labor cost in the calculator?",
      a: "It's not required, but it's a good idea. Fees only tell you what Etsy takes — they don't tell you whether your price actually compensates you for your time. Adding a labor cost field gives you a truer profit picture."
    },
    {
      q: "Do wholesale or bulk orders have different fees?",
      a: "No, Etsy applies the same fee structure regardless of order size. Larger orders simply mean the transaction and processing fees are calculated on a bigger total."
    }
  ];

  return (
    <section className="bg-white dark:bg-slate-900 border-y border-slate-200/60 dark:border-slate-800/60 py-16 px-4 sm:px-6 lg:px-8 no-print">
      <div className="mx-auto max-w-4xl">
        
        {/* Main Article Header */}
        <header className="mb-12 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-orange-50 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400 border border-orange-100 dark:border-orange-900/40 mb-4">
            <BookOpen className="h-3.5 w-3.5" />
            <span>Complete Seller Guide</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Etsy Fee Calculator: Know Exactly What You'll Pay Before You List
          </h2>
          <div className="mt-4 h-1 w-16 bg-orange-500 rounded"></div>
        </header>

        {/* Content Body */}
        <div className="space-y-10 text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          
          {/* Introduction */}
          <div className="space-y-4">
            <p className="font-medium text-slate-800 dark:text-slate-200 text-base sm:text-lg leading-relaxed">
              You made the sale. Now Etsy takes its cut, and if you've ever been surprised by how much smaller your payout is than the price tag, you're not alone. Between listing fees, transaction fees, payment processing fees, and currency conversion, it's easy to price a product at $30 and end up with $24 or less in your pocket.
            </p>
            <p>
              An Etsy fee calculator solves that problem before it happens. Instead of guessing, you plug in your sale price and shipping cost, and it tells you what Etsy will keep and what you'll actually take home. This guide walks through how the calculator works, what each fee actually means, and how to use the numbers to price your products so you're not losing money without realizing it.
            </p>
          </div>

          {/* Centered responsive illustrative image */}
          <div className="my-6 flex justify-center">
            <div className="overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm max-w-md w-full bg-slate-50 dark:bg-slate-950/60 p-1">
              <img
                src={etsyFeeIllustration.src}
                alt="Etsy Fee Calculator"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover rounded-xl aspect-[4/3] hover:scale-[1.01] transition-transform duration-300"
              />
            </div>
          </div>

          {/* Section 1 */}
          <div className="bg-slate-50 dark:bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-100 dark:border-slate-850 space-y-4">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Calculator className="h-5.5 w-5.5 text-orange-500" />
              What an Etsy Fee Calculator Actually Does
            </h3>
            <p>
              At its core, the tool takes your listing price, shipping charge, and sometimes your product cost, then runs the math on every fee Etsy applies to a sale. The output is your net profit — the amount that lands in your bank account after Etsy and your payment processor take their share.
            </p>
            <p className="font-semibold text-slate-800 dark:text-slate-200">
              Most calculators account for:
            </p>
            <ul className="space-y-3 pl-4 border-l-2 border-orange-500">
              <li className="flex items-start gap-2">
                <span className="text-orange-500 mt-1.5 font-bold text-xs">•</span>
                <span><strong>Listing fee</strong> — a flat $0.20 charged when you publish or renew a listing</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 mt-1.5 font-bold text-xs">•</span>
                <span><strong>Transaction fee</strong> — a percentage of the total sale price, including shipping</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 mt-1.5 font-bold text-xs">•</span>
                <span><strong>Payment processing fee</strong> — a percentage plus a fixed amount, charged by Etsy Payments</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 mt-1.5 font-bold text-xs">•</span>
                <span><strong>Currency conversion fee</strong> — applies if you sell in a currency different from your bank's currency</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 mt-1.5 font-bold text-xs">•</span>
                <span><strong>Offsite Ads fee</strong> — a percentage taken only if your sale came through an Etsy-placed ad</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 mt-1.5 font-bold text-xs">•</span>
                <span><strong>Regional VAT or GST</strong> — where applicable, depending on where your shop is based</span>
              </li>
            </ul>
            <p className="pt-2">
              You enter your numbers once, and the calculator handles the arithmetic that would otherwise take a spreadsheet and a lot of patience.
            </p>
          </div>

          {/* Section 2 */}
          <div className="space-y-4">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Why Manual Math Falls Short
            </h3>
            <p>
              Etsy sellers who try to calculate fees by hand usually make one of two mistakes. Either they forget that the transaction fee applies to shipping too, not just the item price, or they forget to add the fixed payment processing fee on top of the percentage.
            </p>
            
            <div className="my-6 p-6 bg-orange-50/50 dark:bg-orange-950/20 rounded-2xl border border-orange-100 dark:border-orange-900/30">
              <p className="font-bold text-slate-900 dark:text-white mb-3">
                Here's a simple example. Say you sell a handmade mug for $25 with $6 shipping.
              </p>
              <ul className="space-y-2 font-mono text-sm text-slate-700 dark:text-slate-300">
                <li className="flex justify-between border-b border-orange-100/40 dark:border-orange-900/10 pb-1.5">
                  <span>Transaction fee (6.5% of $31):</span>
                  <span className="font-bold text-orange-600 dark:text-orange-400">$2.02</span>
                </li>
                <li className="flex justify-between border-b border-orange-100/40 dark:border-orange-900/10 pb-1.5">
                  <span>Payment processing fee (3% + $0.25 of $31):</span>
                  <span className="font-bold text-orange-600 dark:text-orange-400">$1.18</span>
                </li>
                <li className="flex justify-between border-b border-orange-100/40 dark:border-orange-900/10 pb-1.5">
                  <span>Listing fee:</span>
                  <span className="font-bold text-orange-600 dark:text-orange-400">$0.20</span>
                </li>
                <li className="flex justify-between pt-1.5 font-bold text-slate-900 dark:text-white text-base">
                  <span>Total fees:</span>
                  <span>$3.40. Your payout is $27.60, not the $31 you might expect from the sale total.</span>
                </li>
              </ul>
            </div>

            <p>
              Now multiply that kind of miscalculation across fifty orders a month, and it's clear why so many shop owners feel like their margins are thinner than they planned for. A calculator catches this instantly, before you set a price you'll regret.
            </p>
          </div>

          {/* Section 3 */}
          <div className="bg-slate-50 dark:bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-100 dark:border-slate-850 space-y-4">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              How to Use the Calculator Step by Step
            </h3>
            <ol className="space-y-4 list-decimal pl-5 text-slate-600 dark:text-slate-300">
              <li>
                <strong>Enter your item price.</strong> This is what the customer sees on the listing.
              </li>
              <li>
                <strong>Add your shipping charge, if you charge separately.</strong> Etsy's transaction fee applies to this amount too.
              </li>
              <li>
                <strong>Input your product cost (materials, packaging, your time)</strong> if you want to see actual profit, not just fees.
              </li>
              <li>
                <strong>Select your shop's country.</strong> Fee percentages and currency rules shift depending on where your shop is registered.
              </li>
              <li>
                <strong>Check the Offsite Ads box</strong> if you're enrolled in that program, since it adds an extra fee on qualifying sales.
              </li>
              <li>
                <strong>Review the breakdown.</strong> A good calculator shows each fee line by line, not just a final number, so you can see exactly where your money is going.
              </li>
            </ol>
            <p className="pt-2 font-medium text-slate-800 dark:text-slate-200">
              Once you see the full breakdown, adjusting your price to hit a target profit margin becomes a lot easier than trial and error.
            </p>
          </div>

          {/* Section 4 */}
          <div className="space-y-4">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Etsy Fee Calculator for Digital Products
            </h3>
            <p>
              Digital downloads work a little differently. There's no shipping fee to factor in, and no packaging cost, but the transaction and payment processing fees still apply to the full sale price.
            </p>
            <p>
              This matters because a lot of digital product sellers assume their margins are close to 100% since there's no physical item involved. In reality, Etsy still takes its standard cut — usually around 9-10% combined between transaction and processing fees — plus the flat $0.20 listing fee per item.
            </p>
            <p>
              If you sell a $5 printable, for instance, that $0.20 listing fee alone represents 4% of your sale price. On low-priced digital items, fixed fees eat a much bigger share of your revenue than they do on higher-priced goods. A calculator built for digital products lets you skip the shipping field entirely and see your real digital-only margin.
            </p>
          </div>

          {/* Section 5 */}
          <div className="space-y-6">
            <div className="border-l-4 border-orange-500 pl-4 py-1">
              <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Globe className="h-5.5 w-5.5 text-orange-500" />
                Regional Differences: US, UK, Canada, Australia, and India
              </h3>
            </div>
            <p>
              Etsy's fee structure is fairly consistent worldwide, but currency, VAT, and local tax rules change the final number depending on where your shop operates.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="p-5 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-850">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300 font-mono">US</span>
                  <h4 className="font-bold text-slate-900 dark:text-white">United States</h4>
                </div>
                <p className="text-xs sm:text-sm">
                  US-based shops pay in USD with no currency conversion fee, assuming your bank account is also USD. Sales tax is typically collected and remitted by Etsy automatically in most states, so it doesn't come out of your payout.
                </p>
              </div>

              <div className="p-5 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-850">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300 font-mono">UK</span>
                  <h4 className="font-bold text-slate-900 dark:text-white">United Kingdom</h4>
                </div>
                <p className="text-xs sm:text-sm">
                  UK sellers deal with VAT on Etsy's own fees (not on your product sales, but on the fees Etsy charges you). This means the fee amount itself often has VAT added on top, slightly increasing your total cost compared to a seller who isn't subject to VAT.
                </p>
              </div>

              <div className="p-5 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-850">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300 font-mono">CA</span>
                  <h4 className="font-bold text-slate-900 dark:text-white">Canada</h4>
                </div>
                <p className="text-xs sm:text-sm">
                  Canadian sellers pay in CAD or USD depending on their shop settings. If your bank account currency doesn't match your listing currency, expect a currency conversion fee of around 2.5% on top of standard fees.
                </p>
              </div>

              <div className="p-5 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-850">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300 font-mono">AU</span>
                  <h4 className="font-bold text-slate-900 dark:text-white">Australia</h4>
                </div>
                <p className="text-xs sm:text-sm">
                  Australian shops may see GST applied to Etsy's fees, similar to the UK's VAT treatment. Currency conversion also applies if you list in USD but bank in AUD.
                </p>
              </div>

              <div className="p-5 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-850 md:col-span-2">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300 font-mono">IN</span>
                  <h4 className="font-bold text-slate-900 dark:text-white">India</h4>
                </div>
                <p className="text-xs sm:text-sm">
                  Indian sellers typically list in USD, since that's the standard currency for cross-border Etsy sales originating from India. GST may apply depending on your registration status, and currency conversion is almost always a factor since payouts convert from USD to INR.
                </p>
              </div>
            </div>

            <p className="pt-2">
              A calculator that lets you select your region adjusts for these differences automatically, so you're not manually researching VAT or GST rules every time you price something.
            </p>
          </div>

          {/* Section 6 */}
          <div className="space-y-4">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <AlertTriangle className="h-5.5 w-5.5 text-orange-500" />
              Common Pricing Mistakes Sellers Make
            </h3>
            
            <div className="grid grid-cols-1 gap-4">
              <div className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-orange-200 dark:hover:border-orange-900/30 transition-all">
                <h4 className="font-bold text-slate-900 dark:text-white text-base">Pricing based on cost alone.</h4>
                <p className="text-xs sm:text-sm mt-1">
                  Covering your materials and labor isn't the same as covering Etsy's fees on top of that. Always add fees as a separate line item in your pricing math.
                </p>
              </div>

              <div className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-orange-200 dark:hover:border-orange-900/30 transition-all">
                <h4 className="font-bold text-slate-900 dark:text-white text-base">Ignoring the Offsite Ads fee.</h4>
                <p className="text-xs sm:text-sm mt-1">
                  If Etsy runs an ad that leads to your sale, you'll pay an additional 12-15% fee on that order. Shops under $10,000 in annual sales can opt out; larger shops can't. If you haven't opted out and don't factor this in, a portion of your sales will have noticeably thinner margins than others.
                </p>
              </div>

              <div className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-orange-200 dark:hover:border-orange-900/30 transition-all">
                <h4 className="font-bold text-slate-900 dark:text-white text-base">Forgetting shipping is taxed by Etsy too.</h4>
                <p className="text-xs sm:text-sm mt-1">
                  The transaction fee applies to your shipping charge, not just your item price. If you build shipping into a "free shipping" price, remember Etsy still takes its cut of that built-in amount.
                </p>
              </div>

              <div className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-orange-200 dark:hover:border-orange-900/30 transition-all">
                <h4 className="font-bold text-slate-900 dark:text-white text-base">Not adjusting for currency conversion.</h4>
                <p className="text-xs sm:text-sm mt-1">
                  If you sell internationally, a sale that looks profitable in USD might shrink once it converts to your local currency, especially with typical conversion fees around 2.5%.
                </p>
              </div>

              <div className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-orange-200 dark:hover:border-orange-900/30 transition-all">
                <h4 className="font-bold text-slate-900 dark:text-white text-base">Setting round prices without checking the math.</h4>
                <p className="text-xs sm:text-sm mt-1">
                  A lot of sellers price things at $20 or $25 because it looks clean, without checking whether that price actually covers costs and fees. Running the number through a calculator first avoids this.
                </p>
              </div>
            </div>
          </div>

          {/* Section 7 */}
          <div className="space-y-4">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              How to Use Calculator Results to Set Better Prices
            </h3>
            <p>
              Once you know your fees for a given price point, work backward from your target profit. If you want to net $15 on a sale after all fees, and your combined fee rate is roughly 9-10% plus a small fixed amount, you'll generally need to list somewhere around $16.75-$17 to hit that target, depending on shipping and your specific processing rate.
            </p>
            <p>
              Doing this for your whole shop catalog, rather than one item at a time, helps you spot which products are quietly underpriced. It's common to find that your best-selling item is also your lowest-margin one, simply because it was priced early on without factoring in fees properly.
            </p>
          </div>

          {/* Section 8 */}
          <div className="space-y-4">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Etsy Fee Calculator vs. Other Seller Tools
            </h3>
            <p>
              Tools like Sale Samurai or eRank focus mainly on keyword research and listing optimization, not fee breakdowns. A fee calculator is a narrower, more specific tool — it won't help you find trending search terms, but it will tell you, to the cent, what a sale actually nets you.
            </p>
            <p>
              Many sellers use both types of tools together: research tools to decide what to sell and how to title it, and a fee calculator to decide what to charge for it. Neither replaces the other.
            </p>
          </div>

          {/* FAQ Section */}
          <div className="space-y-6 pt-6">
            <div className="border-l-4 border-orange-500 pl-4 py-1">
              <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <HelpCircle className="h-5.5 w-5.5 text-orange-500" />
                Frequently Asked Questions
              </h3>
            </div>
            
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className="bg-slate-50 dark:bg-slate-950/40 rounded-xl border border-slate-200/50 dark:border-slate-800/60 overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-4 text-left font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100/50 dark:hover:bg-slate-900/30 transition-colors"
                  >
                    <span>{faq.q}</span>
                    {activeFaq === index ? (
                      <ChevronUp className="h-4 w-4 shrink-0 text-orange-500" />
                    ) : (
                      <ChevronDown className="h-4 w-4 shrink-0 text-slate-400" />
                    )}
                  </button>
                  {activeFaq === index && (
                    <div className="p-4 pt-0 text-xs sm:text-sm text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-900 bg-white dark:bg-slate-900/10">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Final Thoughts */}
          <div className="border-t border-slate-150 dark:border-slate-850 pt-8 mt-12 space-y-4">
            <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
              Final Thoughts
            </h3>
            <p className="italic text-slate-700 dark:text-slate-300 text-sm sm:text-base bg-orange-50/25 dark:bg-orange-950/5 p-5 rounded-2xl border border-orange-100/30 dark:border-orange-900/10">
              "Pricing on Etsy isn't just about covering materials and making a bit of profit. It's about understanding exactly where every dollar goes after a sale, so the number in your bank account matches what you expected when you set the price. A fee calculator won't grow your shop on its own, but it removes the guesswork that quietly erodes margins over time — and that's often the difference between a shop that feels profitable and one that actually is."
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
