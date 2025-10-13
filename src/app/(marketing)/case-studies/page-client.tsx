'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { CaseStudyCard } from '@/components/sections/CaseStudyCard';
import type { CaseStudy } from '@/data/caseStudies';

// Dynamic import for ConstellationBackground
const ConstellationBackground = dynamic(
  () => import('@/components/animations/ConstellationBackground').then(mod => ({ default: mod.ConstellationBackground })),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 w-full h-full pointer-events-none" />
  }
);

interface CaseStudiesPageClientProps {
  caseStudies: CaseStudy[];
}

export function CaseStudiesPageClient({ caseStudies }: CaseStudiesPageClientProps) {
  const ctaSectionRef = useRef<HTMLElement>(null);

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      {/* Fixed Background Image for Parallax Effect */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/case-studies-header-background.webp')",
          height: '100vh',
          zIndex: 0
        }}
      />

      {/* Gradient Color Filter (same as hero section) */}
      <div 
        className="fixed inset-0 bg-gradient-to-br from-[#a476ff]/40 via-gray-900/60 to-[#7c52ef]/40"
        style={{
          height: '100vh',
          zIndex: 1
        }}
      />

      {/* Header Section */}
      <section className="relative py-24 md:py-32 overflow-hidden min-h-[60vh] flex items-center">
        <div className="container mx-auto px-6 relative" style={{ zIndex: 10 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Case{' '}
              <span className="gradient-text">Studies</span>
            </motion.h1>
            
            <motion.p
              className="text-xl text-gray-400 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Real results from real projects. Discover how we've helped leading companies transform their operations with innovative digital solutions.
            </motion.p>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div>
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                  {caseStudies.length}+
                </div>
                <div className="text-sm text-gray-400">Projects</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                  {new Set(caseStudies.map(s => s.industry)).size}
                </div>
                <div className="text-sm text-gray-400">Industries</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                  100%
                </div>
                <div className="text-sm text-gray-400">Success Rate</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Case Studies Grid Section with Blur Effect */}
      <section className="py-16 md:py-24 relative">
        {/* Blur Overlay (background image is fixed above) */}
        <div 
          className="absolute inset-0 bg-gray-900/80 backdrop-blur-md"
          style={{ zIndex: 1 }}
        />

        <div className="container mx-auto px-6 relative" style={{ zIndex: 10 }}>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            layout
          >
            {caseStudies.map((caseStudy, index) => (
              <CaseStudyCard
                key={caseStudy.id}
                caseStudy={caseStudy}
                index={index}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section with Services-style Background */}
      <section ref={ctaSectionRef} className="py-16 md:py-24 bg-gray-900 relative z-10 overflow-hidden">
        {/* Constellation Background */}
        <ConstellationBackground sectionRef={ctaSectionRef} />

        <div className="container mx-auto px-6 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Create Your{' '}
              <span className="gradient-text">Success Story</span>?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Let's discuss how we can transform your business with innovative digital solutions.
            </p>
            <motion.a
              href="/#contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold bg-gradient-to-r from-[#a476ff] to-[#7c52ef] text-white rounded-xl shadow-lg hover:shadow-[#a476ff]/25 transition-all duration-200 ease-out w-72"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
            >
              Get In Touch
            </motion.a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
