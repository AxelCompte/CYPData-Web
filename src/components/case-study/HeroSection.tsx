'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

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
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImage}
          alt={`${client} - ${title}`}
          fill
          className="object-cover"
          priority
        />
        {/* Purple/Primary gradient overlay (like case studies page header) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#a476ff]/40 via-gray-900/60 to-gray-900" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#a476ff]/30 to-[#7c52ef]/30" />
      </div>

      {/* Content - Centered */}
      <div className="container mx-auto px-6 relative z-10 text-center">
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
  );
}
