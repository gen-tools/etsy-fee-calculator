/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CalculatorInputs, CalculatorOutputs } from './types';

export function calculateEtsyFees(inputs: CalculatorInputs & { materialCost?: number }): CalculatorOutputs {
  const {
    productPrice,
    shippingCharged,
    shippingCost,
    quantity,
    discountType,
    discountValue,
    listingFee,
    transactionFeePercent,
    paymentProcessingPercent,
    paymentProcessingFixed,
    offsiteAdsPercent,
    taxPercent,
    materialCost = 0,
  } = inputs;

  // 1. Calculate discount per item
  let discountAmount = 0;
  if (discountType === 'percentage') {
    discountAmount = productPrice * (discountValue / 100);
  } else {
    discountAmount = discountValue;
  }
  // Cap discount at the item price
  discountAmount = Math.max(0, Math.min(productPrice, discountAmount));

  const discountedProductPrice = productPrice - discountAmount;

  // 2. Revenues
  const totalProductRevenue = discountedProductPrice * quantity;
  const grossRevenue = totalProductRevenue + shippingCharged;

  // 3. Listing Fee (charged per item for quantity sold)
  const totalListingFee = listingFee * quantity;

  // 4. Transaction Fee (6.5% of total paid by buyer: item + shipping + gift-wrapping)
  const taxableTransactionAmount = totalProductRevenue + shippingCharged;
  const transactionFee = taxableTransactionAmount * (transactionFeePercent / 100);

  // 5. Payment Processing Fee (calculated on buyer total including tax)
  const taxAmount = taxableTransactionAmount * (taxPercent / 100);
  const paymentFeeBasis = taxableTransactionAmount + taxAmount;
  const paymentFee = (paymentFeeBasis * (paymentProcessingPercent / 100)) + paymentProcessingFixed;

  // 6. Offsite Ads Fee
  const offsiteAdsFee = taxableTransactionAmount * (offsiteAdsPercent / 100);

  // 7. Shipping Profit/Loss
  const shippingProfitLoss = shippingCharged - shippingCost;

  // 8. Totals
  const totalFees = totalListingFee + transactionFee + paymentFee + offsiteAdsFee;
  
  // Expenses = Total Fees + actual shipping cost + material cost for quantity
  const totalMaterialCost = materialCost * quantity;
  const totalExpenses = totalFees + shippingCost + totalMaterialCost;
  
  const netProfit = grossRevenue - totalExpenses;

  // Margin = (Net Profit / Gross Revenue) * 100
  const profitMargin = grossRevenue > 0 ? (netProfit / grossRevenue) * 100 : 0;

  // ROI = (Net Profit / Total Costs) * 100
  const profitPercentage = totalExpenses > 0 ? (netProfit / totalExpenses) * 100 : 0;

  // 9. Mathematically derived Break-even Price
  // F_rate is the sum of percentage rates that apply to the sales total
  const T_rate = transactionFeePercent / 100;
  const P_rate = (paymentProcessingPercent / 100) * (1 + taxPercent / 100);
  const A_rate = offsiteAdsPercent / 100;
  const F_rate = T_rate + P_rate + A_rate;

  let breakEvenPrice = 0;
  if (F_rate < 1) {
    const numerator = (totalListingFee) + paymentProcessingFixed + shippingCost + totalMaterialCost;
    const breakEvenTotalRevenue = numerator / (1 - F_rate);
    const breakEvenProductRevenue = breakEvenTotalRevenue - shippingCharged;
    breakEvenPrice = breakEvenProductRevenue / quantity;
  }

  return {
    grossRevenue: Number(grossRevenue.toFixed(2)),
    discountAmount: Number((discountAmount * quantity).toFixed(2)),
    transactionFee: Number(transactionFee.toFixed(2)),
    listingFee: Number(totalListingFee.toFixed(2)),
    paymentFee: Number(paymentFee.toFixed(2)),
    offsiteAdsFee: Number(offsiteAdsFee.toFixed(2)),
    taxAmount: Number(taxAmount.toFixed(2)),
    shippingProfitLoss: Number(shippingProfitLoss.toFixed(2)),
    totalFees: Number(totalFees.toFixed(2)),
    netProfit: Number(netProfit.toFixed(2)),
    profitMargin: Number(profitMargin.toFixed(2)),
    profitPercentage: Number(profitPercentage.toFixed(2)),
    breakEvenPrice: Number(Math.max(0, breakEvenPrice).toFixed(2)),
  };
}

export function formatCurrency(amount: number, currencyCode: string = 'USD'): string {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
    }).format(amount);
  } catch (e) {
    return `${currencyCode} ${amount.toFixed(2)}`;
  }
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}
