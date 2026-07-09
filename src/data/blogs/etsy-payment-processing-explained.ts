/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BlogPost } from '../../types';

export const etsyPaymentProcessingExplained: BlogPost = {
  slug: 'etsy-payment-processing-explained',
  title: 'Etsy Payment Processing Fees Explained: Regional Guide',
  description: 'What are Etsy Payments fees? Understand how location influences your transaction processing rates and discover how to optimize card processing costs globally.',
  author: 'Sarah Jenkins, Etsy E-commerce Specialist',
  date: '2026-07-02',
  category: 'Etsy Payments',
  readingTime: '9 min read',
  featuredImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=800',
  tableOfContents: [
    { id: 'payment-processing-definition', text: '1. What are Payment Processing Fees?', level: 2 },
    { id: 'regional-breakdown', text: '2. Regional Processing Fee Table', level: 2 },
    { id: 'transaction-difference', text: '3. Payment Processing vs. Transaction Fees', level: 2 },
    { id: 'deposit-thresholds', text: '4. Deposit Schedules and Currency Conversion Fees', level: 2 },
    { id: 'how-to-minimize', text: '5. How to Handle Payment Processing Expenses', level: 2 },
  ],
  faqs: [
    {
      question: 'Is Etsy Payments secure for buyers and sellers?',
      answer: 'Yes, Etsy Payments is PCI-compliant and supports industry-standard encryption. It protects sellers with seller protection insurance and gives buyers peace of mind through credit card dispute resolution mechanisms.'
    },
    {
      question: 'What is the currency conversion fee on Etsy?',
      answer: 'If you list items in a currency different from your payment bank accounts currency, Etsy charges a 2.5% currency conversion fee on the total sales amount. To avoid this fee, always match your listing currency to your bank account currency.'
    }
  ],
  content: `
<h2>1. What are Payment Processing Fees?</h2>
<p>Payment processing fees are standard charges assessed by credit card networks and payment gateways (like Visa, Mastercard, Apple Pay, and PayPal) to facilitate secure digital transfers of money. When a customer purchases from your Etsy shop, Etsy Payments processes the card data and charges you a fee for completing the transaction.</p>
<p>Unlike Etsy's flat transaction fee, the payment processing fee varies heavily based on the seller's home country. This is because card processing networks, local financial regulations, and banking structures differ across international borders.</p>

<h2>2. Regional Processing Fee Table</h2>
<p>Here is a breakdown of the payment processing fees charged by Etsy Payments in 2026 across major selling regions:</p>

<div class="my-6 overflow-x-auto bg-slate-50 dark:bg-slate-900 rounded-xl p-4 border border-slate-100 dark:border-slate-800">
  <table class="min-w-full text-left text-sm">
    <thead>
      <tr class="border-b border-slate-200 dark:border-slate-800 font-semibold text-slate-800 dark:text-slate-200">
        <th class="py-2">Seller Country</th>
        <th class="py-2">Processing Fee %</th>
        <th class="py-2">Fixed Fee</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-slate-100 dark:divide-slate-800 text-slate-600 dark:text-slate-400">
      <tr>
        <td class="py-2 font-medium text-slate-900 dark:text-slate-100">United States</td>
        <td class="py-2">3.0%</td>
        <td class="py-2">$0.25 USD</td>
      </tr>
      <tr>
        <td class="py-2 font-medium text-slate-900 dark:text-slate-100">Canada (Domestic)</td>
        <td class="py-2">3.0%</td>
        <td class="py-2">$0.25 CAD</td>
      </tr>
      <tr>
        <td class="py-2 font-medium text-slate-900 dark:text-slate-100">United Kingdom</td>
        <td class="py-2">4.0%</td>
        <td class="py-2">£0.20 GBP</td>
      </tr>
      <tr>
        <td class="py-2 font-medium text-slate-900 dark:text-slate-100">Eurozone Countries</td>
        <td class="py-2">4.0%</td>
        <td class="py-2">€0.30 EUR</td>
      </tr>
      <tr>
        <td class="py-2 font-medium text-slate-900 dark:text-slate-100">Australia</td>
        <td class="py-2">3.0%</td>
        <td class="py-2">$0.25 AUD</td>
      </tr>
    </tbody>
  </table>
</div>

<h2>3. Payment Processing vs. Transaction Fees</h2>
<p>A common point of confusion for sellers is the difference between transaction fees and payment processing fees:</p>
<ul>
  <li><strong>Etsy Transaction Fee:</strong> A 6.5% charge that goes directly to Etsy as their commission for hosting your shop and facilitating the sale.</li>
  <li><strong>Etsy Payment Processing Fee:</strong> A separate fee (e.g., 3.0% + $0.25 in the US) that covers the third-party merchant processor costs.</li>
</ul>
<p>Both fees are charged on every transaction, meaning that for a US-based seller, the combined baseline variable commission is roughly <strong>9.5% + $0.25</strong> per transaction.</p>

<h2>4. Deposit Schedules and Currency Conversion Fees</h2>
<p>Once processed, your net funds accumulate in your Etsy Payment account. You can configure your deposit schedule to transfer funds to your bank daily, weekly, bi-weekly, or monthly.</p>
<p>If you sell to international customers in a different currency, be aware of the currency conversion surcharge. If a customer pays in Euros but your shop operates in USD, Etsy charges a <strong>2.5% conversion fee</strong> to execute the exchange. Always list your items in the local currency of your bank account to completely bypass this fee.</p>

<h2>5. How to Handle Payment Processing Expenses</h2>
<p>Because payment processing fees contain a fixed component (such as $0.25 USD), they represent a larger percentage of lower-priced items than higher-priced items. For instance, on a $5.00 purchase, a $0.25 fixed fee represents 5% of your sales price alone! To combat this, group low-cost materials into multi-item bundles. This spreads the impact of the fixed fee across multiple products and improves your net profit margins. Keep track of these regional processing rates by selecting your exact location in our Etsy Fee Calculator.</p>
  `
};
