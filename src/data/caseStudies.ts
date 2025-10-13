/**
 * Case Studies Data
 * Mock data for case study projects and clients
 */

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  client: string;
  industry: string;
  description: string;
  image: string;
  tags: string[];
  year: number;
  featured: boolean;
}

export const caseStudies: CaseStudy[] = [
  {
    id: '1',
    slug: 'seat-manufacturing-analytics',
    title: 'Manufacturing Analytics Platform',
    client: 'SEAT',
    industry: 'Automotive',
    description: 'Real-time production monitoring and predictive maintenance system for automotive manufacturing',
    image: '/company-logos/seat_logo.webp',
    tags: ['Big Data', 'IoT', 'Predictive Analytics'],
    year: 2024,
    featured: true,
  },
  {
    id: '2',
    slug: 'pfizer-clinical-data',
    title: 'Clinical Data Management',
    client: 'Pfizer',
    industry: 'Healthcare',
    description: 'Advanced clinical trial data management and analysis platform with real-time insights',
    image: '/company-logos/pfizer_logo.webp',
    tags: ['Healthcare', 'Data Analytics', 'Compliance'],
    year: 2024,
    featured: true,
  },
  {
    id: '3',
    slug: 'magna-supply-chain',
    title: 'Supply Chain Optimization',
    client: 'Magna',
    industry: 'Automotive',
    description: 'AI-powered supply chain optimization reducing costs and improving delivery times',
    image: '/company-logos/magna_logo.webp',
    tags: ['AI/ML', 'Logistics', 'Optimization'],
    year: 2023,
    featured: true,
  },
  {
    id: '4',
    slug: 'gestamp-quality-control',
    title: 'Quality Control System',
    client: 'Gestamp',
    industry: 'Automotive',
    description: 'Computer vision-based quality control system for metal stamping production lines',
    image: '/company-logos/gestamp_logo.webp',
    tags: ['Computer Vision', 'Quality Assurance', 'AI'],
    year: 2023,
    featured: false,
  },
  {
    id: '5',
    slug: 'lear-workforce-analytics',
    title: 'Workforce Analytics Dashboard',
    client: 'Lear Corporation',
    industry: 'Automotive',
    description: 'Comprehensive workforce analytics and productivity tracking across multiple facilities',
    image: '/company-logos/lear_corporation_logo.webp',
    tags: ['Business Intelligence', 'HR Analytics', 'Dashboard'],
    year: 2023,
    featured: false,
  },
  {
    id: '6',
    slug: 'nissan-inventory-management',
    title: 'Inventory Management System',
    client: 'Nissan',
    industry: 'Automotive',
    description: 'Intelligent inventory management system with demand forecasting and optimization',
    image: '/company-logos/nissan_logo.webp',
    tags: ['Inventory', 'Forecasting', 'ERP Integration'],
    year: 2024,
    featured: false,
  },
  {
    id: '7',
    slug: 'plastic-omnium-iot',
    title: 'IoT Sensor Network',
    client: 'Plastic Omnium',
    industry: 'Automotive',
    description: 'Large-scale IoT sensor deployment for environmental monitoring and energy optimization',
    image: '/company-logos/plastic_omnium_logo.webp',
    tags: ['IoT', 'Energy', 'Sustainability'],
    year: 2023,
    featured: false,
  },
  {
    id: '8',
    slug: 'benteler-predictive-maintenance',
    title: 'Predictive Maintenance AI',
    client: 'Benteler',
    industry: 'Automotive',
    description: 'Machine learning models for predictive maintenance reducing downtime by 40%',
    image: '/company-logos/benteler_logo.webp',
    tags: ['AI/ML', 'Maintenance', 'Predictive Analytics'],
    year: 2024,
    featured: false,
  },
  {
    id: '9',
    slug: 'mango-ecommerce-analytics',
    title: 'E-Commerce Analytics Platform',
    client: 'Mango',
    industry: 'Retail',
    description: 'Real-time e-commerce analytics with customer behavior insights and sales optimization',
    image: '/company-logos/mango_logo.webp',
    tags: ['E-Commerce', 'Analytics', 'Customer Insights'],
    year: 2024,
    featured: true,
  },
  {
    id: '10',
    slug: 'autoneum-acoustic-testing',
    title: 'Acoustic Testing Platform',
    client: 'Autoneum',
    industry: 'Automotive',
    description: 'Automated acoustic testing and analysis platform for automotive components',
    image: '/company-logos/autoneum_logo.webp',
    tags: ['Testing', 'Automation', 'Data Analysis'],
    year: 2023,
    featured: false,
  },
  {
    id: '11',
    slug: 'ti-automotive-robotics',
    title: 'Robotics Control System',
    client: 'TI Automotive',
    industry: 'Automotive',
    description: 'Advanced robotics control and monitoring system for assembly line automation',
    image: '/company-logos/ti_automotive_logo.webp',
    tags: ['Robotics', 'Automation', 'Control Systems'],
    year: 2023,
    featured: false,
  },
  {
    id: '12',
    slug: 'grupo-antolin-material-tracking',
    title: 'Material Tracking System',
    client: 'Grupo Antolin',
    industry: 'Automotive',
    description: 'Real-time material tracking and traceability system across the supply chain',
    image: '/company-logos/grupo_antolin_logo.webp',
    tags: ['RFID', 'Tracking', 'Supply Chain'],
    year: 2024,
    featured: false,
  },
  {
    id: '13',
    slug: 'balearia-fleet-management',
    title: 'Fleet Management System',
    client: 'Balearia',
    industry: 'Maritime',
    description: 'Comprehensive fleet management with real-time tracking and route optimization',
    image: '/company-logos/balearia_logo.webp',
    tags: ['Fleet Management', 'GPS', 'Optimization'],
    year: 2024,
    featured: false,
  },
  {
    id: '14',
    slug: 'schmitz-cargo-tracking',
    title: 'Cargo Tracking Platform',
    client: 'Schmitz Cargobull',
    industry: 'Logistics',
    description: 'Advanced cargo tracking with temperature monitoring and delivery optimization',
    image: '/company-logos/schmitz_cargo_bull_logo.webp',
    tags: ['Logistics', 'Tracking', 'IoT'],
    year: 2023,
    featured: false,
  },
  {
    id: '15',
    slug: 'volkswagen-production-planning',
    title: 'Production Planning System',
    client: 'Volkswagen',
    industry: 'Automotive',
    description: 'AI-driven production planning and scheduling system optimizing resource allocation',
    image: '/company-logos/volkswagen_logo.webp',
    tags: ['Planning', 'AI', 'Optimization'],
    year: 2024,
    featured: true,
  },
];

/**
 * Get featured case studies
 */
export function getFeaturedCaseStudies(): CaseStudy[] {
  return caseStudies.filter(study => study.featured);
}

/**
 * Get case studies by industry
 */
export function getCaseStudiesByIndustry(industry: string): CaseStudy[] {
  return caseStudies.filter(study => 
    study.industry.toLowerCase() === industry.toLowerCase()
  );
}

/**
 * Get case study by slug
 */
export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find(study => study.slug === slug);
}

/**
 * Get all unique industries
 */
export function getIndustries(): string[] {
  const industries = new Set(caseStudies.map(study => study.industry));
  return Array.from(industries).sort();
}

/**
 * Get all unique tags
 */
export function getTags(): string[] {
  const tags = new Set(caseStudies.flatMap(study => study.tags));
  return Array.from(tags).sort();
}
