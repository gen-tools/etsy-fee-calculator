/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

"use client";

import { useState, useEffect, useRef } from 'react';
import { CalculatorInputs, CalculatorOutputs, RegionConfig } from '../types';
import { REGIONS, CURRENCIES } from '../data/regions';
import { calculateEtsyFees, formatCurrency, formatNumber } from '../utils';
import { 
  RefreshCw, Copy, Printer, Share2, DollarSign, HelpCircle, 
  CheckCircle, ArrowRightLeft, Percent, Compass, Info, ShieldCheck,
  TrendingUp, TrendingDown, Award, Calculator, FileSpreadsheet
} from 'lucide-react';

const DEFAULT_INPUTS: CalculatorInputs & { materialCost: number } = {
  productPrice: 35.00,
  shippingCharged: 5.00,
  shippingCost: 4.20,
  quantity: 1,
  discountType: 'percentage',
  discountValue: 0,
  listingFee: 0.20,
  transactionFeePercent: 6.5,
  paymentProcessingPercent: 3.0,
  paymentProcessingFixed: 0.25,
  offsiteAdsPercent: 0,
  currency: 'USD',
  location: 'US',
  taxPercent: 0,
  materialCost: 8.50,
};

interface FeeCalculatorProps {
  initialRegionCode?: string;
}

