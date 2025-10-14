'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface CTASectionProps {
  nextProject?: {
    slug: string;
    client: string;
    title: string;
    image: string;
  };
}

export function CTASection({ nextProject }: CTASectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      {/* Blur Overlay for sticky background */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-md"
        style={{ zIndex: 1 }}
      />
      
      {/* Gradient background */}
      <div className="absolute inset-0" style={{ zIndex: 2 }}>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-black" />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/30 to-secondary/30 rounded-full blur-[150px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Main CTA */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Transform Your <span className="gradient-text">Business</span>?
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              Let's discuss how we can create a similar success story for your organization
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="group relative px-8 py-4 rounded-lg font-semibold text-white overflow-hidden transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary" />
                <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative flex items-center justify-center gap-2">
                  Start Your Project
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>

              <Link
                href="/case-studies"
                className="px-8 py-4 rounded-lg font-semibold border border-gray-700 hover:border-primary/50 transition-all duration-300 hover:bg-gray-800"
              >
                View All Projects
              </Link>
            </div>
          </div>

          {/* Next Project */}
          {nextProject && (
            <>
              <div className="text-center mb-8">
                <div className="inline-block px-4 py-2 rounded-full bg-gray-800/50 border border-gray-700 text-sm text-gray-400">
                  Next Case Study
                </div>
              </div>

              <Link href={`/case-studies/${nextProject.slug}`} className="group block">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="relative rounded-2xl overflow-hidden bg-gray-900 border border-gray-800 hover:border-primary/50 transition-all duration-500"
                >
                  {/* Background Image */}
                  <div className="relative h-64 md:h-80 overflow-hidden">
                    <Image
                      src={nextProject.image}
                      alt={nextProject.client}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 896px"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/0 to-secondary/0 group-hover:from-primary/20 group-hover:to-secondary/20 transition-all duration-500" />
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <p className="text-primary text-sm font-semibold mb-2 uppercase tracking-wider">
                          {nextProject.client}
                        </p>
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-primary transition-colors duration-300">
                          {nextProject.title}
                        </h3>
                      </div>

                      {/* Arrow */}
                      <div className="w-12 h-12 rounded-full bg-gray-800/80 border border-gray-700 group-hover:border-primary group-hover:bg-primary flex items-center justify-center transition-all duration-300">
                        <svg className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary to-secondary opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-500" />
                </motion.div>
              </Link>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
