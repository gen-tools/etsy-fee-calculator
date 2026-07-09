import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BLOG_POSTS, getBlogPostBySlug } from '@/src/data/blogPosts';
import BlogPostClient from './blog-post-client';

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const post = getBlogPostBySlug(resolvedParams.slug);
  if (!post) {
    return {
      title: 'Article Not Found | EtsyFeeCalc',
      description: 'The requested guide was not found or has been moved.',
    };
  }
  return {
    title: `${post.title} | EtsyFeeCalc`,
    description: post.description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
  };
}

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params;
  const post = getBlogPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return <BlogPostClient slug={resolvedParams.slug} post={post} />;
}
