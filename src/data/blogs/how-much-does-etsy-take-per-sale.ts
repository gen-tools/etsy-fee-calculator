/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BlogPost } from '../../types';

export const howMuchDoesEtsyTakePerSale: BlogPost = {
  slug: 'how-much-does-etsy-take-per-sale',
  title: 'How Much Does Etsy Take Per Sale? Exact Math Explained',
  description: 'Find out exactly how much Etsy deducts from your sales. Walk through a detailed itemized math breakdown of a typical transaction with clear fee examples.',
  author: 'Sarah Jenkins, Etsy E-commerce Specialist',
  date: '2026-07-14',
  category: 'Etsy Fees 101',
  readingTime: '9 min read',
  featuredImage: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&q=80&w=800',
  tableOfContents: [
    { id: 'take-rate-introduction', text: '1. Defining Etsy\'s Total "Take Rate"', level: 2 },
    { id: 'math-of-a-sale', text: '2. Itemized Math of a Typical US Sale', level: 2 },
    { id: 'hidden-variables', text: '3. Hidden Charges That Increase Etsy\'s Cut', level: 2 },
    { id: 'offsite-ad-impact', text: '4. The Drastic Impact of Offsite Ads on Fees', level: 2 },
    { id: 'calculator-use', text: '5. How to Track Your Real Take Rate Instantly', level: 2 },
  ],
  faqs: [
    {
      question: 'What percentage does Etsy take on average?',
      answer: 'On average, Etsy takes between 9.5% and 13.5% of the total transaction value for standard domestic sales. This can spike up to 25% or more if the sale is generated through an Offsite Advertisement.'
    },
    {
      question: 'Does Etsy take a percentage of shipping costs?',
      answer: 'Yes, Etsy charges their standard 6.5% transaction fee on the shipping amount charged to the buyer, but they do not charge the payment processing fee on shipping unless it is part of the initial customer invoice.'
    }
  ],
  content: `
<h2>1. Defining Etsy's Total "Take Rate"</h2>
<p>When selling on Etsy, you can easily get confused by the list of separate charges—listing fees, transaction fees, payment processing fees, and advertising percentages. To understand the true financial cost of using the platform, you must calculate your shop's **total take rate**, which is the total percentage of your gross sales that Etsy deducts per transaction.</p>

<h2>2. Itemized Math of a Typical US Sale</h2>
<p>Let's calculate the exact take rate for a standard domestic transaction in the United States. Suppose a seller lists a handmade item for **$40.00** and charges **$5.00** for shipping. The total paid by the buyer is **$45.00**.</p>
<p>Here is how Etsy's deductions break down:</p>
<ol>
  <li><strong>Listing Fee:</strong> $0.20 USD (flat charge to publish the item).</li>
  <li><strong>Transaction Fee (6.5% of $45.00):</strong> $2.93 USD.</li>
  <li><strong>Payment Processing Fee (3% of $45.00 + $0.25):</strong> $1.35 + $0.25 = $1.60 USD.</li>
  <li><strong>Total Deducted Fees:</strong> $0.20 + $2.93 + $1.60 = <strong>$4.73 USD</strong>.</li>
</ol>
<p>To find the true take rate, we divide the total fees by the total gross revenue: <strong>($4.73 / $45.00) * 100 = 10.51%</strong>.</p>
<p>In this typical case, Etsy takes approximately **10.51%** of your total revenue. The seller receives a net deposit of **$40.27** (out of which they must pay for shipping labels, materials, and labor).</p>

<h2>3. Hidden Charges That Increase Etsy's Cut</h2>
<p>While 10% is a standard baseline, certain account configurations can increase Etsy's total cut:</p>
<ul>
  <li><strong>Currency Conversion Fee:</strong> Labeled as a 2.5% exchange surcharge if you list products in EUR but withdraw to a USD bank account.</li>
  <li><strong>In-State Sales Tax:</strong> While Etsy remits state taxes automatically, some tax configurations are subjected to payment processing fees.</li>
  <li><strong>Postage Adjustments:</strong> If you declare an incorrect shipping weight, the shipping carrier bills Etsy, which then deducts the difference from your ledger.</li>
</ul>

<h2>4. The Drastic Impact of Offsite Ads on Fees</h2>
<p>The take rate increases significantly if the customer found your product through an Offsite Advertisement. Under the Offsite Ads program, Etsy charges an additional **12% or 15% fee** on the total sale price.</p>
<p>Let's look at the exact same $45.00 transaction if driven by an Offsite Ad for an opted-in seller (15% rate):</p>
<div class="my-6 overflow-x-auto bg-slate-50 dark:bg-slate-900 rounded-xl p-4 border border-slate-100 dark:border-slate-800 font-mono text-sm leading-relaxed">
  <p>Standard Baseline Fees: $4.73 USD</p>
  <p>Offsite Ads Fee (15% of $45.00): $6.75 USD</p>
  <p>Total Combined Fees: $4.73 + $6.75 = $11.48 USD</p>
  <p>True Etsy Take Rate: ($11.48 / $45.00) * 100 = 25.51%</p>
</div>
<p>In this case, Etsy takes more than **a quarter of your entire sales revenue**! This is why pricing products with robust margins is absolutely vital for e-commerce survival.</p>

<h2>5. How to Track Your Real Take Rate Instantly</h2>
<p>Do not wait until the end of the month to discover that Etsy took a massive portion of your revenues. Use our interactive Etsy Fee Calculator to test different prices, locations, and ad settings. Understanding your take rate gives you the leverage to price your crafts with confidence, protect your profit margins, and build a highly successful creative business.</p>
  `
};