export default function FeeCalculator({ initialRegionCode = 'US' }: FeeCalculatorProps) {
  // 1. Initial State Definition
  const [inputs, setInputs] = useState(DEFAULT_INPUTS);
  const [outputs, setOutputs] = useState<CalculatorOutputs | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  // 2. Load parameters from URL on mount (for Sharing Feature)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.has('price')) {
        const urlInputs = {
          productPrice: Number(params.get('price')) || DEFAULT_INPUTS.productPrice,
          shippingCharged: Number(params.get('shipping_charged')) || DEFAULT_INPUTS.shippingCharged,
          shippingCost: Number(params.get('shipping_cost')) || DEFAULT_INPUTS.shippingCost,
          quantity: Number(params.get('qty')) || DEFAULT_INPUTS.quantity,
          discountType: (params.get('discount_type') as 'percentage' | 'fixed') || DEFAULT_INPUTS.discountType,
          discountValue: Number(params.get('discount')) || DEFAULT_INPUTS.discountValue,
          listingFee: Number(params.get('listing')) || DEFAULT_INPUTS.listingFee,
          transactionFeePercent: Number(params.get('tx_percent')) || DEFAULT_INPUTS.transactionFeePercent,
          paymentProcessingPercent: Number(params.get('pay_percent')) || DEFAULT_INPUTS.paymentProcessingPercent,
          paymentProcessingFixed: Number(params.get('pay_fixed')) || DEFAULT_INPUTS.paymentProcessingFixed,
          offsiteAdsPercent: Number(params.get('ads')) || DEFAULT_INPUTS.offsiteAdsPercent,
          currency: params.get('currency') || DEFAULT_INPUTS.currency,
          location: params.get('location') || DEFAULT_INPUTS.location,
          taxPercent: Number(params.get('tax')) || DEFAULT_INPUTS.taxPercent,
          materialCost: Number(params.get('material')) || DEFAULT_INPUTS.materialCost,
        };
        setInputs(urlInputs);
        setOutputs(calculateEtsyFees(urlInputs));
        setHasCalculated(true);
      } else if (initialRegionCode && REGIONS[initialRegionCode]) {
        const config = REGIONS[initialRegionCode];
        const loadedInputs = {
          ...DEFAULT_INPUTS,
          location: initialRegionCode,
          currency: config.currency,
          listingFee: config.listingFee,
          transactionFeePercent: config.transactionFee,
          paymentProcessingPercent: config.paymentPercent,
          paymentProcessingFixed: config.paymentFixed,
        };
        setInputs(loadedInputs);
        setOutputs(calculateEtsyFees(loadedInputs));
        setHasCalculated(true);
      } else {
        setOutputs(calculateEtsyFees(DEFAULT_INPUTS));
        setHasCalculated(true);
      }
    } catch (e) {
      console.error('Failed to parse URL params', e);
    }
  }, [initialRegionCode]);

  // 3. Manual Calculation Handler
  const handleCalculate = () => {
    const results = calculateEtsyFees(inputs);
    setOutputs(results);
    setHasCalculated(true);
  };

  // 4. Region Sync Helper
  const handleRegionChange = (regionCode: string) => {
    const config = REGIONS[regionCode];
    if (config) {
      setInputs(prev => ({
        ...prev,
        location: regionCode,
        currency: config.currency,
        listingFee: config.listingFee,
        transactionFeePercent: config.transactionFee,
        paymentProcessingPercent: config.paymentPercent,
        paymentProcessingFixed: config.paymentFixed,
      }));
      setHasCalculated(false);
    }
  };

  // 5. Input updates
  const handleInputChange = (field: keyof typeof inputs, value: any) => {
    setInputs(prev => {
      const updated = { ...prev, [field]: value };
      return updated;
    });
    setHasCalculated(false);
  };

  // 6. Reset Form
  const handleReset = () => {
    setInputs(DEFAULT_INPUTS);
    if (REGIONS[DEFAULT_INPUTS.location]) {
      const config = REGIONS[DEFAULT_INPUTS.location];
      setInputs({
        ...DEFAULT_INPUTS,
        currency: config.currency,
        listingFee: config.listingFee,
        transactionFeePercent: config.transactionFee,
        paymentProcessingPercent: config.paymentPercent,
        paymentProcessingFixed: config.paymentFixed,
      });
    }
    setHasCalculated(false);
    // Clear URL search params
    const cleanUrl = window.location.protocol + '//' + window.location.host + window.location.pathname;
    window.history.replaceState({ path: cleanUrl }, '', cleanUrl);
  };

  // 7. Download results as Excel (CSV)
  const handleDownloadExcel = () => {
    if (!outputs) return;
    
    const rows = [
      ['Etsy Fee & Profit Calculation Report'],
      ['Generated via EtsyFeeCalculator on', new Date().toLocaleDateString()],
      [''],
      ['INPUT PARAMETERS', 'VALUE', 'CURRENCY/UNIT'],
      ['Shop Location', inputs.location, ''],
      ['Listing Currency', inputs.currency, ''],
      ['Product List Price', inputs.productPrice.toFixed(2), inputs.currency],
      ['Material Cost per Item', inputs.materialCost.toFixed(2), inputs.currency],
      ['Quantity Sold', inputs.quantity, 'units'],
      ['Discount Type', inputs.discountType, ''],
      ['Discount Value', inputs.discountValue, inputs.discountType === 'percentage' ? '%' : inputs.currency],
      ['Shipping Charged (to Buyer)', inputs.shippingCharged.toFixed(2), inputs.currency],
      ['Shipping Cost (Your Expense)', inputs.shippingCost.toFixed(2), inputs.currency],
      ['Listing Publishing Fee', inputs.listingFee.toFixed(2), inputs.currency],
      ['Transaction Commission Rate', inputs.transactionFeePercent + '%', ''],
      ['Sales Tax / VAT Rate', inputs.taxPercent + '%', ''],
      ['Card Processing Percent', inputs.paymentProcessingPercent + '%', ''],
      ['Card Processing Fixed Fee', inputs.paymentProcessingFixed.toFixed(2), inputs.currency],
      ['Offsite Ads Commission Rate', inputs.offsiteAdsPercent + '%', ''],
      [''],
      ['FINANCIAL OUTCOME LEDGER', 'VALUE', 'CURRENCY/UNIT'],
      ['Gross Customer Revenue', outputs.grossRevenue.toFixed(2), inputs.currency],
      ['Discount Applied', outputs.discountAmount.toFixed(2), inputs.currency],
      ['Listing Fees', outputs.listingFee.toFixed(2), inputs.currency],
      ['Transaction Fees', outputs.transactionFee.toFixed(2), inputs.currency],
      ['Card Processing Fees', outputs.paymentFee.toFixed(2), inputs.currency],
      ['Offsite Ads Fees', outputs.offsiteAdsFee.toFixed(2), inputs.currency],
      ['Sales Tax / VAT Remitted', outputs.taxAmount.toFixed(2), inputs.currency],
      ['Total Etsy Fees', outputs.totalFees.toFixed(2), inputs.currency],
      ['Shipping Profit/Loss', outputs.shippingProfitLoss.toFixed(2), inputs.currency],
      ['Total Material Costs', (inputs.materialCost * inputs.quantity).toFixed(2), inputs.currency],
      ['Net Profit', outputs.netProfit.toFixed(2), inputs.currency],
      ['Profit Margin', outputs.profitMargin.toFixed(1) + '%', ''],
      ['ROI / Markup', outputs.profitPercentage.toFixed(1) + '%', ''],
      ['Break-Even Retail Price (Per Item)', outputs.breakEvenPrice.toFixed(2), inputs.currency],
    ];

    const csvContent = rows
      .map(row => row.map(val => {
        const str = String(val);
        const escaped = str.replace(/"/g, '""');
        return escaped.includes(',') || escaped.includes('"') || escaped.includes('\n') ? `"${escaped}"` : escaped;
      }).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `etsy_fee_report_${inputs.location}_${inputs.currency}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 7. Copy results ledger
  const handleCopy = () => {
    if (!outputs) return;
    const symbol = CURRENCIES.find(c => c.code === inputs.currency)?.symbol || '$';
    const text = `--- ETSY TRANSACTION LEDGER ---
Location: ${inputs.location} (${inputs.currency})
Quantity: ${inputs.quantity} units
--------------------------------
Product Price: ${symbol}${inputs.productPrice.toFixed(2)}
Discount Applied: ${symbol}${outputs.discountAmount.toFixed(2)}
Shipping Charged: ${symbol}${inputs.shippingCharged.toFixed(2)}
--------------------------------
Gross Revenue: ${symbol}${outputs.grossRevenue.toFixed(2)}

ETSY FEES DETAILED:
- Listing Fees: ${symbol}${outputs.listingFee.toFixed(2)}
- Transaction Commission (6.5%): ${symbol}${outputs.transactionFee.toFixed(2)}
- Payment Processing Fee: ${symbol}${outputs.paymentFee.toFixed(2)}
- Offsite Ads Surcharge: ${symbol}${outputs.offsiteAdsFee.toFixed(2)}
- Sales Tax Allocation: ${symbol}${outputs.taxAmount.toFixed(2)}
Total Etsy Fees: ${symbol}${outputs.totalFees.toFixed(2)}

SELLER FINANCIAL OUTCOME:
- Item Material Costs: ${symbol}${(inputs.materialCost * inputs.quantity).toFixed(2)}
- Actual Shipping Costs: ${symbol}${inputs.shippingCost.toFixed(2)}
- Shipping Net Profit/Loss: ${symbol}${outputs.shippingProfitLoss.toFixed(2)}
--------------------------------
Net Profit: ${symbol}${outputs.netProfit.toFixed(2)}
Profit Margin: ${outputs.profitMargin}%
Return on Investment (ROI): ${outputs.profitPercentage}%
Break-even Sales Price (Per Item): ${symbol}${outputs.breakEvenPrice.toFixed(2)}

Calculated via EtsyFeeCalc - Ultimate Calculator
`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 8. Generate shareable parameters
  const handleShare = () => {
    const params = new URLSearchParams();
    params.set('price', inputs.productPrice.toString());
    params.set('shipping_charged', inputs.shippingCharged.toString());
    params.set('shipping_cost', inputs.shippingCost.toString());
    params.set('qty', inputs.quantity.toString());
    params.set('discount_type', inputs.discountType);
    params.set('discount', inputs.discountValue.toString());
    params.set('listing', inputs.listingFee.toString());
    params.set('tx_percent', inputs.transactionFeePercent.toString());
    params.set('pay_percent', inputs.paymentProcessingPercent.toString());
    params.set('pay_fixed', inputs.paymentProcessingFixed.toString());
    params.set('ads', inputs.offsiteAdsPercent.toString());
    params.set('currency', inputs.currency);
    params.set('location', inputs.location);
    params.set('tax', inputs.taxPercent.toString());
    params.set('material', inputs.materialCost.toString());

    const shareUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?${params.toString()}`;
    navigator.clipboard.writeText(shareUrl);
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  // 9. Standard Print Action
  const handlePrint = () => {
    window.print();
  };

  // Tooltips Dictionary
  const tooltips: Record<string, string> = {
    location: "Select your Shop Location. This will instantly configure Etsy's standard regional payment processing fees and currency settings.",
    price: "The list retail price of your item (before shipping or sales tax is applied).",
    shippingCharged: "The amount you charge the customer for shipping. Enter 0 if you are offering 'Free Shipping'.",
    shippingCost: "Your actual, real cost to ship the product (postage, packaging boxes, tissue paper, labels).",
    quantity: "The total number of units purchased in this transaction.",
    discount: "Coupons or sale discounts applied. Etsy applies transaction fees based on the discounted subtotal price.",
    materialCost: "Your cost to make or source the item (raw materials, labels, direct wage allocation). This factors into your net profit and ROI.",
    listingFee: "Flat fee charged by Etsy to publish an item for sale. It costs $0.20 and lasts for 4 months or until sold.",
    txPercent: "Etsy's transaction commission rate. Currently 6.5% calculated on the total paid by the buyer (item + shipping).",
    payPercent: "The variable portion of Etsy's secure payment card swipe, dependent on your shop's region.",
    payFixed: "The fixed transaction processing component (such as $0.25 USD) charged per payment card invoice.",
    offsiteAds: "Performance-based fee if your item is sold via Etsy's external ads. Standard rate is 15% (under $10k sales) or 12% (over $10k sales).",
    taxPercent: "Estimated sales tax or VAT rate applied to the order. This is factored into the payment processor swiping basis."
  };

  const currentSymbol = CURRENCIES.find(c => c.code === inputs.currency)?.symbol || '$';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="etsy-fee-calculator-app">
      
      {/* LEFT: Inputs Form Panel */}
      <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-md transition-all duration-300 no-print">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 dark:border-slate-800/60 pb-5 mb-6 gap-3">
          <div>
            <h2 className="font-display text-xl font-bold text-slate-950 dark:text-white flex items-center gap-2">
              <Compass className="h-5 w-5 text-orange-500 animate-spin-slow" />
              Configure Calculator
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Adjust inputs below. Calculations update instantly.
            </p>
          </div>
          
          <button
            onClick={handleReset}
            className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:border-slate-700 transition-all duration-150 cursor-pointer self-start sm:self-center"
            aria-label="Reset Calculator Parameters"
            id="calculator-reset-btn"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Reset Inputs</span>
          </button>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()} aria-label="Etsy Fee Calculator Form">
          
          {/* Section: Shop Location & Currency (Auto-Sync) */}
          <div className="bg-slate-50 dark:bg-slate-950 rounded-2xl p-4 border border-slate-100 dark:border-slate-900">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  <span>Shop Location / Region</span>
                  <button 
                    type="button" 
                    onClick={() => setActiveTooltip(activeTooltip === 'location' ? null : 'location')}
                    aria-label="Explain location selection"
                    className="text-slate-400 hover:text-slate-600 focus:outline-none"
                  >
                    <HelpCircle className="h-3.5 w-3.5" />
                  </button>
                </label>
                {activeTooltip === 'location' && (
                  <div className="mb-2 p-3 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900 rounded-xl text-xs text-indigo-700 dark:text-indigo-300 leading-relaxed">
                    {tooltips.location}
                  </div>
                )}
                <select
                  value={inputs.location}
                  onChange={(e) => handleRegionChange(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3.5 py-2.5 text-sm text-slate-950 dark:text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all duration-150"
                  id="calc-input-location"
                >
                  {Object.entries(REGIONS).map(([code, region]) => (
                    <option key={code} value={code}>
                      {region.name} ({code})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  <span>Listing Currency</span>
                </label>
                <select
                  value={inputs.currency}
                  onChange={(e) => handleInputChange('currency', e.target.value)}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3.5 py-2.5 text-sm text-slate-950 dark:text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all duration-150"
                  id="calc-input-currency"
                >
                  {CURRENCIES.map((curr) => (
                    <option key={curr.code} value={curr.code}>
                      {curr.code} ({curr.symbol}) - {curr.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Section: Core Financial Inputs */}
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-3 border-b border-slate-100 dark:border-slate-800/40 pb-1">
              Core Item & Sales Details
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Product Price */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  <span>Product List Price</span>
                  <button 
                    type="button" 
                    onClick={() => setActiveTooltip(activeTooltip === 'price' ? null : 'price')}
                    className="text-slate-400 hover:text-slate-600 focus:outline-none"
                    aria-label="Explain product list price"
                  >
                    <HelpCircle className="h-3.5 w-3.5" />
                  </button>
                </label>
                {activeTooltip === 'price' && (
                  <div className="mb-2 p-3 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900 rounded-xl text-xs text-indigo-700 dark:text-indigo-300 leading-relaxed">
                    {tooltips.price}
                  </div>
                )}
                <div className="relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 font-mono text-sm">
                    {currentSymbol}
                  </div>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={inputs.productPrice}
                    onChange={(e) => handleInputChange('productPrice', Math.max(0, parseFloat(e.target.value) || 0))}
                    className="block w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-950 dark:text-white text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all"
                    placeholder="0.00"
                    id="calc-input-price"
                  />
                </div>
              </div>

              {/* Material / Item Cost */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  <span>Material Cost per Item</span>
                  <button 
                    type="button" 
                    onClick={() => setActiveTooltip(activeTooltip === 'materialCost' ? null : 'materialCost')}
                    className="text-slate-400 hover:text-slate-600 focus:outline-none"
                    aria-label="Explain material cost"
                  >
                    <HelpCircle className="h-3.5 w-3.5" />
                  </button>
                </label>
                {activeTooltip === 'materialCost' && (
                  <div className="mb-2 p-3 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900 rounded-xl text-xs text-indigo-700 dark:text-indigo-300 leading-relaxed">
                    {tooltips.materialCost}
                  </div>
                )}
                <div className="relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 font-mono text-sm">
                    {currentSymbol}
                  </div>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={inputs.materialCost}
                    onChange={(e) => handleInputChange('materialCost', Math.max(0, parseFloat(e.target.value) || 0))}
                    className="block w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-950 dark:text-white text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all"
                    placeholder="0.00"
                    id="calc-input-material"
                  />
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  <span>Quantity Sold</span>
                  <button 
                    type="button" 
                    onClick={() => setActiveTooltip(activeTooltip === 'quantity' ? null : 'quantity')}
                    className="text-slate-400 hover:text-slate-600 focus:outline-none"
                    aria-label="Explain quantity"
                  >
                    <HelpCircle className="h-3.5 w-3.5" />
                  </button>
                </label>
                {activeTooltip === 'quantity' && (
                  <div className="mb-2 p-3 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900 rounded-xl text-xs text-indigo-700 dark:text-indigo-300 leading-relaxed">
                    {tooltips.quantity}
                  </div>
                )}
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={inputs.quantity}
                  onChange={(e) => handleInputChange('quantity', Math.max(1, parseInt(e.target.value) || 1))}
                  className="block w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-950 dark:text-white text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all"
                  placeholder="1"
                  id="calc-input-quantity"
                />
              </div>

              {/* Discount Section */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  <span>Coupon or Discount</span>
                  <button 
                    type="button" 
                    onClick={() => setActiveTooltip(activeTooltip === 'discount' ? null : 'discount')}
                    className="text-slate-400 hover:text-slate-600 focus:outline-none"
                    aria-label="Explain discounts"
                  >
                    <HelpCircle className="h-3.5 w-3.5" />
                  </button>
                </label>
                {activeTooltip === 'discount' && (
                  <div className="mb-2 p-3 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900 rounded-xl text-xs text-indigo-700 dark:text-indigo-300 leading-relaxed">
                    {tooltips.discount}
                  </div>
                )}
                <div className="flex gap-2">
                  <select
                    value={inputs.discountType}
                    onChange={(e) => handleInputChange('discountType', e.target.value)}
                    className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-2.5 text-xs text-slate-700 dark:text-slate-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
                    id="calc-input-discount-type"
                  >
                    <option value="percentage">% Off</option>
                    <option value="fixed">Flat Off</option>
                  </select>
                  <div className="relative rounded-xl flex-1">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 font-mono text-sm">
                      {inputs.discountType === 'percentage' ? '%' : currentSymbol}
                    </div>
                    <input
                      type="number"
                      min="0"
                      step="any"
                      value={inputs.discountValue}
                      onChange={(e) => handleInputChange('discountValue', Math.max(0, parseFloat(e.target.value) || 0))}
                      className="block w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-950 dark:text-white text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all"
                      placeholder="0"
                      id="calc-input-discount-value"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section: Shipping Details */}
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-3 border-b border-slate-100 dark:border-slate-800/40 pb-1">
              Shipping Configurations
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Shipping Charged */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  <span>Shipping Charged (to Buyer)</span>
                  <button 
                    type="button" 
                    onClick={() => setActiveTooltip(activeTooltip === 'shippingCharged' ? null : 'shippingCharged')}
                    className="text-slate-400 hover:text-slate-600 focus:outline-none"
                    aria-label="Explain shipping charged"
                  >
                    <HelpCircle className="h-3.5 w-3.5" />
                  </button>
                </label>
                {activeTooltip === 'shippingCharged' && (
                  <div className="mb-2 p-3 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900 rounded-xl text-xs text-indigo-700 dark:text-indigo-300 leading-relaxed">
                    {tooltips.shippingCharged}
                  </div>
                )}
                <div className="relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 font-mono text-sm">
                    {currentSymbol}
                  </div>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={inputs.shippingCharged}
                    onChange={(e) => handleInputChange('shippingCharged', Math.max(0, parseFloat(e.target.value) || 0))}
                    className="block w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-950 dark:text-white text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all"
                    placeholder="0.00"
                    id="calc-input-shipping-charged"
                  />
                </div>
              </div>

              {/* Shipping Cost */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  <span>Shipping Cost (Your Expense)</span>
                  <button 
                    type="button" 
                    onClick={() => setActiveTooltip(activeTooltip === 'shippingCost' ? null : 'shippingCost')}
                    className="text-slate-400 hover:text-slate-600 focus:outline-none"
                    aria-label="Explain shipping cost"
                  >
                    <HelpCircle className="h-3.5 w-3.5" />
                  </button>
                </label>
                {activeTooltip === 'shippingCost' && (
                  <div className="mb-2 p-3 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900 rounded-xl text-xs text-indigo-700 dark:text-indigo-300 leading-relaxed">
                    {tooltips.shippingCost}
                  </div>
                )}
                <div className="relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 font-mono text-sm">
                    {currentSymbol}
                  </div>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={inputs.shippingCost}
                    onChange={(e) => handleInputChange('shippingCost', Math.max(0, parseFloat(e.target.value) || 0))}
                    className="block w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-950 dark:text-white text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all"
                    placeholder="0.00"
                    id="calc-input-shipping-cost"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section: Advanced Etsy Commissions & Fees */}
          <div>
            <div className="flex items-center justify-between mb-3 border-b border-slate-100 dark:border-slate-800/40 pb-1">
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400">
                Advanced Etsy Fees & Surcharges
              </h3>
              <span className="text-[10px] font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 px-1.5 py-0.5 rounded uppercase tracking-wider font-mono">
                Auto-synced
              </span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Listing Fee */}
              <div>
                <label className="flex items-center gap-1 text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  <span>Listing Fee</span>
                  <button 
                    type="button" 
                    onClick={() => setActiveTooltip(activeTooltip === 'listingFee' ? null : 'listingFee')}
                    className="text-slate-400 hover:text-slate-600 focus:outline-none"
                    aria-label="Explain listing fee"
                  >
                    <HelpCircle className="h-3 w-3" />
                  </button>
                </label>
                {activeTooltip === 'listingFee' && (
                  <div className="absolute z-10 p-3 bg-indigo-50 dark:bg-indigo-950 border border-indigo-100 dark:border-indigo-900 rounded-xl text-xs text-indigo-700 dark:text-indigo-300 leading-normal max-w-xs">
                    {tooltips.listingFee}
                  </div>
                )}
                <div className="relative rounded-xl">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400 font-mono text-xs">
                    {currentSymbol}
                  </div>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={inputs.listingFee}
                    onChange={(e) => handleInputChange('listingFee', Math.max(0, parseFloat(e.target.value) || 0))}
                    className="block w-full pl-7 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-950 dark:text-white text-xs focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
                    id="calc-input-listing-fee"
                  />
                </div>
              </div>

              {/* Transaction Fee % */}
              <div>
                <label className="flex items-center gap-1 text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  <span>Transaction %</span>
                  <button 
                    type="button" 
                    onClick={() => setActiveTooltip(activeTooltip === 'txPercent' ? null : 'txPercent')}
                    className="text-slate-400 hover:text-slate-600 focus:outline-none"
                    aria-label="Explain transaction percentage"
                  >
                    <HelpCircle className="h-3 w-3" />
                  </button>
                </label>
                {activeTooltip === 'txPercent' && (
                  <div className="absolute z-10 p-3 bg-indigo-50 dark:bg-indigo-950 border border-indigo-100 dark:border-indigo-900 rounded-xl text-xs text-indigo-700 dark:text-indigo-300 leading-normal max-w-xs">
                    {tooltips.txPercent}
                  </div>
                )}
                <div className="relative rounded-xl">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400 font-mono text-xs">
                    %
                  </div>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={inputs.transactionFeePercent}
                    onChange={(e) => handleInputChange('transactionFeePercent', Math.max(0, parseFloat(e.target.value) || 0))}
                    className="block w-full pr-7 pl-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-950 dark:text-white text-xs focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
                    id="calc-input-transaction-fee-percent"
                  />
                </div>
              </div>

              {/* Sales Tax Estimated % */}
              <div>
                <label className="flex items-center gap-1 text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  <span>Sales Tax/VAT %</span>
                  <button 
                    type="button" 
                    onClick={() => setActiveTooltip(activeTooltip === 'taxPercent' ? null : 'taxPercent')}
                    className="text-slate-400 hover:text-slate-600 focus:outline-none"
                    aria-label="Explain tax percentage"
                  >
                    <HelpCircle className="h-3 w-3" />
                  </button>
                </label>
                {activeTooltip === 'taxPercent' && (
                  <div className="absolute z-10 p-3 bg-indigo-50 dark:bg-indigo-950 border border-indigo-100 dark:border-indigo-900 rounded-xl text-xs text-indigo-700 dark:text-indigo-300 leading-normal max-w-xs">
                    {tooltips.taxPercent}
                  </div>
                )}
                <div className="relative rounded-xl">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400 font-mono text-xs">
                    %
                  </div>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={inputs.taxPercent}
                    onChange={(e) => handleInputChange('taxPercent', Math.max(0, parseFloat(e.target.value) || 0))}
                    className="block w-full pr-7 pl-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-950 dark:text-white text-xs focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
                    id="calc-input-tax-percent"
                  />
                </div>
              </div>
            </div>

            {/* Payment Processor Rates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="flex items-center gap-1 text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  <span>Card Processing Percent</span>
                  <button 
                    type="button" 
                    onClick={() => setActiveTooltip(activeTooltip === 'payPercent' ? null : 'payPercent')}
                    className="text-slate-400 hover:text-slate-600 focus:outline-none"
                    aria-label="Explain card processing percentage"
                  >
                    <HelpCircle className="h-3 w-3" />
                  </button>
                </label>
                {activeTooltip === 'payPercent' && (
                  <div className="absolute z-10 p-3 bg-indigo-50 dark:bg-indigo-950 border border-indigo-100 dark:border-indigo-900 rounded-xl text-xs text-indigo-700 dark:text-indigo-300 leading-normal max-w-xs">
                    {tooltips.payPercent}
                  </div>
                )}
                <div className="relative rounded-xl">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400 font-mono text-xs">
                    %
                  </div>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={inputs.paymentProcessingPercent}
                    onChange={(e) => handleInputChange('paymentProcessingPercent', Math.max(0, parseFloat(e.target.value) || 0))}
                    className="block w-full pr-7 pl-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-950 dark:text-white text-xs focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
                    id="calc-input-processing-percent"
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center gap-1 text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  <span>Card Processing Fixed Fee</span>
                  <button 
                    type="button" 
                    onClick={() => setActiveTooltip(activeTooltip === 'payFixed' ? null : 'payFixed')}
                    className="text-slate-400 hover:text-slate-600 focus:outline-none"
                    aria-label="Explain card processing fixed fee"
                  >
                    <HelpCircle className="h-3 w-3" />
                  </button>
                </label>
                {activeTooltip === 'payFixed' && (
                  <div className="absolute z-10 p-3 bg-indigo-50 dark:bg-indigo-950 border border-indigo-100 dark:border-indigo-900 rounded-xl text-xs text-indigo-700 dark:text-indigo-300 leading-normal max-w-xs">
                    {tooltips.payFixed}
                  </div>
                )}
                <div className="relative rounded-xl">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400 font-mono text-xs">
                    {currentSymbol}
                  </div>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={inputs.paymentProcessingFixed}
                    onChange={(e) => handleInputChange('paymentProcessingFixed', Math.max(0, parseFloat(e.target.value) || 0))}
                    className="block w-full pl-7 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-950 dark:text-white text-xs focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
                    id="calc-input-processing-fixed"
                  />
                </div>
              </div>
            </div>

            {/* Offsite Advertising Program */}
            <div className="mt-4">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                <span>Etsy Offsite Ads Campaign</span>
                <button 
                  type="button" 
                  onClick={() => setActiveTooltip(activeTooltip === 'offsiteAds' ? null : 'offsiteAds')}
                  className="text-slate-400 hover:text-slate-600 focus:outline-none"
                  aria-label="Explain offsite ads"
                >
                  <HelpCircle className="h-3.5 w-3.5" />
                </button>
              </label>
              {activeTooltip === 'offsiteAds' && (
                <div className="mb-2 p-3 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900 rounded-xl text-xs text-indigo-700 dark:text-indigo-300 leading-relaxed">
                  {tooltips.offsiteAds}
                </div>
              )}
              <select
                value={inputs.offsiteAdsPercent}
                onChange={(e) => handleInputChange('offsiteAdsPercent', parseInt(e.target.value) || 0)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3.5 py-2 text-xs text-slate-950 dark:text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
                id="calc-input-offsite-ads"
              >
                <option value="0">None (0% fee - Opted Out or Organic Direct Sale)</option>
                <option value="15">Standard Ads (15% fee - Under $10k Annual Revenue)</option>
                <option value="12">Mandatory Ads (12% fee - Over $10k Annual Revenue)</option>
              </select>
            </div>
          </div>
          
          {/* Calculate Button */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800/50 mt-4">
            <button
              type="button"
              onClick={handleCalculate}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-display font-bold py-3.5 px-4 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer text-sm"
              id="calc-submit-btn"
            >
              <Calculator className="h-5 w-5" />
              <span>Calculate Fees & Profit</span>
            </button>
          </div>
        </form>
      </div>

      {/* RIGHT: Results Board Panel (Sticky on Desktop) */}
      <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
        {hasCalculated && outputs ? (
          <div className="bg-gradient-to-b from-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl transition-all duration-300 relative overflow-hidden print-card" id="calculator-results-board">
            
            {/* Ambient Background Aura */}
            <div className={`absolute -right-16 -top-16 h-36 w-36 rounded-full blur-3xl transition-colors duration-500 ${
              outputs.netProfit > 0 ? 'bg-emerald-500/15' : 'bg-rose-500/15'
            }`}></div>

            {/* Quick action toolbar */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6 no-print">
              <span className="font-mono text-[10px] font-bold text-orange-500 uppercase tracking-widest flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse"></span>
                Real-Time Ledger Output
              </span>

              <div className="flex items-center space-x-1.5">
                <button
                  onClick={handleCopy}
                  className="rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-750 p-2 text-slate-300 hover:text-white transition-all cursor-pointer relative group"
                  aria-label="Copy ledger summary text"
                  id="calc-copy-btn"
                >
                  <Copy className="h-4 w-4" />
                  {copied && (
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-orange-500 text-white font-sans text-[10px] px-2 py-0.5 rounded font-bold whitespace-nowrap">
                      Copied Ledger!
                    </span>
                  )}
                </button>
                <button
                  onClick={handleShare}
                  className="rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-750 p-2 text-slate-300 hover:text-white transition-all cursor-pointer relative"
                  aria-label="Copy shareable link"
                  id="calc-share-btn"
                >
                  <Share2 className="h-4 w-4" />
                  {shared && (
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-orange-500 text-white font-sans text-[10px] px-2 py-0.5 rounded font-bold whitespace-nowrap">
                      Copied URL Link!
                    </span>
                  )}
                </button>
                <button
                  onClick={handleDownloadExcel}
                  className="rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-750 p-2 text-emerald-400 hover:text-emerald-300 transition-all cursor-pointer"
                  aria-label="Download results as Excel report"
                  title="Download as Excel"
                  id="calc-excel-btn"
                >
                  <FileSpreadsheet className="h-4 w-4" />
                </button>
                <button
                  onClick={handlePrint}
                  className="rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-750 p-2 text-slate-300 hover:text-white transition-all cursor-pointer"
                  aria-label="Print calculator results report"
                  id="calc-print-btn"
                >
                  <Printer className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Large Highlight Output: Net Profit */}
            <div className="text-center pb-6 border-b border-slate-800">
              <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold font-display">
                Net Profit
              </p>
              <div className={`mt-2 text-4xl sm:text-5xl font-extrabold tracking-tight font-mono ${
                outputs.netProfit > 0 ? 'text-emerald-400' : 'text-rose-400'
              }`} id="calc-net-profit-val">
                {formatCurrency(outputs.netProfit, inputs.currency)}
              </div>
              
              {/* Profit Indicator Badges */}
              <div className="mt-3 flex justify-center items-center gap-1.5">
                {outputs.netProfit > 0 ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 font-sans border border-emerald-500/15">
                    <TrendingUp className="h-3.5 w-3.5" />
                    Highly Profitable ({outputs.profitMargin.toFixed(1)}% Margin)
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/10 px-3 py-1 text-xs font-semibold text-rose-400 font-sans border border-rose-500/15">
                    <TrendingDown className="h-3.5 w-3.5" />
                    Losing Money ({outputs.profitMargin.toFixed(1)}% Margin)
                  </span>
                )}
              </div>
            </div>

            {/* Core Metrics: Grid of Margin / ROI / Break-even */}
            <div className="grid grid-cols-2 gap-4 py-6 border-b border-slate-800 text-center">
              <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-800/40">
                <span className="block text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
                  Break-Even Price
                </span>
                <span className="text-base font-extrabold font-mono text-amber-400 mt-1 block" id="calc-breakeven-val">
                  {formatCurrency(outputs.breakEvenPrice, inputs.currency)}
                </span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Per Item</span>
              </div>

              <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-800/40">
                <span className="block text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
                  ROI / Markup
                </span>
                <span className={`text-base font-extrabold font-mono mt-1 block ${
                  outputs.profitPercentage > 0 ? 'text-emerald-400' : 'text-rose-400'
                }`} id="calc-roi-val">
                  {outputs.profitPercentage.toFixed(1)}%
                </span>
                <span className="text-[10px] text-slate-500 block mt-0.5">On Total Costs</span>
              </div>
            </div>

            {/* Detailed Accounting List */}
            <div className="space-y-4 pt-6 text-sm">
              <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-4">
                Full Revenue & Fee Breakdown
              </h4>

              {/* Gross Revenue */}
              <div className="flex items-center justify-between text-slate-300">
                <span>Gross Customer Revenue</span>
                <span className="font-mono font-semibold text-white">{formatCurrency(outputs.grossRevenue, inputs.currency)}</span>
              </div>

              {/* Discount */}
              {outputs.discountAmount > 0 && (
                <div className="flex items-center justify-between text-slate-400 text-xs pl-3 border-l-2 border-amber-500/40">
                  <span>Discount Applied ({inputs.discountType === 'percentage' ? `${inputs.discountValue}%` : 'Flat'})</span>
                  <span className="font-mono text-amber-400">-{formatCurrency(outputs.discountAmount, inputs.currency)}</span>
                </div>
              )}

              {/* Total Etsy Fees Progress Bar Area */}
              <div className="pt-2">
                <div className="flex items-center justify-between font-semibold text-slate-200">
                  <span>Total Etsy Fees</span>
                  <span className="font-mono text-orange-400" id="calc-total-fees-val">
                    {formatCurrency(outputs.totalFees, inputs.currency)}
                  </span>
                </div>
                {/* Visual Fee Gauge */}
                <div className="h-1.5 w-full bg-slate-800 rounded-full mt-2 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-orange-400 to-red-500 transition-all duration-300"
                    style={{ width: `${Math.min(100, (outputs.totalFees / outputs.grossRevenue) * 100 || 0)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                  <span>Etsy Take Rate:</span>
                  <span>{outputs.grossRevenue > 0 ? ((outputs.totalFees / outputs.grossRevenue) * 100).toFixed(1) : '0'}% of Revenue</span>
                </div>
              </div>

              {/* Individual Fees */}
              <div className="space-y-2.5 pt-2 pl-3 border-l border-slate-800 text-xs text-slate-400">
                <div className="flex items-center justify-between">
                  <span>Listing Publishing Fee</span>
                  <span className="font-mono">{formatCurrency(outputs.listingFee, inputs.currency)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Transaction Commission (6.5%)</span>
                  <span className="font-mono">{formatCurrency(outputs.transactionFee, inputs.currency)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Secure Card Processing Fee</span>
                  <span className="font-mono">{formatCurrency(outputs.paymentFee, inputs.currency)}</span>
                </div>
                {outputs.offsiteAdsFee > 0 && (
                  <div className="flex items-center justify-between text-orange-400">
                    <span>Offsite Ads Promotion Fee ({inputs.offsiteAdsPercent}%)</span>
                    <span className="font-mono">{formatCurrency(outputs.offsiteAdsFee, inputs.currency)}</span>
                  </div>
                )}
                {outputs.taxAmount > 0 && (
                  <div className="flex items-center justify-between text-slate-500">
                    <span>Sales Tax Remitted ({inputs.taxPercent}%)</span>
                    <span className="font-mono">{formatCurrency(outputs.taxAmount, inputs.currency)}</span>
                  </div>
                )}
              </div>

              {/* Shipping Financials */}
              <div className="pt-2 border-t border-slate-800/60 space-y-2">
                <div className="flex items-center justify-between text-slate-300">
                  <span>Shipping Profit / Loss</span>
                  <span className={`font-mono font-semibold ${
                    outputs.shippingProfitLoss >= 0 ? 'text-emerald-400' : 'text-rose-400'
                  }`}>
                    {outputs.shippingProfitLoss >= 0 ? '+' : ''}{formatCurrency(outputs.shippingProfitLoss, inputs.currency)}
                  </span>
                </div>
                <div className="flex justify-between text-[10px] text-slate-500 pl-3">
                  <span>Postage charged: {formatCurrency(inputs.shippingCharged, inputs.currency)}</span>
                  <span>Postage actual: {formatCurrency(inputs.shippingCost, inputs.currency)}</span>
                </div>
              </div>

              {/* Material Sourcing Costs */}
              <div className="pt-2 flex items-center justify-between text-slate-400 text-xs">
                <span>Direct Sourcing / Material Cost</span>
                <span className="font-mono">{formatCurrency(inputs.materialCost * inputs.quantity, inputs.currency)}</span>
              </div>
            </div>

            {/* Bottom Safe Badge */}
            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-center gap-1.5 text-[10px] text-slate-500">
              <Award className="h-4 w-4 text-orange-500" />
              <span>Compliant with April 2026 Etsy Seller Policies</span>
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-md text-center flex flex-col items-center justify-center min-h-[450px] no-print">
            <div className="h-16 w-16 bg-orange-50 dark:bg-orange-950/40 rounded-full flex items-center justify-center text-orange-500 mb-6 border border-orange-100 dark:border-orange-900/30">
              <Calculator className="h-8 w-8 text-orange-600 dark:text-orange-400" />
            </div>
            <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white mb-2">
              Calculation Ready!
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-6 leading-relaxed">
              You have adjusted the input fields. Click the <strong>Calculate Fees & Profit</strong> button below or at the bottom of the configurator form to view your updated profit margins and ROI.
            </p>
            <button
              onClick={handleCalculate}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-display text-sm font-bold py-3 px-6 shadow-md shadow-orange-500/15 hover:shadow-orange-500/25 active:scale-95 transition-all cursor-pointer"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Calculate Now</span>
            </button>
          </div>
        )}

        {/* Informative widget below output */}
        <div className="bg-orange-50/50 dark:bg-slate-900/40 p-5 rounded-2xl border border-orange-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 leading-relaxed no-print">
          <h4 className="font-display font-bold text-slate-900 dark:text-slate-200 mb-1 flex items-center gap-1.5">
            <Info className="h-4 w-4 text-orange-500" />
            Pricing Strategy Suggestion
          </h4>
          <p>
            To lock in a healthy net profit margin above <strong>50%</strong>, your product list price should be at least <strong>{formatCurrency(outputs ? outputs.breakEvenPrice * 2.2 : inputs.productPrice * 2.2, inputs.currency)}</strong>. Use coupons or free shipping offers strategically, and bundle low-cost items to bypass flat-rate card fees.
          </p>
        </div>
      </div>
    </div>
  );
}
