/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BlogPost } from '../../types';

export const etsyListingFeesExplained: BlogPost = {
  slug: 'etsy-listing-fees-explained',
  title: 'Etsy Listing Fees Explained: Avoid Costly Mistakes',
  description: 'Everything you need to know about Etsy listing fees. Learn how multi-quantity listings, auto-renewals, and variations impact your $0.20 fees.',
  author: 'Sarah Jenkins, Etsy E-commerce Specialist',
  date: '2026-07-05',
  category: 'Etsy Fees 101',
  readingTime: '8 min read',
  featuredImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800',
  tableOfContents: [
    { id: 'listing-fee-overview', text: '1. What is an Etsy Listing Fee?', level: 2 },
    { id: 'listing-expiration', text: '2. The 4-Month Lifespan Rules', level: 2 },
    { id: 'multi-quantity-billing', text: '3. How Multi-Quantity Listings are Billed', level: 2 },
    { id: 'variation-billing', text: '4. Listing Variations and Personalizations', level: 2 },
    { id: 'fee-avoidance-tips', text: '5. Tips to Optimize Listing Expenses', level: 2 },
  ],
  faqs: [
    {
      question: 'Do draft listings cost money on Etsy?',
      answer: 'No, creating a draft listing is completely free. The $0.20 listing fee is only charged when you click "Publish" and make the listing active for buyers.'
    },
    {
      question: 'Do digital products require a separate listing fee?',
      answer: 'Yes, digital products carry the same $0.20 listing fee as physical items. Once listed, the digital file remains active for 4 months or until sold, requiring a $0.20 renewal fee upon sale.'
    }
  ],
  content: `
<h2>1. What is an Etsy Listing Fee?</h2>
<p>Before an item can be bought on Etsy, it must be listed. Etsy charges a flat <strong>$0.20 USD</strong> listing fee to publish an item to their public catalog. This is a non-refundable, upfront publishing cost that is charged immediately upon listing creation, regardless of whether you ever make a sale.</p>

<h2>2. The 4-Month Lifespan Rules</h2>
<p>Every active listing on Etsy has a maximum lifespan of <strong>four months</strong>. If your item does not sell within four months, the listing expires. To make it searchable for buyers again, you must renew it, which costs another $0.20. You can set listings to auto-renew to prevent them from lapsing, but keep an eye on slow-moving inventory to avoid paying recurring fees on items with low demand.</p>

<h2>3. How Multi-Quantity Listings are Billed</h2>
<p>If you create a listing for a product and specify a quantity of 10, the initial publishing fee is $0.20. When a customer purchases one of those items, the listing automatically renews for the remaining quantity of 9, charging you a $0.20 renewal fee. If a buyer purchases three items in a single transaction, you are charged $0.20 for the sale and an additional $0.40 multi-quantity fee for the other two items. The remaining seven items stay listed, and the listing expiration timer resets to 4 months.</p>

<h2>4. Listing Variations and Personalizations</h2>
<p>One of the best features of Etsy is the ability to offer variations, such as different sizes, colors, or personalization options. Creating variations under a single listing is completely free and does not trigger extra listing fees. However, if you create separate listings for each variation (e.g., "Red Mug Listing," "Blue Mug Listing"), you will pay $0.20 for each individual listing page. To minimize listing fees, always group related variations on a single page.</p>

<h2>5. Tips to Optimize Listing Expenses</h2>
<p>Listing fees are a small but steady drain on a shop's profitability. To optimize your listing expenses:</p>
<ul>
  <li>Turn off auto-renew on seasonal holiday inventory once the season ends.</li>
  <li>Consolidate identical items into single listings with custom variation dropdowns rather than multiplying listings.</li>
  <li>Verify that your listings contain strong keywords and high-quality images to ensure they sell within the 4-month window, preventing costly expirations.</li>
</ul>
<p>Use our Etsy Fee Calculator to model the impact of listing renewals on your net margins and design a highly profitable listing workflow.</p>
  `
};
