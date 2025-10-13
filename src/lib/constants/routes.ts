/**
 * Route definitions and navigation helpers
 * Centralized routing configuration for consistent navigation
 */

export const ROUTES = {
  home: '/',
  services: '/services',
  caseStudies: '/case-studies',
  blog: '/blog',
  company: '/company',
  contact: '/contact',
  
  // Nested routes
  companyAbout: '/company/about',
  companyTeam: '/company/team',
  companyCareers: '/company/careers',
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RouteValue = typeof ROUTES[RouteKey];

/**
 * Navigation items for header/footer
 */
export const NAV_ITEMS = [
  { label: 'Servicios', href: '#services', hash: true },
  { label: 'Casos de Éxito', href: '#cases', hash: true },
  { label: 'Contacto', href: '#contact', hash: true },
] as const;

/**
 * Main navigation items for when we have separate pages
 */
export const MAIN_NAV_ITEMS = [
  { label: 'Services', href: ROUTES.services },
  { label: 'Case Studies', href: ROUTES.caseStudies },
  { label: 'Blog', href: ROUTES.blog },
  { label: 'Company', href: ROUTES.company },
  { label: 'Contact', href: ROUTES.contact },
] as const;

/**
 * Footer navigation sections
 */
export const FOOTER_NAV = {
  services: {
    title: 'Services',
    items: [
      { label: 'Mobile Apps', href: ROUTES.services + '#mobile' },
      { label: 'Web Development', href: ROUTES.services + '#web' },
      { label: 'Business Intelligence', href: ROUTES.services + '#bi' },
      { label: 'Big Data', href: ROUTES.services + '#bigdata' },
      { label: 'AI Solutions', href: ROUTES.services + '#ai' },
    ],
  },
  company: {
    title: 'Company',
    items: [
      { label: 'About Us', href: ROUTES.companyAbout },
      { label: 'Team', href: ROUTES.companyTeam },
      { label: 'Careers', href: ROUTES.companyCareers },
      { label: 'Case Studies', href: ROUTES.caseStudies },
    ],
  },
  resources: {
    title: 'Resources',
    items: [
      { label: 'Blog', href: ROUTES.blog },
      { label: 'Contact', href: ROUTES.contact },
    ],
  },
} as const;

/**
 * Helper to check if a route is active
 */
export function isRouteActive(currentPath: string, routePath: string): boolean {
  if (routePath === ROUTES.home) {
    return currentPath === ROUTES.home;
  }
  return currentPath.startsWith(routePath);
}

/**
 * Helper to get breadcrumb items for a path
 */
export function getBreadcrumbs(pathname: string): Array<{ label: string; href: string }> {
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs: Array<{ label: string; href: string }> = [
    { label: 'Home', href: ROUTES.home }
  ];
  
  let currentPath = '';
  segments.forEach((segment) => {
    currentPath += `/${segment}`;
    const label = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    breadcrumbs.push({ label, href: currentPath });
  });
  
  return breadcrumbs;
}
