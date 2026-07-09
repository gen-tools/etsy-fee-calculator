/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BlogPost } from '../types';
import { whatAreEtsySellerFees } from './blogs/what-are-etsy-seller-fees';
import { howEtsyCalculatesTransactionFees } from './blogs/how-etsy-calculates-transaction-fees';
import { howToPriceEtsyProductsForProfit } from './blogs/how-to-price-etsy-products-for-profit';
import { commonEtsySellerMistakes } from './blogs/common-etsy-seller-mistakes';
import { etsyPaymentProcessingExplained } from './blogs/etsy-payment-processing-explained';
import { etsyListingFeesExplained } from './blogs/etsy-listing-fees-explained';
import { howToIncreaseEtsyProfitMargins } from './blogs/how-to-increase-etsy-profit-margins';
import { bestEtsySellerTools } from './blogs/best-etsy-seller-tools';
import { etsyFeeChangesOverTime } from './blogs/etsy-fee-changes-over-time';
import { howMuchDoesEtsyTakePerSale } from './blogs/how-much-does-etsy-take-per-sale';

export const BLOG_POSTS: BlogPost[] = [
  whatAreEtsySellerFees,
  howEtsyCalculatesTransactionFees,
  howToPriceEtsyProductsForProfit,
  commonEtsySellerMistakes,
  etsyPaymentProcessingExplained,
  etsyListingFeesExplained,
  howToIncreaseEtsyProfitMargins,
  bestEtsySellerTools,
  etsyFeeChangesOverTime,
  howMuchDoesEtsyTakePerSale,
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function getRelatedBlogPosts(currentSlug: string, count: number = 3): BlogPost[] {
  return BLOG_POSTS.filter((post) => post.slug !== currentSlug).slice(0, count);
}
