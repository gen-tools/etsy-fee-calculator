/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type PageRoute = 'home' | 'about' | 'contact' | 'privacy' | 'blog' | 'blog-post';

export interface CalculatorInputs {
  productPrice: number;
  shippingCharged: number;
  shippingCost: number;
  quantity: number;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  listingFee: number;
  transactionFeePercent: number;
  paymentProcessingPercent: number;
  paymentProcessingFixed: number;
  offsiteAdsPercent: number;
  currency: string;
  location: string;
  taxPercent: number;
}

export interface CalculatorOutputs {
  grossRevenue: number;
  discountAmount: number;
  transactionFee: number;
  listingFee: number;
  paymentFee: number;
  offsiteAdsFee: number;
  taxAmount: number;
  shippingProfitLoss: number;
  totalFees: number;
  netProfit: number;
  profitMargin: number; // percentage of net profit divided by gross revenue
  profitPercentage: number; // ROI: profit divided by cost
  breakEvenPrice: number;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string; // Markdown or structured sections
  author: string;
  date: string;
  category: string;
  readingTime: string;
  featuredImage: string;
  faqs: { question: string; answer: string; }[];
  tableOfContents: { id: string; text: string; level: number; }[];
}

export interface RegionConfig {
  name: string;
  currency: string;
  currencySymbol: string;
  listingFee: number;
  transactionFee: number;
  paymentPercent: number;
  paymentFixed: number;
}
