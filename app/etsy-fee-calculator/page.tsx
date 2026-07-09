import { Metadata } from 'next';
import HomePage from '../page';

export const metadata: Metadata = {
  title: 'Etsy Fee Calculator 2026 | Calculate Etsy Fees & Profit',
  description: 'Calculate Etsy fees, payment processing costs, shipping charges, and estimated profit in seconds. Free calculator for physical and digital Etsy sellers.',
  alternates: {
    canonical: '/etsy-fee-calculator',
  },
};

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function EtsyFeeCalculatorPage({ searchParams }: PageProps) {
  return <HomePage searchParams={searchParams} />;
}
