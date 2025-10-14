'use client';

import { motion } from 'framer-motion';

interface HeroSectionProps {
  client: string;
  title: string;
  industry: string;
  year: number;
  heroImage: string;
  tags: string[];
}

export function HeroSection({ client, title, industry, year, heroImage, tags }: HeroSectionProps) {
  return (
    <>
      {/* Fixed Background Image for Sticky Effect */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${heroImage}')`,
          height: '100vh',
          zIndex: 0
        }}
      />

      {/* Gradient Color Filter (same as case studies page header) */}
      <div 
        className="fixed inset-0 bg-gradient-to-b from-[#a476ff]/40 via-gray-900/60 to-gray-900"
        style={{
          height: '100vh',
          zIndex: 1
        }}
      />
      <div 
        className="fixed inset-0 bg-gradient-to-r from-[#a476ff]/30 to-[#7c52ef]/30"
        style={{
          height: '100vh',
          zIndex: 1
        }}
      />

      {/* Header Section with Content */}
      <section className="relative pt-24 pb-16 md:pt-28 md:pb-20 min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="container mx-auto px-6 relative text-center" style={{ zIndex: 10 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            {/* Client Name */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6"
            >
              <span className="text-primary-light text-lg md:text-xl font-semibold uppercase tracking-wider">
                {client}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight"
            >
              {title}
            </motion.h1>

            {/* Meta Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-6 mb-8 text-gray-300"
            >
              <div className="flex items-center gap-2">
                <span className="text-primary">●</span>
                <span className="font-medium">{industry}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary">●</span>
                <span className="font-medium">{year}</span>
              </div>
            </motion.div>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap justify-center gap-3"
            >
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-lg text-sm font-medium text-gray-300 hover:border-primary/50 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
