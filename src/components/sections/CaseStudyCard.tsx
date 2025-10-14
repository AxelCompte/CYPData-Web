'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { CaseStudy } from '@/data/caseStudies';

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
  index: number;
}

export function CaseStudyCard({ caseStudy, index }: CaseStudyCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="group h-full"
    >
      <Link href={`/case-studies/${caseStudy.slug}`}>
        <motion.div
          className="relative h-full rounded-2xl overflow-hidden cursor-pointer bg-gray-800/50 border border-gray-700/50"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileHover={{
            scale: 1.02,
            borderColor: 'rgb(164 118 255 / 0.5)',
            transition: { duration: 0.3 },
          }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <Image
              src={caseStudy.image}
              alt={caseStudy.client}
              fill
              className="object-contain p-12 opacity-20 group-hover:opacity-30 transition-opacity duration-500"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
          </div>

          {/* Content - Client Name Bottom Right */}
          <div className="relative h-full flex items-end justify-end p-6">
            <motion.h3
              className="text-xl md:text-2xl font-bold text-white text-right"
              animate={{
                scale: isHovered ? 1.05 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              {caseStudy.client}
            </motion.h3>

            {/* Hover Effect - Glow */}
            <motion.div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none"
              style={{
                background: 'radial-gradient(circle at center, rgba(164, 118, 255, 0.1) 0%, transparent 70%)',
              }}
              animate={{
                opacity: isHovered ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
