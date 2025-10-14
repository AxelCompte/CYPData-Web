import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  HeroSection,
  CaseStudySections,
  MetricsSection,
  CTASection,
} from '@/components/case-study';

// Mock data structure for case study details
// TODO: Replace with actual data fetching from CMS/database
const caseStudyData: Record<string, any> = {
  'automotive-data-platform': {
    client: 'Global Automotive Leader',
    title: 'Real-Time Data Platform for Manufacturing Excellence',
    industry: 'Automotive',
    year: '2024',
    heroImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&h=1080&fit=crop',
    tags: ['Data Engineering', 'Real-Time Analytics', 'Cloud Infrastructure'],
    
    goals: {
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1920&h=1080&fit=crop',
      points: [
        {
          title: 'Centralized Data Platform',
          description: 'Create a unified data platform to consolidate information from 15+ manufacturing plants across Europe.',
        },
        {
          title: 'Real-Time Processing',
          description: 'Process millions of sensor readings per day with sub-second latency for immediate insights.',
        },
        {
          title: 'Predictive Capabilities',
          description: 'Implement machine learning models for predictive maintenance and anomaly detection.',
        },
        {
          title: 'Scalable Architecture',
          description: 'Design a cloud-native solution that can scale with business growth and handle peak loads.',
        },
      ],
    },
    
    challenge: {
      image: 'https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=1920&h=1080&fit=crop',
      points: [
        {
          title: 'Data Silos & Integration',
          description: 'Each plant used different legacy systems with incompatible data formats, making it nearly impossible to get a unified view of operations.',
        },
        {
          title: 'Processing Volume',
          description: 'The sheer volume of data—over 50 million sensor readings daily—required a system capable of handling massive throughput without delays.',
        },
        {
          title: 'Downtime Costs',
          description: 'Unplanned equipment failures were costing millions annually. The client needed predictive insights to prevent breakdowns before they occurred.',
        },
      ],
    },
    
    approach: {
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920&h=1080&fit=crop',
      points: [
        {
          title: 'Cloud-Native Architecture',
          description: 'Built on AWS using microservices, serverless functions, and managed services to ensure scalability and reduce operational overhead.',
        },
        {
          title: 'Stream Processing Pipeline',
          description: 'Implemented Apache Kafka and Spark Streaming for real-time data ingestion and processing with sub-second latency.',
        },
        {
          title: 'Data Lake & Warehouse',
          description: 'Designed a hybrid storage solution using S3 for raw data and PostgreSQL for structured analytics, optimizing for both cost and performance.',
        },
        {
          title: 'ML-Powered Insights',
          description: 'Developed custom machine learning models using Python and TensorFlow to predict equipment failures up to 48 hours in advance.',
        },
        {
          title: 'Interactive Dashboards',
          description: 'Created real-time visualization dashboards with React and D3.js, providing executives and plant managers with actionable insights.',
        },
      ],
    },
    
    results: {
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&h=1080&fit=crop',
      points: [
        {
          title: '85% Faster Data Processing',
          description: 'Reduced data processing time from hours to minutes, enabling real-time decision-making across all facilities.',
        },
        {
          title: '40% Reduction in Downtime',
          description: 'Predictive maintenance capabilities decreased unplanned equipment failures by 40%, saving millions in lost production.',
        },
        {
          title: '25% OEE Improvement',
          description: 'Overall Equipment Effectiveness increased by 25% through better resource allocation and proactive maintenance.',
        },
        {
          title: '$5M Annual Cost Savings',
          description: 'Combined improvements in efficiency, reduced downtime, and optimized resource usage resulted in significant cost reductions.',
        },
      ],
    },
    
    metrics: [
      { value: '85', suffix: '%', label: 'Faster Data Processing' },
      { value: '40', suffix: '%', label: 'Reduced Downtime' },
      { value: '50M', label: 'Daily Data Points' },
      { value: '25', suffix: '%', label: 'OEE Improvement' },
    ],
    
    technologies: [
      { name: 'Apache Kafka', category: 'Data Streaming' },
      { name: 'Apache Spark', category: 'Data Processing' },
      { name: 'PostgreSQL', category: 'Database' },
      { name: 'Redis', category: 'Caching' },
      { name: 'AWS S3', category: 'Cloud Storage' },
      { name: 'AWS Lambda', category: 'Cloud Compute' },
      { name: 'Kubernetes', category: 'Orchestration' },
      { name: 'Docker', category: 'Containerization' },
      { name: 'Python', category: 'Programming' },
      { name: 'TypeScript', category: 'Programming' },
      { name: 'React', category: 'Frontend' },
      { name: 'D3.js', category: 'Visualization' },
    ],
    
    features: [
      {
        title: 'Real-Time Processing',
        description: 'Stream processing architecture handling millions of events per second with sub-second latency',
        icon: 'analytics' as const,
      },
      {
        title: 'Scalable Infrastructure',
        description: 'Auto-scaling cloud infrastructure that grows with demand and optimizes costs',
        icon: 'cloud' as const,
      },
      {
        title: 'Data Security',
        description: 'Enterprise-grade security with encryption at rest and in transit, GDPR compliant',
        icon: 'security' as const,
      },
      {
        title: 'Advanced Analytics',
        description: 'Machine learning models for predictive maintenance and anomaly detection',
        icon: 'code' as const,
      },
      {
        title: 'Multi-Region Deployment',
        description: 'Distributed architecture across multiple AWS regions for high availability',
        icon: 'database' as const,
      },
      {
        title: 'Mobile Access',
        description: 'Native mobile apps for iOS and Android with offline-first capabilities',
        icon: 'mobile' as const,
      },
    ],
  },
  
  // Add more case studies here with similar structure
};

// Generate static params for all case studies
export async function generateStaticParams() {
  // TODO: Fetch from CMS/database
  return Object.keys(caseStudyData).map((slug) => ({
    slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const data = caseStudyData[slug];
  
  if (!data) {
    return {
      title: 'Case Study Not Found',
    };
  }

  const description = data.challenge.points[0]?.description || data.title;

  return {
    title: `${data.client}: ${data.title} | CyP Data`,
    description: description.substring(0, 160),
    openGraph: {
      title: `${data.client}: ${data.title}`,
      description: description.substring(0, 160),
      images: [data.heroImage],
      type: 'article',
    },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = caseStudyData[slug];

  if (!data) {
    notFound();
  }

  // Get next project for CTA section
  const allSlugs = Object.keys(caseStudyData);
  const currentIndex = allSlugs.indexOf(slug);
  const nextSlug = allSlugs[(currentIndex + 1) % allSlugs.length];
  const nextProject = nextSlug ? {
    slug: nextSlug,
    client: caseStudyData[nextSlug].client,
    title: caseStudyData[nextSlug].title,
    image: caseStudyData[nextSlug].heroImage,
  } : undefined;

  return (
    <main className="min-h-screen bg-black">
      <HeroSection
        client={data.client}
        title={data.title}
        industry={data.industry}
        year={data.year}
        heroImage={data.heroImage}
        tags={data.tags}
      />

      <CaseStudySections
        goals={data.goals}
        challenge={data.challenge}
        approach={data.approach}
        results={data.results}
      />

      <MetricsSection metrics={data.metrics} />

      <CTASection nextProject={nextProject} />
    </main>
  );
}
