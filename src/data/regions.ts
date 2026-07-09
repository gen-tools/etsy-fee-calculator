/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RegionConfig } from '../types';

export const REGIONS: Record<string, RegionConfig> = {
  US: {
    name: 'United States',
    currency: 'USD',
    currencySymbol: '$',
    listingFee: 0.20,
    transactionFee: 6.5,
    paymentPercent: 3.0,
    paymentFixed: 0.25,
  },
  CA: {
    name: 'Canada',
    currency: 'CAD',
    currencySymbol: 'CA$',
    listingFee: 0.20,
    transactionFee: 6.5,
    paymentPercent: 3.0,
    paymentFixed: 0.25,
  },
  UK: {
    name: 'United Kingdom',
    currency: 'GBP',
    currencySymbol: '£',
    listingFee: 0.20,
    transactionFee: 6.5,
    paymentPercent: 4.0,
    paymentFixed: 0.20,
  },
  EU: {
    name: 'Eurozone (Germany, France, etc.)',
    currency: 'EUR',
    currencySymbol: '€',
    listingFee: 0.20,
    transactionFee: 6.5,
    paymentPercent: 4.0,
    paymentFixed: 0.30,
  },
  AU: {
    name: 'Australia',
    currency: 'AUD',
    currencySymbol: 'A$',
    listingFee: 0.20,
    transactionFee: 6.5,
    paymentPercent: 3.0,
    paymentFixed: 0.25,
  },
};

export const CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'CAD', symbol: 'CA$', name: 'Canadian Dollar' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
];
