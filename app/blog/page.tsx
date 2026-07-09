import { Metadata } from 'next';
import BlogListClient from './blog-list-client';

export const metadata: Metadata = {
  title: 'Etsy Seller Knowledge Blog | EtsyFeeCalc',
  description: 'Boost your Etsy profit margins. Browse our collection of mathematical pricing guides, platform fee updates, card processing explainers, and marketing strategies.',
  alternates: {
    canonical: '/blog',
  },
};

export default function BlogListPage() {
  return <BlogListClient />;
}
