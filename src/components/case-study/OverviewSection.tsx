'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

interface BulletPoint {
  title: string;
  description: string;
}

interface GoalsSectionProps {
  title?: string;
  points: BulletPoint[];
  image: string;
}

export function GoalsSection({ title = 'Project Goals', points, image }: GoalsSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative min-h-screen py-20 md:py-32 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {/* Section Title */}
            <h2 className="text-4xl md:text-6xl font-bold mb-12 text-white">
              {title}
            </h2>

            {/* Points Grid */}
            <div className="space-y-8">
              {points.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="flex gap-4">
                    {/* Bullet Icon */}
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white" />
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold mb-3 text-white group-hover:text-primary transition-colors">
                        {point.title}
                      </h3>
                      <p className="text-gray-400 text-lg leading-relaxed">
                        {point.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Fixed Image */}
          <div className="relative hidden lg:block">
            <div className="sticky top-24 h-[600px] rounded-2xl overflow-hidden">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
