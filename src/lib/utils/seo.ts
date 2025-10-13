import type { Metadata } from 'next';

interface SEOProps {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  image?: string;
  noIndex?: boolean;
  type?: 'website' | 'article' | 'profile';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://data.cypcore.com';
const SITE_NAME = 'CyP Data';

/**
 * Generate consistent metadata for pages
 * Usage in page.tsx: export const metadata = generateMetadata({ ... })
 */
export function generateMetadata({
  title,
  description,
  path = '',
  keywords = [],
  image = '/og-image.jpg',
  noIndex = false,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
}: SEOProps): Metadata {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const url = `${SITE_URL}${path}`;
  const imageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`;

  return {
    title: fullTitle,
    description,
    keywords: keywords.length > 0 ? keywords : undefined,
    authors: author ? [{ name: author }] : [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'es_ES',
      type,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [imageUrl],
      creator: '@cypdata',
    },
    alternates: {
      canonical: url,
    },
  };
}

/**
 * Generate JSON-LD structured data for Organization
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    legalName: 'CypCore',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    description:
      'Leading tech company in Barcelona specializing in native mobile apps, web development, Business Intelligence, Big Data analytics, AI solutions, and digital transformation.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Ctra. Piera, 7A',
      addressLocality: 'Martorell',
      addressRegion: 'Barcelona',
      postalCode: '08760',
      addressCountry: 'ES',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+34-659-160-145',
      contactType: 'customer service',
      email: 'alonso.molina@cypcore.com',
      availableLanguage: ['Spanish', 'English'],
    },
    sameAs: ['https://es.linkedin.com/company/cypcore'],
  };
}

/**
 * Generate JSON-LD structured data for Article/Blog Post
 */
export function generateArticleSchema(article: {
  title: string;
  description: string;
  image: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.image,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.svg`,
      },
    },
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url,
    },
  };
}

/**
 * Generate JSON-LD structured data for Service
 */
export function generateServiceSchema(service: {
  name: string;
  description: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    ...(service.image && { image: service.image }),
    areaServed: {
      '@type': 'Place',
      name: 'Spain',
    },
  };
}

/**
 * Generate JSON-LD structured data for Breadcrumb
 */
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}
