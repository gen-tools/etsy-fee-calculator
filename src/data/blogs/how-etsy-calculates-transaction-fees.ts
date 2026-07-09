/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BlogPost } from '../../types';

export const howEtsyCalculatesTransactionFees: BlogPost = {
  slug: 'how-etsy-calculates-transaction-fees',
  title: 'How Etsy Calculates Transaction Fees: The Complete Formula',
  description: 'Deep dive into the math behind Etsy transaction fees. Understand how Etsy calculates their 6.5% cut of item prices, shipping, and gift-wrapping fees.',
  author: 'Sarah Jenkins, Etsy E-commerce Specialist',
  date: '2026-06-20',
  category: 'Advanced Calculations',
  readingTime: '10 min read',
  featuredImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800',
  tableOfContents: [
    { id: 'transaction-fee-definition', text: '1. What is the Etsy Transaction Fee?', level: 2 },
    { id: 'math-formula', text: '2. The Transaction Fee Formula', level: 2 },
    { id: 'shipping-charge-controversy', text: '3. Why Shipping Costs are Taxed', level: 2 },
    { id: 'gift-wrapping-inclusion', text: '4. Gift Wrapping and Personalization Fees', level: 2 },
    { id: 'step-by-step', text: '5. Step-by-Step Mathematical Example', level: 2 },
    { id: 'monitoring-ledger', text: '6. How to Verify Fees in Your Etsy Payment Ledger', level: 2 },
  ],
  faqs: [
    {
      question: 'Does Etsy calculate transaction fees on state taxes?',
      answer: 'No, Etsy transaction fees do not apply to sales taxes or VAT that are automatically collected and remitted by Etsy. However, if you manually charge local tax through your shop settings, that amount may be subjected to transaction fees.'
    },
    {
      question: 'Has the transaction fee percentage changed recently?',
      answer: 'Yes, Etsy increased the transaction fee from 5.0% to 6.5% in April 2022. It has remained at 6.5% since then, helping fund Etsy marketing, seller tools, and platform support.'
    }
  ],
  content: `
<h2>1. What is the Etsy Transaction Fee?</h2>
<p>The transaction fee is Etsy's core commission for providing the marketplace structure, matchmaking buyers with sellers, and maintaining the search infrastructure. Every time an item sells in your shop, Etsy automatically levies this fee. Unlike the listing fee, which is a flat $0.20 charged upfront, the transaction fee is a variable percentage assessed only when you make a sale.</p>
<p>As of 2026, the transaction fee stands at <strong>6.5%</strong>. This amount is subtracted directly from your gross revenues in your Etsy Payment account ledger before the funds are cleared for deposit into your bank account.</p>

<h2>2. The Transaction Fee Formula</h2>
<p>The transaction fee is calculated using a straightforward percentage-based equation, but the variable inputs can catch some sellers off-guard. Here is the formal math definition:</p>
<div class="my-6 p-5 bg-slate-50 dark:bg-slate-900 border-l-4 border-indigo-500 rounded-r-xl text-center">
  <code class="text-base md:text-lg font-mono font-bold text-slate-800 dark:text-slate-100">
    Transaction Fee = (Item Retail Price - Applied Discounts + Shipping Charged + Gift Wrapping Charged) * 0.065
  </code>
</div>
<p>This means if you run a 10% coupon code or markdown sale, the 6.5% fee is calculated on the <em>discounted</em> item price, not the original catalog retail price. However, you cannot reduce your transaction fee by inflating shipping fees or gift-wrap fees, as those elements are fully subject to the same 6.5% charge.</p>

<h2>3. Why Shipping Costs are Taxed</h2>
<p>When Etsy first introduced its transaction fee, it applied only to the retail price of the items. Many sellers realized they could list high-value items for extremely low prices (e.g., $5.00) while charging an exorbitant shipping fee (e.g., $45.00) to cover the difference. Because shipping was untaxed, the seller paid a fee only on the $5.00 portion, circumventing Etsy's commissions.</p>
<p>To establish a level playing field, Etsy closed this loophole in 2018 by expanding the transaction fee to cover shipping charges. Today, whether you charge $50 with free shipping, or $40 with a $10 shipping charge, the resulting 6.5% transaction fee is identical ($3.25).</p>

<h2>4. Gift Wrapping and Personalization Fees</h2>
<p>If you offer custom gift-wrapping services for an additional fee (such as $3.00 or $5.00 per package), this extra service is also considered part of the gross sales total. Etsy automatically adds the gift-wrapping charge to the item price when calculating the 6.5% transaction fee. The same applies to any custom personalization surcharges you implement via listing variations.</p>

<h2>5. Step-by-Step Mathematical Example</h2>
<p>Let's calculate the transaction fee for a standard order containing multiple items and custom services:</p>
<ul>
  <li><strong>Item A Price:</strong> $25.00</li>
  <li><strong>Item B Price:</strong> $15.00</li>
  <li><strong>Discount (10% off items):</strong> -$4.00</li>
  <li><strong>Shipping Charged:</strong> $6.00</li>
  <li><strong>Gift Wrapping Service:</strong> $4.00</li>
</ul>
<p>First, calculate the total taxable value:</p>
<ol>
  <li><strong>Adjusted Item Prices:</strong> $25.00 + $15.00 - $4.00 = $36.00</li>
  <li><strong>Shipping Charged:</strong> $6.00</li>
  <li><strong>Gift Wrapping:</strong> $4.00</li>
  <li><strong>Total Taxable Amount:</strong> $36.00 + $6.00 + $4.00 = $46.00</li>
</ol>
<p>Now, apply the 6.5% transaction fee:</p>
<div class="my-4 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl p-4 font-mono text-sm">
  <p>Transaction Fee = $46.00 * 0.065</p>
  <p>Transaction Fee = $2.99 USD</p>
</div>
<p>In this transaction, the total fee charged by Etsy for the transaction commission is exactly $2.99 USD. This is deducted immediately when the sale completes.</p>

<h2>6. How to Verify Fees in Your Etsy Payment Ledger</h2>
<p>To see exactly what Etsy is deducting from your sales, navigate to your <strong>Etsy Shop Manager -> Finances -> Payment Account</strong>. Here, you will find an itemized transaction ledger. Every time a sale is completed, you will see two line items for fees:</p>
<ul>
  <li><strong>Transaction Fee:</strong> Labeled with the order number, representing 6.5% of the item price.</li>
  <li><strong>Shipping Transaction Fee:</strong> Labeled with the order number, representing 6.5% of the shipping charged.</li>
</ul>
<p>Checking this ledger regularly helps you keep track of your cash flow and ensures that your actual costs align with your financial projections. For seamless pricing and planning, use our Etsy Fee Calculator to model these formulas in just a couple of clicks.</p>
  `
};
