/**
 * SEO Constants and Configuration
 * Centralized SEO metadata and configuration
 */

export const SEO = {
  // Site Information
  siteName: 'CyP Data',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://data.cypcore.com',
  
  // Company Information
  company: {
    legalName: 'CypCore',
    description:
      'Leading tech company in Barcelona specializing in native mobile apps, web development, Business Intelligence, Big Data analytics, AI solutions, and digital transformation.',
    email: 'alonso.molina@cypcore.com',
    phone: '+34-659-160-145',
    address: {
      street: 'Ctra. Piera, 7A',
      city: 'Martorell',
      region: 'Barcelona',
      postalCode: '08760',
      country: 'ES',
    },
  },
  
  // Default Metadata
  defaultMetadata: {
    title: 'CyP Data - Digital Solutions & Business Intelligence | Barcelona',
    description:
      'Leading tech company in Barcelona specializing in native mobile apps, web development, Business Intelligence, Big Data analytics, AI solutions, and digital transformation. Expert team delivering innovative software solutions for modern enterprises.',
    keywords: [
      'CyP Data',
      'CypCore',
      'Barcelona tech company',
      'digital solutions',
      'native mobile apps',
      'Android development',
      'iOS development',
      'web development',
      'Business Intelligence',
      'Big Data',
      'Power BI',
      'data analysis',
      'AI solutions',
      'artificial intelligence',
      'digital transformation',
      'software development Barcelona',
      'tech company Spain',
      'enterprise software',
      'data analytics',
      'mobile app development',
      'custom software',
      'Martorell Barcelona',
    ],
  },
  
  // Social Media
  social: {
    twitter: '@cypdata',
    linkedin: 'https://es.linkedin.com/company/cypcore',
  },
  
  // Default Images
  images: {
    ogImage: '/og-image.jpg',
    logo: '/logo.svg',
    logoColored: '/CYPData_logo_colored_square_v1.svg',
    logoWhite: '/CYPData_logo_white.svg',
  },
  
  // Analytics
  analytics: {
    googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID || '',
  },
} as const;

/**
 * Route definitions for the application
 * Used for navigation, breadcrumbs, and SEO
 */
export const ROUTES = {
  home: {
    path: '/',
    label: 'Home',
    title: 'Digital Solutions & Business Intelligence',
  },
  services: {
    path: '/services',
    label: 'Services',
    title: 'Our Services',
  },
  caseStudies: {
    path: '/case-studies',
    label: 'Case Studies',
    title: 'Success Stories',
  },
  blog: {
    path: '/blog',
    label: 'Blog',
    title: 'Blog & Insights',
  },
  company: {
    path: '/company',
    label: 'Company',
    title: 'About Us',
    children: {
      about: {
        path: '/company/about',
        label: 'About',
        title: 'About CyP Data',
      },
      team: {
        path: '/company/team',
        label: 'Team',
        title: 'Our Team',
      },
      careers: {
        path: '/company/careers',
        label: 'Careers',
        title: 'Join Our Team',
      },
    },
  },
  contact: {
    path: '/contact',
    label: 'Contact',
    title: 'Get In Touch',
  },
} as const;

/**
 * Helper to get full URL
 */
export function getFullUrl(path: string): string {
  return `${SEO.siteUrl}${path}`;
}

/**
 * Helper to get page title
 */
export function getPageTitle(title: string): string {
  return title.includes(SEO.siteName) ? title : `${title} | ${SEO.siteName}`;
}
