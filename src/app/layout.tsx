import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CyP Data - Digital Solutions & Business Intelligence | Barcelona",
  description: "Leading tech company in Barcelona specializing in native mobile apps, web development, Business Intelligence, Big Data analytics, AI solutions, and digital transformation. Expert team delivering innovative software solutions for modern enterprises.",
  keywords: [
    "CyP Data", "CypCore", "Barcelona tech company", "digital solutions",
    "native mobile apps", "Android development", "iOS development", 
    "web development", "Business Intelligence", "Big Data", "Power BI", 
    "data analysis", "AI solutions", "artificial intelligence", 
    "digital transformation", "software development Barcelona",
    "tech company Spain", "enterprise software", "data analytics",
    "mobile app development", "custom software", "Martorell Barcelona"
  ],
  authors: [{ name: "CyP Data" }],
  creator: "CyP Data",
  publisher: "CyP Data",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://data.cypcore.com'),
  alternates: {
    canonical: '/',
    languages: {
      'es-ES': '/es',
      'en-US': '/en',
    },
  },
  openGraph: {
    title: "CyP Data - Digital Solutions & Business Intelligence",
    description: "Leading tech company in Barcelona specializing in native mobile apps, web development, Business Intelligence, Big Data analytics, AI solutions, and digital transformation.",
    url: 'https://data.cypcore.com',
    siteName: 'CyP Data',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'CyP Data - Digital Solutions & Business Intelligence',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "CyP Data - Digital Solutions & Business Intelligence",
    description: "Leading tech company in Barcelona specializing in native mobile apps, web development, Business Intelligence, Big Data analytics, AI solutions, and digital transformation.",
    images: ['/og-image.jpg'],
    creator: '@cypdata',
  },
  robots: {
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
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        {/* Favicon and App Icons */}
        <link rel="icon" href="/favicon.ico?v=3" sizes="32x32" />
        <link rel="icon" href="/icon.svg?v=3" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.svg?v=3" sizes="180x180" />
        <link rel="manifest" href="/manifest.json?v=3" />
        
        {/* Theme Color */}
        <meta name="theme-color" content="#a476ff" />
        <meta name="msapplication-TileColor" content="#a476ff" />
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "CyP Data",
              "legalName": "CypCore",
              "url": "https://data.cypcore.com",
              "logo": "https://data.cypcore.com/CYPData_logo_white.svg",
              "description": "Leading tech company in Barcelona specializing in native mobile apps, web development, Business Intelligence, Big Data analytics, AI solutions, and digital transformation.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Ctra. Piera, 7A",
                "addressLocality": "Martorell",
                "addressRegion": "Barcelona",
                "postalCode": "08760",
                "addressCountry": "ES"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+34-659-160-145",
                "contactType": "customer service",
                "email": "alonso.molina@cypcore.com",
                "availableLanguage": ["Spanish", "English"],
                "hoursAvailable": [
                  {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                    "opens": "08:00",
                    "closes": "17:00"
                  }
                ]
              },
              "sameAs": [
                "https://es.linkedin.com/company/cypcore"
              ],
              "services": [
                {
                  "@type": "Service",
                  "name": "Native Mobile App Development",
                  "description": "Custom Android and iOS applications built with cutting-edge technology"
                },
                {
                  "@type": "Service", 
                  "name": "Web Development",
                  "description": "Modern web applications and websites with responsive design"
                },
                {
                  "@type": "Service",
                  "name": "Business Intelligence",
                  "description": "Data analytics and BI solutions with Power BI and custom dashboards"
                },
                {
                  "@type": "Service",
                  "name": "Big Data Solutions",
                  "description": "Scalable data processing and analytics platforms for enterprise"
                },
                {
                  "@type": "Service",
                  "name": "AI Solutions",
                  "description": "Artificial intelligence and machine learning implementations"
                }
              ],
              "areaServed": {
                "@type": "Place",
                "name": "Spain"
              },
              "foundingLocation": {
                "@type": "Place",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Martorell",
                  "@addressRegion": "Barcelona",
                  "addressCountry": "ES"
                }
              }
            })
          }}
        />
        {/* Additional Local Business Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "CyP Data",
              "image": "https://data.cypcore.com/CYPData_logo_white.svg",
              "telephone": "+34-659-160-145",
              "email": "alonso.molina@cypcore.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Ctra. Piera, 7A",
                "addressLocality": "Martorell",
                "addressRegion": "Barcelona",
                "postalCode": "08760",
                "addressCountry": "ES"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "41.4764",
                "longitude": "1.9242"
              },
              "openingHours": "Mo-Fr 08:00-17:00",
              "sameAs": [
                "https://es.linkedin.com/company/cypcore"
              ]
            })
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-gray-900 text-white`}
      >
        {children}
      </body>
    </html>
  );
}
