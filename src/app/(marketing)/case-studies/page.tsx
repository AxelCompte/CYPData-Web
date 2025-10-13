import type { Metadata } from 'next';
import { CaseStudiesPageClient } from './page-client';
import { caseStudies } from '@/data/caseStudies';
import { generateMetadata as generateSEOMetadata } from '@/lib/utils/seo';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Case Studies',
  description: 'Explore our successful digital transformation projects across automotive, healthcare, retail, and logistics industries. Real results from real clients.',
  path: '/case-studies',
  keywords: ['case studies', 'success stories', 'client projects', 'digital transformation', 'Barcelona', 'automotive', 'healthcare', 'retail'],
});

export default function CaseStudiesPage() {
  return <CaseStudiesPageClient caseStudies={caseStudies} />;
}
